const posgresDB = require("../helpers/postgres");
const { CourseList } = require("../models/course/schema");
const { generateCourseLayout } = require("../api/ai/pathway/course");
const { and, eq } = require("drizzle-orm");

const genCourseLayout = async (req, res) => {
  try {
    const { courseRecipe } = req.body;
    const layout = await generateCourseLayout(courseRecipe);
    res.status(200).json({ layout: JSON.parse(layout) });
  } catch (error) {
    console.error("Error Generating Layout", error);
    res.status(500).json({ error: "ERR_GEN_LAYT" });
  }
};

const saveCourseLayout = async (req, res) => {
  try {
    const {
      courseId,
      name,
      category,
      level,
      courseLayout,
      description,
      duration,
      addVideos,
      createdBy,
    } = req.body;

    const result = await posgresDB.posgresDB.insert(CourseList).values({
      courseId,
      name,
      category,
      level,
      courseLayout,
      description,
      duration,
      addVideos,
      createdBy,
    });
    res.status(201).json({ courseId: courseId });
  } catch (e) {
    console.error("Error Saving Course", e);
    res.status(500).json({ error: "SRV_ERR" });
  }
};

const getCourseLayout = async (req, res, next) => {
  try {
    const { createdBy, courseId } = req.body;

    const result = await posgresDB.posgresDB
      .select()
      .from(CourseList)
      .where(
        and(
          eq(CourseList.createdBy, createdBy),
          eq(CourseList.courseId, courseId)
        )
      );
    if (result.length == 0) {
      res.status(400).json({ code: "LYT_NT_FND" });
    }
    res.status(200).json({ course: result });
  } catch (error) {
    if (!res.headersSent) {
      // Only send the error response if headers have not been sent
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error occurred but headers were already sent", error);
    }
  }
};

const getCourseByCreator = async (req, res, next) => {
  try {
    const { createdBy } = req.body; // Only need the createdBy field
    // Query to get all courses created by the specified user
    const result = await posgresDB.posgresDB
      .select()
      .from(CourseList)
      .where(
        and(eq(CourseList.createdBy, createdBy), eq(CourseList.publish, true))
      );

    if (result.length === 0) {
      return res.status(400).json({ code: "COU_NT_FND" });
    }

    res.status(200).json({ courses: result });
  } catch (error) {
    if (!res.headersSent) {
      // Only send the error response if headers have not been sent
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error occurred but headers were already sent", error);
    }
  }
};

const publishCourseById = async (req, res) => {
  try {
    const { courseId } = req.body; // The ID of the course to be published

    if (!courseId) {
      return res
        .status(400)
        .json({ code: "INVALID_ID", message: "Course ID is required" });
    }

    // Query to update the publish status of the course
    const result = await posgresDB.posgresDB
      .update(CourseList)
      .set({ publish: true })
      .where(eq(CourseList.courseId, courseId));

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ code: "COURSE_NOT_FOUND", message: "Course not found" });
    }

    res.status(200).json({ message: "Course successfully published" });
  } catch (error) {
    console.error(
      "Error occurred while updating course publish status:",
      error
    );
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error occurred but headers were already sent", error);
    }
  }
};

const updateLayout = async (req, res, next) => {
  const { id, ...updates } = req.body; // Extract the `id` and any other fields to be updated

  // Check if there's any field to update
  if (!id || Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ error: "Invalid request: missing ID or fields to update." });
  }

  try {
    const result = await posgresDB.posgresDB
      .update(CourseList)
      .set(updates) // Dynamically set the fields to update
      .where(eq(CourseList.courseId, id)) // Assume `id` is the unique identifier field
      .returning(); // Get the updated rows if needed

    res.status(200).json({ success: true, result });
  } catch (error) {
    if (!res.headersSent) {
      // Only send the error response if headers have not been sent
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error occurred but headers were already sent", error);
    }
  }
};

const deleteCourseByCourseId = async (req, res, next) => {
  try {
    const { courseId } = req.body; // Get courseId from the request body

    // Query to delete the course by the specified courseId
    const result = await posgresDB.posgresDB
      .delete(CourseList)
      .where(eq(CourseList.courseId, courseId));

    if (result.rowCount === 0) {
      return res
        .status(400)
        .json({ code: "COU_NT_FND", message: "Course not found." });
    }

    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error occurred but headers were already sent", error);
    }
  }
};

module.exports = {
  saveCourseLayout,
  genCourseLayout,
  getCourseLayout,
  updateLayout,
  getCourseByCreator,
  deleteCourseByCourseId,
  publishCourseById,
};
