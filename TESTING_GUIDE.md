# Testing Guide - Verify Cache Fix

## Quick Test (After Deployment)

### 1. Initial Check
1. Open your website in a regular browser window
2. Open DevTools (F12)
3. Go to **Application** tab → **Service Workers**
4. Verify version shows `hm-wspro-v2.0.0`
5. If not, do a hard refresh: `Ctrl + Shift + R`

### 2. Network Tab Verification
1. Open DevTools (F12)
2. Go to **Network** tab
3. Check "Disable cache" (checkbox at top)
4. Refresh the page
5. Look at the response for your HTML page
6. Status should be `200` (not `304 Not Modified`)
7. Check response headers - should include:
   ```
   cache-control: no-cache, no-store, must-revalidate, max-age=0
   ```

### 3. Locale Files Check
1. In Network tab, filter for `common.json`
2. You should see requests like:
   - `/locales/en/common.json?t=1234567890`
   - `/locales/bg/common.json?t=1234567890`
3. Notice the `?t=` timestamp - this is cache-busting
4. Status should be `200`
5. Check headers - should show no-cache

### 4. Real-World Test
**Step A: Before Change**
1. Note what projects are currently showing on your site

**Step B: Make a Change**
1. Open `/public/locales/en/common.json`
2. Add a test project or modify existing text
3. Deploy the changes

**Step C: Verify Update**
1. Go to your website (don't use hard refresh)
2. Just do a normal refresh (F5 or Cmd+R)
3. **The new content should appear immediately!**
4. No need for incognito mode

**Step D: Test on Multiple Devices**
1. Test on desktop
2. Test on mobile
3. Test on different browsers

## Service Worker Console Logs

Open the Console tab and look for these logs:

```
✅ Good signs:
- "Opened cache"
- "Deleting old cache: hm-wspro-v1.0.0"
- No 304 status codes
- Fresh fetch requests

❌ Bad signs:
- Still seeing v1.0.0
- Getting 304 status codes
- No fetch requests in Network tab
```

## Manual Cache Clear (One Time Only)

Users who visited before the fix will need to do this **once**:

### Desktop
**Chrome/Edge:**
1. Settings → Privacy and security → Clear browsing data
2. Select "Cached images and files"
3. Time range: "All time"
4. Click "Clear data"

**Firefox:**
1. Settings → Privacy & Security
2. Cookies and Site Data → Clear Data
3. Check "Cached Web Content"
4. Click "Clear"

**Safari:**
1. Safari → Preferences → Advanced
2. Check "Show Develop menu in menu bar"
3. Develop → Empty Caches

### Mobile
**iPhone (Safari):**
1. Settings → Safari
2. Scroll down to "Clear History and Website Data"
3. Confirm

**Android (Chrome):**
1. Chrome → Menu (3 dots) → Settings
2. Privacy → Clear browsing data
3. Select "Cached images and files"
4. Clear data

## Console Commands for Testing

Open the Console tab and run these:

### Check Service Worker Version
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => {
    console.log('Service Worker:', reg.active?.scriptURL)
  })
})
```

### Check Current Cache
```javascript
caches.keys().then(keys => {
  console.log('Cache versions:', keys)
})
```

### Force Service Worker Update
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.update())
})
```

### Unregister All Service Workers (Emergency)
```javascript
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => {
    reg.unregister()
    console.log('Unregistered:', reg)
  })
})
```

## Expected Behavior After Fix

| Action | Before Fix | After Fix |
|--------|------------|-----------|
| Deploy new content | Not visible (needs incognito) | ✅ Visible immediately |
| Regular refresh | Shows old cache | ✅ Fetches fresh content |
| Hard refresh | Shows new content | ✅ Shows new content |
| Network status | 304 (cached) | ✅ 200 (fresh) |
| Service Worker | v1.0.0 | ✅ v2.0.0 |
| Locale files | Cached 1 hour | ✅ Always fresh |

## Troubleshooting Common Issues

### Issue 1: Service Worker Not Updating
**Symptoms:** Still shows v1.0.0 in Application tab

**Solution:**
```javascript
// In Console:
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister())
}).then(() => {
  window.location.reload(true)
})
```

### Issue 2: Content Still Cached
**Symptoms:** Old projects still showing

**Solution:**
1. Check Network tab - are requests being made?
2. If no requests: clear browser cache completely
3. If requests show 304: service worker still using old version
4. Solution: Unregister SW (see above)

### Issue 3: Mobile Not Updating
**Symptoms:** Works on desktop, not on mobile

**Solution:**
1. Close browser app completely
2. Clear app cache in phone settings
3. Reopen browser
4. Visit site with hard refresh (if available)

### Issue 4: 408 Request Timeout Errors
**Symptoms:** Getting network errors

**Solution:**
This is actually expected if offline! The new SW won't serve stale cache.
- If you're online and getting 408: check your internet connection
- If offline: this is correct behavior (won't show stale content)

## Success Checklist

After deployment, verify all of these:

- [ ] Service worker version is v2.0.0
- [ ] Network tab shows 200 status codes
- [ ] Cache-Control headers say "no-cache, no-store"
- [ ] New deployments appear without incognito mode
- [ ] Locale files have timestamp query params (?t=...)
- [ ] Projects section shows all current projects
- [ ] Works in Chrome/Firefox/Safari
- [ ] Works on mobile devices
- [ ] Console shows no errors
- [ ] Old caches (v1.0.0) are deleted

## Performance Note

**Q:** Won't disabling cache make the site slower?

**A:** Slightly, but negligible because:
- Static assets (images) are still cached
- Next.js optimizes everything
- Modern CDNs are very fast
- Users prefer fresh content over speed
- Most load time is network, not cache lookup

**Q:** Will users need to re-download everything each time?

**A:** No!
- Images: Still cached (1 year)
- Fonts: Still cached
- Only HTML and locale files fetch fresh
- These files are very small (< 100KB total)

## Monitoring in Production

After deployment, monitor for:

1. **Error Rate:** Check for increase in 408 or network errors
2. **Load Times:** Slight increase is normal (< 100ms)
3. **User Reports:** Users saying "I see old content"
4. **Server Logs:** Check for unusual cache-related requests

All of these should be normal with the new setup!

## When to Update Cache Version

Update the service worker cache version when you:

1. Change the caching strategy significantly
2. Add new resources to cache
3. Want to force-clear all user caches
4. Make breaking changes to static assets

Current version: `v2.0.0`
Next version (if needed): `v2.1.0` or `v3.0.0`

Location: `/public/sw.js` line 2:
```javascript
const CACHE_NAME = 'hm-wspro-v2.0.0' // Update this
```

## Questions & Contact

If you're still experiencing issues after following this guide:

1. Check all items in the Success Checklist
2. Review the Troubleshooting section
3. Try in a completely different browser/device
4. Check browser console for specific errors
5. Verify deployment was successful

The fix should work for 99% of cases after one hard refresh!

