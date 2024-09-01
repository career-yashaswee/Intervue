const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function generateCourseLayout(courseRecipe) {
  const genCourseLayout = model.startChat({
    generationConfig,
  });

  const result = await genCourseLayout.sendMessage(courseRecipe);
  return result.response.text();
}

async function generateChapterContent(skill, chapterName) {
  const genChapterContent = model.startChat({
    generationConfig,
  });

  const prompt = `Explain the concept on Skill: ${skill}, Chapter: ${chapterName}, in pure JSON format with an array of OBJECTS with field as 'title', 'description', 'code' field in <precode> format if applicable, strictly keep within 200 characters limit.`;

  const result = await genChapterContent.sendMessage(prompt);
  return result.response.text();
}

module.exports = { generateCourseLayout, generateChapterContent };
