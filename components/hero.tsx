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
            className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-sm font-medium text-green-400 backdrop-blur-sm"
            role="listitem"
          >
            {t("hero.badge")}
          </motion.span>
          <motion.span
            variants={child}
            className="inline-flex items-center px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 backdrop-blur-sm"
            role="listitem"
          >
            {t("hero.design")}
          </motion.span>
        </div>
      </motion.div>
    )
  }

  const AnimatedHeroTitle = () => {
    const container = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: 0.08,
          delayChildren: 0.3,
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
          className="block bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(74,222,128,0.5)]"
        >
          H&M
        </motion.span>
        <motion.span
          variants={child}
          className="block bg-gradient-to-r from-purple-400 to-fuchsia-600 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(192,38,211,0.5)]"
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
          delayChildren: 0.6,
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
        className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300 drop-shadow-md"
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
          delay: 0.95,
          ease: "easeOut"
        }}
        className="flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <Link
          href="#projects"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-green-500/10 border border-green-500/50 text-green-400 font-medium transition-all duration-300 hover:bg-green-500/20 hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-black"
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
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-purple-600/10 border border-purple-500/50 text-purple-400 font-medium transition-all duration-300 hover:bg-purple-600/20 hover:shadow-[0_0_20px_rgba(192,38,211,0.4)] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black"
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
      {/* Radial gradient to improve text readability against the Matrix background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.5)_0%,transparent_70%)] pointer-events-none z-0" />
      
      <motion.div
        className="container mx-auto px-4 z-10 text-center relative"
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
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Skip to main content
      </a>
    </motion.section>
  )
}
