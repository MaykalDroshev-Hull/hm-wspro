import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function RootPage() {
  try {
    // Get Accept-Language header
    const headersList = await headers()
    const acceptLanguage = headersList.get('accept-language')
    
    let detectedLocale = 'bg' // Default to Bulgarian
    
    if (acceptLanguage) {
      // Parse Accept-Language header
      const languages = acceptLanguage
        .split(',')
        .map(lang => {
          const [code, quality = '1'] = lang.trim().split(';q=')
          return {
            code: code.split('-')[0].toLowerCase(),
            quality: parseFloat(quality) || 1
          }
        })
        .sort((a, b) => b.quality - a.quality)
      
      // Check if English is preferred
      const englishLang = languages.find(lang => lang.code === 'en')
      if (englishLang) {
        detectedLocale = 'en'
      }
    }
    
    // Redirect to detected locale
    redirect(`/${detectedLocale}`)
  } catch {
    // If anything fails, default to Bulgarian
    redirect('/bg')
  }
}
