'use client';

import type { CSSProperties, ReactNode } from 'react';

/** Edge metrics — each visual is a real chart that tells the metric’s story. */

function ChartRisk() {
  return (
    <div className="em em--risk" aria-hidden="true">
      <svg className="em-gauge" viewBox="0 0 200 130">
        <defs>
          <linearGradient id="emRiskArc" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4ade80" />
            <stop offset="55%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#ff6b6b" />
          </linearGradient>
        </defs>
        <path
          className="em-gauge__track"
          d="M20 110 A80 80 0 0 1 180 110"
          fill="none"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <path
          className="em-gauge__arc"
          d="M20 110 A80 80 0 0 1 180 110"
          fill="none"
          stroke="url(#emRiskArc)"
          strokeWidth="14"
          strokeLinecap="round"
          pathLength="100"
        />
        <g className="em-gauge__needle">
          <line x1="100" y1="110" x2="100" y2="42" stroke="#eef5fc" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="100" cy="110" r="5" fill="#5de8f7" />
        </g>
        <text className="em-gauge__val" x="100" y="88" textAnchor="middle">
          34
        </text>
        <text className="em-gauge__unit" x="100" y="104" textAnchor="middle">
          risk index
        </text>
      </svg>
      <div className="em-legend">
        <span className="em-legend__ok">Calm zone</span>
        <span className="em-legend__warn">Press</span>
      </div>
    </div>
  );
}

function ChartSteady() {
  const days = [
    { h: 72, ok: true },
    { h: 58, ok: true },
    { h: 81, ok: true },
    { h: 36, ok: false },
    { h: 64, ok: true },
    { h: 78, ok: true },
    { h: 88, ok: true },
  ];
  return (
    <div className="em em--steady" aria-hidden="true">
      <div className="em-steady__head">
        <span className="em-steady__rate">86%</span>
        <span className="em-steady__label">green sessions</span>
      </div>
      <div className="em-sessions">
        {days.map((d, i) => (
          <div
            key={i}
            className={`em-session${d.ok ? ' is-ok' : ' is-bad'}`}
            style={{ '--h': `${d.h}%`, '--i': i } as CSSProperties}
          >
            <span className="em-session__bar" />
            <span className="em-session__day">D{i + 1}</span>
          </div>
        ))}
      </div>
      <div className="em-steady__note">
        <i />
        Consistency over spikes
      </div>
    </div>
  );
}

function ChartBorrow() {
  const r = 54;
  const c = 2 * Math.PI * r;
  const used = 0.38;
  return (
    <div className="em em--borrow" aria-hidden="true">
      <svg className="em-ring" viewBox="0 0 140 140">
        <circle className="em-ring__track" cx="70" cy="70" r={r} fill="none" strokeWidth="10" />
        <circle
          className="em-ring__limit"
          cx="70"
          cy="70"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeDasharray={`${c}`}
          strokeDashoffset="0"
          transform="rotate(-90 70 70)"
        />
        <circle
          className="em-ring__used"
          cx="70"
          cy="70"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeDasharray={`${c}`}
          strokeDashoffset={c}
          style={{ '--ring': `${c * (1 - used)}` } as CSSProperties}
          transform="rotate(-90 70 70)"
        />
        <text className="em-ring__val" x="70" y="66" textAnchor="middle">
          38%
        </text>
        <text className="em-ring__sub" x="70" y="84" textAnchor="middle">
          of limit
        </text>
      </svg>
      <div className="em-borrow__meta">
        <span>
          <b /> Used
        </span>
        <span>
          <b className="is-cap" /> Cap
        </span>
      </div>
      <div className="em-borrow__ok">Under limit</div>
    </div>
  );
}

