self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('vibely-cache').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/icons/vibely-img-192',
          '/icons/vibely-img-512',
          '/src/index.css',
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });