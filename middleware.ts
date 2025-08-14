import { NextRequest, NextResponse } from 'next/server'
import { supportedLocales, defaultLocale } from '@/lib/locale-utils'
import { detectLocaleFromHeaders } from '@/lib/server-locale-utils'

export async function middleware(request: NextRequest) {
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
  const detectedLocale = await detectLocaleFromHeaders()
  
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
