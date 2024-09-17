"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import TaskList from "./TaskList";
import ProgressTracker from "./ProgressTracker";
import HelpSection from "./HelpSection";

export default function MentorTasks() {
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const mockTasks = [
        { id: 1, title: "Java Revision", date: "08 Jul", completed: true },
        { id: 2, title: "Java Continue", date: "15 Jul", completed: true },
        {
          id: 3,
          title: "Resume Form Complete",
          date: "19 Jul",
          completed: true,
        },
        {
          id: 4,
          title: "Linkedin profile updates",
          date: "14 Sep",
          completed: true,
        },
        { id: 5, title: "Application Google", date: "21 Jul", completed: true },
        { id: 6, title: "Resume Creation", date: "06 Jul", completed: true },
      ];
      setTasks(mockTasks);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        title: "Error",
        description: "Failed to fetch tasks. Please try again.",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-6">My Tasks</h1>
      <p className="text-gray-600 mb-8">
        Find all the granular tasks that your mentor assigns you to achieve your
        planned goals! Each task has its own resources and notes that your
        mentor can use to help you.
      </p>

      {loading ? (
        <TaskListSkeleton />
      ) : (
        <AnimatePresence>
          <TaskList tasks={tasks} />
        </AnimatePresence>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProgressTracker completed={tasks?.length} total={8} />
        <HelpSection />
      </div>
    </motion.div>
  );
}

function TaskListSkeleton() {
  return (
    <div className="space-y-4">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      ))}
    </div>
  );
}
