"use client";

/**
 * A reusable React component that displays a card with a user's salary growth information.
 * The component includes features such as voting, commenting, and bookmarking.
 *
 * @return {JSX.Element} The rendered card component
 */

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MessageCircle,
  RotateCcw,
  MoreHorizontal,
  X,
  Link,
  Bookmark,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

function FeedCard() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [votes, setVotes] = useState(731);
  const [userVote, setUserVote] = useState(0);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    setMounted(true);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  const handleVote = (value) => {
    if (userVote === value) {
      setVotes(votes - value);
      setUserVote(0);
    } else {
      setVotes(votes - userVote + value);
      setUserVote(value);
    }
  };

  const fullText = `2014 TCS at 3.26 LPA
2018 May Left TCS at 4.2 LPA
2018 May Joined CTS at 7.5 LPA
2019 Feb Joined Accenture at 10.64 LPA
2021 March Left Accenture at 11.8 LPA
2021 March Joined Tech Mahindra at 18 LPA
2023 April Left Tech Mahindra at 22 LPA
2023 April Joined a Product Based Company at 38 LPA

Total years of experience: 9 years
Total growth: 1065.64%
CAGR: 36.73%

This growth journey showcases the potential for significant salary increases in the IT industry through strategic job changes and continuous skill development. It's important to note that individual experiences may vary, and factors such as location, specific skills, and market conditions play crucial roles in salary growth.`;

  const shortText = fullText.split("\n").slice(0, 3).join("\n") + "...";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 transition-colors duration-300 bg-background">
      <Card className="w-full max-w-2xl transition-shadow duration-300 hover:shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center space-x-2">
            {isLoading ? (
              <Skeleton className="w-10 h-10 rounded-full" />
            ) : (
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="Ritesh Sinha"
                />
                <AvatarFallback>RS</AvatarFallback>
              </Avatar>
            )}
            <div className="space-y-1">
              {isLoading ? (
                <Skeleton className="h-4 w-[150px]" />
              ) : (
                <p className="text-sm font-medium leading-none">
                  Ritesh Sinha · Follow
                </p>
              )}
              {isLoading ? (
                <Skeleton className="h-3 w-[200px]" />
              ) : (
                <p className="text-xs text-muted-foreground">
                  Software Engineer and 'B'logger · Apr 13
                </p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="pb-2">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-[300px] mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-[250px]" />
            </>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-2">
                Can you share your salary growth in IT?
              </h2>
              <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                {expanded ? fullText : shortText}
                {!expanded && (
                  <span
                    className="text-primary cursor-pointer ml-1"
                    onClick={() => setExpanded(true)}
                  >
                    (more)
                  </span>
                )}
              </p>
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Salary growth chart"
                className="w-full h-auto rounded-md"
              />
            </>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap justify-between pt-2">
          <div className="flex flex-wrap space-x-2 mb-2 sm:mb-0">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className={`text-primary ${
                  userVote === 1 ? "bg-primary/10" : ""
                }`}
                onClick={() => handleVote(1)}
              >
                <ChevronUp className="h-4 w-4" />
              </Button>
              <span className="mx-1">{votes}</span>
              <Button
                variant="ghost"
                size="sm"
                className={`text-primary ${
                  userVote === -1 ? "bg-primary/10" : ""
                }`}
                onClick={() => handleVote(-1)}
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="ghost" size="sm">
              <MessageCircle className="mr-1 h-4 w-4" />
              {isLoading ? <Skeleton className="h-4 w-8" /> : "79"}
            </Button>
            <Button variant="ghost" size="sm">
              <RotateCcw className="mr-1 h-4 w-4" />
              {isLoading ? <Skeleton className="h-4 w-4" /> : "8"}
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <Link className="mr-2 h-4 w-4" />
                <span>Copy link</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <X className="mr-2 h-4 w-4" />
                <span>Not interested in this</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Bookmark</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ChevronDown className="mr-2 h-4 w-4" />
                <span>Downvote question</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <RotateCcw className="mr-2 h-4 w-4" />
                <span>Log</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertTriangle className="mr-2 h-4 w-4" />
                <span>Report</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </div>
  );
}

export default FeedCard;
