"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Briefcase, Lightbulb, HelpCircle } from "lucide-react";

// interface RoadmapStep {
//   id: number
//   heading: string
//   skills: string[]
//   timeRequired: string
//   goal: string
//   approximateDate: string
//   category: 'upskill' | 'training' | 'project' | 'other'
// }

// interface RoadmapProps {
//   steps: RoadmapStep[]
// }

function CategoryIcon({ category }) {
  switch (category) {
    case "upskill":
      return <Lightbulb className="w-5 h-5 text-yellow-500" />;
    case "training":
      return <BookOpen className="w-5 h-5 text-blue-500" />;
    case "project":
      return <Briefcase className="w-5 h-5 text-green-500" />;
    default:
      return <HelpCircle className="w-5 h-5 text-gray-500" />;
  }
}

function SkillPill({ skill }) {
  return (
    <motion.span
      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {skill}
    </motion.span>
  );
}

function RoadmapStep({ step, isStart, isEnd }) {
  return (
    <motion.div
      className="flex items-center mb-12"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-1/2 pr-8 text-right">
        <h3 className="text-xl font-semibold mb-2">{step.heading}</h3>
        <p className="text-gray-600 mb-2">{step.timeRequired}</p>
        <p className="text-sm text-gray-500">{step.approximateDate}</p>
      </div>
      <div className="relative">
        <motion.div
          className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          {step.id}
        </motion.div>
        {isStart && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs">
            Start
          </div>
        )}
        {isEnd && (
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-2 py-1 rounded text-xs">
            Goal
          </div>
        )}
      </div>
      <div className="w-1/2 pl-8">
        <div className="flex items-center mb-2">
          <CategoryIcon category={step.category} />
          <span className="ml-2 text-sm text-gray-600">{step.category}</span>
        </div>
        <p className="text-gray-700 mb-2">{step.goal}</p>
        <div className="flex flex-wrap gap-2">
          {step.skills.map((skill, index) => (
            <SkillPill key={index} skill={skill} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function Roadmap({ steps }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Your Learning Roadmap
      </h1>
      <div className="relative">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* {index > 0 && (
              <motion.div
                className="absolute left-1/2 w-1 bg-gradient-to-b from-blue-500 to-green-500"
                initial={{ height: 0 }}
                animate={{ height: "100%" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{ top: `${index * 250}px`, height: "250px" }}
              />
            )} */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <RoadmapStep
                step={step}
                isStart={index === 0}
                isEnd={index === steps.length - 1}
              />
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const mockSteps = [
  {
    id: 1,
    heading: "Learn React Basics",
    skills: ["JSX", "Components", "Props", "State"],
    timeRequired: "2 weeks",
    goal: "Build a simple React application",
    approximateDate: "June 1, 2023",
    category: "upskill",
  },
  {
    id: 2,
    heading: "Advanced React Concepts",
    skills: ["Hooks", "Context", "Redux", "Performance Optimization"],
    timeRequired: "3 weeks",
    goal: "Create a complex React application with state management",
    approximateDate: "June 22, 2023",
    category: "training",
  },
  {
    id: 3,
    heading: "Full-Stack Development",
    skills: ["Node.js", "Express", "MongoDB", "RESTful APIs"],
    timeRequired: "4 weeks",
    goal: "Develop a full-stack web application",
    approximateDate: "July 20, 2023",
    category: "project",
  },
];

function Overview() {
  localStorage.setItem("referrer", "onboard");

  return (
    <div className="min-h-screen">
      <Roadmap steps={mockSteps} />
    </div>
  );
}

export default Overview;
