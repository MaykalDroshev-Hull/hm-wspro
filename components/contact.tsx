"use client"
 
import type React from "react"

import { useState } from "react"
import { Github, Linkedin, Mail, MapPin, Send, Facebook } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"
import { toast } from "sonner"
import { TranslationLoader } from "./translation-loader"
import { motion } from "framer-motion"

const easeOut = "easeOut" as const

const sectionMotionProps = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: easeOut },
  viewport: { once: true, amount: 0.1, margin: "0px 0px -100px 0px" },
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

export default function Contact() {
  const { t, locale } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

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
        setFormData({ name: "", email: "", message: "" })
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
    <motion.section id="contact" className="py-20 bg-gradient-to-b from-background to-muted" {...sectionMotionProps}>
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
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
                <motion.p variants={childVariants} className="text-lg text-muted-foreground mb-6">
                  {t("contact.intro")}
                </motion.p>

                <motion.div variants={containerVariants} className="space-y-4">
                  <motion.div variants={childVariants} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700">
                      <Mail className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-muted-foreground">{t("contact.email")}</span>
                  </motion.div>

                  <motion.div variants={childVariants} className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700">
                      <MapPin className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-muted-foreground">{t("contact.location")}</span>
                  </motion.div>
                </motion.div>
              </motion.div>

              <motion.div variants={containerVariants}>
                <h3 className="text-xl font-bold mb-4 text-card-foreground">{t("contact.connectTitle")}</h3>
                
                {/* H (Hristo) Contact Row */}
                <motion.div variants={childVariants} className="mb-6">
                  <div className="flex items-center gap-4">
                    <h4 className="text-lg font-semibold text-purple-400 dark:text-purple-300">H</h4>
                    <SocialLink icon={<Github />} href="https://github.com/icakaxx" label="Hristo GitHub" />
                    <SocialLink icon={<Linkedin />} href="https://www.linkedin.com/in/hristo-kalchev-933456200/" label="Hristo LinkedIn" />
                    <SocialLink icon={<Facebook />} href="https://www.facebook.com/BlameH1M" label="Hristo Facebook" />
                  </div>
                </motion.div>

                {/* M (Michael) Contact Row */}
                <motion.div variants={childVariants}>
                  <div className="flex items-center gap-4">
                    <h4 className="text-lg font-semibold text-cyan-400 dark:text-cyan-300">M</h4>
                    <SocialLink icon={<Github />} href="https://github.com/MaykalDroshev-Hull" label="Michael GitHub" />
                    <SocialLink icon={<Linkedin />} href="https://www.linkedin.com/in/maykaldroshev/" label="Michael LinkedIn" />
                    <SocialLink icon={<Facebook />} href="https://www.facebook.com/Maikito007/" label="Michael Facebook" />
                  </div>
                </motion.div>
              </motion.div>
            </TranslationLoader>
          </motion.div>

          <motion.div variants={childVariants}>
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 opacity-75 blur"></div>
              <form onSubmit={handleSubmit} className="relative bg-card/80 backdrop-blur-sm rounded-lg p-6 md:p-8">
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
                      <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">
                        {t("contact.form.email")}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-2 bg-muted/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                      />
                    </motion.div>

                    <motion.div variants={childVariants} className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">
                        {t("contact.form.message")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSubmitting}
                        rows={5}
                        className="w-full px-4 py-2 bg-muted/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none"
                      />
                    </motion.div>

                    <motion.div variants={childVariants}>
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

function SocialLink({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-muted text-muted-foreground hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 hover:text-white transition-all duration-300"
    >
      {icon}
    </a>
  )
}
