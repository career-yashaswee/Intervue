const {
  pgTable,
  serial,
  varchar,
  json,
  integer,
  boolean,
} = require("drizzle-orm/pg-core");
const CourseList = pgTable("courseList", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  name: varchar("name").notNull(),
  category: varchar("category").notNull(),
  level: varchar("level").notNull(),
  courseLayout: json("courseLayout").notNull(),
  description: varchar("description").notNull(),
  duration: varchar("duration").notNull(),
  addVideos: varchar("addVideos").notNull(),
  createdBy: varchar("createdBy").notNull(),
  publish: boolean("publish").default(false),
  banner: varchar("banner").notNull().default("https://storage.cloud.google.com/intervue-resume/66a4f031f21f99255c1c24bb/course.png"),
});

const Chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  chapterId: integer("chapterId").notNull(),
  content: json("content").notNull(),
  videoId: varchar("videoId").notNull(),
});

module.exports = {
  CourseList,
  Chapters,
};
