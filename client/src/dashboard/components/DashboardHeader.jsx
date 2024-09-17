import React from "react";
import UserSheet from "./UserSheet";
import UserDropdownMenu from "./UserDropdownMenu";
import UserSearchBar from "./UserSearchBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Mail,
  Video,
  Star,
  MessageCircleQuestion,
  BookOpen,
} from "lucide-react";
import AskQuestionCard from "../community/components/AskQuestionCard";
import { motion } from "framer-motion";

const PillButton = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }} // Slightly increase size on hover
      whileTap={{ scale: 0.95 }} // Minimal pop effect on tap
      className="flex items-center bg-white py-1 px-4 rounded-sm cursor-pointer transition-all border-2 border-gray-100"
    >
      <Link
        to="https://intervue.gitbook.io/intervue"
        target="_blank"
        className="flex items-center"
      >
        <BookOpen className="w-4 h-4 mr-2 text-blue-500" />
        <span className="font-semibold text-gray-700">Read Docs</span>
      </Link>
    </motion.div>
  );
};

function DashboardHeader({
  view,
  icon,
  isSearchRequired = false,
  isMentorRequired = false,
  isJobieRequired = false,
  isAskQuestionRequired = false,
}) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px]">
      <div className="flex items-center space-x-1 bg-black text-white px-3 py-1 rounded-full hover:bg-opacity-80 transition duration-200">
        {icon && <div className="flex items-center">{icon}</div>}
        <span className="text-xl">{view}</span>
      </div>

      <UserSheet></UserSheet>
      {isSearchRequired ? (
        <UserSearchBar></UserSearchBar>
      ) : (
        <div className="w-full flex-1"></div>
      )}
      {isMentorRequired ? (
        <Link to="mentor">
          <div className="flex items-center space-x-2">
            <Link to="mentor">
              <Button variant="shine" className="flex items-center space-x-2">
                <Video className="h-5 w-5" /> {/* Adjust size as needed */}
                <span>Contact Mentor</span>
              </Button>
            </Link>
          </div>
        </Link>
      ) : null}

      {isJobieRequired ? (
        <div className="flex items-center space-x-2">
          <Button variant="shine" className="flex items-center space-x-2">
            <MessageCircleQuestion className="h-5 w-5" />{" "}
            {/* Adjust size as needed */}
            <span>Ask Jobie</span>
          </Button>
        </div>
      ) : null}

      {isAskQuestionRequired ? <AskQuestionCard /> : null}

      <UserSearchBar />
      <PillButton></PillButton>
      <UserDropdownMenu></UserDropdownMenu>
    </header>
  );
}

export default DashboardHeader;
