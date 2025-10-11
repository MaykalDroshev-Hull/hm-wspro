import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const supportedLocales = ['en', 'bg']
const defaultLocale = 'bg'

// Bulgarian-speaking countries and their locale codes
const bulgarianCountries = ['BG'] // Bulgaria

// Function to get locale from Accept-Language header
function getLocaleFromAcceptLanguage(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale

  // Parse Accept-Language header (e.g., "en-US,en;q=0.9,bg;q=0.8")
  const languages = acceptLanguage
    .split(',')
    .map(lang => {
      const [code, qValue] = lang.trim().split(';q=')
      const quality = qValue ? parseFloat(qValue) : 1.0
      return { code: code.split('-')[0].toLowerCase(), quality }
    })
    .sort((a, b) => b.quality - a.quality)

  // Find first supported language
  for (const { code } of languages) {
    if (supportedLocales.includes(code)) {
      return code
    }
  }

  return defaultLocale
}

// Function to get locale from country (geolocation)
function getLocaleFromCountry(country: string | null): string {
  if (!country) return defaultLocale
  
  // If user is from Bulgaria or Bulgarian-speaking region, use Bulgarian
  if (bulgarianCountries.includes(country.toUpperCase())) {
    return 'bg'
  }
  
  // Otherwise default to English
  return 'en'
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  
  // Skip middleware for static files, api routes, and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/locales') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webp|woff|woff2|ttf|eot|css|js|json|xml|txt|webmanifest)$/)
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = supportedLocales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  // If pathname already has a valid locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next()
  }

  // Only redirect if we're at the root path
  if (pathname === '/') {
    // Check for explicit locale preference in cookies
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (cookieLocale && supportedLocales.includes(cookieLocale)) {
      const url = request.nextUrl.clone()
      url.pathname = `/${cookieLocale}`
      return NextResponse.redirect(url)
    }

    // Try to get locale from geolocation (Vercel provides this header)
    const country = request.headers.get('x-vercel-ip-country')
    const geoLocale = getLocaleFromCountry(country)
    
    // Prefer geolocation over Accept-Language
    if (country) {
      const url = request.nextUrl.clone()
      url.pathname = `/${geoLocale}`
      const response = NextResponse.redirect(url)
      // Set cookie to remember preference
      response.cookies.set('NEXT_LOCALE', geoLocale, {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        path: '/'
      })
      return response
    }

    // Fall back to Accept-Language header
    const acceptLanguage = request.headers.get('accept-language')
    const locale = getLocaleFromAcceptLanguage(acceptLanguage)
    
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}`
    const response = NextResponse.redirect(url)
    // Set cookie to remember preference
    response.cookies.set('NEXT_LOCALE', locale, {
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: '/'
    })
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, locales, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|images|locales|api).*)',
  ],
}

