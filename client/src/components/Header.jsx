import { useState, useEffect } from 'react';

/* Premium Custom Acleco Logo SVG */
function AclecoLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="10" fill="var(--em)"/>
      {/* Node connections representing knowledge/learning */}
      <circle cx="12" cy="12" r="2.5" fill="white"/>
      <circle cx="20" cy="12" r="2.5" fill="white"/>
      <circle cx="16" cy="22" r="3" fill="var(--amber)"/>
      <path d="M12 12L16 22L20 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 12H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 4"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  );
}

export default function Header({ streak = 0 }) {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: scrolled ? 'var(--surface-3)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      transition: 'all 300ms var(--ease)'
    }}>
      <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => window.scrollTo(0,0)}>
          <AclecoLogo />
          <div>
            <div className="satoshi" style={{ fontWeight: 900, fontSize: '1.1rem', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>Acleco</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--muted)', marginTop: '3px', fontWeight: 500, letterSpacing: '0.02em' }}>Active Learning Companion</div>
          </div>
        </div>

        {/* Center Navigation (Desktop) */}
        <nav style={{ display: 'none', gap: '2rem', alignItems: 'center' }} className="md-flex">
          <a href="#study" style={{ color: 'var(--text)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, transition: 'color 200ms' }}>Study</a>
          <a href="#about" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, transition: 'color 200ms' }} onMouseEnter={e => e.target.style.color = 'var(--text)'} onMouseLeave={e => e.target.style.color = 'var(--muted)'}>About</a>
        </nav>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {streak > 0 && (
            <div className="anim-scale-in" style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '6px 14px', borderRadius: '99px',
              background: 'var(--amber-light)',
              border: '1.5px solid rgba(245,166,35,0.3)',
              boxShadow: 'var(--shadow-xs)'
            }}>
              <span style={{ fontSize: '16px' }}>🔥</span>
              <span className="satoshi" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--amber-dark)' }}>
                {streak} Day Streak
              </span>
            </div>
          )}
          <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-icon" aria-label="GitHub Repository">
            <GitHubIcon />
          </a>
          <button onClick={toggleDark} className="btn btn-icon" aria-label="Toggle dark mode">
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
      
      {/* Inline styles for media query (since we're avoiding adding too much to CSS) */}
      <style>{`
        @media (min-width: 768px) {
          .md-flex { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
