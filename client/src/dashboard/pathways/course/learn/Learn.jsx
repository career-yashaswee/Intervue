import { getChapterByCourse, getCourseLayout } from "@/helpers/pathwayAPI";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Loader2, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { extractCourseId } from "@/helpers/api";
import ChapterContent from "./components/ChapterContent";
import { Skeleton } from "@/components/ui/skeleton";

function Learn() {
  let _id = localStorage.getItem("_id");
  const courseId = extractCourseId(window.location.href);

  const [course, setCourse] = useState(null);
  const [chapters, setChapters] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  const fetchCourse = async () => {
    try {
      const result = await getCourseLayout(_id, courseId);
      setCourse(result.data.course[0].courseLayout?.layout);
    } catch (error) {
      console.error("Error fetching course:", error);
    }
  };

  const fetchChapterContent = async (courseId) => {
    try {
      const result = await getChapterByCourse(courseId);
      setChapters(result?.data?.chapters);
    } catch (error) {
      console.error("Error fetching chapter content:", error);
    }
  };

  useEffect(() => {
    fetchCourse();
    fetchChapterContent(courseId);
  }, [_id, courseId]);

  useEffect(() => {
    if (course && chapters) {
      setIsLoading(false);
    }
  }, [course, chapters]);

  const renderChapter = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <Skeleton className="w-full h-48 rounded-lg mb-4" />
          <Skeleton className="w-full h-6 rounded-md mb-2" />
          <Skeleton className="w-full h-6 rounded-md" />
        </div>
      );
    }

    return (
      <ChapterContent
        chapter={course?.chapters?.[selectedChapterIndex]}
        content={chapters?.[selectedChapterIndex]?.content}
      />
    );
  };

  return (
    <div className="relative min-h-screen w-screen bg-white">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[245px_1fr]">
        {/* Sidebar */}
        <div className="flex h-full w-60 flex-col border-r bg-muted/40 p-4">
          {/* Toggle navigation button for mobile */}
          <header className="flex items-center gap-4 border-b pb-4 mb-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 text-lg font-medium">
                  {isLoading
                    ? Array.from({ length: 5 }).map((_, index) => (
                        <Skeleton
                          key={index}
                          className="w-full h-10 rounded-lg mb-2"
                        />
                      ))
                    : course?.chapters?.map((chapter, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedChapterIndex(index)}
                          className={`flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground ${
                            selectedChapterIndex === index
                              ? "bg-primary text-white"
                              : "bg-transparent hover:bg-primary hover:text-white"
                          }`}
                        >
                          <span>{chapter.name}</span>
                        </button>
                      ))}
                </nav>
              </SheetContent>
            </Sheet>
            <h1 className="font-bold text-xl">
              {course?.skillName || (
                <Skeleton className="w-32 h-6 rounded-md" />
              )}
            </h1>
          </header>

          {/* Chapter Buttons */}
          <div className="flex flex-col gap-2">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-full h-10 rounded-lg mb-2"
                  />
                ))
              : course?.chapters?.map((chapter, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedChapterIndex(index)}
                    className={`flex place-items-start gap-4 px-3 py-2 font-medium rounded-lg transition-all ${
                      selectedChapterIndex === index
                        ? "bg-primary text-white"
                        : "bg-transparent text-muted-foreground hover:bg-primary hover:text-white"
                    }`}
                  >
                    <span>{chapter?.chapterName}</span>
                  </button>
                ))}
          </div>
        </div>

        {/* Chapter Content */}
        <div>{renderChapter()}</div>
      </div>
    </div>
  );
}

export default Learn;
