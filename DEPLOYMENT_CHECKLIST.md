# Deployment Checklist - Cache Fix

## Pre-Deployment
- [x] Updated service worker to v2.0.0
- [x] Changed to network-first strategy for HTML/API/locales
- [x] Disabled ETags in Next.js config
- [x] Added no-cache headers to all pages
- [x] Added dynamic rendering to pages
- [x] Updated translation cache strategy
- [x] Added no-cache headers to middleware

## Deploy to Production

```bash
# Build the project
npm run build

# Test locally first (optional)
npm run start

# Deploy to production (if using Vercel)
vercel --prod

# Or if using other hosting, push to git
git add .
git commit -m "Fix: Resolve caching issues - force fresh content loading"
git push origin master
```

## Post-Deployment Steps

### 1. Clear Your Own Cache
- [ ] Do a hard refresh: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
- [ ] Open DevTools (F12)
- [ ] Go to Application → Service Workers
- [ ] Verify service worker version is `hm-wspro-v2.0.0`
- [ ] If old version showing, click "Unregister" and refresh

### 2. Test the Fix
- [ ] Visit homepage - does it load?
- [ ] Check projects section - are all projects visible?
- [ ] Open Network tab in DevTools
- [ ] Refresh page - look for `200` status codes (not `304`)
- [ ] Add a test project to locale files
- [ ] Deploy again
- [ ] Regular refresh (NOT hard refresh)
- [ ] Verify new project appears immediately

### 3. Test on Different Browsers
- [ ] Chrome/Edge
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Mobile browsers

### 4. Inform Users (If Needed)
If you have existing users, consider sending a message:

```
"We've updated our website! If you're seeing old content, 
please do a hard refresh (Ctrl + Shift + R) once. 
After that, everything will update automatically."
```

## Troubleshooting

### Issue: Still seeing old content
**Solution:**
1. Clear browser cache completely
2. Unregister old service worker in DevTools
3. Close all tabs with the site
4. Open site in new tab
5. Try incognito mode to verify

### Issue: Service worker not updating
**Solution:**
1. DevTools → Application → Service Workers
2. Check "Update on reload"
3. Hard refresh multiple times
4. May need to close all browser tabs and reopen

### Issue: Mobile still cached
**Solution:**
1. Close browser app completely
2. Clear browser cache in phone settings
3. Reopen browser and visit site

### Issue: Getting 408 errors
**Solution:**
This happens when network is down and SW can't fetch.
This is expected behavior - ensures fresh content over stale cache.

## Quick Verification Commands

```bash
# Check if build was successful
npm run build

# Verify no TypeScript errors
npm run type-check

# Check for any console errors in browser
# Open DevTools → Console → Look for errors

# Verify headers in production
curl -I https://hm-wspro.com/en | grep -i cache-control
# Should see: cache-control: no-cache, no-store, must-revalidate, max-age=0
```

## Success Criteria

✅ New content appears immediately after deployment
✅ No need for incognito mode to see updates
✅ Hard refresh only needed once per user after this deployment
✅ Future deployments show updates on normal refresh
✅ Network tab shows 200 status codes
✅ Service worker version is v2.0.0

## Need to Revert?

If something goes wrong, you can temporarily disable the service worker:

```javascript
// In your app, add this to unregister:
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    registrations.forEach(registration => registration.unregister())
  })
}
```

But with these fixes, you shouldn't need to!

## Future Cache Version Updates

When making major changes to the SW, update the version:

Current: `const CACHE_NAME = 'hm-wspro-v2.0.0'`

Format: `hm-wspro-vMAJOR.MINOR.PATCH`
- MAJOR: Breaking changes to cache strategy
- MINOR: New cached resources
- PATCH: Bug fixes

Example: `hm-wspro-v2.1.0`, `hm-wspro-v3.0.0`, etc.

