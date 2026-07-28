export default function MissionCard({ sessionData, onStart, readonly = false }) {
  const { title, keyTakeaways, flashcards, quiz } = sessionData;
  const estMinutes = Math.ceil((flashcards.length * 0.5) + (quiz.length * 0.75));

  return (
    <div className="card anim-fade-up" style={{ padding: readonly ? '1.5rem' : '2.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div>
        <span className="tag tag-em" style={{ marginBottom: '0.75rem' }}>
          🎯 Active Session
        </span>
        <h2 className="satoshi" style={{ fontSize: readonly ? '1.1rem' : '1.5rem', fontWeight: 900, marginBottom: '0.5rem', lineHeight: 1.2 }}>
          {title}
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginTop: '0.5rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>📖 {flashcards.length} cards</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>✍️ {quiz.length} questions</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)', fontWeight: 600 }}>⏱️ ~{estMinutes} min</span>
        </div>
      </div>

      <div className="divider" />

      {/* Key Takeaways */}
      <div>
        <p className="satoshi" style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--faint)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
          Key Concepts
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', listStyle: 'none' }}>
          {keyTakeaways.map((t, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.85rem', color: 'var(--text-2)', lineHeight: 1.5 }}>
              <span style={{ color: 'var(--em)', fontWeight: 800 }}>•</span>
              {t}
            </li>
          ))}
        </ul>
      </div>

      {!readonly && (
        <button
          onClick={onStart}
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem', fontSize: '1rem', marginTop: '0.5rem' }}
        >
          Start Flashcards →
        </button>
      )}
    </div>
  );
}
