import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  BarChartIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  LightbulbIcon,
  TargetIcon,
  CheckCircleIcon,
  XCircleIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "lucide-react";

// type SWOTItem = {
//   id: number
//   title: string
//   description: string
//   effect: string
//   impact: 'high' | 'medium' | 'low'
//   status: 'active' | 'monitoring' | 'resolved'
//   meaning: string
//   use: string
// }

// type SWOTData = {
//   strengths: SWOTItem[]
//   weaknesses: SWOTItem[]
//   opportunities: SWOTItem[]
//   threats: SWOTItem[]
// }

// type Goal = {
//   statement: string
//   description: string
//   timeframe: string
//   progress: number
//   milestones: { title: string; completed: boolean }[]
// }

const mockData = {
  strengths: [
    {
      id: 1,
      title: "Industry-leading Brand Recognition",
      description: "Top-tier brand recall and customer loyalty",
      effect: "Drives premium pricing and customer retention",
      impact: "high",
      status: "active",
      meaning: "Strong market position",
      use: "Leverage for marketing and partnerships",
    },
    {
      id: 2,
      title: "Cutting-edge R&D Capabilities",
      description: "State-of-the-art research facilities and talent",
      effect: "Enables rapid product innovation and market leadership",
      impact: "high",
      status: "active",
      meaning: "Technological advantage",
      use: "Develop unique products and features",
    },
    {
      id: 3,
      title: "Robust Global Supply Chain",
      description: "Efficient and resilient international logistics network",
      effect: "Ensures consistent product availability and cost efficiency",
      impact: "medium",
      status: "monitoring",
      meaning: "Operational excellence",
      use: "Optimize inventory and reduce costs",
    },
  ],
  weaknesses: [
    {
      id: 1,
      title: "High Manufacturing Costs",
      description: "Above-industry-average production expenses",
      effect: "Reduces profit margins and pricing flexibility",
      impact: "high",
      status: "active",
      meaning: "Cost disadvantage",
      use: "Focus on process optimization and automation",
    },
    {
      id: 2,
      title: "Limited Presence in Emerging Markets",
      description: "Underdeveloped distribution in high-growth regions",
      effect: "Missed opportunities for market expansion",
      impact: "medium",
      status: "active",
      meaning: "Growth limitation",
      use: "Develop targeted market entry strategies",
    },
    {
      id: 3,
      title: "Aging Legacy IT Systems",
      description: "Outdated core technology infrastructure",
      effect: "Hinders digital transformation and agility",
      impact: "medium",
      status: "monitoring",
      meaning: "Technical debt",
      use: "Prioritize IT modernization initiatives",
    },
  ],
  opportunities: [
    {
      id: 1,
      title: "Rapid E-commerce Growth",
      description: "Accelerating shift to online shopping",
      effect: "Expands digital sales channels and reach",
      impact: "high",
      status: "active",
      meaning: "Digital transformation",
      use: "Invest in online platforms and digital marketing",
    },
    {
      id: 2,
      title: "Emerging Green Technologies",
      description: "Rising demand for sustainable products",
      effect: "Opens new eco-friendly product lines",
      impact: "medium",
      status: "monitoring",
      meaning: "Sustainability trend",
      use: "Develop and market green innovations",
    },
    {
      id: 3,
      title: "Strategic Acquisitions",
      description: "Potential for vertical integration through M&A",
      effect: "Strengthens market position and capabilities",
      impact: "high",
      status: "active",
      meaning: "Growth strategy",
      use: "Identify and pursue synergistic acquisitions",
    },
  ],
  threats: [
    {
      id: 1,
      title: "Intensifying Global Competition",
      description: "New entrants with disruptive business models",
      effect: "Pressures market share and profit margins",
      impact: "high",
      status: "active",
      meaning: "Competitive challenge",
      use: "Focus on differentiation and customer loyalty",
    },
    {
      id: 2,
      title: "Evolving Regulatory Landscape",
      description: "Stricter environmental and data privacy laws",
      effect: "Increases compliance costs and operational complexity",
      impact: "medium",
      status: "monitoring",
      meaning: "Regulatory risk",
      use: "Proactively adapt policies and practices",
    },
    {
      id: 3,
      title: "Economic Uncertainties",
      description: "Potential recession and market volatility",
      effect: "May reduce consumer spending and investment",
      impact: "medium",
      status: "monitoring",
      meaning: "Financial risk",
      use: "Develop contingency plans and diversify revenue streams",
    },
  ],
};

const mockGoal = {
  statement: "Achieve 30% Market Share in Emerging Markets",
  description:
    "Expand our presence in high-growth regions through strategic partnerships, localized product offerings, and innovative go-to-market strategies.",
  timeframe: "By Q4 2025",
  progress: 35,
  milestones: [
    {
      title: "Establish regional headquarters in 3 key markets",
      completed: true,
    },
    { title: "Launch localized e-commerce platforms", completed: true },
    {
      title: "Develop partnerships with 10 major local retailers",
      completed: false,
    },
    { title: "Achieve 15% market share", completed: false },
    { title: "Introduce 5 market-specific product variants", completed: false },
  ],
};

const categoryColors = {
  strengths: "bg-emerald-50 border-emerald-200 text-emerald-700",
  weaknesses: "bg-rose-50 border-rose-200 text-rose-700",
  opportunities: "bg-sky-50 border-sky-200 text-sky-700",
  threats: "bg-amber-50 border-amber-200 text-amber-700",
};

