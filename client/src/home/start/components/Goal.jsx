import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Target, BarChart2, Clock, HelpCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Goal() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  setTimeout(() => setIsLoading(false), 2000);

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="h-1 bg-gradient-to-r from-purple-500 to-pink-500" />
      <CardContent className="mt-4">
        <form>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="goal-statement"
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                Goal Statement
              </Label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Input
                  id="goal-statement"
                  placeholder="e.g., Increase monthly sales by 20%"
                />
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="measurement" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                How do you measure it?
              </Label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select>
                  <SelectTrigger id="measurement">
                    <SelectValue placeholder="e.g., Percentage increase in sales" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quantity">Quantity (numbers)</SelectItem>
                    <SelectItem value="quality">Quality (ratings)</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="completion">
                      Completion of tasks
                    </SelectItem>
                    <SelectItem value="frequency">Frequency</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label htmlFor="timeframe" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Timeframe to achieve the goal
              </Label>
              {isLoading ? (
                <Skeleton className="h-10 w-full" />
              ) : (
                <Select>
                  <SelectTrigger id="timeframe">
                    <SelectValue placeholder="e.g., 3 months" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 month</SelectItem>
                    <SelectItem value="3months">3 months</SelectItem>
                    <SelectItem value="6months">6 months</SelectItem>
                    <SelectItem value="1year">1 year</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <Separator />

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm text-muted-foreground">
                <HelpCircle className="h-4 w-4" />
                Example SMART Goal
              </Label>
              <p className="text-sm text-muted-foreground">
                Increase monthly sales by 20% within 3 months by implementing a
                new marketing strategy and expanding our product line.
              </p>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
