"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ChatSupport from "./ChatSupport";
import { BotMessageSquare, ArrowLeft, Book } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ChatBotFAB = ({ currentPath }) => {
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentSection, setCurrentSection] = useState("General");

  const hiddenRoutes = [
    "/flow",
    "/register",
    "/another-route",
    "/dashboard/cc",
  ];
  const isHidden = hiddenRoutes.includes(currentPath);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isChatVisible) {
        setShowHint(true);
      }
    }, 10000);

    return () => clearTimeout(timer);
  }, [isChatVisible]);

  const handleToggleChat = () => {
    setIsChatVisible(!isChatVisible);
    setShowHint(false);
  };

  const handleOpenDocs = () => {
    window.open("/docs", "_blank");
  };

  if (isHidden) return null;

  return (
    <>
      {/* Floating Action Button with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 right-4 z-50 md:bottom-8 md:right-8 flex flex-col items-end space-y-2"
      >
        <Button
          variant="shine"
          onClick={handleToggleChat}
          className="p-3 md:p-4 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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
              className="absolute bottom-14 right-0 bg-secondary text-secondary-foreground text-sm p-2 rounded-lg shadow-lg md:bottom-16"
            >
              Need help?
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
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
              onClick={handleToggleChat}
            />

            {/* Chat Support */}
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: "100%" }}
              transition={{ duration: 0.3 }}
              className="fixed inset-4 md:inset-auto md:bottom-24 md:right-8 md:w-96 md:h-[calc(100vh-12rem)] bg-background rounded-lg shadow-lg z-50 overflow-hidden"
            >
              <ChatSupport
                onClose={handleToggleChat}
                currentSection={currentSection}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBotFAB;
