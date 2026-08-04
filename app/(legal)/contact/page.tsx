import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contact — ByteBoom',
  description: "Contact ByteBoom — support, partnerships, and general inquiries about our crypto trading bot.",
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
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">Contact</h1>\r\n      <p class=\"legal-doc__meta\">We'd love to hear from you</p>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>Questions about ByteBoom, your Binance bot setup, billing, or partnerships? Reach out — our team typically\r\n          responds within one business day.</p>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Support</h2>\r\n        <div class=\"info-card\">\r\n          <p><strong>Email:</strong> <a href=\"mailto:support@byteboom.ai\">support@byteboom.ai</a></p>\r\n          <p>For account issues, API connection help, and bot troubleshooting. Include your registered email and a short\r\n            description of the issue.</p>\r\n        </div>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Partnerships &amp; press</h2>\r\n        <div class=\"info-card\">\r\n          <p><strong>Email:</strong> <a href=\"mailto:hello@byteboom.ai\">hello@byteboom.ai</a></p>\r\n          <p>Media inquiries, integrations, and business development. See also our <a href=\"/press\">Press Kit</a>.\r\n          </p>\r\n        </div>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Before you write</h2>\r\n        <p>Many answers are in the <a href=\"/help\">Help Center</a> and <a href=\"/docs\">Documentation</a>. Check\r\n          <a href=\"/status\">System Status</a> if you suspect a platform outage.</p>\r\n      </section>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/about\">About</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
