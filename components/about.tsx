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
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
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
    <motion.section id="about" className="relative py-16 md:py-20" {...sectionMotionProps}>
       {/* Background elements */}
       <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black pointer-events-none -z-10" />
       
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={childVariants}>
          <TranslationLoader>
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-purple-500 drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                {t("about.title")}
              </span>
            </h2>
          </TranslationLoader>
        </motion.div>

        {/* Collage Images Showcase */}
        <motion.div 
          variants={childVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          {/* Web Wizards Collaboration Image */}
          <div className="relative group">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-green-500/30 via-purple-500/30 to-green-500/30 opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl border border-green-500/20 overflow-hidden group-hover:border-green-500/40 transition-all duration-500">
              <div className="relative h-64 sm:h-72 md:h-[360px]">
                <Image 
                  src="/images/collage-images/1765377054225-019b08ab-a62a-7edb-864f-1003777d9f9b.png"
                  alt="Web Wizards - Building Your Digital Home"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                <p className="text-white font-semibold text-lg text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Building Your Digital Home
                </p>
              </div>
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(74,222,128,0.03)_50%)] bg-[length:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>

          {/* Process Split Image */}
          <div className="relative group">
            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-500/30 via-green-500/30 to-purple-500/30 opacity-75 blur-lg group-hover:opacity-100 transition-all duration-500"></div>
            <div className="relative bg-black/60 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden group-hover:border-purple-500/40 transition-all duration-500">
              <div className="relative h-64 sm:h-72 md:h-[360px]">
                <Image 
                  src="/images/collage-images/1765377082802-019b08ab-a62a-73ed-9c90-f892e5b393dc.png"
                  alt="Our Process - Planning, Designing, Delivering"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                <p className="text-white font-semibold text-lg text-center drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                  Our Process: Easy & Fast
                </p>
              </div>
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(192,38,211,0.03)_50%)] bg-[length:100%_4px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
        </motion.div>

        <motion.div variants={childVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Images box - spans full width on desktop */}
          <motion.div variants={childVariants} className="lg:col-span-3">
            <TranslationLoader>
              <BoxCard className="overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-items-center text-center">
                   {/* Text and Profiles */}
                  <div className="md:col-span-7 flex flex-col gap-8 items-center text-center">
                     <div className="space-y-4 w-full">
                        <RichText html={tString("about.introTitle")} className="text-2xl font-bold text-white text-center" />
                        <RichText html={tString("about.intro")} className="text-lg text-muted-foreground leading-relaxed text-center" />
                     </div>
                     
                     <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
                        <div className="flex flex-col items-center gap-2">
                           <CyberPortrait src="/images/Hristo.jpg" alt="Hristo" />
                           <span className="text-sm font-medium text-green-400">Hristo</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                           <CyberPortrait src="/images/Michael.JPG" alt="Michael" />
                           <span className="text-sm font-medium text-purple-400">Michael</span>
                        </div>
                     </div>
                  </div>

                   {/* Illustration */}
                   <div className="md:col-span-5 relative h-64 sm:h-72 md:h-full min-h-[260px] rounded-xl overflow-hidden border border-white/10 group-hover:border-green-500/30 transition-colors duration-500">
                      <Image 
                        src="/images/collage-images/cartoon-illustration-of-a-web-designer-thinking.jpg"
                        alt="Web Wizards"
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <p className="text-white font-medium text-sm bg-black/60 backdrop-blur-md p-2 rounded-lg border border-white/10 inline-block">
                          Building your digital future
                        </p>
                      </div>
                   </div>
                </div>
              </BoxCard>
            </TranslationLoader>
          </motion.div>

          {/* Story boxes - positions 4-6 */}
          <motion.div variants={childVariants}>
            <TranslationLoader>
              <BoxCard>
                <RichText html={tString("about.learning")} className="text-lg leading-relaxed font-normal text-gray-300 text-center" />
              </BoxCard>
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <TranslationLoader>
              <BoxCard>
                <RichText html={tString("about.specialization")} className="text-lg leading-relaxed font-normal text-gray-300 text-center" />
              </BoxCard>
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <TranslationLoader>
              <BoxCard>
                <RichText html={tString("about.hobbies")} className="text-lg leading-relaxed font-normal text-gray-300 text-center" />
              </BoxCard>
            </TranslationLoader>
          </motion.div>

          {/* Skills - positions 7-9 */}
          <motion.div variants={childVariants}>
            <TranslationLoader>
              <SkillCard
                icon={<Code className="h-8 w-8 text-green-400" />}
                title={tString("about.skills.webDev")}
                description={tString("about.skills.webDevDesc")}
              />
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <TranslationLoader>
              <SkillCard
                icon={<Layers className="h-8 w-8 text-purple-400" />}
                title={tString("about.skills.fullStack")}
                description={tString("about.skills.fullStackDesc")}
              />
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <TranslationLoader>
              <SkillCard
                icon={<Smartphone className="h-8 w-8 text-blue-400" />}
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
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
}

function BoxCard({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative group h-full ${className}`}>
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-green-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      <div className="relative bg-black/40 backdrop-blur-sm rounded-xl border border-white/10 p-6 h-full hover:border-white/20 transition-colors duration-300">
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
    <div className="relative group h-full">
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-green-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
      <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl h-full flex flex-col items-center text-center border border-white/10 hover:border-white/20 transition-colors duration-300">
        <div className="p-3 rounded-full bg-white/5 mb-4 group-hover:scale-110 transition-transform duration-300">
            {icon}
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

function CyberPortrait({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-24 w-24 md:h-28 md:w-28 group">
      {/* Rotating outer ring */}
      <div className="absolute -inset-1 rounded-full border border-green-500/30 border-t-transparent border-l-transparent animate-[spin_3s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="absolute -inset-1 rounded-full border border-purple-500/30 border-b-transparent border-r-transparent animate-[spin_3s_linear_infinite_reverse] opacity-0 group-hover:opacity-100 transition-opacity" />
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500/20 to-purple-500/20 blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative h-full w-full overflow-hidden rounded-full border-2 border-white/10 group-hover:border-white/30 transition-colors bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 112px, 96px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Scanline overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none" />
      </div>
    </div>
  )
}
