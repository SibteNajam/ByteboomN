'use client';

export default function TrustChapter() {
  return (
    <>
<section className="chapter chapter--trust" id="trustnode" data-a="0.08" data-b="0.17" data-side="center"
    data-dir="right" data-exit="into">
    <div className="panel panel--trust">
      <div className="sec-header trust-head">
        <h2>Connected to your exchange. Never in control of it.</h2>
        <p className="sec-lead">One restricted API key with trade permission only. ByteBoom opens and closes positions —
          it can never withdraw, transfer, or move your coins. Pause or unlink in a single click.</p>
      </div>
      <div className="trust-viz">
        <img className="trust-viz__img" src="/images/trustblue2.png"
          alt="ByteBoom — connected to your exchange, never in control of it" width="1509" height="941" decoding="async" />
        <span className="trust-orbit trust-orbit--nw">Non-custodial</span>
        <span className="trust-orbit trust-orbit--w">Your funds</span>
        <span className="trust-orbit trust-orbit--sw">Trade only</span>
        <span className="trust-orbit trust-orbit--ne">No withdrawal</span>
        <span className="trust-orbit trust-orbit--e">Exit anytime</span>
        <span className="trust-orbit trust-orbit--se">Keys stay yours</span>
        <span className="trust-orbit trust-orbit--n">You stay in control</span>
        <span className="trust-orbit trust-orbit--s">Pause · Unlink</span>
      </div>
    </div>
  </section>
    </>
  );
}
