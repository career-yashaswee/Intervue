import React, { useState, useEffect } from "react";
import { InteractiveBarChart } from "../componets/InteractiveBarChart";
import { fetchJobPostingsOverTime } from "@/helpers/insightAPI"; // Import the API function

const Widget = () => {
  const [jobPostingsOverTimeData, setJobPostingsOverTimeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data using the API function
        const data = await fetchJobPostingsOverTime("monthly"); // You can pass 'monthly', 'quarterly', etc. as the interval
        console.log(data);
        setJobPostingsOverTimeData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this useEffect runs once after initial render

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {/* Pass the fetched data to the InteractiveBarChart component as a prop */}
      <InteractiveBarChart
        data={jobPostingsOverTimeData}
        title={"Job Postings Over Time"}
        description={"Job Postings Over Time"}
      />
    </div>
  );
};

export default Widget;
