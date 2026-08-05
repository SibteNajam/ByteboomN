'use client';

import { useCallback, useState } from 'react';

type BotStat = {
  label: string;
  value: string;
  tone: string;
};

type BotCard = {
  id: string;
  className: string;
  image: string;
  tag: React.ReactNode;
  title: string;
  desc: React.ReactNode;
  stats: BotStat[];
  foot: string;
};

const BOT_CARDS: BotCard[] = [
  {
    id: 'aggressive',
    className: 'bcard bcard--aggressive',
    image: '/images/Slice1aggressive.png',
    tag: '% Aggressive',
    title: 'Aggressive Bot',
    desc: (
      <>
        High risk, high reward
        <br />
        Maximum profit potential
      </>
    ),
    stats: [
      { label: 'Risk Level', value: 'High', tone: 'stat--red' },
      { label: 'Profit Potential', value: 'Very High', tone: 'stat--green' },
      { label: 'Trade Frequency', value: 'High', tone: 'stat--violet' },
    ],
    foot: 'Best for experienced traders',
  },
  {
    id: 'balanced',
    className: 'bcard bcard--balanced bcard--rec',
    image: '/images/Slice2-balanced.png',
    tag: (
      <>
        <svg className="bcard__tag-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M19.89 2.54A1 1 0 0 0 19 2h-9c-.39 0-.75.23-.91.59l-5 11c-.14.31-.11.67.07.96s.5.46.84.46h5v6a1 1 0 0 0 1 1c.31 0 .62-.15.81-.41l8-11a1 1 0 0 0 .08-1.04a1 1 0 0 0-.89-.55h-3.06l3.87-5.42a1 1 0 0 0 .08-1.04Zm-6.7 6.88A.997.997 0 0 0 14 11h3.04L12 17.92V14c0-.55-.45-1-1-1-1H6.55l4.09-9h6.41l-3.87 5.42Z"
          />
        </svg>
        Balanced
      </>
    ),
    title: 'Balanced Bot',
    desc: (
      <>
        Balanced risk &amp; reward
        <br />
        Consistent PnL growth
      </>
    ),
    stats: [
      { label: 'Risk Level', value: 'Medium', tone: 'stat--amber' },
      { label: 'Profit Potential', value: 'High', tone: 'stat--green' },
      { label: 'Trade Frequency', value: 'Medium', tone: 'stat--cyan' },
    ],
    foot: 'Best balance for steady growth',
  },
  {
    id: 'conservative',
    className: 'bcard bcard--conservative',
    image: '/images/Slice3conservative.png',
    tag: '% Conservative',
    title: 'Conservative Bot',
    desc: (
      <>
        Low risk, stable returns
        <br />
        Capital preservation focused
      </>
    ),
    stats: [
      { label: 'Risk Level', value: 'Low', tone: 'stat--emerald' },
      { label: 'Profit Potential', value: 'Moderate', tone: 'stat--amber' },
      { label: 'Trade Frequency', value: 'Low', tone: 'stat--emerald' },
    ],
    foot: 'Best for long-term safety',
  },
];

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
      <div className="bcard__art">
        <img src={card.image} alt="" loading="lazy" decoding="async" />
      </div>
      <div className="bcard__body">
        <span className="bcard__tag">{card.tag}</span>
        <h3 className="bcard__title">{card.title}</h3>
        <p className="bcard__desc">{card.desc}</p>
        <hr className="bcard__hr" />
        <dl className="bcard__stats">
          {card.stats.map((stat) => (
            <div key={stat.label}>
              <dt>{stat.label}</dt>
              <dd className={stat.tone}>{stat.value}</dd>
            </div>
          ))}
        </dl>
        <p className="bcard__foot">{card.foot}</p>
      </div>
    </article>
  );
}

export default function BotsChapter() {
  const [activeIndex, setActiveIndex] = useState(1);
  const total = BOT_CARDS.length;
  const activeCard = BOT_CARDS[activeIndex];

  const goPrev = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setActiveIndex((index) => (index - 1 + total) % total);
  }, [total]);

  const goNext = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setActiveIndex((index) => (index + 1) % total);
  }, [total]);

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
        <div className="bots-note">
          <p>Choose from aggressive, balanced, and conservative automation modes.</p>
          <p>Each bot matches a different risk profile while keeping execution disciplined.</p>
        </div>

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
