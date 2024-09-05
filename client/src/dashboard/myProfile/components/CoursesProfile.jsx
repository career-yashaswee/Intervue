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

function CoursesProfile({ isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Courses</CardTitle>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">Advanced Data Analysis Techniques</h3>
          <p className="text-sm text-muted-foreground">Coursera</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="Instructor"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <p className="text-sm">
              Endorsed by Dr. John Doe, Data Science Professor
            </p>
          </div>
          <p className="text-sm mt-1">Grade: A+ (98%)</p>
          <p className="text-sm text-muted-foreground">Completed: May 2023</p>
          <Button variant="link" className="p-0 h-auto mt-1">
            View Certificate
          </Button>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Digital Marketing Masterclass</h3>
          <p className="text-sm text-muted-foreground">Udemy</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="Instructor"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <p className="text-sm">Endorsed by Jane Smith, Marketing Expert</p>
          </div>
          <p className="text-sm mt-1">Grade: A (95%)</p>
          <p className="text-sm text-muted-foreground">
            Completed: August 2023
          </p>
          <Button variant="link" className="p-0 h-auto mt-1">
            View Certificate
          </Button>
        </div>
        <Separator />
        <div>
          <h3 className="font-semibold">Full Stack Web Development</h3>
          <p className="text-sm text-muted-foreground">freeCodeCamp</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="Instructor"
              />
              <AvatarFallback>QW</AvatarFallback>
            </Avatar>
            <p className="text-sm">
              Endorsed by Quincy Larson, Founder of freeCodeCamp
            </p>
          </div>
          <p className="text-sm mt-1">Grade: Pass</p>
          <p className="text-sm text-muted-foreground">
            Completed: October 2023
          </p>
          <Button variant="link" className="p-0 h-auto mt-1">
            View Certificate
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default CoursesProfile;
