'use client';

export default function JourneyChapter() {
  return (
    <>
<section className="chapter chapter--journey" id="journeynode" data-a="0.30" data-b="0.52" data-side="center"
    data-dir="center">
    <div className="panel panel--journey">
      <section className="bbj bbj--inline" id="bbj-inline" data-mock-dir="/traidngjourney/images/"
        aria-label="Your trading journey">
        <div className="bbj-wrap">
          <header className="bbj-head">
            <h2>Your trading journey</h2>
            <p className="sec-lede">Open app → signals &amp; demo → subscribe → connect Binance → activate → unlink or
              delete when you choose.</p>
          </header>

          <div className="journey-path" aria-label="User journey path guide">
            <div className="jp-canvas">
              <svg className="jp-svg" viewBox="0 0 1000 440" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                <defs>
                  <linearGradient id="bbjGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#35e2c6" />
                    <stop offset="55%" stopColor="#f0b35e" />
                    <stop offset="100%" stopColor="#8f7bff" />
                  </linearGradient>
                </defs>
                <path className="jp-route-base" fill="none"
                  d="M70,92 C160,88 210,150 250,210 C300,290 360,330 450,300 C540,270 560,180 520,130 C480,80 420,70 380,110 C330,165 370,250 460,280 C560,315 660,250 720,180 C780,110 850,90 930,130" />
                <path className="jp-route-lit" fill="none"
                  d="M70,92 C160,88 210,150 250,210 C300,290 360,330 450,300 C540,270 560,180 520,130 C480,80 420,70 380,110 C330,165 370,250 460,280 C560,315 660,250 720,180 C780,110 850,90 930,130" />
                <g className="jp-stops"></g>
                <g className="jp-bot" transform="translate(70,92)">
                  <circle r="14" className="jp-bot-halo" />
                  <circle r="7" className="jp-bot-core" />
                  <circle cx="-3" cy="-2" r="1.6" className="jp-bot-eye" />
                  <circle cx="3" cy="-2" r="1.6" className="jp-bot-eye" />
                </g>
              </svg>

              <aside className="jp-popup" aria-live="polite">
                <div className="jp-speech is-open">
                  <svg className="jp-speech__cloud" viewBox="0 0 300 142" preserveAspectRatio="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="jpCloudGrad" x1="8%" y1="6%" x2="92%" y2="94%">
                        <stop offset="0%" stopColor="rgba(18, 30, 48, 0.98)" />
                        <stop offset="100%" stopColor="rgba(8, 12, 22, 0.96)" />
                      </linearGradient>
                      <linearGradient id="jpCloudStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(53, 226, 198, 0.5)" />
                        <stop offset="55%" stopColor="rgba(130, 170, 215, 0.24)" />
                        <stop offset="100%" stopColor="rgba(143, 123, 255, 0.34)" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#jpCloudGrad)"
                      stroke="url(#jpCloudStroke)"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                      d="M 34 92 C 10 92 2 68 18 52 C 6 28 36 16 56 30 C 64 8 96 4 116 24 C 134 6 166 10 180 32 C 204 16 234 24 244 48 C 270 54 282 80 262 96 C 278 116 248 110 222 100 C 202 112 170 108 150 98 C 126 108 96 104 76 94 C 54 102 34 94 34 92 Z"
                    />
                  </svg>
                  <div className="jp-speech__inner">
                    <div className="jp-speech__scan" aria-hidden="true"></div>
                    <p className="jp-kicker">01 · Open</p>
                    <h3 className="jp-title">Login / Signup</h3>
                    <p className="jp-body">Creates an account or logs in — fast entry into the product.</p>
                    <div className="jp-dots" aria-hidden="true"></div>
                  </div>
                  <div className="jp-speech__tail" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
                <div className="phone-frame jp-phone" aria-hidden="true">
                  <div className="phone-rim">
                    <span className="phone-notch"></span>
                    <div className="phone-screen jp-slide-stage">
                      <img
                        className="jp-slide is-show"
                        src="/traidngjourney/images/onboard.jpeg"
                        alt="ByteBoom onboarding screen"
                        width={390}
                        height={844}
                        decoding="async"
                      />
                      <img className="jp-slide" alt="" width="390" height="844" decoding="async" />
                      <div className="jp-mock-fallback" hidden>
                        <span className="jp-phone-chip">STOP <b className="jp-stop-num">1</b></span>
                        <p className="jp-pending">Screenshot pending</p>
                      </div>
                    </div>
                    <span className="phone-home"></span>
                  </div>
                </div>
              </aside>
            </div>

            <ol className="jp-legend">
              <li data-group="1"><b>1</b><span>Login</span></li>
              <li data-group="2"><b>2</b><span>Demo</span></li>
              <li data-group="3"><b>3</b><span>Subscribe</span></li>
              <li data-group="4"><b>4</b><span>Connect</span></li>
              <li data-group="5"><b>5</b><span>Activate</span></li>
              <li data-group="6"><b>6</b><span>Unlink</span></li>
              <li data-group="7"><b>7</b><span>Delete</span></li>
            </ol>
          </div>

          <nav className="journey-skip" aria-label="Skip journey section">
            <button type="button" className="journey-skip__btn journey-skip__btn--back" id="journeySkipBack">
              ← Back to Bots
            </button>
            <button type="button" className="journey-skip__btn journey-skip__btn--fwd" id="journeySkipForward">
              Skip to Pricing →
            </button>
          </nav>
        </div>
      </section>
    </div>
  </section>
    </>
  );
}
