import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Bot,
  CircleUser,
  Command,
  Hand,
  HeartHandshake,
  Layers2,
  LineChart,
  Loader2,
  Menu,
  MessageCircleDashed,
  MessagesSquare,
  Paperclip,
  Radio,
  Route,
  Search,
  Zap,
  Eye,
  ScanSearch,
  Telescope,
  ScanText,
  BriefcaseBusiness,
  ChevronLeftCircle,
  Dumbbell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUserId } from "@/helpers/api";
import DashboardHeader from "@/dashboard/components/DashboardHeader";

import { useNavigate } from "react-router-dom";
import MentorSessions from "./components/MentorSessions";
import MentorTasks from "./components/MentorTasks";
import MyMentor from "./components/MyMentor";
import MyReferrals from "./components/MyReferrals";
import MentorConnect from "./components/MentorConnect";
import { name } from "@stream-io/video-react-sdk";

const navItems = [
  {
    label: "MyMentor",
    icon: <Command className="h-4 w-4" />,
    name: "My Mentor",
  },
  {
    label: "MentorConnect",
    icon: <BriefcaseBusiness className="h-4 w-4" />,
    name: "Mentor Connect",
  },
  {
    label: "MentorSessions",
    icon: <Route className="h-4 w-4" />,
    name: "Sessions",
  },
  { label: "MentorTasks", icon: <Dumbbell className="h-4 w-4" /> },
  { label: "MyReferrals", icon: <Bot className="h-4 w-4" /> },
  {
    label: "Back",
    icon: <ChevronLeftCircle className="h-4 w-4" />,
    name: "Back to Home",
  },
];

function Mentor() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState("My Mentor");
  const [isLoading, setIsLoading] = useState(false);
  getUserId(localStorage.getItem("token"));
  const userId = localStorage.getItem("_id");
  useEffect(() => {
    setIsLoading(true);
    setIsLoading(false);
  }, [selectedComponent]);

  const componentMap = {
    MyMentor: <MyMentor />,
    MentorConnect: <MentorConnect />,
    MentorSessions: <MentorSessions />,
    MentorTasks: <MentorTasks />,
    MyReferrals: <MyReferrals />,
  };

  const renderComponent = () => {
    if (isLoading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    if (selectedComponent === "Back") {
      navigate("/");
    }
    const SelectedComponent = componentMap[selectedComponent] || <MyMentor />;
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
          </div>
        </div>
        <div className="flex flex-col">
          <DashboardHeader view={"Mentor"}></DashboardHeader>
          {renderComponent()}
        </div>
      </div>{" "}
    </div>
  );
}

export default Mentor;
