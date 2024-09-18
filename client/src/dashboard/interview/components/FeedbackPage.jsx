"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  AlertCircle,
  Award,
  Book,
  Brain,
  Clock,
  ThumbsUp,
  MessageCircle,
  CheckCircle,
  User,
  Bot,
} from "lucide-react";
import { toast } from "sonner";
import confetti from "canvas-confetti";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import WordCloud from "react-wordcloud";

const mockFeedback = {
  overallScore: 75,
  summary:
    "Good performance overall. Shows potential but needs improvement in technical knowledge.",
  accuracyOverTime: [
    { name: "Q1", value: 65 },
    { name: "Q2", value: 70 },
    { name: "Q3", value: 72 },
    { name: "Q4", value: 78 },
    { name: "Q5", value: 75 },
  ],
  questions: [
    {
      number: 1,
      question: "Explain the concept of React hooks.",
      tags: ["React", "Hooks", "Frontend"],
      category: "Technical",
      difficulty: "Medium",
      userResponse:
        "React hooks are functions that allow you to use state and other React features in functional components. They were introduced to make it easier to reuse stateful logic between components.",
      idealResponse:
        "React hooks are functions that allow functional components to have state, lifecycle methods, and other React features previously only available in class components. They enable better code reuse, more flexible component composition, and simpler state management. Common hooks include useState for managing state, useEffect for side effects, useContext for consuming context, and useRef for creating mutable references.",
      feedback:
        "Good basic understanding, but could elaborate more on the benefits and specific types of hooks. Consider mentioning some common hooks and their use cases.",
      matchScore: 70,
      wordCloud: [
        "React",
        "hooks",
        "functional",
        "components",
        "state",
        "useState",
        "useEffect",
        "lifecycle",
        "reuse",
        "logic",
      ],
      sentiment: "Neutral",
    },
    {
      number: 2,
      question: "Describe the differences between REST and GraphQL APIs.",
      tags: ["API", "REST", "GraphQL", "Backend"],
      category: "Technical",
      difficulty: "Hard",
      userResponse:
        "REST APIs use multiple endpoints for different resources, while GraphQL uses a single endpoint. GraphQL allows clients to request only the data they need, which can be more efficient.",
      idealResponse:
        "REST APIs typically use multiple endpoints for different resources and rely on HTTP methods for operations. They often face over-fetching or under-fetching issues. GraphQL, on the other hand, uses a single endpoint and allows clients to request exactly the data they need. It provides a strongly-typed schema, enables real-time updates with subscriptions, and offers better performance for complex queries. However, REST is often simpler to implement and has better caching mechanisms.",
      feedback:
        "Good start on the key differences. To improve, elaborate on the advantages and disadvantages of each approach, mention caching differences, and discuss the complexity of implementation.",
      matchScore: 65,
      wordCloud: [
        "REST",
        "GraphQL",
        "API",
        "endpoint",
        "efficient",
        "over-fetching",
        "under-fetching",
        "schema",
        "caching",
        "performance",
      ],
      sentiment: "Positive",
    },
  ],
};

