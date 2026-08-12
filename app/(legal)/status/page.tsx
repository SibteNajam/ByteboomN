import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'System Status — ByteBoom',
  description: "ByteBoom system status — uptime for trading engine, Binance connectivity, and dashboard services.",
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
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">System Status</h1>\r\n      <p class=\"legal-doc__meta\">Live service health &nbsp;·&nbsp; Last checked: July 31, 2026</p>\r\n\r\n      <div class=\"status-banner\">\r\n        <span class=\"status-banner__dot\" aria-hidden=\"true\"></span>\r\n        <span><strong>All systems operational</strong> — trading engine and Binance connectivity are running normally.</span>\r\n      </div>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>This page shows the current status of ByteBoom services. During incidents we post updates here and notify\r\n          affected users by email. Subscribe to status alerts — coming soon.</p>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Services</h2>\r\n        <ul class=\"status-list\">\r\n          <li class=\"status-item\">\r\n            <div>\r\n              <span class=\"status-item__name\">Trading engine</span>\r\n              <span class=\"status-item__desc\">Spot order execution &amp; trading engine orchestration</span>\r\n            </div>\r\n            <span class=\"status-badge status-badge--ok\">Operational</span>\r\n          </li>\r\n          <li class=\"status-item\">\r\n            <div>\r\n              <span class=\"status-item__name\">Binance API gateway</span>\r\n              <span class=\"status-item__desc\">Market data &amp; order routing</span>\r\n            </div>\r\n            <span class=\"status-badge status-badge--ok\">Operational</span>\r\n          </li>\r\n          <li class=\"status-item\">\r\n            <div>\r\n              <span class=\"status-item__name\">Web dashboard</span>\r\n              <span class=\"status-item__desc\">byteboom.ai &amp; user portal</span>\r\n            </div>\r\n            <span class=\"status-badge status-badge--ok\">Operational</span>\r\n          </li>\r\n          <li class=\"status-item\">\r\n            <div>\r\n              <span class=\"status-item__name\">Mobile app</span>\r\n              <span class=\"status-item__desc\">iOS &amp; Android client</span>\r\n            </div>\r\n            <span class=\"status-badge status-badge--ok\">Operational</span>\r\n          </li>\r\n          <li class=\"status-item\">\r\n            <div>\r\n              <span class=\"status-item__name\">Notifications</span>\r\n              <span class=\"status-item__desc\">Email &amp; push alerts</span>\r\n            </div>\r\n            <span class=\"status-badge status-badge--ok\">Operational</span>\r\n          </li>\r\n        </ul>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Recent incidents</h2>\r\n        <p>No incidents reported in the last 30 days. Historical incident logs will be published here as the status\r\n          page matures.</p>\r\n      </section>\r\n\r\n      <div class=\"legal-callout\">\r\n        <strong>Experiencing issues?</strong> Check <a href=\"/help\">Help Center</a> first, then email\r\n        <a href=\"mailto:support@byteboom.ai\">support@byteboom.ai</a> with your account email and a brief description.\r\n      </div>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/changelog\">Changelog</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
