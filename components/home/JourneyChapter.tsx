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
                <div className="journey-divider" aria-hidden="true"></div>
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
                <div className="jp-copy">
                  <p className="jp-kicker">01 · Open</p>
                  <h3 className="jp-title">Login / Signup</h3>
                  <p className="jp-body">Creates an account or logs in — fast entry into the product.</p>
                  <div className="jp-dots" aria-hidden="true"></div>
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
        </div>
      </section>
    </div>
  </section>
    </>
  );
}
