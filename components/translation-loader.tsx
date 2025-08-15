"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import { Skeleton } from '@/components/ui/skeleton'

interface TranslationLoaderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  showSkeleton?: boolean
}

export function TranslationLoader({ 
  children, 
  fallback = null, 
  showSkeleton = true 
}: TranslationLoaderProps) {
  const { isReady, isLoading } = useTranslation()

  if (isLoading || !isReady) {
    if (showSkeleton) {
      return (
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      )
    }
    return fallback
  }

  return <>{children}</>
}

// Higher-order component for wrapping components that need translations
export function withTranslationLoader<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: React.ReactNode
) {
  return function WrappedComponent(props: P) {
    return (
      <TranslationLoader fallback={fallback}>
        <Component {...props} />
      </TranslationLoader>
    )
  }
}

// Hook for conditional rendering based on translation readiness
export function useTranslationReady() {
  const { isReady, isLoading } = useTranslation()
  return { isReady: isReady && !isLoading, isLoading }
}
