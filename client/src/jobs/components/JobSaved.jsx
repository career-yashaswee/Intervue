"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Briefcase,
  Building2,
  CalendarDays,
  Eye,
  Trash2,
  Filter,
  SortAsc,
  CheckCircle2,
  XCircle,
  FileText,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// StatCard component
function StatCard({ title, value, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

// MatchScore component
function MatchScore({ score }) {
  const color =
    score >= 80
      ? "text-green-500"
      : score >= 60
      ? "text-yellow-500"
      : "text-red-500";
  return (
    <div className="relative w-12 h-12">
      <svg className="w-full h-full" viewBox="0 0 36 36">
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke="#eee"
          strokeWidth="3"
        />
        <path
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          fill="none"
          stroke={color.replace("text-", "")}
          strokeWidth="3"
          strokeDasharray={`${score}, 100`}
        />
      </svg>
      <div
        className={`absolute inset-0 flex items-center justify-center text-sm font-semibold ${color}`}
      >
        {score}%
      </div>
    </div>
  );
}

// JobCard component
function JobCard({ job, onRemove, onEasyApply }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <Card className="flex flex-col justify-between h-full transition-shadow duration-300 hover:shadow-md">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-2">
              <img
                src={job.logo}
                alt={job.company}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{job.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {job.isNew && (
                <Badge className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white">
                  New
                </Badge>
              )}
              <MatchScore score={job.matchScore} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-2">{job.location}</p>
          <p className="font-semibold mb-2">{job.salary}</p>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <span>{job.skillsMatching} Skills matching</span>
            <XCircle className="h-4 w-4 text-red-500 ml-2" />
            <span>{job.skillsMissing} Skills missing</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm" onClick={onEasyApply}>
            Easy Apply
          </Button>
          <div className="flex space-x-2">
            <Button size="sm" variant="ghost" onClick={onRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost">
              <FileText className="h-4 w-4" />
              <span className="sr-only">View gap analysis</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// Mock data for saved jobs
const initialJobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    logo: "/placeholder.svg?height=50&width=50",
    location: "San Francisco, CA",
    salary: "$100k - $130k",
    postedDate: "2023-05-01",
    isNew: true,
    matchScore: 85,
    skillsMatching: 6,
    skillsMissing: 2,
  },
  {
    id: 2,
    title: "UX Designer",
    company: "DesignHub",
    logo: "/placeholder.svg?height=50&width=50",
    location: "New York, NY",
    salary: "$90k - $120k",
    postedDate: "2023-04-28",
    isNew: false,
    matchScore: 72,
    skillsMatching: 5,
    skillsMissing: 3,
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataMinds",
    logo: "/placeholder.svg?height=50&width=50",
    location: "Boston, MA",
    salary: "$120k - $150k",
    postedDate: "2023-05-02",
    isNew: true,
    matchScore: 90,
    skillsMatching: 7,
    skillsMissing: 1,
  },
  {
    id: 4,
    title: "Product Manager",
    company: "InnovateCo",
    logo: "/placeholder.svg?height=50&width=50",
    location: "Austin, TX",
    salary: "$110k - $140k",
    postedDate: "2023-04-25",
    isNew: false,
    matchScore: 68,
    skillsMatching: 4,
    skillsMissing: 4,
  },
];

export default function JobSaved() {
  const [savedJobs, setSavedJobs] = useState(initialJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("matchScore");
  const [filterBy, setFilterBy] = useState("all");
  const jobsPerPage = 8;
  const totalJobs = savedJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);

  const sortedJobs = [...savedJobs].sort((a, b) => {
    if (sortBy === "matchScore") return b.matchScore - a.matchScore;
    if (sortBy === "salary")
      return (
        parseInt(b.salary.split("$")[1].split("k")[0]) -
        parseInt(a.salary.split("$")[1].split("k")[0])
      );
    return 0;
  });

  const filteredJobs = sortedJobs.filter((job) => {
    if (filterBy === "all") return true;
    if (filterBy === "new") return job.isNew;
    if (filterBy === "highMatch") return job.matchScore >= 80;
    return true;
  });

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const handleRemoveJob = (id) => {
    setSavedJobs(savedJobs.filter((job) => job.id !== id));
  };

  const handleEasyApply = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Jobs</TabsTrigger>
          <TabsTrigger value="new">New Jobs</TabsTrigger>
          <TabsTrigger value="highMatch">High Match</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="flex justify-between mb-4">
            <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
              <SelectTrigger>
                <SelectValue>Sort By</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="matchScore">Match Score</SelectItem>
                <SelectItem value="salary">Salary</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={filterBy}
              onValueChange={(value) => setFilterBy(value)}
            >
              <SelectTrigger>
                <SelectValue>Filter By</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="highMatch">High Match</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onRemove={() => handleRemoveJob(job.id)}
                onEasyApply={handleEasyApply}
              />
            ))}
          </div>
          <Pagination>
            <PaginationPrevious
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </PaginationPrevious>
            <PaginationNext
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </PaginationNext>
          </Pagination>
        </TabsContent>
        {/* Add other TabsContent for "new" and "highMatch" if necessary */}
      </Tabs>
    </div>
  );
}
