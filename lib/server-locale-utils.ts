import { headers } from 'next/headers'
import { readFileSync } from 'fs'
import { join } from 'path'
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

// Server-side translation cache
const serverTranslationCache = new Map<string, Record<string, unknown>>()

/**
 * Load translations from the server-side file system
 */
export function loadServerTranslations(locale: SupportedLocale): Record<string, unknown> {
  // Check cache first
  if (serverTranslationCache.has(locale)) {
    return serverTranslationCache.get(locale)!
  }

  try {
    // Load from file system
    const translationPath = join(process.cwd(), 'public', 'locales', locale, 'common.json')
    const translationData = readFileSync(translationPath, 'utf-8')
    const translations = JSON.parse(translationData)
    
    // Cache the translations
    serverTranslationCache.set(locale, translations)
    
    return translations
  } catch (error) {
    console.error(`Failed to load server translations for ${locale}:`, error)
    
    // Return empty object as fallback
    return {}
  }
}

/**
 * Preload all supported locales on the server
 */
export function preloadServerTranslations(): void {
  supportedLocales.forEach(locale => {
    loadServerTranslations(locale)
  })
}

/**
 * Get translations for a specific locale from server cache
 */
export function getServerTranslations(locale: SupportedLocale): Record<string, unknown> {
  return loadServerTranslations(locale)
}

/**
 * Check if server translations are available for a locale
 */
export function hasServerTranslations(locale: SupportedLocale): boolean {
  return serverTranslationCache.has(locale)
}

/**
 * Get a specific translation key from server translations
 */
export function getServerTranslation(locale: SupportedLocale, key: string): string {
  const translations = loadServerTranslations(locale)
  
  const keys = key.split('.')
  let value: unknown = translations
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = (value as Record<string, unknown>)[k]
    } else {
      // Return fallback based on key
      const fallbacks: Record<string, string> = {
        'nav.home': 'Home',
        'nav.about': 'About',
        'nav.skills': 'Skills',
        'nav.projects': 'Projects',
        'nav.contact': 'Contact',
        'hero.badge': 'Full-Stack Developers',
        'hero.title': 'H&M Website Provisioning',
        'hero.subtitle': 'Bridging Code and Creativity',
        'hero.cta': 'View Projects',
        'about.title': 'About Us',
        'skills.title': 'Tech Stack',
        'projects.title': 'Projects',
        'timeline.title': 'Our Journey',
        'testimonials.title': 'Testimonials',
        'contact.title': 'Get In Touch',
        'footer.rights': 'All rights reserved.'
      }
      
      return fallbacks[key] || key.split('.').pop() || key
    }
  }
  
  return typeof value === 'string' ? value : key.split('.').pop() || key
}