function ChartGrowth() {
  return (
    <div className="em em--growth" aria-hidden="true">
      <div className="em-growth__head">
        <span className="em-growth__val">+124%</span>
        <span className="em-growth__label">cumulative</span>
      </div>
      <svg className="em-area" viewBox="0 0 220 120" preserveAspectRatio="none">
        <defs>
          <linearGradient id="emGrowFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(125,92,255,0.45)" />
            <stop offset="100%" stopColor="rgba(125,92,255,0)" />
          </linearGradient>
        </defs>
        <g className="em-area__grid">
          <line x1="0" y1="30" x2="220" y2="30" />
          <line x1="0" y1="60" x2="220" y2="60" />
          <line x1="0" y1="90" x2="220" y2="90" />
        </g>
        <path
          className="em-area__fill"
          d="M0 100 L18 92 L44 88 L70 74 L96 70 L122 52 L148 46 L174 28 L200 18 L220 12 L220 120 L0 120 Z"
        />
        <path
          className="em-area__line"
          d="M0 100 L18 92 L44 88 L70 74 L96 70 L122 52 L148 46 L174 28 L200 18 L220 12"
          fill="none"
          pathLength="100"
        />
        <circle className="em-area__dot" cx="220" cy="12" r="4" />
      </svg>
      <div className="em-bars em-bars--compound">
        {[22, 34, 48, 62, 78, 96].map((h, i) => (
          <span key={i} style={{ '--h': `${h}%`, '--i': i } as CSSProperties} />
        ))}
      </div>
    </div>
  );
}

function ChartCoverage() {
  const markets = [
    { label: 'BTC', a: -90, r: 42 },
    { label: 'ETH', a: -20, r: 38 },
    { label: 'SOL', a: 45, r: 34 },
    { label: 'XRP', a: 110, r: 30 },
    { label: 'BNB', a: 175, r: 36 },
  ];
  const toXY = (deg: number, rad: number) => {
    const t = (deg * Math.PI) / 180;
    return { x: 70 + Math.cos(t) * rad, y: 70 + Math.sin(t) * rad };
  };
  return (
    <div className="em em--cover" aria-hidden="true">
      <svg className="em-orbit" viewBox="0 0 140 140">
        <circle className="em-orbit__ring" cx="70" cy="70" r="48" />
        <circle className="em-orbit__ring em-orbit__ring--mid" cx="70" cy="70" r="32" />
        <circle className="em-orbit__core" cx="70" cy="70" r="8" />
        {markets.map((m, i) => {
          const p = toXY(m.a, m.r);
          return (
            <g key={m.label} className="em-orbit__node" style={{ '--i': i } as CSSProperties}>
              <line className="em-orbit__spoke" x1="70" y1="70" x2={p.x} y2={p.y} />
              <circle cx={p.x} cy={p.y} r="5.5" />
              <text x={p.x} y={p.y - 9} textAnchor="middle">
                {m.label}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="em-cover__count">
        <b>5+</b> markets live
      </div>
    </div>
  );
}

function ChartDrawdown() {
  return (
    <div className="em em--dd" aria-hidden="true">
      <svg className="em-dd" viewBox="0 0 220 120">
        <defs>
          <linearGradient id="emDdFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,107,107,0.35)" />
            <stop offset="100%" stopColor="rgba(255,107,107,0)" />
          </linearGradient>
        </defs>
        <g className="em-dd__grid">
          <line x1="0" y1="30" x2="220" y2="30" />
          <line x1="0" y1="60" x2="220" y2="60" />
          <line x1="0" y1="90" x2="220" y2="90" />
        </g>
        <path
          className="em-dd__dip"
          d="M70 28 L95 78 L130 48 L70 28 Z"
        />
        <path
          className="em-dd__line"
          d="M8 78 L40 52 L70 28 L95 78 L130 48 L165 38 L210 22"
          fill="none"
          pathLength="100"
        />
        <circle className="em-dd__peak" cx="70" cy="28" r="3.5" />
        <circle className="em-dd__trough" cx="95" cy="78" r="3.5" />
        <g className="em-dd__callout">
          <line x1="70" y1="28" x2="95" y2="78" />
          <text x="118" y="62">
            −12%
          </text>
        </g>
      </svg>
      <div className="em-dd__foot">Peak → trough → recovery</div>
    </div>
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
                <div className="edge-card__icon edge-card__icon--chart" aria-hidden="true">
                  {s.chart}
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
