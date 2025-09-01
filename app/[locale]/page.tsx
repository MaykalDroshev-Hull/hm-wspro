import { notFound } from 'next/navigation'
import { isValidLocale, getLocaleInfo } from '@/lib/locale-utils'
import { preloadServerTranslations } from '@/lib/server-locale-utils'
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Timeline from "@/components/timeline"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import SEOStructuredData from "@/components/seo-structured-data"
import PerformanceOptimizer from "@/components/performance-optimizer"
import type { Metadata } from 'next'

interface LocalePageProps {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
  const { locale } = await params
  
  if (!isValidLocale(locale)) {
    return {}
  }

  return {
    title: locale === 'en' ? 'Professional Web Development Services' : 'Професионални Уеб Разработки',
    description: locale === 'en' 
      ? 'Expert website development services by Hristo and Michael. Fast, modern websites built with Next.js, React, and cutting-edge technologies. Full-stack development and e-commerce solutions.'
      : 'Експертни услуги за разработка на уеб сайтове от Христо и Михаил. Бързи, модерни уеб сайтове, изградени с Next.js, React и най-новите технологии.',
    alternates: {
      canonical: `https://hm-wspro.com/${locale}`,
      languages: {
        'en': 'https://hm-wspro.com/en',
        'bg': 'https://hm-wspro.com/bg',
      },
    },
    openGraph: {
      locale: locale === 'en' ? 'en_US' : 'bg_BG',
      url: `https://hm-wspro.com/${locale}`,
    },
  }
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params
  
  // Validate locale
  if (!isValidLocale(locale)) {
    notFound()
  }

  // Preload server-side translations to prevent FOUC
  preloadServerTranslations()

  return (
    <>
      <SEOStructuredData locale={locale} />
      <PerformanceOptimizer locale={locale} />
      <div className="min-h-screen bg-background text-foreground" lang={locale} dir={getLocaleInfo(locale).direction}>
        <Navbar />
        <main id="main-content" role="main" aria-label={locale === 'en' ? 'Main content' : 'Основно съдържание'}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}
