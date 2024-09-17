"use client";

import { motion } from "framer-motion";
import { Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function StatisticsCard({ loading }) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Interview Readiness Score</span>
            <Info className="text-blue-500 cursor-pointer" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded animate-pulse" />
              <div className="h-10 bg-gray-200 rounded animate-pulse" />
            </div>
          ) : (
            <>
              <p className="text-lg font-semibold mb-4">Not available yet</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">How does it Work?</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>
                      How Interview Readiness Score Works
                    </DialogTitle>
                    <DialogDescription>
                      The Interview Readiness Score is calculated based on your
                      performance in mock interviews, completion of preparation
                      tasks, and feedback from your mentor. It helps you gauge
                      your readiness for actual job interviews.
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
              <Button variant="secondary" className="mt-4 w-full">
                Check Timeline
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
