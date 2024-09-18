const {
  startChatSession,
  lipSyncMessage,
  audioFileToBase64,
  readJsonTranscript,
} = require("../models/aiModel.js");
const { voiceID, elevenLabsApiKey } = require("../models/voiceModel.js");
const { textToSpeech } = require("elevenlabs-node"); // Missing import added
const handleChat = async (req, res) => {
  const userMessage = req.body.message;
  console.log(userMessage);
  if (!userMessage) {
    res.send({
      messages: [
        {
          text: "Hey dear... How was your day?",
          audio: await audioFileToBase64("audios/intro_0.wav"),
          lipsync: await readJsonTranscript("audios/intro_0.json"),
          facialExpression: "smile",
          animation: "Talking_1",
        },
        {
          text: "I missed you so much... Please don't go for so long!",
          audio: await audioFileToBase64("audios/intro_1.wav"),
          lipsync: await readJsonTranscript("audios/intro_1.json"),
          facialExpression: "sad",
          animation: "Crying",
        },
      ],
    });
    return;
  }

  const result = await startChatSession(userMessage);
  let messages = result.response.text();
  console.log(messages);

  for (let i = 0; i < messages.length; i++) {
    const message = messages[i];
    const fileName = `audios/message_${i}.mp3`;
    const textInput = message.text;
    await textToSpeech(elevenLabsApiKey, voiceID, fileName, textInput);
    await lipSyncMessage(i);

    message.audio = await audioFileToBase64(fileName);
    message.lipsync = await readJsonTranscript(`audios/message_${i}.json`);
  }

  res.send({ messages });
};

module.exports = {
  handleChat,
};
