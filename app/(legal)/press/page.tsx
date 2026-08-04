import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Press Kit — ByteBoom',
  description: "ByteBoom press kit — brand assets, company overview, and media contact for our crypto trading bot.",
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
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">Press Kit</h1>\r\n      <p class=\"legal-doc__meta\">Media resources &nbsp;·&nbsp; ByteBoom AI</p>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>ByteBoom is an automated spot trading platform for Binance. Use the information below for articles,\r\n          reviews, and coverage. For interviews or custom assets, contact\r\n          <a href=\"mailto:hello@byteboom.ai\">hello@byteboom.ai</a>.</p>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Company overview</h2>\r\n        <p><strong>ByteBoom</strong> provides non-custodial crypto trading bots that connect to users' Binance accounts\r\n          via trade-only API keys. Strategies include grid trading, DCA, and signal-based spot automation. Funds remain\r\n          on the user's exchange at all times.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Boilerplate</h2>\r\n        <div class=\"info-card\">\r\n          <p>ByteBoom AI builds disciplined automation for Binance spot traders. Our bots execute 24/7 using encrypted,\r\n            trade-only API credentials — non-custodial by design. Trading involves risk; ByteBoom emphasizes\r\n            transparency, security, and user control.</p>\r\n        </div>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Brand assets</h2>\r\n        <p>Logo files and brand guidelines will be available for download here. For now, journalists may use the logo\r\n          from <a href=\"/\">byteboom.ai</a> with attribution to ByteBoom AI.</p>\r\n        <ul>\r\n          <li>Primary logo: cyan gradient on dark background</li>\r\n          <li>Company name: ByteBoom (capital B, capital B)</li>\r\n          <li>Website: byteboom.ai</li>\r\n        </ul>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Media contact</h2>\r\n        <p><a href=\"mailto:hello@byteboom.ai\">hello@byteboom.ai</a></p>\r\n      </section>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/contact\">Contact</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
