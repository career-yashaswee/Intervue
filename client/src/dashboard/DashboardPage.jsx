"use client";

import { getHours } from "date-fns";
import { useNodesState, useEdgesState } from "reactflow";
import ReactFlow from "reactflow";
import { Background, Controls } from "reactflow";
import NPathwayCard from "./components/NPathwayCard";
import NextBestStepWidget from "@/insights/next-best-steps/NextBestStepWidget";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  CheckCircle,
  Clock,
  Code,
  MoreVertical,
  Trophy,
  BookOpen,
  ArrowRight,
  Calendar,
  Users,
  UserIcon,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock data (unchanged from previous example)
const competencyData = [
  { time: "2023-01", accuracy: 75, timeSpent: 120, score: 80 },
  { time: "2023-02", accuracy: 80, timeSpent: 110, score: 85 },
  { time: "2023-03", accuracy: 85, timeSpent: 100, score: 90 },
  { time: "2023-04", accuracy: 90, timeSpent: 90, score: 95 },
  { time: "2023-05", accuracy: 95, timeSpent: 80, score: 100 },
];

const nextSteps = [
  {
    id: 1,
    title: "Complete Advanced Algorithms Course",
    description: "Enhance your problem-solving skills",
    icon: Code,
  },
  {
    id: 2,
    title: "Participate in Coding Contest",
    description: "Apply your skills in a competitive environment",
    icon: Trophy,
  },
  {
    id: 3,
    title: "Review System Design Concepts",
    description: "Prepare for technical interviews",
    icon: Users,
  },
];

const recentNotifications = [
  {
    id: 1,
    message: "Great progress on your latest project!",
    mentor: "Jane Doe",
    avatar: "https://i.pravatar.cc/150?u=janedoe",
  },
  {
    id: 2,
    message: "Don't forget our 1-on-1 session tomorrow",
    mentor: "John Smith",
    avatar: "https://i.pravatar.cc/150?u=johnsmith",
  },
  {
    id: 3,
    message: "I've reviewed your code. Let's discuss the feedback.",
    mentor: "Alice Johnson",
    avatar: "https://i.pravatar.cc/150?u=johnsmith",
  },
];

const recentAchievements = [
  {
    id: 1,
    title: "Algorithm Master",
    description: "Solved 100 algorithm challenges",
    icon: "🏆",
  },
  {
    id: 2,
    title: "Bug Squasher",
    description: "Fixed 50 critical bugs",
    icon: "🐛",
  },
  {
    id: 3,
    title: "Code Reviewer",
    description: "Reviewed 25 pull requests",
    icon: "👀",
  },
];

const communityNotifications = [
  {
    id: 1,
    message: "New coding challenge posted in the forum",
    link: "/forum/challenges",
  },
  {
    id: 2,
    message: 'Upcoming webinar on "Mastering React Hooks"',
    link: "/events/webinars",
  },
  {
    id: 3,
    message: "Community code review session this Friday",
    link: "/events/code-review",
  },
];

const lastCourse = {
  title: "Advanced JavaScript Concepts",
  progress: 65,
  lastLesson: "Closures and Scope",
  image: "https://example.com/course-image.jpg",
};

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "HTML/CSS" },
    type: "input",
  },
  { id: "2", position: { x: 200, y: 0 }, data: { label: "JavaScript" } },
  { id: "3", position: { x: 400, y: 0 }, data: { label: "React" } },
  { id: "4", position: { x: 600, y: 0 }, data: { label: "Node.js" } },
  { id: "5", position: { x: 800, y: 0 }, data: { label: "Express.js" } },
  { id: "6", position: { x: 1000, y: 0 }, data: { label: "Databases" } },
  { id: "7", position: { x: 200, y: 150 }, data: { label: "TypeScript" } },
  { id: "8", position: { x: 400, y: 150 }, data: { label: "Next.js" } },
  { id: "9", position: { x: 600, y: 150 }, data: { label: "GraphQL" } },
  { id: "10", position: { x: 800, y: 150 }, data: { label: "Docker" } },
  { id: "11", position: { x: 1000, y: 150 }, data: { label: "CI/CD" } },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    animated: true,
    markerEnd: { type: "arrowClosed" }, // Use a string or another JavaScript compatible value
  },
  {
    id: "e2-3",
    source: "2",
    target: "3",
    animated: true,
    markerEnd: { type: "arrowClosed" },
  },
  {
    id: "e3-4",
    source: "3",
    target: "4",
    animated: true,
    markerEnd: { type: "arrowClosed" },
  },
  {
    id: "e4-5",
    source: "4",
    target: "5",
    animated: true,
    markerEnd: { type: "arrowClosed" },
  },
  {
    id: "e5-6",
    source: "5",
    target: "6",
    animated: true,
    markerEnd: { type: "arrowClosed" },
  },
  {
    id: "e2-7",
    source: "2",
    target: "7",
    animated: true,
    markerEnd: { type: "arrowClosed" },
  },
  {
    id: "e3-8",
    source: "3",
    target: "8",
    animated: true,
    markerEnd: { type: "arrowClosed" },
  },
  {
    id: "e4-9",
    source: "4",
    target: "9",
    animated: true,
    markerEnd: { type: "arrowClosed" },
  },
  {
    id: "e5-10",
    source: "5",
    target: "10",
    animated: true,
    markerEnd: { type: "arrowClosed" },
  },
  {
    id: "e6-11",
    source: "6",
    target: "11",
    animated: true,
    markerEnd: { type: "arrowClosed" },
  },
];

