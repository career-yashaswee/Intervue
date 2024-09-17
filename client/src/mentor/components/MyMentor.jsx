"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Star,
  MapPin,
  Linkedin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// Header Component
const Header = ({ imageUrl }) => (
  <motion.div
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="h-40 bg-gradient-to-r from-purple-400 to-blue-500 relative"
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="absolute bottom-0 left-8 transform translate-y-1/2"
    >
      <Avatar className="w-32 h-32 border-4 border-white">
        <img
          src={imageUrl}
          alt="Mentor"
          className="w-full h-full object-cover"
        />
      </Avatar>
    </motion.div>
  </motion.div>
);

// Profile Info Component
const ProfileInfo = ({ name, title, experience, companies, university }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="mt-20 px-8"
  >
    <h1 className="text-2xl font-bold">{name}</h1>
    <p className="text-gray-600">{title}</p>
    <p className="text-sm text-gray-500 mt-2">
      {experience} years of experience
    </p>
    <div className="mt-4 space-y-2">
      {companies.map((company, index) => (
        <div key={index} className="flex items-center space-x-2">
          <img
            src={`/placeholder.svg?height=20&width=20`}
            alt={company}
            className="w-5 h-5"
          />
          <span>{company}</span>
        </div>
      ))}
      <div className="flex items-center space-x-2">
        <img
          src={`/placeholder.svg?height=20&width=20`}
          alt={university}
          className="w-5 h-5"
        />
        <span>{university}</span>
      </div>
    </div>
  </motion.div>
);

// Actions Component
const Actions = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    className="mt-6 px-8 flex flex-wrap gap-4"
  >
    <Button variant="outline" className="flex items-center space-x-2">
      <Heart className="w-4 h-4" />
      <span>Ask a Question</span>
    </Button>
    <Button variant="secondary">View Pricing</Button>
  </motion.div>
);

// Stats Component
const Stats = ({ rating, reviews, mentoringMins }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.6 }}
    className="mt-6 px-8 flex items-center space-x-4"
  >
    <div className="flex items-center">
      <Star className="w-5 h-5 text-yellow-400" />
      <span className="ml-1 font-bold">{rating}</span>
      <span className="ml-1 text-gray-500">({reviews} Reviews)</span>
    </div>
    <Badge variant="secondary">{mentoringMins}+ Mentoring Mins</Badge>
  </motion.div>
);

// Recent Review Component
const RecentReview = ({ review, reviewer, date }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.8 }}
    className="mt-8 px-8"
  >
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold">Recent Review</h2>
      <a href="#" className="text-blue-500 hover:underline">
        View All Reviews(4)
      </a>
    </div>
    <Card className="mt-4 p-4">
      <p className="text-gray-600">{review}</p>
      <div className="mt-4 flex items-center space-x-2">
        <Avatar>
          <span className="font-semibold text-lg">{reviewer[0]}</span>
        </Avatar>
        <div>
          <p className="font-semibold">{reviewer}</p>
          <p className="text-sm text-gray-500">{date}</p>
        </div>
      </div>
    </Card>
  </motion.div>
);

// About Component
const About = ({ about }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1 }}
    className="mt-8 px-8"
  >
    <h2 className="text-xl font-semibold">About</h2>
    <p className="mt-2 text-gray-600">{about}</p>
  </motion.div>
);

// Career Journey Component
const CareerJourney = ({ experiences }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.2 }}
    className="mt-8 px-8"
  >
    <h2 className="text-xl font-semibold mb-4">Career Journey</h2>
    {experiences.map((exp, index) => (
      <div key={index} className="mb-4 flex">
        <div className="w-1/3 pr-4 text-right">
          <p className="font-semibold">{exp.period}</p>
          <p className="text-sm text-gray-500">{exp.duration}</p>
        </div>
        <div className="w-2/3">
          <p className="font-semibold">{exp.title}</p>
          <p className="text-gray-600">{exp.company}</p>
        </div>
      </div>
    ))}
    <Button variant="outline" className="w-full mt-4">
      Show All 11 Experiences <ChevronDown className="ml-2 h-4 w-4" />
    </Button>
  </motion.div>
);

