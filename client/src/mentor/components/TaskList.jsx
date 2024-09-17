import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const TaskList = ({ tasks }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Completed ({tasks?.length})</h2>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <CheckCircle className="text-green-500" />
              <span className="text-lg line-through">{task.title}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">{task.date}</span>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TaskList;
