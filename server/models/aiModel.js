const { exec } = require("child_process");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs").promises;
const dotenv = require("dotenv");

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 500,
  responseMimeType: "application/json",
};

const startChatSession = (message) => {
  return model
    .startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [{ text: message }],
        },
      ],
    })
    .sendMessage(message);
};

const lipSyncMessage = async (message) => {
  const time = new Date().getTime();
  await execCommand(
    `ffmpeg -y -i audios/message_${message}.mp3 audios/message_${message}.wav`
  );
  await execCommand(
    `./bin/rhubarb -f json -o audios/message_${message}.json audios/message_${message}.wav -r phonetic`
  );
};

const execCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
};

const readJsonTranscript = async (file) => {
  const data = await fs.readFile(file, "utf8");
  return JSON.parse(data);
};

const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};

module.exports = {
  startChatSession,
  lipSyncMessage,
  audioFileToBase64,
  readJsonTranscript,
};
