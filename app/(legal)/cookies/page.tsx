import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy — ByteBoom',
  description: "ByteBoom Cookie Policy — how we use cookies and similar technologies on our website.",
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
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">Cookie Policy</h1>\r\n      <p class=\"legal-doc__meta\">Effective Date: June 24, 2026 &nbsp;·&nbsp; Last Updated: June 24, 2026</p>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>This Cookie Policy explains how ByteBoom uses cookies and similar technologies when you visit our website\r\n          or use our apps. It should be read alongside our <a href=\"/privacy\">Privacy Policy</a>.</p>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>What are cookies?</h2>\r\n        <p>Cookies are small text files stored on your device when you visit a website. They help sites remember\r\n          preferences, keep you signed in, and understand how visitors use the service.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>How we use cookies</h2>\r\n        <ul>\r\n          <li><strong>Essential</strong> — authentication, security, load balancing (required for the site to work)</li>\r\n          <li><strong>Functional</strong> — remember settings such as theme or language</li>\r\n          <li><strong>Analytics</strong> — understand traffic and improve the product (anonymized where possible)</li>\r\n        </ul>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Third-party cookies</h2>\r\n        <p>We may use trusted partners for analytics or payment processing. Those services may set their own cookies\r\n          subject to their policies. We do not use cookies to sell your personal data.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Managing cookies</h2>\r\n        <p>You can control cookies through your browser settings — block or delete them at any time. Blocking essential\r\n          cookies may limit login and core functionality.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Contact</h2>\r\n        <p>Questions: <a href=\"mailto:support@byteboom.ai\">support@byteboom.ai</a>.</p>\r\n      </section>\r\n\r\n      <div class=\"legal-callout\">\r\n        <strong>Note:</strong> A detailed cookie table with specific providers and retention periods will be added as\r\n        we finalize analytics and marketing tooling.\r\n      </div>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/privacy\">Privacy</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
