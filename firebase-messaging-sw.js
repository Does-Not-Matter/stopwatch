// Background Service Worker for Firebase Cloud Messaging (FCM)
// Required in the root directory to wake up the phone and show notifications when the app is closed

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js");

// PASTE YOUR REAL FIREBASE CONFIG BELOW
const firebaseConfig = {
  apiKey: "AIzaSyAG8e7n7-fH1KfY8jDGZ1sdXQmfilXwE9k",
  authDomain: "stopwatch4two.firebaseapp.com",
  databaseURL: "https://stopwatch4two-default-rtdb.firebaseio.com",
  projectId: "stopwatch4two",
  storageBucket: "stopwatch4two.firebasestorage.app",
  messagingSenderId: "547414457103",
  appId: "1:547414457103:web:9f470fc673e229f80cdc7a"
};

// Initialize Firebase inside the background worker
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle notification click: focus existing app tab or open the app fresh
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
      for (const client of windowClients) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("./");
    })
  );
});
