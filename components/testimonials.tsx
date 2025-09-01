"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { TranslationLoader } from "./translation-loader"

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <TranslationLoader>
          <TestimonialsContent />
        </TranslationLoader>
      </div>
    </section>
  )
}

function TestimonialsContent() {
  const { t, tString } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: tString("testimonials.sarah.name"),
      role: tString("testimonials.sarah.role"),
      company: tString("testimonials.sarah.company"),
      content: tString("testimonials.sarah.content"),
      avatar: "/images/15-viki-bg-icon.png",
    },
    {
      id: 2,
      name: tString("testimonials.aychin.name"),
      role: tString("testimonials.aychin.role"),
      company: tString("testimonials.aychin.company"),
      content: tString("testimonials.aychin.content"),
      avatar: "/images/aseamIcon.ico",
    }
  ]

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, testimonials.length])

  const goToPrevious = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setAutoplay(false)
    setActiveIndex((current) => (current + 1) % testimonials.length)
  }

  return (
    <>
      <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
        {t("testimonials.title")}
      </h2>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 opacity-50 blur"></div>
        <div className="relative overflow-hidden rounded-lg bg-card/80 backdrop-blur-sm p-8 md:p-12">
          <Quote className="absolute top-6 left-6 h-12 w-12 text-purple-400/30 dark:text-purple-500/20" />

          <div className="relative z-10">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-opacity duration-500 ${
                  index === activeIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                }`}
                style={{ display: index === activeIndex ? "block" : "none" }}
              >
                <p className="text-lg md:text-xl text-muted-foreground mb-8 italic">&ldquo;{testimonial.content}&rdquo;</p>

                <div className="flex items-center">
                  <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4 border-2 border-purple-400 dark:border-purple-500">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-card-foreground">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute bottom-6 right-6 flex space-x-2">
            <button
              onClick={goToPrevious}
              className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={goToNext}
              className="p-2 rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="absolute bottom-6 left-6 flex space-x-1">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setActiveIndex(index)
                }}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === activeIndex ? "bg-purple-400 dark:bg-purple-500" : "bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
