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


function ExperienceProfile({ isLoading }) {


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
        <CardTitle>Experience</CardTitle>
        <Button variant="ghost" size="icon">
          <PlusCircle className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Experience 1 */}
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src="/placeholder.svg?height=48&width=48"
              alt="Company logo"
            />
            <AvatarFallback>FT</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Founder</h3>
            <p className="text-sm text-muted-foreground">
              Final Take • Self-employed
            </p>
            <p className="text-sm text-muted-foreground">
              Jan 2023 - Present • 1 yr 9 mos
            </p>
            <p className="text-sm mt-2">
              • Boosted MRR for Startups and Content Creators leading to +20%
              increase in Brand Value through data.
            </p>
            <p className="text-sm">
              • Deploying Data Driven Ad-Optimisation Strategies to Facebook &
              Google Ads, growing client sales by 30%.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">Data Analysis</Badge>
              <Badge variant="secondary">Digital Marketing</Badge>
              <Badge variant="secondary">Ad Optimization</Badge>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="/placeholder.svg?height=24&width=24"
                  alt="Endorser"
                />
                <AvatarFallback>JS</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">
                Endorsed by John Smith, Marketing Director
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Experience 2 */}
        <div className="flex space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage
              src="/placeholder.svg?height=48&width=48"
              alt="Company logo"
            />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Digital Marketing Specialist</h3>
            <p className="text-sm text-muted-foreground">
              TechStart Inc. • Full-time
            </p>
            <p className="text-sm text-muted-foreground">
              Jun 2021 - Dec 2022 • 1 yr 7 mos
            </p>
            <p className="text-sm mt-2">
              • Led digital marketing campaigns resulting in a 45% increase in
              lead generation.
            </p>
            <p className="text-sm">
              • Implemented SEO strategies that improved organic traffic by 60%
              within 6 months.
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge variant="secondary">SEO</Badge>
              <Badge variant="secondary">Lead Generation</Badge>
              <Badge variant="secondary">Campaign Management</Badge>
            </div>
            <div className="mt-2 flex items-center space-x-2">
              <Avatar className="w-6 h-6">
                <AvatarImage
                  src="/placeholder.svg?height=24&width=24"
                  alt="Endorser"
                />
                <AvatarFallback>AM</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">
                Endorsed by Alice Miller, CEO of TechStart Inc.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExperienceProfile;
