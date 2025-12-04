/**
 * ANIMATIONS AND SMOOTH SCROLLING - REUSABLE EXTRACTION
 * 
 * This file contains all animations and smooth scrolling functionality
 * extracted from the H&M Website Provisioning project.
 * 
 * USAGE:
 * 1. Install required dependencies:
 *    npm install lenis framer-motion
 * 
 * 2. Add CSS to your globals.css (see CSS section below)
 * 
 * 3. Wrap your app with LenisProvider:
 *    <LenisProvider>
 *      <YourApp />
 *    </LenisProvider>
 * 
 * 4. Use smoothScroll function for anchor links
 * 
 * 5. Use animation variants in your components with framer-motion
 */

"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Lenis from "lenis"
import { motion } from "framer-motion"

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

declare global {
  interface Window {
    lenis?: Lenis
  }
}

interface LenisProviderProps {
  children: ReactNode
}

// ============================================================================
// SMOOTH SCROLLING PROVIDER (LENIS)
// ============================================================================

/**
 * LenisProvider - Provides smooth scrolling using Lenis library
 * 
 * Features:
 * - Smooth scrolling on desktop only (mobile detection)
 * - Automatic anchor link handling
 * - Respects scroll-margin-top for proper offset
 * - Cleanup on unmount
 */
export function LenisProvider({ children }: LenisProviderProps) {
  const lenisRef = useRef<Lenis | null>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    // Detect mobile devices
    const isMobile = (() => {
      // Check for touch capability
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
      // Check screen width (768px is typical tablet breakpoint)
      const isSmallScreen = window.innerWidth < 768
      return hasTouch && isSmallScreen
    })()

    const root = document.documentElement

    // Only enable smooth scrolling on desktop
    if (!isMobile) {
      root.classList.add("lenis")
      root.classList.add("lenis-smooth")

      const lenis = new Lenis({
        lerp: 0.08,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        syncTouch: true,
        wheelMultiplier: 1.1,
      })

      lenisRef.current = lenis
      window.lenis = lenis

      const raf = (time: number) => {
        lenis.raf(time)
        frameRef.current = requestAnimationFrame(raf)
      }

      frameRef.current = requestAnimationFrame(raf)

      return () => {
        if (frameRef.current) {
          cancelAnimationFrame(frameRef.current)
        }
        lenis.destroy()
        lenisRef.current = null
        root.classList.remove("lenis")
        root.classList.remove("lenis-smooth")
        if (window.lenis === lenis) {
          delete window.lenis
        }
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") {
      return
    }

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) {
        return
      }

      const anchor = target.closest("a[href^='#'], a[href^='/.'], a[href^='./']") as HTMLAnchorElement | null
      if (!anchor || !lenisRef.current) {
        return
      }

      const href = anchor.getAttribute("href")
      if (!href || !href.includes("#")) {
        return
      }

      const hash = href.startsWith("#") ? href : `#${href.split("#").pop() || ""}`

      if (!hash) {
        return
      }

      const destination = document.querySelector(hash)
      if (!destination) {
        return
      }

      event.preventDefault()

      const computedStyle = window.getComputedStyle(destination)
      const scrollMarginTop = parseInt(computedStyle.scrollMarginTop || "0", 10) || 0

      lenisRef.current.scrollTo(destination as HTMLElement, {
        offset: -scrollMarginTop,
      })
    }

    document.addEventListener("click", handleAnchorClick)

    return () => {
      document.removeEventListener("click", handleAnchorClick)
    }
  }, [])

  return <>{children}</>
}

// ============================================================================
// SMOOTH SCROLL UTILITY FUNCTION
// ============================================================================

/**
 * smoothScroll - Utility function for programmatic smooth scrolling
 * 
 * @param target - CSS selector string (e.g., "#section-id") or element ID
 * 
 * Usage:
 *   smoothScroll("#about")
 *   smoothScroll("#contact")
 */
