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
    if (opt === selectedAnswer && opt !== current.correctAnswer) return 'opt wrong';
    return 'opt';
  }

  return (
    <div className="anim-fade-up" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 className="sora" style={{ fontSize: '1.15rem', fontWeight: 700 }}>
            {isReview ? 'Review Incorrect' : 'Quiz'}
          </h2>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: '2px' }}>
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="tag tag-em">
          {score} correct
        </div>
      </div>

      <div className="card" style={{ padding: '1rem 1.25rem' }}>
        <ProgressBar percent={progress} />
      </div>

      {/* Question card */}
      <div className="card" style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <p className="sora" style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 }}>
          {current.question}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {current.options.map((opt, i) => (
            <button key={i} id={`option-${i}`} onClick={() => handleSelect(opt)} disabled={submitted} className={optClass(opt)}>
              <span style={{
                width: '28px', height: '28px', borderRadius: '8px', flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.72rem', fontWeight: 700, fontFamily: "'Sora', sans-serif",
                background: submitted && opt === current.correctAnswer ? 'var(--success-bg)'
                  : submitted && opt === selectedAnswer && opt !== current.correctAnswer ? 'var(--error-bg)'
                  : 'var(--surface-2)',
                color: submitted && opt === current.correctAnswer ? 'var(--success)'
                  : submitted && opt === selectedAnswer ? 'var(--error)'
                  : 'var(--muted)',
              }}>{String.fromCharCode(65 + i)}</span>
              <span style={{ flex: 1, textAlign: 'left' }}>{opt}</span>
              {submitted && opt === current.correctAnswer && <span style={{ color: 'var(--success)', fontWeight: 700 }}>✓</span>}
              {submitted && opt === selectedAnswer && opt !== current.correctAnswer && <span style={{ color: 'var(--error)', fontWeight: 700 }}>✗</span>}
            </button>
          ))}
        </div>

        {/* Feedback + Actions */}
        {!submitted ? (
          <button id="submit-answer-btn" onClick={handleSubmit} disabled={!selectedAnswer} className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', borderRadius: 'var(--r-md)' }}>
            Submit Answer
          </button>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{
              padding: '12px 16px', borderRadius: 'var(--r-sm)', fontSize: '0.875rem', fontWeight: 600, textAlign: 'center',
              background: selectedAnswer === current.correctAnswer ? 'var(--success-bg)' : 'var(--error-bg)',
              color: selectedAnswer === current.correctAnswer ? '#1B5E38' : '#8B1C1C',
              border: `1px solid ${selectedAnswer === current.correctAnswer ? 'rgba(58,166,107,0.25)' : 'rgba(214,69,69,0.2)'}`,
            }}>
              {selectedAnswer === current.correctAnswer ? '✓ Correct! Well done.' : `✗ Correct answer: ${current.correctAnswer}`}
            </div>
            <button id="next-question-btn" onClick={handleNext} className="btn btn-primary" style={{ width: '100%', padding: '0.9rem', borderRadius: 'var(--r-md)' }}>
              {isLast ? 'See Results' : 'Next Question →'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
