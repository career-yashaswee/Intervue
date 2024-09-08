"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  Clock,
  ChevronUp,
  ChevronDown,
  X,
  Footprints,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Simulated task data
const tasks = [
  {
    id: 1,
    name: "Review Project Proposal",
    description: "Go through the latest project proposal",
    icon: "📄",
    dueDate: "2023-06-15",
    timeRequired: "2h",
  },
  {
    id: 2,
    name: "Team Meeting",
    description: "Attend the weekly team sync-up",
    icon: "👥",
    dueDate: "2023-06-16",
    timeRequired: "1h",
  },
  {
    id: 3,
    name: "Code Review",
    description: "Review the latest pull request",
    icon: "💻",
    dueDate: "2023-06-17",
    timeRequired: "1.5h",
  },
  {
    id: 4,
    name: "Client Call",
    description: "Discuss project progress",
    icon: "📞",
    dueDate: "2023-06-18",
    timeRequired: "30m",
  },
];

export default function NextBestStepWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prevProgress + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [loading]);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isOpen ? 0 : "calc(100% - 60px)" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed bottom-0 left-2/4 right-0 w-full max-w-md mx-auto bg-white rounded-t-xl shadow-md overflow-hidden border border-black border-dashed antialiased"
    >
      <div
        className="p-3 cursor-pointer flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2 ml-4">
          <Footprints
            name="arrow-right-circle"
            className="w-5 h-5 text-gray-600"
          />
          <h2 className="text-xl font-semibold">Next Best Steps</h2>
        </div>

        <Button
          className=""
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
        >
          {isOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </Button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {loading && (
              <div className="px-4 pb-4">
                <Progress value={progress} className="w-full" />
              </div>
            )}
            <CardContent className="space-y-4">
              {tasks.slice(0, 3).map((task, index) => (
                <TaskItem key={task.id} task={task} loading={loading} />
              ))}
              {tasks.length > 3 && (
                <div className="opacity-50 pointer-events-none">
                  <TaskItem task={tasks[3]} loading={loading} />
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function TaskItem({ task, loading }) {
  const daysLeft = Math.ceil(
    (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md">
      <CardContent className="p-4">
        {loading ? (
          <SkeletonLoader />
        ) : (
          <div className="flex items-center space-x-4">
            <CircularCheckbox />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{task.name}</h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="text-2xl">{task.icon}</span>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {daysLeft} day{daysLeft !== 1 ? "s" : ""} left
              </div>
              <div className="text-sm text-gray-600">{task.timeRequired}</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function CircularCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <motion.div
      className={`w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center cursor-pointer transition-colors duration-300 ${
        checked ? "bg-black border-black" : "hover:border-black"
      }`}
      onClick={() => setChecked(!checked)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {checked && <CheckCircle className="w-4 h-4 text-white" />}
    </motion.div>
  );
}

function SkeletonLoader() {
  return (
    <div className="flex items-center space-x-4 w-full animate-pulse">
      <div className="w-6 h-6 bg-gray-300 rounded-full" />
      <div className="flex-grow space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-300 rounded w-1/2" />
      </div>
      <div className="flex flex-col items-end space-y-2">
        <div className="w-8 h-8 bg-gray-300 rounded" />
        <div className="w-20 h-3 bg-gray-300 rounded" />
        <div className="w-16 h-3 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
