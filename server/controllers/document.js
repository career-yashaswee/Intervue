require("dotenv").config();
const multer = require("multer");
const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");
const path = require("path");
const { ask } = require("../api/gemini");
const keyFilePath = path.resolve(__dirname, "key.json");

// async function getAccessToken() {
//   try {
//     const auth = new GoogleAuth({
//       keyFile: keyFilePath,
//       scopes: ["https://www.googleapis.com/auth/cloud-platform"],
//     });

//     const client = await auth.getClient();
//     const token = await client.getAccessToken();
//     return token;
//   } catch (error) {
//     console.error("Failed to get access token:", error.message);
//     throw new Error("Failed to authenticate with Google API");
//   }
// }

const parseDocument = async (req, res, next) => {
  try {
    // Check if the file is uploaded
    if (!req.file) {
      return res.status(400).send({ error: "No file uploaded" });
    }

    // Get the base64 content of the uploaded file
    const fileBase64 = req.file.buffer.toString("base64");

    // Get the Google Auth Token
    const googleAuthToken =
      "ya29.a0AcM612wnKpu6GD6hoqAKVsTzta6s7SvB15mJI7Vk_F1b09Grh0L78p3_ecpkEEMmJ1wLGorjliO93_6_TZ_odyzD4MwxwsZx2ijrKj2aLN_tzXX86rrAOuvQLq5PliYPUX0kKdDcdTV8lGEoNG3DxG3iKbsyeV3y0qs4Yn9MjgaCgYKAZYSARMSFQHGX2MiQcXIV9SmwkXf6oV_MSBDfQ0177";
    // await getAccessToken();
    // Document AI API endpoint
    const apiUrl =
      "https://us-documentai.googleapis.com/v1/projects/18778878240/locations/us/processors/ce05d8118f415157:process";

    // Create the request payload
    const requestBody = {
      skipHumanReview: true,
      rawDocument: {
        mimeType: "application/pdf",
        content: fileBase64,
      },
    };

    // Send the request to Google Document AI
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        Authorization: `Bearer ${googleAuthToken}`,
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    const entities = response.data.document.entities.map((entity) => ({
      type: entity.type,
      mentionText: entity.mentionText,
    }));
    console.log(entities);
    // Combine all mention texts for AI processing
    const textToAnalyze = entities
      .map((entity) => `${entity.type}: ${entity.mentionText}`)
      .join("\n");
    console.log(textToAnalyze);
    // Define the prompt for Gemini
    const prompt = `
Extract the following details from the text provided below and format the output as pure JSON:
1. phone
2. email
3. name
4. about (if present)
5. experience: an array of objects with fields - title, company, joining_date, end_date, description, link (if available), skills (as an array)
6. education: an array of objects with fields - University Name, start_date, end_date, degree, specialisation, description
7. projects: an array of objects with fields - project_title, start_date, end_date, link (if available), skills (as an array)
8. courses: an array of objects with fields - title, organisation, grade, completed, end_date, link (if available)
9. skills: an array of objects with fields - category, name

Text to analyze:
${textToAnalyze}
`;

    const structuredData = await ask({
      prompt,
      tokens: 1000,
      format: "json",
    });
    console.log(structuredData);
    // Send the Document AI response back to the client
    res.status(200).send(structuredData);
  } catch (error) {
    console.error("Error processing document:", error.message);

    // Handle different error types
    if (error.response) {
      // Errors from the API
      res
        .status(error.response.status)
        .send({ error: error.response.data.error.message });
    } else if (error.request) {
      // Network or request errors
      res
        .status(500)
        .send({ error: "Failed to connect to Google Document AI API" });
    } else {
      // Other errors
      res.status(500).send({ error: error.message });
    }
  }
};

module.exports = {
  parseDocument,
};
