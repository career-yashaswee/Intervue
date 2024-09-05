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


function HeaderProfile({ isLoading }) {


  if (isLoading) {
    return (
      <Card>
        <div className="h-32 bg-muted"></div>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
            <Skeleton className="w-32 h-32 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mt-4">
            <Skeleton className="h-8 w-32" />
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600"></div>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-end space-y-4 sm:space-y-0 sm:space-x-4">
          <Avatar className="w-32 h-32 border-4 border-background absolute -top-16 sm:static">
            <AvatarImage
              src="/placeholder.svg?height=128&width=128"
              alt="Profile picture"
            />
            <AvatarFallback>YK</AvatarFallback>
          </Avatar>
          <div className="space-y-1 mt-16 sm:mt-0">
            <h1 className="text-2xl font-bold">Yashaswee Kesharwani</h1>
            <p className="text-muted-foreground">Founder at Final Take</p>
            <p className="text-sm text-muted-foreground">
              Phagwara, Punjab, India • Remote
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mt-4">
          <div className="flex items-center space-x-2">
            <Diamond className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm font-medium">Profile Score</p>
              <Progress value={85} className="w-24 h-2" />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Contact Info
            </Button>
            <Button variant="outline" size="sm">
              <Phone className="h-4 w-4 mr-2" />
              (123) 456-7890
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default HeaderProfile;
