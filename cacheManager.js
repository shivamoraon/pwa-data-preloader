self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("pwa-static-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/src/",
        "/src/components",
        "/src/layouts",
        "/src/pages",
        "/src/assets",
        "/src/boot",
        "/src/stores",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).then((response) => {
        return caches.open("pwa-dynamic-cache").then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
