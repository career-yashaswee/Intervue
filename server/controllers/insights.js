const { getAllJobs, fetchJobs } = require("./job");

const jobPostingsOverTime = async (req, res) => {
  try {
    const { interval = "monthly" } = req.query; // Default to 'monthly' if no interval is provided

    // Validate the interval parameter
    const validIntervals = ["monthly", "quarterly", "yearly"];
    if (!validIntervals.includes(interval)) {
      return res.status(400).json({
        error:
          "Invalid interval specified. Use 'monthly', 'quarterly', or 'yearly'.",
      });
    }

    // Fetch job data from the database (replace with your actual data fetching logic)
    const jobs = await fetchJobs(); // Replace with your actual data fetching function

    if (!Array.isArray(jobs) || jobs.length === 0) {
      return res.status(404).json({ message: "No job postings found." });
    }

    // Calculate job postings over time based on the interval
    const jobCounts = {};

    jobs.forEach((job) => {
      const date = new Date(job.datePosted); // Convert the postDate string to a Date object
      if (isNaN(date)) {
        // Handle invalid date format
        console.warn(`Invalid postDate for job ID ${job.id}: ${job.postDate}`);
        return; // Skip this job if the date is invalid
      }

      let periodKey;
      if (interval === "monthly") {
        periodKey = `${date.getFullYear()}-${String(
          date.getMonth() + 1
        ).padStart(2, "0")}`;
      } else if (interval === "quarterly") {
        const quarter = Math.floor(date.getMonth() / 3) + 1;
        periodKey = `${date.getFullYear()}-Q${quarter}`;
      } else if (interval === "yearly") {
        periodKey = `${date.getFullYear()}`;
      }

      if (!jobCounts[periodKey]) {
        jobCounts[periodKey] = 0;
      }
      jobCounts[periodKey]++;
    });

    // Convert the object to an array for charting or further processing
    const result = Object.entries(jobCounts).map(([date, count]) => ({
      date,
      count,
    }));

    return res.status(200).json({ data: result });
  } catch (error) {
    console.error("Error fetching job postings:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  jobPostingsOverTime,
};
