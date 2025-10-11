import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TranslationProvider } from "@/contexts/TranslationContext"
import { FOUCPreventionWrapper } from "@/components/translation-loader"
import { Analytics } from "@vercel/analytics/next"
import { ToastProvider } from "@/components/ui/toast"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f0f23' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('https://hm-wspro.com'),
  title: {
    default: "H&M Website Provisioning - Fast & Modern Websites",
    template: "%s | H&M Website Provisioning"
  },
  description: "Professional website development services by Hristo and Michael. Fast, modern websites built with Next.js, React, and cutting-edge technologies. Full-stack development, e-commerce solutions, and custom web applications.",
  keywords: [
    "website development",
    "web design",
    "Next.js development",
    "React development",
    "full-stack development",
    "e-commerce websites",
    "custom web applications",
    "Bulgaria web development",
    "UK web development",
    "modern websites",
    "responsive design",
    "web application development"
  ],
  authors: [
    { name: "Hristo" },
    { name: "Michael" }
  ],
  creator: "H&M Website Provisioning",
  publisher: "H&M Website Provisioning",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hm-wspro.com",
    siteName: "H&M Website Provisioning",
    title: "H&M Website Provisioning - Fast & Modern Websites",
    description: "Professional website development services by Hristo and Michael. Fast, modern websites built with Next.js, React, and cutting-edge technologies.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "H&M Website Provisioning - Professional Web Development Services"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "H&M Website Provisioning - Fast & Modern Websites",
    description: "Professional website development services by Hristo and Michael. Fast, modern websites built with Next.js, React, and cutting-edge technologies.",
    images: ["/images/og-image.jpg"],
    creator: "@hmwspro",
    site: "@hmwspro"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://hm-wspro.com",
    languages: {
      'en': 'https://hm-wspro.com/en',
      'bg': 'https://hm-wspro.com/bg',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
    ],
    shortcut: '/favicon.ico',
    other: [
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#6366f1' }
    ]
  },
  manifest: '/site.webmanifest',
  category: "technology",
  classification: "Web Development Services",
  other: {
    'msapplication-TileColor': '#6366f1',
    'msapplication-config': '/browserconfig.xml',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <TranslationProvider>
          <FOUCPreventionWrapper>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
              {children}
            </ThemeProvider>
          </FOUCPreventionWrapper>
        </TranslationProvider>
        <ToastProvider />
        <Analytics />
      </body>
    </html>
  )
}
