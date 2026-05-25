const CACHE = 'nissi-v1';
const ASSETS = [
  './',
  './index.html',
  './EstilosNissi.css',
  './script.js',
  './manifest.json',
  './logo_Nissi.jpeg',
  './Pave123.jpeg',
  './Tres Leches.jpeg',
  './Torta Clasica.png',
  './Torta Queso.png',
  './Ponqué de Natas.png',
  './Miniga.png',
  './Chepacori.png',
  './Gal1.png',
  './Gal2.png',
  './Gal3.png',
  './Gal4.png',
  './Gal5.png',
  './Gal6.jpeg',
  './Gal7.png',
  './Gal8.png',
  './Fondo_nosotros.png',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Cache-first: sirve desde caché, si falla va a la red
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