export default function InterviewFeedback() {
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setFeedback(mockFeedback);
      setLoading(false);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 2000);
  }, []);

  if (loading) {
    return <FeedbackSkeleton />;
  }

  if (!feedback) {
    toast.error("Failed to load feedback");
    return <ErrorState />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto p-4 space-y-8"
    >
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-white text-center">
              Interview Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center mb-4">
              <CircularChart score={feedback.overallScore} />
            </div>
            <p className="text-center text-lg text-white">{feedback.summary}</p>
          </CardContent>
        </div>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="accuracy" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="accuracy">Accuracy Over Time</TabsTrigger>
              <TabsTrigger value="wordcloud">Overall Word Cloud</TabsTrigger>
            </TabsList>
            <TabsContent value="accuracy">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={feedback.accuracyOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                      dot={{ r: 8 }}
                      activeDot={{ r: 10 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
            <TabsContent value="wordcloud">
              <div className="h-[300px] w-full">
                <WordCloud
                  words={feedback.questions
                    .flatMap((q) => q.wordCloud)
                    .map((word) => ({
                      text: word,
                      value: Math.floor(Math.random() * 50) + 10,
                    }))}
                  options={{
                    rotations: 2,
                    rotationAngles: [-90, 0],
                    fontSizes: [12, 60],
                    padding: 5,
                  }}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <AnimatePresence>
        {feedback.questions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden mb-8">
              <CardHeader className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white">
                <CardTitle className="text-xl font-bold flex items-center">
                  <Book className="mr-2" />
                  Question {question.number}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="font-semibold text-lg mb-2 flex items-center">
                    <MessageCircle className="mr-2 text-purple-500" />
                    Question:
                  </h3>
                  <p className="bg-gray-100 p-4 rounded-lg shadow-inner">
                    {question.question}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex flex-wrap gap-2"
                >
                  {question.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-3 py-1 rounded-full"
                    >
                      {tag}
                    </Badge>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex justify-between text-sm text-gray-600 bg-gray-100 p-4 rounded-lg shadow-inner"
                >
                  <span className="flex items-center">
                    <Brain className="mr-1 w-4 h-4 text-indigo-500" /> Category:{" "}
                    {question.category}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 w-4 h-4 text-pink-500" /> Difficulty:{" "}
                    {question.difficulty}
                  </span>
                </motion.div>

                <Tabs defaultValue="responses" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="responses">Responses</TabsTrigger>
                    <TabsTrigger value="feedback">
                      Feedback & Analysis
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="responses">
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="font-semibold mb-2 flex items-center">
                          <User className="mr-2 text-blue-500" /> Your Response:
                        </h4>
                        <p className="bg-blue-100 p-4 rounded-lg shadow-inner">
                          {question.userResponse}
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Bot className="mr-2 text-green-500" /> Ideal
                          Response:
                        </h4>
                        <p className="bg-green-100 p-4 rounded-lg shadow-inner">
                          {question.idealResponse}
                        </p>
                      </motion.div>
                    </div>
                  </TabsContent>
                  <TabsContent value="feedback">
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h4 className="font-semibold mb-2 flex items-center">
                          <CheckCircle className="mr-2 text-purple-500" />{" "}
                          Feedback:
                        </h4>
                        <p className="bg-purple-100 p-4 rounded-lg shadow-inner">
                          {question.feedback}
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        <h4 className="font-semibold mb-2 flex items-center">
                          <ThumbsUp className="mr-2 text-indigo-500" /> Match
                          Score:
                        </h4>
                        <div className="bg-indigo-100 p-4 rounded-lg shadow-inner">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                          >
                            <Progress
                              value={question.matchScore}
                              className="w-full h-2"
                            />
                          </motion.div>
                          <p className="text-right mt-1">
                            {question.matchScore}%
                          </p>
                        </div>
                      </motion.div>
                      <div>
                        <h4 className="font-semibold mb-2">Word Cloud:</h4>
                        <div className="h-[200px] bg-gray-100 rounded-lg shadow-inner">
                          <WordCloud
                            words={question.wordCloud.map((word) => ({
                              text: word,
                              value: Math.floor(Math.random() * 50) + 10,
                            }))}
                            options={{
                              rotations: 2,
                              rotationAngles: [-90, 0],
                              fontSizes: [12, 60],
                              padding: 5,
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Sentiment:</h4>
                        <p className="bg-yellow-100 p-4 rounded-lg shadow-inner">
                          {question.sentiment}
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

function CircularChart({ score }) {
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-white/20"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
        />
        <motion.circle
          className="text-white"
          strokeWidth="10"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50"
          cy="50"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-3xl font-bold text-white"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 10,
          }}
        >
          {score}%
        </motion.span>
      </div>
    </div>
  );
}

function FeedbackSkeleton() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <Card className="overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
          <CardHeader>
            <Skeleton className="h-8 w-3/4 mx-auto bg-white/20" />
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center mb-4">
              <Skeleton className="h-40 w-40 rounded-full bg-white/20" />
            </div>
            <Skeleton className="h-4 w-full mb-2 bg-white/20" />
            <Skeleton className="h-4 w-3/4 mx-auto bg-white/20" />
          </CardContent>
        </div>
      </Card>

      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>

      {[1, 2].map((_, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function ErrorState() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Error Loading Feedback</h2>
      <p className="text-gray-600">Please try again later.</p>
    </div>
  );
}
