"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mentors = [
  {
    name: "John Doe",
    photo: "/placeholder.svg",
    title: "Senior Developer",
    company: "Tech Co",
  },
  {
    name: "Jane Smith",
    photo: "/placeholder.svg",
    title: "Product Manager",
    company: "Innovate Inc",
  },
  {
    name: "Alex Johnson",
    photo: "/placeholder.svg",
    title: "UX Designer",
    company: "Design Studio",
  },
];

export default function MentorRequests({ loading }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle>Request to your Mentor</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-48 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div className="relative h-48">
              <motion.div
                className="flex h-full"
                animate={{ x: `-${currentSlide * 100}%` }}
                transition={{ duration: 0.5 }}
              >
                {mentors.map((mentor, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-16 h-16">
                        <AvatarImage src={mentor.photo} alt={mentor.name} />
                        <AvatarFallback>
                          {mentor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{mentor.name}</h3>
                        <p className="text-sm text-gray-500">{mentor.title}</p>
                        <p className="text-sm text-gray-500">
                          {mentor.company}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
              <button
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev > 0 ? prev - 1 : mentors.length - 1
                  )
                }
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md"
                onClick={() =>
                  setCurrentSlide((prev) =>
                    prev < mentors.length - 1 ? prev + 1 : 0
                  )
                }
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
