import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatSupport from "./ChatSupport";
import { BotMessageSquare, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom"; // or 'next/router' for Next.js

const ChatBotFAB = () => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  // const location = useLocation(); // For checking the current route

  // List of routes where the chat bot should be hidden
  // const hiddenRoutes = ["/login", "/register", "/another-route"];

  // Check if the current route is in the hidden routes list
  const isHidden = false;
  //  hiddenRoutes.includes(location.pathname);

  const handleToggleChat = () => {
    setIsChatVisible(!isChatVisible);
  };

  return (
    <>
      {!isHidden && (
        <>
          {/* Floating Action Button with Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-8 z-50"
          >
            <Button
              variant="shine"
              onClick={handleToggleChat}
              className="p-4 bg-black text-white rounded-full shadow-md hover:bg-gray-800 focus:outline-none"
            >
              {isChatVisible ? (
                <ArrowLeft className="w-5 h-5" />
              ) : (
                <BotMessageSquare className="w-5 h-5" />
              )}
            </Button>
          </motion.div>

          {/* Chat Support with Animation */}
          <AnimatePresence>
            {isChatVisible && (
              <>
                {/* Background Blur */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.3 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 bg-gray-900 z-40"
                />

                {/* Chat Support */}
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={{ duration: 0.3 }}
                  className="fixed bottom-22 right-4 w-96 h-1/2 bg-white rounded-lg shadow-lg z-50"
                >
                  <ChatSupport />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </>
  );
};

export default ChatBotFAB;
