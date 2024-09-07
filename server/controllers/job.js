// controllers/jobController.js
const posgresDB = require("../helpers/postgres");
const { jobs } = require("../models/jobs/schema");
const { eq, and } = require("drizzle-orm");

const createJob = async (req, res) => {
  const {
    industryId,
    roleId,
    employerId,
    title,
    locationId,
    experienceLevel,
    salary,
    isRemote,
    companyType,
    educationRequired,
    datePosted,
    dateClosed,
    skillsRequired,
    certificationsRequired,
    status,
  } = req.body;

  if (!industryId || !roleId || !employerId || !title || !locationId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const newJob = await posgresDB.posgresDB.insert(jobs).values({
      industryId,
      roleId,
      employerId,
      title,
      locationId,
      experienceLevel,
      salary,
      isRemote,
      companyType,
      educationRequired,
      datePosted,
      dateClosed,
      skillsRequired,
      certificationsRequired,
      status,
    });

    res.status(201).json(newJob);
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateJob = async (req, res) => {
  const jobId = parseInt(req.params.id);
  const {
    industryId,
    roleId,
    employerId,
    title,
    locationId,
    experienceLevel,
    salary,
    isRemote,
    companyType,
    educationRequired,
    datePosted,
    dateClosed,
    skillsRequired,
    certificationsRequired,
    status,
  } = req.body;

  if (!jobId) {
    return res.status(400).json({ error: "Job ID is required" });
  }

  try {
    const job = await posgresDB.posgresDB
      .select(jobs)
      .where(eq(jobs.id, jobId))
      .first();

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await posgresDB.posgresDB
      .update(jobs)
      .set({
        industryId,
        roleId,
        employerId,
        title,
        locationId,
        experienceLevel,
        salary,
        isRemote,
        companyType,
        educationRequired,
        datePosted,
        dateClosed,
        skillsRequired,
        certificationsRequired,
        status,
      })
      .where(eq(jobs.id, jobId));

    res.status(200).json({ message: "Job updated successfully" });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteJob = async (req, res) => {
  console.log(req);
  const { jobId } = req.params;

  if (!jobId) {
    return res.status(400).json({ error: "Job ID is required" });
  }

  try {
    const job = await posgresDB.posgresDB
      .select(jobs)
      .where(eq(jobs.id, jobId))
      .first();

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    await posgresDB.posgresDB.delete(jobs).where(eq(jobs.id, jobId));

    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getJobByJobId = async (req, res) => {
  try {
    console.log(req);
    const { jobId } = req.params;
    console.log(jobId);
    if (!jobId) {
      return res.status(400).json({ error: "Job ID is required" });
    }
    // Fetch the job from the database
    const job = await posgresDB.posgresDB
      .select()
      .from(jobs)
      .where(eq(jobs.id, jobId));

    if (job.length === 0) {
      return res.status(404).send({ error: "Job not found" });
    }
    // Send the job data as the response
    res.status(200).send(job[0]);
  } catch (error) {
    console.error("Error fetching job:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchJobs = async () => {
  try {
    const jobss = await posgresDB.posgresDB.select().from(jobs);

    if (jobss.length === 0) {
      throw new Error("No jobs found"); // Throw an error to handle in the calling function
    }

    return jobss; // Return the jobs data
  } catch (error) {
    console.error("Error fetching jobs:", error.message);
    throw error; // Re-throw the error to be handled by the calling function
  }
};

const getAllJobs = async (req, res) => {
  try {
    const jobss = await fetchJobs();
    // Send the job data as the response
    res.status(200).send(jobss);
  } catch (error) {
    console.error("Error fetching job:", error.message);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

module.exports = {
  createJob,
  updateJob,
  deleteJob,
  getJobByJobId,
  getAllJobs,
  fetchJobs,
};
