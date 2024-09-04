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
function EducationProfile({ isLoading }) {


  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Skeleton className="w-12 h-12 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Education</CardTitle>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src="/placeholder.svg?height=48&width=48"
              alt="University logo"
            />
            <AvatarFallback>LPU</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Lovely Professional University</h3>
            <p className="text-sm text-muted-foreground">
              Bachelor of Technology - BTech, Computer Science and Engineering
            </p>
            <p className="text-sm text-muted-foreground">Jul 2022 - Aug 2026</p>
            <p className="text-sm mt-2">
              Activities and societies: • Head of Divisions to Student
              Organisation, Wissen, spearheading 105+ membered team conducting
              5+ Mega events catering to the academic and technical interests of
              30K+ Students
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="/placeholder.svg?height=24&width=24"
                  alt="Endorser"
                />
                <AvatarFallback>DP</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">
                Endorsed by Dr. Priya Sharma, Dean of Computer Science
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default EducationProfile;
