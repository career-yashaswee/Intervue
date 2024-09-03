// schema.js
import { pgTable, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { serial, json, integer, boolean } from "drizzle-orm/pg-core";
// Define the "chats" table schema
export const chats = pgTable("chats", {
  key: varchar("key").notNull(),
  message: varchar("message").notNull(),
  sender: varchar("sender").notNull(),
  receiver: varchar("receiver").notNull(),
  timeStamp: timestamp("timeStamp").notNull(),
  info: jsonb("info").notNull(),
});

// Define the "users" table schema
export const users = pgTable("users", {
  ethAddress: varchar("ethAddress").primaryKey(),
  activeChat: varchar("activeChat").notNull(),
  name: varchar("name").notNull(),
});

export const CourseList = pgTable("courseList", {
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
  banner: varchar("banner")
    .notNull()
    .default(
      "https://storage.cloud.google.com/intervue-resume/66a4f031f21f99255c1c24bb/course.png"
    ),
});

export const Chapters = pgTable("chapters", {
  id: serial("id").primaryKey(),
  courseId: varchar("courseId").notNull(),
  chapterId: integer("chapterId").notNull(),
  content: json("content").notNull(),
  videoId: varchar("videoId").notNull(),
});
