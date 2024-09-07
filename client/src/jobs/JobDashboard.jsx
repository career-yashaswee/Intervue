"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBriefcase,
  faMapMarkerAlt,
  faDollarSign,
  faClock,
  faLaptopHouse,
  faBuilding,
  faGraduationCap,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { fetchAllJobs } from "@/helpers/jobsAPI";
import Widget from "@/insights/marketAnalysis/Widget";

// Skeleton loader component
const SkeletonLoader = () => (
  <div className="space-y-3 p-6 border border-gray-200 rounded-lg animate-pulse">
    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
  </div>
);

// Job card component
const JobCard = ({ job, isLoading }) => {
  if (isLoading) return <SkeletonLoader />;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      whileHover={{ scale: 1.02 }}
      className="relative bg-white p-6 rounded-lg shadow-sm overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h3 className="text-lg font-semibold">{job.title}</h3>
            <p className="text-sm text-gray-600">{job.company}</p>
          </div>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="w-3 h-3 mr-2" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-1">
          <FontAwesomeIcon icon={faDollarSign} className="w-3 h-3 mr-2" />
          <span>{job.salary}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <FontAwesomeIcon icon={faClock} className="w-3 h-3 mr-2" />
          <span>{job.datePosted}</span>
        </div>
      </div>
    </motion.div>
  );
};

// Filter component
const Filter = ({ icon, label, options, onChange, value }) => (
  <div className="mb-6">
    <h2 className="text-sm font-semibold mb-2 flex items-center">
      <FontAwesomeIcon icon={icon} className="w-3 h-3 mr-2" />
      {label}
    </h2>
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={`Select ${label}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// Main component
export default function JobDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [filters, setFilters] = useState({
    workMode: "",
    company: "",
    location: "",
    jobDomain: "",
    experienceYears: [0, 15],
  });

  const { toast } = useToast();

  const jobsPerPage = 6;

  // Simulating data fetch
  useEffect(() => {
    fetchAllJobs().then((fetchedJobs) => {
      setJobs(fetchedJobs);
      setFilteredJobs(fetchedJobs);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [searchTerm, sortBy, filters]);

  const applyFilters = () => {
    let result = jobs;

    // Apply search
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (filters.workMode) {
      result = result.filter((job) => job.workMode === filters.workMode);
    }
    if (filters.company) {
      result = result.filter((job) => job.company === filters.company);
    }
    if (filters.location) {
      result = result.filter((job) => job.location === filters.location);
    }
    if (filters.jobDomain) {
      result = result.filter((job) => job.jobDomain === filters.jobDomain);
    }
    result = result.filter(
      (job) =>
        job.experienceYears >= filters.experienceYears[0] &&
        job.experienceYears <= filters.experienceYears[1]
    );

    // Apply sorting
    switch (sortBy) {
      case "recent":
        result.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        break;
      case "salary":
        result.sort(
          (a, b) =>
            parseInt(b.salary.split("-")[1]) - parseInt(a.salary.split("-")[1])
        );
        break;
      // 'recommended' is the default, no sorting needed
    }

    setFilteredJobs(result);
    setCurrentPage(1);

    // Show toast for filter application
    toast({
      title: "Filters Applied",
      description: `Showing ${result.length} jobs based on your filters.`,
    });
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Job Dashboard</h1>
      <Widget />
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters */}
        <div className="w-full lg:w-1/4 space-y-6">
          <div className="sticky top-4 space-y-6">
            <Input
              icon={faSearch}
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="mb-6"
            />
            <Filter
              icon={faLaptopHouse}
              label="Work Mode"
              options={[
                { value: "remote", label: "Remote" },
                { value: "onsite", label: "On-site" },
                { value: "hybrid", label: "Hybrid" },
              ]}
              onChange={(value) => handleFilterChange("workMode", value)}
              value={filters.workMode}
            />
            <Filter
              icon={faBuilding}
              label="Company"
              options={[...new Set(jobs.map((job) => job.company))].map(
                (company) => ({ value: company, label: company })
              )}
              onChange={(value) => handleFilterChange("company", value)}
              value={filters.company}
            />
            <Filter
              icon={faMapMarkerAlt}
              label="Location"
              options={[...new Set(jobs.map((job) => job.location))].map(
                (location) => ({ value: location, label: location })
              )}
              onChange={(value) => handleFilterChange("location", value)}
              value={filters.location}
            />
            <Filter
              icon={faBriefcase}
              label="Job Domain"
              options={[...new Set(jobs.map((job) => job.jobDomain))].map(
                (domain) => ({ value: domain, label: domain })
              )}
              onChange={(value) => handleFilterChange("jobDomain", value)}
              value={filters.jobDomain}
            />
            <div className="mb-6">
              <h2 className="text-sm font-semibold mb-2 flex items-center">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="w-3 h-3 mr-2"
                />
                Experience
              </h2>
              <Slider
                min={0}
                max={15}
                step={1}
                value={filters.experienceYears}
                onValueChange={(value) =>
                  handleFilterChange("experienceYears", value)
                }
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{filters.experienceYears[0]} Years</span>
                <span>{filters.experienceYears[1]}+ Years</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {filteredJobs.length} Jobs Found
            </h2>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="salary">Highest Salary</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="for-you">
            <TabsList>
              <TabsTrigger value="for-you">For You</TabsTrigger>
              <TabsTrigger value="search">Search Jobs</TabsTrigger>
            </TabsList>
            <TabsContent value="for-you">
              <div className="grid gap-6 md:grid-cols-2">
                <AnimatePresence>
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} isLoading={isLoading} />
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
            <TabsContent value="search">
              <div className="grid gap-6 md:grid-cols-2">
                <AnimatePresence>
                  {paginatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} isLoading={isLoading} />
                  ))}
                </AnimatePresence>
              </div>
            </TabsContent>
          </Tabs>

          {/* Pagination */}
          <div className="flex justify-center mt-8">
            <Button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="outline"
              size="sm"
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2 w-3 h-3" />
              Previous
            </Button>
            <span className="mx-4 flex items-center text-sm">
              Page {currentPage} of{" "}
              {Math.ceil(filteredJobs.length / jobsPerPage)}
            </span>
            <Button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(
                    prev + 1,
                    Math.ceil(filteredJobs.length / jobsPerPage)
                  )
                )
              }
              disabled={
                currentPage === Math.ceil(filteredJobs.length / jobsPerPage)
              }
              variant="outline"
              size="sm"
            >
              Next
              <FontAwesomeIcon icon={faChevronRight} className="ml-2 w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
