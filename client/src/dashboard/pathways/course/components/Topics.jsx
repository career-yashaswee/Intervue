import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";
import { UserInputContext } from "../context/UserInputContext";

function Topics() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleITopicChange = (inclusiveTopic) => {
    setUserCourseInput((prev) => ({
      ...prev,
      inclusiveTopic: inclusiveTopic,
    }));
  };

  const handleETopicChange = (exclusiveTopic) => {
    setUserCourseInput((prev) => ({
      ...prev,
      exclusiveTopic: exclusiveTopic,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center  p-5">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topics to Include
          </label>
          <Textarea
            placeholder="We'll make sure, we give special emphasis on topics mentioned here"
            onChange={(e) => handleITopicChange(e.target.value)}
            defaultValue={userCourseInput?.inclusiveTopic}
            rows={4}
            className="w-full resize-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topics to Exclude
          </label>
          <Textarea
            placeholder="There's no way, we'll ever refer to the topics mentioned here"
            onChange={(e) => handleETopicChange(e.target.value)}
            defaultValue={userCourseInput?.exclusiveTopic}
            rows={4}
            className="w-full resize-none"
          />
        </div>
      </div>
    </div>
  );
}

export default Topics;
