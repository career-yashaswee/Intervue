import React from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";

import {
  Logo,
  MainHeading,
  SubHeading,
  AddNewButton,
  SkeletonLoader,
} from "./components/Components";

export default function LeftComponent() {
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  React.useEffect(() => {
    // Simulating content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreatePlayground = () => {
    // Your logic for opening the modal goes here
    toast({
      title: "Creating new playground",
      description: "Your new playground is being set up.",
    });
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-2/5 h-screen bg-background flex justify-center items-center"
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="text-center">
        {isLoading ? (
          <SkeletonLoader />
        ) : (
          <>
            <Logo />
            <MainHeading />
            <SubHeading />
            <AddNewButton onClick={handleCreatePlayground} />
          </>
        )}
      </div>
    </motion.div>
  );
}
