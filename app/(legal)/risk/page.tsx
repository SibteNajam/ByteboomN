import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Risk Disclosure — ByteBoom',
  description: "ByteBoom Risk Disclosure — important warnings about automated crypto trading on Binance.",
};

export default function Page() {
  return (
    <>
      <header className="legal-header">
        <Link className="legal-header__brand" href="/">
          <img className="legal-header__logo" src="/images/mainlogo.png" alt="ByteBoom" width={170} height={52} decoding="async" />
        </Link>
        <Link className="legal-header__back" href="/">&larr; <span>Back to home</span></Link>
      </header>
      <main className="legal-main">
        <article
          className="legal-doc"
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">Risk Disclosure</h1>\r\n      <p class=\"legal-doc__meta\">Effective Date: June 24, 2026 &nbsp;·&nbsp; Read before using ByteBoom</p>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>Automated cryptocurrency trading carries significant risk. ByteBoom provides software tools — not guaranteed\r\n          returns. You should understand these risks before connecting a Binance account or running any bot.</p>\r\n      </div>\r\n\r\n      <div class=\"legal-at-a-glance\">\r\n        <p class=\"legal-at-a-glance__label\">Key risks</p>\r\n        <ul>\r\n          <li>You can <span class=\"hl\">lose some or all</span> of your trading capital</li>\r\n          <li>Crypto markets are volatile; bots cannot eliminate market risk</li>\r\n          <li>Past backtests or performance do not predict future results</li>\r\n          <li>Exchange outages or API errors may affect order execution</li>\r\n        </ul>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Market risk</h2>\r\n        <p>Digital asset prices can move sharply in either direction. Grid, DCA, and other strategies may underperform\r\n          or lose money in trending, illiquid, or highly volatile conditions.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Automation risk</h2>\r\n        <p>Bots execute according to configured rules. Misconfiguration, insufficient balance, or unexpected market\r\n          behavior can produce unintended orders. Monitor your bots and set appropriate capital limits.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Third-party risk</h2>\r\n        <p>ByteBoom connects to Binance via API. We are not responsible for exchange downtime, policy changes, account\r\n          restrictions, or security incidents on the exchange side.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Not investment advice</h2>\r\n        <p>ByteBoom does not recommend specific assets, strategies, or position sizes. Consult qualified professionals\r\n          for financial, tax, and legal advice suited to your situation.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Your responsibility</h2>\r\n        <p>Only trade with capital you can afford to lose. Verify API permissions, understand each bot strategy, and\r\n          comply with laws in your country or region.</p>\r\n      </section>\r\n\r\n      <div class=\"legal-callout\">\r\n        <strong>Questions?</strong> Contact <a href=\"mailto:support@byteboom.ai\">support@byteboom.ai</a>. See also\r\n        <a href=\"/terms\">Terms of Service</a>.\r\n      </div>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/terms\">Terms</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
