const { eq, and } = require("drizzle-orm");
const posgresDB = require("../helpers/postgres");
const { Chapters } = require("../models/course/schema");
const { generateChapterContent } = require("../api/ai/pathway/course");

const markChapters = async (req, res) => {
  try {
    const { chapterId, courseId, content, videoId } = req.body;

    const result = await posgresDB.posgresDB.insert(Chapters).values({
      chapterId,
      courseId,
      content,
      videoId,
    });

    if (result.rowCount === 0) {
      return res
        .status(500)
        .json({ code: "INSERT_FAILED", message: "Failed to insert chapter" });
    }
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Error occurred while inserting chapter:", error);
    if (!res.headersSent) {
      res.status(500).json({ error: error.message });
    } else {
      console.error("Error occurred but headers were already sent", error);
    }
  }
};

const getChaptersByCourseId = async (req, res) => {
  const { courseId } = req.params;
  try {
    const chapters = await posgresDB.posgresDB
      .select()
      .from(Chapters)
      .where(eq(courseId, Chapters.courseId))
      .orderBy("chapterId", "asc"); // Fetch in ascending order of chapterId
    res.status(200).json({ success: true, chapters });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// API to fetch a specific chapter by courseId and chapterId
const getChapterByCourseAndChapterId = async (req, res) => {
  const { courseId, chapterId } = req.params;
  console.log(req.params);

  try {
    const chapter = await posgresDB.posgresDB
      .select()
      .from(Chapters)
      .where(
        and(eq(Chapters.courseId, courseId), eq(Chapters.chapterId, chapterId))
      );

    if (chapter.length == 0) {
      res.status(404).json({ error: "Chapter not found" });
    } else {
      res.status(200).json({ success: true, chapter });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const generateContent = async (req, res) => {
  try {
    const { skill, chapterName } = req.body;
    const content = await generateChapterContent(skill, chapterName);
    res.status(200).json({ content: JSON.parse(content) });
  } catch (error) {
    console.error("Error Generating Content", error);
    res.status(500).json({ error: "ERR_GEN_CNT", content });
  }
};

module.exports = {
  markChapters,
  getChaptersByCourseId,
  getChapterByCourseAndChapterId,
  generateContent,
};
