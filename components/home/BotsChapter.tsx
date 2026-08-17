"use client";

import { useCallback, useState } from "react";

type BotIcon = "aggressive" | "balanced" | "conservative";
type SpecTone = "is-med" | "is-high" | "is-info" | "is-low" | "is-risk";

type BotCard = {
  id: string;
  variant: string;
  popular?: boolean;
  multiplier: string;
  kicker: string;
  title: string;
  descLines: [string, string];
  specs: { label: string; value: string; tone: SpecTone }[];
  cta: string;
  note: string;
  icon: BotIcon;
};

const BOT_CARDS: BotCard[] = [
  {
    id: "aggressive",
    variant: "bot-card--aggressive",
    multiplier: "0.5×",
    kicker: "% Aggressive",
    title: "Aggressive Trading Engine",
    descLines: ["High risk, high reward", "Maximum profit potential"],
    specs: [
      { label: "Risk Level", value: "High", tone: "is-risk" },
      { label: "Profit Potential", value: "Very High", tone: "is-high" },
      { label: "Trade Frequency", value: "High", tone: "is-info" },
    ],
    cta: "Start Aggressive Engine",
    note: "Best for experienced traders",
    icon: "aggressive",
  },
  {
    id: "balanced",
    variant: "bot-card--balanced",
    popular: true,
    multiplier: "0.5×",
    kicker: "% Balanced",
    title: "Balanced Trading Engine",
    descLines: ["Balanced risk & reward", "Consistent PnL growth"],
    specs: [
      { label: "Risk Level", value: "Medium", tone: "is-med" },
      { label: "Profit Potential", value: "High", tone: "is-high" },
      { label: "Trade Frequency", value: "Medium", tone: "is-info" },
    ],
    cta: "Start Balanced Engine",
    note: "Best balance for steady growth",
    icon: "balanced",
  },
  {
    id: "conservative",
    variant: "bot-card--conservative",
    multiplier: "0.6×",
    kicker: "% Conservative",
    title: "Conservative Trading Engine",
    descLines: ["Low risk, stable returns", "Capital preservation focused"],
    specs: [
      { label: "Risk Level", value: "Low", tone: "is-low" },
      { label: "Profit Potential", value: "Moderate", tone: "is-med" },
      { label: "Trade Frequency", value: "Low", tone: "is-info" },
    ],
    cta: "Start Conservative Engine",
    note: "Best for long-term safety",
    icon: "conservative",
  },
];

function CircuitWires() {
  return (
    <svg
      className="bot-card__wires"
      viewBox="0 98 480 240"
      preserveAspectRatio="xMidYMid meet"
      shapeRendering="geometricPrecision"
      aria-hidden="true"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="bot-card__wires-paths"
      >
        <path d="M123 218 L123 192 Q123 185 118.05 180.05 L104.95 166.95 Q100 162 100 155 L100 80" />
        <path d="M123 218 L104.95 199.95 Q100 195 93 195 L59 195 Q52 195 47.05 190.05 L38.95 181.95 Q34 177 27 177 L0 177" />
        <path d="M123 218 L104.95 236.05 Q100 241 93 241 L59 241 Q52 241 47.05 245.95 L38.95 254.05 Q34 259 27 259 L0 259" />
        <path d="M123 218 L123 244 Q123 251 118.05 255.95 L104.95 269.05 Q100 274 100 281 L100 356" />
        <path d="M165 143 L153.95 131.95 Q149 127 149 120 L149 98" />
        <path d="M165 293 L153.95 304.05 Q149 309 149 316 L149 338" />
        <path d="M123 218 L162 218" />
        <path d="M357 218 L357 192 Q357 185 361.95 180.05 L375.05 166.95 Q380 162 380 155 L380 80" />
        <path d="M357 218 L375.05 199.95 Q380 195 387 195 L421 195 Q428 195 432.95 190.05 L441.05 181.95 Q446 177 453 177 L480 177" />
        <path d="M357 218 L375.05 236.05 Q380 241 387 241 L421 241 Q428 241 432.95 245.95 L441.05 254.05 Q446 259 453 259 L480 259" />
        <path d="M357 218 L357 244 Q357 251 361.95 255.95 L375.05 269.05 Q380 274 380 281 L380 356" />
        <path d="M315 143 L326.05 131.95 Q331 127 331 120 L331 98" />
        <path d="M315 293 L326.05 304.05 Q331 309 331 316 L331 338" />
        <path d="M357 218 L318 218" />
      </g>
      <g fill="rgba(242,248,255,0.92)" className="bot-card__wires-nodes">
        <circle cx="123" cy="218" r="7" />
        <circle cx="357" cy="218" r="7" />
      </g>
    </svg>
  );
}

