"use client"

import React, { useEffect, useRef, useState } from "react"

interface MatrixBackgroundProps {
  color?: string
  fontSize?: number
  speed?: number
  opacity?: number
}

export function MatrixBackground({
  color = "#0F0",
  fontSize = 14,
  speed = 1, // Speed factor
  opacity = 0.05, // Trail fade opacity (lower = longer trails)
}: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Handle resize
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Initial size
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Characters - mix of Katakana, Latin, and Numerals for authentic look
    const katakana = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン"
    const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const nums = "0123456789"
    const alphabet = katakana + latin + nums

    const columns = Math.floor(canvas.width / fontSize)
    const drops: number[] = []

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100 // Start at random positions above canvas
    }

    let animationFrameId: number
    let lastTime = 0
    const fps = 30 // Cap FPS for consistent speed and performance
    const interval = 1000 / fps

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw)

      const deltaTime = currentTime - lastTime
      if (deltaTime < interval) return

      lastTime = currentTime - (deltaTime % interval)

      // Translucent black background to create trail effect
      ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = color
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length))
        
        // x = column index * font size
        // y = drop value * font size
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillText(text, x, y)

        // Reset drop to top randomly after it has crossed the screen
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }

        // Increment y coordinate
        drops[i]++
      }
    }

    animationFrameId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [dimensions, color, fontSize, opacity, speed])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-50 pointer-events-none"
      style={{ opacity: 0.8 }} // Global opacity of the canvas
    />
  )
}

