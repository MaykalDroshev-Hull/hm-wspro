"use client"

import type React from "react"

import { useState } from "react"
import { Github, Linkedin, Mail, MapPin, Send, Facebook } from "lucide-react"
import { useTranslation } from "@/contexts/TranslationContext"

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Form submission logic would go here
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", message: "" })
    // Show success message
    alert("Message sent! I'll get back to you soon.")
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
          {t("contact.title")}
        </h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          <div>
            <div className="mb-8">
              <p className="text-lg text-muted-foreground mb-6">
                {t("contact.intro")}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-muted-foreground">{t("contact.email")}</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-muted-foreground">{t("contact.location")}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-card-foreground">{t("contact.connectTitle")}</h3>
              
              {/* H (Hristo) Contact Row */}
              <div className="mb-6">
                <div className="flex items-center gap-4">
                  <h4 className="text-lg font-semibold text-purple-400 dark:text-purple-300">H</h4>
                  <SocialLink icon={<Github />} href="https://github.com/icakaxx" label="Hristo GitHub" />
                  <SocialLink icon={<Linkedin />} href="https://www.linkedin.com/in/hristo-kalchev-933456200/" label="Hristo LinkedIn" />
                  <SocialLink icon={<Facebook />} href="https://www.facebook.com/BlameH1M" label="Hristo Facebook" />
                </div>
              </div>

              {/* M (Michael) Contact Row */}
              <div>
                <div className="flex items-center gap-4">
                  <h4 className="text-lg font-semibold text-cyan-400 dark:text-cyan-300">M</h4>
                  <SocialLink icon={<Github />} href="https://github.com/MaykalDroshev-Hull" label="Michael GitHub" />
                  <SocialLink icon={<Linkedin />} href="https://www.linkedin.com/in/maykaldroshev/" label="Michael LinkedIn" />
                  <SocialLink icon={<Facebook />} href="https://www.facebook.com/Maikito007/" label="Michael Facebook" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="relative">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-purple-400 to-cyan-400 dark:from-purple-600 dark:to-cyan-600 opacity-75 blur"></div>
              <form onSubmit={handleSubmit} className="relative bg-card/80 backdrop-blur-sm rounded-lg p-6 md:p-8">
                <div className="mb-4">
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
                    className="w-full px-4 py-2 bg-muted/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
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
                    className="w-full px-4 py-2 bg-muted/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
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
                    className="w-full px-4 py-2 bg-muted/50 border border-border rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-purple-400 dark:focus:ring-purple-500 focus:border-transparent"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-md bg-gradient-to-r from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 text-white font-medium transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.5)] hover:from-purple-400 hover:to-blue-400 dark:hover:from-purple-500 dark:hover:to-blue-500"
                >
                  <Send size={18} />
                  {t("contact.form.submit")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
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
