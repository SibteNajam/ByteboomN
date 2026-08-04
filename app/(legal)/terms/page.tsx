import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service — ByteBoom',
  description: "ByteBoom Terms of Service — rules for using our automated crypto trading bot and platform.",
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
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">Terms of Service</h1>\r\n      <p class=\"legal-doc__meta\">Effective Date: June 24, 2026 &nbsp;·&nbsp; Placeholder — full terms coming soon</p>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>These Terms govern your use of ByteBoom's website, apps, and automated trading services. By creating an\r\n          account or using our bots, you agree to these Terms and our <a href=\"/privacy\">Privacy Policy</a>.</p>\r\n      </div>\r\n\r\n      <div class=\"legal-at-a-glance\">\r\n        <p class=\"legal-at-a-glance__label\">Summary</p>\r\n        <ul>\r\n          <li>ByteBoom provides <span class=\"hl\">software automation</span> — not investment advice</li>\r\n          <li>You connect your own Binance account; we are <span class=\"hl\">non-custodial</span></li>\r\n          <li>You are responsible for API keys, taxes, and compliance in your jurisdiction</li>\r\n          <li>Subscriptions bill as described at signup; cancel anytime</li>\r\n        </ul>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>1. Service description</h2>\r\n        <p>ByteBoom offers tools to automate spot trading on Binance through user-authorized API keys. We do not hold\r\n          customer funds, execute withdrawals, or guarantee trading profits.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>2. Eligibility</h2>\r\n        <p>You must be of legal age in your jurisdiction and permitted to use cryptocurrency trading services. You may\r\n          not use ByteBoom where prohibited by law or exchange rules.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>3. Account &amp; API keys</h2>\r\n        <p>You are responsible for securing your ByteBoom login and Binance API credentials. Grant only the permissions\r\n          required for spot trading. Notify us immediately if you suspect unauthorized access.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>4. Fees &amp; billing</h2>\r\n        <p>Subscription fees are charged as shown at purchase. There is no free trial unless explicitly stated. Refund\r\n          policy details will be published in the complete Terms document.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>5. No financial advice</h2>\r\n        <p>ByteBoom does not provide investment, tax, or legal advice. Bot strategies, backtests, and marketing\r\n          materials are informational. Past performance does not guarantee future results.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>6. Limitation of liability</h2>\r\n        <p>Trading involves substantial risk of loss. To the maximum extent permitted by law, ByteBoom is not liable\r\n          for trading losses, exchange outages, or market volatility. See also our\r\n          <a href=\"/risk\">Risk Disclosure</a>.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>7. Contact</h2>\r\n        <p>Questions about these Terms: <a href=\"mailto:support@byteboom.ai\">support@byteboom.ai</a>.</p>\r\n      </section>\r\n\r\n      <div class=\"legal-callout\">\r\n        <strong>Note:</strong> This is a simplified placeholder. A complete Terms of Service with jurisdiction,\r\n        arbitration, and detailed provisions will replace this page.\r\n      </div>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/privacy\">Privacy</a> · <a\r\n            href=\"/risk\">Risk</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
