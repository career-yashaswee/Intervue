"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Scatter,
  ScatterChart,
  Treemap,
  ComposedChart,
  Area,
} from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Mock data for charts
const jobDemandData = [
  { month: "Jan", demand: 1000 },
  { month: "Feb", demand: 1200 },
  { month: "Mar", demand: 1100 },
  { month: "Apr", demand: 1300 },
  { month: "May", demand: 1400 },
];

const salaryData = [
  { range: "0-50k", count: 100 },
  { range: "50k-100k", count: 200 },
  { range: "100k-150k", count: 150 },
  { range: "150k+", count: 50 },
];

const skillsData = [
  { name: "JavaScript", required: 80, average: 70 },
  { name: "React", required: 70, average: 60 },
  { name: "Node.js", required: 60, average: 50 },
  { name: "Python", required: 50, average: 55 },
  { name: "SQL", required: 65, average: 60 },
];

const topCompaniesData = [
  { name: "Company A", value: 400 },
  { name: "Company B", value: 300 },
  { name: "Company C", value: 200 },
  { name: "Company D", value: 100 },
];

const jobLocationsData = [
  { name: "New York", lat: 40.7128, lng: -74.006, jobs: 500 },
  { name: "San Francisco", lat: 37.7749, lng: -122.4194, jobs: 400 },
  { name: "Seattle", lat: 47.6062, lng: -122.3321, jobs: 300 },
];

const experienceLevelData = [
  { name: "Entry", fullTime: 200, partTime: 100, contract: 50 },
  { name: "Mid", fullTime: 300, partTime: 150, contract: 100 },
  { name: "Senior", fullTime: 250, partTime: 50, contract: 150 },
];

const industryTrendsData = [
  { name: "IT", value: 400 },
  { name: "Finance", value: 300 },
  { name: "Healthcare", value: 200 },
  { name: "Education", value: 100 },
];

const contractTypesData = [
  { name: "Full-time", value: 60 },
  { name: "Part-time", value: 20 },
  { name: "Contract", value: 15 },
  { name: "Freelance", value: 5 },
];

const skillPremiumData = [
  { skill: "AI/ML", premium: 20, demand: 80 },
  { skill: "Cloud", premium: 15, demand: 70 },
  { skill: "DevOps", premium: 18, demand: 65 },
  { skill: "Blockchain", premium: 25, demand: 40 },
  { skill: "Cybersecurity", premium: 22, demand: 60 },
];

const growthForecastData = [
  { year: 2023, growth: 5 },
  { year: 2024, growth: 7 },
  { year: 2025, growth: 10 },
  { year: 2026, growth: 12 },
  { year: 2027, growth: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function MarketAnalytics() {
  const [jobRole, setJobRole] = useState("Software Engineer");
  const [industry, setIndustry] = useState("Technology");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto p-6 space-y-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen"
    >
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800">
          Market Analytics Dashboard
        </h1>
        <div className="flex space-x-4">
          <Select onValueChange={setJobRole} defaultValue={jobRole}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select job role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Software Engineer">
                Software Engineer
              </SelectItem>
              <SelectItem value="Data Scientist">Data Scientist</SelectItem>
              <SelectItem value="Product Manager">Product Manager</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setIndustry} defaultValue={industry}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Technology">Technology</SelectItem>
              <SelectItem value="Finance">Finance</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
            </SelectContent>
          </Select>
          <Button>Apply Filters</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>
              Job Demand Trends for {jobRole} in {industry}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={jobDemandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="demand" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Salary Distribution</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Required Skills vs Candidate Skills</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="required" fill="#8884d8" />
                <Bar dataKey="average" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Hiring Companies</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topCompaniesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {topCompaniesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Job Locations</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <MapContainer
              center={[39.8283, -98.5795]}
              zoom={4}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {jobLocationsData.map((location, index) => (
                <Marker key={index} position={[location.lat, location.lng]}>
                  <Popup>
                    {location.name}: {location.jobs} jobs
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Experience Level Demand</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={experienceLevelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="fullTime" stackId="a" fill="#8884d8" />
                <Bar dataKey="partTime" stackId="a" fill="#82ca9d" />
                <Bar dataKey="contract" stackId="a" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Industry Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={industryTrendsData}
                dataKey="value"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
              >
                <Tooltip />
              </Treemap>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contract Types</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={contractTypesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {contractTypesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Skill Premium Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart>
                <CartesianGrid />
                <XAxis type="number" dataKey="demand" name="Demand" unit="%" />
                <YAxis
                  type="number"
                  dataKey="premium"
                  name="Salary Premium"
                  unit="%"
                />
                <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                <Scatter name="Skills" data={skillPremiumData} fill="#8884d8">
                  {skillPremiumData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Growth Forecast</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={growthForecastData}>
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid stroke="#f5f5f5" />
                <Area
                  type="monotone"
                  dataKey="growth"
                  fill="#8884d8"
                  stroke="#8884d8"
                />
                <Line type="monotone" dataKey="growth" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
