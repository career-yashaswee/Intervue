import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
function UpgradeCard() {
  return (
    <div className="mt-auto p-4">
      <Card x-chunk="dashboard-02-chunk-0">
        <CardHeader className="p-2 pt-0 md:p-4">
          <CardTitle className="flex flex-">Upgrade to Pro</CardTitle>

          <CardDescription>
            Unlock all features and get unlimited credits.
          </CardDescription>
          <div>
            <Progress value={33} />
            <p className="text-sm my-2 text-slate-500">
              82 Out of 100 Credits Used
            </p>
          </div>
        </CardHeader>

        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
          <Button size="sm" className="w-full">
            Upgrade
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default UpgradeCard;
