const express = require("express");
const { getChatHistory, saveMessage } = require("../controllers/chat");

const router = express.Router();

router.get("/history/:user1/:user2", getChatHistory);
router.post("/messages", saveMessage);

module.exports = router;
