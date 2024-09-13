import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useNetworkStatusContext } from "@/context/NetworkStatusContext";

const NetworkStatusHandler = () => {
  const isOnline = useNetworkStatusContext();
  const isFirstRender = useRef(true);
  const wasOffline = useRef(false); // To keep track of the previous state

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (!isOnline) {
      toast.error("No internet connection");
      wasOffline.current = true; // Set to true when offline
    } else if (wasOffline.current) {
      // Check if the state changed from offline to online
      toast.success("Internet Connected");
      setTimeout(() => {
        window.location.reload();
      }, 3000); // Adjust the delay as needed
      wasOffline.current = false; // Reset after handling
    }
  }, [isOnline]);

  return null;
};

export default NetworkStatusHandler;
