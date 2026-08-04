'use client';

export default function BotsChapter() {
  return (
    <>
<section className="chapter chapter--bots" id="productnode" data-a="0.205" data-b="0.295" data-side="center"
    data-dir="left">
    <div className="panel panel--bots">
      <div className="bots-note">
        <p>Choose from aggressive, balanced, and conservative automation modes.</p>
        <p>Each bot matches a different risk profile while keeping execution disciplined.</p>
      </div>

      <div className="bcards">

        
        <article className="bcard bcard--aggressive">
          <div className="bcard__art">
            <img src="/images/Slice1aggressive.png" alt="" loading="lazy" decoding="async" />
          </div>
          <div className="bcard__body">
            <span className="bcard__tag">% Aggressive</span>
            <h3 className="bcard__title">Aggressive Bot</h3>
            <p className="bcard__desc">High risk, high reward<br />Maximum profit potential</p>
            <hr className="bcard__hr" />
            <dl className="bcard__stats">
              <div><dt>Risk Level</dt><dd className="stat--red">High</dd></div>
              <div><dt>Profit Potential</dt><dd className="stat--green">Very High</dd></div>
              <div><dt>Trade Frequency</dt><dd className="stat--violet">High</dd></div>
            </dl>
            <p className="bcard__foot">Best for experienced traders</p>
          </div>
        </article>

        
        <article className="bcard bcard--balanced bcard--rec">
          <div className="bcard__art">
            <img src="/images/Slice2-balanced.png" alt="" loading="lazy" decoding="async" />
          </div>
          <div className="bcard__body">
            <span className="bcard__tag"><svg className="bcard__tag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M19.89 2.54A1 1 0 0 0 19 2h-9c-.39 0-.75.23-.91.59l-5 11c-.14.31-.11.67.07.96s.5.46.84.46h5v6a1 1 0 0 0 1 1c.31 0 .62-.15.81-.41l8-11a1 1 0 0 0 .08-1.04a1 1 0 0 0-.89-.55h-3.06l3.87-5.42a1 1 0 0 0 .08-1.04Zm-6.7 6.88A.997.997 0 0 0 14 11h3.04L12 17.92V14c0-.55-.45-1-1-1H6.55l4.09-9h6.41l-3.87 5.42Z" /></svg>Balanced</span>
            <h3 className="bcard__title">Balanced Bot</h3>
            <p className="bcard__desc">Balanced risk &amp; reward<br />Consistent PnL growth</p>
            <hr className="bcard__hr" />
            <dl className="bcard__stats">
              <div><dt>Risk Level</dt><dd className="stat--amber">Medium</dd></div>
              <div><dt>Profit Potential</dt><dd className="stat--green">High</dd></div>
              <div><dt>Trade Frequency</dt><dd className="stat--cyan">Medium</dd></div>
            </dl>
            <p className="bcard__foot">Best balance for steady growth</p>
          </div>
        </article>

        
        <article className="bcard bcard--conservative">
          <div className="bcard__art">
            <img src="/images/Slice3conservative.png" alt="" loading="lazy" decoding="async" />
          </div>
          <div className="bcard__body">
            <span className="bcard__tag">% Conservative</span>
            <h3 className="bcard__title">Conservative Bot</h3>
            <p className="bcard__desc">Low risk, stable returns<br />Capital preservation focused</p>
            <hr className="bcard__hr" />
            <dl className="bcard__stats">
              <div><dt>Risk Level</dt><dd className="stat--emerald">Low</dd></div>
              <div><dt>Profit Potential</dt><dd className="stat--amber">Moderate</dd></div>
              <div><dt>Trade Frequency</dt><dd className="stat--emerald">Low</dd></div>
            </dl>
            <p className="bcard__foot">Best for long-term safety</p>
          </div>
        </article>

      </div>
    </div>
  </section>
    </>
  );
}
