import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

// Force dynamic rendering and disable all caching
export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

export default async function RootPage() {
  // The middleware will handle the redirect, but this is a fallback
  // Get headers to check if middleware ran
  const headersList = await headers()
  
  // Check for preferred locale cookie
  const cookieHeader = headersList.get('cookie')
  const localeMatch = cookieHeader?.match(/NEXT_LOCALE=([^;]+)/)
  const preferredLocale = localeMatch?.[1]
  
  if (preferredLocale && (preferredLocale === 'en' || preferredLocale === 'bg')) {
    redirect(`/${preferredLocale}`)
  }
  
  // Default fallback to Bulgarian
  redirect('/bg')
}
