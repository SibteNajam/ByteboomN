'use client';

import type { CSSProperties, ReactNode } from 'react';

/** Edge metrics — six visuals on one chart system.
 *
 *  Before, each metric invented its own vocabulary: a speedometer, a donut,
 *  an orbit diagram, an area chart with a redundant bar row underneath.
 *  Six unrelated styles read as six borrowed widgets. Now every slide shares
 *  one frame — the same hero readout, the same recessive grid, the same
 *  easing and stagger tokens (--em-ease / --em-step in stations.css) — and
 *  only the encoding changes, because only the encoding should.
 *
 *  Three forms were replaced outright, for the reasons noted at each one.
 *
 *  No hover layer here on purpose: these slides are driven by scroll and
 *  carry pointer-events:none, so a tooltip could never be opened. The
 *  values are direct-labelled instead.
 */

type Tone = 'good' | 'info';

/** Shared shell: hero readout, plot, then the state and its footnote on one
 *  caption line.
 *
 *  The state used to be a bordered pill in the card's top-right corner, over
 *  a "04 / 06" counter. Both are gone. The counter restated the route map and
 *  progress bar the site already keeps on screen, and a pill in the corner is
 *  the most borrowed component in dashboard design. The state is worth
 *  keeping — it just belongs next to the reading it describes, as a caption
 *  rather than a badge. */
function Metric({
  value,
  unit,
  state,
  tone,
  children,
  foot,
}: {
  value: string;
  unit: string;
  state: string;
  tone: Tone;
  children: ReactNode;
  foot: string;
}) {
  return (
    <figure className="em">
      <figcaption className="em__read">
        <span className="em__val">{value}</span>
        <span className="em__unit">{unit}</span>
      </figcaption>
      <div className="em__plot">{children}</div>
      <p className="em__foot">
        <span className={`em__state em__state--${tone}`}>
          <i aria-hidden="true" />
          {state}
        </span>
        <span className="em__note">{foot}</span>
      </p>
    </figure>
  );
}

/* 01 — Risk.
   Was a speedometer with a green→amber→red arc. A gauge is the most
   borrowed shape in dashboard design, and a rainbow sweep encodes
   magnitude as hue, which is exactly what a sequential scale must not do.
   A banded scale says the same thing and names the band it lands in. */
function ChartRisk() {
  const at = 34;
  return (
    <Metric value="34" unit="risk index" state="Calm zone" tone="good" foot="Measured every session, not once at signup">
      <div className="emscale" style={{ '--at': `${at}%` } as CSSProperties}>
        <div className="emscale__track">
          <span className="emscale__band emscale__band--calm" />
          <span className="emscale__band emscale__band--press" />
          <span className="emscale__band emscale__band--strain" />
          <span className="emscale__fill" />
          <span className="emscale__pin" />
        </div>
        <ul className="emscale__keys">
          <li>Calm</li>
          <li>Press</li>
          <li>Strain</li>
        </ul>
      </div>
    </Metric>
  );
}

/* 02 — Steady. Columns were the right form already; they just had no
   baseline, no reference and no axis. The mean line is what turns seven
   bars into a claim about consistency. */
const SESSIONS = [72, 58, 81, 36, 64, 78, 88];
const MEAN = Math.round(SESSIONS.reduce((a, b) => a + b, 0) / SESSIONS.length);

function ChartSteady() {
  const base = 100;
  const top = 14;
  const span = base - top;
  const y = (v: number) => base - (v / 100) * span;

  return (
    <Metric value="86%" unit="green sessions" state="6 of 7 green" tone="good" foot="Consistency over spikes — one red day stays visible">
      <svg className="emplot" viewBox="0 0 240 122" aria-hidden="true">
        <g className="emplot__grid">
          <line x1="8" y1="30" x2="232" y2="30" />
          <line x1="8" y1="65" x2="232" y2="65" />
        </g>

        {SESSIONS.map((v, i) => (
          <rect
            key={i}
            className={`emcol${v < 50 ? ' is-down' : ''}`}
            x={11 + i * 32}
            y={y(v)}
            width="20"
            height={base - y(v)}
            rx="4"
            style={{ '--i': i } as CSSProperties}
          />
        ))}

        <line className="emplot__base" x1="8" y1={base} x2="232" y2={base} />

        {/* the reference the whole metric is arguing about */}
        <g className="emplot__ref">
          <line x1="8" y1={y(MEAN)} x2="232" y2={y(MEAN)} />
          <text x="232" y={y(MEAN) - 5} textAnchor="end">
            avg {MEAN}
          </text>
        </g>

        <g className="emplot__ticks">
          {SESSIONS.map((_, i) => (
            <text key={i} x={21 + i * 32} y="115" textAnchor="middle">
              D{i + 1}
            </text>
          ))}
        </g>
      </svg>
    </Metric>
  );
}

