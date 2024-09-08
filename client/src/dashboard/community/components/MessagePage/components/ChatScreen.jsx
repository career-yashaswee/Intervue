"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Menu, Mic, Smile, Paperclip, Search, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Mock data for recent chats
const recentChats = [
  {
    id: 1,
    name: "Alice Johnson",
    avatar: "/avatar1.jpg",
    lastMessage: "Hey, how are you?",
    timestamp: "10:30 AM",
  },
  {
    id: 2,
    name: "Bob Smith",
    avatar: "/avatar2.jpg",
    lastMessage: "Did you see the game last night?",
    timestamp: "Yesterday",
  },
  {
    id: 3,
    name: "Charlie Brown",
    avatar: "/avatar3.jpg",
    lastMessage: "Meeting at 3 PM",
    timestamp: "Yesterday",
  },
  {
    id: 4,
    name: "Diana Prince",
    avatar: "/avatar4.jpg",
    lastMessage: "Thanks for your help!",
    timestamp: "Monday",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    avatar: "/avatar5.jpg",
    lastMessage: "Mission accomplished",
    timestamp: "Sunday",
  },
];

// Mock data for chat messages
const initialMessages = [
  {
    id: 1,
    sender: "Alice Johnson",
    content: "Hey there!",
    timestamp: "2023-05-10T10:00:00",
  },
  {
    id: 2,
    sender: "You",
    content: "Hi Alice! How are you?",
    timestamp: "2023-05-10T10:01:00",
  },
  {
    id: 3,
    sender: "Alice Johnson",
    content: "I'm doing great, thanks for asking. How about you?",
    timestamp: "2023-05-10T10:02:00",
  },
  {
    id: 4,
    sender: "You",
    content: "I'm good too. Just working on some projects.",
    timestamp: "2023-05-10T10:03:00",
  },
  {
    id: 5,
    sender: "Alice Johnson",
    content: "That sounds interesting! What kind of projects?",
    timestamp: "2023-05-10T10:04:00",
  },
  {
    id: 6,
    sender: "You",
    content: "Mostly web development stuff. How about you?",
    timestamp: "2023-05-11T09:30:00",
  },
  {
    id: 7,
    sender: "Alice Johnson",
    content: "I'm working on a new app idea. It's pretty exciting!",
    timestamp: "2023-05-11T09:35:00",
  },
  {
    id: 8,
    sender: "You",
    content: "That's awesome! I'd love to hear more about it sometime.",
    timestamp: "2023-05-11T09:40:00",
  },
];

const emojis = [
  "😀",
  "😃",
  "😄",
  "😁",
  "😆",
  "😅",
  "😂",
  "🤣",
  "😊",
  "😇",
  "🙂",
  "🙃",
  "😉",
  "😌",
  "😍",
  "🥰",
  "😘",
  "😗",
  "😙",
  "😚",
  "😋",
  "😛",
  "😝",
  "😜",
  "🤪",
  "🤨",
  "🧐",
  "🤓",
  "😎",
  "🤩",
  "🥳",
  "😏",
  "😒",
  "😞",
  "😔",
  "😟",
  "😕",
  "🙁",
  "☹️",
  "😣",
  "😖",
  "😫",
  "😩",
  "🥺",
  "😢",
  "😭",
  "😤",
  "😠",
  "😡",
  "🤬",
  "🤯",
  "😳",
  "🥵",
  "🥶",
  "😱",
  "😨",
  "😰",
  "😥",
  "😓",
  "🤗",
  "🤔",
  "🤭",
  "🤫",
  "🤥",
  "😶",
  "😐",
  "😑",
  "😬",
  "🙄",
  "😯",
  "😦",
  "😧",
  "😮",
  "😲",
  "🥱",
  "😴",
  "🤤",
  "😪",
  "😵",
  "🤐",
  "🥴",
  "🤢",
  "🤮",
  "🤧",
  "😷",
  "🤒",
  "🤕",
];

function ChatScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const scrollAreaRef = useRef(null);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "You",
        content: input.trim(),
        timestamp: new Date().toISOString(),
      };
      setMessages([...messages, newMessage]);
      setInput("");
    }
  };

  const handleEmojiSelect = (emoji) => {
    setInput((prevInput) => prevInput + emoji);
  };

  const handleFileUpload = (event) => {
    // Implement file upload logic here
    console.log("File selected:", event.target.files[0]);
  };

  const handleVoiceRecord = () => {
    // Implement voice recording logic here
    console.log("Voice recording started");
  };

  const filteredMessages = searchQuery
    ? messages.filter((msg) =>
        msg.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  const groupMessagesByDate = (msgs) => {
    const groups = {};
    msgs.forEach((msg) => {
      const date = new Date(msg.timestamp).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(msg);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(filteredMessages);

  return (
    <div className="flex h-svh bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg md:relative md:translate-x-0"
          >
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Recent Chats</h2>
            </div>
            <ScrollArea
              className="h-[calc(100vh-5rem)] overflow-y-auto"
              ref={scrollAreaRef}
            >
              {loading
                ? // Skeleton loading for recent chats
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 animate-pulse"
                      >
                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </div>
                      </div>
                    ))
                : recentChats.map((chat) => (
                    <div
                      key={chat.id}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-100 cursor-pointer"
                    >
                      <Avatar>
                        <AvatarImage src={chat.avatar} alt={chat.name} />
                        <AvatarFallback>
                          {chat.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {chat.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                      <div className="text-xs text-gray-400">
                        {chat.timestamp}
                      </div>
                    </div>
                  ))}
            </ScrollArea>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white shadow-sm p-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar1.jpg" alt="Alice Johnson" />
            <AvatarFallback>AJ</AvatarFallback>
          </Avatar>
          <div className="ml-4 flex-1">
            <h2 className="text-lg font-semibold">Alice Johnson</h2>
            <p className="text-sm text-gray-500">Online</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearching(!isSearching)}
          >
            <Search className="h-6 w-6" />
          </Button>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-b"
            >
              <div className="p-2 flex items-center">
                <Input
                  type="text"
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setSearchQuery("");
                    setIsSearching(false);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          {loading
            ? // Skeleton loading for chat messages
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      index % 2 === 0 ? "justify-start" : "justify-end"
                    } mb-4`}
                  >
                    <div
                      className={`rounded-lg p-4 max-w-[70%] ${
                        index % 2 === 0 ? "bg-gray-200" : "bg-green-200"
                      }`}
                    >
                      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))
            : Object.entries(groupedMessages).map(([date, msgs]) => (
                <div key={date}>
                  <div className="text-center my-4">
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {date}
                    </span>
                  </div>
                  {msgs.map((message, index) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className={`flex ${
                        message.sender === "You"
                          ? "justify-end"
                          : "justify-start"
                      } mb-4`}
                    >
                      <div
                        className={`rounded-lg p-3 max-w-[70%] ${
                          message.sender === "You"
                            ? "bg-green-500 text-white rounded-br-none"
                            : "bg-white text-gray-800 rounded-bl-none"
                        } shadow`}
                      >
                        <p>{message.content}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {new Date(message.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
        </ScrollArea>

        {/* Chat Input */}
        <div className="bg-white p-4 border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center space-x-2"
          >
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Smile className="h-6 w-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="grid grid-cols-8 gap-2">
                  {emojis.map((emoji, index) => (
                    <button
                      key={index}
                      className="text-2xl hover:bg-gray-100 rounded p-1"
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button variant="ghost" size="icon" onClick={handleVoiceRecord}>
              <Mic className="h-6 w-6" />
            </Button>
            <label htmlFor="file-upload">
              <Button variant="ghost" size="icon" asChild>
                <div>
                  <Paperclip className="h-6 w-6" />
                  <input
                    id="file-upload"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>
              </Button>
            </label>
            <Input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatScreen;
