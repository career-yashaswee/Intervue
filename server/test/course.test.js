// courseController.test.js
const {
  saveCourseLayout,
  genCourseLayout,
  getCourseLayout,
  updateLayout,
} = require("../controllers/course");
const posgresDB = require("../helpers/postgres");
const { generateCourseLayout } = require("../api/ai/pathway/course");

// Mock dependencies
jest.mock("../helpers/postgres");
jest.mock("../api/ai/pathway/course");

describe("Course Controller Tests", () => {
  let req, res;

  beforeEach(() => {
    req = { body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("genCourseLayout", () => {
    it("should generate course layout successfully", async () => {
      req.body.courseRecipe = { example: "recipe" };
      generateCourseLayout.mockResolvedValueOnce(
        JSON.stringify({ layout: "mock layout" })
      );

      await genCourseLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        layout: { layout: "mock layout" },
      });
    });

    it("should handle error when generating course layout", async () => {
      generateCourseLayout.mockRejectedValueOnce(new Error("Generation Error"));

      await genCourseLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "ERR_GEN_LAYT" });
    });
  });

  describe("saveCourseLayout", () => {
    it("should save course layout successfully", async () => {
      req.body = {
        courseId: "123",
        name: "Course Name",
        category: "Category",
        level: "Beginner",
        courseLayout: "Layout",
        description: "Description",
        duration: 120,
        addVideos: true,
        createdBy: "User1",
      };

      posgresDB.posgresDB.insert.mockResolvedValueOnce({});

      await saveCourseLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ courseId: "123" });
    });

    it("should handle error when saving course layout", async () => {
      posgresDB.posgresDB.insert.mockRejectedValueOnce(new Error("DB Error"));

      await saveCourseLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "SRV_ERR" });
    });
  });

  describe("getCourseLayout", () => {
    it("should return course layout successfully", async () => {
      req.body = { createdBy: "User1", courseId: "123" };
      posgresDB.posgresDB.select.mockResolvedValueOnce([{ courseId: "123" }]);

      await getCourseLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ course: [{ courseId: "123" }] });
    });

    it("should return error when course layout is not found", async () => {
      req.body = { createdBy: "User1", courseId: "123" };
      posgresDB.posgresDB.select.mockResolvedValueOnce([]);

      await getCourseLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ code: "LYT_NT_FND" });
    });

    it("should handle server error when fetching course layout", async () => {
      posgresDB.posgresDB.select.mockRejectedValueOnce(new Error("DB Error"));

      await getCourseLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        code: "SRV_ERR",
        error: expect.any(Error),
      });
    });
  });

  describe("updateLayout", () => {
    it("should update course layout successfully", async () => {
      req.body = { id: "123", name: "Updated Name" };
      posgresDB.posgresDB.update.mockResolvedValueOnce([{ courseId: "123" }]);

      await updateLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        result: [{ courseId: "123" }],
      });
    });

    it("should return error if no ID or fields to update", async () => {
      req.body = { name: "Updated Name" }; // Missing ID

      await updateLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Invalid request: missing ID or fields to update.",
      });
    });

    it("should handle error when updating layout", async () => {
      req.body = { id: "123", name: "Updated Name" };
      posgresDB.posgresDB.update.mockRejectedValueOnce(new Error("DB Error"));

      await updateLayout(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "DB Error" });
    });
  });
});
