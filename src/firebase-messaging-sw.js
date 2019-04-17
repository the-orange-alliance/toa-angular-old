// Firebase SDK
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.6/firebase-messaging.js');

firebase.initializeApp({
  'messagingSenderId': '495169296462'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  var notificationTitle = payload.data.title;
  var notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
    locator:payload.data.locator
  };
  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
