import React from "react";
import { createCheckoutSession } from "@/helpers/stripe";
import { Button } from "./ui/button";

const CheckoutButton = () => {
  const handleCheckoutSession = async () => {
    const response = await createCheckoutSession().then((res) => {
      window.location.href = res.url;
    });
    console.log(response);
  };

  return (
    <Button onClick={handleCheckoutSession} size="sm" className="w-full">
      Upgrade
    </Button>
  );
};

export default CheckoutButton;
