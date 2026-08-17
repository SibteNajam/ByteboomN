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
        <h2>Straight answers before you <span className="grad">connect</span></h2>
        <p className="sec-lead">Practical questions — plans, support, and what happens next.</p>
      </div>

      <div className="faq-grid">
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
            <span>How long does setup take?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>Most people finish signup, plan, and linking in a few minutes from the app.</p>
        </details>
        <details className="faq-item">
          <summary>
            <span>Can I pause or stop anytime?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>Yes — pause, stop, or remove the trading engine from your dashboard whenever you want.</p>
        </details>
        <details className="faq-item">
          <summary>
            <span>Which markets can I trade?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>Spot markets on supported exchanges — choose what you want from your dashboard.</p>
        </details>
        <details className="faq-item">
          <summary>
            <span>Is there a free trial?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>No free trial today. Plans start when you subscribe, and you can cancel anytime.</p>
        </details>
        <details className="faq-item">
          <summary>
            <span>Who do I contact for help?</span>
            <span className="faq-item__chev"><svg className="i">
                <use href="#i-chev" />
              </svg></span>
          </summary>
          <p>Email support@byteboom.ai — we usually reply within one business day.</p>
        </details>
      </div>

        </div>
      </div>

    </section>

    <footer className="footer site-footer" id="footer">
      <div className="footer__accent" aria-hidden="true"></div>
      <div className="wrap footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="footer__logo-link" href="#top">
              <img className="footer__logo" src="/images/mainlogo.png" alt="ByteBoom" width="280" height="86" decoding="async" />
            </a>
            <p className="footer__headline">ByteBoom — automation built for calm traders.</p>
            <p className="footer__sub">Connect your exchange, start the trading engine, and check in when you want — not every minute.</p>
            <a className="footer__email" href="mailto:support@byteboom.ai">support@byteboom.ai</a>
            <div className="footer__social" aria-label="Social links">
              <a href="#" title="GitHub — coming soon" aria-label="GitHub"><svg className="i"><use href="#i-github" /></svg></a>
              <a href="#" title="LinkedIn — coming soon" aria-label="LinkedIn"><svg className="i"><use href="#i-linkedin" /></svg></a>
              <a href="#" title="X — coming soon" aria-label="X"><svg className="i"><use href="#i-x-social" /></svg></a>
              <a href="#" title="Discord — coming soon" aria-label="Discord"><svg className="i"><use href="#i-discord" /></svg></a>
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
          <p className="footer__copy">&copy; 2026 ByteBoom AI. All rights reserved.</p>
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
