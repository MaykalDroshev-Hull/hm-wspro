"use client"

import { usePathname } from "next/navigation"
import { supportedLocales } from "@/lib/locale-utils"

// In-memory cache for translations
const translationCache = new Map<string, Record<string, any>>()

// Load translations from cache or fetch them
const loadTranslations = async (locale: string): Promise<Record<string, any>> => {
  // Check in-memory cache first
  if (translationCache.has(locale)) {
    return translationCache.get(locale)!
  }
  
  // Check sessionStorage for persistence
  const cached = sessionStorage.getItem(`translations_${locale}`)
  if (cached) {
    try {
      const parsed = JSON.parse(cached)
      translationCache.set(locale, parsed)
      return parsed
    } catch (error) {
      console.error('Failed to parse cached translations:', error)
    }
  }
  
  // Fetch from network if not cached
  try {
    const response = await fetch(`/locales/${locale}/common.json`)
    if (response.ok) {
      const translations = await response.json()
      translationCache.set(locale, translations)
      sessionStorage.setItem(`translations_${locale}`, JSON.stringify(translations))
      return translations
    }
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error)
  }
  
  // Fallback to English
  if (locale !== 'en') {
    return loadTranslations('en')
  }
  
  return {}
}

export function useTranslations() {
  const pathname = usePathname()
  
  // Extract current locale from pathname
  const currentLocale = pathname.startsWith('/bg') ? 'bg' : 'en'
  
  // Get translations with caching
  const getTranslations = async () => {
    return loadTranslations(currentLocale)
  }
  
  // Translation function that prevents raw keys from showing
  const t = (key: string): string => {
    // Check if we have cached translations
    const cached = translationCache.get(currentLocale)
    if (cached) {
      const keys = key.split('.')
      let value: any = cached
      
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k]
        } else {
          return key // Return key if translation not found
        }
      }
      
      return value || key
    }
    
    // If no cached translations, return key (will be replaced when translations load)
    return key
  }
  
  // Preload translations for current locale
  const preloadCurrentLocale = async () => {
    if (!translationCache.has(currentLocale)) {
      await loadTranslations(currentLocale)
    }
  }
  
  // Initialize translations for current locale
  preloadCurrentLocale()
  
  return {
    locale: currentLocale,
    t,
    getTranslations,
    preloadCurrentLocale
  }
}
