"use client"

import { useState, useEffect } from 'react'
import { supportedLocales, defaultLocale, type SupportedLocale } from '@/lib/locale-utils'

interface LocaleDetectionResult {
  detectedLocale: SupportedLocale
  isDetecting: boolean
  supportedLocales: readonly SupportedLocale[]
  defaultLocale: SupportedLocale
}

export function useLocaleDetection(): LocaleDetectionResult {
  const [detectedLocale, setDetectedLocale] = useState<SupportedLocale>(defaultLocale)
  const [isDetecting, setIsDetecting] = useState(true)

  useEffect(() => {
    function detectLocale() {
      try {
        // Check if we're in the browser
        if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
          // Get browser language
          const browserLang = navigator.language || navigator.languages?.[0]
          
          if (browserLang) {
            // Extract primary language code (e.g., 'en-US' -> 'en')
            const primaryLang = browserLang.split('-')[0].toLowerCase()
            
            // Check if it's supported
            if (supportedLocales.includes(primaryLang as SupportedLocale)) {
              setDetectedLocale(primaryLang as SupportedLocale)
            } else {
              // Check if any of the navigator.languages are supported
              const supportedLang = navigator.languages?.find(lang => 
                supportedLocales.includes(lang.split('-')[0].toLowerCase() as SupportedLocale)
              )
              
              if (supportedLang) {
                setDetectedLocale(supportedLang.split('-')[0].toLowerCase() as SupportedLocale)
              } else {
                setDetectedLocale(defaultLocale)
              }
            }
          } else {
            setDetectedLocale(defaultLocale)
          }
        } else {
          setDetectedLocale(defaultLocale)
        }
      } catch (error) {
        console.warn('Failed to detect locale:', error)
        setDetectedLocale(defaultLocale)
      } finally {
        setIsDetecting(false)
      }
    }

    detectLocale()
  }, [])

  return {
    detectedLocale,
    isDetecting,
    supportedLocales,
    defaultLocale
  }
}
