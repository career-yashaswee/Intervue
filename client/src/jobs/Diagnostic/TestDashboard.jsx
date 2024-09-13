"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, formatDistanceToNow } from "date-fns";
import {
  Calendar as CalendarIcon,
  Plus,
  Filter,
  ArrowUpDown,
  ChevronDown,
  Check,
  Activity,
  Clock,
  HelpCircle,
  Target,
  Zap,
  Book,
  Award,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { BarChart, LineChart } from "recharts";

// Mock data for previous tests
const previousTests = [
  {
    id: 1,
    category: "Math",
    duration: "30 min",
    questions: 20,
    date: new Date(2023, 5, 1),
    topics: ["Algebra", "Geometry"],
  },
  {
    id: 2,
    category: "Science",
    duration: "45 min",
    questions: 30,
    date: new Date(2023, 5, 5),
    topics: ["Physics", "Chemistry"],
  },
  {
    id: 3,
    category: "History",
    duration: "60 min",
    questions: 40,
    date: new Date(2023, 5, 10),
    topics: ["World War II", "Renaissance"],
  },
  {
    id: 4,
    category: "English",
    duration: "40 min",
    questions: 25,
    date: new Date(2023, 5, 15),
    topics: ["Grammar", "Literature"],
  },
  {
    id: 5,
    category: "Geography",
    duration: "35 min",
    questions: 22,
    date: new Date(2023, 5, 20),
    topics: ["Maps", "Continents"],
  },
];

// Mock data for topics
const topics = [
  { id: 1, name: "Algebra", description: "Basic algebraic concepts" },
  { id: 2, name: "Geometry", description: "Shapes and spatial relationships" },
  { id: 3, name: "Physics", description: "Laws of nature and the universe" },
  {
    id: 4,
    name: "Chemistry",
    description: "Study of matter and its properties",
  },
  {
    id: 5,
    name: "World War II",
    description: "Major global conflict from 1939-1945",
  },
  {
    id: 6,
    name: "Renaissance",
    description: "European cultural rebirth period",
  },
  { id: 7, name: "Grammar", description: "Rules of language structure" },
  {
    id: 8,
    name: "Literature",
    description: "Written works of lasting importance",
  },
  {
    id: 9,
    name: "Maps",
    description: "Visual representations of geographical areas",
  },
  { id: 10, name: "Continents", description: "Earth's main large landmasses" },
];

export default function TestDashboard() {
  const [date, setDate] = useState();
  const [isNewTestDialogOpen, setIsNewTestDialogOpen] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [filterCategory, setFilterCategory] = useState(null);
  const [filteredTests, setFilteredTests] = useState(previousTests);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let sorted = [...previousTests];
    if (sortConfig.key) {
      sorted.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "ascending" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "ascending" ? 1 : -1;
        return 0;
      });
    }
    if (filterCategory) {
      sorted = sorted.filter((test) => test.category === filterCategory);
    }
    setFilteredTests(sorted);
  }, [sortConfig, filterCategory]);

  const handleSort = (key) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key && sortConfig.direction === "ascending"
          ? "descending"
          : "ascending",
    });
  };

  const handleTopicChange = (topicName) => {
    setSelectedTopics((prev) =>
      prev.includes(topicName)
        ? prev.filter((t) => t !== topicName)
        : [...prev, topicName]
    );
  };

  const activityData = [
    { name: "Mon", value: 10 },
    { name: "Tue", value: 15 },
    { name: "Wed", value: 8 },
    { name: "Thu", value: 12 },
    { name: "Fri", value: 20 },
    { name: "Sat", value: 18 },
    { name: "Sun", value: 5 },
  ];

  const scoreData = [
    { name: "Week 1", value: 75 },
    { name: "Week 2", value: 80 },
    { name: "Week 3", value: 85 },
    { name: "Week 4", value: 78 },
    { name: "Week 5", value: 90 },
    { name: "Week 6", value: 88 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-4 space-y-8"
    >
      {/* <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-3xl font-bold text-center mb-8"
      >
        Test Manager Dashboard
      </motion.h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Daily Goal */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 border rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Target className="mr-2" />
            Daily Goal
          </h2>
          {isLoading ? (
            <Skeleton className="w-full h-4 rounded" />
          ) : (
            <>
              <Progress value={75} className="w-full" />
              <p className="text-sm mt-2">75% completed</p>
            </>
          )}
        </motion.div>

        {/* Weekly Activity */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 border rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2" />
            Weekly Activity
          </h2>
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-full h-4 rounded" />
              <Skeleton className="w-full h-4 rounded" />
            </div>
          ) : (
            <ul className="space-y-2">
              <li className="flex items-center">
                <HelpCircle className="mr-2" /> Questions Solved: 100
              </li>
              <li className="flex items-center">
                <Check className="mr-2" /> Correct Questions: 80
              </li>
              <li className="flex items-center">
                <Target className="mr-2" /> Accuracy: 80%
              </li>
              <li className="flex items-center">
                <Zap className="mr-2" /> Time Efficiency: 85%
              </li>
            </ul>
          )}
        </motion.div>

        {/* Calendar */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="p-4 border rounded-lg shadow-sm"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <CalendarIcon className="mr-2" />
            Select Date
          </h2>
          {isLoading ? (
            <Skeleton className="w-full h-10 rounded" />
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        </motion.div>
      </div>

      {/* Previous Tests Table */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-8"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold flex items-center">
            <Book className="mr-2" />
            Previous Tests
          </h2>
          <Button onClick={() => setIsNewTestDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> New Test
          </Button>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    Category
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="ml-2 h-8">
                          <Filter className="mr-2 h-4 w-4" />
                          Filter
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuCheckboxItem
                          checked={filterCategory === null}
                          onCheckedChange={() => setFilterCategory(null)}
                        >
                          All
                        </DropdownMenuCheckboxItem>
                        {Array.from(
                          new Set(previousTests.map((test) => test.category))
                        ).map((category) => (
                          <DropdownMenuCheckboxItem
                            key={category}
                            checked={filterCategory === category}
                            onCheckedChange={() => setFilterCategory(category)}
                          >
                            {category}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    Duration
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("duration")}
                    >
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                <TableHead>Questions</TableHead>
                <TableHead>
                  <div className="flex items-center space-x-2">
                    Date
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSort("date")}
                    >
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </TableHead>
                <TableHead>Topics</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <AnimatePresence>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Skeleton className="w-full h-12" />
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTests.map((test) => (
                    <motion.tr
                      key={test.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <TableCell className="font-medium">{test.id}</TableCell>
                      <TableCell>{test.category}</TableCell>
                      <TableCell>{test.duration}</TableCell>
                      <TableCell>{test.questions}</TableCell>
                      <TableCell>
                        {formatDistanceToNow(test.date, { addSuffix: true })}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {test.topics.map((topic, index) => (
                            <Badge key={index} variant="secondary">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* New Test Dialog */}
      <Dialog open={isNewTestDialogOpen} onOpenChange={setIsNewTestDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Test</DialogTitle>
            <DialogDescription>
              Set up a new test with the following details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="math">Math</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">
                Duration
              </Label>
              <Input
                id="duration"
                type="number"
                placeholder="Duration in minutes"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="questions" className="text-right">
                Questions
              </Label>
              <Input
                id="questions"
                type="number"
                placeholder="Number of questions"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Topics</Label>
              <div className="col-span-3">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select topics" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.name}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedTopics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-1 h-4 w-4 p-0"
                        onClick={() => handleTopicChange(topic)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Test</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Activity Heat Map */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 p-4 border rounded-lg shadow-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Activity className="mr-2" />
          Activity Heat Map
        </h2>
        {isLoading ? (
          <Skeleton className="w-full h-40" />
        ) : (
          <BarChart data={activityData} />
        )}
      </motion.div>

      {/* Total Score Over Time */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 p-4 border rounded-lg shadow-sm"
      >
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <Award className="mr-2" />
          Total Score Over Time
        </h2>
        {isLoading ? (
          <Skeleton className="w-full h-60" />
        ) : (
          <LineChart data={scoreData} />
        )}
      </motion.div>
    </motion.div>
  );
}
