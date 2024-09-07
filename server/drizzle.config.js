/** @type { import("drizzle-kit").Config } */
export default {
  schema: ["./models/course/schema.js", "./models/jobs/schema.js"],
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DRIZZLE_DATABASE_URL,
  },
};
