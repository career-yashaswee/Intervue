import { CheckCircle, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton component

function ChapterList({ course }) {
  const [chapters, setChapters] = useState(course?.chapters || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setChapters(course?.chapters || []);
      setLoading(false);
    }, 1000); // Adjust as needed
    return () => clearTimeout(timer);
  }, [course]);

  return (
    <div className="mt-3 font-medium text-xl">
      <h2 className="text-lg font-semibold md:text-2xl gradient-text border-b-2 border-primary pb-2">
        Chapters
      </h2>
      <div className="mt-6">
        {loading
          ? // Skeleton Loading State
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="border p-5 rounded-lg mb-2 flex items-start justify-between max-w-4xl mx-auto"
              >
                <div className="flex gap-5 items-start">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex flex-col gap-2">
                    <Skeleton className="w-32 h-5 rounded" />
                    <Skeleton className="w-48 h-4 rounded" />
                    <div className="flex items-center gap-2">
                      <Skeleton className="w-4 h-4 rounded-full" />
                      <Skeleton className="w-24 h-4 rounded" />
                    </div>
                  </div>
                </div>
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
            ))
          : // Actual Content
            chapters?.map((chapter, index) => (
              <div
                key={index}
                className="border p-5 rounded-lg mb-2 flex items-start justify-between max-w-4xl mx-auto hover:border-slate-950"
              >
                <div className="flex gap-5 items-start">
                  <h2 className="text-primary text-center p-2 text-lg ">
                    {index + 1}
                  </h2>
                  <div className="flex flex-col gap-2">
                    <h2 className="font-medium text-lg">
                      {chapter?.chapterName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {chapter?.about}
                    </p>
                    <div className="flex items-center gap-2 text-primary">
                      <Clock className="w-4 h-4" />
                      <p className="text-sm">{chapter?.duration}</p>
                    </div>
                  </div>
                </div>
                <CheckCircle className="text-3xl text-slate-700 h-4 w-4" />
              </div>
            ))}
      </div>
      <h2 className="border-b-2 border-primary pb-2 mb-4"></h2>
    </div>
  );
}

export default ChapterList;
