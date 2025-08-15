"use client"

import { useEffect } from 'react'
import { supportedLocales } from '@/lib/locale-utils'
import { preloadAllTranslations } from '@/lib/translation-cache'

interface PerformanceOptimizerProps {
  locale: string
}

export default function PerformanceOptimizer({ locale }: PerformanceOptimizerProps) {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero images
      const heroImage = new Image()
      heroImage.src = '/images/15viki-bg-desktop.jpg'
      
      // Preload fonts
      const fontLink = document.createElement('link')
      fontLink.rel = 'preload'
      fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
      fontLink.as = 'style'
      document.head.appendChild(fontLink)
      
      // Preload all locale data for instant switching
      supportedLocales.forEach(supportedLocale => {
        const localeLink = document.createElement('link')
        localeLink.rel = 'preload'
        localeLink.href = `/locales/${supportedLocale}/common.json`
        localeLink.as = 'fetch'
        localeLink.crossOrigin = 'anonymous'
        document.head.appendChild(localeLink)
      })
    }

    // Initialize performance optimizations
    preloadCriticalResources()
    preloadAllTranslations()
    setupLazyLoading()
    registerServiceWorker()

    // Cleanup
    return () => {
      // Cleanup if needed
    }
  }, [locale])

  // Intersection Observer for lazy loading
  const setupLazyLoading = () => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement
            if (img.dataset.src) {
              img.src = img.dataset.src
              img.classList.remove('lazy')
              observer.unobserve(img)
            }
          }
        })
      })

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img)
      })
    }
  }

  // Service Worker registration for PWA
  const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js')
        console.log('SW registered: ', registration)
      } catch (registrationError) {
        console.log('SW registration failed: ', registrationError)
      }
    }
  }

  return null
}
