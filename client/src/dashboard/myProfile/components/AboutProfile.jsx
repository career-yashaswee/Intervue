import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  PlusCircle,
  Pencil,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Diamond,
  MoreVertical,
  Trash,
} from "lucide-react";


function AboutProfile({ isLoading, isEditing, setIsEditing }) {

  const [expanded, setExpanded] = useState(false);
  const fullText =
    "Hi, I'm Yashaswee Kesharwani, currently pursuing a Bachelor's degree in Computer Science and Engineering from Lovely Professional University, minoring in Data Science, expected to graduate in 2026. My academic background is enriched with a solid understanding of Full Stack Web Development, Machine Learning/Artificial Intelligence, alongside proficiency in Java and Python. As the founder of Final Take, a data-first marketing firm, I have successfully driven brand value and sales for startups and content creators through innovative, data-driven ad optimization strategies. This role has sharpened my ability to analyze market dynamics, deploy effective marketing tactics, and generate significant revenue growth. I'm always eager to connect with like-minded professionals and explore opportunities to collaborate on exciting projects. Let's connect and see how we can make a difference together!";
  const shortText = fullText.slice(0, 300) + "...";

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-24" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full mt-2" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>About</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setIsEditing(!isEditing)}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Trash className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea
            className="min-h-[100px]"
            placeholder="Tell us about yourself..."
            defaultValue={fullText}
          />
        ) : (
          <>
            <p>{expanded ? fullText : shortText}</p>
            {fullText.length > 300 && (
              <Button
                variant="link"
                onClick={() => setExpanded(!expanded)}
                className="mt-2 p-0"
              >
                {expanded ? (
                  <>
                    See less <ChevronUp className="h-4 w-4 ml-1" />
                  </>
                ) : (
                  <>
                    See more <ChevronDown className="h-4 w-4 ml-1" />
                  </>
                )}
              </Button>
            )}
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Top skills</h4>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">Full-Stack Development</Badge>
                <Badge variant="secondary">Machine Learning</Badge>
                <Badge variant="secondary">Python</Badge>
                <Badge variant="secondary">React.js</Badge>
                <Badge variant="secondary">MongoDB</Badge>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default AboutProfile;
