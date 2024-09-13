import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // Import your Button component
import { Search } from "lucide-react"; // Assuming you're using lucide-react icons
import { AnimatePresence } from "framer-motion";
import CommandMenu from "@/components/command-menu/CommandMenu"; // Import your CommandMenu component

function UserSearchBar() {
  const [isCommandMenuOpen, setCommandMenuOpen] = useState(false);

  // Function to handle opening the CommandMenu
  const handleCommandMenuToggle = () => {
    setCommandMenuOpen((prev) => !prev);
  };

  // Function to handle keyboard shortcuts
  const handleKeyDown = (event) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault(); // Prevent the default behavior
      handleCommandMenuToggle();
    }
  };

  // Add and remove event listeners for the keyboard shortcut
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full flex-1">
      <Button
        variant="outline"
        className="w-full justify-start text-sm text-muted-foreground sm:w-64 lg:w-80"
        onClick={handleCommandMenuToggle} // Toggle CommandMenu on button click
      >
        <Search className="mr-2 h-4 w-4" />
        Type a command or Search
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 shadow-sm">
          <span className="text-xs mt-0.5">⌘</span>K
        </kbd>
      </Button>
      <AnimatePresence>
        {isCommandMenuOpen && (
          <CommandMenu
            open={isCommandMenuOpen}
            onOpenChange={setCommandMenuOpen}
          />
        )}{" "}
        {/* Conditionally render CommandMenu */}
      </AnimatePresence>
    </div>
  );
}

export default UserSearchBar;
