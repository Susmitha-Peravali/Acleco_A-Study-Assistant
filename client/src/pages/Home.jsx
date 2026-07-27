import { useStudySession, SESSION_STATES } from '../hooks/useStudySession';
import Header        from '../components/Header';
import BgBlobs       from '../components/BgBlobs';
import ProgressBar   from '../components/ProgressBar';
import NotesInput    from '../components/NotesInput';
import Loader        from '../components/Loader';
import ErrorState    from '../components/ErrorState';
import MissionCard   from '../components/MissionCard';
import FlashcardList from '../components/FlashcardList';
import Quiz          from '../components/Quiz';
import StudySummary  from '../components/StudySummary';

const STATE_PROGRESS = {
  [SESSION_STATES.IDLE]:      0,
  [SESSION_STATES.LOADING]:   10,
  [SESSION_STATES.MISSION]:   20,
  [SESSION_STATES.FLASHCARD]: 45,
  [SESSION_STATES.QUIZ]:      70,
  [SESSION_STATES.REVIEW]:    85,
  [SESSION_STATES.SUMMARY]:   100,
};

const STEP_ORDER = [
  { key: SESSION_STATES.MISSION,   label: 'Mission',    emoji: '🎯' },
  { key: SESSION_STATES.FLASHCARD, label: 'Flashcards', emoji: '📖' },
  { key: SESSION_STATES.QUIZ,      label: 'Quiz',       emoji: '✍️' },
  { key: SESSION_STATES.SUMMARY,   label: 'Complete',   emoji: '✅' },
];

export default function Home() {
  const {
    sessionState, sessionData, flashcards, error, quizResults,
    streak, elapsedTime,
    generateSession, startFlashcards, startQuiz, startReview,
    completeQuiz, updateFlashcard, toggleLearned, reset,
  } = useStudySession();

  const isActive = sessionState !== SESSION_STATES.IDLE && sessionState !== SESSION_STATES.LOADING;
  const progress = STATE_PROGRESS[sessionState] ?? 0;

  function handleQuizComplete(score, total, wrongAnswers) {
    if (wrongAnswers.length > 0) startReview(wrongAnswers, score, total);
    else completeQuiz(score, total, []);
  }
  function handleReviewComplete(reviewScore) {
    const prev = quizResults ?? { score: 0, total: 0 };
    completeQuiz(prev.score + reviewScore, prev.total, []);
  }

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <BgBlobs />
      <Header streak={streak} />

      {/* Session progress strip */}
      {isActive && (
        <div style={{
          background: 'var(--surface-3)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          borderBottom: '1px solid var(--border)',
          padding: '0.875rem 2rem',
          position: 'relative', zIndex: 10,
        }}>
          <div style={{ maxWidth: '780px', margin: '0 auto' }}>
            {/* Step indicators */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
              {STEP_ORDER.map((step, i) => {
                const stepProg = STATE_PROGRESS[step.key];
                const done   = progress > stepProg;
                const active = sessionState === step.key || (sessionState === SESSION_STATES.REVIEW && step.key === SESSION_STATES.QUIZ);
                return (
                  <div key={step.key} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '5px',
                      padding: '4px 11px', borderRadius: '99px',
                      background: done ? 'var(--success-bg)' : active ? 'var(--em-light)' : 'transparent',
                      border: `1px solid ${done ? 'rgba(58,166,107,0.25)' : active ? 'var(--border-2)' : 'var(--border)'}`,
                      transition: 'all 350ms var(--ease)',
                    }}>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, color: done ? 'var(--success)' : active ? 'var(--em)' : 'var(--faint)' }}>
                        {done ? '✓' : step.emoji}
                      </span>
                      <span className="sora" style={{ fontSize: '0.68rem', fontWeight: 600, color: done ? 'var(--success)' : active ? 'var(--em)' : 'var(--faint)' }}>
                        {step.label}
                      </span>
                    </div>
                    {i < STEP_ORDER.length - 1 && (
                      <div style={{ width: '16px', height: '1.5px', borderRadius: '1px', background: done ? 'var(--success)' : 'var(--border)', transition: 'background 400ms' }} />
                    )}
                  </div>
                );
              })}
            </div>
            <ProgressBar percent={progress} />
          </div>
        </div>
      )}

      {/* Main content */}
      <main style={{ maxWidth: '780px', margin: '0 auto', padding: '2.5rem 1.5rem 5rem', position: 'relative', zIndex: 1 }}>

        {sessionState === SESSION_STATES.IDLE && (
          <>
            {error && <div style={{ marginBottom: '1.5rem' }}><ErrorState message={error.message} code={error.code} onRetry={() => {}} /></div>}
            <NotesInput onGenerate={generateSession} isLoading={false} />
          </>
        )}

        {sessionState === SESSION_STATES.LOADING && <Loader />}

        {sessionState === SESSION_STATES.MISSION && sessionData && (
          <MissionCard sessionData={sessionData} onStart={startFlashcards} />
        )}

        {sessionState === SESSION_STATES.FLASHCARD && (
          <FlashcardList flashcards={flashcards} onUpdate={updateFlashcard} onToggleLearned={toggleLearned} onStartQuiz={startQuiz} />
        )}

        {sessionState === SESSION_STATES.QUIZ && sessionData && (
          <Quiz questions={sessionData.quiz} onComplete={handleQuizComplete} isReview={false} />
        )}

        {sessionState === SESSION_STATES.REVIEW && quizResults?.reviewQuestions && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '44px', height: '44px', borderRadius: 'var(--r-sm)',
                background: 'var(--amber-light)', border: '1px solid rgba(242,169,0,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0,
              }}>🔁</div>
              <div>
                <p className="sora" style={{ fontSize: '0.9rem', fontWeight: 700 }}>Review Time</p>
                <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>
                  You missed {quizResults.reviewQuestions.length} question{quizResults.reviewQuestions.length !== 1 ? 's' : ''}. Let's try again.
                </p>
              </div>
            </div>
            <Quiz questions={quizResults.reviewQuestions} onComplete={handleReviewComplete} isReview={true} />
          </div>
        )}

        {sessionState === SESSION_STATES.SUMMARY && sessionData && (
          <StudySummary sessionData={sessionData} flashcards={flashcards} quizResults={quizResults} streak={streak} elapsedTime={elapsedTime} onStartOver={reset} />
        )}
      </main>
    </div>
  );
}
