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

function SkillSection({ skill, endorsedBy, review, percentage }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
      <div className="flex-1">
        <h4 className="font-semibold">{skill}</h4>
        <p className="text-sm text-muted-foreground">
          Endorsed by {endorsedBy}
        </p>
        <p className="text-sm">{review}</p>
      </div>
      <div className="relative w-16 h-16 flex-shrink-0">
        <svg viewBox="0 0 36 36" className="w-16 h-16">
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.2"
            strokeWidth="2"
          />
          <path
            d="M18 2.0845
              a 15.9155 15.9155 0 0 1 0 31.831
              a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray={`${percentage}, 100`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-semibold">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}

function SkillsProfile({ isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-24" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skills</CardTitle>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <SkillSection
          skill="Data Modeling"
          endorsedBy="Jane Smith"
          review="Yashaswee's data modeling skills are exceptional. He consistently delivers insightful analyses."
          percentage={95}
        />
        <Separator />
        <SkillSection
          skill="Email Marketing"
          endorsedBy="Mike Johnson"
          review="Yashaswee's email campaigns have significantly improved our conversion rates."
          percentage={88}
        />
        <Separator />
        <SkillSection
          skill="Python"
          endorsedBy="Sarah Lee"
          review="Yashaswee's Python scripts have automated many of our data processing tasks, saving us countless hours."
          percentage={92}
        />
        <Separator />
        <SkillSection
          skill="SQL"
          endorsedBy="Alex Chen"
          review="Yashaswee's SQL queries are always optimized and efficient, handling large datasets with ease."
          percentage={90}
        />
      </CardContent>
    </Card>
  );
}

export default SkillsProfile;
