/** Animated background blobs — barely visible, organic movement */
export default function BgBlobs() {
  return (
    <>
      <div className="blob" style={{ width:'480px', height:'480px', top:'-120px', left:'-100px', background:'radial-gradient(circle, rgba(23,107,93,0.45) 0%, transparent 70%)' }} />
      <div className="blob" style={{ width:'420px', height:'420px', top:'30%', right:'-80px', background:'radial-gradient(circle, rgba(242,169,0,0.35) 0%, transparent 70%)', animationDelay:'6s', animationDuration:'22s' }} />
      <div className="blob" style={{ width:'360px', height:'360px', bottom:'10%', left:'20%', background:'radial-gradient(circle, rgba(230,126,106,0.25) 0%, transparent 70%)', animationDelay:'12s', animationDuration:'25s' }} />
    </>
  );
}
