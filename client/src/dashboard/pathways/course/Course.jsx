import { getCourseLayout } from "@/helpers/pathwayAPI";
import React, { useEffect, useState } from "react";
import { extractCourseId } from "@/helpers/api";
import CourseBasicInfo from "./LayoutComponents/CourseBasicInfo";
import CourseDetails from "./LayoutComponents/CourseDetails";
import ChapterList from "./LayoutComponents/ChapterList";
import { Skeleton } from "@/components/ui/skeleton"

function Course() {
  let _id = localStorage.getItem("_id");
  const courseId = extractCourseId(window.location.href);
  const [course, setCourse] = useState([]);

  const fetchCourse = async () => { 
    const result = await getCourseLayout(_id, courseId).then((response) => {
      setCourse(response.data.course[0].courseLayout?.layout);
    });
  };

  useEffect(() => {
    fetchCourse();
  }, [_id, courseId]);

  return (
    <div className="mt-10 px-7 md:px-20 lg:px-44">
      {/* <h2 className="text-lg font-semibold md:text-2xl gradient-text">
        Course
      </h2> */}
      <CourseBasicInfo course={course} edit={false}></CourseBasicInfo>
      <CourseDetails course={course}></CourseDetails>
      <ChapterList course={course}></ChapterList>
      {/* <Button className="my-10" onClick={generateChapterContent}>
        Generate Content
      </Button> */}
    </div>
  );
}

export default Course;
