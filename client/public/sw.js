self.addEventListener("push", function (event) {
  const data = event.data.json(); // Assuming the payload is sent as JSON

  const options = {
    title: data.title || "Default title",
    body: data.body || "Default body text",
    // icon: data.icon || "/default-icon.png", // Path to your notification icon
    // badge: data.badge || "/default-badge.png", // Path to your notification badge
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Default title", options)
  );
});
