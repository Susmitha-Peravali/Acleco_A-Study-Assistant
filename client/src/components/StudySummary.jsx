export default function StudySummary({ sessionData, flashcards, quizResults, streak, elapsedTime, onStartOver }) {
  const { score, total, reviewQuestions = [] } = quizResults || { score: 0, total: 0 };
  const accuracy     = total > 0 ? Math.round((score / total) * 100) : 0;
  const learnedCount = flashcards.filter(fc => fc.learned).length;
  const passed       = accuracy >= 70;

  function formatTime(s) {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  }

  const emoji   = accuracy >= 90 ? '🏆' : accuracy >= 70 ? '⭐' : '💪';
  const tagline = accuracy >= 90 ? 'Outstanding mastery!' : accuracy >= 70 ? 'Great progress — momentum built!' : 'Keep practicing — mastery is a loop.';

  /* AI Learning Insights extraction from session content */
  const masteredConcepts = sessionData.keyTakeaways.slice(0, 2);
  const reviewConcepts   = reviewQuestions.length > 0
    ? reviewQuestions.map(q => q.question.slice(0, 45) + '...')
    : [sessionData.keyTakeaways[2] || 'Advanced concepts'];

  /* Radial progress ring */
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>

      {/* Hero result */}
      <div className="card glass" style={{ padding: '3rem 2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="anim-float" style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: 1 }}>{emoji}</div>

        <h2 className="satoshi" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>Great Work!</h2>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', marginBottom: '2.5rem' }}>{tagline}</p>

        {/* Radial ring */}
        <div style={{ position: 'relative', width: '160px', height: '160px', marginBottom: '1.5rem' }}>
          <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: 'rotate(-90deg)' }}>
            <circle className="ring-track" cx="80" cy="80" r={radius} strokeWidth="12" />
            <circle className="ring-fill" cx="80" cy="80" r={radius} strokeWidth="12"
              stroke={passed ? 'var(--em)' : 'var(--orange)'}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span className="satoshi" style={{ fontSize: '2.75rem', fontWeight: 900, color: passed ? 'var(--em)' : 'var(--orange)', lineHeight: 1 }}>
              {accuracy}%
            </span>
            <span className="satoshi" style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--muted)', marginTop: '4px' }}>{score}/{total} Score</span>
          </div>
        </div>
      </div>

      {/* Stat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem' }}>
        {[
          { icon: '📖', label: 'Cards Mastered', value: `${learnedCount}/${flashcards.length}` },
          { icon: '✍️', label: 'Quiz Score',     value: `${score}/${total}` },
          { icon: '🎯', label: 'Accuracy',       value: `${accuracy}%` },
          { icon: '⏱️', label: 'Study Time',     value: formatTime(elapsedTime) },
        ].map((s, i) => (
          <div key={i} className="card anim-scale-in" style={{ padding: '1.5rem', animationDelay: `${i * 0.08}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <span style={{ fontSize: '18px' }}>{s.icon}</span>
              <span className="satoshi" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</span>
            </div>
            <p className="satoshi" style={{ fontSize: '1.75rem', fontWeight: 900 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* ─── AI Learning Insights Card ─── */}
      <div className="card glass anim-fade-up d2" style={{ padding: '2rem', borderLeft: '4px solid var(--em)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
          <span style={{ fontSize: '24px' }}>💡</span>
          <div>
            <h3 className="satoshi" style={{ fontSize: '1.2rem', fontWeight: 900 }}>Personalized Learning Insights</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Built from your quiz & flashcard performance</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {/* Mastered */}
          <div style={{ background: 'var(--surface-2)', padding: '1.25rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
            <span className="satoshi" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>
              ✓ Mastered Concepts
            </span>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
              {masteredConcepts.map((m, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-2)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span style={{ color: 'var(--success)', fontWeight: 800 }}>•</span> {m}
                </li>
              ))}
            </ul>
          </div>

          {/* Needs Review */}
          <div style={{ background: 'var(--surface-2)', padding: '1.25rem', borderRadius: 'var(--r-md)', border: '1px solid var(--border)' }}>
            <span className="satoshi" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>
              ⚠ Recommended Practice
            </span>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
              {reviewConcepts.map((r, i) => (
                <li key={i} style={{ fontSize: '0.9rem', color: 'var(--text-2)', display: 'flex', alignItems: 'flex-start', gap: '6px' }}>
                  <span style={{ color: 'var(--orange)', fontWeight: 800 }}>•</span> {r}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button id="start-over-btn" onClick={onStartOver} className="btn btn-primary" style={{ flex: 1, padding: '1.15rem', fontSize: '1.05rem' }}>
          Study a New Topic →
        </button>
        <button id="retry-session-btn" onClick={() => window.location.reload()} className="btn btn-secondary" style={{ padding: '1.15rem 1.75rem', fontSize: '1.05rem' }}>
          ↻ Restart Session
        </button>
      </div>
    </div>
  );
}
