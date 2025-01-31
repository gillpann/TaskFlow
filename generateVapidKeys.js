// generateVapidKeys.js
const webPush = require("web-push");

// Generate VAPID keys
const vapidKeys = webPush.generateVAPIDKeys();

// Output VAPID keys
console.log("VAPID Public Key:", vapidKeys.publicKey);
console.log("VAPID Private Key:", vapidKeys.privateKey);
