const cacheName = "pragana-v1";
const staticAssets = [
  "./",
  "./index.html",
  "./css/main.css",
  "./main.js",
  "./images/paris.jpg",
  "./images/hello-icon-128.png",
  "./images/hello-icon-144.png",
  "./images/hello-icon-152.png",
  "./images/hello-icon-192.png",
  "./images/hello-icon-256.png",
  "./images/hello-icon-512.png"
];

self.addEventListener("install", async e => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
  return self.skipWaiting();
});

self.addEventListener("activate", e => {
  self.clients.claim();
});

self.addEventListener("fetch", async e => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.origin === location.origin) {
    e.respondWith(cacheFirst(req));
  } else {
    e.respondWith(networkAndCache(req));
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  return cached || fetch(req);
}

async function networkAndCache(req) {
  const cache = await caches.open(cacheName);
  try {
    const fresh = await fetch(req);
    await cache.put(req, fresh.clone());
    return fresh;
  } catch (e) {
    const cached = await cache.match(req);
    return cached;
  }
}
