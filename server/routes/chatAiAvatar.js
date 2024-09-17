const express = require("express");
const { handleChat } = require("../controllers/chatAiAvatar");

const router = express.Router();

router.post("/", handleChat);

module.exports = router;
