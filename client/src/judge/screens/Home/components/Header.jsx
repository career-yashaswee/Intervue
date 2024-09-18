import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function Header({ openModal }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between pb-3 mb-4 border-b border-gray-200"
    >
      <h3 className="text-2xl font-semibold">
        My <span className="font-bold">Playground</span>
      </h3>
      <Button
        onClick={() =>
          openModal({
            show: true,
            modalType: 1,
            identifiers: { folderId: "", cardId: "" },
          })
        }
        variant="outline"
      >
        <PlusCircle className="w-4 h-4 mr-2" />
        New Folder
      </Button>
    </motion.div>
  );
}
