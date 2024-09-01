import React, { useState, useEffect } from "react";
import logo from "../../../../assets/placeholder.png";
import { SwatchBook } from "lucide-react";
import { Button } from "@/components/ui/button";
import EditBasicCourseInfo from "../components/EditBasicCourseInfo";
import { Link } from "react-router-dom";
import { BookAudio } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

function CourseBasicInfo({ course, edit = true }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setLoading(false), 1000); // Adjust as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 md:p-10 border rounded-xl shadow-sm mt-5 max-w-4xl mx-auto">
      {/* Adjusted padding, max width, and centering */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Left Column: Course Info */}
        <div className="flex flex-col items-start">
          {/* Course Name */}
          <h2 className="font-bold text-2xl flex items-center gap-2">
            {loading ? (
              <Skeleton className="w-40 h-8 rounded" />
            ) : (
              <>
                {course?.skillName}
                {edit && (
                  <EditBasicCourseInfo
                    course={course}
                    className="text-primary cursor-pointer"
                  />
                )}
              </>
            )}
          </h2>
          {/* Course Description */}
          <p className="text-sm text-muted-foreground mt-1">
            {loading ? (
              <Skeleton className="w-full h-30 rounded" />
            ) : (
              course?.description
            )}
          </p>
          {/* Course Category */}
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            {loading ? (
              <>
                <Skeleton className="w-5 h-5 rounded-full" />
                <Skeleton className="w-24 h-4 rounded" />
              </>
            ) : (
              <>
                <SwatchBook className="w-5 h-5" />
                {course?.category}
              </>
            )}
          </h2>
          {/* Learn Now Button */}
          {!edit && (
            <Link to={"learn"}>
              <Button 
              className="w-full mt-5 bg-primary text-white rounded-md flex items-center justify-center gap-2 hover:bg-primary-dark transition duration-200 ease-in-out"
              variant="shine">
                {loading ? (
                  <Skeleton className="w-4 h-4 rounded-full" />
                ) : (
                  <BookAudio className="w-4 h-4" />
                )}
                {loading ? (
                  <Skeleton className="w-24 h-5 rounded" />
                ) : (
                  "Learn Now"
                )}
              </Button>
            </Link>
          )}
        </div>
        {/* Right Column: Image */}
        <div className="flex justify-center md:justify-end">
          {/* Image */}
          {loading ? (
            <Skeleton className="w-full h-70 rounded-xl" />
          ) : (
            <img
              src={logo}
              width={350}
              height={250}
              className="max-w-full rounded-xl object-cover border-slate-950"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
