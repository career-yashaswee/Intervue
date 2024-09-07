import axios from "axios"; // Ensure axios is imported
import { JOBS_API_URI } from "@/routes/route-api";

export const fetchAllJobs = async () => {
  try {
    const config = {
      method: "get",
      url: JOBS_API_URI.FETCH_ALL_JOBS, // Endpoint for fetching jobs
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error Fetching Jobs", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};

export const fetchJobById = async (jobId) => {
  try {
    const config = {
      method: "get",
      url: JOBS_API_URI.FETCH_JOB_BY_ID(jobId), // Endpoint for fetching a job by ID
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(config);
    return response.data; // Return the data from the response
  } catch (error) {
    console.error("Error Fetching Job by ID", error);
    throw error; // Re-throw the error to handle it in the calling function
  }
};
