# Cache Issue Fix Summary

## Problem
The website was heavily cached, preventing new content (especially projects) from appearing unless viewed in incognito mode.

## Root Causes Identified

### 1. **Service Worker (PRIMARY ISSUE)**
- The service worker (`public/sw.js`) was using a **cache-first strategy** for all content
- It was caching HTML pages (`/`, `/en`, `/bg`) and locale files
- Old cache version was persisting across deployments

### 2. **Next.js Configuration Issues**
- ETags were enabled (`generateEtags: true`), causing browser caching
- No cache-control headers on HTML pages
- Long cache times on locale files (1 hour + 24 hour stale)

### 3. **Translation Cache**
- Client-side translations were cached in sessionStorage
- Cache-first strategy prevented fresh content loading

### 4. **Missing Dynamic Rendering Settings**
- Pages didn't have `dynamic = 'force-dynamic'` or `revalidate = 0`
- Next.js was statically generating pages without revalidation

## Changes Made

### 1. Service Worker Updates (`public/sw.js`)
✅ **Changed cache version** from v1.0.0 to v2.0.0 (forces cache refresh)
✅ **Removed HTML pages and locales** from cached URLs
✅ **Implemented network-first strategy** for:
   - HTML pages
   - API routes
   - Locale files
✅ **Added immediate activation** with `skipWaiting()` and `clients.claim()`
✅ **Cache only static assets** (images, fonts)

### 2. Next.js Configuration (`next.config.ts`)
✅ **Disabled ETags**: `generateEtags: false`
✅ **Added no-cache headers** for all pages:
   ```
   Cache-Control: no-cache, no-store, must-revalidate, max-age=0
   ```
✅ **Updated locale cache** from 1 hour to no-cache

### 3. Page Configuration
✅ **Added to `app/[locale]/page.tsx`**:
   ```javascript
   export const dynamic = 'force-dynamic'
   export const revalidate = 0
   export const fetchCache = 'force-no-store'
   ```
✅ **Added to `app/page.tsx`**:
   ```javascript
   export const dynamic = 'force-dynamic'
   export const revalidate = 0
   export const fetchCache = 'force-no-store'
   ```

### 4. API Routes (`app/api/contact/route.ts`)
✅ **Added dynamic rendering**:
   ```javascript
   export const dynamic = 'force-dynamic'
   export const revalidate = 0
   ```

### 5. Translation Cache (`lib/translation-cache.ts`)
✅ **Changed to network-first strategy**: Always fetch fresh data from network
✅ **Added cache-busting**: Appends timestamp to fetch URLs
✅ **Added no-cache headers** to fetch requests
✅ **Fallback to cache** only if network fails

### 6. Middleware (`middleware.ts`)
✅ **Added no-cache headers** to all responses:
   ```javascript
   response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0')
   response.headers.set('Pragma', 'no-cache')
   response.headers.set('Expires', '0')
   ```

## Deployment Instructions

### 1. Deploy to Production
```bash
npm run build
npm run start
# Or deploy to Vercel
vercel --prod
```

### 2. Clear Existing Cache (Important!)
After deployment, users need to clear their browser cache or the old service worker will persist:

**Option A: Hard Refresh (Recommended for testing)**
- Chrome/Edge: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- Firefox: `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac)

**Option B: Clear Service Workers (For persistent issues)**
1. Open DevTools (F12)
2. Go to "Application" tab
3. Click "Service Workers" in sidebar
4. Click "Unregister" on the old service worker
5. Hard refresh the page

**Option C: Clear Browser Cache**
1. Chrome: Settings → Privacy → Clear browsing data
2. Select "Cached images and files"
3. Clear data

### 3. Verification
After deployment and cache clearing:
1. ✅ Visit the site in a normal browser window
2. ✅ Check that new content appears
3. ✅ Verify no caching by checking Network tab (should see 200 status, not 304)
4. ✅ Test that updates appear without incognito mode

## What Now Works Differently

### Before (Cache-First)
1. Browser requests page
2. Service worker checks cache
3. Returns cached version (even if stale)
4. No network request made

### After (Network-First for Content)
1. Browser requests page
2. Service worker always fetches from network
3. Returns fresh content
4. No caching of HTML/API/locale files

### Static Assets (Images)
- Still cached for performance
- Users won't need to re-download images on each visit
- Won't prevent content updates

## Important Notes

⚠️ **First-Time Users After Deployment**
- Users who visit before you deploy will need to do a hard refresh once
- This is because the old service worker is already installed
- After the first hard refresh, everything will work correctly

✅ **New Users**
- Will get the new service worker automatically
- No cache issues from the start

📱 **Mobile Browsers**
- May need to close and reopen the browser app
- Some mobile browsers are more aggressive with caching

🔄 **Future Deployments**
- Update the cache version in `sw.js` if you make major changes
- Current version: `hm-wspro-v2.0.0`
- Format: `hm-wspro-vX.Y.Z`

## Testing the Fix

1. **Deploy the changes** to production
2. **Clear your browser cache** completely
3. **Do a hard refresh** (Ctrl + Shift + R)
4. **Add new projects** to `/public/locales/en/common.json` and `/public/locales/bg/common.json`
5. **Deploy again**
6. **Refresh the page** (regular refresh, not hard refresh)
7. **Verify new projects appear** immediately

## Cache Strategy Summary

| Resource Type | Strategy | Cache Duration |
|--------------|----------|----------------|
| HTML Pages | Network-First | No cache |
| API Routes | Network-First | No cache |
| Locale Files | Network-First | No cache |
| Images | Cache-First | 1 year |
| Fonts | Cache-First | Indefinite |
| Scripts/CSS | No cache | No cache |

## Questions?

If you still experience caching issues after deployment:
1. Ensure you've done a hard refresh
2. Check the service worker is v2.0.0 in DevTools
3. Clear all browser cache
4. Try in a different browser
5. Check Network tab for 200 status codes (not 304)

