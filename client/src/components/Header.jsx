import { useState } from 'react';

/* Custom Acleco SVG Logo */
function AclecoLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="9" fill="#176B5D"/>
      {/* A shape with growth arc */}
      <path d="M10 23L16 9L22 23" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12.5 18.5H19.5" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      {/* Growth spark */}
      <circle cx="22" cy="10" r="2" fill="#F2A900"/>
    </svg>
  );
}

/* Moon / Sun SVG icons */
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  );
}

export default function Header({ streak = 0 }) {
  const [dark, setDark] = useState(false);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    document.documentElement.setAttribute('data-theme', next ? 'dark' : 'light');
  }

  return (
    <header style={{
      position: 'sticky', top: 0, zIndex: 200,
      background: 'var(--surface-3)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 2rem', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <AclecoLogo />
          <div>
            <div className="sora" style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', letterSpacing: '-0.02em', lineHeight: 1 }}>Acleco</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--muted)', marginTop: '2px', fontWeight: 500, letterSpacing: '0.02em' }}>Active Learning Companion</div>
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {streak > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '5px 12px', borderRadius: '99px',
              background: 'var(--amber-light)',
              border: '1px solid rgba(242,169,0,0.3)',
            }}>
              <span style={{ fontSize: '14px' }}>🔥</span>
              <span className="sora" style={{ fontSize: '0.72rem', fontWeight: 700, color: '#92620A' }}>
                {streak} day{streak !== 1 ? 's' : ''}
              </span>
            </div>
          )}
          <button onClick={toggleDark} className="btn btn-icon" aria-label="Toggle dark mode">
            {dark ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </header>
  );
}
