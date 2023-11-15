// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
// eslint-disable-next-line no-undef
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyBeufQr5SGUgOgSid47193avBiDqqiko7E',
  authDomain: 'app-tecnica-f3803.firebaseapp.com',
  projectId: 'app-tecnica-f3803',
  storageBucket: 'app-tecnica-f3803.appspot.com',
  messagingSenderId: '692604416537',
  appId: '1:692604416537:web:b69e728405d613e8b07088',
  measurementId: 'G-GRH6K1P9HR',
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './logo.svg',
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});