import { useState } from 'react';
import ProgressBar from './ProgressBar';

export default function Quiz({ questions, onComplete, isReview = false }) {
  const [currentIndex,   setCurrentIndex]   = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted,      setSubmitted]      = useState(false);
  const [score,          setScore]          = useState(0);
  const [wrongAnswers,   setWrongAnswers]   = useState([]);

  const current  = questions[currentIndex];
  const isLast   = currentIndex === questions.length - 1;
  const progress = (currentIndex / questions.length) * 100;

  function handleSelect(opt) { if (!submitted) setSelectedAnswer(opt); }

  function handleSubmit() {
    if (!selectedAnswer) return;
    setSubmitted(true);
    if (selectedAnswer === current.correctAnswer) setScore(s => s + 1);
    else setWrongAnswers(w => [...w, current]);
  }

  function handleNext() {
    if (isLast) { onComplete(score, questions.length, wrongAnswers); return; }
    setCurrentIndex(i => i + 1);
    setSelectedAnswer(null);
    setSubmitted(false);
  }

  function optClass(opt) {
    if (!submitted) return opt === selectedAnswer ? 'opt selected' : 'opt';
    if (opt === current.correctAnswer) return 'opt correct';
    if (opt === selectedAnswer && opt !== current.correctAnswer) return 'opt wrong anim-shake';
    return 'opt';
  }

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="satoshi" style={{ fontSize: '1.35rem', fontWeight: 900 }}>
            {isReview ? 'Targeted Review' : 'Knowledge Check'}
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '2px' }}>
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="tag tag-em" style={{ fontSize: '0.85rem' }}>
          {score} Correct
        </div>
      </div>

      <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
        <ProgressBar percent={progress} label="Quiz Completion" />
      </div>

      {/* Question card */}
      <div className="card glass" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <h3 className="satoshi" style={{ fontSize: '1.25rem', fontWeight: 800, lineHeight: 1.5 }}>
          {current.question}
        </h3>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {current.options.map((opt, i) => (
            <button key={i} id={`option-${i}`} onClick={() => handleSelect(opt)} disabled={submitted} className={optClass(opt)}>
              <span style={{
                width: '32px', height: '32px', borderRadius: 'var(--r-sm)', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.85rem', fontWeight: 800, fontFamily: "'Satoshi', sans-serif",
                background: submitted && opt === current.correctAnswer ? 'var(--success-bg)'
                  : submitted && opt === selectedAnswer && opt !== current.correctAnswer ? 'var(--error-bg)'
                  : 'var(--surface-2)',
                color: submitted && opt === current.correctAnswer ? 'var(--success)'
                  : submitted && opt === selectedAnswer ? 'var(--error)'
                  : 'var(--muted)',
              }}>{String.fromCharCode(65 + i)}</span>
              <span style={{ flex: 1, textAlign: 'left', lineHeight: 1.4 }}>{opt}</span>
              {submitted && opt === current.correctAnswer && <span style={{ color: 'var(--success)', fontWeight: 800, fontSize: '1.1rem' }}>✓</span>}
              {submitted && opt === selectedAnswer && opt !== current.correctAnswer && <span style={{ color: 'var(--error)', fontWeight: 800, fontSize: '1.1rem' }}>✗</span>}
            </button>
          ))}
        </div>

        {/* Feedback + Actions */}
        {!submitted ? (
          <button id="submit-answer-btn" onClick={handleSubmit} disabled={!selectedAnswer} className="btn btn-primary" style={{ width: '100%', padding: '1.15rem', borderRadius: 'var(--r-lg)', fontSize: '1.05rem' }}>
            Submit Answer
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              padding: '1rem 1.25rem', borderRadius: 'var(--r-md)', fontSize: '0.95rem', fontWeight: 700, textAlign: 'center',
              background: selectedAnswer === current.correctAnswer ? 'var(--success-bg)' : 'var(--error-bg)',
              color: selectedAnswer === current.correctAnswer ? 'var(--success)' : 'var(--error)',
              border: `1px solid ${selectedAnswer === current.correctAnswer ? 'rgba(39,174,96,0.25)' : 'rgba(231,76,60,0.2)'}`,
            }}>
              {selectedAnswer === current.correctAnswer ? '✓ Correct! You\'ve mastered this concept.' : `✗ Correct answer: ${current.correctAnswer}`}
            </div>
            <button id="next-question-btn" onClick={handleNext} className="btn btn-primary" style={{ width: '100%', padding: '1.15rem', borderRadius: 'var(--r-lg)', fontSize: '1.05rem' }}>
              {isLast ? 'See Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
