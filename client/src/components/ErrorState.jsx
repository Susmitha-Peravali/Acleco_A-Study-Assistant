const ICONS = { NETWORK_ERROR: '📡', INVALID_JSON: '⚠️', AI_ERROR: '⚠️', EMPTY_RESPONSE: '⚠️', SCHEMA_MISMATCH: '⚠️', INVALID_INPUT: '✏️' };

export default function ErrorState({ message, code, onRetry }) {
  const icon = ICONS[code] || '⚠️';
  const isNetwork = code === 'NETWORK_ERROR';
  return (
    <div className="card anim-scale-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', textAlign: 'center', maxWidth: '400px', margin: '0 auto' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--error-bg)', border: '1.5px solid rgba(214,69,69,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{icon}</div>
      <div>
        <h3 className="sora" style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '6px' }}>{isNetwork ? 'Connection Error' : 'Something went wrong'}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.6 }}>{message || 'An unexpected error occurred. Please try again.'}</p>
      </div>
      {onRetry && (
        <button onClick={onRetry} className="btn btn-primary" id="error-retry-btn" style={{ padding: '0.65rem 1.5rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          Try Again
        </button>
      )}
    </div>
  );
}
