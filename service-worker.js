/* ============================================
   Service Worker — LearningHub
   V2.1.0
   - Cache-first for static assets
   - Network-first for HTML (with offline fallback)
   - Versioned caches; old caches purged on activate
   - Only caches files that actually exist in the repo
   ============================================ */

const VERSION = 'v2.1.0';
const STATIC_CACHE  = `learninghub-static-${VERSION}`;
const HTML_CACHE    = `learninghub-html-${VERSION}`;
const RUNTIME_CACHE = `learninghub-runtime-${VERSION}`;

const STATIC_ASSETS = [
    './',
    './index.html',
    './offline.html',
    './manifest.json',
    './css/hub.css',
    './js/hub.js',
    './assets/favicon.svg',
    './assets/logo.svg',
    './assets/logo-icon.svg',
    './assets/icons/icon-192.svg',
    './assets/icons/icon-512.svg',
    './assets/illustrations/hero.svg'
];

self.addEventListener('install', (event) => {
    self.skipWaiting();
    event.waitUntil(
        caches.open(STATIC_CACHE).then((cache) =>
            Promise.all(
                STATIC_ASSETS.map((url) =>
                    cache.add(url).catch((err) => {
                        console.warn('[SW] Skipped caching (failed):', url, err);
                    })
                )
            )
        )
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(
                keys
                    .filter((key) =>
                        key !== STATIC_CACHE &&
                        key !== HTML_CACHE &&
                        key !== RUNTIME_CACHE
                    )
                    .map((key) => caches.delete(key))
            )
        ).then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    const req = event.request;
    if (req.method !== 'GET') return;

    const url = new URL(req.url);
    if (url.origin !== self.location.origin) return;

    if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
        event.respondWith(networkFirst(req));
        return;
    }

    event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
        const response = await fetch(req);
        if (response && response.status === 200 && response.type === 'basic') {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(req, response.clone());
        }
        return response;
    } catch (err) {
        if (req.destination === 'image') {
            return new Response(
                '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
            );
        }
        throw err;
    }
}

async function networkFirst(req) {
    try {
        const response = await fetch(req);
        if (response && response.status === 200) {
            const cache = await caches.open(HTML_CACHE);
            cache.put(req, response.clone());
        }
        return response;
    } catch (err) {
        const cached = await caches.match(req);
        if (cached) return cached;
        const offline = await caches.match('./offline.html');
        if (offline) return offline;
        return new Response('Offline', { status: 503, statusText: 'Offline' });
    }
}

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
