export default function ProgressBar({ percent = 0, label = '' }) {
  const clamped = Math.min(100, Math.max(0, Math.round(percent)));
  return (
    <div style={{ width: '100%' }}>
      {(label || clamped > 0) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '7px' }}>
          {label && <span className="label">{label}</span>}
          <span className="sora" style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--em)', marginLeft: 'auto' }}>{clamped}%</span>
        </div>
      )}
      <div className="prog-track">
        <div className="prog-fill" style={{ width: `${clamped}%` }} role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100} />
      </div>
    </div>
  );
}
