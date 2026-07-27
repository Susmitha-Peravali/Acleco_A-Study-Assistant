const { z } = require('zod');

// ── Zod Schema ───────────────────────────────────────────────────────────────

const FlashcardSchema = z.object({
  id:       z.number().int().positive(),
  question: z.string().min(1, 'Flashcard question cannot be empty'),
  answer:   z.string().min(1, 'Flashcard answer cannot be empty'),
});

const QuizQuestionSchema = z.object({
  id:            z.number().int().positive(),
  question:      z.string().min(1, 'Quiz question cannot be empty'),
  options:       z.array(z.string().min(1)).length(4, 'Each quiz question must have exactly 4 options'),
  correctAnswer: z.string().min(1, 'correctAnswer cannot be empty'),
}).refine(
  (q) => q.options.includes(q.correctAnswer),
  { message: 'correctAnswer must exactly match one of the options' }
);

const StudySessionSchema = z.object({
  title:        z.string().min(1, 'Title cannot be empty'),
  keyTakeaways: z.array(z.string().min(1)).min(1, 'At least one key takeaway is required'),
  flashcards:   z.array(FlashcardSchema).min(1, 'At least one flashcard is required'),
  quiz:         z.array(QuizQuestionSchema).min(1, 'At least one quiz question is required'),
});

// ── Validator ────────────────────────────────────────────────────────────────

/**
 * Parses and validates a JSON string against the StudySession schema.
 *
 * @param {string} jsonString - The cleaned/repaired JSON string
 * @returns {{ success: true, data: StudySession } | { success: false, code: string, message: string }}
 */
function validateStudySession(jsonString) {
  // Step 1: Parse JSON
  let parsed;
  try {
    parsed = JSON.parse(jsonString);
  } catch (err) {
    return {
      success: false,
      code:    'INVALID_JSON',
      message: `JSON parse failed: ${err.message}`,
    };
  }

  // Step 2: Validate shape with Zod
  const result = StudySessionSchema.safeParse(parsed);

  if (!result.success) {
    const issues = result.error.issues
      .map((i) => `${i.path.join('.')} — ${i.message}`)
      .join('; ');

    return {
      success: false,
      code:    'SCHEMA_MISMATCH',
      message: `Schema validation failed: ${issues}`,
    };
  }

  return { success: true, data: result.data };
}

module.exports = { validateStudySession, StudySessionSchema };
