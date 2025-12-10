"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"
import Link from "next/link"
import { Sparkles } from "lucide-react"

const easeOut = "easeOut" as const

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
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

export default function WhyUs() {
  const { t } = useTranslation()

  return (
    <motion.section 
      id="why-us" 
      className="py-20 bg-gradient-to-b from-black/0 to-black/40 backdrop-blur-sm"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4">
        <TranslationLoader>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Text Content */}
            <motion.div variants={childVariants} className="order-2 lg:order-1 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                <span>{t("whyUs.title")}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white">
                {t("whyUs.headline")}
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                {t("whyUs.description")}
              </p>

              <div className="pt-4">
                <Link 
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all hover:scale-105"
                >
                  {t("whyUs.cta")}
                </Link>
              </div>
            </motion.div>

            {/* Illustration */}
            <motion.div variants={childVariants} className="order-1 lg:order-2 relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black/50 aspect-square lg:aspect-[4/3]">
                <Image
                  src="/images/collage-images/cartoon-illustration-of-a-web-designer-thinking.jpg"
                  alt="Web Wizards"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-white text-lg font-medium border-l-4 border-cyan-500 pl-4">
                    "We turn complex problems into elegant solutions."
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TranslationLoader>
      </div>
    </motion.section>
  )
}

