// Service Worker: Lets Firebase/Chrome render native notification visuals & handles taps
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

firebase.messaging();

// Open or focus stopwatch4two when the notification is tapped
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = event.notification.data?.FCM_MSG?.fcmOptions?.link || './';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow(targetUrl);
    })
  );
});
