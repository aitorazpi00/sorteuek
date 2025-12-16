const CACHE_NAME = 'sorteathor-v1';
const urlsToCache = [
  '/',
  '/sorteuek/index.html',
  '/sorteuek/styles.css',
  '/sorteuek/manifest.json',
  '/sorteuek/service-worker.js',
  '/sorteuek/main.js',
  '/sorteuek/bote_script.js',
  '/sorteuek/script.js',
  '/sorteuek/public/sorteo.html',
  '/sorteuek/images/icon-192x192.png',
  '/sorteuek/images/icon-512x512.png',
  '/sorteuek/images/screenshot-1280x720.png',
  '/sorteuek/images/screenshot-1920x1080.png'
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache abierta');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activación del Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Recuperación de recursos desde la caché
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
