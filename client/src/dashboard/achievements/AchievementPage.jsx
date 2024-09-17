"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { LinkedinIcon, Share2Icon, RocketIcon } from "lucide-react";

const badges = [
  {
    id: 1,
    name: "Session Seeker",
    progress: 100,
    total: 1,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    name: "Session Explorer",
    progress: 100,
    total: 5,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    name: "Session Enthusiast",
    progress: 50,
    total: 10,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 4,
    name: "Novice Listener",
    progress: 100,
    total: 100,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 5,
    name: "Active Learner",
    progress: 100,
    total: 250,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 6,
    name: "Wisdom Seeker",
    progress: 60,
    total: 500,
    image: "/placeholder.svg?height=100&width=100",
  },
];

const peerActivity = [
  {
    id: 1,
    name: "Shailesh",
    action: "shared a post on LinkedIn",
    details: "Completed fifth sessions",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Emma",
    action: "earned a new badge",
    details: "Session Explorer",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Liam",
    action: "completed a certification",
    details: "Advanced React Development",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export default function AchievementPage() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [claimedBadges, setClaimedBadges] = useState([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const carouselRef = useRef(null);

  const claimBadge = (badge) => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
    setClaimedBadges([...claimedBadges, badge.id]);
    if (carouselRef.current) {
      carouselRef.current.scrollLeft += carouselRef.current.offsetWidth;
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Achievements Hub</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Tabs defaultValue="badges" className="mb-8">
            <TabsList>
              <TabsTrigger value="badges">Badges</TabsTrigger>
              <TabsTrigger value="certificates">Certificates</TabsTrigger>
            </TabsList>
            <TabsContent value="badges">
              <div className="overflow-x-auto" ref={carouselRef}>
                <div className="flex space-x-4 p-4">
                  {badges.map((badge) => (
                    <motion.div
                      key={badge.id}
                      className="flex-shrink-0 w-64"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card className="h-full">
                        <CardHeader>
                          <CardTitle>{badge.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <img
                            src={badge.image}
                            alt={badge.name}
                            className="w-full h-32 object-contain mb-4"
                          />
                          <Progress value={badge.progress} className="mb-2" />
                          <p className="text-sm text-right mb-4">
                            {badge.progress}% -{" "}
                            {(badge.progress / 100) * badge.total}/{badge.total}
                          </p>
                          <div className="flex justify-between">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  onClick={() => setSelectedBadge(badge)}
                                >
                                  View Badge
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                  <DialogTitle>
                                    {selectedBadge?.name}
                                  </DialogTitle>
                                </DialogHeader>
                                <img
                                  src={selectedBadge?.image}
                                  alt={selectedBadge?.name}
                                  className="w-full h-64 object-contain"
                                />
                                <p>Progress: {selectedBadge?.progress}%</p>
                              </DialogContent>
                            </Dialog>
                            <Button
                              onClick={() => {
                                claimBadge(badge);
                                setIsShareModalOpen(true);
                              }}
                              disabled={claimedBadges.includes(badge.id)}
                            >
                              {claimedBadges.includes(badge.id)
                                ? "Claimed"
                                : "Claim"}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="certificates">
              <p>Your certificates will be displayed here.</p>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Peer Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {peerActivity.map((activity) => (
                  <motion.div
                    key={activity.id}
                    whileHover={{ scale: 1.05 }}
                    className="p-4 rounded-lg border border-gray-200 hover:ring-2 hover:ring-primary"
                  >
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage
                          src={activity.avatar}
                          alt={activity.name}
                        />
                        <AvatarFallback>{activity.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">
                          {activity.name} {activity.action}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.details}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
      <Dialog open={isShareModalOpen} onOpenChange={setIsShareModalOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              Share this badge on LinkedIn!{" "}
              <RocketIcon className="inline-block ml-2" />
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-100 p-8 rounded-lg flex flex-col items-center justify-center">
              <img
                src={selectedBadge?.image}
                alt={selectedBadge?.name}
                className="w-32 h-32 object-contain mb-4"
              />
              <h3 className="text-xl font-bold">{selectedBadge?.name}</h3>
              <p className="text-green-600 font-semibold">
                Completed First Session
              </p>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Your Name"
                  />
                  <AvatarFallback>YN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">Your Name</p>
                  <p className="text-sm text-muted-foreground">
                    Taking Mentorship @ Preplaced
                  </p>
                </div>
              </div>
              <Textarea
                className="mb-4"
                rows={6}
                defaultValue={`Just had my first mentoring session on Preplaced and officially became a "${selectedBadge?.name}"!

Feeling excited and proud to kickstart my journey to career growth with the guidance of a wonderful mentor. It's amazing how a single session can ignite such a sense of purpose and potential.`}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setIsShareModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button>
                  <LinkedinIcon className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
