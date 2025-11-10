"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { motion, useAnimation, useInView } from "framer-motion"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader, useTranslationReady } from "./translation-loader"

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

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement | null>(null)
  const sectionControls = useAnimation()
  const containerControls = useAnimation()
  const isSectionInView = useInView(sectionRef, { margin: "-10% 0px", amount: 0.2, once: true })
  const { isReady } = useTranslationReady()
  const {} = useTranslation()

  function smoothScroll(target: string) {
    const element = document.querySelector(target)
    if (!element) {
      return
    }

    const lenisWindow = window as typeof window & {
      lenis?: { scrollTo: (destination: Element | string, options?: { offset?: number }) => void }
    }

    const scrollMarginTop = parseInt(window.getComputedStyle(element).scrollMarginTop || "0", 10) || 0

    if (lenisWindow.lenis) {
      lenisWindow.lenis.scrollTo(element, { offset: -scrollMarginTop })
      return
    }

    element.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    if (isReady && isSectionInView) {
      sectionControls.start("visible")
      containerControls.start("visible")
    }
  }, [isReady, isSectionInView, sectionControls, containerControls])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Particle settings
    const particlesArray: Particle[] = []
    const numberOfParticles = 100

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        if (!canvas) {
          // Initialize with default values if canvas is null
          this.x = 0
          this.y = 0
          this.size = 1
          this.speedX = 0
          this.speedY = 0
          this.color = 'rgba(255, 255, 255, 0.5)'
          return
        }
        
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(
          Math.random() * 100 + 155,
        )}, ${Math.floor(Math.random() * 255)}, ${Math.random() * 0.5 + 0.1})`
      }

      update() {
        if (!canvas) return
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        if (this.x < 0) this.x = canvas.width
        if (this.y > canvas.height) this.y = 0
        if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const init = () => {
      for (let i = 0; i < numberOfParticles; i++) {
        const particle = new Particle()
        // Only add particle if it was properly initialized
        if (particle.x !== 0 || particle.y !== 0) {
          particlesArray.push(particle)
        }
      }
    }

    const connectParticles = () => {
      if (!ctx) return
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x
          const dy = particlesArray[a].y - particlesArray[b].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            const opacity = 1 - distance / 100
            ctx.strokeStyle = `rgba(150, 150, 255, ${opacity * 0.2})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update()
        particlesArray[i].draw()
      }

      connectParticles()
      requestAnimationFrame(animate)
    }

    init()
    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  const AnimatedHeroBadges = () => {
    const { t } = useTranslation()

    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
          delayChildren: 0, // Start immediately
        },
      },
    }

    const child = {
      hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.4 },
      },
    }

    return (
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative flex justify-center mb-8"
      >
        <div
          className="flex items-center gap-3 px-6"
          role="list"
          aria-label="Capabilities badges"
        >
          <motion.span
            variants={child}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-200/60 to-blue-200/60 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-300/40 dark:border-purple-500/20 text-sm font-medium text-muted-foreground"
            role="listitem"
          >
            {t("hero.badge")}
          </motion.span>
          <motion.span
            variants={child}
            className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-200/60 to-blue-200/60 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-300/40 dark:border-purple-500/20 text-sm font-medium text-muted-foreground"
            role="listitem"
          >
            {t("hero.design")}
          </motion.span>
        </div>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-10 rounded-full bg-gradient-to-r from-black via-black/80 to-transparent"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-full bg-gradient-to-l from-black via-black/80 to-transparent"
        />
      </motion.div>
    )
  }

  const AnimatedHeroTitle = () => {
    const container = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.3, // Start title while badges are still animating
        },
      },
    }

    const child = {
      hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.5 },
      },
    }

    return (
      <motion.h1
        variants={container}
        initial="hidden"
        animate="visible"
        id="hero-heading"
        className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
      >
        <motion.span
          variants={child}
          className="block bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent"
        >
          H&M
        </motion.span>
        <motion.span
          variants={child}
          className="block bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 bg-clip-text text-transparent"
        >
          Website Provisioning
        </motion.span>
      </motion.h1>
    )
  }

  const AnimatedHeroSubtitle = () => {
    const { t } = useTranslation()
    const text = String(t("hero.subtitle") || "")

    // Split by words
    const words = text.split(" ")

    const container = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.06,
          delayChildren: 0.6, // Start subtitle while title is still animating
        },
      },
    }

    const child = {
      hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.35 },
      },
    }

    return (
      <motion.p
        variants={container}
        initial="hidden"
        animate="visible"
        className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground"
      >
        {words.map((word: string, i: number) => (
          <motion.span
            key={i}
            variants={child}
            style={{ display: "inline-block", marginRight: "0.25em" }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    )
  }

  const AnimatedHeroButtons = () => {
    const { t } = useTranslation()

    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.95, // Start buttons as subtitle settles
          ease: "easeOut"
        }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          href="#projects"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-200/60 to-blue-200/60 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-300/40 dark:border-purple-500/20 text-purple-900 dark:text-purple-100 font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.35)] hover:from-purple-100/80 hover:to-blue-200/80 dark:hover:from-purple-800/40 dark:hover:to-blue-800/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label={`${t("hero.cta")} - Navigate to projects section`}
          onClick={(event) => {
            event.preventDefault()
            smoothScroll("#projects")
          }}
        >
          {t("hero.cta")}
        </Link>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:from-purple-400 hover:to-blue-400 dark:hover:from-purple-500 dark:hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          aria-label={`${t("hero.contact")} - Navigate to contact section`}
          onClick={(event) => {
            event.preventDefault()
            smoothScroll("#contact")
          }}
        >
          {t("hero.contact")}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.section 
      ref={sectionRef}
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
      variants={sectionVariants}
      initial="hidden"
      animate={sectionControls}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
        aria-hidden="true"
        role="presentation"
      />
      <motion.div
        className="container mx-auto px-4 z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={containerControls}
      >
        <TranslationLoader>
          <motion.div variants={childVariants}>
            <AnimatedHeroBadges />
          </motion.div>
          <motion.div variants={childVariants}>
            <AnimatedHeroTitle />
          </motion.div>
          <motion.div variants={childVariants}>
            <AnimatedHeroSubtitle />
          </motion.div>
          <motion.div variants={childVariants}>
            <AnimatedHeroButtons />
          </motion.div>
        </TranslationLoader>
      </motion.div>
      
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Skip to main content
      </a>
    </motion.section>
  )
}
