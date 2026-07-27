require('dotenv').config();
process.env.MODEL_NAME = 'gemini-3.6-flash'; // Override for this test
const { callGemini } = require('./services/gemini');
const { extractJson } = require('./utils/jsonExtractor');
const { repairJson } = require('./utils/jsonRepairer');
const { validateStudySession } = require('./utils/validate');

async function testFull() {
  const notes = "Photosynthesis is the process by which plants use sunlight to synthesize foods from carbon dioxide and water. It involves chlorophyll and generates oxygen.";
  try {
    console.log("Calling Gemini 3.6...");
    const rawText = await callGemini(notes);
    console.log("Raw output length:", rawText.length);
    console.log("Extracting JSON...");
    const jsonString = extractJson(rawText);
    const repairedJson = repairJson(jsonString);
    const validation = validateStudySession(repairedJson);
    console.log("Validation Result:", validation.success ? "SUCCESS" : validation);
  } catch (e) {
    console.error("PIPELINE ERROR:", e);
  }
}

testFull();
