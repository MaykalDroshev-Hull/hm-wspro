import { redirect } from 'next/navigation'

export default async function RootPage() {
  // Always redirect to Bulgarian locale
  redirect('/bg')
}
