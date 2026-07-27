require('dotenv').config();
const { callGemini } = require('./services/gemini');
const { extractJson } = require('./utils/jsonExtractor');
const { repairJson } = require('./utils/jsonRepairer');
const { validateStudySession } = require('./utils/validate');

async function test() {
  const notes = "Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize foods from carbon dioxide and water. Photosynthesis in plants generally involves the green pigment chlorophyll and generates oxygen as a byproduct. The equation is 6CO2 + 6H2O -> C6H12O6 + 6O2. It happens in the chloroplasts.";
  try {
    const rawText = await callGemini(notes);
    console.log("RAW TEXT:\n", rawText);
    const jsonString = extractJson(rawText);
    const repairedJson = repairJson(jsonString);
    const validation = validateStudySession(repairedJson);
    console.log("\nVALIDATION RESULT:\n", JSON.stringify(validation, null, 2));
  } catch (e) {
    console.error("TEST FAILED:", e);
  }
}
test();
