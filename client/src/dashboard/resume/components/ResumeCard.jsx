"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Briefcase, Share2 } from "lucide-react";

export default function ResumeCard({}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.05 }}
      className="p-4"
    >
      <Card className="w-full max-w-md mx-auto overflow-hidden bg-white dark:bg-gray-800 relative">
        {/* Gradient lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
          <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent" />
        </div>

        <CardContent className="p-0">
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            <>
              <div className="relative">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Preview"
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <CircularChart score={85} />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <img
                    src="/placeholder.svg?height=40&width=40"
                    alt="Company Logo"
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <h2 className="text-2xl font-bold">TechCorp Inc.</h2>
                </div>
                <div className="flex items-center mb-4">
                  <Briefcase className="w-4 h-4 mr-2" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Senior Software Engineer
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge>React</Badge>
                  <Badge>TypeScript</Badge>
                  <Badge>Node.js</Badge>
                </div>
                <Badge variant="outline" className="text-xs font-mono">
                  v1.0
                </Badge>
              </div>
            </>
          )}
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-700 p-4">
          <div className="flex justify-between w-full">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" disabled={isLoading}>
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="sm" variant="outline" disabled={isLoading}>
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function CircularChart({ score }) {
  const circumference = 2 * Math.PI * 30;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative w-16 h-16 bg-white bg-opacity-75 rounded-full flex items-center justify-center">
      <svg className="w-16 h-16 transform -rotate-90">
        <circle
          className="text-gray-300"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="32"
          cy="32"
        />
        <circle
          className="text-primary"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="30"
          cx="32"
          cy="32"
        />
      </svg>
      <span className="absolute text-sm font-bold">{score}%</span>
    </div>
  );
}

function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="w-full h-48 bg-gray-300" />
      <div className="p-6 space-y-4">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-300 rounded-full mr-3" />
          <div className="h-8 bg-gray-300 rounded w-3/4" />
        </div>
        <div className="h-4 bg-gray-300 rounded w-1/2" />
        <div className="flex space-x-2">
          <div className="h-6 bg-gray-300 rounded w-16" />
          <div className="h-6 bg-gray-300 rounded w-16" />
          <div className="h-6 bg-gray-300 rounded w-16" />
        </div>
        <div className="h-6 bg-gray-300 rounded w-16" />
      </div>
    </div>
  );
}
