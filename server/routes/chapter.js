const express = require("express");
const router = express.Router();
const {
  markChapters,
  getChaptersByCourseId,
  getChapterByCourseAndChapterId,
  generateContent,
} = require("../controllers/chapter");

router.post("/chapter", markChapters);
router.get("/:courseId/:chapterId", getChapterByCourseAndChapterId);
router.get("/:courseId", getChaptersByCourseId);
router.post("/generate", generateContent);
module.exports = router;
