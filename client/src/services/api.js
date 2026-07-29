import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api`;

/**
 * Generates a study session from raw notes.
 *
 * @param {string} notes - The user's study notes
 * @param {AbortSignal} signal - AbortController signal for stale request cancellation
 * @returns {Promise<{ data: StudySession }>}
 * @throws Axios error with error.response.data containing { error, code }
 */
export async function generateStudySession(notes, signal) {
  const response = await axios.post(
    `${BASE_URL}/generate`,
    { notes },
    { signal }
  );
  return response.data; // { data: StudySession }
}
