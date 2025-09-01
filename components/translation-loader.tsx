"use client"

import { useTranslation } from '@/contexts/TranslationContext'

interface TranslationLoaderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function TranslationLoader({ 
  children, 
  fallback = null
}: TranslationLoaderProps) {
  const { isReady, isLoading, isInitialized } = useTranslation()

  // Hide content until translations are ready
  if (!isInitialized || isLoading || !isReady) {
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
  const { isReady, isLoading, isInitialized } = useTranslation()
  return { 
    isReady: isReady && !isLoading && isInitialized, 
    isLoading,
    isInitialized 
  }
}

// FOUC Prevention Wrapper - hides entire app until translations are ready
export function FOUCPreventionWrapper({ children }: { children: React.ReactNode }) {
  const { isReady, isLoading, isInitialized } = useTranslation()
  
  // Hide content until translations are fully loaded
  if (!isInitialized || isLoading || !isReady) {
    return null
  }
  
  return <>{children}</>
}
