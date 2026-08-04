import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers — ByteBoom',
  description: "Careers at ByteBoom — join us building automated crypto trading tools for Binance spot traders.",
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
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">Careers</h1>\r\n      <p class=\"legal-doc__meta\">Build the future of disciplined crypto automation</p>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>ByteBoom is a small team focused on reliable trading infrastructure, clear UX, and honest communication\r\n          with traders. We're hiring selectively as we grow — especially engineers who care about uptime, security, and\r\n          financial systems.</p>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Open roles</h2>\r\n        <p>We're preparing official job listings. Roles we're likely to hire for next:</p>\r\n        <ul>\r\n          <li><strong>Backend engineer</strong> — Node/Python, exchange APIs, order execution</li>\r\n          <li><strong>Frontend engineer</strong> — React, dashboards, real-time data</li>\r\n          <li><strong>DevOps / SRE</strong> — monitoring, deployment, incident response</li>\r\n        </ul>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>How to apply</h2>\r\n        <p>Send your resume and a short note on why ByteBoom interests you to\r\n          <a href=\"mailto:careers@byteboom.ai\">careers@byteboom.ai</a>. We review every application — even when no role\r\n          is posted publicly yet.</p>\r\n      </section>\r\n\r\n      <div class=\"legal-callout\">\r\n        <strong>Remote-friendly.</strong> We work across time zones with async communication. Full role descriptions\r\n        and benefits will be posted here as openings go live.\r\n      </div>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/about\">About</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
