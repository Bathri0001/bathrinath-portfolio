/* Portfolio service worker: offline-capable app shell. API calls are never cached. */
const VERSION = "portfolio-v1";
const SHELL = ["/", "/favicon.ico", "/icons/icon-192.png", "/resume.pdf"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;
  const store = (res) => { if (res && res.status === 200) { const copy = res.clone(); caches.open(VERSION).then((c) => c.put(req, copy)); } return res; };
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).then(store).catch(() => caches.match(req).then((m) => m || caches.match("/"))));
    return;
  }
  e.respondWith(caches.match(req).then((m) => m || fetch(req).then(store)));
});
