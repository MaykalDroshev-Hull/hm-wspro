"use client"

import type React from "react"

import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"
import { motion } from "framer-motion"
import TechCarousel from "./TechCarousel"

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

export default function Skills() {
  const { t } = useTranslation()

  return (
    <motion.section id="skills" className="py-16 md:py-20 bg-gradient-to-b from-muted to-background" {...sectionMotionProps}>
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <motion.div variants={childVariants}>
          <TranslationLoader>
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
              {t("skills.title")}
            </h2>
          </TranslationLoader>
        </motion.div>

        <motion.div variants={childVariants}>
          <TechCarousel />
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

