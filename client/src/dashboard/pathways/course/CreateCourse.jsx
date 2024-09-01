"use client";
import { Button } from "@/components/ui/button";
import {
  Badge,
  Book,
  Bot,
  ChevronRight,
  Settings,
  SquareMousePointer,
  SwatchBook,
} from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import SelectCategory from "./components/SelectCategory";
import Skill from "./components/Skill";
import Topics from "./components/Topics";
import SelectOptions from "./components/SelectOptions";
import { UserInputContext } from "./context/UserInputContext";
import { generateCourseLayout, saveCourseLayout } from "@/helpers/pathwayAPI";
import LoadingDialog from "./components/LoadingDialog";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { Spinner } from "@/components/ui/spinner";
function CreateCourse() {
  const navigate = useNavigate();
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [userCourseInput]);

  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <SwatchBook />,
    },
    {
      id: 2,
      name: "Skill",
      icon: <Badge />,
    },
    {
      id: 3,
      name: "Topics",
      icon: <SquareMousePointer />,
    },
    {
      id: 4,
      name: "Options",
      icon: <Settings />,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const GenerateCourseLayout = async () => {
    setLoading(true);
    const BASIC_PROMPT =
      "Generate a Layout with Field as Category, Skill Name, Description, along with array of chapters, which have 'chapterName', 'about' and 'duration' with special emphasis on the inclusiveTopics and exempting the exclusiveTopics. ";
    const USER_INPUT_PROMPT =
      "category: " +
      userCourseInput?.category +
      ", skillName: " +
      userCourseInput?.skill +
      ", description: " +
      userCourseInput?.description +
      ", inclusiveTopics: " +
      userCourseInput?.inclusiveTopic +
      ", exclusiveTopics: " +
      userCourseInput?.exclusiveTopic +
      ", level: " +
      userCourseInput?.level +
      ", duration: " +
      userCourseInput?.duration +
      ", addVideos: " +
      userCourseInput?.addVideos +
      ", nChapters: " +
      userCourseInput?.nChapters +
      " in pure JSON Format. Making, STRICTLY sure the fields are exactly in same case as mentioned above like in skillName, skill is lowercase and in Name, N is capital and follows lowercase.";
    const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;

    const result = await generateCourseLayout(FINAL_PROMPT);
    SaveCourseLayout(result);
    setLoading(false);
  };

  const SaveCourseLayout = async (courseLayout) => {
    try {
      setLoading(true);
      const result = await saveCourseLayout(
        userCourseInput?.skill,
        userCourseInput?.category,
        userCourseInput?.level,
        courseLayout,
        userCourseInput?.description,
        userCourseInput?.duration,
        userCourseInput?.addVideos,
        "66ce471d15cc2c84c0dd6bb8"
      );
      localStorage.setItem("_pway", result.courseId);
      navigate(`/dashboard/cc/${result.courseId}`);
    } catch (e) {
      toast.error("Error Saving Course Layout");
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = () => {
    if (
      activeIndex == 0 &&
      (userCourseInput?.category == undefined ||
        userCourseInput?.category?.length == 0)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.skill?.length == 0 ||
        userCourseInput?.skill == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (userCourseInput?.description?.length == 0 ||
        userCourseInput?.description == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 2 &&
      (userCourseInput?.inclusiveTopic?.length == 0 ||
        userCourseInput?.inclusiveTopic == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 2 &&
      (userCourseInput?.exclusiveTopic?.length == 0 ||
        userCourseInput?.exclusiveTopic == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 3 &&
      (userCourseInput?.level?.length == 0 ||
        userCourseInput?.level == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 3 &&
      (userCourseInput?.duration?.length == 0 ||
        userCourseInput?.duration == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 3 &&
      (userCourseInput?.addVideos?.length == 0 ||
        userCourseInput?.addVideos == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 3 &&
      (userCourseInput?.nChapters?.length == 0 ||
        userCourseInput?.nChapters == undefined)
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h2 className="text-lg md:text-4xl font-bold gradient-text mb-10 mt-8">
        Create Pathway
      </h2>
      <div>
        <div className="flex ">
          {StepperOptions.map((item, index) => (
            <div key={index} className="inline-flex items-center ">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div
                  className={`bg-gray-200 p-3 rounded-full text-white ${
                    activeIndex >= index && "bg-slate-950"
                  }`}
                >
                  {item.icon}
                </div>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w-[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 align-middle ${
                    activeIndex - 1 >= index && "bg-slate-950"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-10 md:px-20 lg:px-44 mt-10 relative w-full">
        {activeIndex == 0 ? (
          <SelectCategory />
        ) : activeIndex == 1 ? (
          <Skill />
        ) : activeIndex == 2 ? (
          <Topics />
        ) : activeIndex == 3 ? (
          <SelectOptions />
        ) : null}
        <div className="fixed bottom-10 left-10">
          <Button
            disabled={activeIndex === 0}
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
        </div>
        <div className="fixed bottom-10 right-10">
          {activeIndex < 3 && (
            <Button
              onClick={() => setActiveIndex(activeIndex + 1)}
              disabled={checkStatus()}
            >
              <div className="flex items-center gap-2">
                <span>Next Step</span>
                <ChevronRight className="w-5 h-5" />{" "}
                {/* Adjust size as needed */}
              </div>
            </Button>
          )}
          {activeIndex === 3 && (
            <Button
              onClick={() => GenerateCourseLayout()}
              disabled={checkStatus()}
              className="flex items-center space-x-2"
            >
              <span>Generate Pathway</span>
              <div className="flex items-center justify-center w-5 h-5">
                <Bot className="w-4 h-4" />
              </div>
            </Button>
          )}
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
          <div className="flex flex-col items-center">
            {/* Loading spinner using the shadcn Spinner component */}
            <Spinner className="w-10 h-10 text-primary animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCourse;
