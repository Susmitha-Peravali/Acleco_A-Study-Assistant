const { GoogleGenerativeAI } = require('@google/generative-ai');

// ── Gemini client (lazy-init so missing key fails at call time, not boot) ──
let genAI = null;

function getClient() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error('GEMINI_API_KEY is not set in environment variables.');
    genAI = new GoogleGenerativeAI(apiKey);
  }
  return genAI;
}

// ── System prompt ────────────────────────────────────────────────────────────
// This prompt is deliberately strict and explicit to maximise JSON reliability.
const SYSTEM_PROMPT = `You are a study material generator. Your ONLY job is to convert study notes into a structured JSON object.

STRICT RULES — follow every one without exception:
1. Return ONLY valid JSON. Nothing else.
2. Never include markdown, prose, explanations, or commentary.
3. Never wrap your output in \`\`\`json fences or any other code fences.
4. Do not include a preamble, title, or sign-off before or after the JSON.
5. Follow the schema below exactly — do not add or rename any fields.
6. If you are unsure about a field, leave it as an empty array []. Never invent information.
7. All flashcard questions and quiz questions MUST be directly based on the provided notes. Do not add outside knowledge.
8. Provide at least 5 flashcards and 4 quiz questions whenever the notes contain enough content.
9. Each quiz option array must contain exactly 4 options.
10. The correctAnswer value must exactly match one of the strings in the options array.

JSON SCHEMA:
{
  "title": "string — concise topic title derived from the notes",
  "keyTakeaways": ["string", "..."],
  "flashcards": [
    { "id": 1, "question": "string", "answer": "string" }
  ],
  "quiz": [
    {
      "id": 1,
      "question": "string",
      "options": ["string", "string", "string", "string"],
      "correctAnswer": "string — must exactly match one of the options"
    }
  ]
}`;

/**
 * Calls the Gemini API with the study notes and returns the raw text response.
 * @param {string} notes - The user's raw study notes
 * @returns {Promise<string>} Raw response text from Gemini
 */
async function callGemini(notes) {
  const modelName = process.env.MODEL_NAME || 'gemini-2.5-flash';
  const client    = getClient();

  const model = client.getGenerativeModel({
    model: modelName,
    // Instruct the model at the generation config level too
    generationConfig: {
      responseMimeType: 'application/json',
    },
    systemInstruction: SYSTEM_PROMPT,
  });

  const prompt = `Convert the following study notes into the required JSON format:\n\n${notes}`;

  const result = await model.generateContent(prompt);
  const text   = result.response.text();

  if (!text || text.trim() === '') {
    throw new Error('EMPTY_RESPONSE');
  }

  return text;
}

module.exports = { callGemini };
