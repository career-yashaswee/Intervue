// sessionManager.js
import axios from "axios";
import { useState, useEffect } from "react";
const useSessionManager = () => {
  const [isSessionExpired, setIsSessionExpired] = useState(false);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          const { code } = error.response.data;
          if (code == "TOKEN_EXPIRED") {
            setIsSessionExpired(true);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [isSessionExpired]);

  return {
    isSessionExpired,
    setIsSessionExpired,
  };
};

export default useSessionManager;
