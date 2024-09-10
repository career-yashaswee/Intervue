const PushNotifications = require("node-pushnotifications");
// const { publicVapidKey, privateVapidKey } = require("../libs/webPushConfig");

const settings = {
  web: {
    vapidDetails: {
      subject: "mailto: <career.yashaswee@gmail.com>",
      publicKey:
        "BHwGkhUkGo_acWpS0N9_OJrUHdsz5ou4d6vcPrCMFY3wXrH76LHtuP5jKtMeSwkKPOfqk7Nckzg2G0XsnqbUtkg",
      privateKey: "5SKS1Ddjj9g4idxbWvAtdRq8-RxLDrVybLM3xaCZ9bI",
    },
    gcmAPIKey: "gcmkey", // Add your Google Cloud Messaging API key
    TTL: 2419200,
    contentEncoding: "aes128gcm",
    headers: {},
  },
  isAlwaysUseFCM: false,
};

const pushService = new PushNotifications(settings);

const subscribe = async (req, res) => {
  const subscription = req.body;

  const payload = JSON.stringify({
    title: "New Notification",
    body: "You have a new message!",
    // icon: "", // Add a valid path for the icon
    // badge: "/path/to/badge.png", // Add a valid path for the badge
  });

  pushService.send(subscription, payload, (err, result) => {
    if (err) {
      console.error("Push Notification Error:", err);
      res.status(500).json({ error: "Failed to send push notification" });
    } else {
      console.log("Push Notification Result:", result);
      res.status(201).json({ success: true, result });
    }
  });
};

module.exports.subscribe = subscribe;
