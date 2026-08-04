'use client';

export default function SecurityChapter() {
  return (
    <>
<section className="chapter chapter--security" id="securitynode" data-a="0.62" data-b="0.68" data-side="center" data-dir="center">
    <div className="panel panel--security">

      
      <div className="sec-header">
        <h2>Your funds. Your control. Always.</h2>
        <p className="sec-lead">Every credential is locked down and every connection encrypted end to end — engineered so
          there's no technical path for anyone but you to move your balance.</p>
      </div>

      
      <div className="sec-row sec-row--featured">
        <div className="sec-item sec-item--featured">
          <div className="sec-item__visual">
            <img src="/images/funsecurity/sec1.png" alt="Non-custodial fund protection" decoding="async" />
          </div>
          <h3>Your Funds Stay Yours</h3>
          <p>Binance enforces API scopes at the exchange level. A trade-only key has no technical ability to move
            your balance — not for us, and not for anyone who might compromise our servers.</p>
        </div>
      </div>

      <div className="sec-row sec-row--secondary">
        <div className="sec-item">
          <div className="sec-item__visual">
            <img src="/images/funsecurity/sec2.png" alt="Verified account security" decoding="async" />
          </div>
          <h3>You Control Access</h3>
          <p>One click in your dashboard revokes ByteBoom's API access instantly — no waiting period, no support
            ticket, no questions asked.</p>
        </div>

        <div className="sec-item">
          <div className="sec-item__visual">
            <img src="/images/funsecurity/sec3.png" alt="100% encrypted reserves" decoding="async" />
          </div>
          <h3>Encrypted End to End</h3>
          <p>Credentials locked with AES-256 at rest. Every connection between ByteBoom and your exchange stays encrypted.</p>
        </div>
      </div>

    </div>
  </section>
    </>
  );
}
