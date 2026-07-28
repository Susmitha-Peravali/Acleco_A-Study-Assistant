import { useState } from 'react';
import Flashcard from './Flashcard';
import ProgressBar from './ProgressBar';

export default function FlashcardList({ flashcards, onUpdate, onToggleLearned, onStartQuiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode,     setEditMode]     = useState(false);

  const current      = flashcards[currentIndex];
  const learnedCount = flashcards.filter(fc => fc.learned).length;
  const progress     = (learnedCount / flashcards.length) * 100;

  function goNext() { if (currentIndex < flashcards.length - 1) setCurrentIndex(i => i + 1); }
  function goPrev() { if (currentIndex > 0) setCurrentIndex(i => i - 1); }

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="satoshi" style={{ fontSize: '1.35rem', fontWeight: 900 }}>Interactive Flashcards</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '2px' }}>{learnedCount} of {flashcards.length} concepts mastered</p>
        </div>
        <button id="toggle-edit-mode" onClick={() => setEditMode(v => !v)} className="btn btn-ghost" style={{ fontSize: '0.85rem', padding: '8px 16px' }}>
          {editMode ? '✓ Save Changes' : '✎ Edit Card Text'}
        </button>
      </div>

      {/* Progress */}
      <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
        <ProgressBar percent={progress} label="Mastery Progress" />
      </div>

      {/* Dot nav */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        {flashcards.map((fc, i) => (
          <button key={fc.id} onClick={() => setCurrentIndex(i)} aria-label={`Card ${i + 1}`} style={{
            width: i === currentIndex ? '32px' : '10px', height: '10px', borderRadius: '99px',
            border: 'none', cursor: 'pointer', padding: 0,
            transition: 'all 300ms var(--ease)',
            background: i === currentIndex ? 'var(--em)' : fc.learned ? 'var(--success)' : 'var(--border)',
          }} />
        ))}
      </div>

      {/* Card + nav arrows */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button id="flashcard-prev" onClick={goPrev} disabled={currentIndex === 0} className="btn btn-icon" aria-label="Previous card" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <div style={{ flex: 1 }}>
          <Flashcard key={current.id} flashcard={current} onUpdate={onUpdate} onToggleLearned={() => onToggleLearned(current.id)} editMode={editMode} />
        </div>
        <button id="flashcard-next" onClick={goNext} disabled={currentIndex === flashcards.length - 1} className="btn btn-icon" aria-label="Next card" style={{ width: '48px', height: '48px', flexShrink: 0 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>

      <p className="satoshi" style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--faint)' }}>Card {currentIndex + 1} of {flashcards.length}</p>

      {/* CTA */}
      <button id="start-quiz-btn" onClick={onStartQuiz} className="btn btn-primary" style={{ width: '100%', padding: '1.15rem', fontSize: '1.05rem', borderRadius: 'var(--r-lg)' }}>
        {editMode ? 'Finish Editing & Start Quiz' : "I'm Ready — Start Quiz"}
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
      </button>
    </div>
  );
}
