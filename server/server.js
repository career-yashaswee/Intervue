require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./lib/dbconnect");
// --- ROUTES ---
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const scenarioRoutes = require("./routes/scenario");
const sessionRoutes = require("./routes/session");
const interviewRoutes = require("./routes/interview");
const resumeRoutes = require("./routes/resume");
const interviewerRoutes = require("./routes/interviewer");
const courseRoutes = require("./routes/course");
const chapterRoutes = require("./routes/chapter");
const bodyParser = require("body-parser");
// --- ROUTES ---

const app = express();
const port = process.env.DEV_PORT || 3000;


// Use CORS middleware
app.use(cors());

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json())

// Define routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/scenario", scenarioRoutes);
app.use("/session", sessionRoutes);
app.use("/interview", interviewRoutes);
app.use("/resume", resumeRoutes);
app.use("/interviewer", interviewerRoutes);
app.use("/course", courseRoutes);
app.use("/chapter", chapterRoutes);

// Configure multer for file uploads (if needed)
// const upload = multer({ dest: 'uploads/' });

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
