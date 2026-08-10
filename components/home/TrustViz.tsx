/** TrustViz — code replica of public/images/trustblue2.png.
 *  Pixel-faithful phone hardware + in-screen UI. Scales from a 1520×1013 stage.
 */
'use client';

import { useEffect, useRef } from 'react';

const BRAND = '/images/mainlogo.png';
const STAGE_W = 1520;

function OrbitSvg() {
  return (
    <svg className="orbits" viewBox="0 0 1520 1013" fill="none" aria-hidden="true">
      <g stroke="#3B93FF" fill="none" strokeLinecap="round">
        <circle
          cx="779"
          cy="779"
          r="805"
          strokeWidth="1.4"
          strokeOpacity=".22"
          strokeDasharray="2810 2248"
          transform="rotate(-170 779 779)"
        />
        <circle
          cx="779"
          cy="779"
          r="647"
          strokeWidth="7"
          strokeOpacity=".07"
          strokeDasharray="2541 1524"
          transform="rotate(-200 779 779)"
        />
        <circle
          cx="779"
          cy="779"
          r="647"
          strokeWidth="2.1"
          strokeOpacity=".70"
          strokeDasharray="2541 1524"
          transform="rotate(-200 779 779)"
        />
        <circle
          cx="779"
          cy="779"
          r="470"
          strokeWidth="7"
          strokeOpacity=".06"
          strokeDasharray="2051 902"
          transform="rotate(-210 779 779)"
        />
        <circle
          cx="779"
          cy="779"
          r="470"
          strokeWidth="2"
          strokeOpacity=".58"
          strokeDasharray="2051 902"
          transform="rotate(-210 779 779)"
        />
      </g>
    </svg>
  );
}

function Badge({
  cls,
  children,
}: {
  cls: string;
  children: React.ReactNode;
}) {
  return (
    <div className={`badge ${cls}`} aria-hidden="true">
      {children}
    </div>
  );
}