const CareerRoadmap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <Card className="col-span-full h-[500px]">
      <CardHeader>
        <CardTitle>Full Stack Web Developer Career Roadmap</CardTitle>
        <CardDescription>
          Your journey to becoming a proficient full stack developer
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[400px]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </CardContent>
    </Card>
  );
};

const ScoreCard = ({ title, score, icon: Icon }) => {
  const percentage = (score / 7) * 100;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <svg className="h-32 w-32">
            <circle
              className="text-muted stroke-current"
              strokeWidth="5"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="64"
              cy="64"
            />
            <circle
              className="text-primary stroke-current"
              strokeWidth="5"
              strokeDasharray={58 * 2 * Math.PI}
              strokeDashoffset={58 * 2 * Math.PI * (1 - percentage / 100)}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="58"
              cx="64"
              cy="64"
            />
          </svg>
          <span className="absolute text-2xl font-bold">{score}/7</span>
        </div>
      </CardContent>
    </Card>
  );
};

export function DashboardPage() {
  const hey = localStorage.getItem("user@first");
  const currentHour = getHours(new Date());
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const getGreeting = (hour) => {
    if (hour < 12) return "Morning";
    if (hour < 18) return "Afternoon";
    if (hour < 21) return "Evening";
    return "Night";
  };
  const greeting = getGreeting(currentHour);

  useEffect(() => {
    // Simulating data loading
    setTimeout(() => {
      setLoading(false);
      toast({
        title: "Welcome back!",
        description:
          "Your dashboard is ready. Let's continue your learning journey.",
      });
    }, 2000);
  }, [toast]);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-1 flex-col p-4 lg:p-6 space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-baseline">
            <h1 className="text-2xl font-medium md:text-2xl">
              {`Good ${greeting},`}&nbsp;
            </h1>
            <p className="text-4xl font-bold gradient-text">
              {hey == undefined ? "Cloudy" : hey}
            </p>
          </div>
          <p className="text-muted-foreground font-medium mt-2">
            Here's a Snapshot of your Career
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScoreCard title="Profile Score" score={5} icon={UserIcon} />
        <ScoreCard title="Interview Readiness" score={6} icon={UserIcon} />
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Your Learning Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="competency" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="competency">
                  Competency Diagnostic
                </TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>
              <TabsContent value="competency">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={competencyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#8884d8"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="score"
                        stroke="#82ca9d"
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="timeSpent"
                        stroke="#ffc658"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>
              <TabsContent value="achievements">
                <ul className="space-y-4">
                  {recentAchievements.map((achievement) => (
                    <motion.li
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center space-x-2 bg-white p-4 rounded-lg shadow-sm"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <p className="font-semibold">{achievement.title}</p>
                        <p className="text-sm text-gray-600">
                          {achievement.description}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        {/* <CareerRoadmap /> */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Next Best Steps</CardTitle>
            <CardDescription>
              Recommended actions to boost your skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {nextSteps.map((step, index) => (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="bg-primary text-primary-foreground p-2 rounded-full">
                    {React.createElement(step.icon, { className: "h-6 w-6" })}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{step.title}</p>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Start <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mentor Notifications</CardTitle>
            <CardDescription>Recent messages from your mentors</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recentNotifications.map((notification, index) => (
                <motion.li
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <Avatar>
                    <AvatarImage src={notification.avatar} />
                    <AvatarFallback>{notification.mentor[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notification.mentor}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Reply
                  </Button>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resume Your Work</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 text-blue-700 p-3 rounded-full">
                  <Code className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold">LeetCode Problem #217</p>
                  <p className="text-sm text-gray-600">Contains Duplicate</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Clock className="h-4 w-4" />
                <span>Last session: 2023-06-15 14:30 (1h 45m)</span>
              </div>
              <Button className="w-full" onClick={() => null}>
                Resume Session
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Continue Your Course</CardTitle>
            <CardDescription>Get back to learning</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src={lastCourse.image}
                  alt={lastCourse.title}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{lastCourse.title}</h3>
                  <p className="text-sm text-gray-600">
                    Last lesson: {lastCourse.lastLesson}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{lastCourse.progress}%</span>
                </div>
                <Progress value={lastCourse.progress} className="w-full" />
              </div>
              <Button className="w-full" onClick={() => null}>
                <BookOpen className="mr-2 h-4 w-4" /> Continue Learning
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Community Updates</CardTitle>
            <CardDescription>Stay connected with your peers</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {communityNotifications.map((notification, index) => (
                <motion.li
                  key={notification.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
                >
                  <div className="bg-green-100 text-green-700 p-2 rounded-full">
                    <Bell className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {notification.message}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => null}>
                    View
                  </Button>
                </motion.li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </motion.main>
  );
}

function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="h-8 w-64 bg-gray-200 rounded-md animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-md space-y-4"
          >
            <div className="h-6 w-3/4 bg-gray-200 rounded-md animate-pulse" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full bg-gray-200 rounded-md animate-pulse"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
