import { useStudySession, SESSION_STATES } from '../hooks/useStudySession';
import Header        from '../components/Header';
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

  // Determine layout class based on state
  let layoutClass = 'layout-idle';
  if (sessionState === SESSION_STATES.LOADING) layoutClass = 'layout-generating';
  else if (isActive && sessionState !== SESSION_STATES.SUMMARY) layoutClass = 'layout-learning';
  else if (sessionState === SESSION_STATES.SUMMARY) layoutClass = 'layout-summary';

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div className="ambient-bg" />
      <Header streak={streak} />

      {/* Progress Strip for active sessions */}
      {isActive && (
        <div className="anim-fade-in" style={{
          position: 'sticky', top: '72px', zIndex: 100,
          background: 'var(--surface-3)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border)', padding: '1rem 2rem'
        }}>
          <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span className="satoshi" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Session Progress</span>
              <span className="satoshi" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--em)' }}>{progress}%</span>
            </div>
            <ProgressBar percent={progress} />
          </div>
        </div>
      )}

      {/* Main Adaptive Layout */}
      <main style={{ padding: '3rem 2rem 6rem', position: 'relative', zIndex: 1 }}>
        <div className={`layout-adaptive ${layoutClass}`}>

          {/* ─── LEFT COLUMN (Context) ─── */}
          {layoutClass === 'layout-learning' && (
            <aside className="anim-fade-up d1" style={{ position: 'sticky', top: '140px' }}>
              {sessionData && <MissionCard sessionData={sessionData} onStart={() => {}} readonly />}
            </aside>
          )}

          {/* ─── CENTER COLUMN (Primary Workspace) ─── */}
          <div className="workspace-center anim-fade-up d2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            
            {sessionState === SESSION_STATES.IDLE && (
              <div style={{ width: '100%' }}>
                {error && <div style={{ marginBottom: '2rem' }}><ErrorState message={error.message} code={error.code} onRetry={() => {}} /></div>}
                <NotesInput onGenerate={generateSession} isLoading={false} />
              </div>
            )}

            {sessionState === SESSION_STATES.LOADING && (
              <div style={{ width: '100%', marginTop: '4rem' }}>
                <Loader />
              </div>
            )}

            {sessionState === SESSION_STATES.MISSION && sessionData && (
              <div style={{ width: '100%', maxWidth: '800px' }}>
                <div className="glass" style={{ padding: '3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '64px', height: '64px', background: 'var(--em-light)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🎯</div>
                  <h2 className="satoshi" style={{ fontSize: '1.75rem', fontWeight: 900 }}>Your Session is Ready</h2>
                  <p style={{ color: 'var(--muted)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: '500px' }}>
                    We've extracted {sessionData.flashcards?.length || 0} key concepts and built a personalized quiz from your material.
                  </p>
                  <button onClick={startFlashcards} className="btn btn-primary" style={{ marginTop: '1rem', padding: '1rem 2rem', fontSize: '1.05rem' }}>
                    Begin Flashcards
                  </button>
                </div>
              </div>
            )}

            {sessionState === SESSION_STATES.FLASHCARD && (
              <div style={{ width: '100%', maxWidth: '780px' }}>
                <FlashcardList flashcards={flashcards} onUpdate={updateFlashcard} onToggleLearned={toggleLearned} onStartQuiz={startQuiz} />
              </div>
            )}

            {sessionState === SESSION_STATES.QUIZ && sessionData && (
              <div style={{ width: '100%', maxWidth: '780px' }}>
                <Quiz questions={sessionData.quiz} onComplete={handleQuizComplete} isReview={false} />
              </div>
            )}

            {sessionState === SESSION_STATES.REVIEW && quizResults?.reviewQuestions && (
              <div style={{ width: '100%', maxWidth: '780px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className="glass anim-shake" style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '16px', borderLeft: '4px solid var(--amber)' }}>
                  <div style={{ fontSize: '28px' }}>🔁</div>
                  <div>
                    <h3 className="satoshi" style={{ fontSize: '1.1rem', fontWeight: 800 }}>Targeted Review</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--muted)', marginTop: '4px' }}>
                      Let's strengthen your understanding on the {quizResults.reviewQuestions.length} concept{quizResults.reviewQuestions.length !== 1 ? 's' : ''} you missed.
                    </p>
                  </div>
                </div>
                <Quiz questions={quizResults.reviewQuestions} onComplete={handleReviewComplete} isReview={true} />
              </div>
            )}

            {sessionState === SESSION_STATES.SUMMARY && sessionData && (
              <div style={{ width: '100%' }}>
                <StudySummary sessionData={sessionData} flashcards={flashcards} quizResults={quizResults} streak={streak} elapsedTime={elapsedTime} onStartOver={reset} />
              </div>
            )}

          </div>

          {/* ─── RIGHT COLUMN (Stats) ─── */}
          {layoutClass === 'layout-learning' && (
            <aside className="anim-fade-up d3" style={{ position: 'sticky', top: '140px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="card" style={{ padding: '1.5rem' }}>
                <h4 className="satoshi" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Today's Goal</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px' }}>🌱</span>
                  </div>
                  <div>
                    <div className="satoshi" style={{ fontSize: '1rem', fontWeight: 800 }}>Keep Growing</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>Master 1 new topic</div>
                  </div>
                </div>
              </div>

              <div className="card" style={{ padding: '1.5rem' }}>
                <h4 className="satoshi" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem' }}>Study Streak</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--amber-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px' }}>🔥</span>
                  </div>
                  <div>
                    <div className="satoshi" style={{ fontSize: '1.5rem', fontWeight: 900, lineHeight: 1 }}>{streak}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-2)' }}>Active Days</div>
                  </div>
                </div>
              </div>
            </aside>
          )}
        </div>
      </main>
    </div>
  );
}
