"use client"

import type React from "react"
import Link from "next/link"
import { Mail } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"

export default function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="py-8 bg-muted border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link
              href="/"
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500"
            >
              H & M Website Provisioning
            </Link>
            <TranslationLoader>
              <p className="mt-2 text-sm text-muted-foreground">&copy; {new Date().getFullYear()} {t("footer.rights")}</p>
            </TranslationLoader>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <SocialLink icon={<Mail size={18} />} href="mailto:hm.websiteprovisioning@gmail.com" label="Email" />
            </div>

            <TranslationLoader>
              <nav className="flex space-x-6">
                <Link href="#home" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.home")}
                </Link>
                <Link href="#about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.about")}
                </Link>
                <Link href="#projects" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.projects")}
                </Link>
                <Link href="#contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {t("nav.contact")}
                </Link>
              </nav>
            </TranslationLoader>
          </div>
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
