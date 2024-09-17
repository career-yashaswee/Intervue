require("dotenv").config();
const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./lib/dbconnect");
const { Server } = require("socket.io");
const ACTIONS = require("./helpers/actions");
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
const documentRoutes = require("./routes/document");
const jobRoutes = require("./routes/job");
const insightsRoutes = require("./routes/insights");
const pushRoutes = require("./routes/webPush");
const chatRoutes = require("./routes/chatAiAvatar");
const voiceRoutes = require("./routes/voice");
// --- ROUTES ---

const bodyParser = require("body-parser");

const app = express();
const port = process.env.DEV_PORT || 3000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL, // Replace with your client’s URL
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {};
function getAllConnectedClients(roomId) {
  // Map
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("socket connected", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;
    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);
    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });

  socket.on(ACTIONS.CODE_CHANGE, ({ roomId, code }) => {
    socket.in(roomId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on(ACTIONS.SYNC_CODE, ({ socketId, code }) => {
    io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomId) => {
      socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
        socketId: socket.id,
        username: userSocketMap[socket.id],
      });
    });
    delete userSocketMap[socket.id];
    socket.leave();
  });
});

// Use CORS middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Adjust to your client’s URL
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

// Connect to MongoDB
connectDB();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

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
app.use("/document", documentRoutes);
app.use("/job", jobRoutes);
app.use("/insight", insightsRoutes);
app.use("/webpush", pushRoutes);
app.use("/chat", chatRoutes);
app.use("/voices", voiceRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
