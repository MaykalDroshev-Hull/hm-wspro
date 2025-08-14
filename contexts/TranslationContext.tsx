"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useLocaleDetection } from '@/hooks/useLocaleDetection'
import { type SupportedLocale } from '@/lib/locale-utils'

interface TranslationContextType {
  locale: string
  t: (key: string) => any
  changeLocale: (newLocale: string) => void
  translations: Record<string, any>
  isLoading: boolean
  detectedLocale: string
  isDetecting: boolean
  supportedLocales: readonly string[]
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

export function TranslationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [locale, setLocale] = useState('en')
  const [translations, setTranslations] = useState<Record<string, any>>({})
  const [isLoading, setIsLoading] = useState(true)
  
  const { detectedLocale, isDetecting, supportedLocales } = useLocaleDetection()

  useEffect(() => {
    // Extract locale from pathname (e.g., /en/about -> 'en', /bg/skills -> 'bg')
    const pathLocale = pathname.match(/^\/([a-z]{2})/)?.[1]
    const currentLocale = pathLocale || 'en'
    
    setLocale(currentLocale)
    loadTranslations(currentLocale)
  }, [pathname])

  const loadTranslations = async (newLocale: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/locales/${newLocale}/common.json`)
      if (!response.ok) {
        throw new Error(`Failed to load translations for ${newLocale}`)
      }
      const translationData = await response.json()
      setTranslations(translationData)
    } catch (error) {
      console.error(`Failed to load translations for ${newLocale}:`, error)
      // Fallback to English
      try {
        const fallbackResponse = await fetch('/locales/en/common.json')
        if (fallbackResponse.ok) {
          const fallback = await fallbackResponse.json()
          setTranslations(fallback)
        }
      } catch (fallbackError) {
        console.error('Failed to load fallback translations:', fallbackError)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const changeLocale = (newLocale: string) => {
    if (!supportedLocales.includes(newLocale as any)) {
      console.warn(`Unsupported locale: ${newLocale}`)
      return
    }
    
    setLocale(newLocale)
    loadTranslations(newLocale)
    
    // Update URL to reflect new locale
    const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/'
    const newPath = `/${newLocale}${pathWithoutLocale}`
    router.push(newPath as any)
  }

  const t = (key: string): any => {
    const keys = key.split('.')
    let value: any = translations
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }
    
    return value // Return the actual value (string, array, object, etc.)
  }

  const value: TranslationContextType = {
    locale,
    t,
    changeLocale,
    translations,
    isLoading,
    detectedLocale,
    isDetecting,
    supportedLocales
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
