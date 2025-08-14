import { detectLocaleFromHeaders } from '@/lib/server-locale-utils'
import { redirect } from 'next/navigation'

export default async function RootPage() {
  // Detect locale from headers and redirect
  const detectedLocale = await detectLocaleFromHeaders()
  redirect(`/${detectedLocale}`)
}
