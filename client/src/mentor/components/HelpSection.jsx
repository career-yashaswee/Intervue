import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HelpSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-50 p-6 rounded-lg"
    >
      <h2 className="text-xl font-semibold mb-4">Feeling stuck? 🤔</h2>
      <p className="text-gray-600 mb-4">
        Are you stuck on a task for some time and need help? Your mentor is only
        a message away!
      </p>
      <Button variant="outline" className="w-full">
        Ask for help →
      </Button>
    </motion.div>
  );
};

export default HelpSection;
