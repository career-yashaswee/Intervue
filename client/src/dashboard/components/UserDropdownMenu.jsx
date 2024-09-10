import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { FaCog, FaQuestionCircle, FaSignOutAlt, FaUser } from "react-icons/fa";
import { CircleUser, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
function UserDropdownMenu() {
  const navigate = useNavigate();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const logout = () => {
    localStorage.clear();
    navigate("/log-in");
  };

  const handleLogoutConfirmation = () => {
    setIsDialogOpen(true);
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <div>
              {localStorage.getItem("user@first")}
              <div className="text-muted-foreground font-light">
                career.yashaswee...
              </div>
            </div>
          </DropdownMenuLabel>
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

          <DropdownMenuItem onClick={() => handleLogoutConfirmation()}>
            <div className="flex items-center space-x-2">
              <FaSignOutAlt className="w-3 h-3" />
              <span>Logout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50"></div>
      )}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="top-1/2 mx-auto max-w-md">
          <DialogTitle>Confirm Logout</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out?
          </DialogDescription>
          <DialogFooter>
            <Button variant="destructive" onClick={logout}>
              Log Out
            </Button>
            <DialogClose asChild>
              <Button variant="secondary">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UserDropdownMenu;
