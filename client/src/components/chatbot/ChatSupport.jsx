"use client";

import React, { useEffect, useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import useChatStore from "@/hooks/useChatStore";
import { AnimatePresence, motion } from "framer-motion";
import {
  CopyIcon,
  CornerDownLeft,
  Mic,
  Paperclip,
  RefreshCcw,
  Volume2,
  X,
  Book,
} from "lucide-react";
import { Input } from "@/components/ui/input";

const ChatAiIcons = [
  { icon: CopyIcon, label: "Copy" },
  { icon: RefreshCcw, label: "Refresh" },
  { icon: Volume2, label: "Volume" },
];

export default function ChatSupport({ onClose, currentSection }) {
  const {
    messages,
    setMessages,
    input,
    setInput,
    handleInputChange,
    hasInitialAIResponse,
    setHasInitialAIResponse,
  } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const messagesContainerRef = useRef(null);
  const inputRef = useRef(null);
  const formRef = useRef(null);
  const fileInputRef = useRef(null);

  const getMessageVariant = (role) => (role === "ai" ? "received" : "sent");

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      handleSendMessage(e);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input && !audioBlob && !selectedFile) return;

    let newMessage = {
      id: messages.length + 1,
      avatar: "",
      name: "User",
      role: "user",
      message: input,
    };

    if (audioBlob) {
      newMessage.audio = URL.createObjectURL(audioBlob);
      newMessage.message = "Audio message";
    }

    if (selectedFile) {
      newMessage.file = selectedFile;
      newMessage.message = `File: ${selectedFile.name}`;
    }

    setMessages((messages) => [...messages, newMessage]);

    setInput("");
    setAudioBlob(null);
    setSelectedFile(null);
    formRef.current?.reset();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    if (!hasInitialAIResponse) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages((messages) => [
          ...messages,
          {
            id: messages.length + 1,
            avatar: "",
            name: "ChatBot",
            role: "ai",
            message: `Hello! How can I assist you with the ${currentSection} section today?`,
          },
        ]);
        setIsLoading(false);
        setHasInitialAIResponse(true);
      }, 1000);
    }
  }, []);

  const handleAudioRecording = () => {
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/mp3" });
          setAudioBlob(audioBlob);
        });

        mediaRecorder.start();
        setIsRecording(true);

        setTimeout(() => {
          mediaRecorder.stop();
          setIsRecording(false);
        }, 5000); // Stop recording after 5 seconds
      });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-semibold">
          Chat Support - {currentSection}
        </h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4" ref={messagesContainerRef}>
        <ChatMessageList>
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.3 }}
              >
                <ChatBubble variant={getMessageVariant(message.role)}>
                  <Avatar>
                    <AvatarImage src="" alt="Avatar" />
                    <AvatarFallback>
                      {message.role === "ai" ? "🤖" : "👤"}
                    </AvatarFallback>
                  </Avatar>
                  <ChatBubbleMessage>
                    {message.message}
                    {message.audio && (
                      <audio
                        controls
                        src={message.audio}
                        className="mt-2 w-full"
                      />
                    )}
                    {message.file && (
                      <div className="mt-2">
                        <a
                          href={URL.createObjectURL(message.file)}
                          download={message.file.name}
                          className="text-blue-500 hover:underline"
                        >
                          Download: {message.file.name}
                        </a>
                      </div>
                    )}
                    {message.role === "ai" && (
                      <div className="flex items-center mt-2 gap-1">
                        {ChatAiIcons.map((icon, index) => (
                          <Button
                            key={index}
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                          >
                            <icon.icon className="h-4 w-4" />
                          </Button>
                        ))}
                      </div>
                    )}
                  </ChatBubbleMessage>
                </ChatBubble>
              </motion.div>
            ))}
          </AnimatePresence>
        </ChatMessageList>
      </div>
      <form ref={formRef} onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex items-center gap-2">
          <ChatInput
            ref={inputRef}
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={(!input && !audioBlob && !selectedFile) || isLoading}
          >
            <CornerDownLeft className="h-4 w-4 mr-2" />
            Send
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={handleAudioRecording}>
              <Mic className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`} />
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current.click()}
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => window.open("/docs", "_blank")}
            >
              <Book className="h-4 w-4" />
            </Button>
          </div>
          {(audioBlob || selectedFile) && (
            <span className="text-sm text-muted-foreground">
              {audioBlob ? "Audio recorded" : `File: ${selectedFile.name}`}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
