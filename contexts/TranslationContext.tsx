"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocaleDetection } from '@/hooks/useLocaleDetection'
import { type SupportedLocale } from '@/lib/locale-utils'
import { clientCache, preloadAllTranslations } from '@/lib/translation-cache'

interface TranslationContextType {
  locale: string
  t: (key: string) => React.ReactNode
  tString: (key: string) => string
  changeLocale: (newLocale: string) => void
  translations: Record<string, unknown>
  isLoading: boolean
  detectedLocale: string
  isDetecting: boolean
  supportedLocales: readonly string[]
  isReady: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [locale, setLocale] = useState('en')
  const [translations, setTranslations] = useState<Record<string, unknown>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  
  const { detectedLocale, isDetecting, supportedLocales } = useLocaleDetection()

  // Preload all supported locales on mount
  useEffect(() => {
    const initializeTranslations = async () => {
      try {
        await preloadAllTranslations()
        
        // Set initial translations from cache if available
        const currentLocale = pathname.match(/^\/([a-z]{2})/)?.[1] || 'en'
        if (clientCache.has(currentLocale)) {
          const cachedTranslations = await clientCache.get(currentLocale)
          if (cachedTranslations) {
            setTranslations(cachedTranslations)
            setIsReady(true)
            setIsLoading(false)
          }
        }
      } catch (error) {
        console.error('Failed to initialize translations:', error)
      }
    }

    initializeTranslations()
  }, [pathname])

  useEffect(() => {
    // Extract locale from pathname (e.g., /en/about -> 'en', /bg/skills -> 'bg')
    const pathLocale = pathname.match(/^\/([a-z]{2})/)?.[1]
    const currentLocale = pathLocale || 'en'
    
    setLocale(currentLocale)
    loadTranslations(currentLocale)
  }, [pathname])

  const loadTranslations = async (newLocale: string) => {
    setIsLoading(true)
    setIsReady(false)
    
    try {
      // Check cache first
      if (clientCache.has(newLocale)) {
        const cachedTranslations = await clientCache.get(newLocale)
        if (cachedTranslations) {
          setTranslations(cachedTranslations)
          setIsReady(true)
          setIsLoading(false)
          return
        }
      }

      // Load from network if not cached
      const response = await fetch(`/locales/${newLocale}/common.json`)
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${newLocale}`)
      }
      const translationData = await response.json()
      
      // Cache the translations
      clientCache.set(newLocale, translationData)
      setTranslations(translationData)
      setIsReady(true)
    } catch (error) {
      console.error(`Failed to load translations for ${newLocale}:`, error)
      // Fallback to English
      try {
        if (clientCache.has('en')) {
          const fallback = await clientCache.get('en')
          if (fallback) {
            setTranslations(fallback)
            setIsReady(true)
          }
        } else {
          const fallbackResponse = await fetch('/locales/en/common.json')
          if (fallbackResponse.ok) {
            const fallback = await fallbackResponse.json()
            clientCache.set('en', fallback)
            setTranslations(fallback)
            setIsReady(true)
          }
        }
      } catch (fallbackError) {
        console.error('Failed to load fallback translations:', fallbackError)
        setIsReady(false)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const changeLocale = (newLocale: string) => {
    if (!supportedLocales.includes(newLocale as SupportedLocale)) {
      console.warn(`Unsupported locale: ${newLocale}`)
      return
    }
    
    setLocale(newLocale)
    loadTranslations(newLocale)
    
    // Update URL to reflect new locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const newPath = `/${newLocale}${pathWithoutLocale}` as const
    router.push(newPath)
  }

  const t = (key: string): React.ReactNode => {
    // If translations aren't ready, return a placeholder or the key
    if (!isReady) {
      return key
    }
    
    const keys = key.split('.')
    let value: unknown = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    // Ensure the value is a valid ReactNode
    if (typeof value === 'string' || typeof value === 'number' || value === null || value === undefined) {
      return value
    }
    
    // If it's an array, try to join it as a string
    if (Array.isArray(value)) {
      return value.join(' ')
    }
    
    // If it's an object, return the key as fallback
    return key
  }

  const tString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key;
  };

  const value: TranslationContextType = {
    locale,
    t,
    tString,
    changeLocale,
    translations,
    isLoading,
    detectedLocale,
    isDetecting,
    supportedLocales,
    isReady
  }

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider')
  }
  return context
}
