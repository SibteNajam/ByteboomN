'use client';

export default function PricingChapter() {
  return (
    <section
      className="chapter chapter--pricing"
      id="pricingnode"
      data-a="0.53"
      data-b="0.625"
      data-side="center"
      data-dir="center"
    >
      <div className="panel panel--pricing">
        <div className="pricing-head">
          <h2>
            Choose your <span className="grad">trading plan</span>
          </h2>
        </div>

        <div className="pricing-stage" id="pricing-inline">
          <div className="pricing-grid">
            <div className="pcard pcard--basic" data-plan="0">
              <div className="pcard-node pcard-node--tl"></div>
              <div className="pcard-node pcard-node--tr"></div>
              <div className="pcard-top">
                {/* the tiers differ by how many exchanges you can connect, so
                    the marks count connections instead of borrowing a padlock,
                    a bolt and a medal from three different icon packs */}
                <div className="pcard-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-tier-1" />
                  </svg>
                </div>
                <div className="pcard-name">Recruit Basic</div>
                <p className="pcard-desc">Essential tools for new traders.</p>
                <div className="pcard-price">
                  <b>8</b>
                  <span>USDT / mo</span>
                </div>
                <div className="pcard-billed">96 USDT billed yearly</div>
                <hr className="pcard-hr" />
                <ul className="pcard-feats">
                  <li>
                    <span className="pcard-chk on"></span>1 exchange connection
                  </li>
                  <li>
                    <span className="pcard-chk on"></span>Conservative trading engine only
                  </li>
                  <li>
                    <span className="pcard-chk on"></span>Basic portfolio tracking
                  </li>
                  <li className="off">
                    <span className="pcard-chk"></span>Aggressive &amp; balanced engines
                  </li>
                  <li className="off">
                    <span className="pcard-chk"></span>Priority signal alerts
                  </li>
                </ul>
              </div>
              <a href="#" className="pcard-cta pcard-cta--ghost">
                Get Started
              </a>
            </div>

            <div className="pcard pcard--pro pcard--rec" data-plan="1">
              <div className="pcard-flag">Save 27%</div>
              <div className="pcard-badge">Popular</div>
              <div className="pcard-top">
                <div className="pcard-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-tier-3" />
                  </svg>
                </div>
                <div className="pcard-name">Talent Pro</div>
                <p className="pcard-desc">Automation and monitoring for active traders.</p>
                <div className="pcard-price">
                  <s>14</s>
                  <b>10</b>
                  <span>USDT / mo</span>
                </div>
                <div className="pcard-billed">120 USDT billed yearly</div>
                <hr className="pcard-hr" />
                <ul className="pcard-feats">
                  <li>
                    <span className="pcard-chk on"></span>3 exchange connections
                  </li>
                  <li>
                    <span className="pcard-chk on"></span>Aggressive &amp; balanced engines
                  </li>
                  <li>
                    <span className="pcard-chk on"></span>Priority signal alerts
                  </li>
                  <li>
                    <span className="pcard-chk on"></span>Advanced portfolio analytics
                  </li>
                  <li className="off">
                    <span className="pcard-chk"></span>Unlimited exchanges
                  </li>
                </ul>
              </div>
              <a href="#" className="pcard-cta pcard-cta--primary">
                Get Started
              </a>
            </div>

            <div className="pcard pcard--master" data-plan="2">
              <div className="pcard-node pcard-node--tl"></div>
              <div className="pcard-node pcard-node--tr"></div>
              <div className="pcard-top">
                <div className="pcard-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-tier-max" />
                  </svg>
                </div>
                <div className="pcard-name">HR Master</div>
                <p className="pcard-desc">Full automation for serious traders.</p>
                <div className="pcard-price">
                  <b>20</b>
                  <span>USDT / mo</span>
                </div>
                <div className="pcard-billed">240 USDT billed yearly</div>
                <hr className="pcard-hr" />
                <ul className="pcard-feats">
                  <li>
                    <span className="pcard-chk on"></span>Unlimited exchanges
                  </li>
                  <li>
                    <span className="pcard-chk on"></span>All trading engines unlocked
                  </li>
                  <li>
                    <span className="pcard-chk on"></span>Priority signal alerts
                  </li>
                  <li>
                    <span className="pcard-chk on"></span>Advanced analytics
                  </li>
                  <li>
                    <span className="pcard-chk on"></span>24/7 priority support
                  </li>
                </ul>
              </div>
              <a href="#" className="pcard-cta pcard-cta--violet">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
