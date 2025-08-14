"use client"
import { useTranslation } from "@/contexts/TranslationContext"

export default function Timeline() {
  const { t } = useTranslation()

  const milestones = [
    {
      id: 1,
      year: "2019",
      title: t("timeline.milestones.2019.title"),
      description: t("timeline.milestones.2019.description"),
    },
    {
      id: 2,
      year: "2021",
      title: t("timeline.milestones.2021.title"),
      description: t("timeline.milestones.2021.description"),
    },
    {
      id: 3,
      year: "2023",
      title: t("timeline.milestones.2023.title"),
      description: t("timeline.milestones.2023.description"),
    },
    {
      id: 4,
      year: "2024",
      title: t("timeline.milestones.2024.title"),
      description: t("timeline.milestones.2024.description"),
    },
    {
      id: 5,
      year: "2025",
      title: t("timeline.milestones.2025.title"),
      description: t("timeline.milestones.2025.description"),
    },
    {
      id: 6,
      year: "Present",
      title: t("timeline.milestones.present.title"),
      description: t("timeline.milestones.present.description"),
    },
  ]

  return (
    <section id="journey" className="py-20 bg-gradient-to-b from-muted to-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
          {t("timeline.title")}
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 to-cyan-400 dark:from-purple-500 dark:to-cyan-500 transform md:translate-x-[-0.5px]"></div>

          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-500 dark:to-cyan-500 transform translate-x-[-10px] md:translate-x-[-10px] shadow-[0_0_10px_rgba(124,58,237,0.7)]"></div>

                {/* Content */}
                <div className="md:w-1/2 pl-8 md:pl-0 md:pr-8">
                  <div
                    className={`p-5 rounded-lg bg-card/80 backdrop-blur-sm border border-border ${
                      index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                    }`}
                  >
                    <div className="inline-block px-3 py-1 mb-2 rounded-full bg-gradient-to-r from-purple-200/60 to-blue-200/60 dark:from-purple-900/30 dark:to-blue-900/30 backdrop-blur-md border border-purple-300/40 dark:border-purple-500/20">
                      <span className="text-sm font-medium text-muted-foreground">{milestone.year}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-card-foreground">{milestone.title}</h3>
                    <p className="text-muted-foreground">{milestone.description}</p>
                  </div>
                </div>

                {/* Empty space for alignment */}
                <div className="hidden md:block md:w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
