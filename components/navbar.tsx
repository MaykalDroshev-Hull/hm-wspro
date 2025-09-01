"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import ThemeToggle from "./theme-toggle"
import LanguageSwitcher from "./language-switcher"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-400 dark:to-cyan-400"
          >
            H & M Website Provisioning
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <TranslationLoader>
              <NavLinks />
            </TranslationLoader>
            <LanguageSwitcher />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <button className="md:hidden text-foreground" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/90 backdrop-blur-lg border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <TranslationLoader>
              <NavLinks mobile onClick={() => setIsMenuOpen(false)} />
            </TranslationLoader>
            <div className="flex justify-center items-center gap-4 pt-4 border-t border-border mt-4">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLinks({ mobile = false, onClick }: { mobile?: boolean; onClick?: () => void }) {
  const { t, isLoading, isReady, isInitialized } = useTranslation()
  
  // Only render if translations are fully loaded
  if (!isInitialized || isLoading || !isReady) {
    return null
  }
  
  const links = [
    { href: "#home" as const, key: "nav.home" },
    { href: "#about" as const, key: "nav.about" },
    { href: "#skills" as const, key: "nav.skills" },
    { href: "#projects" as const, key: "nav.projects" },
    { href: "#contact" as const, key: "nav.contact" },
  ]

  return (
    <div className={`${mobile ? "flex flex-col space-y-4" : "flex space-x-8"}`}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-muted-foreground hover:text-foreground transition-colors duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-purple-500 hover:to-cyan-500"
          onClick={onClick}
        >
          {t(link.key)}
        </Link>
      ))}
    </div>
  )
}
