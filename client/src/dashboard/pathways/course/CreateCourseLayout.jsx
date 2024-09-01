"use client"
import React, { useState } from "react";
import { UserInputContext } from "./context/UserInputContext";

function CreateCourseLayout({ children }) {
  const [userCourseInput, setUserCourseInput] = useState();
    return (
    <div>
      <UserInputContext.Provider value={{userCourseInput, setUserCourseInput}}>
        <>{children}</>
      </UserInputContext.Provider>
    </div>
  );
}

export default CreateCourseLayout;
