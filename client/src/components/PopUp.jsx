import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogOverlay,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { clearSession } from "@/lib/appUtils";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { ShieldAlert } from "lucide-react";
import { Button } from "./ui/button";
const SessionExpiryPopup = ({ show, onClose, message }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    clearSession();
    onClose();
    navigate("/log-in");
  };

  if (!show) return null;

  return (
    <Dialog open={show}>
      <DialogOverlay className="bg-black bg-opacity-10 backdrop-blur-sm" />
      <DialogContent>
        <DialogHeader>
          <ShieldAlert></ShieldAlert>
        </DialogHeader>
        <DialogTitle className="text-xl font-bold gradient-text">
          Your Session has Expired
        </DialogTitle>
        <DialogDescription className="text-sm">{message}</DialogDescription>
        <DialogFooter>
          <Button variant="shine" className="" onClick={handleRedirect}>
            Sign In
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionExpiryPopup;
