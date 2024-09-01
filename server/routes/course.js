const express = require("express");
const router = express.Router();
const {
  saveCourseLayout,
  genCourseLayout,
  getCourseLayout,
  updateLayout,
  getCourseByCreator,
  deleteCourseByCourseId,
  publishCourseById,
} = require("../controllers/course");
router.post("/save", saveCourseLayout);
router.post("/generate", genCourseLayout);
router.post("/get", getCourseLayout);
router.patch("/layout", updateLayout);
router.post("/get/course", getCourseByCreator);
router.post("/delete", deleteCourseByCourseId);
router.post("/publish",publishCourseById)
module.exports = router;
