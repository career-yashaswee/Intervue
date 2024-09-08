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
import { useContext } from "react";
import { OBInputContext } from "@/context/OBInputContext";
import { motion } from "framer-motion";

export default function Goal() {
  const { OBInput, setOBInput } = useContext(OBInputContext);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (obj) => {
    setOBInput((prev) => ({
      ...prev,
      ...obj,
    }));
    console.log(obj);
    console.log(OBInput.goal);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <Card className="w-full max-w-md mx-auto">
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
                    onChange={(e) => handleInput({ goal: e.target.value })}
                    id="goal-statement"
                    placeholder="Get a Frontend Developer Job in 2024"
                  />
                )}
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="timeframe" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Timeframe
                </Label>
                {isLoading ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <Select
                    onValueChange={(value) => handleInput({ time: value })}
                  >
                    <SelectTrigger id="timeframe">
                      <SelectValue placeholder="Select Days" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Upto a Month</SelectItem>
                      <SelectItem value="3">3 Months</SelectItem>
                      <SelectItem value="6">6 Months</SelectItem>
                      <SelectItem value="0">No Time Limit</SelectItem>
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
                  Get a Front-End Developer Job in an year with a decent salary.
                </p>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
