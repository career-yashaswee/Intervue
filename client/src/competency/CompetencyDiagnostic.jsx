"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Volume2,
  Flag,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Zap,
  Target,
} from "lucide-react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

const questions = [
  {
    id: 1,
    type: "mcq",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
    category: "Geography",
    difficulty: "Easy",
    skills: ["General Knowledge", "European Geography"],
    description:
      "This question tests your knowledge of European capital cities.",
  },
  {
    id: 2,
    type: "text",
    question: "Name three programming languages.",
    category: "Computer Science",
    difficulty: "Medium",
    skills: ["Programming", "Technology"],
    description:
      "This question assesses your familiarity with various programming languages.",
  },
  {
    id: 3,
    type: "rate",
    question: "How would you rate your JavaScript skills?",
    category: "Self-Assessment",
    difficulty: "Easy",
    skills: ["JavaScript", "Self-Evaluation"],
    description:
      "This question helps us understand your confidence level in JavaScript programming.",
  },
  {
    id: 4,
    type: "url",
    question: "Share a link to your GitHub profile.",
    category: "Professional Profile",
    difficulty: "Easy",
    skills: ["Online Presence", "Version Control"],
    description:
      "This question allows us to review your public code repositories and contributions.",
  },
  {
    id: 5,
    type: "code",
    question: "Write a function that returns the sum of two numbers.",
    language: "javascript",
    category: "Coding",
    difficulty: "Medium",
    skills: ["JavaScript", "Problem Solving"],
    description:
      "This question tests your ability to write a simple JavaScript function.",
  },
];

const QuestionTypes = {
  mcq: ({ question, options, onAnswer, answer }) => (
    <RadioGroup onValueChange={onAnswer} value={answer} className="space-y-2">
      {options &&
        options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={option} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
    </RadioGroup>
  ),
  text: ({ onAnswer, answer }) => (
    <Input
      placeholder="Type your answer here"
      value={answer || ""}
      onChange={(e) => onAnswer(e.target.value)}
    />
  ),
  rate: ({ onAnswer, answer }) => (
    <Slider
      min={1}
      max={10}
      step={1}
      value={[answer || 1]}
      onValueChange={(value) => onAnswer(value[0])}
    />
  ),
  url: ({ onAnswer, answer }) => (
    <Input
      type="url"
      placeholder="https://github.com/yourusername"
      value={answer || ""}
      onChange={(e) => onAnswer(e.target.value)}
    />
  ),
  code: ({ onAnswer, answer, language }) => (
    <Editor
      value={answer || ""}
      onValueChange={onAnswer}
      highlight={(code) =>
        highlight(code, languages[language] || languages.javascript)
      }
      padding={10}
      style={{
        fontFamily: '"Fira code", "Fira Mono", monospace',
        fontSize: 12,
        backgroundColor: "#f5f5f5",
        borderRadius: "4px",
      }}
    />
  ),
};

const speakText = (text) => {
  if ("speechSynthesis" in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  } else {
    alert("Text-to-speech is not supported in your browser.");
  }
};

export default function CompetencyDiagnostic() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 1 hour in seconds
  const [isLoading, setIsLoading] = useState(true);
  const [flaggedQuestions, setFlaggedQuestions] = useState({});
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(loadingTimer);
    };
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowRight") {
        handleNext();
      } else if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (["A", "B", "C", "D"].includes(event.key.toUpperCase())) {
        const question = questions[currentQuestion];
        if (question.type === "mcq") {
          const index = event.key.toUpperCase().charCodeAt(0) - 65;
          if (index < question.options.length) {
            handleAnswer(question.options[index]);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [currentQuestion]);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleFlag = () => {
    setFlaggedQuestions({
      ...flaggedQuestions,
      [currentQuestion]: !flaggedQuestions[currentQuestion],
    });
  };

  const handleSubmit = () => {
    // Implement submit logic here
    alert("Test submitted successfully!");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Skeleton className="w-[600px] h-[400px] rounded-xl" />
        <div className="flex mt-4 space-x-2">
          <Skeleton className="w-20 h-10" />
          <Skeleton className="w-20 h-10" />
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const QuestionComponent = question && QuestionTypes[question.type];

  if (!question || !QuestionComponent) {
    return <div>Error: Question not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              className="w-12 h-12 rounded-full border-4 border-gray-200 flex items-center justify-center"
              style={{
                background: `conic-gradient(black ${
                  (timeLeft / 3600) * 360
                }deg, transparent 0deg)`,
              }}
            >
              <span className="text-xs font-medium">
                {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
                {timeLeft % 60}
              </span>
            </motion.div>
          </div>
          <Progress
            value={((currentQuestion + 1) / questions.length) * 100}
            className="w-1/2 h-2"
            style={{
              background: "linear-gradient(to right, black, silver)",
            }}
          />
        </div>

        <div className="flex justify-between">
          {questions.map((q, index) => (
            <motion.button
              key={q.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`w-8 h-8 rounded-full flex items-center justify-center cursor-pointer ${
                index === currentQuestion
                  ? "bg-black text-white"
                  : flaggedQuestions[index]
                  ? "bg-yellow-400"
                  : answers[index]
                  ? "bg-green-500"
                  : "bg-white border border-gray-300"
              }`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <Button
                onClick={handleFlag}
                variant="outline"
                size="icon"
                className={`rounded-full ${
                  flaggedQuestions[currentQuestion] ? "bg-yellow-400" : ""
                }`}
              >
                <Flag size={16} />
              </Button>
              <h2 className="text-2xl font-bold flex-grow">
                {question.question}
              </h2>
              <Button
                onClick={() => speakText(question.question)}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <Volume2 size={16} />
              </Button>
            </div>
            <div className="flex space-x-2 mb-4">
              <div className="flex items-center space-x-1">
                <BookOpen size={16} />
                <span className="text-sm font-medium">{question.category}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Zap size={16} />
                <span className="text-sm font-medium">
                  {question.difficulty}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Target size={16} />
                <span className="text-sm font-medium">
                  {question.skills.join(", ")}
                </span>
              </div>
            </div>
            {showDescription ? (
              <p className="text-sm text-gray-600 mb-4">
                {question.description}
              </p>
            ) : (
              <Button
                onClick={() => setShowDescription(true)}
                variant="link"
                className="text-sm text-gray-600 mb-4"
              >
                Show more
              </Button>
            )}
            <QuestionComponent
              {...question}
              onAnswer={handleAnswer}
              answer={answers[currentQuestion]}
            />
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-between mt-8">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="rounded-full"
              size="icon"
            >
              <ChevronLeft size={24} />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={
                currentQuestion === questions.length - 1
                  ? handleSubmit
                  : handleNext
              }
              className="rounded-full"
              size="icon"
            >
              {currentQuestion === questions.length - 1 ? (
                "Submit"
              ) : (
                <ChevronRight size={24} />
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
