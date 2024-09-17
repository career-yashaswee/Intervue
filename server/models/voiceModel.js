const { textToSpeech, getVoices: getVoiceAPI } = require("elevenlabs-node");
const dotenv = require("dotenv");

dotenv.config();

const elevenLabsApiKey = process.env.ELEVEN_LABS_API_KEY;
const voiceID = "EXAVITQu4vr4xnSDxMaL";

const getVoices = async (apiKey) => {
  return await getVoiceAPI(apiKey);
};

const textToSpeech2 = async (textInput, fileName) => {
  await textToSpeech(elevenLabsApiKey, voiceID, fileName, textInput);
};

module.exports = {
  getVoices,
  textToSpeech2,
};
