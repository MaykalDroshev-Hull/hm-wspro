"use client"

import { useEffect, useRef, type ReactNode } from "react"
import Lenis from "lenis"

declare global {
  interface Window {
    lenis?: Lenis
  }
}

interface LenisProviderProps {
  children: ReactNode
}

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

  return children
}

