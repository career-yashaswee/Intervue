"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Users, Eye, Clock } from "lucide-react";
import Sidebar from "./SideBar";

const SkeletonLoader = () => (
  <div className="w-full h-screen bg-gray-100 animate-pulse"></div>
);

export default function EventPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => setIsLoading(false), 2000);
  }, []);

  if (isLoading) return <SkeletonLoader />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-8 flex"
    >
      <div className="flex-grow mr-8">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">
              Flipkart GRiD 6.0 - Software Development Track
            </CardTitle>
            <CardDescription>
              Flipkart's Flagship Engineering Campus Challenge
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span>Updated On Sep 10, 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="stages" className="w-full">
          <TabsList>
            <TabsTrigger value="stages">Stages & Timeline</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="prizes">Prizes</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faqs">FAQs</TabsTrigger>
          </TabsList>
          <TabsContent value="stages">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-4">Stages and Timeline</h2>
              {/* Add stages and timeline content here */}
            </motion.div>
          </TabsContent>
          {/* ... other TabsContent components ... */}
        </Tabs>
      </div>
      <div className="w-80 sticky top-4 self-start">
        <Sidebar />
      </div>
    </motion.div>
  );
}
