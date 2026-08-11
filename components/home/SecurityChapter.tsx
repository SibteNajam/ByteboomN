'use client';

const SECURITY_ITEMS = [
  {
    id: '0',
    featured: true,
    image: '/images/funsecurity/sec1.png',
    alt: 'Non-custodial fund protection',
    title: 'Your Funds Stay Yours',
    body: 'Binance enforces API scopes at the exchange level. A trade-only key has no technical ability to move your balance — not for us, and not for anyone who might compromise our servers.',
  },
  {
    id: '1',
    featured: false,
    image: '/images/funsecurity/sec2.png',
    alt: 'Verified account security',
    title: 'You Control Access',
    body: "One click in your dashboard revokes ByteBoom's API access instantly — no waiting period, no support ticket, no questions asked.",
  },
  {
    id: '2',
    featured: false,
    image: '/images/funsecurity/sec3.png',
    alt: '100% encrypted reserves',
    title: 'Encrypted End to End',
    body: 'Credentials locked with AES-256 at rest. Every connection between ByteBoom and your exchange stays encrypted.',
  },
];

export default function SecurityChapter() {
  return (
    <section
      className="chapter chapter--security"
      id="securitynode"
      data-a="0.625"
      data-b="0.692"
      data-side="center"
      data-dir="center"
    >
      <div className="panel panel--security">
        <div className="sec-header">
          <h2>Your funds. Your control. Always.</h2>
          <p className="sec-lead">
            Every credential is locked down and every connection encrypted end to end — engineered so
            there&apos;s no technical path for anyone but you to move your balance.
          </p>
        </div>

        <div className="security-stage" id="security-inline">
          <div className="sec-stack">
            {SECURITY_ITEMS.map((item) => (
              <article
                key={item.id}
                className={`sec-item${item.featured ? ' sec-item--featured' : ''}`}
                data-sec={item.id}
              >
                <div className="sec-item__visual">
                  <span className="sec-item__orb" aria-hidden="true" />
                  <div className="sec-item__figure">
                    <img src={item.image} alt={item.alt} decoding="async" />
                  </div>
                  <span className="sec-item__plinth" aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
