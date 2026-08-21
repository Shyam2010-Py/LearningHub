/* ============================================
   Service Worker — LearningHub
   V2.6.0
   ============================================ */
const VERSION = 'v2.6.0';
const STATIC_CACHE = `learninghub-static-${VERSION}`;
const HTML_CACHE = `learninghub-html-${VERSION}`;
const RUNTIME_CACHE = `learninghub-runtime-${VERSION}`;
const STATIC_ASSETS = ['./','./index.html','./auth.html','./my-learning.html','./offline.html','./manifest.json','./css/hub.css','./css/auth.css','./css/ui-cleanup.css','./js/hub.js','./js/activity.js','./js/auth.js','./js/my-learning.js','./js/supabase.js','./js/handoff.js','./js/access-gate.js','./assets/favicon.svg','./assets/logo.svg','./assets/logo-icon.svg','./assets/icons/icon-192.svg','./assets/icons/icon-512.svg','./assets/illustrations/hero.svg'];
self.addEventListener('install',event=>{self.skipWaiting();event.waitUntil(caches.open(STATIC_CACHE).then(cache=>Promise.all(STATIC_ASSETS.map(url=>cache.add(url).catch(err=>console.warn('[SW] Skipped:',url,err)))))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>![STATIC_CACHE,HTML_CACHE,RUNTIME_CACHE].includes(key)).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;if(url.pathname.endsWith('/service-worker.js')){event.respondWith(fetch(req,{cache:'no-store'}));return}if(req.mode==='navigate'||(req.headers.get('accept')||'').includes('text/html')){event.respondWith(networkFirst(req));return}event.respondWith(cacheFirst(req))});
async function cacheFirst(req){const cached=await caches.match(req);if(cached)return cached;try{const response=await fetch(req);if(response?.status===200&&response.type==='basic'){const cache=await caches.open(STATIC_CACHE);cache.put(req,response.clone())}return response}catch(error){if(req.destination==='image')return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"/>',{headers:{'Content-Type':'image/svg+xml'}});throw error}}
async function networkFirst(req){try{const response=await fetch(req,{cache:'no-store'});if(response?.status===200){const cache=await caches.open(HTML_CACHE);cache.put(req,response.clone())}return response}catch(error){const cached=await caches.match(req);if(cached)return cached;const offline=await caches.match('./offline.html');return offline||new Response('Offline',{status:503,statusText:'Offline'})}}
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
