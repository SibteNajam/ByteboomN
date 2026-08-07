'use client';

import { useCallback, useState } from 'react';

type BotStat = {
  label: string;
  value: string;
  tone: string;
};

type BotIcon = 'aggressive' | 'balanced' | 'conservative';

type BotCard = {
  id: string;
  className: string;
  popular?: boolean;
  badge: string;
  badgeAccent?: boolean;
  mode: string;
  title: string;
  desc: string;
  stats: BotStat[];
  tags: string[];
  foot: string;
  icon: BotIcon;
};

const BOT_CARDS: BotCard[] = [
  {
    id: 'aggressive',
    className: 'bcard bcard--aggressive',
    badge: 'Max exposure',
    mode: 'Aggressive',
    title: 'High risk, high reward',
    desc: 'Maximum profit potential for traders who can handle volatility.',
    stats: [
      { label: 'Risk', value: 'High', tone: 'stat--red' },
      { label: 'Profit', value: 'Very High', tone: 'stat--green' },
      { label: 'Frequency', value: 'High', tone: 'stat--violet' },
    ],
    tags: ['Fast entries', 'High vol'],
    foot: 'Best for experienced traders',
    icon: 'aggressive',
  },
  {
    id: 'balanced',
    className: 'bcard bcard--balanced bcard--rec',
    popular: true,
    badge: 'Steady PnL',
    badgeAccent: true,
    mode: 'Balanced',
    title: 'Balanced risk & reward',
    desc: 'Consistent growth without pushing exposure to the edge.',
    stats: [
      { label: 'Risk', value: 'Medium', tone: 'stat--amber' },
      { label: 'Profit', value: 'High', tone: 'stat--green' },
      { label: 'Frequency', value: 'Medium', tone: 'stat--cyan' },
    ],
    tags: ['Auto-rebalance', 'Smart sizing'],
    foot: 'Best balance for steady growth',
    icon: 'balanced',
  },
  {
    id: 'conservative',
    className: 'bcard bcard--conservative',
    badge: 'Capital safe',
    mode: 'Conservative',
    title: 'Low risk, stable returns',
    desc: 'Capital preservation first — slower pace, tighter guardrails.',
    stats: [
      { label: 'Risk', value: 'Low', tone: 'stat--emerald' },
      { label: 'Profit', value: 'Moderate', tone: 'stat--amber' },
      { label: 'Frequency', value: 'Low', tone: 'stat--emerald' },
    ],
    tags: ['Low drawdown', 'Safe pace'],
    foot: 'Best for long-term safety',
    icon: 'conservative',
  },
];

function BotIconSvg({ type }: { type: BotIcon }) {
  if (type === 'aggressive') {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="17" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" />
        <path
          d="M24 6v4M24 38v4M6 24h4M38 24h4"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M27 11L15 27h7.5l-1.5 10L33 21h-7.5l1.5-10z"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (type === 'balanced') {
    return (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="24" cy="24" r="17" stroke="currentColor" strokeOpacity="0.22" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="10" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.2" />
        <circle cx="24" cy="24" r="3" fill="currentColor" />
        <path
          d="M24 7v5M24 36v5M7 24h5M36 24h5"
          stroke="currentColor"
          strokeOpacity="0.5"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M12 12l3 3M33 33l3 3M33 12l-3 3M12 33l3-3"
          stroke="currentColor"
          strokeOpacity="0.28"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M24 5l15 5.5v11.5c0 9.2-6 16-15 18.5-9-2.5-15-9.3-15-18.5V10.5L24 5z"
        stroke="currentColor"
        strokeWidth="1.3"
        fill="color-mix(in srgb, currentColor 12%, transparent)"
      />
      <path
        d="M24 5l15 5.5v11.5c0 9.2-6 16-15 18.5"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <path
        d="M18 24l4 4 8-9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="22" r="11" stroke="currentColor" strokeOpacity="0.15" strokeWidth="1" strokeDasharray="3 4" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg className="bcards__nav-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        d={direction === 'left' ? 'M14 6l-6 6 6 6' : 'M10 6l6 6-6 6'}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BotCardView({ card }: { card: BotCard }) {
  return (
    <article className={card.className}>
      {card.popular ? <span className="bcard__rec-badge">Popular</span> : null}
      <div className="bcard__glow" aria-hidden="true" />
      <div className="bcard__grid" aria-hidden="true" />
      <header className="bcard__head">
        <div className="bcard__icon-wrap">
          <span className="bcard__icon-orbit" aria-hidden="true" />
          <span className="bcard__icon" aria-hidden="true">
            <BotIconSvg type={card.icon} />
          </span>
        </div>
        <span className={`bcard__badge${card.badgeAccent ? ' bcard__badge--accent' : ''}`}>{card.badge}</span>
      </header>
      <div className="bcard__body">
        <span className="bcard__mode">{card.mode}</span>
        <h3 className="bcard__title">{card.title}</h3>
        <p className="bcard__desc">{card.desc}</p>
        <ul className="bcard__stats" aria-label={`${card.mode} bot metrics`}>
          {card.stats.map((stat) => (
            <li key={stat.label}>
              <span>{stat.label}</span>
              <strong className={stat.tone}>{stat.value}</strong>
            </li>
          ))}
        </ul>
        <div className="bcard__tags" aria-hidden="true">
          {card.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
      <footer className="bcard__foot">{card.foot}</footer>
    </article>
  );
}

export default function BotsChapter() {
  const [activeIndex, setActiveIndex] = useState(1);
  const total = BOT_CARDS.length;
  const activeCard = BOT_CARDS[activeIndex];

  const goPrev = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setActiveIndex((index) => (index - 1 + total) % total);
    },
    [total],
  );

  const goNext = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setActiveIndex((index) => (index + 1) % total);
    },
    [total],
  );

  return (
    <section
      className="chapter chapter--bots"
      id="productnode"
      data-a="0.205"
      data-b="0.295"
      data-side="center"
      data-dir="left"
    >
      <div className="panel panel--bots">
        <header className="bots-head">
          <h2 className="bots-head__title">
            Pick the automation style that fits <span className="bots-head__pill">your risk</span>
          </h2>
          <p className="bots-head__lead">
            Aggressive, balanced, or conservative — each mode runs with the same disciplined, trade-only execution on
            Binance.
          </p>
        </header>

        <div className="bcards">
          <div className="bcards__desktop">
            {BOT_CARDS.map((card) => (
              <BotCardView key={card.id} card={card} />
            ))}
          </div>

          <div className="bcards__mobile">
            <div className="bcards__shell">
              <button
                type="button"
                className="bcards__nav bcards__nav--prev"
                onClick={goPrev}
                aria-label="Previous bot mode"
              >
                <ChevronIcon direction="left" />
              </button>

              <div className="bcards__viewport" key={activeCard.id}>
                <BotCardView card={activeCard} />
              </div>

              <button
                type="button"
                className="bcards__nav bcards__nav--next"
                onClick={goNext}
                aria-label="Next bot mode"
              >
                <ChevronIcon direction="right" />
              </button>
            </div>

            <div className="bcards__dots" role="tablist" aria-label="Bot modes">
              {BOT_CARDS.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={card.title}
                  className={`bcards__dot${index === activeIndex ? ' is-active' : ''}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActiveIndex(index);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
