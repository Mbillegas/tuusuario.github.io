/* Service worker mínimo de Operativo diario.
   Cachea el shell para que la app abra sin conexión. Nunca cachea Supabase. */
const CACHE = "operativo-v2";
const SHELL = ["./", "./index.html", "./manifest.webmanifest"];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(SHELL).catch(() => c.add("./index.html")))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Nunca cachear la API de Supabase ni nada de otro origen.
  if (url.origin !== location.origin) return;

  // Navegación: red primero, cache como respaldo (así se actualiza al abrir).
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then(res => {
          const copia = res.clone();
          caches.open(CACHE).then(c => c.put("./index.html", copia)).catch(() => {});
          return res;
        })
        .catch(() => caches.match("./index.html").then(r => r || caches.match("./")))
    );
    return;
  }

  // Resto de archivos propios: cache primero, red después.
  e.respondWith(
    caches.match(req).then(r => r || fetch(req).then(res => {
      if (res && res.status === 200 && res.type === "basic") {
        const copia = res.clone();
        caches.open(CACHE).then(c => c.put(req, copia)).catch(() => {});
      }
      return res;
    }).catch(() => r))
  );
});

