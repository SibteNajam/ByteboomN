import Link from 'next/link';
import Image from 'next/image';
import '@/app/styles/page.css';

type LegalLayoutProps = {
  children: React.ReactNode;
};

export default function LegalLayout({ children }: LegalLayoutProps) {
  return (
    <body className="legal-page">
      <header className="legal-header">
        <Link className="legal-header__brand" href="/">
          <Image
            className="legal-header__logo"
            src="/images/mainlogo.png"
            alt="ByteBoom"
            width={170}
            height={52}
            priority
          />
        </Link>
        <Link className="legal-header__back" href="/">
          &larr; <span>Back to home</span>
        </Link>
      </header>
      <main className="legal-main">
        <article className="legal-doc">{children}</article>
      </main>
    </body>
  );
}
