"use client"
import type React from "react"
import Image from "next/image"
import { Code, Layers, Smartphone } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"
import { motion } from "framer-motion"

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

export default function About() {
  const { t, tString } = useTranslation()

  return (
    <motion.section id="about" className="py-20 bg-gradient-to-b from-background to-muted" {...sectionMotionProps}>
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div variants={childVariants}>
          <TranslationLoader>
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
              {t("about.title")}
            </h2>
          </TranslationLoader>
        </motion.div>

        <motion.div variants={childVariants} className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div variants={childVariants} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <motion.div variants={childVariants} className="relative">
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
              </motion.div>

              <motion.div variants={childVariants} className="relative">
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
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={childVariants}>
            <TranslationLoader>
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

                <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <motion.div variants={childVariants}>
                    <SkillCard
                      icon={<Code className="h-6 w-6 text-purple-500 dark:text-purple-400" />}
                      title={tString("about.skills.webDev")}
                      description={tString("about.skills.webDevDesc")}
                    />
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <SkillCard
                      icon={<Layers className="h-6 w-6 text-blue-500 dark:text-blue-400" />}
                      title={tString("about.skills.fullStack")}
                      description={tString("about.skills.fullStackDesc")}
                    />
                  </motion.div>
                  <motion.div variants={childVariants}>
                    <SkillCard
                      icon={<Smartphone className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />}
                      title={tString("about.skills.design3D")}
                      description={tString("about.skills.design3DDesc")}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </TranslationLoader>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
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
