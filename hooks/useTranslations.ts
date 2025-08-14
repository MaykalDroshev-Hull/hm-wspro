"use client"

import { usePathname } from "next/navigation"

export function useTranslations() {
  const pathname = usePathname()
  
  // Extract current locale from pathname
  const currentLocale = pathname.startsWith('/bg') ? 'bg' : 'en'
  
  // Import translations based on current locale
  const getTranslations = async () => {
    try {
      const translations = await import(`../public/locales/${currentLocale}/common.json`)
      return translations.default
    } catch (error) {
      // Fallback to English if translation file not found
      const fallback = await import(`../public/locales/en/common.json`)
      return fallback.default
    }
  }
  
  const t = (key: string) => {
    // This is a simplified version - in a real app you'd use react-i18next
    // For now, we'll return the key and handle translations in components
    return key
  }
  
  return {
    locale: currentLocale,
    t,
    getTranslations
  }
}
