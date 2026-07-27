require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const modelsToTest = ['gemini-1.5-flash', 'gemini-1.5-flash-latest', 'gemini-1.5-pro', 'gemini-2.0-flash', 'gemini-pro'];
  
  for (const modelName of modelsToTest) {
    try {
      console.log(`Testing ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Hello, return the word JSON");
      console.log(`✅ ${modelName} Success:`, result.response.text().trim());
      break; // Stop if we find a working one
    } catch (e) {
      console.log(`❌ ${modelName} Failed:`, e.message);
    }
  }
}
testModels();
