import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Folder, Trash2, Edit, PlusCircle } from "lucide-react";
import PlaygroundCard from "./PlaygroundCard";

export default function FolderSection({
  folderId,
  folder,
  openModal,
  deleteFolder,
  deleteCard,
  navigate,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-200">
        <h4 className="flex items-center text-lg font-medium">
          <Folder className="w-5 h-5 mr-2" />
          {folder.title}
        </h4>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteFolder(folderId)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              openModal({
                show: true,
                modalType: 4,
                identifiers: { folderId, cardId: "" },
              })
            }
          >
            <Edit className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              openModal({
                show: true,
                modalType: 2,
                identifiers: { folderId, cardId: "" },
              })
            }
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            New Playground
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(folder.playgrounds).map(
          ([playgroundId, playground]) => (
            <PlaygroundCard
              key={playgroundId}
              playgroundId={playgroundId}
              playground={playground}
              folderId={folderId}
              deleteCard={deleteCard}
              openModal={openModal}
              navigate={navigate}
            />
          )
        )}
      </div>
    </motion.div>
  );
}
