const Message = require("../models/Message");

// Save a message to the database
const saveMessageToDatabase = async ({ from, to, message }) => {
  try {
    const newMessage = new Message({ from, to, message });
    await newMessage.save();
  } catch (er) {
    console.log(er);
  }
};

// Fetch missed messages for a user
const fetchMissedMessagesForUser = async (userId) => {
  const messages = await Message.find({
    $or: [{ from: userId }, { to: userId }],
  }).sort({ createdAt: 1 });
  return messages;
};

module.exports = { saveMessageToDatabase, fetchMissedMessagesForUser };
