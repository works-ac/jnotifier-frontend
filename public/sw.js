const CACHE_NAME = "jnotifier-pwa-v2";

const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/offline",
  "/logo.png",
  "/manifest.json",
];

// 1. Install event: Pre-cache essential app shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn("PWA: Failed to cache shell assets during install", err);
      })
  );
});

// 2. Activate event: Clear legacy caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// 3. Fetch event: Stale-while-revalidate for assets, Network-first for navigations
self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  // Ignore non-GET requests and non-http(s) requests
  if (request.method !== "GET" || !url.protocol.startsWith("http")) {
    return;
  }

  // Handle navigation requests (page loads)
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(async () => {
          const cachedResponse = await caches.match(request);
          if (cachedResponse) return cachedResponse;

          const offlineFallback = await caches.match("/offline");
          if (offlineFallback) return offlineFallback;

          return caches.match("/");
        })
    );
    return;
  }

  // Handle static assets (CSS, JS, Images, Fonts)
  if (
    request.destination === "style" ||
    request.destination === "script" ||
    request.destination === "image" ||
    request.destination === "font"
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // Default fetch behavior
  event.respondWith(
    fetch(request).catch(() => caches.match(request))
  );
});
