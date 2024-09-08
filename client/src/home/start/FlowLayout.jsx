"use client";
import React, { useState } from "react";
import { OBInputContext } from "@/context/OBInputContext";

function FlowLayout({ children }) {
  const [OBInput, setOBInput] = useState(OBInputContext);
  return (
    <div>
      <OBInputContext.Provider value={{ OBInput, setOBInput }}>
        <>{children}</>
      </OBInputContext.Provider>
    </div>
  );
}

export default FlowLayout;
