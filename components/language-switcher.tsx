"use client"

import { Globe, Languages, CheckCircle } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "@/contexts/TranslationContext"
import { getLocaleInfo, supportedLocales } from "@/lib/locale-utils"

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const { locale, changeLocale, detectedLocale, isDetecting } = useTranslation()

  const languages = supportedLocales.map(code => ({
    code,
    ...getLocaleInfo(code)
  }))

  const currentLanguage = languages.find(lang => lang.code === locale)
  const detectedLanguage = languages.find(lang => lang.code === detectedLocale)

  const switchLanguage = (newLocale: string) => {
    setIsOpen(false)
    changeLocale(newLocale)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground transition-colors duration-200 border border-border"
        aria-label="Switch language"
      >
        <Globe size={16} />
        <span className="hidden sm:inline text-sm font-medium">
          {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
        </span>
        <span className="sm:hidden text-sm font-medium">
          {currentLanguage?.code.toUpperCase()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-80 md:w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50">
          <div className="p-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <Languages size={14} />
              <span>Detected: {isDetecting ? 'Detecting...' : detectedLanguage?.flag} {detectedLanguage?.nativeName}</span>
            </div>
          </div>
          
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center gap-3 ${
                  locale === language.code 
                    ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{language.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{language.nativeName}</span>
                </div>
                
                <div className="ml-auto flex items-center gap-2">
                  {detectedLocale === language.code && !isDetecting && (
                    <span className="text-xs text-blue-600 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 px-2 py-1 rounded-full">
                      Auto
                    </span>
                  )}
                  {locale === language.code && (
                    <CheckCircle size={16} className="text-blue-600 dark:text-blue-400" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {detectedLocale && detectedLocale !== locale && !isDetecting && (
            <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <button
                onClick={() => switchLanguage(detectedLocale)}
                className="w-full text-left text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Switch to detected language ({detectedLanguage?.nativeName})
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
