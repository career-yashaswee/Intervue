const express = require("express");
const {
  uploadResume,
  downloadResume,
  listResume,
  uploadGuestResume,
} = require("../controllers/resume");
const router = express.Router();
const multer = require("multer");
const { authenticate } = require("../middlewares/auth");

const storage = multer.memoryStorage();

const upload = multer({ storage });

router.post("/", authenticate, upload.single("file"), uploadResume);

router.post("/guest", upload.single("file"), uploadGuestResume);

router.get("/download", authenticate, downloadResume);
router.get("/:_id", authenticate, listResume);

module.exports = router;
