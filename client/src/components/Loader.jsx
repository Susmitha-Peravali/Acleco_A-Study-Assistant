import { useState, useEffect } from 'react';

const STEPS = [
  { label: 'Reading your notes',      emoji: '📄' },
  { label: 'Building concepts',       emoji: '🧠' },
  { label: 'Creating flashcards',     emoji: '📖' },
  { label: 'Designing quiz',          emoji: '✍️' },
  { label: 'Almost ready',            emoji: '✨' },
];

export default function Loader() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep(s => (s < STEPS.length - 1 ? s + 1 : s));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const current = STEPS[step];
  const pct = ((step + 1) / STEPS.length) * 100;

  return (
    <div className="anim-scale-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '4rem 1rem', textAlign: 'center' }}>

      {/* Pulsing icon */}
      <div style={{
        width: '80px', height: '80px', borderRadius: '50%',
        background: 'var(--em-light)',
        border: '2px solid var(--border-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '32px',
        animation: 'pulse 2s ease-in-out infinite',
      }}>
        {current.emoji}
      </div>

      {/* Label */}
      <div>
        <h3 className="sora" style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '6px' }}>
          {current.label}…
        </h3>
        <p style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
          This usually takes 10–20 seconds
        </p>
      </div>

      {/* Progress bar */}
      <div style={{ width: '280px' }}>
        <div className="prog-track">
          <div className="prog-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* Step pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {STEPS.map((s, i) => (
          <span
            key={i}
            className="tag"
            style={{
              background: i <= step ? 'var(--em-light)' : 'var(--surface-2)',
              color: i <= step ? 'var(--em)' : 'var(--faint)',
              border: `1px solid ${i <= step ? 'var(--border-2)' : 'var(--border)'}`,
              transition: 'all 400ms var(--ease)',
            }}
          >
            {i < step ? '✓' : s.emoji} {s.label}
          </span>
        ))}
      </div>

      {/* Bouncing dots */}
      <div style={{ display: 'flex', gap: '6px', marginTop: '0.5rem' }}>
        <div className="ldot" />
        <div className="ldot" />
        <div className="ldot" />
      </div>
    </div>
  );
}
