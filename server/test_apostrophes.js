const { repairJson } = require('./utils/jsonRepairer');

const validJson = `{
  "title": "Cells",
  "keyTakeaways": ["It's a fact that it doesn't stop."]
}`;

console.log("Original:", validJson);
const repaired = repairJson(validJson);
console.log("Repaired:", repaired);

try {
  JSON.parse(repaired);
  console.log("Parse SUCCESS");
} catch (e) {
  console.log("Parse FAILED:", e.message);
}