/* 03 — Borrowing.
   Was a donut. A ring is a poor read for one proportion — you are asked to
   compare arc lengths against nothing. A capacity bar with the ceiling
   drawn in is how every margin desk actually shows this, and it can show
   headroom, which the donut could not. */
function ChartBorrow() {
  const used = 38;
  return (
    <Metric value="38%" unit="of limit used" state="Under limit" tone="good" foot="Headroom is what stops a rough week becoming a bad one">
      <div className="emcap" style={{ '--used': `${used}%` } as CSSProperties}>
        {/* the ceiling was drawn in red, which flagged danger on a card whose
            state reads "Under limit". It is a scale endpoint, not an alarm. */}
        <div className="emcap__scale">
          <span>0</span>
          <span>Limit</span>
        </div>
        <div className="emcap__bar">
          <span className="emcap__used" />
          <span className="emcap__ceiling" />
        </div>
        <div className="emcap__legend">
          <span className="emcap__key emcap__key--used">
            <i />
            Used {used}%
          </span>
          <span className="emcap__key emcap__key--free">
            <i />
            Headroom {100 - used}%
          </span>
        </div>
      </div>
    </Metric>
  );
}

/* 04 — Growth. Was an area chart with a second row of bars restating the
   same series underneath it. One measure, one chart.

   The series itself is a real equity curve rather than a ramp: it climbs in
   steps, gives some back twice, and spends two stretches going sideways
   before it moves again. A line that only ever goes up is the tell of a
   fake chart — and it undersells the point the card is making, which is
   that the path matters, not one win. It still finishes well up; that is
   the claim. It just gets there the way it actually happens. */
const GROWTH_Y = [
  96, 93, 95, 89, 91, 85, 88, // early chop, first small giveback
  82, 79, 72, 70, // first real leg up
  73, 69, 72, 68, 71, // consolidation — sideways, not falling
  78, 74, // pullback
  66, 61, 55, 58, 52, 50, // second leg up
  53, 49, 52, // consolidation
  58, 51, // the drawdown
  42, 35, 38, 27, 18, // the run out
];

const GROWTH_STEP = 218 / (GROWTH_Y.length - 1);
const gx = (i: number) => +(10 + i * GROWTH_STEP).toFixed(1);

const GROWTH = GROWTH_Y.map((y, i) => `${i ? 'L' : 'M'}${gx(i)} ${y}`).join(' ');
const GROWTH_END = { x: gx(GROWTH_Y.length - 1), y: GROWTH_Y[GROWTH_Y.length - 1] };

function ChartGrowth() {
  return (
    <Metric value="+124%" unit="cumulative" state="Since launch" tone="info" foot="The full path since you started, not a single win">
      <svg className="emplot" viewBox="0 0 240 122" aria-hidden="true">
        <defs>
          <linearGradient id="emGrowFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(125,92,255,.34)" />
            <stop offset="100%" stopColor="rgba(125,92,255,0)" />
          </linearGradient>
        </defs>

        <g className="emplot__grid">
          <line x1="8" y1="30" x2="232" y2="30" />
          <line x1="8" y1="63" x2="232" y2="63" />
        </g>

        <path
          className="emarea__fill"
          d={`${GROWTH} L${GROWTH_END.x} 106 L10 106 Z`}
          fill="url(#emGrowFill)"
        />
        <path className="emarea__line emarea__line--violet" d={GROWTH} pathLength="1" />

        <line className="emplot__base" x1="8" y1="106" x2="232" y2="106" />

        <g className="emarea__end">
          <circle cx={GROWTH_END.x} cy={GROWTH_END.y} r="4" />
          <circle className="emarea__halo" cx={GROWTH_END.x} cy={GROWTH_END.y} r="4" />
        </g>
      </svg>
    </Metric>
  );
}

/* 05 — Coverage.
   Was an orbit diagram: five dots on two rings, encoding nothing. Position
   carried no value, and the rings carried no scale. Ranked bars say which
   markets and how much, sorted, which is the actual question. */
const MARKETS = [
  { label: 'BTC', share: 34 },
  { label: 'ETH', share: 26 },
  { label: 'SOL', share: 18 },
  { label: 'XRP', share: 12 },
  { label: 'BNB', share: 10 },
];

