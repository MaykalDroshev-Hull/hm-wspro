"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Home, UserRound, Sparkles, Rocket, Mail, Star, Route, MessageSquare } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"
import LanguageSwitcher from "./language-switcher"

export default function Navbar() {
  const [activeLink, setActiveLink] = useState("#home")

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(`#${entry.target.id}`)
        }
      })
    }, observerOptions)

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed top-4 md:top-6 left-0 right-0 z-50 px-4">
      {/* Desktop: side-by-side layout */}
      <div className="hidden md:flex items-center justify-center gap-3">
        <div className="rounded-full border border-white/10 bg-black/40 px-3 py-2 shadow-[0_0_20px_rgba(74,222,128,0.1)] backdrop-blur-xl">
          <TranslationLoader>
            <NavLinks activeLink={activeLink} onActivate={setActiveLink} />
          </TranslationLoader>
        </div>
        
        {/* Language Switcher */}
        <LanguageSwitcher />
      </div>

      {/* Mobile: stacked layout with language switcher on top-right */}
      <div className="md:hidden relative flex flex-col items-center gap-2 w-full pt-8">
        {/* Language switcher - top right corner on mobile */}
        <div className="absolute top-0 right-4 z-[60]">
          <LanguageSwitcher />
        </div>
        
        {/* Navigation icons - centered */}
        <div className="rounded-full border border-white/10 bg-black/40 px-2 py-1 shadow-[0_0_20px_rgba(74,222,128,0.1)] backdrop-blur-xl">
          <TranslationLoader>
            <NavLinks activeLink={activeLink} onActivate={setActiveLink} />
          </TranslationLoader>
        </div>
      </div>
    </nav>
  )
}

interface NavLinksProps {
  activeLink: string
  onActivate: (href: string) => void
}

function NavLinks({ activeLink, onActivate }: NavLinksProps) {
  const { t, isLoading, isReady, isInitialized } = useTranslation()

  if (!isInitialized || isLoading || !isReady) {
    return null
  }

  const links = [
    { href: "#home" as const, key: "nav.home", icon: Home, activeIcon: Star },
    { href: "#about" as const, key: "nav.about", icon: UserRound, activeIcon: UserRound },
    { href: "#skills" as const, key: "nav.skills", icon: Sparkles, activeIcon: Sparkles },
    { href: "#projects" as const, key: "nav.projects", icon: Rocket, activeIcon: Rocket },
    { href: "#journey" as const, key: "nav.journey", icon: Route, activeIcon: Route },
    { href: "#testimonials" as const, key: "nav.testimonials", icon: MessageSquare, activeIcon: MessageSquare },
    { href: "#contact" as const, key: "nav.contact", icon: Mail, activeIcon: Mail },
  ]

  function smoothScroll(target: string) {
    const element = document.querySelector(target)
    if (!element) {
      return
    }

    const lenisWindow = window as typeof window & {
      lenis?: { scrollTo: (destination: Element | string, options?: { offset?: number }) => void }
    }

    const scrollMarginTop = parseInt(window.getComputedStyle(element).scrollMarginTop || "0", 10) || 0

    if (lenisWindow.lenis) {
      lenisWindow.lenis.scrollTo(element, { offset: -scrollMarginTop })
      return
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="flex items-center gap-2 md:gap-3">
      {links.map((link) => {
        const isActive = activeLink === link.href

        const CurrentIcon = isActive ? link.activeIcon : link.icon

        return (
          <Link
            key={link.href}
            href={link.href}
            aria-label={String(t(link.key))}
            onClick={(event) => {
              event.preventDefault()
              onActivate(link.href)
              smoothScroll(link.href)
            }}
            className={`group flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full transition-all duration-500 ${
              isActive
                ? "bg-green-500/20 text-green-400 shadow-[0_0_15px_rgba(74,222,128,0.25)]"
                : "text-white/60 hover:text-white/90"
            }`}
          >
            <CurrentIcon className={`h-4 w-4 md:h-5 md:w-5 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-100'}`} strokeWidth={isActive ? 2.5 : 2.2} />
            <span className="sr-only">{t(link.key)}</span>
          </Link>
        )
      })}
    </div>
  )
}
