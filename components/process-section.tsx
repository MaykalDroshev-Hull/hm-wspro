"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const easeOut = "easeOut" as const

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
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

export default function ProcessSection() {
  const { t } = useTranslation()

  const steps = [
    {
      number: "01",
      title: "process.step1",
      description: "process.step1Desc",
      color: "from-blue-400 to-cyan-400"
    },
    {
      number: "02",
      title: "process.step2",
      description: "process.step2Desc",
      color: "from-purple-400 to-pink-400"
    },
    {
      number: "03",
      title: "process.step3",
      description: "process.step3Desc",
      color: "from-green-400 to-emerald-400"
    }
  ]

  return (
    <motion.section 
      id="process" 
      className="py-20 bg-black/20 backdrop-blur-sm border-t border-white/5"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <TranslationLoader>
          <motion.div className="text-center mb-16" variants={childVariants}>
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
              {t("process.title")}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t("process.subtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Illustration */}
            <motion.div variants={childVariants} className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 shadow-[0_0_50px_rgba(124,58,237,0.1)]">
                <div className="aspect-[4/3] relative w-full rounded-xl overflow-hidden bg-black/40">
                   <Image
                    src="/images/collage-images/1765377054225-019b08ab-a62a-7edb-864f-1003777d9f9b.png"
                    alt="Web Development Process"
                    fill
                    className="object-contain p-4 hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              {/* Decorative gradient blur */}
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 blur-3xl -z-10 rounded-full opacity-50" />
            </motion.div>

            {/* Steps */}
            <motion.div variants={containerVariants} className="order-1 lg:order-2 space-y-8">
              {steps.map((step, index) => (
                <motion.div 
                  key={index} 
                  variants={childVariants}
                  className="relative pl-8 border-l border-white/10 hover:border-purple-500/50 transition-colors duration-300"
                >
                  <span className={`absolute -left-3 top-0 flex items-center justify-center w-6 h-6 rounded-full bg-gradient-to-r ${step.color} text-[10px] font-bold text-black`}>
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </span>
                  <h3 className="text-xl font-bold mb-2 text-white flex items-center gap-3">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${step.color}`}>
                      {t(step.title)}
                    </span>
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(step.description)}
                  </p>
                </motion.div>
              ))}

              <motion.div variants={childVariants} className="pt-4">
                <Link 
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-medium hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
                >
                  {t("process.cta")}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </TranslationLoader>
      </div>
    </motion.section>
  )
}

