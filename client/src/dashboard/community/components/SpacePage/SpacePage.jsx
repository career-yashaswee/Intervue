"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon, ArrowRightCircleIcon } from "lucide-react";
import { SpaceCard } from "./components/SpaceCard";

const spaces = [
  {
    id: 1,
    title: "Get Insta Followers free",
    description:
      "This Space for Instagram Releted Contents and Share Your Insta ID &...",
    icon: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/instagram-icon-Wd5Ue5Hy5Ue9Ue9Ue9Ue9Ue9Ue9Ue9.png",
    backgroundImage:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/instagram-bg-Wd5Ue5Hy5Ue9Ue9Ue9Ue9Ue9Ue9Ue9.jpg",
    followers: 117500000,
  },
  // Add more spaces here...
];

function SpacePage() {
  const [loading, setLoading] = useState(true);
  const [followedSpaces, setFollowedSpaces] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleFollow = (spaceId) => {
    setFollowedSpaces((prev) =>
      prev.includes(spaceId)
        ? prev.filter((id) => id !== spaceId)
        : [...prev, spaceId]
    );
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-100 rounded-lg p-6 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome to Spaces!</h1>
            <p className="text-gray-600">
              Follow Spaces to explore your interests on Quora.
            </p>
          </div>
          <div className="flex mt-4 md:mt-0">
            <Button variant="outline" className="mr-4">
              <PlusIcon className="mr-2 h-4 w-4" /> Create a Space
            </Button>
            <Button variant="outline">
              <ArrowRightCircleIcon className="mr-2 h-4 w-4" /> Discover Spaces
            </Button>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Discover Spaces</h2>
        <h3 className="text-xl mb-6">Spaces you might like</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {spaces.map((space) => (
            <SpaceCard
              key={space.id}
              {...space}
              loading={loading}
              isFollowed={followedSpaces.includes(space.id)}
              onFollow={handleFollow}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SpacePage;
