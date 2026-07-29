const CACHE_NAME = 'atharvax-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/variables.css',
  '/css/main.css',
  '/js/app.js',
  '/manifest.json'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Only intercept GET requests
  if (e.request.method !== 'GET') return;
  // Don't intercept API calls
  if (e.request.url.includes('/api/')) return;

  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request).then(
        (fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, fetchResponse.clone());
            return fetchResponse;
          });
        }
      );
    })
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
    })
  );
});
