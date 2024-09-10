const { Server } = require("socket.io");
const Message = require("../models/Message");
const { handleSocketConnection } = require("../controllers/socket"); // Import socket event handlers
const {
  saveMessageToDatabase,
  fetchMissedMessagesForUser,
} = require("../utils/messageUtils");

const initializeSocket = (server) => {
  console.log("Socket Initialised");
  const io = new Server(server, {
    cors: {
      origin: "https://www.intervue.cloud/", // Update this to your client's URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    handleSocketConnection(io, socket);
    // Handle private messages
    // socket.on("private message", async ({ to, message }) => {
    //   console.log("Private message received:", { to, message });

    //   // Save message to database
    //   await saveMessageToDatabase({ from: socket.id, to, message });

    //   // Send message to recipient
    //   io.to(to).emit("private message", { from: socket.id, message });
    // });

    // Handle joining a room
    // socket.on("join", async (userId) => {
    //   socket.join(userId);
    //   console.log(`User ${socket.id} joined room ${userId}`);

    //   // Fetch and send missed messages on join
    //   const messages = await fetchMissedMessagesForUser(userId);
    //   socket.emit("missed messages", messages);
    // });

    // Handle disconnection
    // socket.on("disconnect", async () => {
    //   console.log("User disconnected:", socket.id);
    //   // Optionally handle any cleanup here
    // });
  });
};

module.exports = { initializeSocket };
