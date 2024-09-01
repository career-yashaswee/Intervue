import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { UserInputContext } from "../context/UserInputContext";

function SelectOptions() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleLevelChange = (level) => {
    setUserCourseInput((prev) => ({
      ...prev,
      level: level,
    }));
  };

  const handleDurationChange = (duration) => {
    setUserCourseInput((prev) => ({
      ...prev,
      duration: duration,
    }));
  };

  const handleVideoChange = (addVideos) => {
    setUserCourseInput((prev) => ({
      ...prev,
      addVideos: addVideos,
    }));
  };

  const handleChapterChange = (nChapters) => {
    setUserCourseInput((prev) => ({
      ...prev,
      nChapters: nChapters,
    }));
  };

  return (
    <div className="px-5 md:px-10 lg:px-20 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">
            Difficulty Level
          </label>
          <Select
            onValueChange={(value) => handleLevelChange(value)}
            defaultValue={userCourseInput?.level}
          >
            <SelectTrigger className="border rounded-md py-2 px-3 bg-white text-gray-800 shadow-sm hover:border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">
            Course Duration
          </label>
          <Select
            onValueChange={(value) => handleDurationChange(value)}
            defaultValue={userCourseInput?.duration}
          >
            <SelectTrigger className="border rounded-md py-2 px-3 bg-white text-gray-800 shadow-sm hover:border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
              <SelectItem value="Brief">Brief</SelectItem>
              <SelectItem value="Detailed">Detailed</SelectItem>
              <SelectItem value="Walkthrough">
                Walkthrough
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">
            Add Videos
          </label>
          <Select
            onValueChange={(value) => handleVideoChange(value)}
            defaultValue={userCourseInput?.addVideos}
          >
            <SelectTrigger className="border rounded-md py-2 px-3 bg-white text-gray-800 shadow-sm hover:border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent className="bg-white border border-gray-300 rounded-md shadow-lg mt-1">
              <SelectItem value="Yes">Yeah</SelectItem>
              <SelectItem value="No">Nah</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-2 text-gray-700">
            Length in Chapters
          </label>
          <Input
            type="number"
            onChange={(e) => handleChapterChange(e.target.value)}
            defaultValue={userCourseInput?.nChapters}
            className="border rounded-md py-2 px-3 bg-white text-gray-800 shadow-sm hover:border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>
      </div>
    </div>
  );
}

export default SelectOptions;
