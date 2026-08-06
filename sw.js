const CACHE_NAME = 'atharvax-v1.1';
const ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/css/variables.css',
  '/css/main.css',
  '/js/app.js',
  '/manifest.json',
  '/assets/icon-192.png',
  '/assets/icon-512.png',
  '/assets/icon-192-maskable.png',
  '/assets/icon-512-maskable.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Force cache updates for critical assets
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  // Only intercept GET requests
  if (e.request.method !== 'GET') return;
  // Don't intercept API calls
  if (e.request.url.includes('/api/')) return;

  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      // Fetch fresh network resources and save to cache dynamically
      const networkFetch = fetch(e.request)
        .then((fetchResponse) => {
          if (fetchResponse.status === 200) {
            const responseClone = fetchResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseClone);
            });
          }
          return fetchResponse;
        })
        .catch((err) => {
          // If network fetch fails, handle offline scenarios
          console.log('[SW] Fetch failed; returning offline page if navigating:', err);
          if (e.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          // Let it fail naturally if it's an image/api/etc.
          throw err;
        });

      // Return cached response instantly if we have it, else wait for network
      return cachedResponse || networkFetch;
    }).catch((err) => {
      // Fallback in case both cache match and network fetch fail
      if (e.request.mode === 'navigate') {
        return caches.match('/offline.html');
      }
      throw err;
    })
  );
});
