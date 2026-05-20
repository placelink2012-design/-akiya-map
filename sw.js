// ===== 空き家マップ Service Worker =====
const CACHE_NAME = 'akiya-map-v2';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  // chrome-extension など特殊スキームは無視
  if (!event.request.url.startsWith('http')) return;
  // Anthropic APIはキャッシュしない
  if (event.request.url.includes('anthropic.com')) return;
  // Supabaseはキャッシュしない
  if (event.request.url.includes('supabase.co')) return;
  // OpenStreetMapタイルはネットワーク優先
  if (event.request.url.includes('openstreetmap.org')) return;
});
