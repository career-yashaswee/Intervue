"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const steps = [
  {
    title: "Getting Started with your Mentor",
    description:
      "Kick off your mentorship journey by setting clear goals, understanding the mentorship process, and outlining your career aspirations with your mentor.",
    progress: 33,
    status: "ongoing",
  },
  {
    title: "Preparation Phase",
    description:
      "Dive deep into skill-building, resume crafting, and interview preparation tailored to your target industry and roles.",
    progress: 0,
    status: "locked",
  },
  {
    title: "Reach the Interview Readiness Score of 7",
    description:
      "Achieve a competency level where you are consistently rated at or above a score of 7 in mock interviews.",
    progress: 0,
    status: "locked",
  },
  {
    title: "Crack a Job",
    description:
      "Apply the skills, knowledge, and strategies you\&aposve developed to secure a job offer in your field.",
    progress: 0,
    status: "locked",
  },
];

export default function JourneyProgress({ loading }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>Your Journey So Far!</CardTitle>
          <p className="text-sm text-gray-500">
            Track your journey so far with your Mentor
          </p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-16 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="flex items-center mb-4">
                <div className="w-full">
                  <div className="flex justify-between mb-1">
                    <span>Getting Started</span>
                    <Trophy className="text-yellow-500" />
                  </div>
                  <Progress value={100} className="w-full" />
                </div>
              </div>

              <h3 className="font-semibold mb-2">Progress</h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: "auto" }}
                    animate={{ height: collapsed && index > 0 ? 0 : "auto" }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="flex justify-between mb-1">
                      <span>{step.title}</span>
                      {step.status === "ongoing" ? (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          Ongoing
                        </span>
                      ) : (
                        <Lock className="text-gray-400" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mb-2">
                      {step.description}
                    </p>
                    <Progress value={step.progress} className="w-full" />
                  </motion.div>
                ))}
              </div>

              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? "Expand" : "Collapse"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
