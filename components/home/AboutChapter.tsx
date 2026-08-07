'use client';

export default function AboutChapter() {
  return (
    <>
<section className="chapter chapter--about" id="aboutnode" data-a="0.94" data-b="1.0" data-side="center" data-dir="center">
    <div className="panel panel--about">

      <div className="sec-header">
        <h2>Discipline, <span className="grad">engineered</span> — not adrenaline, promised.</h2>
        <p className="sec-lead">Autonomous execution on <b className="hl hl--cyan">your own Binance account</b> — your funds
          <b className="hl hl--green">never leave your control</b>.</p>
      </div>

      <div className="about-steps">
        <div className="about-step">
          <div className="about-step__icon about-step__icon--muted"><svg className="i">
              <use href="#i-chart" />
            </svg><span className="about-step__num">01</span></div>
          <h3>The problem</h3>
          <p>Markets move <b className="hl hl--amber">24/7</b> — manual trading means fatigue and emotional calls.</p>
        </div>
        <div className="about-step">
          <div className="about-step__icon about-step__icon--cyan"><svg className="i">
              <use href="#i-bolt" />
            </svg><span className="about-step__num">02</span></div>
          <h3>The idea</h3>
          <p>Replace reaction with AI — act <b className="hl hl--cyan">only when signals align</b>.</p>
        </div>
        <div className="about-step">
          <div className="about-step__icon about-step__icon--green"><svg className="i">
              <use href="#i-shield" />
            </svg><span className="about-step__num">03</span></div>
          <h3>The product</h3>
          <p>Runs on your Binance account via a <b className="hl hl--green">restricted, trade-only API key</b>.</p>
        </div>
      </div>

      <div className="about-principles">
        <span className="about-principles__label">What this means for you</span>
        <div className="about-principles__grid">
          <div className="about-principle">
            <span className="about-principle__icon about-principle__icon--cyan"><svg className="i">
                <use href="#i-layers" />
              </svg></span>
            <h4>Built on Binance</h4>
            <p>Every trade executes on <b className="hl hl--cyan">Binance's own engine</b>.</p>
          </div>
          <div className="about-principle">
            <span className="about-principle__icon about-principle__icon--violet"><svg className="i">
                <use href="#i-check" />
              </svg></span>
            <h4>Honest by default</h4>
            <p><b className="hl hl--violet">No performance guarantees</b>, ever.</p>
          </div>
          <div className="about-principle">
            <span className="about-principle__icon about-principle__icon--amber"><svg className="i">
                <use href="#i-clock" />
              </svg></span>
            <h4>Always-on discipline</h4>
            <p>Same logic, applied <b className="hl hl--amber">every single time</b>.</p>
          </div>
          <div className="about-principle">
            <span className="about-principle__icon about-principle__icon--green"><svg className="i">
                <use href="#i-exit" />
              </svg></span>
            <h4>Exit anytime</h4>
            <p>Revoke API access <b className="hl hl--green">in one click</b>.</p>
          </div>
        </div>
      </div>

    </div>
  </section>
    </>
  );
}
