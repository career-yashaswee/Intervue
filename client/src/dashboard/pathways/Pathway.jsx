import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCourseByCreatorId } from "@/helpers/pathwayAPI";

import LoadingSpinner from "@/components/LoadingSpinner";
import {
  Book,
  BookPlus,
  Info,
  Loader2,
  PackagePlus,
  Plus,
  PlusCircle,
  Rabbit,
  ShieldAlert,
} from "lucide-react";
import UserCourseList from "./components/UserCourseList";
import { CourseCardSkeleton } from "./components/CourseCardSkeleton";
function Pathway() {
  let _id = localStorage.getItem("_id");
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserCourses();
  }, [_id]);

  const getUserCourses = async () => {
    setIsLoading(true);
    try {
      const result = await getCourseByCreatorId(_id);
      setCourseList(result.data.courses);
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold md:text-2xl gradient-text">
          Pathways
        </h1>
        {courseList?.length != 0 && (
          <Link to={"/dashboard/cc"}>
            <Button className="mt-4 flex items-center gap-2" variant="shine">
              <PackagePlus className="h-4 w-4" />
              Generate Pathway
            </Button>
          </Link>
        )}
      </div>
      {isLoading ? (
        [1, 2].map((item, index) => (
          <CourseCardSkeleton key={index}></CourseCardSkeleton>
        ))
      ) : courseList?.length == 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm h-screen">
          <div className="flex flex-col items-center gap-1 text-center pb-8 pt-8">
            <Info></Info>
            <h3 className="text-2xl font-bold tracking-tight">
              You have no Pathways Added
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start learning in-demand skills, as soon as you create a
              pathway
            </p>
            <Link to={"/dashboard/cc"}>
              <Button className="mt-4" variant="shine">
                Generate Pathway
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <UserCourseList courseList={courseList}></UserCourseList>
      )}
    </main>
  );
}

export default Pathway;
