/**
 * jsonExtractor.js
 *
 * Extracts a raw JSON string from Gemini's output, which may contain:
 *  - Markdown code fences (```json ... ```)
 *  - Leading/trailing prose or whitespace
 *  - BOM characters
 */

/**
 * Strips markdown fences and trims surrounding non-JSON text,
 * leaving only the outermost JSON object.
 *
 * @param {string} raw - Raw text from the Gemini API
 * @returns {string} Extracted JSON string
 * @throws {Error} If no JSON object can be found in the input
 */
function extractJson(raw) {
  if (typeof raw !== 'string') {
    throw new Error('INVALID_INPUT: expected a string');
  }

  // 1. Remove UTF-8 BOM if present
  let text = raw.replace(/^\uFEFF/, '');

  // 2. Strip markdown code fences (```json ... ``` or ``` ... ```)
  text = text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');

  // 3. Find the first '{' and the last '}' to extract the JSON object
  const start = text.indexOf('{');
  const end   = text.lastIndexOf('}');

  if (start === -1 || end === -1 || end < start) {
    throw new Error('INVALID_JSON: no JSON object found in AI response');
  }

  return text.slice(start, end + 1);
}

module.exports = { extractJson };
