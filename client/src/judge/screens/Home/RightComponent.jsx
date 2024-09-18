import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { ModalContext } from "@/judge/context/ModalContext";
import { PlaygroundContext } from "@/judge/context/PlaygroundContext";
import { useNavigate } from "react-router-dom";
import Header from "./components/Header";
import FolderSection from "./components/FolderSection";
import { Skeleton } from "@/components/ui/skeleton";

export default function RightComponent() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { openModal } = useContext(ModalContext);
  const { folders, deleteFolder, deleteCard } = useContext(PlaygroundContext);
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleDeleteFolder = (folderId) => {
    try {
      deleteFolder(folderId);
      toast({
        title: "Folder deleted",
        description: "The folder has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete folder. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteCard = (folderId, cardId) => {
    try {
      deleteCard(folderId, cardId);
      toast({
        title: "Playground deleted",
        description: "The playground has been successfully deleted.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete playground. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="absolute top-0 right-0 w-3/5 p-8 md:relative md:w-full md:p-4"
    >
      <Header openModal={openModal} />
      {isLoading ? (
        <SkeletonLoading />
      ) : (
        <AnimatePresence>
          {Object.entries(folders).map(([folderId, folder]) => (
            <FolderSection
              key={folderId}
              folderId={folderId}
              folder={folder}
              openModal={openModal}
              deleteFolder={handleDeleteFolder}
              deleteCard={handleDeleteCard}
              navigate={navigate}
            />
          ))}
        </AnimatePresence>
      )}
      <Toaster />
    </motion.div>
  );
}

function SkeletonLoading() {
  return (
    <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-1/4" />
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-20" />
            <Skeleton className="h-20" />
          </div>
        </div>
      ))}
    </div>
  );
}
