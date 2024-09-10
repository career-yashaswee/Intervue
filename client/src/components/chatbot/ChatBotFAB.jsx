import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ChatSupport from "./ChatSupport";
import { BotMessageSquare, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom"; // or 'next/router' for Next.js

const ChatBotFAB = ({ currentPath }) => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const hiddenRoutes = ["/flow", "/register", "/another-route"];
  const isHidden = hiddenRoutes.includes(currentPath);

  useEffect(() => {
    // Show the hint bubble after 5 seconds (5000 ms) if chat is not visible
    const timer = setTimeout(() => {
      if (!isChatVisible) {
        setShowHint(true);
      }
    }, 5000);

    // Cleanup the timer when the component is unmounted or chat becomes visible
    return () => clearTimeout(timer);
  }, [isChatVisible]);

  const handleToggleChat = () => {
    setIsChatVisible(!isChatVisible);
    setShowHint(false); // Hide hint bubble when chat is toggled
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

            {/* Hint Bubble */}
            <AnimatePresence>
              {showHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="absolute bottom-12 right-0 bg-gray-800 text-white text-sm p-2 rounded-full shadow-lg"
                >
                  Stuck?
                </motion.div>
              )}
            </AnimatePresence>
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
