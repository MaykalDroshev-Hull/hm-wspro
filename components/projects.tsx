"use client"
import Image from "next/image"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader, useTranslationReady } from "./translation-loader"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface Project {
  id: number
  titleKey: string
  subtitleKey: string
  descriptionKey: string
  image: string
  tags: string[]
  detailsKey: string
  isPremium?: boolean
}

const easeOut = "easeOut" as const

const sectionMotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
  viewport: { once: true, amount: 0.05, margin: "0px 0px -100px 0px" },
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

export default function Projects() {
  return (
    <motion.section id="projects" className="py-16 md:py-20 bg-background" {...sectionMotionProps}>
      <TranslationLoader>
        <ProjectsContent />
      </TranslationLoader>
    </motion.section>
  )
}

function ProjectsContent() {
  const { t, tString } = useTranslation()
  const {} = useTranslationReady()

  const projects = [
    {
      id: 0,
      titleKey: "projects.hmcommerce.title",
      subtitleKey: "projects.hmcommerce.subtitle",
      descriptionKey: "projects.hmcommerce.description",
      image: "/images/e-commerce.png",
      tags: ["TypeScript", "Tailwind CSS", "E-commerce", "Easy Setup", "Bulgaria"],
      detailsKey: "projects.hmcommerce.details",
      isPremium: true,
    },
    {
      id: 1,
      titleKey: "projects.aseam.title",
      subtitleKey: "projects.aseam.subtitle",
      descriptionKey: "projects.aseam.description",
      image: "/images/ASEA_MWebsite.jpg",
      tags: ["Next.js", "Node.js", "Responsive Design", "Contact Forms", "Email Integration"],
      detailsKey: "projects.aseam.details",
    },
    {
      id: 2,
      titleKey: "projects.pizzaStop.title",
      subtitleKey: "projects.pizzaStop.subtitle",
      descriptionKey: "projects.pizzaStop.description",
      image: "/images/pizza-stop.png",
      tags: ["Next.js 15", "Supabase", "Google Maps API", "Thermal Printer", "Email System"],
      detailsKey: "projects.pizzaStop.details",
    },
    {
      id: 3,
      titleKey: "projects.hvac.title",
      subtitleKey: "projects.hvac.subtitle",
      descriptionKey: "projects.hvac.description",
      image: "/images/15viki-bg-desktop.jpg",
      tags: ["Next.js", "Supabase", "Stripe", "PostgreSQL", "Google Maps API"],
      detailsKey: "projects.hvac.details",
    },
    {
      id: 4,
      titleKey: "projects.kasameri.title",
      subtitleKey: "projects.kasameri.subtitle",
      descriptionKey: "projects.kasameri.description",
      image: "/images/kasameri-bg.png",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Responsive Design", "WhatsApp Integration"],
      detailsKey: "projects.kasameri.details",
    },
    {
      id: 5,
      titleKey: "projects.pgitu.title",
      subtitleKey: "projects.pgitu.subtitle",
      descriptionKey: "projects.pgitu.description",
      image: "/images/pgitu-desktop.png",
      tags: ["Next.js 15", "TypeScript", "Responsive Design", "Educational Platform"],
      detailsKey: "projects.pgitu.details",
    },
    {
      id: 6,
      titleKey: "projects.naidenovart.title",
      subtitleKey: "projects.naidenovart.subtitle",
      descriptionKey: "projects.naidenovart.description",
      image: "/images/naidenovart-desktop.png",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Responsive Design", "Multi-language"],
      detailsKey: "projects.naidenovart.details",
    },
    {
      id: 7,
      titleKey: "projects.transgroup.title",
      subtitleKey: "projects.transgroup.subtitle",
      descriptionKey: "projects.transgroup.description",
      image: "/images/transgroup-vvt.png",
      tags: ["Next.js 15", "TypeScript", "Tailwind CSS", "Responsive Design", "Multi-language"],
      detailsKey: "projects.transgroup.details",
    },
    {
      id: 8,
      titleKey: "projects.abstractApartment.title",
      subtitleKey: "projects.abstractApartment.subtitle",
      descriptionKey: "projects.abstractApartment.description",
      image: "/images/abstract-apartment.png",
      tags: ["TypeScript", "Tailwind CSS", "Vacation Rental", "Multi-language", "Greece"],
      detailsKey: "projects.abstractApartment.details",
    },
    {
      id: 9,
      titleKey: "projects.comingSoon.title",
      subtitleKey: "projects.comingSoon.subtitle",
      descriptionKey: "projects.comingSoon.description",
      image: "/images/projects-coming-soon.jpg",
      tags: [tString("projects.comingSoon.tag")],
      detailsKey: "projects.comingSoon.details",
    },
  ]

  return (
    <>
      <motion.div variants={childVariants}>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
          {t("projects.title")}
        </h2>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          className="grid md:grid-cols-1 lg:grid-cols-1 gap-6 sm:gap-8"
        >
          {projects.map((project) => (
            project.isPremium ? (
              <PremiumProjectCard key={project.id} project={project} />
            ) : (
              <ProjectCard key={project.id} project={project} />
            )
          ))}
        </motion.div>
      </div>
    </>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t, tString } = useTranslation()
  const description = t(project.descriptionKey)

  // Get the details array from translations - access the raw translations object
  const { translations } = useTranslation()
  let detailsArray: string[] = []
  
  // Access the translations directly to get the array
  const keys = project.detailsKey.split('.')
  let value: unknown = translations
  
  for (const key of keys) {
    if (value && typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key]
    } else {
      value = null
      break
    }
  }
  
  if (Array.isArray(value)) {
    detailsArray = value
  } else {
    // Fallback: try to get individual items using tString
    detailsArray = []
    for (let i = 0; i < 10; i++) { // Try up to 10 items
      const itemKey = `${project.detailsKey}.${i}`
      const item = tString(itemKey)
      if (item && item !== itemKey) { // If we got a real translation, not the key
        detailsArray.push(item)
      } else {
        break
      }
    }
  }

  const detailPreview = detailsArray.slice(0, 3)

  return (
    <motion.div
      variants={childVariants}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card/60 backdrop-blur-sm shadow-lg transition-all duration-500 hover:border-white/20"
    >
      <div className="relative overflow-hidden">
        <div className="relative aspect-[16/9] w-full">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={tString(project.titleKey)}
            fill
            sizes="(min-width: 1024px) 900px, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent opacity-80" />
        </div>
      </div>

      <div className="p-5 md:p-6 space-y-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg md:text-xl font-semibold text-card-foreground">{t(project.titleKey)}</h3>
          <p className="text-sm text-muted-foreground">
            {t(project.subtitleKey)}
          </p>
        </div>

        <p className="text-sm text-gray-300 line-clamp-3">{description}</p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {detailPreview.length > 0 ? (
          <ul className="space-y-1 text-xs text-gray-400 list-disc list-inside">
            {detailPreview.map((detail, index) => (
              <li key={index} className="line-clamp-1">{detail}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </motion.div>
  )
}

function PremiumProjectCard({ project }: { project: Project }) {
  const { t, tString, locale } = useTranslation()
  const description = t(project.descriptionKey)

  // Get the details array from translations
  const { translations } = useTranslation()
  let detailsArray: string[] = []
  
  const keys = project.detailsKey.split('.')
  let value: unknown = translations
  
  for (const key of keys) {
    if (value && typeof value === 'object' && value !== null && key in value) {
      value = (value as Record<string, unknown>)[key]
    } else {
      value = null
      break
    }
  }
  
  if (Array.isArray(value)) {
    detailsArray = value
  } else {
    detailsArray = []
    for (let i = 0; i < 10; i++) {
      const itemKey = `${project.detailsKey}.${i}`
      const item = tString(itemKey)
      if (item && item !== itemKey) {
        detailsArray.push(item)
      } else {
        break
      }
    }
  }

  const detailPreview = detailsArray.slice(0, 3)

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

  const handleEnquireNow = () => {
    // Set message in sessionStorage for contact form to read
    const enquiryMessage = locale === 'bg' 
      ? 'Интересувам се да науча повече за HM-Commerce'
      : 'I am interested in learning more about HM-Commerce'
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('enquiryMessage', enquiryMessage)
      sessionStorage.setItem('enquiryType', 'hmcommerce')
      
      // Scroll to contact form
      smoothScroll('#contact')
      
      // Trigger a custom event to notify contact form
      window.dispatchEvent(new CustomEvent('enquiryMessageSet', { detail: { message: enquiryMessage } }))
    }
  }

  return (
    <motion.div
      variants={childVariants}
      className="group relative overflow-hidden rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-purple-500/20 p-[2px] shadow-2xl transition-all duration-500 hover:shadow-purple-500/50"
    >
      <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-sm">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30" />
        
        <div className="relative overflow-hidden">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={tString(project.titleKey)}
              fill
              sizes="(min-width: 1024px) 900px, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
          </div>
        </div>

        <div className="p-5 md:p-6 space-y-4">
          <div className="flex flex-col gap-1">
            <h3 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              {t(project.titleKey)}
            </h3>
            <p className="text-sm text-muted-foreground">
              {t(project.subtitleKey)}
            </p>
          </div>

          <p className="text-sm text-gray-300 line-clamp-3">{description}</p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs text-purple-200 backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {detailPreview.length > 0 ? (
            <ul className="space-y-1 text-xs text-gray-400 list-disc list-inside">
              {detailPreview.map((detail, index) => (
                <li key={index} className="line-clamp-1">{detail}</li>
              ))}
            </ul>
          ) : null}

          {/* Enquire Now Button */}
          <div className="mt-4 relative z-10">
            <button
              onClick={handleEnquireNow}
              type="button"
              className="group w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-400 hover:to-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-500/70 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {locale === 'bg' ? 'Запитване сега' : 'Enquire Now'}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
