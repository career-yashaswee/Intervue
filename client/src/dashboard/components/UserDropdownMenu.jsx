import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCog, FaQuestionCircle, FaSignOutAlt, FaUser } from "react-icons/fa";
import { CircleUser, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
function UserDropdownMenu() {
  const navigate = useNavigate;
  const logout = () => {
    localStorage.clear();
    navigate("/log-in");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={"/profile"}>
          <DropdownMenuItem>
            <div className="flex items-center space-x-2">
              <FaUser className="w-3 h-3" />
              <span>Profile</span>
            </div>
          </DropdownMenuItem>
        </Link>

        <Link to={"/setting"}>
          <DropdownMenuItem>
            <div className="flex items-center space-x-2">
              <FaCog className="w-3 h-3" />
              <span>Settings</span>
            </div>
          </DropdownMenuItem>
        </Link>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <div className="flex items-center space-x-2">
            <FaQuestionCircle className="w-3 h-3" />
            <span>Support</span>
          </div>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => logout()}>
          <div className="flex items-center space-x-2">
            <FaSignOutAlt className="w-3 h-3" />
            <span>Logout</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserDropdownMenu;
