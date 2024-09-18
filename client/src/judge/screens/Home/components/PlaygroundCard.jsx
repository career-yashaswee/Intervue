import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, BugPlay } from "lucide-react";

export default function PlaygroundCard({
  playgroundId,
  playground,
  folderId,
  deleteCard,
  openModal,
  navigate,
}) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Card
        className="cursor-pointer"
        onClick={() =>
          navigate(`/judge/playground/${folderId}/${playgroundId}`)
        }
      >
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center">
            <BugPlay className="w-6 h-6 mr-2" />
            <div>
              <p className="font-medium">{playground.title}</p>
              <p className="text-sm text-gray-500">
                Language: {playground.language}
              </p>
            </div>
          </div>
          <div
            className="flex items-center space-x-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteCard(folderId, playgroundId)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                openModal({
                  show: true,
                  modalType: 5,
                  identifiers: { folderId, cardId: playgroundId },
                })
              }
            >
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
