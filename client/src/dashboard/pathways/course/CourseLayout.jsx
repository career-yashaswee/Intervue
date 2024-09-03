"use client";
import { extractCourseId } from "@/helpers/api";
import {
  generateCourseContent,
  getCourseLayout,
  getVideos,
  markChapter,
  publishCourseByCourseId,
} from "@/helpers/pathwayAPI";
import React, { useEffect, useState } from "react";
import CourseBasicInfo from "./LayoutComponents/CourseBasicInfo";
import CourseDetails from "./LayoutComponents/CourseDetails";
import ChapterList from "./LayoutComponents/ChapterList";
import { Button } from "@/components/ui/button";
import { Bot, LayoutGrid } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";
function CourseLayout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("_id");
  const courseId = localStorage.getItem("_pway");
  const [isLoading, setIsLoading] = useState(false);
  const [course, setCourse] = useState([]);

  const fetchCourse = async () => {
    const result = await getCourseLayout(userId, courseId);
    setCourse(result.data.course[0].courseLayout?.layout);
  };

  const generateChapterContent = async () => {
    try {
      setIsLoading(true);
      const chapters = course?.chapters;
      console.log(chapters);

      chapters.forEach(async (chapter, index) => {
        try {
          let videoId = "Tn6-PIqc4UM";
          // const response = await getVideos(
          //   `${course?.skillName}:${chapters?.[index]?.chapterName}`
          // ).then((res) => {
          //   videoId = res[0]?.id?.videoId;
          // });

          const content = await generateCourseContent(
            course?.skillName,
            chapter?.chapterName
          );

          const result = await markChapter(index, courseId, content, videoId);
          navigate(`/course/${courseId}`);
        } catch (e) {
          console.log(e);
        }
      });
      const result = await publishCourseByCourseId(courseId);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [userId, courseId]);

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      <div className="flex items-center p-4 border-slate-950">
        <div className="flex items-center justify-center w-12 h-12 bg-slate-800 rounded-full mr-4">
          <LayoutGrid className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-5xl md:text-2xl gradient-text font-semibold">
          Pathway Layout
        </h2>
      </div>

      <CourseBasicInfo course={course}></CourseBasicInfo>
      <CourseDetails course={course}></CourseDetails>
      <ChapterList course={course}></ChapterList>
      <div className="flex items-center justify-center">
        <Button
          onClick={() => generateChapterContent()}
          className="flex items-center space-x-2"
        >
          <span>Generate Content</span>
          <div className="flex items-center justify-center w-5 h-5">
            <Bot className="w-4 h-4" />
          </div>
        </Button>
      </div>
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center">
            <Spinner className="w-10 h-10 text-primary animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseLayout;
