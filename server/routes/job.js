// routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const {
  createJob,
  updateJob,
  deleteJob,
  getJobByJobId,
  getAllJobs,
} = require("../controllers/job");

router.post("/", createJob);
router.put("/:jobId", updateJob);
router.delete("/:jobId", deleteJob);
router.get("/:jobId", getJobByJobId);
router.get("/", getAllJobs);
module.exports = router;
