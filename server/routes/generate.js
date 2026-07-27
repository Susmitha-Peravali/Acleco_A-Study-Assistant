const express = require('express');
const router  = express.Router();

const { callGemini }         = require('../services/gemini');
const { extractJson }        = require('../utils/jsonExtractor');
const { repairJson }         = require('../utils/jsonRepairer');
const { validateStudySession } = require('../utils/validate');

/**
 * POST /api/generate
 *
 * Body: { notes: string }
 *
 * AI Response Pipeline:
 *   Gemini raw text
 *     → extractJson   (strip fences / surrounding text)
 *     → repairJson    (fix minor formatting issues)
 *     → validateStudySession (Zod schema check)
 *     → return clean structured data
 *
 * Error codes returned to client:
 *   INVALID_JSON     — could not extract valid JSON from AI response
 *   SCHEMA_MISMATCH  — JSON parsed but failed Zod validation
 *   EMPTY_RESPONSE   — AI returned nothing
 *   AI_ERROR         — Gemini API threw an error
 *   INVALID_INPUT    — missing or too-short notes
 */
router.post('/', async (req, res) => {
  const { notes } = req.body;

  // ── Input validation ───────────────────────────────────────────────────────
  if (!notes || typeof notes !== 'string' || notes.trim().length < 20) {
    return res.status(400).json({
      error: 'Please provide at least 20 characters of study notes.',
      code:  'INVALID_INPUT',
    });
  }

  // ── Pipeline ───────────────────────────────────────────────────────────────
  try {
    // 1. Call Gemini
    console.log(`[generate] Calling Gemini (${process.env.MODEL_NAME || 'gemini-2.5-flash'})…`);
    const rawText = await callGemini(notes.trim());
    console.log('[generate] Raw response received.');

    // 2. Extract JSON from raw text
    let jsonString;
    try {
      jsonString = extractJson(rawText);
    } catch (extractErr) {
      console.error('[generate] Extraction failed:', extractErr.message);
      return res.status(422).json({
        error: 'The AI returned an invalid response. Please try again.',
        code:  'INVALID_JSON',
      });
    }

    // 3. Repair minor JSON issues
    const repairedJson = repairJson(jsonString);

    // 4. Validate with Zod
    const validation = validateStudySession(repairedJson);

    if (!validation.success) {
      console.error(`[generate] Validation failed (${validation.code}):`, validation.message);

      const status  = validation.code === 'INVALID_JSON' ? 422 : 422;
      const message = validation.code === 'INVALID_JSON'
        ? 'The AI returned an invalid response. Please try again.'
        : 'The AI returned an unexpected response format. Please try again.';

      return res.status(status).json({
        error: message,
        code:  validation.code,
      });
    }

    // 5. Success — return clean data
    console.log(`[generate] Success — "${validation.data.title}" (${validation.data.flashcards.length} cards, ${validation.data.quiz.length} questions)`);
    return res.json({ data: validation.data });

  } catch (err) {
    // Handle specific known error codes thrown by services
    if (err.message === 'EMPTY_RESPONSE') {
      console.error('[generate] Empty response from Gemini.');
      return res.status(422).json({
        error: 'No flashcards could be generated. Try adding more detail to your notes.',
        code:  'EMPTY_RESPONSE',
      });
    }

    console.error('[generate] Unexpected error:', err.message);
    return res.status(500).json({
      error: 'An unexpected error occurred. Please try again.',
      code:  'AI_ERROR',
    });
  }
});

module.exports = router;
