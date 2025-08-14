import { NextRequest, NextResponse } from 'next/server'

const supportedLocales = ['en', 'bg'] as const
const defaultLocale = 'en'

/**
 * Detect locale from Accept-Language header on the server side
 */
function detectLocaleFromHeaders(request: NextRequest): string {
  try {
    const acceptLanguage = request.headers.get('accept-language')
    
    if (!acceptLanguage) return defaultLocale

    // Parse Accept-Language header and find best match
    const languages = acceptLanguage
      .split(',')
      .map(lang => {
        const [code, quality = '1'] = lang.trim().split(';q=')
        return {
          code: code.split('-')[0].toLowerCase(), // Extract primary language code
          quality: parseFloat(quality)
        }
      })
      .sort((a, b) => b.quality - a.quality)

    // Find the first supported locale
    for (const lang of languages) {
      if (supportedLocales.includes(lang.code as any)) {
        return lang.code
      }
    }
  } catch (error) {
    console.warn('Failed to detect locale from headers:', error)
  }

  return defaultLocale
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip middleware for static assets and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/images') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.includes('.') // Skip files with extensions (css, js, images, etc.)
  ) {
    return
  }
  
  // Check if the pathname has a locale
  const pathnameHasLocale = supportedLocales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Detect locale from browser headers or use default
  const detectedLocale = detectLocaleFromHeaders(request)
  
  // Redirect to detected locale
  request.nextUrl.pathname = `/${detectedLocale}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
}
