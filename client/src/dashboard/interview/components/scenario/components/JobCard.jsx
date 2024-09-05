"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { MoreHorizontal, Briefcase, Building } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Confetti from "react-confetti";
import { motion } from "framer-motion";

// interface JobCardProps {
//   title: string
//   company: string
//   logo: string
//   description: string
//   experience: string
//   isLoading?: boolean
// }

export default function JobCard({
  title,
  company,
  logo,
  description,
  experience,
  isLoading = false,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
        <CardHeader className="relative">
          {isLoading ? (
            <Skeleton className="h-16 w-16 rounded-full" />
          ) : (
            <img
              src={logo}
              alt={`${company} logo`}
              className="h-16 w-16 rounded-full object-cover"
            />
          )}
          <div className="absolute top-4 right-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <>
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">{title}</h2>
              <div className="flex items-center space-x-2 text-gray-500">
                <Building className="h-4 w-4" />
                <span>{company}</span>
              </div>
            </>
          )}
          {isLoading ? (
            <Skeleton className="h-20 w-full" />
          ) : (
            <div className="relative">
              <p
                className={`text-gray-600 ${isExpanded ? "" : "line-clamp-3"}`}
              >
                {description}
              </p>
              {!isExpanded && (
                <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>
          )}
          {!isLoading && (
            <Button variant="link" onClick={toggleExpand} className="p-0">
              {isExpanded ? "Show less" : "Show more"}
            </Button>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          {isLoading ? (
            <Skeleton className="h-8 w-24" />
          ) : (
            <Badge variant="secondary" className="flex items-center space-x-1">
              <Briefcase className="h-4 w-4" />
              <span>{experience}</span>
            </Badge>
          )}
        </CardFooter>
      </Card>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
    </motion.div>
  );
}
