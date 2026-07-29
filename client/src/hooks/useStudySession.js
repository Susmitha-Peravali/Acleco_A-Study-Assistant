import { useState, useRef, useCallback } from 'react';
import { generateStudySession } from '../services/api';

// ── Constants ────────────────────────────────────────────────────────────────
const STREAK_KEY   = 'study_assistant_streak';
const LAST_KEY     = 'study_assistant_last_date';

// Session states — drives the entire app flow
export const SESSION_STATES = {
  IDLE:      'idle',
  LOADING:   'loading',
  MISSION:   'mission',
  FLASHCARD: 'flashcard',
  QUIZ:      'quiz',
  REVIEW:    'review',
  SUMMARY:   'summary',
};

// ── Streak helpers ────────────────────────────────────────────────────────────
function getStreak() {
  const streak   = parseInt(localStorage.getItem(STREAK_KEY) || '0', 10);
  const lastDate = localStorage.getItem(LAST_KEY);
  const today    = new Date().toDateString();

  if (lastDate === today) return streak; // already updated today

  const yesterday = new Date(Date.now() - 86400000).toDateString();
  if (lastDate === yesterday) return streak; // will increment on complete

  return 0; // streak broken
}

function incrementStreak() {
  const today = new Date().toDateString();
  const last  = localStorage.getItem(LAST_KEY);
  if (last === today) return getStreak(); // already counted today

  const currentStreak = getStreak();
  const newStreak     = currentStreak + 1;
  localStorage.setItem(STREAK_KEY, String(newStreak));
  localStorage.setItem(LAST_KEY, today);
  return newStreak;
}

// ── Custom hook ───────────────────────────────────────────────────────────────
/**
 * useStudySession
 *
 * Manages the complete study session lifecycle:
 *  - State machine (idle → loading → mission → flashcard → quiz → review → summary)
 *  - API calls with AbortController (stale request prevention)
 *  - Session data (flashcards editable by user before quiz)
 *  - Timer, streak, and goal tracking
 */
export function useStudySession() {
  const [sessionState, setSessionState] = useState(SESSION_STATES.IDLE);
  const [sessionData,  setSessionData]  = useState(null);   // validated AI data
  const [flashcards,   setFlashcards]   = useState([]);     // editable copy
  const [error,        setError]        = useState(null);   // { message, code }
  const [quizResults,  setQuizResults]  = useState(null);   // { score, total, wrong[] }
  const [streak,       setStreak]       = useState(getStreak);
  const [startTime,    setStartTime]    = useState(null);
  const [elapsedTime,  setElapsedTime]  = useState(0);

  // Ref to abort in-flight requests
  const abortControllerRef = useRef(null);
  // Ref to last submitted notes, so a retry doesn't need the user to retype
  const lastNotesRef = useRef('');

  // ── Generate session ───────────────────────────────────────────────────────
  const generateSession = useCallback(async (notes) => {
    lastNotesRef.current = notes;

    // Cancel any previous in-flight request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setError(null);
    setSessionState(SESSION_STATES.LOADING);
    setStartTime(Date.now());

    try {
      const result = await generateStudySession(notes, controller.signal);

      // If request was aborted (stale), ignore the response
      if (controller.signal.aborted) return;

      // Store validated data; create an editable copy of flashcards
      setSessionData(result.data);
      setFlashcards(
        result.data.flashcards.map((fc) => ({ ...fc, learned: false }))
      );
      setSessionState(SESSION_STATES.MISSION);

    } catch (err) {
      if (err.name === 'CanceledError' || err.name === 'AbortError') return;

      const serverError = err.response?.data;
      setError({
        message: serverError?.error || 'Unable to connect. Please check your connection and retry.',
        code:    serverError?.code  || 'NETWORK_ERROR',
      });
      setSessionState(SESSION_STATES.IDLE);
    }
  }, []);

  // ── Retry ──────────────────────────────────────────────────────────────────
  const retryGeneration = useCallback(() => {
    if (lastNotesRef.current) generateSession(lastNotesRef.current);
  }, [generateSession]);

  // ── Navigation ─────────────────────────────────────────────────────────────
  const startFlashcards = useCallback(() => setSessionState(SESSION_STATES.FLASHCARD), []);
  const startQuiz       = useCallback(() => setSessionState(SESSION_STATES.QUIZ), []);
  const startReview     = useCallback((wrongQuestions, score, total) => {
    setSessionState(SESSION_STATES.REVIEW);
    // Store initial quiz score + wrong questions so Review can render them
    setQuizResults({ score: score ?? 0, total: total ?? 0, wrongQuestions, reviewQuestions: wrongQuestions });
  }, []);

  // ── Quiz completion ────────────────────────────────────────────────────────
  const completeQuiz = useCallback((score, total, wrongQuestions) => {
    const elapsed = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    setElapsedTime(elapsed);
    setQuizResults({ score, total, wrongQuestions, reviewQuestions: [] });
    setSessionState(SESSION_STATES.SUMMARY);
    const newStreak = incrementStreak();
    setStreak(newStreak);
  }, [startTime]);

  // ── Flashcard edit ─────────────────────────────────────────────────────────
  const updateFlashcard = useCallback((id, field, value) => {
    setFlashcards((prev) =>
      prev.map((fc) => (fc.id === id ? { ...fc, [field]: value } : fc))
    );
  }, []);

  const toggleLearned = useCallback((id) => {
    setFlashcards((prev) =>
      prev.map((fc) => (fc.id === id ? { ...fc, learned: !fc.learned } : fc))
    );
  }, []);

  // ── Reset ──────────────────────────────────────────────────────────────────
  const reset = useCallback(() => {
    setSessionState(SESSION_STATES.IDLE);
    setSessionData(null);
    setFlashcards([]);
    setError(null);
    setQuizResults(null);
    setStartTime(null);
    setElapsedTime(0);
  }, []);

  return {
    sessionState,
    sessionData,
    flashcards,
    error,
    quizResults,
    streak,
    elapsedTime,
    // Actions
    generateSession,
    retryGeneration,
    startFlashcards,
    startQuiz,
    startReview,
    completeQuiz,
    updateFlashcard,
    toggleLearned,
    reset,
  };
}
