export const supportedLocales = ['en', 'bg'] as const
export type SupportedLocale = typeof supportedLocales[number]
export const defaultLocale: SupportedLocale = 'en'

/**
 * Validate if a locale is supported
 */
export function isValidLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale)
}

/**
 * Get locale from pathname
 */
export function getLocaleFromPathname(pathname: string): SupportedLocale | null {
  const match = pathname.match(/^\/([a-z]{2})/)
  if (match && isValidLocale(match[1])) {
    return match[1] as SupportedLocale
  }
  return null
}

/**
 * Get path without locale
 */
export function getPathWithoutLocale(pathname: string): string {
  return pathname.replace(/^\/[a-z]{2}/, '') || '/'
}

/**
 * Build localized path
 */
export function buildLocalizedPath(locale: SupportedLocale, path: string = '/'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `/${locale}${cleanPath}`
}

/**
 * Get locale info for a specific locale
 */
export function getLocaleInfo(locale: SupportedLocale) {
  const localeMap = {
    en: {
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      direction: 'ltr' as const
    },
    bg: {
      name: 'Bulgarian',
      nativeName: 'Български',
      flag: '🇧🇬',
      direction: 'ltr' as const
    }
  }
  
  return localeMap[locale]
}
