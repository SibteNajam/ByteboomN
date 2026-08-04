import type { Metadata } from 'next';
import './globals.css';
import './styles/styles.css';

export const metadata: Metadata = {
  title: 'ByteBoom — Enter the system',
  description:
    'Travel through the ByteBoom system: an AI crypto trading bot for Binance. Non-custodial, trade-only API, exit anytime.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="flat" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=Inter:opsz,wght@14..32,400..700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Sora:wght@600;700;800&family=Playfair+Display:ital,wght@0,500;1,500;1,600&display=swap"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
