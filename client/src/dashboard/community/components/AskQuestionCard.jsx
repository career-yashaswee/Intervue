"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TipsBox = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="bg-blue-50 text-blue-800 p-4 rounded-md mb-4 shadow-sm"
  >
    <h3 className="text-lg font-semibold mb-2">
      Tips on getting good answers quickly
    </h3>
    <ul className="list-disc list-inside space-y-1 text-sm">
      <li>Make sure your question has not been asked already</li>
      <li>Keep your question short and to the point</li>
      <li>Double-check grammar and spelling</li>
    </ul>
  </motion.div>
);

const QuestionInput = ({ value, onChange, error }) => (
  <div className="space-y-4">
    <div>
      <Input
        placeholder="Start your question with 'What', 'How', 'Why', etc."
        className={`bg-white border-gray-300 ${error ? "border-red-500" : ""}`}
        value={value}
        onChange={onChange}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
    <div className="flex items-center space-x-2">
      <Avatar className="w-8 h-8">
        <img src="/placeholder.svg?height=32&width=32" alt="User avatar" />
      </Avatar>
      <Select defaultValue="public">
        <SelectTrigger className="w-32 bg-white border-gray-300">
          <SelectValue placeholder="Visibility" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="public">Public</SelectItem>
          <SelectItem value="private">Private</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-10 w-full bg-gray-200" />
    <div className="flex items-center space-x-2">
      <Skeleton className="w-8 h-8 rounded-full bg-gray-200" />
      <Skeleton className="h-8 w-32 bg-gray-200" />
    </div>
  </div>
);

export default function AskQuestionCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");

  const handleOpen = () => {
    setIsOpen(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500); // Simulate loading
  };

  const handleClose = () => {
    setIsOpen(false);
    setQuestion("");
    setError("");
  };

  const handleSubmit = async () => {
    if (question.trim().length < 10) {
      setError("Question must be at least 10 characters long");
      return;
    }

    setIsLoading(true);
    try {
      // Simulating an API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve();
          } else {
            reject(new Error("Failed to submit question"));
          }
        }, 1500);
      });

      toast.success("Question submitted successfully!");
      handleClose();
    } catch (error) {
      toast.error("Failed to submit question. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <Toaster />
      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          onClick={handleOpen}
          className="mb-4 bg-blue-500 hover:bg-blue-600 text-white"
        >
          Ask a Question
        </Button>
      </motion.div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle>Add Question</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <TipsBox />
                {isLoading ? (
                  <LoadingSkeleton />
                ) : (
                  <QuestionInput
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value);
                      setError("");
                    }}
                    error={error}
                  />
                )}
              </CardContent>
              <CardFooter className="justify-between">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="ghost" onClick={handleClose}>
                    Cancel
                  </Button>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Add question"}
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