// Technical Skills Component
const TechnicalSkills = ({ skills, tools }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.4 }}
    className="mt-8 px-8"
  >
    <h2 className="text-xl font-semibold mb-4">Technical Skills</h2>
    <div className="flex flex-wrap gap-2 mb-4">
      {skills.map((skill, index) => (
        <Badge key={index} variant="secondary">
          {skill}
        </Badge>
      ))}
    </div>
    <h3 className="text-lg font-semibold mt-4 mb-2">Tools</h3>
    <div className="flex flex-wrap gap-2">
      {tools.map((tool, index) => (
        <Badge key={index} variant="outline">
          {tool}
        </Badge>
      ))}
    </div>
  </motion.div>
);

// Book Session Component
const BookSession = ({ mentor, availableDates, availableSlots }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.6 }}
    className="mt-8 px-8 pb-8"
  >
    <Card className="p-6">
      <div className="flex items-center mb-4">
        <Avatar className="w-12 h-12 mr-4">
          <img
            src={mentor.imageUrl}
            alt={mentor.name}
            className="w-full h-full object-cover"
          />
        </Avatar>
        <div>
          <h3 className="font-semibold">{mentor.name}</h3>
          <p className="text-sm text-gray-500">{mentor.title}</p>
        </div>
      </div>
      <h4 className="font-semibold mb-2">
        Book a Free Trial: To Plan Your Mentorship with {mentor.name}
      </h4>
      <p className="text-sm text-gray-600 mb-4">
        30 mins 1:1 call with the mentor
      </p>
      <div className="mb-4">
        <h5 className="font-semibold mb-2">Available Dates</h5>
        <div className="flex justify-between">
          {availableDates.map((date, index) => (
            <div key={index} className="text-center">
              <p className="text-sm">{date.day}</p>
              <p className="font-semibold">{date.date}</p>
              <p className="text-xs text-gray-500">{date.slots} Slots</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h5 className="font-semibold mb-2">Available Slots</h5>
        <div className="flex justify-between">
          {availableSlots.map((slot, index) => (
            <Button
              key={index}
              variant={slot.recommended ? "default" : "outline"}
              size="sm"
            >
              {slot.time}
            </Button>
          ))}
        </div>
      </div>
      <Button className="w-full">Book a Free Trial for Oct 6, 1:45 PM</Button>
    </Card>
  </motion.div>
);

// Footer Component
const Footer = ({ location, languages }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 1.8 }}
    className="mt-8 px-8 pb-8"
  >
    <h2 className="text-xl font-semibold">Find Me Here</h2>
    <div className="mt-2 flex items-center space-x-2">
      <MapPin className="w-5 h-5 text-gray-500" />
      <span>{location}</span>
    </div>
    <div className="mt-2">
      <Linkedin className="w-5 h-5 text-blue-500" />
    </div>
    <h2 className="mt-4 text-xl font-semibold">Languages That I Speak</h2>
    <div className="mt-2 flex space-x-2">
      {languages.map((lang, index) => (
        <Badge key={index} variant="outline">
          {lang}
        </Badge>
      ))}
    </div>
  </motion.div>
);

