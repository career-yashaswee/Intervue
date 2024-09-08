"use client";
import { Button } from "@/components/ui/button";
import {
  Badge,
  Book,
  Bot,
  ChevronLeft,
  ChevronRight,
  GoalIcon,
  LandPlot,
  Settings,
  SettingsIcon,
  SquareMousePointer,
  Star,
  StickyNote,
  SwatchBook,
  ThumbsUp,
} from "lucide-react";

import React, { useContext, useEffect, useState } from "react";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import Goal from "./components/Goal";
import UploadResume from "./components/UploadResume";
import Preferences from "./components/Preferences";
import RateYourself from "./components/RateYourself";
import Overview from "./components/Overview";

import { Spinner } from "@/components/ui/spinner";
import { OBInputContext } from "@/context/OBInputContext";

function Flow() {
  const navigate = useNavigate();
  const { OBInput, setOBInput } = useContext(OBInputContext);
  const [loading, setLoading] = useState(false);
  useEffect(() => {}, [OBInput]);

  const StepperOptions = [
    {
      id: 1,
      name: "Resume",
      icon: <StickyNote />,
    },
    {
      id: 2,
      name: "Goal",
      icon: <GoalIcon />,
    },
    {
      id: 3,
      name: "Preferences",
      icon: <SettingsIcon />,
    },
    {
      id: 4,
      name: "Rate",
      icon: <Star />,
    },
    {
      id: 5,
      name: "Overview",
      icon: <LandPlot />,
    },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  const handleOnBoarding = async () => {
    try {
      setLoading(true);
      navigate("/dashboard");
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
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
      (OBInput?.file == undefined || OBInput?.file?.length == 0)
    ) {
      return false;
    }

    if (
      activeIndex == 1 &&
      (OBInput?.goal?.length == 0 || OBInput?.goal == undefined)
    ) {
      return true;
    }
    if (
      activeIndex == 1 &&
      (OBInput?.time?.length == 0 || OBInput?.time == undefined)
    ) {
      return true;
    }
    // if (
    //   activeIndex == 2 &&
    //   (userCourseInput?.inclusiveTopic?.length == 0 ||
    //     userCourseInput?.inclusiveTopic == undefined)
    // ) {
    //   return true;
    // }
    // if (
    //   activeIndex == 2 &&
    //   (userCourseInput?.exclusiveTopic?.length == 0 ||
    //     userCourseInput?.exclusiveTopic == undefined)
    // ) {
    //   return true;
    // }
    // if (
    //   activeIndex == 3 &&
    //   (userCourseInput?.level?.length == 0 ||
    //     userCourseInput?.level == undefined)
    // ) {
    //   return true;
    // }
    // if (
    //   activeIndex == 3 &&
    //   (userCourseInput?.duration?.length == 0 ||
    //     userCourseInput?.duration == undefined)
    // ) {
    //   return true;
    // }
    // if (
    //   activeIndex == 3 &&
    //   (userCourseInput?.addVideos?.length == 0 ||
    //     userCourseInput?.addVideos == undefined)
    // ) {
    //   return true;
    // }
    // if (
    //   activeIndex == 3 &&
    //   (userCourseInput?.nChapters?.length == 0 ||
    //     userCourseInput?.nChapters == undefined)
    // ) {
    //   return true;
    // }
    return false;
  };

  return (
    <div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className="flex flex-col items-center min-h-screen">
        <h2 className="text-lg md:text-4xl font-bold gradient-text mb-10 mt-8"></h2>
        <div>
          <div className="flex items-center">
            {StepperOptions.map((item, index) => (
              <div key={index} className="inline-flex items-center">
                <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                  {/* Icon */}
                  <div
                    className={`bg-gray-200 p-3 rounded-full text-white h-12 w-12 flex items-center justify-center ${
                      activeIndex >= index ? "bg-slate-950" : ""
                    }`}
                  >
                    {item.icon}
                  </div>
                  {/* Stage Name */}
                  <div
                    className={`mt-2 text-center text-sm text-gray-300 ${
                      activeIndex >= index ? "text-slate-950" : ""
                    }`}
                  >
                    {item.name}
                  </div>
                </div>

                {/* Line connecting the steps, only show if not the last step */}
                {index !== StepperOptions.length - 1 && (
                  <div className="flex-1 h-1 mx-2 w-[50px] md:w-[100px] lg:w-[170px] rounded-full align-middle">
                    <div
                      className={`h-1 w-full rounded-full ${
                        activeIndex - 1 >= index
                          ? "bg-gradient-to-r from-gray-500 to-slate-950"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="px-15 md:px-20 lg:px-44 mt-20 relative w-full">
          {activeIndex == 0 ? (
            <UploadResume />
          ) : activeIndex == 1 ? (
            <Goal />
          ) : activeIndex == 2 ? (
            <Preferences />
          ) : activeIndex == 3 ? (
            <RateYourself />
          ) : activeIndex == 4 ? (
            <Overview />
          ) : null}
          <div className="fixed bottom-10 left-10">
            <Button
              disabled={activeIndex === 0}
              variant="outline"
              onClick={() => setActiveIndex(activeIndex - 1)}
            >
              <div className="flex items-center gap-2">
                <ChevronLeft className="w-5 h-5" />{" "}
                {/* Adjust size as needed */}
                <span>Previous</span>
              </div>
            </Button>
          </div>
          <div className="fixed bottom-10 right-10">
            {activeIndex < 4 && (
              <Button
                onClick={() => setActiveIndex(activeIndex + 1)}
                disabled={checkStatus()}
              >
                <div className="flex items-center gap-2 ">
                  <span>Next Step</span>
                  <ChevronRight className="w-5 h-5" />{" "}
                  {/* Adjust size as needed */}
                </div>
              </Button>
            )}
            {activeIndex === 4 && (
              <Button
                onClick={() => handleOnBoarding()}
                disabled={checkStatus()}
                className="flex items-center space-x-2"
              >
                <span>That's Perfect!</span>
                <div className="flex items-center justify-center w-5 h-5">
                  <ThumbsUp className="w-4 h-4" />
                </div>
              </Button>
            )}
          </div>
        </div>
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
            <div className="flex flex-col items-center">
              <Spinner className="w-10 h-10 text-primary animate-spin" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Flow;
