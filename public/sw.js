// Simple Service Worker stub for The Pearson Pub
// This prevents 404 errors when the browser requests a service worker

self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  // Skip waiting to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating.');
  // Claim all clients immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Let the browser handle all fetch requests normally
  // This is a minimal SW that doesn't interfere with normal operations
});
