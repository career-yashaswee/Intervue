const express = require("express");
const { handleGetVoices } = require("../controllers/voice");

const router = express.Router();

router.get("/", handleGetVoices);

module.exports = router;
