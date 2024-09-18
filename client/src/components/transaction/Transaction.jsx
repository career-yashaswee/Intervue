"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  ArrowLeft,
  Clock,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const MotionCard = motion(Card);

const confettiConfig = {
  particleCount: 100,
  spread: 70,
  origin: { y: 0.6 },
};

// interface TransactionResultProps {
//   success: boolean
//   amount: number
//   currency: string
//   recipient: string
//   transactionId: string
//   onBackToDashboard: () => void
// }

const TransactionResult = ({
  success,
  amount,
  currency,
  recipient,
  transactionId,
  onBackToDashboard,
}) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (success) {
      setShowConfetti(true);
      confetti(confettiConfig);
    }
  }, [success]);

  const currentDate = new Date();

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { type: "spring", stiffness: 200, damping: 10 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.5 } },
  };

  return (
    <AnimatePresence mode="wait">
      <MotionCard
        key={success ? "success" : "failure"}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="w-full max-w-md mx-auto overflow-hidden shadow-lg"
      >
        <CardHeader className="relative pt-16 pb-4">
          <motion.div
            variants={iconVariants}
            initial="hidden"
            animate="visible"
            className="absolute top-4 left-1/2 transform -translate-x-1/2"
          >
            {success ? (
              <CheckCircle className="w-24 h-24 text-green-500" />
            ) : (
              <XCircle className="w-24 h-24 text-red-500" />
            )}
          </motion.div>
          <CardTitle className="text-2xl font-bold text-center mt-8">
            {success ? "Transaction Successful" : "Transaction Failed"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <div className="inline-flex items-center justify-center bg-primary/10 rounded-full p-4">
              <DollarSign className="w-8 h-8 text-primary mr-2" />
              <span className="text-4xl font-bold text-primary">
                {amount} {currency}
              </span>
            </div>
            <p className="text-gray-500 mt-2">Sent to {recipient}</p>
          </motion.div>
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            className="bg-secondary/20 p-4 rounded-lg"
          >
            <p className="text-sm font-medium text-secondary-foreground">
              Transaction ID: {transactionId}
            </p>
            <div className="flex justify-between mt-2 text-sm text-secondary-foreground/70">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {format(currentDate, "MMM dd, yyyy")}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {format(currentDate, "HH:mm:ss")}
              </div>
            </div>
          </motion.div>
        </CardContent>
        <CardFooter className="pt-2 pb-4">
          <Button
            onClick={onBackToDashboard}
            className="w-full"
            variant={success ? "default" : "destructive"}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </CardFooter>
      </MotionCard>
      {showConfetti && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 pointer-events-none"
        >
          {[...Array(50)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute w-2 h-2 bg-primary rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: -10,
                opacity: 1,
              }}
              animate={{
                y: window.innerHeight + 10,
                opacity: 0,
              }}
              transition={{
                duration: Math.random() * 2 + 1,
                repeat: Infinity,
                repeatDelay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function TransactionResultPage({ transactionSuccess = false }) {
  const navigate = useNavigate();
  const handleBackToDashboard = () => {
    // Implement actual navigation logic here
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-secondary/20 p-4">
      <TransactionResult
        success={transactionSuccess}
        amount={20}
        currency="USD"
        recipient="Intervue"
        transactionId="TXN123456789"
        onBackToDashboard={handleBackToDashboard}
      />
    </div>
  );
}
