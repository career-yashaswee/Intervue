import { INSIGHTS_API_URI } from "@/routes/route-api";
import axios from "axios";

export const fetchJobPostingsOverTime = async (interval = "monthly") => {
  try {
    const API_URL = INSIGHTS_API_URI.JOB_POSTINGS_OVER_TIME(interval);

    // Create the config for the axios request
    const config = {
      method: "post",
      url: API_URL,
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Make the request to the backend API
    const response = await axios.request(config);
    return response.data;
  } catch (error) {
    console.error("Error fetching job postings over time:", error);
    throw error;
  }
};
