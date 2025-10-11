import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { headers } from 'next/headers'

export default async function NotFound() {
  // Try to detect locale from cookies
  const headersList = await headers()
  const cookieHeader = headersList.get('cookie')
  const localeMatch = cookieHeader?.match(/NEXT_LOCALE=([^;]+)/)
  const locale = localeMatch?.[1] || 'bg' // Default to Bulgarian

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-card-foreground">
            {locale === 'bg' ? 'Страницата не е намерена' : 'Page Not Found'}
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            {locale === 'bg' 
              ? 'Съжаляваме, страницата, която търсите, не съществува или е преместена.'
              : "Sorry, the page you're looking for doesn't exist or has been moved."}
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 font-medium"
          >
            <ArrowLeft size={20} />
            {locale === 'bg' ? 'Към Начало' : 'Go Home'}
          </Link>
          <Link
            href="/en"
            className="inline-flex items-center px-6 py-3 border border-border text-card-foreground rounded-lg hover:bg-muted transition-colors duration-300 font-medium"
          >
            English Version
          </Link>
          <Link
            href="/bg"
            className="inline-flex items-center px-6 py-3 border border-border text-card-foreground rounded-lg hover:bg-muted transition-colors duration-300 font-medium"
          >
            Българска Версия
          </Link>
        </div>
      </div>
    </div>
  )
}
