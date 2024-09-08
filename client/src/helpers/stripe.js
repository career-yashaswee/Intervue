import { STRIPE_API_URI } from "@/routes/route-api";
// services/stripe.js
import axios from "axios";

const createCheckoutSession = async () => {
  try {
    const response = await axios.post(STRIPE_API_URI.CREATE_CHECKOUT_SESSION);
    return response.data; // Return the response data
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error; // Propagate the error to be handled by the caller
  }
};

export { createCheckoutSession };
