importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js"
);

// const cacheName = "cache-v1.0.1";
// const resourcesToPrecache = ["/", "index.html", "css/tailwind.css", "/quiz"];

// self.addEventListener("install", (event) => {
//   console.log("Service worker install event!");
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       return cache.addAll(resourcesToPrecache);
//     })
//   );
// });

// self.addEventListener("activate", (event) => {
//   console.log("Activate event!");
// });

// self.addEventListener("fetch", (event) => {
//   console.log("Fetch intercepted for:", event.request.url);
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       if (cachedResponse) {
//         return cachedResponse;
//       }
//       return fetch(event.request);
//     })
//   );
// });

workbox.routing.registerRoute(
  ({ request }) => request.destination === "image",
  new workbox.strategies.CacheFirst()
);
