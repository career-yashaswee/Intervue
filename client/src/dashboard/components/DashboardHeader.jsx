import React from "react";
import UserSheet from "./UserSheet";
import UserDropdownMenu from "./UserDropdownMenu";
import UserSearchBar from "./UserSearchBar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, Video, Star, MessageCircleQuestion } from "lucide-react";
function DashboardHeader({
  view,
  icon,
  isSearchRequired = false,
  isMentorRequired = false,
  isJobieRequired = false,
}) {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
      <div className="flex items-center space-x-1 bg-black text-white px-3 py-1 rounded-full hover:bg-opacity-80 transition duration-200">
        {icon && <div className="flex items-center">{icon}</div>}
        <span className="text-xl">{view}</span>
      </div>

      <UserSheet></UserSheet>
      <div></div>
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

      <UserSearchBar />

      <UserDropdownMenu></UserDropdownMenu>
    </header>
  );
}

export default DashboardHeader;
