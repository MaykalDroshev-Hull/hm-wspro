"use client"
import Image from "next/image"
import { useTranslation } from "@/contexts/TranslationContext"

interface Project {
  id: number
  titleKey: string
  descriptionKey: string
  image: string
  tags: string[]
  detailsKey: string
}

export default function Projects() {
  const { t } = useTranslation()

  const projects = [
    {
      id: 1,
      titleKey: "projects.hvac.title",
      descriptionKey: "projects.hvac.description",
      image: "/images/15viki-bg-desktop.jpg",
      tags: ["Next.js", "Supabase", "Stripe", "PostgreSQL", "Google Maps API"],
      detailsKey: "projects.hvac.details",
    },
    {
      id: 2,
      titleKey: "projects.comingSoon.title",
      descriptionKey: "projects.comingSoon.description",
      image: "/images/projects-coming-soon.jpg",
      tags: [t("projects.comingSoon.tag")],
      detailsKey: "projects.comingSoon.details",
    },
  ]

  return (
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
          {t("projects.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation()
  
  // Get the details array from translations
  const details = t(project.detailsKey)
  const detailsArray = Array.isArray(details) ? details : [details]

  return (
    <div className="group relative overflow-hidden rounded-lg transition-all duration-500 hover:transform hover:scale-[1.02]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 opacity-50 group-hover:opacity-100 blur transition duration-300"></div>
      <div className="relative bg-card rounded-lg overflow-hidden">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={t(project.titleKey)}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60"></div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-card-foreground">{t(project.titleKey)}</h3>
          <p className="text-muted-foreground mb-4">{t(project.descriptionKey)}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-full bg-muted text-muted-foreground border border-border"
              >
                {tag}
              </span>
            ))}
          </div>

          <ul className="mb-6 text-sm text-muted-foreground list-disc pl-5 space-y-1">
            {detailsArray.map((detail: string, index: number) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
