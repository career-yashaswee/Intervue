import React from "react";
import { motion } from "framer-motion";

const SkeletonLoader = ({ count }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <motion.div
        key={index}
        className="flex items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <div className="w-12 h-12 bg-gray-200 rounded-full mr-4" />
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
        </div>
      </motion.div>
    ));
};

export { SkeletonLoader };
