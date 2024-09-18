import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Copy, LogOut, MessageCircleDashed, Users } from "lucide-react"; // Example icons, replace if needed
import Client from "./ClientAvatar";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

const SideBar = ({ clients, copyRoomId, leaveRoom }) => {


  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-4 flex flex-col">
      {/* Connected Clients Header */}
      <div className="flex items-center mb-4">
        <Users className="w-5 h-5 text-gray-900 mr-2" />{" "}
        {/* Icon from lucide-react */}
        <h3 className="text-lg font-semibold text-gray-900">Connected</h3>
      </div>

      {/* Clients List */}
      <ScrollArea className="flex-grow mb-4">
        <div className="space-y-2">
          {clients?.map((client) => (
            <Client key={client.socketId} username={client?.username} />
          ))}
        </div>
      </ScrollArea>

      {/* Action Buttons */}
      <div className="mt-auto space-y-2">
        <Button
          variant="outline"
          className="w-full flex items-center justify-center text-black border-black"
          onClick={copyRoomId} // Implement copyRoomId function
        >
          <Copy className="w-4 h-4 mr-2" />
          Copy Room ID
        </Button>
        <Button
          variant="destructive"
          className="w-full flex items-center justify-center text-white bg-black"
          onClick={leaveRoom} // Implement leaveRoom function
        >
          <LogOut className="w-4 h-4 mr-2" />
          Leave
        </Button>
      </div>
    </div>
  );
};

export default SideBar;
