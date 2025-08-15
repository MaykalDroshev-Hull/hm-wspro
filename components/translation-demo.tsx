"use client"

import { useTranslation } from '@/contexts/TranslationContext'
import { TranslationLoader } from './translation-loader'

export function TranslationDemo() {
  const { t, isReady, isLoading, locale } = useTranslation()

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Translation Cache Demo</h2>
      
      <div className="space-y-2">
        <p><strong>Status:</strong> {isLoading ? 'Loading...' : isReady ? 'Ready' : 'Not Ready'}</p>
        <p><strong>Current Locale:</strong> {locale}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">Without TranslationLoader:</h3>
          <p>Badge: {t("hero.badge")}</p>
          <p>Title: {t("hero.title")}</p>
          <p>Subtitle: {t("hero.subtitle")}</p>
        </div>

        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-2">With TranslationLoader:</h3>
          <TranslationLoader>
            <div>
              <p>Badge: {t("hero.badge")}</p>
              <p>Title: {t("hero.title")}</p>
              <p>Subtitle: {t("hero.subtitle")}</p>
            </div>
          </TranslationLoader>
        </div>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Cache Status:</h3>
        <p>This component demonstrates the difference between using and not using the TranslationLoader.</p>
        <p>Without the loader, you might see raw keys like &quot;hero.title&quot; before translations load.</p>
        <p>With the loader, you&apos;ll see skeleton placeholders until translations are ready.</p>
      </div>
    </div>
  )
}
