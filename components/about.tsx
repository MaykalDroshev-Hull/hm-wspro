"use client"
import type React from "react"
import Image from "next/image"
import { Code, Layers, Smartphone } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"

export default function About() {
  const { t } = useTranslation()

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
          {t("about.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 opacity-75 blur"></div>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/images/Hristo.jpg"
                    alt="Hristo"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-400 opacity-75 blur"></div>
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/images/Michael.JPG"
                    alt="Michael"
                    width={500}
                    height={500}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-muted-foreground">
              {t("about.intro")}
            </p>

            <p className="text-lg text-muted-foreground">
              {t("about.learning")}
            </p>

            <p className="text-lg text-muted-foreground">
              {t("about.specialization")}
            </p>

            <p className="text-lg text-muted-foreground">
              {t("about.hobbies")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <SkillCard
                icon={<Code className="h-6 w-6 text-purple-500 dark:text-purple-400" />}
                title={t("about.skills.webDev")}
                description={t("about.skills.webDevDesc")}
              />
              <SkillCard
                icon={<Layers className="h-6 w-6 text-blue-500 dark:text-blue-400" />}
                title={t("about.skills.fullStack")}
                description={t("about.skills.fullStackDesc")}
              />
              <SkillCard
                icon={<Smartphone className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />}
                title={t("about.skills.design3D")}
                description={t("about.skills.design3DDesc")}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 rounded-lg opacity-50 group-hover:opacity-100 blur transition duration-300"></div>
      <div className="relative p-5 bg-card/80 backdrop-blur-sm rounded-lg h-full flex flex-col items-center text-center">
        {icon}
        <h3 className="mt-3 font-semibold text-card-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
