"use client"

import type React from "react"
import Link from "next/link"
import { Mail, Facebook, Instagram, ArrowUp, Code2, Sparkles } from "lucide-react"
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

  function scrollToTop() {
    smoothScroll("#home")
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black/90 -z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(74,222,128,0.05),transparent_50%)] -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Top Section - Brand & CTA */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <Link
            href={`/${locale}`}
            className="group inline-block mb-6"
          >
            <div className="relative">
              {/* Glow effect on hover */}
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
              
              <h3 className="relative text-3xl md:text-4xl font-bold">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-400 to-purple-500 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]">
                  H&M
                </span>
                <br />
                <span className="text-lg md:text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-green-400">
                  Website Provisioning
                </span>
              </h3>
            </div>
          </Link>

          <TranslationLoader>
            <p className="text-gray-400 text-sm md:text-base max-w-md mb-6">
              {t("hero.subtitle")}
            </p>
          </TranslationLoader>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 to-purple-500/10 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4 text-green-400 group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
              Back to Top
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        {/* Middle Section - Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12 max-w-5xl mx-auto">
          {/* Navigation Links */}
          <div className="text-center md:text-left">
            <TranslationLoader>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-green-400" />
                <h4 className="text-white font-semibold text-lg">{t("nav.navigation")}</h4>
              </div>
              <nav className="flex flex-col space-y-3">
                {[
                  { href: "#home", key: "nav.home" },
                  { href: "#about", key: "nav.about" },
                  { href: "#skills", key: "nav.skills" },
                  { href: "#projects", key: "nav.projects" },
                  { href: "#journey", key: "nav.journey" },
                  { href: "#testimonials", key: "nav.testimonials" },
                  { href: "#contact", key: "nav.contact" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors duration-300 text-sm group inline-flex items-center justify-center md:justify-start gap-2"
                    onClick={(event) => handleNavigationClick(event, link.href)}
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-green-400 transition-all duration-300" />
                    {t(link.key)}
                  </Link>
                ))}
              </nav>
            </TranslationLoader>
          </div>

          {/* Projects Links */}
          <div className="text-center md:text-left">
            <TranslationLoader>
              <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                <Code2 className="w-5 h-5 text-purple-400" />
                <h4 className="text-white font-semibold text-lg">{t("projects.title")}</h4>
              </div>
            </TranslationLoader>
            <nav className="flex flex-col space-y-3">
              {[
                { href: "https://15-viki-bg.vercel.app/", name: "15 Viki" },
                { href: "https://www.aseam-detailing.com/", name: "Aseam Detailing" },
                { href: "https://pizza-stop-bg.vercel.app/", name: "Pizza Stop" },
                { href: "https://kasameri-bg.vercel.app/", name: "Kasameri" },
                { href: "https://www.pgitu-lovech.com/", name: "PGITU" },
                { href: "https://www.naidenovart.com/", name: "NaidenovART" },
              ].map((project) => (
                <a
                  key={project.href}
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 transition-colors duration-300 text-sm group inline-flex items-center justify-center md:justify-start gap-2"
                >
                  <span className="w-0 group-hover:w-2 h-[2px] bg-purple-400 transition-all duration-300" />
                  {project.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social & Contact */}
          <div className="text-center md:text-left">
            <h4 className="text-white font-semibold text-lg mb-6 flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5 text-green-400" />
              Connect
            </h4>
            
            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-4 mb-6">
              <SocialLink 
                icon={<Facebook size={20} />} 
                href="https://www.facebook.com/profile.php?id=61579723535531" 
                label="Facebook"
                color="blue"
              />
              <SocialLink 
                icon={<Instagram size={20} />} 
                href="https://www.instagram.com/hm_website_provisioning/" 
                label="Instagram"
                color="purple"
              />
              <SocialLink 
                icon={<Mail size={20} />} 
                href="mailto:hm.websiteprovisioning@gmail.com" 
                label="Email"
                color="green"
              />
            </div>

            <a
              href="mailto:hm.websiteprovisioning@gmail.com"
              className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-300 inline-block"
            >
              hm.websiteprovisioning@gmail.com
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="relative h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

        {/* Bottom Section - Copyright */}
        <TranslationLoader>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-xs text-gray-500">
              &copy; {new Date().getFullYear()} H&M Website Provisioning. {t("footer.rights")}
            </p>
            <p className="text-xs text-gray-500">
              Built with <span className="text-green-400">Next.js</span>, <span className="text-purple-400">React</span> & <span className="text-blue-400">TypeScript</span>
            </p>
          </div>
        </TranslationLoader>
      </div>

      {/* Bottom gradient effect */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
    </footer>
  )
}

interface SocialLinkProps {
  icon: React.ReactNode
  href: string
  label: string
  color: "blue" | "purple" | "green"
}

function SocialLink({ icon, href, label, color }: SocialLinkProps) {
  const colorClasses = {
    blue: "hover:bg-blue-500 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]",
    purple: "hover:bg-purple-500 hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]",
    green: "hover:bg-green-500 hover:border-green-400 hover:shadow-[0_0_15px_rgba(74,222,128,0.3)]",
  }

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className={`
        group relative flex items-center justify-center w-12 h-12 rounded-full 
        bg-black/50 border border-white/10 text-gray-400 
        transition-all duration-300 backdrop-blur-sm
        hover:text-white hover:scale-110 hover:-translate-y-1
        ${colorClasses[color]}
      `}
    >
      {icon}
      
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/90 backdrop-blur-sm border border-white/20 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </a>
  )
}
