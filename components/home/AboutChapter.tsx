'use client';

export default function AboutChapter() {
  return (
    <section className="chapter chapter--about" id="aboutnode" data-a="0.94" data-b="1.0" data-side="center" data-dir="center">
      <div className="panel panel--about">

        <div className="sec-header">
          <h2>Discipline, <span className="grad">engineered</span> — not adrenaline, promised.</h2>
          <p className="sec-lead">Built for calm decisions — so you are not glued to charts all night.</p>
        </div>

        {/* Problem → idea → product. The icon tint carries the progression:
            dull, then the decision, then the result. */}
        <div className="about-steps">
          <div className="about-step">
            <div className="about-step__icon about-step__icon--muted"><svg className="i">
              <use href="#i-chart" />
            </svg></div>
            <h3>The problem</h3>
            <p>Markets move <b className="hl hl--cyan">24/7</b> — manual trading means fatigue and emotional calls.</p>
          </div>
          <div className="about-step">
            <div className="about-step__icon about-step__icon--cyan"><svg className="i">
              <use href="#i-bolt" />
            </svg></div>
            <h3>The idea</h3>
            <p>Replace reaction with AI — act <b className="hl hl--cyan">only when signals align</b>.</p>
          </div>
          <div className="about-step">
            <div className="about-step__icon about-step__icon--green"><svg className="i">
              <use href="#i-shield" />
            </svg></div>
            <h3>The product</h3>
            <p>A trading engine that follows rules — so you trade with a plan, not with panic.</p>
          </div>
        </div>

        <div className="about-principles">
          <span className="about-principles__label">What this means for you</span>
          <div className="about-principles__grid">
            <div className="about-principle">
              <span className="about-principle__icon"><svg className="i">
                <use href="#i-layers" />
              </svg></span>
              <h4>Same rules every time</h4>
              <p>No mood swings — <b className="hl hl--cyan">one clear playbook</b>.</p>
            </div>
            <div className="about-principle">
              <span className="about-principle__icon"><svg className="i">
                <use href="#i-check" />
              </svg></span>
              <h4>Honest by default</h4>
              <p><b className="hl hl--cyan">No performance guarantees</b>, ever.</p>
            </div>
            <div className="about-principle">
              <span className="about-principle__icon"><svg className="i">
                <use href="#i-clock" />
              </svg></span>
              <h4>Works while you sleep</h4>
              <p>Markets never rest — <b className="hl hl--cyan">neither does the trading engine</b>.</p>
            </div>
            <div className="about-principle">
              <span className="about-principle__icon"><svg className="i">
                <use href="#i-exit" />
              </svg></span>
              <h4>You stay in charge</h4>
              <p>Pause or stop when <b className="hl hl--cyan">you</b> decide.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
