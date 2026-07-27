require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const modelsToTest = ['gemini-3.5-flash', 'gemini-3.6-flash', 'gemini-flash-latest'];
  
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
