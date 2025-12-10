"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
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
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
}

export default function ProcessFlow() {
  const { t } = useTranslation()

  const steps = [
    {
      key: "step1",
      number: "01",
      color: "from-blue-500 to-cyan-400",
      delay: 0
    },
    {
      key: "step2",
      number: "02",
      color: "from-purple-500 to-pink-400",
      delay: 0.2
    },
    {
      key: "step3",
      number: "03",
      color: "from-green-500 to-emerald-400",
      delay: 0.4
    }
  ]

  return (
    <motion.section 
      className="py-24 relative overflow-hidden"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <TranslationLoader>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <motion.h2 
              variants={childVariants}
              className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400"
            >
              {t("process.title")}
            </motion.h2>
            <motion.p 
              variants={childVariants}
              className="text-lg text-muted-foreground"
            >
              {t("process.subtitle")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Illustration */}
            <motion.div 
              variants={childVariants}
              className="relative order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-sm p-4 shadow-2xl shadow-purple-900/20">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden">
                   <Image
                    src="/images/collage-images/1765377054225-019b08ab-a62a-7edb-864f-1003777d9f9b.png"
                    alt="Process Illustration"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay Gradient for integration */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                </div>
              </div>
              
              {/* Decorative elements behind */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl -z-10" />
            </motion.div>

            {/* Steps */}
            <motion.div 
              variants={containerVariants}
              className="order-1 lg:order-2 space-y-8"
            >
              {steps.map((step, index) => (
                <motion.div 
                  key={step.key}
                  variants={childVariants}
                  className="relative group pl-8 md:pl-0"
                >
                  <div className="md:flex gap-6 items-start">
                    <div className="hidden md:flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-lg shadow-purple-900/20 z-10 relative group-hover:scale-110 transition-transform duration-300`}>
                        {step.number}
                      </div>
                      {index !== steps.length - 1 && (
                        <div className="w-0.5 h-16 bg-gradient-to-b from-white/20 to-transparent my-2" />
                      )}
                    </div>
                    
                    <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-6 hover:bg-white/10 transition-colors duration-300 relative">
                       {/* Mobile Number Badge */}
                       <div className={`md:hidden absolute -left-4 -top-4 w-10 h-10 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                        {step.number}
                      </div>

                      <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                        {t(`process.${step.key}`)}
                        <CheckCircle2 className="w-5 h-5 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity -ml-4 group-hover:ml-0" />
                      </h3>
                      <p className="text-muted-foreground">
                        {t(`process.${step.key}Desc`)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div 
            variants={childVariants}
            className="text-center"
          >
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-105 transition-all duration-300 group"
            >
              {t("process.cta")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </TranslationLoader>
      </div>
    </motion.section>
  )
}

