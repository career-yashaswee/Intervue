import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import Confetti from "react-confetti";

// interface SpaceProps {
//   id: number
//   title: string
//   description: string
//   icon: string
//   backgroundImage: string
//   followers: number
//   loading: boolean
//   isFollowed: boolean
//   onFollow: (id: number) => void
// }

const formatFollowers = (followers) => {
  if (followers >= 1000000) {
    return `${(followers / 1000000).toFixed(1)}M`;
  } else if (followers >= 1000) {
    return `${(followers / 1000).toFixed(1)}K`;
  }
  return followers.toString();
};

export function SpaceCard({
  id,
  title,
  description,
  icon,
  backgroundImage,
  followers,
  loading,
  isFollowed,
  onFollow,
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleFollow = () => {
    onFollow(id);
    if (!isFollowed) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  return (
    <Card className="bg-white border-gray-200 overflow-hidden transition-all duration-300 hover:scale-105 relative">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
        />
      )}
      <div className="h-32 relative">
        {loading ? (
          <Skeleton className="h-full w-full" />
        ) : (
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          {loading ? (
            <Skeleton className="h-16 w-16 rounded-2xl" />
          ) : (
            <img
              src={icon}
              alt={title}
              className="h-16 w-16 rounded-2xl border-4 border-gray-200"
            />
          )}
        </div>
      </div>
      <CardContent className="pt-10 pb-4">
        {loading ? (
          <>
            <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3 mx-auto" />
          </>
        ) : (
          <>
            <h4 className="text-lg font-bold text-center mb-2">{title}</h4>
            <p className="text-sm text-gray-600 text-center">{description}</p>
          </>
        )}
      </CardContent>
      <CardFooter>
        {loading ? (
          <Skeleton className="h-10 w-full" />
        ) : (
          <Button
            variant={isFollowed ? "default" : "outline"}
            className="w-full rounded-full transition-colors duration-300"
            onClick={handleFollow}
          >
            {isFollowed ? `Following ${formatFollowers(followers)}` : "Follow"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
