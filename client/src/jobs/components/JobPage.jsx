"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Star,
  Bookmark,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  ThumbsUp,
  ThumbsDown,
  Briefcase,
  Coffee,
  DollarSign,
  Users,
  Clock,
  Award,
  TrendingUp,
  Calendar,
  Building,
  ChevronRight,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CircularProgress = ({ value, size = 80, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="text-muted-foreground"
        strokeWidth={strokeWidth}
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <circle
        className="text-primary"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        stroke="currentColor"
        fill="transparent"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        dy=".3em"
        textAnchor="middle"
        className="font-bold text-lg fill-current"
      >
        {value}%
      </text>
    </svg>
  );
};

const headcountData = [
  { year: 2018, employees: 1000 },
  { year: 2019, employees: 1500 },
  { year: 2020, employees: 2200 },
  { year: 2021, employees: 3000 },
  { year: 2022, employees: 4500 },
];

export default function JobPage() {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleEasyApply = () => {
    setShowConfetti(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const MotionCard = motion(Card);

  // Simulate loading
  setTimeout(() => setIsLoading(false), 2000);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 space-y-8">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img
              src="/placeholder.svg"
              alt="Verite Logo"
              width={40}
              height={40}
            />
            <h1 className="text-2xl font-bold">Verite Self Development</h1>
          </div>
          <div className="flex space-x-2">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon">
              <ArrowRight className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <span className="sr-only">More options</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="5" r="1" />
                    <circle cx="12" cy="19" r="1" />
                  </svg>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onSelect={() =>
                    navigator.clipboard.writeText(window.location.href)
                  }
                >
                  Copy Job Link
                </DropdownMenuItem>
                <DropdownMenuItem>Report This Job</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-4">
                Co-Founder with Investment
              </h2>
              <p className="text-muted-foreground mb-2">
                Mumbai, Maharashtra, India • Reposted 16 hours ago • 13
                applicants
              </p>
              <div className="flex space-x-2 mb-4">
                <Badge variant="secondary">On-site</Badge>
                <Badge variant="secondary">Full-time</Badge>
              </div>
              <p className="mb-2">
                <strong>Skills:</strong> Leadership, Team Management, +4 more
              </p>
              <p className="mb-4">
                Applicant review time is typically 1 day{" "}
                <a href="#" className="text-primary hover:underline">
                  Learn more
                </a>
              </p>
              <p>
                See how you compare to 13 applicants.{" "}
                <a href="#" className="text-primary hover:underline">
                  Try Premium for ₹0
                </a>
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-2xl font-semibold mb-4">About the Job</h3>
              <Card>
                <CardContent className="p-6">
                  <p className="mb-4">
                    We are seeking a dynamic and visionary Co-Founder to join
                    our innovative startup. The ideal candidate will bring not
                    only their expertise and leadership skills but also a
                    significant investment to fuel our growth.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        View Full Job Description
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Full Job Description</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-4">
                        <h4 className="text-lg font-semibold">About Us</h4>
                        <p>
                          Verite Self Development is a cutting-edge startup at
                          the intersection of technology and personal growth.
                          We're revolutionizing the way people approach
                          self-improvement through innovative AI-driven
                          solutions.
                        </p>
                        <h4 className="text-lg font-semibold">The Role</h4>
                        <p>
                          As a Co-Founder, you will play a crucial role in
                          shaping the company's strategy, driving product
                          development, and building a high-performing team.
                          You'll work closely with the founding team to set and
                          achieve ambitious goals, leveraging your network and
                          experience to accelerate our market penetration.
                        </p>
                        <h4 className="text-lg font-semibold">
                          Responsibilities
                        </h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Contribute to the overall business strategy and
                            vision
                          </li>
                          <li>Lead product development initiatives</li>
                          <li>Build and manage cross-functional teams</li>
                          <li>
                            Drive fundraising efforts and manage investor
                            relations
                          </li>
                          <li>Identify and pursue strategic partnerships</li>
                        </ul>
                        <h4 className="text-lg font-semibold">
                          Qualifications
                        </h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>
                            Proven track record in startup leadership or
                            entrepreneurship
                          </li>
                          <li>
                            Strong background in technology, preferably in AI or
                            machine learning
                          </li>
                          <li>Excellent communication and networking skills</li>
                          <li>
                            Ability to invest significantly in the company
                          </li>
                          <li>Passion for personal development and growth</li>
                        </ul>
                        <h4 className="text-lg font-semibold">What We Offer</h4>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Equity stake in a high-potential startup</li>
                          <li>
                            Opportunity to shape the future of personal
                            development technology
                          </li>
                          <li>Flexible work environment</li>
                          <li>Competitive compensation package</li>
                        </ul>
                        <p className="font-semibold">
                          If you're ready to take on a challenging and rewarding
                          role that could change the landscape of personal
                          development, we want to hear from you!
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Job Match Score</h3>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xl font-semibold">Overall Match</h4>
                    <CircularProgress value={75} />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Location</span>
                        <span className="text-green-500">95% Match</span>
                      </div>
                      <Progress value={95} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Key Skills</span>
                        <span className="text-yellow-500">70% Match</span>
                      </div>
                      <Progress value={70} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Experience</span>
                        <span className="text-red-500">60% Match</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Skill Gap Analysis
              </h3>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-6">
                  <p className="mb-4">
                    Based on the job requirements and your profile, we've
                    identified some areas for improvement:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 mb-4">
                    <li>Advanced leadership techniques</li>
                    <li>Startup financial management</li>
                    <li>AI and machine learning fundamentals</li>
                  </ul>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>View Full Analysis</Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Skill Gap Analysis</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4 space-y-6">
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Skills You're Missing
                          </h4>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Advanced leadership techniques</li>
                            <li>Startup financial management</li>
                            <li>AI and machine learning fundamentals</li>
                            <li>Venture capital networking</li>
                            <li>Product development in tech startups</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Recommended Courses
                          </h4>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Leadership Mastery for Startup Founders</li>
                            <li>Financial Management for Tech Entrepreneurs</li>
                            <li>Introduction to AI and Machine Learning</li>
                            <li>Networking Strategies for Startup Funding</li>
                            <li>Agile Product Development for Startups</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Industry-Specific Certifications
                          </h4>
                          <ul className="list-disc pl-5 space-y-2">
                            <li>Certified Startup CFO</li>
                            <li>AI Product Manager Certification</li>
                            <li>Agile Scrum Master for Tech Startups</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">
                            Popular Skills in This Industry
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            <Badge>Strategic Planning</Badge>
                            <Badge>Venture Capital</Badge>
                            <Badge>Team Leadership</Badge>
                            <Badge>Product Strategy</Badge>
                            <Badge>Growth Hacking</Badge>
                            <Badge>Data Analytics</Badge>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </MotionCard>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Company Overview</h3>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CardHeader>
                  <CardTitle>Optum Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <CircularProgress value={70} size={100} />
                      <div className="ml-4">
                        <p className="text-2xl font-bold">3.5</p>
                        <p className="text-sm text-muted-foreground">
                          Overall Rating
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">Based on</p>
                      <p className="text-2xl font-bold">3,596</p>
                      <p className="text-sm text-muted-foreground">
                        Employee Reviews
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="font-semibold">Recommend to a friend</p>
                      <Progress value={64} className="h-2 mt-1" />
                      <p className="text-sm text-muted-foreground">64%</p>
                    </div>
                    <div>
                      <p className="font-semibold">Approve of CEO</p>
                      <Progress value={69} className="h-2 mt-1" />
                      <p className="text-sm text-muted-foreground">69%</p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-6">
                    {[
                      {
                        name: "Career opportunities",
                        rating: 3.4,
                        icon: Briefcase,
                      },
                      {
                        name: "Comp and Benefits",
                        rating: 3.4,
                        icon: DollarSign,
                      },
                      { name: "Culture and values", rating: 3.5, icon: Users },
                      { name: "Senior management", rating: 3.1, icon: Users },
                      { name: "Work/Life Balance", rating: 3.7, icon: Coffee },
                    ].map((category) => (
                      <div
                        key={category.name}
                        className="flex justify-between items-center"
                      >
                        <span className="flex items-center">
                          <category.icon className="h-4 w-4 mr-2" />
                          {category.name}
                        </span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= category.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Company Growth</h4>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={headcountData}>
                          <XAxis dataKey="year" />
                          <YAxis />
                          <Tooltip />
                          <Line
                            type="monotone"
                            dataKey="employees"
                            stroke="#8884d8"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">Market Valuation</p>
                        <p className="text-2xl font-bold">$5.2B</p>
                      </div>
                      <div>
                        <p className="font-semibold">Founded</p>
                        <p className="text-2xl font-bold">2015</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Pros and Cons</h3>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <ThumbsUp className="h-5 w-5 mr-2 text-green-500" />
                        Pros
                      </h4>
                      <ul className="space-y-2">
                        <li>"Work Life Balance is good" (in 149 reviews)</li>
                        <li>"Good pay and team mates" (in 128 reviews)</li>
                        <li>"benefits are good not amazing" (in 70 reviews)</li>
                        <li>"management is good" (in 57 reviews)</li>
                        <li>
                          "Good culture and great support to upskill and
                          overcome barriers" (in 70 reviews)
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 flex items-center">
                        <ThumbsDown className="h-5 w-5 mr-2 text-red-500" />
                        Cons
                      </h4>
                      <ul className="space-y-2">
                        <li>
                          "Work life balance is difficult but manageable" (in
                          149 reviews)
                        </li>
                        <li>"Pay is low for the workload." (in 128 reviews)</li>
                        <li>
                          "The benefits are expensive and extremely basic for a
                          healthcare company." (in 70 reviews)
                        </li>
                        <li>"Bad management" (in 57 reviews)</li>
                        <li>"Too much corporate culture.." (in 70 reviews)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h3 className="text-2xl font-semibold mb-4">Company Benefits</h3>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center">
                      <Clock className="h-6 w-6 mr-2 text-primary" />
                      <span>Flexible hours</span>
                    </div>
                    <div className="flex items-center">
                      <Coffee className="h-6 w-6 mr-2 text-primary" />
                      <span>Work from home</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-6 w-6 mr-2 text-primary" />
                      <span>Professional development</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-6 w-6 mr-2 text-primary" />
                      <span>Team building events</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="h-6 w-6 mr-2 text-primary" />
                      <span>Performance bonuses</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="h-6 w-6 mr-2 text-primary" />
                      <span>Career advancement</span>
                    </div>
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <h5 className="font-semibold mb-2">Employee Review</h5>
                    <p className="italic">
                      "The company offers a great work-life balance and numerous
                      opportunities for professional growth. While the base
                      salary might not be the highest in the industry, the
                      additional benefits and supportive work environment make
                      up for it."
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      - Anonymous Employee, 2 years at company
                    </p>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <h3 className="text-2xl font-semibold mb-4">
                Frequently Asked Questions
              </h3>
              <MotionCard
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">
                        What is the interview process like?
                      </h4>
                      <p>
                        The interview process typically involves an initial
                        phone screening, followed by 2-3 rounds of in-person or
                        video interviews with team members and leadership.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        What is the company culture like?
                      </h4>
                      <p>
                        Employees describe the culture as fast-paced,
                        innovative, and collaborative, with a strong emphasis on
                        personal growth and work-life balance.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">
                        Are there opportunities for advancement?
                      </h4>
                      <p>
                        Yes, the company is known for promoting from within and
                        providing clear career paths for employees who
                        demonstrate strong performance and leadership potential.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </MotionCard>
            </motion.section>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button className="w-full" size="lg" onClick={handleEasyApply}>
                Easy Apply
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Button
                className="w-full"
                variant="outline"
                size="lg"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                <Bookmark
                  className={`mr-2 h-4 w-4 ${
                    isBookmarked ? "fill-current" : ""
                  }`}
                />
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button className="w-full" variant="outline" size="lg">
                <MessageSquare className="mr-2 h-4 w-4" />
                Ask Jobie AI
              </Button>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
