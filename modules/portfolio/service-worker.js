/* Service Worker — Portfolio (within Student Hub) V1.0.0 */
const VERSION = 'v1.0.0';
const STATIC_CACHE  = `portfolio-static-${VERSION}`;
const HTML_CACHE    = `portfolio-html-${VERSION}`;

const STATIC_ASSETS = [
  './',
  './index.html',
  './offline.html',
  './manifest.json',
  './css/style.css',
  './js/main.js',
  './assets/logo.svg',
  './assets/favicon.svg',
  './assets/images/project-pocketpilot.svg',
  './assets/images/project1.svg',
  './assets/images/project2.svg',
  './assets/images/project3.svg',
  './assets/images/project4.svg',
  './assets/images/project5.svg',
  './assets/images/project6.svg'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) =>
            Promise.all(
                STATIC_ASSETS.map((url) => cache.add(url).catch(() => {}))
            )
        )
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter(k => k !== STATIC_CACHE && k !== HTML_CACHE).map(k => caches.delete(k)))
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;
    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
        event.respondWith(
            fetch(req).then(r => {
                if (r && r.status === 200) caches.open(HTML_CACHE).then(c => c.put(req, r.clone()));
                return r;
            }).catch(() => caches.match(req).then(c => c || caches.match('./offline.html')))
        );
        return;
    }

    event.respondWith(
        caches.match(req).then(c => c || fetch(req).then(r => {
            if (r && r.status === 200 && r.type === 'basic') {
                caches.open(STATIC_CACHE).then(cache => cache.put(req, r.clone()));
            }
            return r;
        }).catch(() => {
            if (req.destination === 'image') {
                return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',
                    { headers: { 'Content-Type': 'image/svg+xml' } });
            }
            throw new Error('offline');
        }))
    );
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
