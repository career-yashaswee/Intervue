import Main from "@/components/gemini/main/Main";
import Sidebar from "@/components/gemini/sidebar/Sidebar";
import React from "react";

function Gemini() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50">
      <Sidebar />
      <Main />
    </div>
  );
}

export default Gemini;