/** Engine marks — one idea, three personalities.
 *
 *  A bolt, a pair of scales and a piggy bank are three unrelated stock
 *  metaphors that happen to sit next to each other. These are the same
 *  drawing three times: an equity trace crossing the plate, ending in the
 *  same terminal node. Only the SHAPE of the trace changes, and the shape
 *  is the product difference — that is what the card is asking you to
 *  choose between.
 *
 *  96 box, but these render at 32px (.bot-card__chip svg), so the stroke
 *  is heavy and the detail count stays low on purpose.
 */
function ChipIcon({ type }: { type: BotIcon }) {
  const common = {
    viewBox: "0 0 96 96",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 5,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  } as const;

  if (type === "aggressive") {
    /* hard angles, big amplitude, still climbing at the edge of the plate */
    return (
      <svg {...common}>
        <path d="M12 72 28 40l12 26 14-42 12 24 14-32" />
        <circle cx="80" cy="16" r="6" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (type === "conservative") {
    /* a floor it is not allowed through, and a shallow climb above it */
    return (
      <svg {...common}>
        <path d="M12 60c14-3 20-8 34-10s20-9 34-13" />
        <path d="M10 76h76" />
        <g strokeWidth="3.5" opacity=".55">
          <path d="M26 76v-9M48 76v-9M70 76v-9" />
        </g>
        <circle cx="80" cy="37" r="6" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  /* balanced — smooth swings of equal size either side of a held centre */
  return (
    <svg {...common}>
      <g strokeWidth="3.5" opacity=".5" strokeDasharray="5 7">
        <path d="M10 48h76" />
      </g>
      <path d="M12 48c9-28 21-28 30 0s21 28 30 0h8" />
      <circle cx="80" cy="48" r="6" fill="currentColor" stroke="none" />
    </svg>
  );
}

function BotCardView({
  card,
  depth = "flat",
}: {
  card: BotCard;
  depth?: "back-left" | "front" | "back-right" | "flat";
}) {
  const depthClass =
    depth === "front"
      ? "bot-card--depth-front"
      : depth === "back-left"
        ? "bot-card--depth-back bot-card--depth-left"
        : depth === "back-right"
          ? "bot-card--depth-back bot-card--depth-right"
          : "";

  return (
    <article className={`bot-card ${card.variant}${depthClass ? ` ${depthClass}` : ""}`}>
      {card.popular ? <span className="bot-card__tag">Recommended</span> : null}

      <header className="bot-card__head">
        <span className="bot-card__dot" aria-hidden="true">
          <i />
          <b />
        </span>
        <span className="bot-card__mult">{card.multiplier}</span>
      </header>

      <div className="bot-card__art">
        <CircuitWires />
        <div className="bot-card__chip">
          <ChipIcon type={card.icon} />
        </div>
      </div>

      <div className="bot-card__body">
        <p className="bot-card__kicker">{card.kicker}</p>
        <h3 className="bot-card__title">{card.title}</h3>
        <p className="bot-card__desc">
          {card.descLines[0]}
          <br />
          {card.descLines[1]}
        </p>

        <div className="bot-card__rule" />

        <dl className="bot-card__specs">
          {card.specs.map((spec) => (
            <div key={spec.label}>
              <dt>{spec.label}</dt>
              <dd className={spec.tone}>{spec.value}</dd>
            </div>
          ))}
        </dl>

        <a href="#" className="bot-card__cta" onClick={(e) => e.preventDefault()}>
          {card.cta}
        </a>
        <p className="bot-card__note">{card.note}</p>
      </div>
    </article>
  );
}

export default function BotsChapter() {
  const [active, setActive] = useState(1);
  const total = BOT_CARDS.length;

  const goPrev = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setActive((i) => (i - 1 + total) % total);
    },
    [total],
  );

  const goNext = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      setActive((i) => (i + 1) % total);
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
            Aggressive, balanced, or conservative — three styles, one engine. Pick how bold you want
            to be.
          </p>
        </header>

        <div className="bcards">
          <div className="bcards__desktop bcards__desktop--depth">
            {BOT_CARDS.map((card, index) => (
              <BotCardView
                key={card.id}
                card={card}
                depth={
                  index === 1 ? "front" : index === 0 ? "back-left" : "back-right"
                }
              />
            ))}
          </div>

          <div className="bcards__mobile">
            <div className="bcards__shell">
              <button type="button" className="bcards__nav" onClick={goPrev} aria-label="Previous trading engine">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M14 6l-6 6 6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <div className="bcards__viewport" key={BOT_CARDS[active].id}>
                <BotCardView card={BOT_CARDS[active]} />
              </div>
              <button type="button" className="bcards__nav" onClick={goNext} aria-label="Next trading engine">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M10 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="bcards__dots" role="tablist" aria-label="Trading engines">
              {BOT_CARDS.map((card, index) => (
                <button
                  key={card.id}
                  type="button"
                  role="tab"
                  aria-selected={index === active}
                  aria-label={card.title}
                  className={`bcards__dot${index === active ? " is-active" : ""}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    setActive(index);
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
