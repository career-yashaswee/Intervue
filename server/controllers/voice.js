const { getVoices, elevenLabsApiKey } = require("../models/voiceModel.js");

const handleGetVoices = async (req, res) => {
  const voices = await getVoices(elevenLabsApiKey);
  res.send(voices);
};

module.exports = {
  handleGetVoices,
};
