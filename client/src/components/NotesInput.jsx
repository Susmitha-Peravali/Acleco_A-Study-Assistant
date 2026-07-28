import { useState, useRef } from 'react';

/* Custom SVG Hero Illustration: Abstract Learning Network */
function HeroIllustration() {
  return (
    <svg width="100%" height="auto" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="anim-float">
      {/* Background glow */}
      <circle cx="200" cy="200" r="160" fill="var(--em-light)" opacity="0.6"/>
      <circle cx="200" cy="200" r="120" fill="var(--em-mid)" opacity="0.8"/>
      
      {/* Central Node */}
      <circle cx="200" cy="200" r="28" fill="var(--em)" className="anim-pulse"/>
      <circle cx="200" cy="200" r="12" fill="white"/>
      
      {/* Orbiting Nodes & Connections */}
      <g stroke="var(--em)" strokeWidth="2" strokeDasharray="4 6" opacity="0.4">
        <line x1="200" y1="200" x2="100" y2="120" />
        <line x1="200" y1="200" x2="320" y2="140" />
        <line x1="200" y1="200" x2="280" y2="300" />
        <line x1="200" y1="200" x2="120" y2="280" />
      </g>
      
      {/* Solid Connections */}
      <g stroke="var(--em)" strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <line x1="100" y1="120" x2="140" y2="60" />
        <line x1="320" y1="140" x2="360" y2="220" />
        <line x1="120" y1="280" x2="60" y2="240" />
      </g>

      {/* Nodes */}
      <circle cx="100" cy="120" r="16" fill="var(--amber)"/>
      <circle cx="320" cy="140" r="20" fill="var(--orange)"/>
      <circle cx="280" cy="300" r="14" fill="var(--success)"/>
      <circle cx="120" cy="280" r="18" fill="var(--em-dark)"/>
      
      {/* Outer Nodes */}
      <circle cx="140" cy="60" r="8" fill="var(--text-2)"/>
      <circle cx="360" cy="220" r="10" fill="var(--amber)"/>
      <circle cx="60" cy="240" r="6" fill="var(--orange)"/>
      
      {/* Floating abstract elements (books/pages) */}
      <rect x="80" y="200" width="24" height="32" rx="4" fill="var(--surface)" stroke="var(--border-2)" strokeWidth="2" transform="rotate(-15 80 200)"/>
      <rect x="280" y="80" width="20" height="28" rx="4" fill="var(--surface)" stroke="var(--border-2)" strokeWidth="2" transform="rotate(25 280 80)"/>
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
  { id: 'quick',     label: 'Quick Review',   desc: 'Fast flashcard overview',         emoji: '⚡' },
  { id: 'exam',      label: 'Deep Focus',     desc: 'Full quiz with review loop',      emoji: '🧠' },
];

const SAMPLE_NOTES = `Memory management in operating systems is the process of controlling and coordinating computer memory. It involves assigning blocks of memory to various running programs to optimize system performance. Key concepts include:
1. Virtual Memory: An abstraction that gives application programs the impression that they have contiguous working memory, while in fact it may be physically fragmented and even overflow on to disk storage.
2. Paging: A memory management scheme that eliminates the need for contiguous allocation of physical memory. The OS retrieves data from secondary storage in same-size blocks called pages.
3. Segmentation: A memory management technique that divides the memory into variable-size segments, reflecting the user's view of memory.
4. Thrashing: Occurs when a computer's virtual memory subsystem is in a constant state of paging, rapidly exchanging data in memory for data on disk, causing processing performance to collapse.`;

export default function NotesInput({ onGenerate, isLoading }) {
  const [notes, setNotes] = useState('');
  const [mode,  setMode]  = useState('exam');
  const fileInputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!notes.trim() || isLoading) return;
    onGenerate(notes.trim());
  }

  function loadSample() {
    setNotes(SAMPLE_NOTES);
  }

  function handleFileUpload(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result;
      if (typeof content === 'string') {
        setNotes(content);
      }
    };
    reader.readAsText(file);
  }

  const charCount  = notes.length;
  const isValidLen = charCount >= 50;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', paddingBottom: '2rem' }}>

      {/* Hidden File Input for Upload TXT */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".txt,.md,.text"
        style={{ display: 'none' }}
      />

      {/* ─── Hero ─── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        <div className="anim-fade-up">
          <div className="tag tag-em" style={{ marginBottom: '1.5rem' }}>
            <SparkIcon size={12} />
            Built from your understanding
          </div>
          <h1 className="satoshi" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
            Master any topic with 
            <span style={{ color: 'var(--em)', display: 'block' }}> active recall.</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: 'var(--muted)', lineHeight: 1.6, maxWidth: '480px' }}>
            Transform your scattered notes into structured flashcards, quizzes, and targeted review sessions. Acleco adapts to your learning pace.
          </p>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button className="btn btn-primary" onClick={() => document.getElementById('study').scrollIntoView({ behavior: 'smooth' })}>
              Start Learning
            </button>
          </div>
        </div>
        
        <div className="anim-fade-up d2" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '420px' }}>
            <HeroIllustration />
          </div>
        </div>
      </div>

      <div className="divider" style={{ opacity: 0.5 }} />

      {/* ─── Features (About Section Anchor) ─── */}
      <div id="about" style={{ scrollMarginTop: '100px' }} className="anim-fade-up d3">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {[
            { emoji: '📖', title: 'Smart Flashcards', desc: 'Automatically generated from your material, ready for spaced repetition.' },
            { emoji: '🎯', title: 'Targeted Quizzes', desc: 'Test your knowledge and automatically isolate your weak points.' },
            { emoji: '📈', title: 'Learning Insights', desc: 'Track your streak and see exactly which topics you\'ve mastered.' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: 'var(--r-md)', background: 'var(--surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', boxShadow: 'var(--shadow-xs)' }}>
                {f.emoji}
              </div>
              <h3 className="satoshi" style={{ fontSize: '1.1rem', fontWeight: 800 }}>{f.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--muted)', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Form Area (Study Workspace Anchor) ─── */}
      <div id="study" style={{ scrollMarginTop: '100px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="satoshi" style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '0.5rem' }}>Ready to learn today?</h2>
          <p style={{ color: 'var(--muted)', fontSize: '1.05rem' }}>Paste your material below to begin your personalized session.</p>
        </div>

        <form onSubmit={handleSubmit} className="glass anim-fade-up d4" style={{ padding: '2.5rem', margin: '0 auto', maxWidth: '800px' }}>
          {/* Mode selector */}
          <div style={{ marginBottom: '2rem' }}>
            <label className="satoshi" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>Choose Intensity</label>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {MODES.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setMode(m.id)}
                  style={{
                    flex: '1 1 0', minWidth: '180px',
                    display: 'flex', alignItems: 'center', gap: '12px',
                    padding: '1rem 1.25rem', borderRadius: 'var(--r-md)',
                    border: mode === m.id ? '2px solid var(--em)' : '2px solid var(--border)',
                    background: mode === m.id ? 'var(--em-light)' : 'var(--surface)',
                    cursor: 'pointer', transition: 'all 200ms var(--ease)',
                    boxShadow: mode === m.id ? 'var(--shadow-sm)' : 'none'
                  }}
                >
                  <span style={{ fontSize: '24px', lineHeight: 1 }}>{m.emoji}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div className="satoshi" style={{ fontSize: '0.95rem', fontWeight: 700, color: mode === m.id ? 'var(--em-dark)' : 'var(--text)' }}>{m.label}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: '2px' }}>{m.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Textarea */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '12px' }}>
              <label className="satoshi" htmlFor="notes-input" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Notes</label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  📎 Upload TXT
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ padding: '4px 8px', fontSize: '0.8rem', color: 'var(--em)' }}
                  onClick={loadSample}
                >
                  ✨ Try Sample Notes
                </button>
              </div>
            </div>
            <textarea
              id="notes-input"
              className="input"
              rows={8}
              placeholder="Paste your lecture notes, textbook excerpts, or meeting transcripts here..."
              value={notes}
              onChange={e => setNotes(e.target.value)}
              style={{ resize: 'vertical', lineHeight: 1.7, minHeight: '160px', fontSize: '1rem' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', padding: '0 4px' }}>
              <span className="satoshi" style={{ fontSize: '0.8rem', fontWeight: 600, color: isValidLen ? 'var(--success)' : 'var(--muted)' }}>
                {isValidLen ? '✓ Ready to process' : 'Minimum 50 characters required'}
              </span>
              <span className="satoshi" style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)' }}>{charCount} chars</span>
            </div>
          </div>

          {/* Submit */}
          <button
            id="generate-btn"
            type="submit"
            disabled={!isValidLen || isLoading}
            className="btn btn-primary"
            style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', borderRadius: 'var(--r-md)' }}
          >
            Start Learning
            <ArrowIcon />
          </button>
        </form>
      </div>
    </div>
  );
}
