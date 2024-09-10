import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const ClientAvatar = ({ username }) => {
  // Handle edge cases for initials
  const initials = username
    .trim()
    .split(" ")
    .map((name) => name[0]?.toUpperCase() || "") // Handle cases where the string is empty or too short
    .slice(0, 2) // Limit to the first two initials
    .join("");

  return (
    <div className="flex flex-col items-center">
      <Avatar className="w-16 h-16 rounded-lg overflow-hidden">
        <AvatarImage src="" alt={username} />
        <AvatarFallback className="flex items-center justify-center text-lg font-semibold bg-gray-200 text-gray-700">
          {initials || "?"} {/* Fallback to "?" if no initials */}
        </AvatarFallback>
      </Avatar>
      <span className="mt-2 text-sm text-gray-600">{username}</span>
    </div>
  );
};

export default ClientAvatar;
