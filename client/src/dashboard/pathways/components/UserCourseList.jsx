import { getCourseByCreatorId } from "@/helpers/pathwayAPI";
import React, { useEffect, useState } from "react";
import CourseCard from "./CourseCard";
import { CourseCardSkeleton } from "./CourseCardSkeleton";

function UserCourseList({ courseList }) {
  return (
    <div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {courseList?.length > 0
          ? courseList?.map((course, index) => (
              <div key={index} className="col-span-1">
                {" "}
                <CourseCard course={course} />
              </div>
            ))
          : [1, 2, 3, 4, 5].map((item, index) => {
              <div key={index} className="col-span-1">
                {" "}
                <CourseCardSkeleton />
              </div>;
            })}
      </div>
    </div>
  );
}

export default UserCourseList;
