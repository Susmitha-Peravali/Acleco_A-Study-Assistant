export default function MissionCard({ sessionData, onStart }) {
  const { title, keyTakeaways, flashcards, quiz } = sessionData;
  const estMinutes = Math.ceil((flashcards.length * 0.5) + (quiz.length * 0.75));

  const goals = [
    { emoji: '📖', label: `Study ${flashcards.length} flashcard${flashcards.length !== 1 ? 's' : ''}` },
    { emoji: '✍️', label: `Complete ${quiz.length}-question quiz` },
    { emoji: '🎯', label: 'Score at least 80% accuracy' },
    { emoji: '🔁', label: 'Review any incorrect answers' },
  ];

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Hero */}
      <div className="card" style={{ padding: '2.5rem 2rem', textAlign: 'center' }}>
        <div className="tag tag-em" style={{ marginBottom: '1rem' }}>
          🎯 Today's Mission
        </div>
        <h2 className="sora" style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
          {title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
          {[
            { icon: '📖', val: `${flashcards.length} cards` },
            { icon: '✍️', val: `${quiz.length} questions` },
            { icon: '⏱️', val: `~${estMinutes} min` },
          ].map((s, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '0.8rem', color: 'var(--muted)' }}>
              <span>{s.icon}</span>{s.val}
            </span>
          ))}
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="card anim-fade-up d1" style={{ padding: '1.5rem' }}>
        <p className="label" style={{ marginBottom: '1rem' }}>⭐ Key Takeaways</p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', listStyle: 'none' }}>
          {keyTakeaways.map((t, i) => (
            <li key={i} className="anim-fade-up" style={{ animationDelay: `${i * 0.06}s`, display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.875rem', color: 'var(--text-2)', lineHeight: 1.6 }}>
              <span style={{
                width: '22px', height: '22px', borderRadius: '7px',
                background: 'var(--em-light)', border: '1px solid var(--border-2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 700, color: 'var(--em)', flexShrink: 0, marginTop: '1px',
                fontFamily: "'Sora', sans-serif",
              }}>{i + 1}</span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {/* Goals */}
      <div className="card anim-fade-up d2" style={{ padding: '1.5rem' }}>
        <p className="label" style={{ marginBottom: '1rem' }}>🎯 Session Goals</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {goals.map((g, i) => (
            <div
              key={i}
              className="anim-slide-r"
              style={{
                animationDelay: `${i * 0.06 + 0.2}s`,
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--r-sm)',
                background: 'var(--surface-2)',
                border: '1px solid var(--border)',
              }}
            >
              <span style={{ fontSize: '16px', lineHeight: 1 }}>{g.emoji}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-2)', fontWeight: 500 }}>{g.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        id="start-session-btn"
        onClick={onStart}
        className="btn btn-primary"
        style={{ width: '100%', padding: '1.1rem', fontSize: '1rem', borderRadius: 'var(--r-lg)' }}
      >
        📖 Start Learning
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  );
}
