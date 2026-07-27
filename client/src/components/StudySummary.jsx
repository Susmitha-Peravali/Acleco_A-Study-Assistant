export default function StudySummary({ sessionData, flashcards, quizResults, streak, elapsedTime, onStartOver }) {
  const { score, total } = quizResults;
  const accuracy     = total > 0 ? Math.round((score / total) * 100) : 0;
  const learnedCount = flashcards.filter(fc => fc.learned).length;
  const passed       = accuracy >= 70;

  function formatTime(s) {
    if (s < 60) return `${s}s`;
    return `${Math.floor(s / 60)}m ${s % 60}s`;
  }

  const emoji   = accuracy >= 90 ? '🏆' : accuracy >= 70 ? '⭐' : '💪';
  const tagline = accuracy >= 90 ? 'Outstanding performance!' : accuracy >= 70 ? 'Great work — keep the momentum!' : 'Keep practicing — consistency is key.';

  /* Radial progress ring */
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (accuracy / 100) * circumference;

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Hero result */}
      <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
        <div className="anim-float" style={{ fontSize: '3rem', marginBottom: '1rem', lineHeight: 1 }}>{emoji}</div>

        <h2 className="sora" style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>Session Complete!</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)', marginBottom: '2rem' }}>{tagline}</p>

        {/* Radial ring */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ position: 'relative', width: '140px', height: '140px' }}>
            <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: 'rotate(-90deg)' }}>
              <circle className="ring-track" cx="70" cy="70" r={radius} strokeWidth="10" />
              <circle className="ring-fill" cx="70" cy="70" r={radius} strokeWidth="10"
                stroke={passed ? 'var(--em)' : 'var(--coral)'}
                strokeDasharray={circumference}
                strokeDashoffset={offset}
              />
            </svg>
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <span className="sora" style={{ fontSize: '2.25rem', fontWeight: 800, color: passed ? 'var(--em)' : 'var(--coral)', lineHeight: 1 }}>
                {accuracy}%
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '2px' }}>{score}/{total}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stat grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {[
          { icon: '📖', label: 'Cards Learned',  value: `${learnedCount}/${flashcards.length}` },
          { icon: '✍️', label: 'Quiz Score',      value: `${score}/${total}` },
          { icon: '🎯', label: 'Accuracy',        value: `${accuracy}%` },
          { icon: '⏱️', label: 'Time Spent',      value: formatTime(elapsedTime) },
        ].map((s, i) => (
          <div key={i} className="card anim-scale-in" style={{ padding: '1.25rem', animationDelay: `${i * 0.06}s` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <span style={{ fontSize: '14px' }}>{s.icon}</span>
              <span className="label">{s.label}</span>
            </div>
            <p className="sora" style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Streak */}
      {streak > 0 && (
        <div className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: 'var(--r-sm)',
            background: 'var(--amber-light)', border: '1px solid rgba(242,169,0,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', flexShrink: 0,
          }}>🔥</div>
          <div style={{ flex: 1 }}>
            <p className="sora" style={{ fontWeight: 700, fontSize: '0.95rem' }}>{streak} Day Streak!</p>
            <p style={{ fontSize: '0.78rem', color: 'var(--muted)', marginTop: '2px' }}>Come back tomorrow to keep it going.</p>
          </div>
          <span className="tag tag-amber" style={{ fontWeight: 700 }}>{streak}🔥</span>
        </div>
      )}

      {/* Topic */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <p className="label" style={{ marginBottom: '6px' }}>Topic Covered</p>
        <p className="sora" style={{ fontSize: '0.95rem', fontWeight: 600 }}>{sessionData.title}</p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button id="start-over-btn" onClick={onStartOver} className="btn btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', borderRadius: 'var(--r-lg)' }}>
          📝 Study a New Topic
        </button>
        <button id="retry-session-btn" onClick={() => window.location.reload()} className="btn btn-ghost" style={{ width: '100%', padding: '0.85rem' }}>
          ↻ Restart This Session
        </button>
      </div>
    </div>
  );
}
