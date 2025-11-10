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
  viewport: { once: true, amount: 0.2, margin: "0px 0px -100px 0px" },
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
    <motion.section id="about" className="bg-gradient-to-b from-background to-muted" {...sectionMotionProps}>
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0 }}
      >
        <motion.div variants={childVariants}>
          <TranslationLoader>
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
              {t("about.title")}
            </h2>
          </TranslationLoader>
        </motion.div>

        <motion.div variants={childVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Images box - spans full width on desktop (positions 1-3) */}
          <motion.div variants={childVariants} className="lg:col-span-3">
            <TranslationLoader>
              <BoxCard>
                <div className="flex flex-col sm:flex-row gap-6 sm:items-center">
                  <div className="flex gap-4 sm:flex-row sm:gap-6">
                    <SpotlightPortrait src="/images/Hristo.jpg" alt="Hristo" />
                    <SpotlightPortrait src="/images/Michael.JPG" alt="Michael" />
                  </div>
                  <div className="space-y-3">
                    <RichText html={tString("about.introTitle")} className="text-xl font-semibold leading-relaxed" />
                    <RichText html={tString("about.intro")} className="text-lg leading-relaxed font-normal" />
                  </div>
                </div>
              </BoxCard>
            </TranslationLoader>
          </motion.div>

          {/* Story boxes - positions 4-6 */}
          <motion.div variants={childVariants}>
            <TranslationLoader>
              <BoxCard>
                <RichText html={tString("about.learning")} className="text-lg leading-relaxed font-normal" />
              </BoxCard>
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <TranslationLoader>
              <BoxCard>
                <RichText html={tString("about.specialization")} className="text-lg leading-relaxed font-normal" />
              </BoxCard>
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <TranslationLoader>
              <BoxCard>
                <RichText html={tString("about.hobbies")} className="text-lg leading-relaxed font-normal" />
              </BoxCard>
            </TranslationLoader>
          </motion.div>

          {/* Skills - positions 7-9 */}
          <motion.div variants={childVariants}>
            <TranslationLoader>
              <SkillCard
                icon={<Code className="h-6 w-6 text-purple-500 dark:text-purple-400" />}
                title={tString("about.skills.webDev")}
                description={tString("about.skills.webDevDesc")}
              />
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <TranslationLoader>
              <SkillCard
                icon={<Layers className="h-6 w-6 text-blue-500 dark:text-blue-400" />}
                title={tString("about.skills.fullStack")}
                description={tString("about.skills.fullStackDesc")}
              />
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <TranslationLoader>
              <SkillCard
                icon={<Smartphone className="h-6 w-6 text-cyan-500 dark:text-cyan-400" />}
                title={tString("about.skills.design3D")}
                description={tString("about.skills.design3DDesc")}
              />
            </TranslationLoader>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

function RichText({ html, className }: { html: string; className?: string }) {
  return <p className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

function BoxCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative group">
  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 opacity-75 blur"></div>

  <div className="relative bg-[#222222] rounded-xl border border-white/10 p-6">
        {children}
      </div>
    </div>
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
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 opacity-75 blur"></div>

      <div className="relative p-5 bg-[#222222] rounded-xl h-full flex flex-col items-center text-center">
        {icon}
        <h3 className="mt-3 font-semibold text-card-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

function SpotlightPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-20 w-20 md:h-24 md:w-24">
      <div className="absolute -inset-0.5 rounded-full bg-[rgb(20,20,20)] opacity-75 blur group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative h-full w-full overflow-hidden rounded-full border border-white/10">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 96px, 80px"
          className="object-cover"
        />
      </div>
    </div>
  )
}
