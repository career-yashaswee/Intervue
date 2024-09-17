import React from "react";
import { BookOpen, EllipsisVertical, Layers, Star } from "lucide-react";
import DropDownOptions from "./DropDownOptions";
import { deleteCourseByCourseId } from "@/helpers/pathwayAPI";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "react-router-dom";
function CourseCard({ course }) {
  const handleOnDelete = async () => {
    const response = await deleteCourseByCourseId(course?.courseId);
  };

  return (
    <Card className="shadow-sm rounded-lg overflow-hidden transform transition-transform duration-150 hover:border-slate-950">
      {/* Card Image */}
      <Link to={`/course/${course?.courseId}`}>
        <img
          src={course?.banner}
          onError={(e) => (e.currentTarget.src = "./course.png")}
          width={300}
          height={200}
          loading="lazy" // Enables lazy loading
          className="w-full h-[200px] object-cover transition-opacity duration-500 ease-in-out"
          alt={course?.name}
          onLoad={(e) => e.currentTarget.classList.add("loaded")}
        />
      </Link>

      {/* Card Content */}
      <CardContent className="p-4 bg-white">
        <CardTitle className="font-semibold text-lg mb-2 flex justify-between items-center">
          {course?.name}
          <DropDownOptions
            handleOnDelete={() => handleOnDelete()}
            children={<EllipsisVertical className="w-4 h-4 cursor-pointer" />}
          />
        </CardTitle>

        {/* Course Info in Tag-Like Effects */}
        <div className="flex flex-wrap gap-2 mb-2">
          {/* Number of Chapters */}
          <div className="flex items-center text-sm text-primary bg-slate-50 rounded-full px-2 py-1 shadow-sm">
            <BookOpen className="w-4 h-4 text-green-500 mr-1" />
            <span>{course?.courseLayout?.layout?.nChapters} Chapters</span>
          </div>
          {/* Course Level */}
          <div className="flex items-center text-sm text-primary bg-slate-50 rounded-full px-2 py-1 shadow-sm">
            <Layers className="w-4 h-4 text-blue-500 mr-1" />
            <span>{course?.category}</span>
          </div>
          <div className="flex items-center text-sm text-primary bg-slate-50 rounded-full px-2 py-1 shadow-sm">
            <Star className="w-4 h-4 text-yellow-500 mr-1" />
            <span>{course?.level}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CourseCard;
