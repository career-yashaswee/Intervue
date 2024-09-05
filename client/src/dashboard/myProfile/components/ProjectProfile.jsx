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


function ProjectProfile({ isLoading }) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Projects</CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <PlusCircle className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">
            Anonymous Ai Feedback Sharing Platform
          </h3>
          <p className="text-sm text-muted-foreground">Jun 2024 - Present</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="University logo"
              />
              <AvatarFallback>LPU</AvatarFallback>
            </Avatar>
            <p className="text-sm">
              Associated with Lovely Professional University
            </p>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">REST APIs</Badge>
            <Badge variant="secondary">Full-Stack Development</Badge>
            <Badge variant="secondary">+5 skills</Badge>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <img
              src="/placeholder.svg?height=80&width=120"
              alt="Project screenshot"
              className="rounded-md"
            />
            <div>
              <h4 className="font-semibold">Ai Anonymous Feedback</h4>
            </div>
          </div>
        </div>
        <Separator />
        <div>
          <h3 className="text-lg font-semibold">Intervue</h3>
          <p className="text-sm text-muted-foreground">Jun 2024 - Present</p>
          <div className="flex items-center space-x-2 mt-1">
            <Avatar className="w-6 h-6">
              <AvatarImage
                src="/placeholder.svg?height=24&width=24"
                alt="University logo"
              />
              <AvatarFallback>LPU</AvatarFallback>
            </Avatar>
            <p className="text-sm">
              Associated with Lovely Professional University
            </p>
          </div>
          <p className="text-sm mt-2">
            Intervue is an AI-powered mock interview and assessment application
            designed to transform the way candidates prepare for their dream
            jobs. Our application leverages cutting-edge artificial intelligence
            technology to p...
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant="secondary">Express.js</Badge>
            <Badge variant="secondary">Node.js</Badge>
            <Badge variant="secondary">+9 skills</Badge>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
            <img
              src="/placeholder.svg?height=80&width=120"
              alt="Project screenshot"
              className="rounded-md"
            />
            <div>
              <h4 className="font-semibold">Intervue</h4>
              <p className="text-sm">
                Developed a full-stack SaaS-based AI Video Interview Platform
                using the M.E.R.N stack, integrating React Hook Forms with Zod
                for schema validation and shadCN with Framer Motion an...
              </p>
            </div>
          </div>
        </div>
        <Button variant="outline" className="w-full">
          Show all 3 projects
        </Button>
      </CardContent>
    </Card>
  );
}

export default ProjectProfile;
