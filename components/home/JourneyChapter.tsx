/** Trading Journey — five category docks (no second pass).
    Each dock holds 1+ screenshots; scroll crossfades in-phone within a
    category, then advances the live dock when the category changes.
    Speech uses this project's cloud bubble.
    Server component on purpose: stations.js owns live DOM (src / is-live);
    a client tree would wipe those mutations on re-render. */

const DOCKS = [0, 1, 2, 3, 4];

const LEGEND = [
  'Onboard',
  'Wallet',
  'Subscribe',
  'Connect',
  'Activate',
];

function CloudSpeech({ dock }: { dock: number }) {
  const gradId = `jpCloudGrad-${dock}`;
  const strokeId = `jpCloudStroke-${dock}`;
  return (
    <aside className="jp-speech">
      <svg className="jp-speech__cloud" viewBox="0 0 300 142" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id={gradId} x1="8%" y1="6%" x2="92%" y2="94%">
            <stop offset="0%" stopColor="rgba(18, 30, 48, 0.72)" />
            <stop offset="100%" stopColor="rgba(8, 12, 22, 0.68)" />
          </linearGradient>
          <linearGradient id={strokeId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(53, 226, 198, 0.5)" />
            <stop offset="55%" stopColor="rgba(130, 170, 215, 0.24)" />
            <stop offset="100%" stopColor="rgba(143, 123, 255, 0.34)" />
          </linearGradient>
        </defs>
        <path
          fill={`url(#${gradId})`}
          stroke={`url(#${strokeId})`}
          strokeWidth="1.2"
          strokeLinejoin="round"
          d="M 34 92 C 10 92 2 68 18 52 C 6 28 36 16 56 30 C 64 8 96 4 116 24 C 134 6 166 10 180 32 C 204 16 234 24 244 48 C 270 54 282 80 262 96 C 278 116 248 110 222 100 C 202 112 170 108 150 98 C 126 108 96 104 76 94 C 54 102 34 94 34 92 Z"
        />
      </svg>
      <div className="jp-speech__inner">
        <div className="jp-speech__scan" aria-hidden="true"></div>
        <p className="jp-kicker" />
        <h3 className="jp-title" />
        <p className="jp-body" />
      </div>
      <div className="jp-speech__tail" aria-hidden="true">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </aside>
  );
}

export default function JourneyChapter() {
  return (
    <section
      className="chapter chapter--journey"
      id="journeynode"
      data-a="0.30"
      data-b="0.52"
      data-side="center"
      data-dir="center"
    >
      <div className="panel panel--journey">
        <section
          className="bbj bbj--inline"
          id="bbj-inline"
          data-mock-dir="/traidngjourney/images/"
          aria-label="Your trading journey"
        >
          <div className="bbj-wrap">
            <header className="bbj-head">
              <h2>Your trading journey</h2>
              <p className="sec-lede">
                From first open to a live trading engine — each step shown on the phone as you scroll.
              </p>
            </header>

            <div className="journey-path">
              <div className="jp-rail" aria-live="polite">
                {DOCKS.map((i) => (
                  <div className="jp-slot" data-slot={i} key={i}>
                    <CloudSpeech dock={i} />

                    <div className="jp-stage">
                      <div className="phone-frame jp-phone" aria-hidden="true">
                        <div className="phone-rim">
                          <span className="phone-notch"></span>
                          <div className="phone-screen">
                            <img
                              className="jp-shot is-on"
                              alt=""
                              width={720}
                              height={1600}
                              decoding="async"
                            />
                            <img
                              className="jp-shot"
                              alt=""
                              width={720}
                              height={1600}
                              decoding="async"
                            />
                            <div className="jp-mock-fallback" hidden>
                              <span className="jp-phone-chip">
                                STEP <b className="jp-stop-num">1</b>
                              </span>
                              <p className="jp-pending">Screenshot pending</p>
                            </div>
                          </div>
                          <span className="phone-home"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <ol className="jp-legend">
                {LEGEND.map((label, i) => (
                  <li data-step={i} key={label}>
                    <b>{i + 1}</b>
                    <span>{label}</span>
                  </li>
                ))}
              </ol>
            </div>

            <nav className="journey-skip" aria-label="Skip journey section">
              <button type="button" className="journey-skip__btn journey-skip__btn--back" id="journeySkipBack">
                ← Back to Engines
              </button>
              <button type="button" className="journey-skip__btn journey-skip__btn--fwd" id="journeySkipForward">
                Skip to Pricing →
              </button>
            </nav>
          </div>
        </section>
      </div>
    </section>
  );
}
