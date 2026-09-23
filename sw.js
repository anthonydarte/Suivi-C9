/* Suivi C9 — service worker. Change CACHE à chaque mise en ligne d'une nouvelle version. */
const CACHE = "suivi-c9-v3.1.0";
const ASSETS = ["./", "./index.html", "./manifest.webmanifest",
  "./icons/icon-192.png", "./icons/icon-512.png", "./icons/maskable-512.png",
  "./icons/apple-touch-icon.png", "./icons/favicon-32.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith("suivi-c9") && k !== CACHE && k !== CACHE + "-fonts").map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});
self.addEventListener("message", e => { if (e.data === "skip") self.skipWaiting(); });

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    if (req.mode === "navigate") {
      // Page : réseau d'abord pour recevoir les mises à jour, cache si hors ligne.
      e.respondWith(fetch(req).then(r => { const cp = r.clone(); caches.open(CACHE).then(c => c.put("./index.html", cp)); return r; })
        .catch(() => caches.match("./index.html")));
      return;
    }
    e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => {
      if (r.ok) { const cp = r.clone(); caches.open(CACHE).then(c => c.put(req, cp)); }
      return r;
    })));
    return;
  }
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    // Polices : cache d'abord, rafraîchies en arrière-plan.
    e.respondWith(caches.open(CACHE + "-fonts").then(c => c.match(req).then(hit => {
      const net = fetch(req).then(r => { if (r.ok) c.put(req, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    })));
  }
});
