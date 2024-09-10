const Message = require("../models/Message");

// Save a new message to the database
const saveMessage = async (req, res) => {
  const { from, to, message } = req.body;
  try {
    // Save the message to the database
    const newMessage = new Message({ from, to, message });
    await newMessage.save();
    res.status(201).json({ success: true, message: "Message saved" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to save message" });
  }
};

// Fetch chat history between two users
const getChatHistory = async (req, res) => {
  const { user1, user2 } = req.params;
  try {
    const messages = await Message.find({
      $or: [
        { $and: [{ from: user1 }, { to: user2 }] },
        { $and: [{ from: user2 }, { to: user1 }] },
      ],
    }).sort({ createdAt: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
};

module.exports = {
  saveMessage,
  getChatHistory,
};
