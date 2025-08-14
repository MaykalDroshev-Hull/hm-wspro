# Locale Detection System

This document explains how the locale detection system works in the H&M Website Provisioning application.

## Overview

The application automatically detects the user's preferred language and redirects them to the appropriate localized version of the site.

## How It Works

### 1. Server-Side Detection (Middleware)

- **Location**: `middleware.ts`
- **Function**: Intercepts all requests and checks for locale in the URL
- **Detection Method**: Reads the `Accept-Language` header from the browser
- **Fallback**: Defaults to English (`en`) if no supported language is detected

### 2. Client-Side Detection (Hook)

- **Location**: `hooks/useLocaleDetection.ts`
- **Function**: Detects browser language preferences on the client side
- **Detection Method**: Uses `navigator.language` and `navigator.languages`
- **Use Case**: Provides real-time locale information to components

### 3. Supported Locales

- **English**: `en` (default)
- **Bulgarian**: `bg`

## File Structure

```
lib/
├── locale-utils.ts          # Client-side locale utilities
├── server-locale-utils.ts   # Server-side locale utilities (middleware)
hooks/
├── useLocaleDetection.ts    # Client-side locale detection hook
contexts/
├── TranslationContext.tsx   # Translation context with locale management
components/
├── language-switcher.tsx    # Language switching component
middleware.ts                # Next.js middleware for locale routing
```

## Key Features

### Automatic Redirect
- Users visiting `/` are automatically redirected to `/en` or `/bg` based on their browser language
- The redirect happens at the middleware level for optimal performance

### Smart Fallback
- If a user's preferred language isn't supported, they're redirected to English
- The system gracefully handles edge cases and errors

### User Control
- Users can manually switch languages using the language switcher
- The detected language is highlighted with an "Auto" badge
- Users can easily switch back to their detected language

### SEO Friendly
- Each locale has its own URL structure (`/en/about`, `/bg/about`)
- Proper `lang` and `dir` attributes are set on HTML elements
- Search engines can properly index localized content

## Usage Examples

### In Components
```tsx
import { useTranslation } from '@/contexts/TranslationContext'

function MyComponent() {
  const { locale, t, detectedLocale } = useTranslation()
  
  return (
    <div>
      <p>Current locale: {locale}</p>
      <p>Detected locale: {detectedLocale}</p>
      <p>{t('nav.home')}</p>
    </div>
  )
}
```

### In Server Components
```tsx
import { detectLocaleFromHeaders } from '@/lib/server-locale-utils'

export default function ServerComponent() {
  const locale = detectLocaleFromHeaders()
  // Use locale for server-side operations
}
```

## Browser Compatibility

- **Modern Browsers**: Full support for `navigator.languages`
- **Older Browsers**: Falls back to `navigator.language`
- **Server-Side**: Works with all browsers that send `Accept-Language` headers

## Performance Considerations

- Middleware runs only on page requests (not static assets)
- Locale detection happens once per session
- Translations are cached in the TranslationContext
- No unnecessary re-renders during locale switching

## Future Enhancements

- Add support for more languages
- Implement locale persistence in localStorage
- Add RTL language support
- Implement locale-specific date/time formatting
