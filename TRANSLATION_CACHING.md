# Translation Caching System

This document explains how the translation caching system works and how to use it to prevent raw translation keys from showing before translations load.

## Overview

The translation caching system provides:
- **Instant loading** of translations from cache
- **Preloading** of all supported locales
- **Persistent storage** across page reloads
- **Loading states** to prevent raw keys from showing
- **Server-side compatibility** for SSR

## How It Works

### 1. Translation Cache (`lib/translation-cache.ts`)

The cache system provides both client and server-side caching:

```typescript
import { clientCache, preloadAllTranslations } from '@/lib/translation-cache'

// Preload all translations
await preloadAllTranslations()

// Get translations from cache
const translations = await clientCache.get('en')
```

### 2. Translation Context (`contexts/TranslationContext.tsx`)

The context manages translation state and provides the `isReady` flag:

```typescript
import { useTranslation } from '@/contexts/TranslationContext'

function MyComponent() {
  const { t, isReady, isLoading } = useTranslation()
  
  if (!isReady) {
    return <div>Loading...</div>
  }
  
  return <h1>{t("hero.title")}</h1>
}
```

### 3. Translation Loader (`components/translation-loader.tsx`)

The loader component prevents raw keys from showing:

```typescript
import { TranslationLoader } from './translation-loader'

function Hero() {
  return (
    <TranslationLoader>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.subtitle")}</p>
    </TranslationLoader>
  )
}
```

## Usage Examples

### Basic Usage with TranslationLoader

```typescript
import { TranslationLoader } from '@/components/translation-loader'

export function Hero() {
  return (
    <TranslationLoader>
      <div>
        <h1>{t("hero.title")}</h1>
        <p>{t("hero.subtitle")}</p>
      </div>
    </TranslationLoader>
  )
}
```

### Conditional Rendering

```typescript
import { useTranslationReady } from '@/components/translation-loader'

export function MyComponent() {
  const { isReady, isLoading } = useTranslationReady()
  
  if (isLoading) {
    return <div>Loading translations...</div>
  }
  
  if (!isReady) {
    return <div>Translations not available</div>
  }
  
  return <div>{t("some.key")}</div>
}
```

### Higher-Order Component

```typescript
import { withTranslationLoader } from '@/components/translation-loader'

function MyComponent({ title }: { title: string }) {
  return <h1>{t("hero.title")}</h1>
}

export default withTranslationLoader(MyComponent)
```

## Performance Features

### 1. Preloading

All supported locales are preloaded on app initialization:

```typescript
// In performance-optimizer.tsx
useEffect(() => {
  preloadAllTranslations()
}, [])
```

### 2. Persistent Storage

Translations are cached in:
- **Memory**: For instant access
- **SessionStorage**: For persistence across page reloads

### 3. Network Optimization

- **Preload links** for translation files
- **Fetch API** with proper error handling
- **Fallback** to English if translations fail

## Configuration

### Supported Locales

Edit `lib/locale-utils.ts` to add/remove locales:

```typescript
export const supportedLocales = ['en', 'bg', 'fr'] as const
```

### Translation Files

Place translation files in `public/locales/{locale}/common.json`:

```json
{
  "hero": {
    "title": "H&M Website Provisioning",
    "subtitle": "Bridging Code and Creativity"
  }
}
```

## Best Practices

### 1. Always Use TranslationLoader

```typescript
// ✅ Good
<TranslationLoader>
  <h1>{t("hero.title")}</h1>
</TranslationLoader>

// ❌ Bad - might show raw keys
<h1>{t("hero.title")}</h1>
```

### 2. Check Translation Readiness

```typescript
const { isReady } = useTranslation()

if (!isReady) {
  return <LoadingSpinner />
}
```

### 3. Provide Fallbacks

```typescript
<TranslationLoader fallback={<DefaultContent />}>
  <TranslatedContent />
</TranslationLoader>
```

## Troubleshooting

### Raw Keys Still Showing

1. Check if `TranslationLoader` is wrapping the content
2. Verify `isReady` is true before rendering
3. Ensure translations are properly cached

### Performance Issues

1. Check if `preloadAllTranslations()` is called
2. Verify cache is working (check browser dev tools)
3. Monitor network requests for translation files

### Cache Not Working

1. Check browser console for errors
2. Verify sessionStorage is available
3. Check if translation files are accessible

## Migration Guide

### From Old System

1. **Wrap components** with `TranslationLoader`
2. **Use `isReady`** for conditional rendering
3. **Remove manual loading states** if using `TranslationLoader`

### Example Migration

```typescript
// Before
function Hero() {
  const { t, isLoading } = useTranslation()
  
  if (isLoading) return <div>Loading...</div>
  
  return <h1>{t("hero.title")}</h1>
}

// After
function Hero() {
  return (
    <TranslationLoader>
      <h1>{t("hero.title")}</h1>
    </TranslationLoader>
  )
}
```

## API Reference

### TranslationLoader Props

```typescript
interface TranslationLoaderProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  showSkeleton?: boolean
}
```

### useTranslation Hook

```typescript
const { 
  t,           // Translation function
  isReady,     // Whether translations are ready
  isLoading,   // Whether translations are loading
  locale,      // Current locale
  changeLocale // Function to change locale
} = useTranslation()
```

### Cache Functions

```typescript
// Preload all translations
await preloadAllTranslations()

// Get translations for specific locale
const translations = await clientCache.get('en')

// Check if locale is cached
const hasCache = clientCache.has('en')

// Clear cache
clientCache.clear()
```
