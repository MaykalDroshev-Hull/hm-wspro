"use client"

import type React from "react"
import Link from "next/link"
import { Mail, Facebook, Instagram } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"

export default function Footer() {
  const { t, locale } = useTranslation()

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

  function handleNavigationClick(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault()
    smoothScroll(href)
  }

  return (
    <footer className="py-8 bg-muted border-t border-border">
      <div className="container mx-auto px-4">
        {/* Centered H&M and copyright */}
        <div className="text-center mb-8">
          <Link
            href={`/${locale}`}
            className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500"
          >
            H & M<br />Website Provisioning
          </Link>
          <TranslationLoader>
            <p className="mt-2 text-sm text-muted-foreground">
              {t("hero.subtitle")}
            </p>
            <p className="mt-1 text-xs text-muted-foreground/80">
              &copy; {new Date().getFullYear()} {t("footer.rights")}
            </p>
          </TranslationLoader>
        </div>

        {/* Section links (left) and Project links (right) */}
        <div className="grid grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
          {/* Section Links */}
          <div>
            <TranslationLoader>
              <h4 className="text-foreground font-medium mb-4">{t("nav.navigation")}</h4>
              <nav className="flex flex-col space-y-2">
                <Link
                  href="#home"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  onClick={(event) => handleNavigationClick(event, "#home")}
                >
                  {t("nav.home")}
                </Link>
                <Link
                  href="#about"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  onClick={(event) => handleNavigationClick(event, "#about")}
                >
                  {t("nav.about")}
                </Link>
                <Link
                  href="#skills"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  onClick={(event) => handleNavigationClick(event, "#skills")}
                >
                  {t("nav.skills")}
                </Link>
                <Link
                  href="#projects"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  onClick={(event) => handleNavigationClick(event, "#projects")}
                >
                  {t("nav.projects")}
                </Link>
                <Link
                  href="#journey"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  onClick={(event) => handleNavigationClick(event, "#journey")}
                >
                  {t("nav.journey")}
                </Link>
                <Link
                  href="#testimonials"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  onClick={(event) => handleNavigationClick(event, "#testimonials")}
                >
                  {t("nav.testimonials")}
                </Link>
                <Link
                  href="#contact"
                  className="text-sm text-muted hover:text-foreground transition-colors"
                  onClick={(event) => handleNavigationClick(event, "#contact")}
                >
                  {t("nav.contact")}
                </Link>
              </nav>
            </TranslationLoader>
          </div>

          {/* Project Links */}
          <div>
            <TranslationLoader>
              <h4 className="text-foreground font-medium mb-4">{t("projects.title")}</h4>
            </TranslationLoader>
            <nav className="flex flex-col space-y-2">
              <a href="https://15-viki-bg.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">
                {t("footer.projects.viki")}
              </a>
              <a href="https://www.aseam-detailing.com/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">
                {t("footer.projects.aseam")}
              </a>
              <a href="https://pizza-stop-bg.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">
                {t("footer.projects.pizza")}
              </a>
              <a href="https://kasameri-bg.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-sm text-muted hover:text-foreground transition-colors">
                {t("footer.projects.kasameri")}
              </a>
            </nav>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-4 max-w-4xl mx-auto">
          <SocialLink icon={<Facebook size={18} />} href="https://www.facebook.com/profile.php?id=61579723535531" label="Facebook" />
          <SocialLink icon={<Instagram size={18} />} href="https://www.instagram.com/hm_website_provisioning/" label="Instagram" />
          <SocialLink icon={<Mail size={18} />} href="mailto:hm.websiteprovisioning@gmail.com" label="Email" />
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex items-center justify-center w-8 h-8 rounded-full bg-background text-muted-foreground hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  )
}
