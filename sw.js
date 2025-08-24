const CACHE_NAME = "trlava-cache-v1";
const ASSETS = [
  "/trlava_player_lava_fix.html",
  "/manifest.json",
  "/sw.js",
  "/logo.png",
  "/assets/player.png",
  "/assets/player2.png",
  "/assets/player3.png"
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
