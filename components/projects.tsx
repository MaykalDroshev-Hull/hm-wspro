"use client"
import Image from "next/image"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader, useTranslationReady } from "./translation-loader"
import { motion } from "framer-motion"

interface Project {
  id: number
  titleKey: string
  subtitleKey: string
  descriptionKey: string
  image: string
  tags: string[]
  detailsKey: string
}

const easeOut = "easeOut" as const

const sectionMotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
  viewport: { once: true, amount: 0.1, margin: "0px 0px -100px 0px" },
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
    <motion.section id="projects" className="py-20 bg-background" {...sectionMotionProps}>
      <TranslationLoader>
        <ProjectsContent />
      </TranslationLoader>
    </motion.section>
  )
}

function ProjectsContent() {
  const { t, tString } = useTranslation()
  const { isReady } = useTranslationReady()

  const projects = [
    {
      id: 1,
      titleKey: "projects.hvac.title",
      subtitleKey: "projects.hvac.subtitle",
      descriptionKey: "projects.hvac.description",
      image: "/images/15viki-bg-desktop.jpg",
      tags: ["Next.js", "Supabase", "Stripe", "PostgreSQL", "Google Maps API"],
      detailsKey: "projects.hvac.details",
    },
    {
      id: 2,
      titleKey: "projects.aseam.title",
      subtitleKey: "projects.aseam.subtitle",
      descriptionKey: "projects.aseam.description",
      image: "/images/ASEA_MWebsite.jpg",
      tags: ["Next.js", "Node.js", "Responsive Design", "Contact Forms", "Email Integration"],
      detailsKey: "projects.aseam.details",
    },
    {
      id: 3,
      titleKey: "projects.pizzaStop.title",
      subtitleKey: "projects.pizzaStop.subtitle",
      descriptionKey: "projects.pizzaStop.description",
      image: "/images/pizza-stop.png",
      tags: ["Next.js 15", "Supabase", "Google Maps API", "Thermal Printer", "Email System"],
      detailsKey: "projects.pizzaStop.details",
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
          className="grid md:grid-cols-1 lg:grid-cols-1 gap-8"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t, tString } = useTranslation()

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
  


  return (
    <motion.div variants={childVariants} className="group relative overflow-hidden rounded-lg transition-all duration-500 hover:transform hover:scale-[1.02]">
      <div className="relative bg-card rounded-lg overflow-hidden">
        <div className="relative overflow-hidden" style={{ aspectRatio: 'auto 2400 / 1345' }}
        >
          <Image
            src={project.image || "/placeholder.svg"}
            alt={tString(project.titleKey)}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110" 

          /></div>
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60">
        </div>
</div>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-card-foreground">{t(project.titleKey)}</h3>
            <p className="text-sm text-muted-foreground">
              {t(project.subtitleKey)}
            </p>
          </div>

          {/* Hidden elements - keeping the data but not displaying */}
          <div style={{ display: 'none' }}>
            <p>{t(project.descriptionKey)}</p>
            <div>
              {project.tags.map((tag: string) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <ul>
              {detailsArray.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
      
    </motion.div>
  )
}
