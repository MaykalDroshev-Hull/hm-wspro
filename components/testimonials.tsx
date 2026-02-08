"use client"

import type React from "react"
import Image from "next/image"
import { Star } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"
import { motion } from "framer-motion"

interface Testimonial {
  name: string
  role: string
  company: string
  content: string
  avatar: string
  rating: number
}

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

interface ScrollingColumnProps {
  testimonials: Testimonial[]
  direction: "up" | "down"
  speed?: number
  isMobile?: boolean
}


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


function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      className="relative w-full max-w-full md:max-w-none mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    >
      <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 opacity-75 blur"></div>
      <div className="relative h-full rounded-2xl bg-[#222222] p-4 md:p-5 border border-white/10">
        <div className="flex items-center mb-3 md:mb-4">
          <div className="relative h-10 w-10 md:h-12 md:w-12 rounded-full overflow-hidden mr-3 border-2 border-purple-400/50 dark:border-purple-500/50">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-card-foreground text-sm truncate">{testimonial.name}</h4>
            <p className="text-xs text-muted-foreground truncate">
              {testimonial.role}
              {testimonial.company && `, ${testimonial.company}`}
            </p>
          </div>
          <div className="flex space-x-0.5 ml-2">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-2.5 w-2.5 md:h-3 md:w-3 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>

        <p className="text-xs md:text-sm text-muted-foreground italic leading-relaxed overflow-hidden"
           style={{
             display: '-webkit-box',
             WebkitLineClamp: 3,
             WebkitBoxOrient: 'vertical' as const,
           }}>
          &quot;{testimonial.content}&quot;
        </p>
      </div>
    </motion.div>
  )
}

function ScrollingColumn({ testimonials, direction, speed = 30, isMobile = false }: ScrollingColumnProps) {
  const minimumItems = isMobile ? 6 : 8
  const loopsRequired = Math.max(2, Math.ceil(minimumItems / testimonials.length) + 1)
  const duplicatedTestimonials = Array.from({ length: loopsRequired * testimonials.length }, (_, itemIndex) => {
    return testimonials[itemIndex % testimonials.length]
  })

  const keyframes = direction === "up" ? ["0%", "-50%"] : ["-50%", "0%"]
  const initialOffset = direction === "down" ? "-50%" : "0%"

  return (
    <div className="relative h-[420px] md:h-[500px] overflow-hidden">
      {/* Fade gradients at top and bottom */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-background to-transparent z-10" />

      <motion.div
        className="flex flex-col"
        initial={{ y: initialOffset }}
        animate={{ y: keyframes }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop" as const,
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {duplicatedTestimonials.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.name}-${index}`} testimonial={testimonial} index={index % testimonials.length} />
        ))}
      </motion.div>
    </div>
  )
}

export default function Testimonials() {
  return (
    <motion.section id="testimonials" className="py-16 md:py-20 bg-background" {...sectionMotionProps}>
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <TranslationLoader>
          <TestimonialsContent />
        </TranslationLoader>
      </motion.div>
    </motion.section>
  )
}

function TestimonialsContent() {
  const { t, tString } = useTranslation()

  const translatedTestimonials: Testimonial[] = [
    {
      name: tString("testimonials.sarah.name"),
      role: tString("testimonials.sarah.role"),
      company: tString("testimonials.sarah.company"),
      content: tString("testimonials.sarah.content"),
      avatar: "/images/15-viki-bg-icon.png",
      rating: 5,
    },
    {
      name: tString("testimonials.aychin.name"),
      role: tString("testimonials.aychin.role"),
      company: tString("testimonials.aychin.company"),
      content: tString("testimonials.aychin.content"),
      avatar: "/images/aseamIcon.ico",
      rating: 5,
    },
    {
      name: tString("testimonials.monika.name"),
      role: tString("testimonials.monika.role"),
      company: tString("testimonials.monika.company"),
      content: tString("testimonials.monika.content"),
      avatar: "/images/kasameri-logo.svg",
      rating: 5,
    },
    {
      name: tString("testimonials.plamen.name"),
      role: tString("testimonials.plamen.role"),
      company: tString("testimonials.plamen.company"),
      content: tString("testimonials.plamen.content"),
      avatar: "/images/naidenov-art-icon.png",
      rating: 5,
    },
    {
      name: tString("testimonials.nikola.name"),
      role: tString("testimonials.nikola.role"),
      company: tString("testimonials.nikola.company"),
      content: tString("testimonials.nikola.content"),
      avatar: "/images/abstract-apartment-icon.ico",
      rating: 5,
    },
    
  ]

  const testimonials = [...translatedTestimonials]
  return (
    <>
      <motion.div variants={childVariants}>
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
          {t("testimonials.title")}
        </h2>
      </motion.div>

      <motion.div variants={childVariants} className="max-w-6xl mx-auto">
        {/* Mobile: Single column scrolling up */}
        <div className="md:hidden">
          <ScrollingColumn testimonials={testimonials} direction="up" speed={80} isMobile={true} />
        </div>

        {/* Desktop: Two columns - left up, right down */}
        <div className="hidden md:grid md:grid-cols-2 md:gap-8">
          <ScrollingColumn testimonials={testimonials} direction="up" speed={70} />
          <ScrollingColumn testimonials={testimonials} direction="down" speed={70} />
        </div>
      </motion.div>
    </>
  )
}
