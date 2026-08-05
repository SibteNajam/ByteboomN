'use client';

export default function ScrollTail() {
  return (
    <>
<div id="hint">
    <div className="wheel"></div><span>scroll to travel</span>
  </div>
  <div id="runway"></div>

  
  <div id="scroll-tail" className="scroll-tail">
    <section className="arrival-section" id="faqnode">
      <div className="wrap">
        <div className="panel panel--faq">

      <div className="sec-header">
        <span className="sec-tag">Arrival</span>
        <h2>Ready to put ByteBoom to work <span className="grad">on your Binance account?</span></h2>
        <p className="sec-lead">A few straight answers, then you're in control.</p>
      </div>

      <div className="faq-grid">
        <details className="faq-item">
          <summary>
            <span>Where do my funds stay?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>In your Binance account. ByteBoom never custodies funds.</p>
        </details>
        <details className="faq-item">
          <summary>
            <span>What API permissions do I need?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>Trade only — never withdrawal. Keys with withdrawal are rejected.</p>
        </details>
        <details className="faq-item">
          <summary>
            <span>Is profit guaranteed?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>No. Markets carry risk no automated system can remove.</p>
        </details>
        <details className="faq-item">
          <summary>
            <span>Can I pause, stop, unlink or delete?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>Yes — pause, stop, emergency exit, unlink your exchange, or delete your account, anytime.</p>
        </details>
        <details className="faq-item">
          <summary>
            <span>Which exchanges are supported?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>Binance spot today — connect with a trade-only API key from your dashboard.</p>
        </details>
        <details className="faq-item">
          <summary>
            <span>Is there a free trial?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>No — ByteBoom does not offer a free trial. Plans are billed when you subscribe. You can pause, stop, or cancel anytime from your dashboard.</p>
        </details>
      </div>

      <div className="faq-final">
        <div className="btnrow">
          <a href="#pricingnode" className="btn btn--primary btn--lg" data-magnetic>Get Started</a>
          <a href="mailto:support@byteboom.ai" className="btn btn--ghost btn--lg">Talk to support</a>
        </div>
        <p className="risk2"><svg className="i">
            <use href="#i-shield" />
          </svg>Markets remain unpredictable — no automated system can guarantee profit or eliminate loss.</p>
      </div>

        </div>
      </div>
    </section>

    <footer className="footer site-footer" id="footer">
      <div className="footer__accent" aria-hidden="true"></div>
      <div className="wrap footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <p className="footer__eyebrow">ByteBoom</p>
            <p className="footer__headline">Disciplined automation on your Binance account.</p>
            <p className="footer__sub">Non-custodial trading with a trade-only API. Your funds never leave your exchange.</p>
            <div className="footer__meta">
              <a className="footer__email" href="mailto:support@byteboom.ai">support@byteboom.ai</a>
              <div className="footer__social" aria-label="Social links">
                <a href="#" title="GitHub — coming soon" aria-label="GitHub"><svg className="i"><use href="#i-github" /></svg></a>
                <a href="#" title="LinkedIn — coming soon" aria-label="LinkedIn"><svg className="i"><use href="#i-linkedin" /></svg></a>
                <a href="#" title="X — coming soon" aria-label="X"><svg className="i"><use href="#i-x-social" /></svg></a>
                <a href="#" title="Discord — coming soon" aria-label="Discord"><svg className="i"><use href="#i-discord" /></svg></a>
              </div>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__col">
              <span className="footer__label">Resources</span>
              <ul className="footer__list">
                <li><a href="/docs">Documentation</a></li>
                <li><a href="/help">Help Center</a></li>
                <li><a href="/status">System Status</a></li>
                <li><a href="/changelog">Changelog</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <span className="footer__label">Company</span>
              <ul className="footer__list">
                <li><a href="/about">About ByteBoom</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/careers">Careers</a></li>
                <li><a href="/press">Press Kit</a></li>
              </ul>
            </div>
            <div className="footer__col">
              <span className="footer__label">Legal</span>
              <ul className="footer__list">
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms of Service</a></li>
                <li><a href="/risk">Risk Disclosure</a></li>
                <li><a href="/cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <div className="footer__legal">
            <a className="footer__logo-link" href="#top">
              <img className="footer__logo" src="/images/mainlogo.png" alt="ByteBoom" width="280" height="86" decoding="async" />
            </a>
            <p className="footer__copy">&copy; 2026 ByteBoom AI. All rights reserved.</p>
          </div>
          <p className="footer__disclaimer">Trading involves risk. Past performance does not guarantee future results.</p>
        </div>
      </div>
    </footer>
  </div>

  <div className="scroll-tail-hint" id="scrollTailHint" aria-hidden="true">
    <span className="scroll-tail-hint__wheel"></span>
    <span>Keep scrolling for footer</span>
  </div>
    </>
  );
}
