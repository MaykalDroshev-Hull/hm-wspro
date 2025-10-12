// Updated cache version to force cache refresh
const CACHE_NAME = 'hm-wspro-v2.0.0'
// Only cache static assets, NOT pages or locales
const urlsToCache = [
  '/favicon.ico',
  '/site.webmanifest',
  '/images/15viki-bg-desktop.jpg',
  '/images/15viki-bg-mobile.jpg'
]

// Install event - cache resources and skip waiting
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache')
        return cache.addAll(urlsToCache)
      })
  )
  // Force the waiting service worker to become the active service worker
  self.skipWaiting()
})

// Fetch event - NETWORK FIRST strategy to ensure fresh content
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  
  // Never cache HTML pages, API routes, or locale files
  const shouldNotCache = 
    event.request.method !== 'GET' ||
    url.pathname.includes('/api/') ||
    url.pathname.includes('/locales/') ||
    url.pathname === '/' ||
    url.pathname === '/en' ||
    url.pathname === '/bg' ||
    event.request.headers.get('accept')?.includes('text/html')

  if (shouldNotCache) {
    // Always fetch from network, no caching
    event.respondWith(
      fetch(event.request, {
        cache: 'no-store'
      }).catch(() => {
        // If network fails, return error
        return new Response('Network error', { status: 408 })
      })
    )
    return
  }

  // For static assets, use cache-first strategy
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request)
          .then((response) => {
            // Only cache static assets
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response
            }

            // Only cache images and fonts
            if (url.pathname.startsWith('/images/') || 
                url.pathname.includes('.woff') || 
                url.pathname.includes('.ttf')) {
              const responseToCache = response.clone()
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache)
                })
            }

            return response
          })
      })
  )
})

// Activate event - clean up old caches and take control immediately
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim()
    })
  )
})

// Background sync for offline form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync())
  }
})

function doBackgroundSync() {
  // Handle background sync logic
  console.log('Background sync triggered')
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/favicon.ico'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon.ico'
      }
    ]
  }

  event.waitUntil(
    self.registration.showNotification('H&M Website Provisioning', options)
  )
})

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close()

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    )
  }
})