const categoryIcons = {
  strengths: <BarChartIcon className="w-5 h-5" />,
  weaknesses: <AlertTriangleIcon className="w-5 h-5" />,
  opportunities: <LightbulbIcon className="w-5 h-5" />,
  threats: <TrendingUpIcon className="w-5 h-5" />,
};

const impactColors = {
  high: "bg-rose-100 text-rose-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800",
};

const statusIcons = {
  active: <CheckCircleIcon className="w-4 h-4 text-green-500" />,
  monitoring: <AlertCircleIcon className="w-4 h-4 text-yellow-500" />,
  resolved: <XCircleIcon className="w-4 h-4 text-gray-500" />,
};

export default function SWOTAnalysis() {
  const [data, setData] = useState(null);
  const [goal, setGoal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData(mockData);
      setGoal(mockGoal);
      setLoading(false);
    }, 2000);
  }, []);

  const toggleItemExpansion = (category, itemId) => {
    setExpandedItems((prev) => ({
      ...prev,
      [category]: prev[category]?.includes(itemId)
        ? prev[category].filter((id) => id !== itemId)
        : [...(prev[category] || []), itemId],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        <h1 className="text-4xl font-bold text-center text-gray-900">
          Strategic SWOT Analysis
        </h1>

        {/* Goal Card */}
        <Card className="bg-white shadow-lg border-t-4 border-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-blue-700">
              Strategic Goal
            </CardTitle>
            <TargetIcon className="w-8 h-8 text-blue-500" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-800">
                  {goal?.statement}
                </h3>
                <p className="text-gray-600 mt-2">{goal?.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm font-medium text-gray-500">
                    {goal?.timeframe}
                  </span>
                  <span className="text-sm font-medium text-blue-600">
                    {goal?.progress}% Complete
                  </span>
                </div>
                <Progress value={goal?.progress} className="mt-2" />
                <Separator className="my-4" />
                <h4 className="font-semibold text-gray-700 mb-2">
                  Key Milestones
                </h4>
                <ul className="space-y-2">
                  {goal?.milestones.map((milestone, index) => (
                    <li key={index} className="flex items-center">
                      <span
                        className={`mr-2 ${
                          milestone.completed
                            ? "text-green-500"
                            : "text-gray-400"
                        }`}
                      >
                        {milestone.completed ? (
                          <CheckCircleIcon className="w-5 h-5" />
                        ) : (
                          <AlertCircleIcon className="w-5 h-5" />
                        )}
                      </span>
                      <span
                        className={`text-sm ${
                          milestone.completed
                            ? "text-gray-700"
                            : "text-gray-500"
                        }`}
                      >
                        {milestone.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </CardContent>
        </Card>

        {/* SWOT Matrix */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {(loading ? Array(4).fill("") : Object.entries(data || {})).map(
            ([category, items], index) => (
              <motion.div key={category || index} variants={itemVariants}>
                <Card
                  className={`overflow-hidden ${
                    loading ? "" : categoryColors[category]
                  }`}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center">
                      {loading ? (
                        <Skeleton className="h-8 w-32" />
                      ) : (
                        <>
                          {categoryIcons[category]}
                          <span className="ml-2">
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </span>
                        </>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <ul className="space-y-4">
                        {(loading ? Array(3).fill("") : items).map(
                          (item, itemIndex) => (
                            <AnimatePresence key={itemIndex}>
                              <motion.li
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                              >
                                {loading ? (
                                  <Skeleton className="h-24 w-full" />
                                ) : (
                                  <Card className="bg-white">
                                    <CardContent className="p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <span className="font-medium text-gray-800">
                                          #{item.id} {item.title}
                                        </span>
                                        {statusIcons[item.status]}
                                      </div>
                                      <p className="text-sm text-gray-600 mb-2">
                                        {item.description}
                                      </p>
                                      <div className="flex items-center space-x-2 mb-2">
                                        <Badge
                                          variant="secondary"
                                          className={impactColors[item.impact]}
                                        >
                                          {item.impact} impact
                                        </Badge>
                                        <Badge variant="outline">
                                          {item.status}
                                        </Badge>
                                      </div>
                                      <motion.button
                                        className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none flex items-center"
                                        onClick={() =>
                                          toggleItemExpansion(category, item.id)
                                        }
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                      >
                                        {expandedItems[category]?.includes(
                                          item.id
                                        ) ? (
                                          <>
                                            Less details{" "}
                                            <ChevronUpIcon className="w-4 h-4 ml-1" />
                                          </>
                                        ) : (
                                          <>
                                            More details{" "}
                                            <ChevronDownIcon className="w-4 h-4 ml-1" />
                                          </>
                                        )}
                                      </motion.button>
                                      <AnimatePresence>
                                        {expandedItems[category]?.includes(
                                          item.id
                                        ) && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                              opacity: 1,
                                              height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                          >
                                            <Separator className="my-2" />
                                            <div className="space-y-2 text-sm text-gray-600">
                                              <p>
                                                <strong>Effect:</strong>{" "}
                                                {item.effect}
                                              </p>
                                              <p>
                                                <strong>Meaning:</strong>{" "}
                                                {item.meaning}
                                              </p>
                                              <p>
                                                <strong>Strategic Use:</strong>{" "}
                                                {item.use}
                                              </p>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </CardContent>
                                  </Card>
                                )}
                              </motion.li>
                            </AnimatePresence>
                          )
                        )}
                      </ul>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </motion.div>
            )
          )}
        </motion.div>

        <footer className="text-center text-gray-500">
          © 2023 Advanced SWOT Analysis Tool. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
