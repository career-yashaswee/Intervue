import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";
import { UserInputContext } from "../context/UserInputContext";

function Skill() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleSkillChange = (skill) => {
    setUserCourseInput((prev) => ({
      ...prev,
      skill: skill,
    }));
  };

  const handleDescriptionChange = (description) => {
    setUserCourseInput((prev) => ({
      ...prev,
      description: description,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Skill
          </label>
          <Input
            placeholder="What are you learning today?"
            onChange={(e) => handleSkillChange(e.target.value)}
            defaultValue={userCourseInput?.skill}
            className="w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Textarea
            placeholder="Describe your skill in detail, more the better"
            onChange={(e) => handleDescriptionChange(e.target.value)}
            defaultValue={userCourseInput?.description}
            className="w-full h-40"
          />
        </div>
      </div>
    </div>
  );
}

export default Skill;
