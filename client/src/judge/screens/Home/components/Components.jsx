// Logo.tsx

import { motion } from "framer-motion";
import React from "react";
export const Logo = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
  >
    <BugPlay className="text-6xl text-foreground" />
  </motion.div>
);

// MainHeading.tsx

export const MainHeading = () => (
  <motion.h1
    className="text-4xl font-normal text-foreground mb-3"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
  >
    <span className="font-bold">Code</span> Deck
  </motion.h1>
);

// SubHeading.tsx

export const SubHeading = () => (
  <motion.div
    className="text-2xl text-foreground opacity-70 mb-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 0.7, y: 0 }}
    transition={{ delay: 0.6 }}
  >
    Code. Compile. Debug.
  </motion.div>
);

// AddNewButton.tsx

import { Button } from "@/components/ui/button";
import { BugPlay, PlusCircle } from "lucide-react";

export const AddNewButton = ({ onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8 }}
  >
    <Button
      onClick={onClick}
      className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <PlusCircle className="mr-2 h-4 w-4" /> Create New Playground
    </Button>
  </motion.div>
);

// SkeletonLoader.tsx

import { Skeleton } from "@/components/ui/skeleton";

export const SkeletonLoader = () => (
  <div className="space-y-4">
    <Skeleton className="h-40 w-40 rounded-full mx-auto" />
    <Skeleton className="h-8 w-3/4 mx-auto" />
    <Skeleton className="h-6 w-1/2 mx-auto" />
    <Skeleton className="h-10 w-2/3 mx-auto rounded-full" />
  </div>
);
