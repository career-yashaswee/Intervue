import { useState, useEffect } from "react";
import { Clock, BookOpen, Video, Gauge } from "lucide-react"; // Changed icons
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

const CourseInfo = ({ course }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="border p-6 rounded-xl shadow-sm mt-3 bg-white max-w-4xl mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 justify-center">
        {/* Skill Level */}
        <div className="flex gap-2 items-start">
          {loading ? (
            <div className="flex gap-2 items-start">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="w-20 h-4 mb-1" />
                <Skeleton className="w-24 h-6" />
              </div>
            </div>
          ) : (
            <>
              <Gauge className="text-4xl text-primary h-4 w-4" />
              <div>
                <h2 className="text-xs text-slate-500">Skill Level</h2>
                <h2 className="font-medium text-lg">{course?.level}</h2>
              </div>
            </>
          )}
        </div>

        {/* Duration */}
        <div className="flex gap-2 items-start">
          {loading ? (
            <div className="flex gap-2 items-start">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="w-20 h-4 mb-1" />
                <Skeleton className="w-24 h-6" />
              </div>
            </div>
          ) : (
            <>
              <Clock className="text-primary h-4 w-4" />
              <div>
                <h2 className="text-xs text-slate-500">Duration</h2>
                <h2 className="font-medium text-lg">{course?.duration}</h2>
              </div>
            </>
          )}
        </div>

        {/* No. of Chapters */}
        <div className="flex gap-2 items-start">
          {loading ? (
            <div className="flex gap-2 items-start">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="w-20 h-4 mb-1" />
                <Skeleton className="w-24 h-6" />
              </div>
            </div>
          ) : (
            <>
              <BookOpen className="text-xl text-primary h-4 w-4" />
              <div>
                <h2 className="text-xs text-slate-500">No. of Chapters</h2>
                <h2 className="font-medium text-lg">{course?.nChapters}</h2>
              </div>
            </>
          )}
        </div>

        {/* Videos Included */}
        <div className="flex gap-2 items-start">
          {loading ? (
            <div className="flex gap-2 items-start">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div>
                <Skeleton className="w-20 h-4 mb-1" />
                <Skeleton className="w-24 h-6" />
              </div>
            </div>
          ) : (
            <>
              <Video className="text-4xl text-primary h-4 w-4" />
              <div>
                <h2 className="text-xs text-slate-500">Videos Included</h2>
                <h2 className="font-medium text-lg text-gradient">{course?.addVideos}</h2>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
