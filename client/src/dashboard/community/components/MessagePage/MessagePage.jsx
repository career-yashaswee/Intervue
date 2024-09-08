import React from "react";
import ChatScreen from "./components/ChatScreen";
import { RecentBar } from "./components/RecentBar";

function MessagePage() {
  return (
    <div className="flex">
      <div className="w-64">
        {" "}
        {/* Fixed width for RecentBar */}
        <RecentBar />
      </div>
      <div className="flex-1 overflow-y-auto ">
        {" "}
        {/* Flex-grow for ChatScreen */}
        <ChatScreen />
      </div>
    </div>
  );
}

export default MessagePage;
