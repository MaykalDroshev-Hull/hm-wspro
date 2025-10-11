"use client"

interface SEOStructuredDataProps {
  locale: string
}

export default function SEOStructuredData({ locale }: SEOStructuredDataProps) {
  // Organization structured data
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "H&M Website Provisioning",
    "alternateName": "H&M WSPro",
    "url": "https://hm-wspro.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://hm-wspro.com/favicon.ico",
      "width": 32,
      "height": 32
    },
    "description": locale === 'en' 
      ? "Professional website development services by Hristo and Michael. Fast, modern websites built with Next.js, React, and cutting-edge technologies."
      : "Професионални услуги за разработка на уеб сайтове от Христо и Михаил. Бързи, модерни уеб сайтове, изградени с Next.js, React и най-новите технологии.",
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": ["BG", "GB"],
      "addressLocality": ["Bulgaria", "United Kingdom"]
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "hm.websiteprovisioning@gmail.com",
      "contactType": "customer service",
      "availableLanguage": ["English", "Bulgarian"]
    },
    "sameAs": [
      "https://github.com/hm-wspro",
      "https://linkedin.com/company/hm-website-provisioning"
    ],
    "serviceType": [
      "Web Development",
      "Full-Stack Development", 
      "E-commerce Solutions",
      "Custom Web Applications",
      "Mobile Applications",
      "Database Design"
    ],
    "areaServed": ["BG", "GB", "EU", "Worldwide"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": locale === 'en' ? "Web Development Services" : "Услуги за Уеб Разработка",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Website Development" : "Разработка на Уеб Сайтове",
            "description": locale === 'en' 
              ? "Custom website development with Next.js and React"
              : "Персонализирана разработка на уеб сайтове с Next.js и React"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "E-commerce Solutions" : "Електронни Търговски Решения",
            "description": locale === 'en' 
              ? "Full-featured e-commerce platforms with payment processing"
              : "Пълнофункционални електронни търговски платформи с обработка на плащания"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": locale === 'en' ? "Full-Stack Development" : "Пълнофункционална Разработка",
            "description": locale === 'en' 
              ? "End-to-end solutions from database to frontend"
              : "Цялостни решения от база данни до потребителски интерфейс"
          }
        }
      ]
    }
  }

  // WebSite structured data
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "H&M Website Provisioning",
    "url": "https://hm-wspro.com",
    "description": locale === 'en' 
      ? "Professional website development services - Fast and modern websites built with Next.js, React, and cutting-edge technologies"
      : "Професионални услуги за разработка на уеб сайтове - Бързи и модерни уеб сайтове, изградени с Next.js, React и най-новите технологии",
    "inLanguage": locale === 'en' ? "en-US" : "bg-BG",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://hm-wspro.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  }

  // LocalBusiness structured data
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "H&M Website Provisioning",
    "image": "https://hm-wspro.com/favicon.ico",
    "description": locale === 'en' 
      ? "Professional website development services in Bulgaria and United Kingdom"
      : "Професионални услуги за разработка на уеб сайтове в България и Обединеното кралство",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": ["BG", "GB"],
      "addressLocality": ["Bulgaria", "United Kingdom"]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "42.7339",
      "longitude": "25.4858"
    },
    "url": "https://hm-wspro.com",
    "telephone": "+44-XXX-XXX-XXXX",
    "email": "hm.websiteprovisioning@gmail.com",
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$",
    "currenciesAccepted": "EUR, BGN, GBP, USD",
    "paymentAccepted": "Credit Card, Bank Transfer, PayPal",
    "areaServed": ["BG", "GB", "EU", "Worldwide"]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessData) }}
      />
    </>
  )
}
