"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReferralsGiven({ loading }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>Referrals Given</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <p className="text-4xl font-bold mb-4">00</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Your mentor has referred you
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-4 h-4 mr-2 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  Your mentor has requested other relevant Preplaced mentors to
                  refer you
                </li>
              </ul>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
