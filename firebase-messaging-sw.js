// Service Worker: Displays high-priority background notifications & handles notification taps
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "AIzaSyAG8e7n7-fH1KfY8jDGZ1sdXQmfilXwE9k",
  authDomain: "stopwatch4two.firebaseapp.com",
  databaseURL: "https://stopwatch4two-default-rtdb.firebaseio.com",
  projectId: "stopwatch4two",
  storageBucket: "stopwatch4two.firebasestorage.app",
  messagingSenderId: "547414457103",
  appId: "1:547414457103:web:9f470fc673e229f80cdc7a"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const messaging = firebase.messaging();

// Wake immediately on high-priority data-only FCM messages
messaging.onBackgroundMessage((payload) => {
  const data = payload.data || payload.notification || {};
  const title = data.title;
  if (!title) return;

  const options = {
    body: data.body || '',
    badge: 'badge.png',
    icon: 'transparent.png',
    tag: data.tag || 'stopwatch4two-alert',
    renotify: true,
    vibrate: [120, 60, 120],
    data: { url: data.link || './' }
  };

  return self.registration.showNotification(title, options);
});

// Open or focus stopwatch4two when the notification is tapped
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.url || './';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
