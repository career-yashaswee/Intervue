const multer = require("multer");

const express = require("express");
const { parseDocument } = require("../controllers/document");
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/parse", upload.single("file"), parseDocument);
module.exports = router;
