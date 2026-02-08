"use client"
 
import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { toast } from "sonner"
import { TranslationLoader } from "./translation-loader"
import { motion } from "framer-motion"

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

const AnimatedContactIntro = ({ children }: { children: React.ReactNode }) => {
  // Ensure children is a string before splitting
  const text = typeof children === 'string' ? children : String(children)
  // Split by words
  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
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
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className="text-lg text-muted-foreground mb-6"
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

export default function Contact() {
  const { t, locale } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    telephone: "",
    message: "",
  })
  const messageFilledRef = useRef(false)

  // Pre-fill message from sessionStorage if enquiry was made
  useEffect(() => {
    const checkAndFillMessage = () => {
      if (messageFilledRef.current) return false
      
      if (typeof window !== 'undefined') {
        const enquiryMessage = sessionStorage.getItem('enquiryMessage')
        const enquiryType = sessionStorage.getItem('enquiryType')
        
        if (enquiryMessage && enquiryType === 'hmcommerce') {
          setFormData((prev) => ({ ...prev, message: enquiryMessage }))
          messageFilledRef.current = true
          // Clear sessionStorage after reading
          sessionStorage.removeItem('enquiryMessage')
          sessionStorage.removeItem('enquiryType')
          return true
        }
      }
      return false
    }

    // Check on mount
    checkAndFillMessage()

    // Listen for custom event when enquiry button is clicked
    const handleEnquiryMessage = (event: CustomEvent) => {
      if (event.detail?.message && !messageFilledRef.current) {
        setFormData((prev) => ({ ...prev, message: event.detail.message }))
        messageFilledRef.current = true
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem('enquiryMessage')
          sessionStorage.removeItem('enquiryType')
        }
      }
    }

    window.addEventListener('enquiryMessageSet', handleEnquiryMessage as EventListener)

    // Check periodically for a short time after mount (in case user navigates from projects)
    let checkCount = 0
    const maxChecks = 10 // Check for 5 seconds (10 * 500ms)
    const interval = setInterval(() => {
      checkCount++
      if (checkAndFillMessage() || checkCount >= maxChecks) {
        clearInterval(interval)
      }
    }, 500)

    return () => {
      window.removeEventListener('enquiryMessageSet', handleEnquiryMessage as EventListener)
      clearInterval(interval)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          locale: locale || 'en'
        }),
      })

      if (response.ok) {
        toast.success(
          locale === 'bg' 
            ? 'Съобщението е изпратено успешно! Ще отговорим в рамките на 24-48 часа.'
            : 'Message sent successfully! We will respond within 24-48 hours.',
          {
            duration: 5000,
            style: {
              background: '#10b981',
              color: 'white',
              border: 'none',
            },
          }
        )
        
        // Reset form
        setFormData({ name: "", telephone: "", message: "" })
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Submission error:', error)
      toast.error(
        locale === 'bg'
          ? 'Грешка при изпращане на съобщението. Моля, опитайте отново.'
          : 'Error sending message. Please try again.',
        {
          duration: 5000,
          style: {
            background: '#ef4444',
            color: 'white',
            border: 'none',
          },
        }
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.section id="contact" className="py-16 md:py-20 bg-gradient-to-b from-background to-muted" {...sectionMotionProps}>
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <motion.div variants={childVariants}>
          <TranslationLoader>
            <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
              {t("contact.title")}
            </h2>
          </TranslationLoader>
        </motion.div>

        <motion.div variants={childVariants} className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <motion.div variants={childVariants}>
            <TranslationLoader>
              <motion.div variants={containerVariants} className="mb-8">
                <AnimatedContactIntro>
                  {t("contact.intro")}
                </AnimatedContactIntro>
              </motion.div>
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 opacity-75 blur"></div>
              <form onSubmit={handleSubmit} className="relative bg-[#222222] rounded-lg p-6 md:p-8">
                <TranslationLoader>
                  <motion.div variants={containerVariants} className="space-y-4">
                    <motion.div variants={childVariants} className="mb-4">
                      <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">
                        {t("contact.form.name")}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-muted/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </motion.div>

                    <motion.div variants={childVariants} className="mb-4">
                      <label htmlFor="telephone" className="block text-sm font-medium text-muted-foreground mb-1">
                        {t("contact.form.telephone")}
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-muted/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </motion.div>

                    <motion.div variants={childVariants} className="mb-4">
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                        {t("contact.form.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-muted/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                      />
                    </motion.div>


                    <motion.div variants={childVariants} className="mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 dark:from-purple-600 dark:to-cyan-600 text-white font-medium rounded-md transition-all duration-300 hover:from-purple-400 hover:to-cyan-400 dark:hover:from-purple-500 dark:hover:to-cyan-500 focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            {locale === 'bg' ? 'Изпращане...' : 'Sending...'}
                          </>
                        ) : (
                          <>
                            {t("contact.form.submit")}
                            <Send size={18} />
                          </>
                        )}
                      </button>
                    </motion.div>
                  </motion.div>
                </TranslationLoader>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

