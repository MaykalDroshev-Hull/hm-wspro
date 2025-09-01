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
  isInitialized: boolean
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [locale, setLocale] = useState('bg') // Default to Bulgarian
  const [translations, setTranslations] = useState<Record<string, unknown>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  
  const { detectedLocale, isDetecting, supportedLocales } = useLocaleDetection()

  // Preload all supported locales and set initial translations on mount
  useEffect(() => {
    const initializeTranslations = async () => {
      try {
        setIsLoading(true)
        setIsReady(false)
        setIsInitialized(false)
        
        await preloadAllTranslations()
        
        // Extract locale from pathname (e.g., /en/about -> 'en', /bg/skills -> 'bg')
        const pathLocale = pathname.match(/^\/([a-z]{2})/)?.[1]
        const currentLocale = pathLocale || 'bg' // Default to Bulgarian
        
        setLocale(currentLocale)
        
        // Set initial translations from cache if available
        if (clientCache.has(currentLocale)) {
          const cachedTranslations = await clientCache.get(currentLocale)
          if (cachedTranslations) {
            setTranslations(cachedTranslations)
            setIsReady(true)
            setIsLoading(false)
            setIsInitialized(true)
            return
          }
        }
        
        // If not cached, load immediately
        await loadTranslations(currentLocale)
      } catch (error) {
        console.error('Failed to initialize translations:', error)
        // Try to load Bulgarian as fallback
        await loadTranslations('bg')
      }
    }

    initializeTranslations()
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
          setIsInitialized(true)
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
      setIsInitialized(true)
    } catch (error) {
      console.error(`Failed to load translations for ${newLocale}:`, error)
      // Fallback to Bulgarian
      try {
        if (clientCache.has('bg')) {
          const fallback = await clientCache.get('bg')
          if (fallback) {
            setTranslations(fallback)
            setIsReady(true)
            setIsInitialized(true)
          }
        } else {
          const fallbackResponse = await fetch('/locales/bg/common.json')
          if (fallbackResponse.ok) {
            const fallback = await fallbackResponse.json()
            clientCache.set('bg', fallback)
            setTranslations(fallback)
            setIsReady(true)
            setIsInitialized(true)
          }
        }
      } catch (fallbackError) {
        console.error('Failed to load fallback translations:', fallbackError)
        setIsReady(false)
        setIsInitialized(true)
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
    // If translations aren't ready, return a sensible fallback
    if (!isReady || Object.keys(translations).length === 0) {
      // Return English fallbacks for common navigation items
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
    
    const keys = key.split('.')
    let value: unknown = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = (value as Record<string, unknown>)[k]
      } else {
        // If translation not found, return a sensible fallback
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
    
    // Ensure the value is a valid ReactNode
    if (typeof value === 'string' || typeof value === 'number' || value === null || value === undefined) {
      return value
    }
    
    // If it's an array, try to join it as a string
    if (Array.isArray(value)) {
      return value.join(' ')
    }
    
    // If it's an object, return the last part of the key as fallback
    return key.split('.').pop() || key
  }

  const tString = (key: string): string => {
    const value = t(key);
    return typeof value === 'string' ? value : key.split('.').pop() || key;
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
    isReady,
    isInitialized
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
