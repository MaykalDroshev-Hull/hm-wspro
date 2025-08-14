import { headers } from 'next/headers'
import { supportedLocales, defaultLocale, type SupportedLocale } from './locale-utils'

/**
 * Detect locale from Accept-Language header on the server side
 */
export async function detectLocaleFromHeaders(): Promise<SupportedLocale> {
  try {
    const headersList = await headers()
    const acceptLanguage = headersList.get('accept-language')
    
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
      if (supportedLocales.includes(lang.code as SupportedLocale)) {
        return lang.code as SupportedLocale
      }
    }
  } catch (error) {
    console.warn('Failed to detect locale from headers:', error)
  }

  return defaultLocale
}
