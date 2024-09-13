import { WEB_PUSH_URI } from "@/routes/route-api";
import axios from "axios";

const publicVapidKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;

// Check for service worker support
if ("serviceWorker" in navigator) {
  send().catch((err) => console.error(err));
}

// Register SW, Register Push, Send Push
async function send() {
  try {
    // Register Service Worker
    console.log("Registering service worker...");
    const register = await navigator.serviceWorker.register("/sw.js", {
      // Ensure the path starts with '/'
      scope: "/",
    });
    console.log("Service Worker Registered...");

    // Register Push
    console.log("Registering Push...");
    const subscription = await register.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
    });
    console.log("Push Registered...");

    // Send Push Notification using axios
    console.log("Sending Push...");
    await axios.post(WEB_PUSH_URI.SUBSCRIBE, subscription, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Push Sent...");
  } catch (error) {
    console.error("Service Worker Registration Failed:", error);
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export default send;