export function smoothScroll(target: string) {
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

// ============================================================================
// FRAMER MOTION ANIMATION VARIANTS
// ============================================================================

const easeOut = "easeOut" as const

/**
 * Section Animation Variants
 * Use for main section containers that fade in and slide up
 */
export const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

/**
 * Section Motion Props (Alternative format for whileInView)
 * Use with motion.section directly
 */
export const sectionMotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
  viewport: { once: true, amount: 0.2, margin: "0px 0px -100px 0px" },
}

/**
 * Container Variants
 * Use for containers that stagger their children
 */
export const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

/**
 * Child Variants
 * Use for child elements within a staggered container
 */
export const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
}

/**
 * Card Hover Variants
 * Use for interactive cards with hover effects
 */
export const cardHoverVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
  whileHover: { scale: 1.02, transition: { duration: 0.2 } },
}

/**
 * Text Animation Variants (for word-by-word or character animations)
 */
export const textContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
}

export const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
}

// ============================================================================
// REUSABLE ANIMATED COMPONENTS
// ============================================================================

/**
 * AnimatedSection - Wrapper component for animated sections
 */
interface AnimatedSectionProps {
  id?: string
  className?: string
  children: ReactNode
}

export function AnimatedSection({ id, className = "", children }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={className}
      {...sectionMotionProps}
    >
      {children}
    </motion.section>
  )
}

/**
 * AnimatedContainer - Container with stagger animation
 */
interface AnimatedContainerProps {
  className?: string
  children: ReactNode
}

export function AnimatedContainer({ className = "", children }: AnimatedContainerProps) {
  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0 }}
    >
      {children}
    </motion.div>
  )
}

/**
 * AnimatedItem - Individual item with fade-in animation
 */
interface AnimatedItemProps {
  className?: string
  children: ReactNode
  delay?: number
}

export function AnimatedItem({ className = "", children, delay = 0 }: AnimatedItemProps) {
  return (
    <motion.div
      className={className}
      variants={childVariants}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}

// ============================================================================
// CSS TO ADD TO YOUR GLOBALS.CSS
// ============================================================================

/*
Add this CSS to your globals.css file:

html.lenis {
  height: auto;
}

.lenis.lenis-smooth {
  scroll-behavior: auto !important;
}

.lenis.lenis-smooth [data-lenis-prevent] {
  overscroll-behavior: contain;
}

.lenis.lenis-scrolling iframe {
  pointer-events: none;
}

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.animate-scroll {
  animation: scroll 70s linear infinite;
}
*/

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

/*
EXAMPLE 1: Basic section with animation
----------------------------------------
import { AnimatedSection, AnimatedContainer, AnimatedItem } from './animations-and-smooth-scroll'

export function MySection() {
  return (
    <AnimatedSection id="about" className="py-20">
      <AnimatedContainer className="container mx-auto px-4">
        <AnimatedItem>
          <h2>Title</h2>
        </AnimatedItem>
        <AnimatedItem>
          <p>Content</p>
        </AnimatedItem>
      </AnimatedContainer>
    </AnimatedSection>
  )
}

EXAMPLE 2: Using variants directly
-----------------------------------
import { motion } from 'framer-motion'
import { sectionVariants, containerVariants, childVariants } from './animations-and-smooth-scroll'
import { useAnimation, useInView } from 'framer-motion'
import { useRef, useEffect } from 'react'

export function MySection() {
  const ref = useRef(null)
  const controls = useAnimation()
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  return (
    <motion.section
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={controls}
    >
      <motion.div variants={containerVariants}>
        <motion.div variants={childVariants}>Item 1</motion.div>
        <motion.div variants={childVariants}>Item 2</motion.div>
      </motion.div>
    </motion.section>
  )
}

EXAMPLE 3: Using smoothScroll function
---------------------------------------
import { smoothScroll } from './animations-and-smooth-scroll'

export function Navigation() {
  return (
    <nav>
      <button onClick={() => smoothScroll('#about')}>About</button>
      <button onClick={() => smoothScroll('#contact')}>Contact</button>
    </nav>
  )
}

EXAMPLE 4: App setup with LenisProvider
-----------------------------------------
import { LenisProvider } from './animations-and-smooth-scroll'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}
*/

