import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help Center — ByteBoom',
  description: "ByteBoom Help Center — answers about Binance API setup, trading engine configuration, billing, and troubleshooting.",
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
          dangerouslySetInnerHTML={{ __html: "\r\n\r\n      <h1 class=\"legal-doc__title\">Help Center</h1>\r\n      <p class=\"legal-doc__meta\">Common questions about ByteBoom &nbsp;·&nbsp; Updated July 2026</p>\r\n\r\n      <div class=\"legal-doc__intro\">\r\n        <p>Find quick answers about connecting Binance, running crypto trading engines, and managing your ByteBoom\r\n          subscription. For anything not covered here, reach us at\r\n          <a href=\"mailto:support@byteboom.ai\">support@byteboom.ai</a>.</p>\r\n      </div>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Account &amp; billing</h2>\r\n        <p><strong>Is there a free trial?</strong> No — ByteBoom does not offer a free trial. Plans are billed when you\r\n          subscribe. You can pause, stop, or cancel anytime.</p>\r\n        <p><strong>How do I cancel?</strong> Cancel from account settings or email support. Your trading engines stop at the end of\r\n          the current billing period unless you stop them manually sooner.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Binance connection</h2>\r\n        <p><strong>What API permissions do I need?</strong> Read + spot trading. Do <strong>not</strong> enable\r\n          withdrawals. See our <a href=\"docs.html#api-keys\">API key guide</a> for step-by-step setup.</p>\r\n        <p><strong>My trading engine isn't trading.</strong> Check that the API key is active, IP whitelist (if used) includes\r\n          ByteBoom servers, and you have sufficient USDT balance on Binance spot.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Trading engines &amp; strategies</h2>\r\n        <p><strong>Where are my funds?</strong> Always on your Binance account. ByteBoom is non-custodial — we never\r\n          hold your crypto.</p>\r\n        <p><strong>Can I run multiple trading engines?</strong> Yes, depending on your plan. Each trading engine uses a separate capital\r\n          allocation on the pairs you configure.</p>\r\n      </section>\r\n\r\n      <section class=\"legal-section\">\r\n        <h2>Security</h2>\r\n        <p>API keys are encrypted with AES-256. We do not sell your data. Revoke keys on Binance at any time to halt\r\n          all automated activity instantly.</p>\r\n      </section>\r\n\r\n      <div class=\"legal-callout\">\r\n        <strong>Need more help?</strong> Email <a href=\"mailto:support@byteboom.ai\">support@byteboom.ai</a> — we\r\n        typically respond within one business day. Check <a href=\"/status\">System Status</a> for platform outages.\r\n      </div>\r\n\r\n      <footer class=\"legal-footer\">\r\n        <p>&copy; 2026 ByteBoom AI. <a href=\"/\">Home</a> · <a href=\"/docs\">Docs</a> · <a\r\n            href=\"/privacy\">Privacy</a></p>\r\n      </footer>\r\n\r\n    " }}
        />
      </main>
    </>
  );
}
