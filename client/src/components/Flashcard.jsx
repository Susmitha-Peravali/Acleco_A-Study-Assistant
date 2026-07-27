import { useState } from 'react';

export default function Flashcard({ flashcard, onUpdate, onToggleLearned, editMode = false }) {
  const [flipped,       setFlipped]       = useState(false);
  const [editingFront,  setEditingFront]  = useState(false);
  const [editingBack,   setEditingBack]   = useState(false);
  const [localQuestion, setLocalQuestion] = useState(flashcard.question);
  const [localAnswer,   setLocalAnswer]   = useState(flashcard.answer);

  function handleFlip() { if (!editingFront && !editingBack) setFlipped(f => !f); }

  function saveQuestion() {
    if (localQuestion.trim()) onUpdate(flashcard.id, 'question', localQuestion.trim());
    else setLocalQuestion(flashcard.question);
    setEditingFront(false);
  }
  function saveAnswer() {
    if (localAnswer.trim()) onUpdate(flashcard.id, 'answer', localAnswer.trim());
    else setLocalAnswer(flashcard.answer);
    setEditingBack(false);
  }

  return (
    <div className="anim-tilt-in" style={{ width: '100%' }}>
      {/* 3D scene */}
      <div
        className="fc-scene"
        style={{ height: '280px', cursor: 'pointer', userSelect: 'none' }}
        onClick={handleFlip}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === ' ' && handleFlip()}
        aria-label={flipped ? 'Show question' : 'Flip to see answer'}
      >
        <div className={`fc-inner ${flipped ? 'flipped' : ''}`}>

          {/* ── Front (Question) ── */}
          <div
            className="fc-face"
            style={{
              background: 'var(--surface)',
              border: '1.5px solid var(--border)',
              boxShadow: 'var(--shadow-md)',
            }}
            onClick={e => editMode && e.stopPropagation()}
          >
            <span className="tag tag-em" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>Question</span>

            {editMode && editingFront ? (
              <textarea
                className="input"
                style={{ textAlign: 'center', resize: 'none', height: '6rem', fontSize: '0.9rem' }}
                value={localQuestion}
                onChange={e => setLocalQuestion(e.target.value)}
                onClick={e => e.stopPropagation()}
                autoFocus
              />
            ) : (
              <p className="sora" style={{ fontSize: '1rem', fontWeight: 600, textAlign: 'center', lineHeight: 1.6, padding: '0 1rem' }}>
                {localQuestion}
              </p>
            )}

            {editMode && (
              <button
                style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Sora', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: 'var(--em)' }}
                onClick={e => { e.stopPropagation(); editingFront ? saveQuestion() : setEditingFront(true); }}
              >
                {editingFront ? '✓ Save' : '✎ Edit'}
              </button>
            )}

            <span style={{ position: 'absolute', bottom: '1rem', left: '1rem', fontSize: '0.7rem', color: 'var(--faint)' }}>
              Tap to flip ↩
            </span>
          </div>

          {/* ── Back (Answer) ── */}
          <div
            className="fc-face fc-back"
            style={{
              background: 'linear-gradient(135deg, #176B5D 0%, #1A8270 50%, #2BB09A 100%)',
              boxShadow: 'var(--shadow-em)',
            }}
            onClick={e => editMode && e.stopPropagation()}
          >
            <span style={{
              position: 'absolute', top: '1rem', left: '1rem',
              fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em',
              color: 'rgba(255,255,255,0.8)', background: 'rgba(255,255,255,0.15)', padding: '4px 10px', borderRadius: '99px',
            }}>Answer</span>

            {editMode && editingBack ? (
              <textarea
                className="input"
                style={{ textAlign: 'center', resize: 'none', height: '6rem', fontSize: '0.9rem' }}
                value={localAnswer}
                onChange={e => setLocalAnswer(e.target.value)}
                onClick={e => e.stopPropagation()}
                autoFocus
              />
            ) : (
              <p style={{ fontSize: '1rem', fontWeight: 600, color: 'white', textAlign: 'center', lineHeight: 1.6, padding: '0 1rem' }}>
                {localAnswer}
              </p>
            )}

            {editMode && (
              <button
                style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Sora', sans-serif", fontSize: '0.72rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}
                onClick={e => { e.stopPropagation(); editingBack ? saveAnswer() : setEditingBack(true); }}
              >
                {editingBack ? '✓ Save' : '✎ Edit'}
              </button>
            )}

            <button
              style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.7rem', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}
              onClick={e => { e.stopPropagation(); setFlipped(false); }}
            >
              ↩ Flip back
            </button>
          </div>
        </div>
      </div>

      {/* Mark as Learned */}
      <button
        id={`learned-btn-${flashcard.id}`}
        onClick={onToggleLearned}
        style={{
          marginTop: '1rem', width: '100%', padding: '0.75rem',
          borderRadius: 'var(--r-md)',
          border: flashcard.learned ? '1.5px solid rgba(58,166,107,0.4)' : '1.5px solid var(--border)',
          background: flashcard.learned ? 'var(--success-bg)' : 'var(--surface)',
          color: flashcard.learned ? 'var(--success)' : 'var(--muted)',
          fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
          fontFamily: "'Sora', sans-serif",
          transition: 'all 200ms var(--ease)',
        }}
      >
        {flashcard.learned ? '✓ Marked as Learned' : '○ Mark as Learned'}
      </button>
    </div>
  );
}
