import { useState } from "react";
import { MoreVertical, Pin, BellOff } from "lucide-react";

export function ChatItem({ chat, onPin, onMute }) {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => setMenuVisible(!menuVisible);

  return (
    <div className="relative flex items-center p-4 hover:bg-gray-100">
      {/* Chat Content */}
      <div className="flex-grow">
        <h2 className="text-lg font-semibold">{chat.name}</h2>
        <p className="text-sm text-gray-500">{chat.lastMessage}</p>
      </div>

      {/* Three-dot Menu (MoreVertical) */}
      <div
        className="relative"
        onMouseEnter={() => setMenuVisible(true)}
        onMouseLeave={() => setMenuVisible(false)}
      >
        <MoreVertical
          className="cursor-pointer text-gray-400"
          size={24}
          onClick={toggleMenu}
        />
        {menuVisible && (
          <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-10">
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
              onClick={onPin}
            >
              <Pin className="mr-2" /> {chat.pinned ? "Unpin" : "Pin"}
            </button>
            <button
              className="flex items-center w-full px-4 py-2 hover:bg-gray-100"
              onClick={onMute}
            >
              <BellOff className="mr-2" /> {chat.muted ? "Unmute" : "Mute"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
