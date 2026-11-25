const CACHE='hikayat-phase1-v8';
const ENGINE='https://cdn.jsdelivr.net/npm/phaser@3.90.0/dist/phaser.esm.js';
const CORE=['./','./index.html','./manifest.webmanifest','./src/boot/startup.js?v=8','./src/main.js?v=8'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(async cache=>{await cache.addAll(CORE);await cache.add(ENGINE).catch(()=>{});await self.skipWaiting()})));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).then(response=>{if(response.ok&&(new URL(event.request.url).origin===self.location.origin||event.request.url===ENGINE)){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response})))})
