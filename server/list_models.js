require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  try {
    // The SDK might not have a direct listModels, but we can try to fetch via REST if needed.
    // However, let's try calling gemini-1.5-flash again just to be sure it wasn't a transient error.
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data = await response.json();
    console.log("AVAILABLE MODELS:", data.models.map(m => m.name).join(', '));
  } catch (e) {
    console.error("FAILED:", e.message);
  }
}
listModels();
