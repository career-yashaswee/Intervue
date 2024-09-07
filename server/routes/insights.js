const express = require("express");
const router = express.Router();
const { jobPostingsOverTime } = require("../controllers/insights");

router.post("/job/postdate", jobPostingsOverTime);
module.exports = router;
