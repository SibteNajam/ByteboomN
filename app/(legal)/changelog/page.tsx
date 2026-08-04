import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog — ByteBoom',
  description: "ByteBoom changelog — product updates, new bot features, and platform improvements.",
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
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">Changelog</h1>\r\n      <p class=\"legal-doc__meta\">Product updates &nbsp;·&nbsp; ByteBoom crypto trading bot</p>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>New features, improvements, and fixes for the ByteBoom automated spot trading platform. We ship regularly to\r\n          improve reliability, strategy performance, and user experience.</p>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <div class=\"changelog-entry\">\r\n          <h3>v1.2.0 — Dashboard refresh</h3>\r\n          <time datetime=\"2026-07-15\">July 15, 2026</time>\r\n          <ul>\r\n            <li>Redesigned bot overview with live P&amp;L and open orders</li>\r\n            <li>Faster Binance sync for order status updates</li>\r\n            <li>Improved mobile layout for portfolio view</li>\r\n          </ul>\r\n        </div>\r\n\r\n        <div class=\"changelog-entry\">\r\n          <h3>v1.1.0 — Grid bot improvements</h3>\r\n          <time datetime=\"2026-06-20\">June 20, 2026</time>\r\n          <ul>\r\n            <li>Configurable grid spacing and order count per pair</li>\r\n            <li>Auto-pause when balance drops below minimum threshold</li>\r\n            <li>Email alerts for grid completion and errors</li>\r\n          </ul>\r\n        </div>\r\n\r\n        <div class=\"changelog-entry\">\r\n          <h3>v1.0.0 — Public launch</h3>\r\n          <time datetime=\"2026-05-01\">May 1, 2026</time>\r\n          <ul>\r\n            <li>Binance spot integration with trade-only API keys</li>\r\n            <li>Grid and DCA bot strategies for major USDT pairs</li>\r\n            <li>Web dashboard and iOS/Android apps</li>\r\n            <li>AES-256 encryption for stored API credentials</li>\r\n          </ul>\r\n        </div>\r\n      </section>\r\n\r\n      <div class=\"legal-callout\">\r\n        <strong>Want early access?</strong> Follow us for release notes. Detailed changelogs for each bot strategy will\r\n        be added here as we expand the product line.\r\n      </div>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/status\">Status</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
