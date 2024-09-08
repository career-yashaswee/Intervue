import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/ui/mode-toggle";
import { ChevronRight, MessageCircleDashed } from "lucide-react"; // Import the desired icon

const Navbar = () => {
  return (
    <div className="relative z-10">
      <nav className="backdrop-filter backdrop-blur-lg fixed top-0 left-0 right-0">
        <div className="container mx-auto flex justify-between items-center py-4">
          <div className="flex items-center text-lg font-bold">
            <MessageCircleDashed className="mr-2" /> Intervue.cloud
          </div>
          <div className="space-x-4 flex items-center">
            <Link to="/dashboard" className="hover:text-gray-500">
              <Button
                variant="expandIcon"
                Icon={ChevronRight}
                iconPlacement="right"
                className=""
              >
                Dashboard
              </Button>
            </Link>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