// Skeleton Loading Component
const SkeletonLoading = () => (
  <div className="animate-pulse">
    <div className="h-40 bg-gray-300" />
    <div className="mt-20 px-8">
      <Skeleton className="h-8 w-1/2 mb-2" />
      <Skeleton className="h-4 w-1/3 mb-2" />
      <Skeleton className="h-4 w-1/4 mb-4" />
      {[1, 2, 3].map((_, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <Skeleton className="w-5 h-5 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
    <div className="mt-6 px-8 flex space-x-4">
      <Skeleton className="h-10 w-1/3" />
      <Skeleton className="h-10 w-1/3" />
    </div>
    <div className="mt-8 px-8">
      <Skeleton className="h-6 w-1/4 mb-4" />
      <Skeleton className="h-24 w-full mb-4" />
      <Skeleton className="h-6 w-1/4 mb-4" />
      <Skeleton className="h-24 w-full mb-4" />
      <Skeleton className="h-6 w-1/4 mb-4" />
      <Skeleton className="h-24 w-full" />
    </div>
  </div>
);

// Main Component
export default function MyMentor() {
  const [loading, setLoading] = useState(true);
  const [mentorData, setMentorData] = useState(null);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => {
      setMentorData({
        name: "Subhahu Jain",
        title: "SDE-2",
        experience: "8+",
        companies: ["Amazon", "Salesforce"],
        university: "Texas A&M University",
        imageUrl: "/placeholder.svg?height=128&width=128",
        rating: "5.0",
        reviews: "4",
        mentoringMins: "1301+",
        recentReview: {
          text: "Amazing session. Mentor had great clarity about the intricacies of the situation.",
          reviewer: "Shubham",
          date: "4 months ago",
        },
        about:
          "Here to help you with everything Study Abroad and Software, Machine Learning Career Paths Machine Learning Engineer @ Apple | Ex-ML Intern at AMD | Ex-Software Intern @ LinkedIn | MS CS Student @ TAMU | Ex- Senior Engineer @ Western Digital",
        location: "California, United States",
        languages: ["Hindi", "English"],
        experiences: [
          {
            period: "Present April, 2022",
            duration: "2Y, 5M",
            title: "Software Development Engineer",
            company: "Amazon",
          },
          {
            period: "Present October, 2023",
            duration: "11M",
            title: "SDE-2",
            company: "Salesforce",
          },
          {
            period: "March, 2022 August, 2021",
            duration: "8M",
            title: "R&D Developer 1",
            company: "Hyland",
          },
          {
            period: "August, 2021 April, 2021",
            duration: "5M",
            title: "Software Developer Intern",
            company: "Remedo Healthcare",
          },
        ],
        skills: [
          "LLD",
          "OOP",
          "Java",
          "SQL",
          "C++",
          "JavaScript",
          "Git",
          "HTML",
          "DSA",
          "APIs",
          "Servers",
          "System Design",
          "MySQL",
          "REST",
        ],
        tools: ["Git", "Visual Studio Code", "GitHub", "Postman"],
        availableDates: [
          { day: "SUN", date: "6 Oct", slots: 3 },
          { day: "SAT", date: "12 Oct", slots: 3 },
          { day: "SUN", date: "13 Oct", slots: 5 },
          { day: "SAT", date: "19 Oct", slots: 5 },
          { day: "SUN", date: "20 Oct", slots: 5 },
          { day: "SAT", date: "26 Oct", slots: 5 },
        ],
        availableSlots: [
          { time: "01:45 PM", recommended: true },
          { time: "02:00 PM", recommended: false },
          { time: "02:15 PM", recommended: false },
        ],
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return <SkeletonLoading />;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <Header imageUrl={mentorData.imageUrl} />
      <ProfileInfo
        name={mentorData.name}
        title={mentorData.title}
        experience={mentorData.experience}
        companies={mentorData.companies}
        university={mentorData.university}
      />
      <Actions />
      <Stats
        rating={mentorData.rating}
        reviews={mentorData.reviews}
        mentoringMins={mentorData.mentoringMins}
      />
      <RecentReview
        review={mentorData.recentReview.text}
        reviewer={mentorData.recentReview.reviewer}
        date={mentorData.recentReview.date}
      />
      <About about={mentorData.about} />
      <CareerJourney experiences={mentorData.experiences} />
      <TechnicalSkills skills={mentorData.skills} tools={mentorData.tools} />
      <BookSession
        mentor={mentorData}
        availableDates={mentorData.availableDates}
        availableSlots={mentorData.availableSlots}
      />
      <Footer location={mentorData.location} languages={mentorData.languages} />
    </div>
  );
}
