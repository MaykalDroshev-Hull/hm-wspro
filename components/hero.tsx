"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"

const heroStackItems = [
  "hero.stack.next",
  "hero.stack.shadcn",
  "hero.stack.radix",
  "hero.stack.tailwind",
]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { t } = useTranslation()

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

  return (
    <section 
      id="home" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
      role="banner"
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0" 
        aria-hidden="true"
        role="presentation"
      />
      <div className="container mx-auto px-4 z-10 text-center">
        <TranslationLoader>
          <div className="relative flex justify-center mb-8">
            <div
              className="flex items-center gap-3 px-6"
              role="list"
              aria-label="Capabilities badges"
            >
              <span
                className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-200/60 to-blue-200/60 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-300/40 dark:border-purple-500/20 text-sm font-medium text-muted-foreground"
                role="listitem"
              >
                {t("hero.badge")}
              </span>
              <span
                className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-purple-200/60 to-blue-200/60 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-300/40 dark:border-purple-500/20 text-sm font-medium text-muted-foreground"
                role="listitem"
              >
                {t("hero.design")}
              </span>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-10 rounded-full bg-gradient-to-r from-black via-black/80 to-transparent"
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 rounded-full bg-gradient-to-l from-black via-black/80 to-transparent"
            />
          </div>
          <h1 
            id="hero-heading"
            className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400"
          >
            H&M<br></br>Website Provisioning

          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-muted-foreground">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="#projects" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-200/60 to-blue-200/60 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-300/40 dark:border-purple-500/20 text-purple-900 dark:text-purple-100 font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(147,51,234,0.35)] hover:from-purple-100/80 hover:to-blue-200/80 dark:hover:from-purple-800/40 dark:hover:to-blue-800/40 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label={`${t("hero.cta")} - Navigate to projects section`}
            >
              {t("hero.cta")}
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:from-purple-400 hover:to-blue-400 dark:hover:from-purple-500 dark:hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label={`${t("hero.contact")} - Navigate to contact section`}
            >
              {t("hero.contact")}
            </Link>
          </div>
        </TranslationLoader>
      </div>
      
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Skip to main content
      </a>
    </section>
  )
}
