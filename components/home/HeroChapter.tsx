'use client';

export default function HeroChapter() {
  return (
    <section
      className="chapter chapter--hero"
      id="top"
      data-a="0.00"
      data-b="0.06"
      data-side="center"
      data-dir="center"
    >
      <div className="panel panel--hero">
        <div className="hero-atmosphere" aria-hidden="true">
          <div className="hero-atmosphere__glow hero-atmosphere__glow--a" />
          <div className="hero-atmosphere__glow hero-atmosphere__glow--b" />
          <svg className="hero-atmosphere__field" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="heroRouteGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stopColor="#14e0d0" stopOpacity="0" />
                <stop offset="0.35" stopColor="#17d6ee" stopOpacity="0.85" />
                <stop offset="0.7" stopColor="#22a8ff" stopOpacity="0.7" />
                <stop offset="1" stopColor="#7d5cff" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="heroHorizonGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#17d6ee" stopOpacity="0.35" />
                <stop offset="1" stopColor="#17d6ee" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="hero-atmosphere__grid" stroke="rgba(130,170,215,0.09)" strokeWidth="1" fill="none">
              <path d="M0 180 H1440 M0 300 H1440 M0 420 H1440 M0 540 H1440 M0 660 H1440" />
              <path d="M180 0 V900 M360 0 V900 M540 0 V900 M720 0 V900 M900 0 V900 M1080 0 V900 M1260 0 V900" />
            </g>
            <ellipse className="hero-atmosphere__horizon" cx="720" cy="620" rx="520" ry="28" fill="url(#heroHorizonGrad)" />
            <path
              className="hero-atmosphere__route"
              fill="none"
              stroke="url(#heroRouteGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              d="M120 640 C 280 610, 340 500, 420 430 C 520 340, 610 310, 720 360 C 860 430, 920 520, 1040 500 C 1160 480, 1240 400, 1340 320"
            />
            <g className="hero-atmosphere__nodes" fill="#17d6ee">
              <circle cx="420" cy="430" r="3.5" />
              <circle cx="720" cy="360" r="4.5" />
              <circle cx="1040" cy="500" r="3.5" />
            </g>
          </svg>
        </div>

        <div className="hero-core">
          <p className="hero-brand">ByteBoom</p>
          <h1 className="hero-title">AI spot trading on your own Binance account</h1>
          <p className="hero-lead">
            Disciplined automation through a restricted, trade-only API key — your funds stay on your exchange,
            always.
          </p>
          <div className="hero__actions">
            <a href="#productnode" className="btn btn--primary btn--lg btn--hero" data-magnetic>
              Explore bots
              <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a href="#trustnode" className="btn btn--ghost btn--lg btn--hero">
              See how it works
            </a>
          </div>
          <p className="hero-assurance">Non-custodial · Trade-only API · Exit anytime</p>
        </div>
      </div>
    </section>
  );
}
