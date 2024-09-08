import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  BookMarked,
  Bot,
  BriefcaseBusiness,
  CircleUser,
  Command,
  FolderGit2,
  Hand,
  Layers2,
  LibraryBig,
  LineChart,
  Loader2,
  Menu,
  MessageCircleDashed,
  MessagesSquare,
  PanelsTopLeft,
  Paperclip,
  Pin,
  Radio,
  Route,
  Search,
  Smile,
  SquareAsterisk,
  SquareChevronLeft,
  Target,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import { getUserId } from "@/helpers/api";

import DashboardHeader from "@/dashboard/components/DashboardHeader";
import UpgradeCard from "@/dashboard/components/UpgradeCard";

import SearchJobs from "./components/SearchJobs";
import SavedJobs from "./components/JobSaved";
import JobTracker from "./components/JobTrackerDashboard";

const navItems = [
  { label: "Search", icon: <Search className="h-4 w-4" /> },
  { label: "Saved", icon: <Pin className="h-4 w-4" /> },
  { label: "Application", icon: <PanelsTopLeft className="h-4 w-4" /> },
];

function JobsPageLayout() {
  const [selectedComponent, setSelectedComponent] = useState("Search");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  getUserId(localStorage.getItem("token"));
  const userId = localStorage.getItem("_id");
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [selectedComponent]);

  const componentMap = {
    Search: <SearchJobs></SearchJobs>,
    Saved: <SavedJobs></SavedJobs>,
    Application: <JobTracker></JobTracker>,
  };

  const renderComponent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    const SelectedComponent = componentMap[selectedComponent] || <SearchJobs />;
    return SelectedComponent;
  };

  return (
    <div className="relative min-h-screen w-screen bg-white">
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r bg-muted/40 md:block">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
              <Link
                to="/dashboard"
                className="flex items-center gap-2 font-semibold"
              >
                <MessageCircleDashed className="h-6 w-6" />
                <span className="">Intervue</span>
              </Link>
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                {navItems.map((item, index) => (
                  <button
                    key={item.label}
                    onClick={() => setSelectedComponent(item.label)}
                    className={`flex items-center gap-3 px-3 py-2 transition-all ${
                      selectedComponent === item.label
                        ? "bg-primary text-muted"
                        : "bg-muted text-primary hover:text-primary"
                    } ${
                      index === 0 ? "rounded-tl-[12px] rounded-tr-[12px]" : "" // Rounded top for first item
                    } ${
                      index === navItems.length - 1
                        ? "rounded-bl-[12px] rounded-br-[12px]" // Rounded bottom for last item
                        : ""
                    }`}
                  >
                    {item.icon}
                    {item.name || item.label}
                  </button>
                ))}
              </nav>
            </div>
            <UpgradeCard></UpgradeCard>
          </div>
        </div>
        <div className="flex flex-col">
          <DashboardHeader
            view={"Jobs"}
            isJobieRequired="true"
          ></DashboardHeader>
          <div className="">{renderComponent()}</div>
        </div>
      </div>{" "}
    </div>
  );
}

export default JobsPageLayout;
