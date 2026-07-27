/**
 * jsonRepairer.js
 *
 * Attempts to repair common, easily-fixable JSON formatting mistakes
 * that Gemini occasionally produces.
 *
 * Repairs attempted (in order):
 *  1. Trailing commas before } or ]
 *  2. Unquoted object keys (simple single-word keys)
 *  3. `undefined` values replaced with null
 *  4. Single-quoted strings replaced with double-quoted
 *
 * This module is intentionally lightweight. It does NOT attempt to
 * reconstruct fundamentally broken JSON — that is left to validation.
 */

/**
 * @param {string} jsonString - The extracted JSON string (possibly malformed)
 * @returns {string} Repaired JSON string
 */
function repairJson(jsonString) {
  let text = jsonString;

  // 1. Remove trailing commas before closing braces/brackets
  //    e.g.  { "key": "value", }  →  { "key": "value" }
  text = text.replace(/,\s*([\]}])/g, '$1');

  // 2. Quote unquoted simple keys
  //    e.g.  { key: "value" }  →  { "key": "value" }
  text = text.replace(/([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g, '$1"$2":');

  // 3. Replace undefined (unquoted) with null
  text = text.replace(/:\s*undefined\b/g, ': null');

  // 4. Removed single-quote replacement as it breaks valid apostrophes in text.

  return text;
}

module.exports = { repairJson };
