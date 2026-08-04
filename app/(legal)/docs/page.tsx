import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = {
  title: 'Documentation — ByteBoom',
  description:
    'ByteBoom documentation — guides for connecting Binance, configuring bots, and managing automated spot trading.',
};

export default function DocsPage() {
  return (
    <>
      <header className="legal-header">
        <Link className="legal-header__brand" href="/">
          <img className="legal-header__logo" src="/images/mainlogo.png" alt="ByteBoom" width={170} height={52} />
        </Link>
        <Link className="legal-header__back" href="/">&larr; <span>Back to home</span></Link>
      </header>
      <main className="legal-main">
        <article className="legal-doc">
          <h1 className="legal-doc__title">Documentation</h1>
          <p className="legal-doc__meta">Getting started with ByteBoom · Updated July 2026</p>
          <div className="legal-doc__intro">
            <p>
              ByteBoom is an automated spot trading bot for Binance. Connect your exchange with a{' '}
              <span className="hl">trade-only API key</span>, choose a strategy, and let the bot execute orders on your
              account — non-custodial, with your funds always on Binance.
            </p>
          </div>
          <section className="legal-section" id="getting-started">
            <h2>Getting started</h2>
            <p>
              Create a ByteBoom account, link your Binance API credentials, deposit USDT on Binance (if needed), and
              activate a bot from the dashboard.
            </p>
            <ol>
              <li>Sign up at ByteBoom and verify your email.</li>
              <li>Add a Binance API key with Enable Spot &amp; Margin Trading only — no withdrawals.</li>
              <li>Select a trading pair (e.g. BTC/USDT) and allocate capital.</li>
              <li>Start the bot and monitor performance from the app or web dashboard.</li>
            </ol>
          </section>
          <section className="legal-section" id="api-keys">
            <h2>Binance API keys</h2>
            <p>
              ByteBoom requires read + trade permissions. Keys are encrypted at rest using{' '}
              <span className="hl">AES-256</span>.
            </p>
          </section>
          <div className="legal-callout">
            <strong>More coming soon.</strong> Questions? Email{' '}
            <a href="mailto:support@byteboom.ai">support@byteboom.ai</a> or visit the{' '}
            <Link href="/help">Help Center</Link>.
          </div>
          <footer className="legal-footer">
            <p>
              &copy; 2026 ByteBoom AI. <Link href="/">Home</Link> · <Link href="/help">Help</Link> ·{' '}
              <Link href="/privacy">Privacy</Link>
            </p>
          </footer>
        </article>
      </main>
    </>
  );
}
