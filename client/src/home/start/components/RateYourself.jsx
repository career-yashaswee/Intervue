"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MessageCircle, Globe, Users, Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion, AnimatePresence } from "framer-motion";

const Skill = "Communication" | "Language Fluency" | "Leadership";
const Level = "Novice" | "Average" | "Confident" | "Expert";

const skillIcons = {
  Communication: <MessageCircle className="w-4 h-4" />,
  "Language Fluency": <Globe className="w-4 h-4" />,
  Leadership: <Users className="w-4 h-4" />,
};

const levels = ["Novice", "Average", "Confident", "Expert"];

const skillExamples = {
  Communication: "e.g., Presenting ideas clearly",
  "Language Fluency": "e.g., Conversing in a foreign language",
  Leadership: "e.g., Guiding a team project",
};

const SkillPill = ({ level, isSelected, onClick, icon, tabIndex }) => {
  return (
    <motion.button
      onClick={onClick}
      tabIndex={tabIndex}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`p-3 text-sm font-medium rounded-full transition-all flex items-center justify-center space-x-2
        ${
          isSelected
            ? "bg-black text-white hover:bg-black"
            : "bg-white text-black border border-gray-300"
        }
         focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2`}
    >
      {icon}
      <span>{level}</span>
    </motion.button>
  );
};

const SkillRating = ({ skill, rating, onRating }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {levels.map((level, index) => (
        <SkillPill
          key={level}
          level={level}
          isSelected={rating === level}
          onClick={() => onRating(level)}
          icon={
            index === levels.length - 1 ? (
              <Star className="w-4 h-4 mr-1" />
            ) : (
              skillIcons[skill]
            )
          }
          tabIndex={0}
        />
      ))}
    </div>
  );
};

const FeedbackText = ({ skill, rating }) => {
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (rating) {
      setLoading(true);
      // Simulating API call
      setTimeout(() => {
        setFeedback(`Your ${skill} level is ${rating}. Keep improving!`);
        setLoading(false);
      }, 1000);
    }
  }, [skill, rating]);

  if (!rating) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mt-4 mb-2"
      >
        {loading ? (
          <Skeleton className="h-4 w-3/4" />
        ) : (
          <p className="text-sm text-gray-600">{feedback}</p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default function RateYourself() {
  const [ratings, setRatings] = useState({
    Communication: null,
    "Language Fluency": null,
    Leadership: null,
  });

  const handleRating = (skill, level) => {
    setRatings((prev) => ({ ...prev, [skill]: level }));
  };

  const handleKeyDown = (e, skill, currentLevel) => {
    const currentIndex = currentLevel ? levels.indexOf(currentLevel) : -1;
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      const nextIndex = (currentIndex + 1) % levels.length;
      handleRating(skill, levels[nextIndex]);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      const prevIndex = (currentIndex - 1 + levels.length) % levels.length;
      handleRating(skill, levels[prevIndex]);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-white shadow-lg">
        <CardContent className="p-6 space-y-8">
          {Object.keys(ratings).map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onKeyDown={(e) => handleKeyDown(e, skill, ratings[skill])}
            >
              <div className="flex items-center space-x-3 mb-2 text-gray-700">
                {skillIcons[skill]}
                <label className="text-lg font-medium">{skill}</label>
              </div>
              <p className="text-sm text-gray-500 mb-4">
                {skillExamples[skill]}
              </p>
              <SkillRating
                skill={skill}
                rating={ratings[skill]}
                onRating={(level) => handleRating(skill, level)}
              />
              <FeedbackText skill={skill} rating={ratings[skill]} />
              {index < Object.keys(ratings).length - 1 && (
                <Separator className="mt-6 mb-2" />
              )}
            </motion.div>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
