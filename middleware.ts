import { NextRequest, NextResponse } from 'next/server'

const supportedLocales = ['en', 'bg'] as const
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  try {
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

    // Simplified locale handling for Edge Runtime compatibility
    // Currently redirects all users to default locale (English)
    // TODO: Re-enable locale detection from Accept-Language header once Edge Runtime issues are resolved
    const redirectUrl = new URL(request.url)
    redirectUrl.pathname = `/${defaultLocale}${pathname}`
    
    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('Middleware error:', error)
    // If there's an error, just return without redirecting
    return
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next).*)',
  ],
}