function ChartCoverage() {
  return (
    <Metric value="5+" unit="markets live" state="Diversified" tone="info" foot="Spread so results never rest on one coin">
      <ul className="emrank">
        {MARKETS.map((m, i) => (
          <li key={m.label} style={{ '--i': i, '--to': `${m.share}%` } as CSSProperties}>
            <span className="emrank__label">{m.label}</span>
            <span className="emrank__track">
              <span className="emrank__bar" />
            </span>
            <span className="emrank__val">{m.share}%</span>
          </li>
        ))}
      </ul>
    </Metric>
  );
}

/* 06 — Drawdown. The form was right; the drop just was not legible as a
   region. Peak and trough now bound a shaded band, which is the measure. */
/* Peak 78,34 → trough 104,56. The band between them IS the number, so the
   depth is drawn to scale: at −5% the dip is shallow, and the two-segment
   descent keeps it from reading as a single cliff. */
const DD = 'M10 90 L34 76 L58 60 L78 34 L92 48 L104 56 L124 46 L150 42 L178 30 L204 24 L228 16';
const DD_PEAK = { x: 78, y: 34 };
const DD_TROUGH = { x: 104, y: 56 };

function ChartDrawdown() {
  return (
    <Metric value="−5%" unit="max drawdown" state="Recovered" tone="good" foot="Peak → trough → recovery, the real cost of rough markets">
      <svg className="emplot" viewBox="0 0 240 122" aria-hidden="true">
        <g className="emplot__grid">
          <line x1="8" y1="30" x2="232" y2="30" />
          <line x1="8" y1="63" x2="232" y2="63" />
        </g>

        {/* the band IS the metric — peak level down to trough level */}
        <rect
          className="emdd__band"
          x={DD_PEAK.x}
          y={DD_PEAK.y}
          width={DD_TROUGH.x - DD_PEAK.x}
          height={DD_TROUGH.y - DD_PEAK.y}
          rx="2"
        />

        <path className="emdd__line" d={DD} pathLength="1" />

        <line className="emplot__base" x1="8" y1="106" x2="232" y2="106" />

        <g className="emdd__marks">
          <circle className="emdd__peak" cx={DD_PEAK.x} cy={DD_PEAK.y} r="3.5" />
          <circle className="emdd__trough" cx={DD_TROUGH.x} cy={DD_TROUGH.y} r="3.5" />
        </g>

        {/* leader sits above the recovery leg, which passes y≈48 at x=120 */}
        <g className="emdd__callout">
          <line x1="106" y1="42" x2="120" y2="42" />
          <text x="124" y="46">−5%</text>
        </g>
      </svg>
    </Metric>
  );
}

const SLIDES: {
  title: string;
  sub: string;
  body: string;
  chart: ReactNode;
}[] = [
  {
    title: 'Risk Level',
    sub: 'How hard it presses your money',
    body: 'Shows how carefully the trading engine uses your balance when markets get rough, and whether it stays calm under pressure.',
    chart: <ChartRisk />,
  },
  {
    title: 'Steady Results',
    sub: 'How often sessions finish green',
    body: 'How often trading days end positive. Built for consistency, not one lucky spike.',
    chart: <ChartSteady />,
  },
  {
    title: 'Borrowing Limits',
    sub: 'How much borrowed money it uses',
    body: 'Keeps an eye on borrowed funds so risk stays within clear limits.',
    chart: <ChartBorrow />,
  },
  {
    title: 'Growth Over Time',
    sub: 'Results across the full journey',
    body: 'Overall progress since you started. The long path, not a single win.',
    chart: <ChartGrowth />,
  },
  {
    title: 'Market Coverage',
    sub: 'How widely it trades',
    body: 'Spreads activity across more markets so results don’t depend on one coin alone.',
    chart: <ChartCoverage />,
  },
  {
    title: 'Downside Guard',
    sub: 'Biggest drop before recovery',
    body: 'The largest fall from a high point before bouncing back. The real cost of rough markets.',
    chart: <ChartDrawdown />,
  },
];

export default function EdgeChapter() {
  return (
    <section
      className="chapter chapter--edge"
      id="edgenode"
      data-a="0.69"
      data-b="0.93"
      data-side="center"
      data-dir="center"
    >
      <div className="panel panel--edge">
        <div className="edge-stage" id="edgeStage">
          {SLIDES.map((s, i) => (
            <div className="edge-slide" data-slide={i} key={s.title}>
              <article className="edge-card">

                <div className="edge-card__copy">
                  <h3>{s.title}</h3>
                  <p className="edge-card__sub">{s.sub}</p>
                  <p className="edge-card__body">{s.body}</p>
                </div>

                <div className="edge-card__icon edge-card__icon--chart">{s.chart}</div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
