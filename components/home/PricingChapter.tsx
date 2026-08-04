'use client';

export default function PricingChapter() {
  return (
    <>
<section className="chapter chapter--pricing" id="pricingnode" data-a="0.53" data-b="0.61" data-side="center"
    data-dir="center">
    <div className="panel panel--pricing">
      <div className="pricing-head">
        <span className="kicker">Node 04 · Pricing</span>
        <h2>Choose your <span className="grad">trading plan</span></h2>
      </div>
      <div className="pricing-grid">

        
        <div className="pcard pcard--basic">
          <div className="pcard-node pcard-node--tl"></div>
          <div className="pcard-node pcard-node--tr"></div>
          <div className="pcard-icon">
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <div className="pcard-name">Recruit Basic</div>
          <p className="pcard-desc">Essential tools for new traders testing the waters.</p>
          <div className="pcard-price"><b>8</b><span>USDT / mo</span></div>
          <div className="pcard-billed">96 USDT billed yearly</div>
          <hr className="pcard-hr" />
          <ul className="pcard-feats">
            <li><span className="pcard-chk on"></span>1 exchange connection</li>
            <li><span className="pcard-chk on"></span>Conservative bot only</li>
            <li><span className="pcard-chk on"></span>Basic portfolio tracking</li>
            <li className="off"><span className="pcard-chk"></span>Aggressive & balanced bots</li>
            <li className="off"><span className="pcard-chk"></span>Priority signal alerts</li>
          </ul>
          <a href="#" className="pcard-cta pcard-cta--ghost">Get Started</a>
        </div>

        
        <div className="pcard pcard--pro pcard--rec">
          <div className="pcard-flag">Save 27%</div>
          <div className="pcard-badge">Popular</div>
          <div className="pcard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="M19.89 2.54A1 1 0 0 0 19 2h-9c-.39 0-.75.23-.91.59l-5 11c-.14.31-.11.67.07.96s.5.46.84.46h5v6a1 1 0 0 0 1 1c.31 0 .62-.15.81-.41l8-11a1 1 0 0 0 .08-1.04a1 1 0 0 0-.89-.55h-3.06l3.87-5.42a1 1 0 0 0 .08-1.04Zm-6.7 6.88A.997.997 0 0 0 14 11h3.04L12 17.92V14c0-.55-.45-1-1-1H6.55l4.09-9h6.41l-3.87 5.42Z" />
            </svg>
          </div>
          <div className="pcard-name">Talent Pro</div>
          <p className="pcard-desc">Enhanced automation and real-time monitoring for active traders.</p>
          <div className="pcard-price"><s>14</s><b>10</b><span>USDT / mo</span></div>
          <div className="pcard-billed">120 USDT billed yearly</div>
          <hr className="pcard-hr" />
          <ul className="pcard-feats">
            <li><span className="pcard-chk on"></span>3 exchange connections</li>
            <li><span className="pcard-chk on"></span>Aggressive & balanced bots</li>
            <li><span className="pcard-chk on"></span>Priority signal alerts</li>
            <li><span className="pcard-chk on"></span>Advanced portfolio analytics</li>
            <li className="off"><span className="pcard-chk"></span>Unlimited exchanges</li>
          </ul>
          <a href="#" className="pcard-cta pcard-cta--primary">Get Started</a>
        </div>

        
        <div className="pcard pcard--master">
          <div className="pcard-node pcard-node--tl"></div>
          <div className="pcard-node pcard-node--tr"></div>
          <div className="pcard-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" d="m9.925 13.277l.779-2.58l-2.05-1.505h2.562L12 6.585l.785 2.607h2.561l-2.056 1.504l.78 2.581L12 11.675zM7 21.462v-6.59q-.95-.935-1.475-2.19Q5 11.43 5 10q0-2.927 2.036-4.963T12 3t4.964 2.036T19 10q0 1.429-.525 2.683T17 14.87v6.59l-5-1.5zm9.25-7.212Q18 12.5 18 10t-1.75-4.25T12 4T7.75 5.75T6 10t1.75 4.25T12 16t4.25-1.75M8 20.044l4-1.121l4 1.121v-4.33q-.836.615-1.859.95Q13.12 17 12 17t-2.141-.335T8 15.714zm4-2.165" />
            </svg>
          </div>
          <div className="pcard-name">HR Master</div>
          <p className="pcard-desc">Premium automation with full customization for serious traders.</p>
          <div className="pcard-price"><b>20</b><span>USDT / mo</span></div>
          <div className="pcard-billed">240 USDT billed yearly</div>
          <hr className="pcard-hr" />
          <ul className="pcard-feats">
            <li><span className="pcard-chk on"></span>Unlimited exchanges</li>
            <li><span className="pcard-chk on"></span>All bot modes unlocked</li>
            <li><span className="pcard-chk on"></span>Priority signal alerts</li>
            <li><span className="pcard-chk on"></span>Advanced analytics</li>
            <li><span className="pcard-chk on"></span>24/7 priority support</li>
          </ul>
          <a href="#" className="pcard-cta pcard-cta--violet">Get Started</a>
        </div>

      </div>
    </div>
  </section>
    </>
  );
}
