import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CommandMenu({ open, onOpenChange }) {
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange((prevOpen) => !prevOpen);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onOpenChange]);

  const handleSelect = (value) => {
    switch (value) {
      case "calendar":
        navigate("/calendar");
        break;
      case "emoji":
        navigate("/emoji-search");
        break;
      case "calculator":
        navigate("/calculator");
        break;
      case "jobs":
        navigate("/jobs");
        break;
      case "pathway":
        navigate("/pathway");
        break;
      case "practice":
        navigate("/practice");
        break;
      case "generatePathway":
        navigate("/dashboard/cc");
      default:
        break;
    }
    onOpenChange(false); // Close the command dialog after selection
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem onSelect={() => handleSelect("calendar")}>
            Calendar
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("emoji")}>
            Search Emoji
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("calculator")}>
            Calculator
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Modules">
          <CommandItem onSelect={() => handleSelect("jobs")}>Jobs</CommandItem>
          <CommandItem onSelect={() => handleSelect("pathway")}>
            Pathway
          </CommandItem>
          <CommandItem onSelect={() => handleSelect("practice")}>
            Practice
          </CommandItem>
        </CommandGroup>
        
        <CommandGroup heading="Pathways">
          <CommandItem onSelect={() => handleSelect("generatePathway")}>
            Generate Pathways
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
