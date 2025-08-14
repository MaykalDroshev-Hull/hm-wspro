import { notFound } from 'next/navigation'
import { isValidLocale, getLocaleInfo } from '@/lib/locale-utils'
import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Timeline from "@/components/timeline"
import Testimonials from "@/components/testimonials"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

interface LocalePageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function LocalePage({ params }: LocalePageProps) {
  const { locale } = await params
  
  // Validate locale
  if (!isValidLocale(locale)) {
    notFound()
  }

  // Get locale info for metadata or other uses
  const localeInfo = getLocaleInfo(locale)
  
  return (
    <div className="min-h-screen bg-background text-foreground" lang={locale} dir={localeInfo.direction}>
      <Navbar />
      <main>
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
  )
}
