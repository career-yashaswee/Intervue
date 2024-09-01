import React from "react";
// Import the logo image
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react"; // Import an icon for the loading state

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading} onOpenChange={() => {}} className="">
      <AlertDialogOverlay className="bg-black bg-opacity-10 backdrop-blur-sm" />
      <AlertDialogContent>
        <div className="relative z-10 flex flex-col items-center">
          <Loader2 className="w-12 h-12 text-slate-950 animate-spin mb-4" />
          <h2 className="text-sm text-muted-foreground">
            Intervue Bots are generating the Pathway
          </h2>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LoadingDialog;
