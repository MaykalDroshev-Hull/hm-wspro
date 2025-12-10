"use client"

import { useState } from "react"
import { useTranslation } from "@/contexts/TranslationContext"
import { motion, AnimatePresence } from "framer-motion"

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useTranslation()
  const [isHovered, setIsHovered] = useState(false)

  const switchLanguage = (newLocale: string) => {
    if (locale !== newLocale) {
      changeLocale(newLocale)
    }
  }

  return (
    <div 
      className="relative inline-flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover - hidden on mobile */}
      <motion.div
        className="absolute -inset-1 rounded-full bg-gradient-to-r from-green-500/20 to-purple-500/20 blur-md hidden md:block"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Main container - responsive sizing */}
      <div className="relative flex items-center gap-0.5 md:gap-1 p-0.5 md:p-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 hover:border-white/20 transition-colors duration-300">
        {/* EN Button */}
        <button
          onClick={() => switchLanguage("en")}
          className={`
            relative z-10 px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300
            ${locale === "en" 
              ? "text-white" 
              : "text-gray-400 hover:text-gray-300"
            }
          `}
          aria-label="Switch to English"
        >
          <span className="relative z-10">EN</span>
        </button>

        {/* BG Button */}
        <button
          onClick={() => switchLanguage("bg")}
          className={`
            relative z-10 px-2.5 py-1 md:px-4 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300
            ${locale === "bg" 
              ? "text-white" 
              : "text-gray-400 hover:text-gray-300"
            }
          `}
          aria-label="Switch to Bulgarian"
        >
          <span className="relative z-10">BG</span>
        </button>

        {/* Sliding background indicator */}
        <motion.div
          className="absolute top-0.5 md:top-1 h-[calc(100%-0.25rem)] md:h-[calc(100%-0.5rem)] rounded-full bg-gradient-to-r from-green-500/20 to-purple-500/20 border border-green-500/40 shadow-[0_0_15px_rgba(74,222,128,0.3)]"
          animate={{
            left: locale === "en" ? "0.125rem" : "50%",
            width: "calc(50% - 0.25rem)",
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        />
      </div>

      {/* Active language indicator - desktop only */}
      <AnimatePresence mode="wait">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap hidden md:block"
          >
            <div className="px-3 py-1 rounded-full bg-black/90 backdrop-blur-sm border border-white/20 text-xs text-gray-300">
              {locale === "en" ? "English" : "Български"}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
