import CategoryList from "@/shared/CategoryList";
import React, { useContext } from "react";
import { UserInputContext } from "../context/UserInputContext";
import { CheckCircle } from "lucide-react"; // Imported icon

function SelectCategory() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput((prev) => ({
      ...prev,
      category: category,
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-5 md:px-20">
      {CategoryList.map((item, index) => (
        <div
          key={index}
          className={`flex flex-col items-start p-5 border rounded-xl cursor-pointer transition-transform transform hover:scale-105 hover:border-slate-950 shadom-sm ${
            userCourseInput?.category === item.name
              ? "bg-black text-white border-black"
              : "border-gray-300"
          }`}
          onClick={() => handleCategoryChange(item.name)}
        >
          <div className="flex items-center">
            <div
              className={`  mr-2 ${
                userCourseInput?.category === item.name
                  ? "text-white"
                  : "text-black"
              }`}
            >
              {item.icon}
            </div>
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </div>
          <p
            className={`text-sm text-primary text-start mt-2 ${
              userCourseInput?.category === item.name ? "text-white" : ""
            }`}
          >
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default SelectCategory;
