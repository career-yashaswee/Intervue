"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MoreVertical, BellOff, Pin } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing modular components
import { ChatItem } from "./ChatItem";
import { SkeletonLoader } from "./SkeletonLoader";
import { fetchChats } from "./api";

export default function RecentBar() {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadChats = async () => {
      try {
        const fetchedChats = await fetchChats();
        setChats(fetchedChats);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
        toast.error("Failed to load chats. Please try again.");
        setLoading(false);
      }
    };

    loadChats();
  }, []);

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  const handlePin = (id) => {
    setChats(
      chats.map((chat) =>
        chat.id === id ? { ...chat, pinned: !chat.pinned } : chat
      )
    );
  };

  const handleMute = (id) => {
    setChats(
      chats.map((chat) =>
        chat.id === id ? { ...chat, muted: !chat.muted } : chat
      )
    );
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
      <header className="flex justify-between items-center p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold">Chats</h1>
      </header>
      <div className="p-4">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <motion.div
        className="flex-1 overflow-y-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {loading ? (
            <SkeletonLoader count={5} />
          ) : (
            sortedChats.map((chat, index) => (
              <ChatItem
                key={chat.id}
                chat={chat}
                index={index}
                onPin={() => handlePin(chat.id)}
                onMute={() => handleMute(chat.id)}
              />
            ))
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
