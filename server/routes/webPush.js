const express = require("express");
const router = express.Router();
const pushController = require("../controllers/webPush");

router.post("/subscribe", pushController.subscribe);

module.exports = router;
