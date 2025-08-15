// Translation cache utility for both client and server-side use
import { supportedLocales } from './locale-utils'

interface TranslationCache {
  [locale: string]: Record<string, unknown>
}

// In-memory cache for server-side
const serverCache: TranslationCache = {}

// Client-side cache with persistence
class ClientTranslationCache {
  private cache = new Map<string, Record<string, unknown>>()
  private isInitialized = false

  constructor() {
    this.initializeFromStorage()
  }

  private initializeFromStorage() {
    if (typeof window === 'undefined') return

    try {
      // Load from sessionStorage for persistence across page reloads
      supportedLocales.forEach(locale => {
        const cached = sessionStorage.getItem(`translations_${locale}`)
        if (cached) {
          try {
            const parsed = JSON.parse(cached)
            this.cache.set(locale, parsed)
          } catch (error) {
            console.error(`Failed to parse cached translations for ${locale}:`, error)
          }
        }
      })
      this.isInitialized = true
    } catch (error) {
      console.error('Failed to initialize translation cache from storage:', error)
    }
  }

  async get(locale: string): Promise<Record<string, unknown> | null> {
    // Check in-memory cache first
    if (this.cache.has(locale)) {
      return this.cache.get(locale)!
    }

    // Try to load from network
    try {
      const translations = await this.loadFromNetwork(locale)
      if (translations) {
        this.set(locale, translations)
        return translations
      }
    } catch (error) {
      console.error(`Failed to load translations for ${locale}:`, error)
    }

    return null
  }

  set(locale: string, translations: Record<string, unknown>) {
    this.cache.set(locale, translations)
    
    // Persist to sessionStorage
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(`translations_${locale}`, JSON.stringify(translations))
      } catch (error) {
        console.error(`Failed to persist translations for ${locale}:`, error)
      }
    }
  }

  has(locale: string): boolean {
    return this.cache.has(locale)
  }

  private async loadFromNetwork(locale: string): Promise<Record<string, unknown> | null> {
    try {
      const response = await fetch(`/locales/${locale}/common.json`)
      if (response.ok) {
        return await response.json()
      }
    } catch (error) {
      console.error(`Network request failed for ${locale}:`, error)
    }
    return null
  }

  // Preload all supported locales
  async preloadAll(): Promise<void> {
    const preloadPromises = supportedLocales.map(async (locale) => {
      if (!this.has(locale)) {
        await this.get(locale)
      }
    })
    
    await Promise.all(preloadPromises)
  }

  // Clear cache (useful for testing or memory management)
  clear() {
    this.cache.clear()
    if (typeof window !== 'undefined') {
      supportedLocales.forEach(locale => {
        sessionStorage.removeItem(`translations_${locale}`)
      })
    }
  }
}

// Export the client cache instance
export const clientCache = new ClientTranslationCache()

// Server-side cache functions
export function getServerCache(): TranslationCache {
  return serverCache
}

export function setServerCache(locale: string, translations: Record<string, unknown>) {
  serverCache[locale] = translations
}

export function hasServerCache(locale: string): boolean {
  return locale in serverCache
}

// Utility function to get translations from either cache
export async function getTranslations(locale: string): Promise<Record<string, unknown> | null> {
  if (typeof window === 'undefined') {
    // Server-side: use server cache
    if (hasServerCache(locale)) {
      return getServerCache()[locale]
    }
    return null
  } else {
    // Client-side: use client cache
    return clientCache.get(locale)
  }
}

// Preload translations for a specific locale
export async function preloadTranslations(locale: string): Promise<void> {
  if (typeof window === 'undefined') {
    // Server-side: load and cache
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/locales/${locale}/common.json`)
      if (response.ok) {
        const translations = await response.json()
        setServerCache(locale, translations)
      }
    } catch (error) {
      console.error(`Failed to preload translations for ${locale} on server:`, error)
    }
  } else {
    // Client-side: use client cache
    await clientCache.get(locale)
  }
}

// Preload all supported locales
export async function preloadAllTranslations(): Promise<void> {
  if (typeof window === 'undefined') {
    // Server-side: load all locales
    const preloadPromises = supportedLocales.map(locale => preloadTranslations(locale))
    await Promise.all(preloadPromises)
  } else {
    // Client-side: use client cache
    await clientCache.preloadAll()
  }
}
