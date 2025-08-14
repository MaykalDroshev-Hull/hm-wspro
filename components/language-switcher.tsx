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
        <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Languages size={14} />
              <span>Detected: {isDetecting ? 'Detecting...' : detectedLanguage?.flag} {detectedLanguage?.nativeName}</span>
            </div>
          </div>
          
          <div className="py-2">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => switchLanguage(language.code)}
                className={`w-full px-4 py-3 text-left hover:bg-muted transition-colors duration-200 flex items-center gap-3 ${
                  locale === language.code 
                    ? 'bg-muted text-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-lg">{language.flag}</span>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium">{language.name}</span>
                  <span className="text-xs text-muted-foreground">{language.nativeName}</span>
                </div>
                
                <div className="ml-auto flex items-center gap-2">
                  {detectedLocale === language.code && !isDetecting && (
                    <span className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">
                      Auto
                    </span>
                  )}
                  {locale === language.code && (
                    <CheckCircle size={16} className="text-primary" />
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {detectedLocale && detectedLocale !== locale && !isDetecting && (
            <div className="p-3 border-t border-border bg-muted/30">
              <button
                onClick={() => switchLanguage(detectedLocale)}
                className="w-full text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
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
