import { useState } from 'react';

/* Simple custom SVGs instead of generic Lucide icons */
function NotesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
}
function SparkIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
    </svg>
  );
}

const MODES = [
  { id: 'quick',     label: 'Quick Study',    desc: 'Fast flashcard overview',         emoji: '⚡' },
  { id: 'exam',      label: 'Exam Prep',      desc: 'Deep quiz with review loop',      emoji: '📝' },
  { id: 'interview', label: 'Interview Ready', desc: 'Concept-focused questions',       emoji: '💼' },
];

const SAMPLE_NOTES = `Photosynthesis is the process by which green plants convert light energy into chemical energy. It takes place in the chloroplasts, specifically using the pigment chlorophyll. The two main stages are the light-dependent reactions (in the thylakoid membrane) and the Calvin cycle (in the stroma). Water molecules are split during the light reactions, releasing oxygen as a byproduct. The Calvin cycle fixes CO₂ into glucose using ATP and NADPH generated in the light reactions.`;

export default function NotesInput({ onGenerate, isLoading }) {
  const [notes, setNotes] = useState('');
  const [mode,  setMode]  = useState('exam');

  function handleSubmit(e) {
    e.preventDefault();
    if (!notes.trim() || isLoading) return;
    onGenerate(notes.trim());
  }

  function loadSample() {
    setNotes(SAMPLE_NOTES);
  }

  const charCount  = notes.length;
  const isValidLen = charCount >= 50;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>

      {/* ─── Hero ─── */}
      <div className="anim-fade-up" style={{ maxWidth: '560px' }}>
        <div className="tag tag-em" style={{ marginBottom: '1rem' }}>
          <SparkIcon size={11} />
          AI-Powered Study Sessions
        </div>
        <h1 className="sora" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.12, marginBottom: '1rem' }}>
          Turn your notes into
          <span style={{ color: 'var(--em)' }}> active learning</span>
        </h1>
        <p style={{ fontSize: '1.05rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '480px' }}>
          Paste your study material and Acleco will generate flashcards, quizzes, and a guided review — all powered by AI.
        </p>
      </div>

      {/* ─── Form Card ─── */}
      <form onSubmit={handleSubmit} className="card anim-fade-up d2" style={{ padding: '2rem' }}>

        {/* Mode selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="label" style={{ display: 'block', marginBottom: '10px' }}>Study Mode</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {MODES.map(m => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                style={{
                  flex: '1 1 0',
                  minWidth: '140px',
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--r-md)',
                  border: mode === m.id ? '1.5px solid var(--em)' : '1.5px solid var(--border)',
                  background: mode === m.id ? 'var(--em-light)' : 'var(--surface)',
                  cursor: 'pointer',
                  transition: 'all 200ms var(--ease)',
                  fontFamily: 'inherit',
                }}
              >
                <span style={{ fontSize: '18px', lineHeight: 1 }}>{m.emoji}</span>
                <div style={{ textAlign: 'left' }}>
                  <div className="sora" style={{ fontSize: '0.8rem', fontWeight: 600, color: mode === m.id ? 'var(--em)' : 'var(--text)' }}>{m.label}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginTop: '1px' }}>{m.desc}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Textarea */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <label className="label" htmlFor="notes-input">Your Notes</label>
            <button type="button" onClick={loadSample} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.72rem', fontWeight: 600, color: 'var(--em)' }}>
              Try a sample →
            </button>
          </div>
          <textarea
            id="notes-input"
            className="input"
            rows={7}
            placeholder="Paste your lecture notes, textbook excerpts, or any study material here..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            style={{ resize: 'vertical', lineHeight: 1.7, minHeight: '140px' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '0.72rem', color: isValidLen ? 'var(--success)' : 'var(--faint)' }}>
              {isValidLen ? '✓ Enough content' : 'Min 50 characters'}
            </span>
            <span style={{ fontSize: '0.72rem', color: 'var(--faint)' }}>{charCount} chars</span>
          </div>
        </div>

        {/* Submit */}
        <button
          id="generate-btn"
          type="submit"
          disabled={!isValidLen || isLoading}
          className="btn btn-primary"
          style={{ width: '100%', padding: '1rem', fontSize: '0.95rem', borderRadius: 'var(--r-md)' }}
        >
          <NotesIcon />
          Generate Study Session
          <ArrowIcon />
        </button>
      </form>

      {/* ─── Quick Features ─── */}
      <div className="anim-fade-up d3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
        {[
          { emoji: '📖', title: 'Flashcards',   desc: 'Editable cards from your notes' },
          { emoji: '✍️', title: 'Adaptive Quiz', desc: 'Test & review wrong answers' },
          { emoji: '📊', title: 'Session Stats', desc: 'Track accuracy & streaks' },
        ].map((f, i) => (
          <div key={i} className="card" style={{ padding: '1.25rem', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
            <span style={{ fontSize: '22px', lineHeight: 1 }}>{f.emoji}</span>
            <div>
              <div className="sora" style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text)', marginBottom: '3px' }}>{f.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
