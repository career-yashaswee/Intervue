"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Calendar,
  User,
  ArrowUpDown,
  Filter,
  MoreVertical,
  Download,
  FileText,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SessionCard = ({ session }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.2 }}
  >
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={session.mentorPhoto} alt={session.mentorName} />
              <AvatarFallback>
                {session.mentorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{session.mentorName}</h3>
              <p className="text-sm text-muted-foreground">{session.title}</p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <FileText className="mr-2 h-4 w-4" />
                <span>View AI Summary</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="mr-2 h-4 w-4" />
                <span>Download Recording</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="bg-muted p-2 rounded-lg text-center">
              <div className="text-xl font-bold">
                {session.date.split(" ")[0]}
              </div>
              <div className="text-xs">{session.date.split(" ")[1]}</div>
              <div className="text-xs text-muted-foreground">
                {session.date.split(" ")[2]}
              </div>
            </div>
            <div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {session.time}
              </div>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <Calendar className="w-4 h-4 mr-1" />
                {session.duration}
              </div>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <div
              className={`px-3 py-1 rounded-full text-sm ${
                session.status === "Completed"
                  ? "bg-green-100 text-green-800"
                  : session.status === "Cancelled"
                  ? "bg-red-100 text-red-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {session.status}
            </div>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const StatisticsCard = ({ title, value, icon: Icon, subValue, chart }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {subValue && <p className="text-xs text-muted-foreground">{subValue}</p>}
      {chart}
    </CardContent>
  </Card>
);

const MentorshipMinutesChart = ({ syncupMinutes, instantCallMinutes }) => {
  const data = [
    { name: "Syncup", value: syncupMinutes },
    { name: "Instant Call", value: instantCallMinutes },
  ];
  const COLORS = ["#0088FE", "#00C49F"];

  return (
    <PieChart width={200} height={100}>
      <Pie
        data={data}
        cx={100}
        cy={50}
        innerRadius={30}
        outerRadius={50}
        fill="#8884d8"
        paddingAngle={5}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

const MonthlyMinutesChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={200}>
    <AreaChart data={data}>
      <defs>
        <linearGradient id="colorSyncup" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorInstantCall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="month" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="syncup"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorSyncup)"
      />
      <Area
        type="monotone"
        dataKey="instantCall"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorInstantCall)"
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default function MentorSessions() {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Simulated data
  const sessions = [
    {
      id: 1,
      date: "30 Jul 2024 TUESDAY",
      title: "Syncup Session #5",
      time: "12:00 am",
      duration: "37 mins",
      status: "Completed",
      mentorName: "John Doe",
      mentorPhoto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      date: "24 Jun 2024 MONDAY",
      title: "Trial Session",
      time: "08:00 pm",
      duration: "30 mins",
      status: "Unattended",
      mentorName: "Jane Smith",
      mentorPhoto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      date: "26 Jun 2024 WEDNESDAY",
      title: "Trial Session",
      time: "07:30 am",
      duration: "30 mins",
      status: "Cancelled",
      mentorName: "Bob Johnson",
      mentorPhoto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      date: "27 Jun 2024 THURSDAY",
      title: "Trial Session",
      time: "01:00 am",
      duration: "73 mins",
      status: "Completed",
      mentorName: "Alice Brown",
      mentorPhoto: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      date: "2 Jul 2024 TUESDAY",
      title: "Syncup Session #1",
      time: "12:00 am",
      duration: "44 mins",
      status: "Completed",
      mentorName: "Charlie Green",
      mentorPhoto: "/placeholder.svg?height=40&width=40",
    },
    // Add more sessions to test pagination
  ];

  const monthlyData = [
    { month: "Jan", syncup: 65, instantCall: 28 },
    { month: "Feb", syncup: 59, instantCall: 48 },
    { month: "Mar", syncup: 80, instantCall: 40 },
    { month: "Apr", syncup: 81, instantCall: 19 },
    { month: "May", syncup: 56, instantCall: 86 },
    { month: "Jun", syncup: 55, instantCall: 27 },
  ];

  // Simulated loading
  setTimeout(() => setIsLoading(false), 2000);

  const filteredSessions = sessions
    .filter((session) => filter === "All" || session.status === filter)
    .sort((a, b) => {
      const dateA = new Date(
        a.date.split(" ")[0] +
          " " +
          a.date.split(" ")[1] +
          " " +
          a.date.split(" ")[2]
      );
      const dateB = new Date(
        b.date.split(" ")[0] +
          " " +
          b.date.split(" ")[1] +
          " " +
          b.date.split(" ")[2]
      );
      return sortOrder === "desc" ? dateB - dateA : dateA - dateB;
    });

  const pageCount = Math.ceil(filteredSessions.length / itemsPerPage);
  const paginatedSessions = filteredSessions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4"
    >
      <h1 className="text-3xl font-bold mb-4">My Sessions</h1>
      <p className="text-muted-foreground mb-8">
        Find a timeline of all sessions you have ever taken with your mentors!
        Get an idea of how much you have connected with mentors and also perform
        any session related action here.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="filter" className="text-sm font-medium">
                Filter:
              </label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger id="filter" className="w-[180px]">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                  <SelectItem value="Unattended">Unattended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <motion.button
              className="flex items-center text-sm"
              onClick={() =>
                setSortOrder(sortOrder === "desc" ? "asc" : "desc")
              }
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sort by Date <ArrowUpDown className="ml-2 h-4 w-4" />
            </motion.button>
          </div>

          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Skeleton className="h-10 w-10 rounded-full mr-3" />
                          <div>
                            <Skeleton className="h-4 w-32 mb-2" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <Skeleton className="h-8 w-8 rounded" />
                      </div>
                      <Skeleton className="h-px w-full my-4" />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Skeleton className="h-16 w-16 rounded" />
                          <div>
                            <Skeleton className="h-3 w-24 mb-2" />
                            <Skeleton className="h-3 w-20" />
                          </div>
                        </div>
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {paginatedSessions.map((session) => (
                  <SessionCard key={session.id} session={session} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-4">
          <StatisticsCard title="Lifetime Sessions" value="6" icon={Calendar} />
          <StatisticsCard
            title="Mentorship Minutes"
            value="284 minutes"
            icon={Clock}
            subValue="Syncup Minutes: 284 • Instant Call Minutes: 0"
            chart={
              <MentorshipMinutesChart
                syncupMinutes={284}
                instantCallMinutes={0}
              />
            }
          />
          <StatisticsCard
            title="Weekly Schedule"
            value="1 session/week"
            icon={User}
            subValue={
              <div className="flex items-center mt-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage
                    src="/placeholder.svg?height=24&width=24"
                    alt="Mentor"
                  />
                  <AvatarFallback>M</AvatarFallback>
                </Avatar>
                <span className="text-sm">John Doe</span>
              </div>
            }
          />
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Monthly Minutes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <MonthlyMinutesChart data={monthlyData} />
            </CardContent>
          </Card>
        </div>
      </div>

      <motion.div
        className="fixed bottom-0 left-0 right-0 bg-background p-4 border-t"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="flex justify-center space-x-2">
          {[...Array(pageCount)].map((_, i) => (
            <motion.button
              key={i}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
              onClick={() => setCurrentPage(i + 1)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {i + 1}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