function TabBar({ active = 0 }: { active?: number }) {
  const tabs = [
    {
      label: 'Home',
      path: <path d="M4 11l8-6 8 6v8a1 1 0 0 1-1 1h-4v-6h-6v6H5a1 1 0 0 1-1-1z" />,
    },
    {
      label: 'Portfolio',
      path: (
        <>
          <path d="M8 7V6a4 4 0 0 1 8 0v1" />
          <rect x="4" y="7" width="16" height="13" rx="2" />
        </>
      ),
    },
    {
      label: 'Insights',
      path: (
        <>
          <path d="M6 18v-5" />
          <path d="M12 18V7" />
          <path d="M18 18v-8" />
        </>
      ),
    },
    {
      label: 'Settings',
      path: (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      ),
    },
  ];

  return (
    <div className="tabs" aria-hidden="true">
      {tabs.map((t, i) => (
        <div className={`tab${i === active ? ' on' : ''}`} key={t.label}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke={i === active ? '#3B9BFF' : '#4E5F76'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {t.path}
          </svg>
          <span>{t.label}</span>
        </div>
      ))}
    </div>
  );
}

function PhoneHeader({
  delta,
  subline,
}: {
  delta: React.ReactNode;
  subline: React.ReactNode;
}) {
  return (
    <div className="hrow">
      <div>
        <div className="eyebrow">Total portfolio · spot &amp; pending</div>
        <div className="total">$610.80</div>
        <div className="delta">{delta}</div>
        <div className="subline">{subline}</div>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="brand" alt="ByteBoom" src={BRAND} />
    </div>
  );
}

function StatsPanel({
  cells,
}: {
  cells: { lbl: string; val: string; sub: string; cyan?: boolean }[];
}) {
  return (
    <div className="stats-panel">
      {cells.map((c) => (
        <div className="cell" key={c.lbl}>
          <div className="lbl">{c.lbl}</div>
          <div className={`val${c.cyan ? ' val--cyan' : ''}`}>{c.val}</div>
          <div className="sub">{c.sub}</div>
        </div>
      ))}
    </div>
  );
}

/** Back phone — portfolio layout (trade cards + active slots) */
function ScreenPortfolio() {
  return (
    <div className="ui">
      <PhoneHeader
        delta={
          <>
            +$13.00 &nbsp;+4.98% &nbsp;
            <span style={{ color: '#5C6E86', fontWeight: 500 }}>24h</span>
          </>
        }
        subline={
          <>
            Available <b>$3.30</b> &nbsp;|&nbsp; In orders <b>$607.50</b>
          </>
        }
      />

      <StatsPanel
        cells={[
          { lbl: 'Realised', val: '$93.30', sub: 'This week' },
          { lbl: 'Unrealised', val: '$91.39', sub: 'Open trades' },
          { lbl: 'Fees saved', val: '$89.34', sub: 'Since May', cyan: true },
        ]}
      />

      <div className="tradecards">
        <div className="tc">
          <div className="tc__top">
            <span className="ico ico--a">A</span>
            <span className="pill pill--run">● Grid running</span>
          </div>
          <div className="tc__sym">ADA USDT</div>
          <div className="tc__k">Unrealised</div>
          <div className="tc__pnl">+$0.09</div>
          <div className="tc__grid">
            <div>
              Entry<b>0.5120</b>
            </div>
            <div>
              Last<b>0.5148</b>
            </div>
            <div>
              Next buy<b>0.5061</b>
            </div>
            <div>
              Qty<b>10.9800</b>
            </div>
          </div>
        </div>

        <div className="tc tc--focus">
          <div className="tc__top">
            <span className="ico ico--b">B</span>
            <span className="pill pill--run">● Grid running</span>
          </div>
          <div className="tc__sym">BNB USDT</div>
          <div className="tc__k">Unrealised</div>
          <div className="tc__pnl">+$0.37</div>
          <div className="tc__grid">
            <div>
              Entry<b>608.42</b>
            </div>
            <div>
              Last<b>613.05</b>
            </div>
            <div>
              Next buy<b>604.18</b>
            </div>
            <div>
              Qty<b>0.0800</b>
            </div>
          </div>
        </div>

        <div className="tc">
          <div className="tc__top">
            <span className="ico ico--g">G</span>
            <span className="pill pill--pause">● Paused</span>
          </div>
          <div className="tc__sym">BTG USDT</div>
          <div className="tc__k">Unrealised</div>
          <div className="tc__pnl">+$0.49</div>
          <div className="tc__grid">
            <div>
              Entry<b>29.860</b>
            </div>
            <div>
              Last<b>29.941</b>
            </div>
            <div>
              Resume at<b>29.60</b>
            </div>
            <div>
              Qty<b>6.0119</b>
            </div>
          </div>
        </div>
      </div>

      <div className="pager" aria-hidden="true">
        <span className="pager__dots">
          <i className="on" />
          <i />
          <i />
          <i />
        </span>
        <span className="pager__arrow">›</span>
      </div>

      <div className="sec">Active trade slots</div>
      <div className="slots">
        <div className="slot">
          <b>1</b>
          <span>Open positions</span>
        </div>
        <div className="slot">
          <b>27%</b>
          <span>Balance in use</span>
        </div>
      </div>

      <TabBar />
    </div>
  );
}

/** Front phone — signals layout (pair + radar + insights) */
function ScreenSignals() {
  const bars = [22, 34, 28, 48, 40, 62, 54, 78, 68, 90, 82, 100, 86, 74, 80, 60, 66, 52, 58, 44, 50, 36, 42, 30];
  const factors = [
    { name: 'BNB', pct: 78, tone: 'amber' },
    { name: 'USDT', pct: 54, tone: 'green' },
    { name: 'ADA', pct: 31, tone: 'cyan' },
    { name: 'Reserved', pct: 17, tone: 'violet' },
  ];

  return (
    <div className="ui">
      <PhoneHeader
        delta={
          <>
            +$13.00 &nbsp;+4.98% &nbsp;
            <span style={{ color: '#5C6E86', fontWeight: 500 }}>24h</span>
          </>
        }
        subline={
          <>
            Available <b>$3.30</b> &nbsp;|&nbsp; In orders <b>$607.50</b>
          </>
        }
      />

      <StatsPanel
        cells={[
          { lbl: 'Today', val: '$3.90', sub: 'Net profit' },
          { lbl: 'This week', val: '$58.29', sub: 'Net profit' },
          { lbl: 'All time', val: '$93.44', sub: 'Net profit', cyan: true },
        ]}
      />

      <div className="sigrow">
        <div className="coin">B</div>
        <div className="pair">BNBUSDT</div>
        <span className="side">BUY</span>
        <div className="pct">
          <b>85%</b>
          <i>Grid filled</i>
        </div>
      </div>

      <div className="big">$565.0300</div>

      <div className="anal">
        <svg className="radar" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="44" />
          <circle cx="50" cy="50" r="33" />
          <circle cx="50" cy="50" r="22" />
          <circle cx="50" cy="50" r="11" />
          <line x1="50" y1="4" x2="50" y2="96" />
          <line x1="4" y1="50" x2="96" y2="50" />
          <path d="M50 50 L50 6 A44 44 0 0 1 92 28 Z" className="radar__wedge" />
          <circle cx="50" cy="50" r="4.5" className="radar__core" />
        </svg>

        <ul className="factors">
          {factors.map((f) => (
            <li key={f.name}>
              <span className="factors__n">{f.name}</span>
              <span className="factors__track">
                <span className={`factors__fill factors__fill--${f.tone}`} style={{ width: `${f.pct}%` }} />
              </span>
              <span className={`factors__v factors__v--${f.tone}`}>{f.pct}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="locked">
        <span className="locked__tag">Locked</span>
        <span className="bars" aria-hidden="true">
          {bars.map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </span>
      </div>

      <div className="pager pager--signals" aria-hidden="true">
        <span className="pager__arrow">‹</span>
        <span className="pager__dots">
          <i />
          <i className="on" />
          <i />
        </span>
        <span className="pager__arrow">›</span>
      </div>

      <div className="sec">Signal insights</div>
      <div className="cards2">
        <div className="card">
          <b>Accumulate</b>
          <span>Range holding since 04:20</span>
        </div>
        <div className="card">
          <b>2 grids active</b>
          <span>Rebalancing in 6m</span>
        </div>
      </div>

      <TabBar />
    </div>
  );
}

function PhoneShell({
  id,
  buttons,
  children,
}: {
  id: 'phoneA' | 'phoneB';
  buttons: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="phone" id={id}>
      <div className="chassis">
        <div className="rail" />
        {buttons}
        <div className="front">
          <div className="glass">
            <div className="screen">
              {children}
              <div className="home" />
              <div className="ao" />
            </div>
            <div className="island" />
            <div className="sheen" />
          </div>
          <div className="bevel" />
        </div>
      </div>
    </div>
  );
}

export default function TrustViz() {
  const artRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = artRef.current;
    if (!el) return;

    const applyScale = (width: number) => {
      if (width <= 0) return;
      el.style.setProperty('--tv-scale', String(width / STAGE_W));
    };

    applyScale(el.getBoundingClientRect().width);

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? 0;
      applyScale(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={artRef}
      className="tv-art"
      role="img"
      aria-label="ByteBoom mobile app — portfolio and live trading signals, connected to your exchange with a trade-only key"
    >
      <div className="tv-stage">
        <OrbitSvg />

        <div className="dot" style={{ left: 497.1, top: 184.1, width: 17, height: 17 }} />
        <div className="dot" style={{ left: 304.1, top: 722.4, width: 15, height: 15 }} />
        <div className="dot" style={{ left: 1408.2, top: 883.4, width: 16, height: 16 }} />
        <div className="dot" style={{ left: 312.8, top: 870.2, width: 13, height: 13 }} />
        <div className="dot" style={{ left: 1342.0, top: 204.0, width: 12, height: 12 }} />

        <Badge cls="b-funnel">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 4h18l-7 8v6l-4 2v-8z" />
          </svg>
        </Badge>
        <Badge cls="b-wallet">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="6" width="18" height="13" rx="3" />
            <path d="M3 10h18" />
            <circle cx="16.5" cy="14.5" r="1.4" fill="#fff" stroke="none" />
          </svg>
        </Badge>
        <Badge cls="b-chart">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <path d="M6 17V11" />
            <path d="M12 17V6" />
            <path d="M18 17v-8" />
          </svg>
        </Badge>
        <Badge cls="b-target">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
            <circle cx="12" cy="12" r="8.5" />
            <circle cx="12" cy="12" r="3.2" fill="#fff" stroke="none" />
          </svg>
        </Badge>

        <div className="shadow" style={{ left: 404, top: 842, width: 540, height: 184 }} />
        <div className="shadow" style={{ left: 760, top: 748, width: 486, height: 164 }} />

        <PhoneShell
          id="phoneB"
          buttons={<div className="side-btn" style={{ right: 2, top: 230, height: 72 }} />}
        >
          <ScreenPortfolio />
        </PhoneShell>

        <div className="cast" style={{ left: 700, top: 150, width: 230, height: 640 }} />

        <PhoneShell
          id="phoneA"
          buttons={
            <>
              <div className="side-btn" style={{ left: 2, top: 162, height: 28 }} />
              <div className="side-btn" style={{ left: 2, top: 218, height: 50 }} />
              <div className="side-btn" style={{ left: 2, top: 288, height: 50 }} />
            </>
          }
        >
          <ScreenSignals />
        </PhoneShell>
      </div>
    </div>
  );
}
