require('dotenv').config();
const { callGemini } = require('./services/gemini');
const { extractJson } = require('./utils/jsonExtractor');
const { repairJson } = require('./utils/jsonRepairer');
const { validateStudySession } = require('./utils/validate');

async function testFull() {
  const notes = "Photosynthesis is the process by which plants use sunlight to synthesize foods from carbon dioxide and water. It involves chlorophyll and generates oxygen.";
  try {
    console.log("Calling Gemini...");
    const rawText = await callGemini(notes);
    console.log("Raw output length:", rawText.length);
    console.log("Raw Output:", rawText.slice(0, 100) + '...');
    
    console.log("Extracting JSON...");
    const jsonString = extractJson(rawText);
    
    console.log("Repairing JSON...");
    const repairedJson = repairJson(jsonString);
    
    console.log("Validating JSON...");
    const validation = validateStudySession(repairedJson);
    console.log("Validation Result:", validation.success ? "SUCCESS" : validation);
  } catch (e) {
    console.error("PIPELINE ERROR:", e);
  }
}

testFull();
