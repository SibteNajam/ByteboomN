import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About ByteBoom — ByteBoom',
  description: "About ByteBoom — disciplined automated spot trading on Binance with non-custodial, trade-only API access.",
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
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">About ByteBoom</h1>\r\n      <p class=\"legal-doc__meta\">Our mission &nbsp;·&nbsp; Automated crypto trading, done responsibly</p>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>ByteBoom builds <span class=\"hl\">disciplined automation</span> for Binance spot traders. We believe bots\r\n          should execute consistently, transparently, and without taking custody of your funds — so you stay in control\r\n          of your capital on the exchange you trust.</p>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>What we do</h2>\r\n        <p>ByteBoom connects to your Binance account via trade-only API keys and runs automated spot strategies — grid\r\n          trading, DCA, and signal-based bots — around the clock. Our engine handles order placement, rebalancing, and\r\n          risk checks so you don't have to watch charts 24/7.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Non-custodial by design</h2>\r\n        <p>We never hold your crypto. Funds remain on Binance under your account. API keys are encrypted at rest, and\r\n          withdrawal permissions are never requested. Pause or revoke access anytime.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Built for traders</h2>\r\n        <p>Whether you're diversifying with grid bots or scaling into positions with DCA, ByteBoom focuses on\r\n          reliability, clear reporting, and sensible defaults — not hype. Trading involves risk; we surface that\r\n          honestly in our product and communications.</p>\r\n      </section>\r\n\r\n      <div class=\"legal-callout\">\r\n        <strong>Get in touch.</strong> Partnerships, press, or general inquiries —\r\n        <a href=\"/contact\">Contact us</a> or email <a href=\"mailto:support@byteboom.ai\">support@byteboom.ai</a>.\r\n      </div>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/careers\">Careers</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
