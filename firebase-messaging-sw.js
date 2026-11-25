// Service Worker: Single unified handler for Web Push notifications using badge.png only

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data ? event.data.json() : {};
  } catch (e) {
    payload = {};
  }

  const data = payload.data || {};
  const title = data.title || 'stopwatch4two';

  const options = {
    body: data.body || '',
    // Monochrome white silhouette on left/status bar + invisible PNG on right
    badge: 'badge.png',
    icon: 'transparent.png',
    // Deduplicates any overlapping foreground/background alert with the same eventId
    tag: data.eventId || 'stopwatch4two-alert',
    renotify: true,
    data: {
      link: data.link || './'
    }
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Open or focus the installed PWA when the user taps a notification
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.link || './';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
