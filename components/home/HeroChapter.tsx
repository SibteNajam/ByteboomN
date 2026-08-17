'use client';

/** Hero — brand statement left, isometric system visual right.
    The visual is pure SVG (transparent, glowing) so it reads as part of
    the 3D world behind it rather than an image pasted on top. */

function IsoSystem() {
  return (
    <svg
      className="hero-iso"
      viewBox="0 0 560 470"
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="isoTop" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8ceffb" />
          <stop offset="1" stopColor="#17d6ee" />
        </linearGradient>
        <linearGradient id="isoRight" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e5a78" />
          <stop offset="1" stopColor="#0a2c46" />
        </linearGradient>
        <linearGradient id="isoLeft" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14405f" />
          <stop offset="1" stopColor="#081e32" />
        </linearGradient>
        <linearGradient id="isoTopV" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#c9bcff" />
          <stop offset="1" stopColor="#7d5cff" />
        </linearGradient>
        <linearGradient id="isoRightV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d2f80" />
          <stop offset="1" stopColor="#1c1440" />
        </linearGradient>
        <linearGradient id="isoLeftV" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a2160" />
          <stop offset="1" stopColor="#130e30" />
        </linearGradient>
        <radialGradient id="isoGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(23,214,238,0.28)" />
          <stop offset="1" stopColor="rgba(23,214,238,0)" />
        </radialGradient>
        <radialGradient id="isoGlowV" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(125,92,255,0.24)" />
          <stop offset="1" stopColor="rgba(125,92,255,0)" />
        </radialGradient>
      </defs>

      {/* platform glow pool */}
      <ellipse cx="280" cy="330" rx="230" ry="90" fill="url(#isoGlow)" />

      {/* base platform — diamond grid */}
      <g className="hero-iso__grid" stroke="rgba(90,150,200,0.18)" strokeWidth="1">
        <path d="M280 250 L440 330 L280 410 L120 330 Z" />
        <path d="M280 282 L376 330 L280 378 L184 330 Z" />
        <path d="M200 290 L360 370 M360 290 L200 370" opacity="0.5" />
      </g>

      {/* circuit traces up from cubes */}
      <g className="hero-iso__wires" stroke="rgba(23,214,238,0.45)" strokeWidth="1.4" fill="none">
        <path d="M170 205 V150 H230 V96" />
        <path d="M280 150 V72" />
        <path d="M395 185 V120 H340 V84" />
        <path d="M120 300 H70 V240" />
        <path d="M440 310 H500 V250" />
      </g>
      <g className="hero-iso__nodes" fill="#9ff0fb">
        <circle cx="230" cy="96" r="3.2" />
        <circle cx="280" cy="72" r="4" />
        <circle cx="340" cy="84" r="3.2" />
        <circle cx="70" cy="240" r="3" />
        <circle cx="500" cy="250" r="3" />
      </g>

      {/* cube: left (violet, small) */}
      <g className="hero-iso__cube hero-iso__cube--a">
        <ellipse cx="170" cy="292" rx="72" ry="30" fill="url(#isoGlowV)" />
        <path d="M170 205 L214 227 L170 249 L126 227 Z" fill="url(#isoTopV)" />
        <path d="M214 227 L170 249 L170 301 L214 279 Z" fill="url(#isoRightV)" />
        <path d="M126 227 L170 249 L170 301 L126 279 Z" fill="url(#isoLeftV)" />
        <path
          d="M170 205 L214 227 L170 249 L126 227 Z M214 227 L214 279 L170 301 L126 279 L126 227"
          stroke="rgba(160,130,255,0.55)"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* cube: center (cyan, large) */}
      <g className="hero-iso__cube hero-iso__cube--b">
        <ellipse cx="280" cy="288" rx="96" ry="38" fill="url(#isoGlow)" />
        <path d="M280 150 L340 180 L280 210 L220 180 Z" fill="url(#isoTop)" />
        <path d="M340 180 L280 210 L280 282 L340 252 Z" fill="url(#isoRight)" />
        <path d="M220 180 L280 210 L280 282 L220 252 Z" fill="url(#isoLeft)" />
        <path
          d="M280 150 L340 180 L280 210 L220 180 Z M340 180 L340 252 L280 282 L220 252 L220 180"
          stroke="rgba(120,230,250,0.6)"
          strokeWidth="1.1"
          fill="none"
        />
        {/* face detail — signal bars */}
        <path
          d="M296 226 L318 215 M296 240 L318 229 M296 254 L310 247"
          stroke="rgba(140,240,255,0.75)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* cube: right (cyan-blue, medium) */}
      <g className="hero-iso__cube hero-iso__cube--c">
        <ellipse cx="395" cy="272" rx="80" ry="32" fill="url(#isoGlow)" />
        <path d="M395 185 L443 209 L395 233 L347 209 Z" fill="url(#isoTop)" />
        <path d="M443 209 L395 233 L395 289 L443 265 Z" fill="url(#isoRight)" />
        <path d="M347 209 L395 233 L395 289 L347 265 Z" fill="url(#isoLeft)" />
        <path
          d="M395 185 L443 209 L395 233 L347 209 Z M443 209 L443 265 L395 289 L347 265 L347 209"
          stroke="rgba(120,230,250,0.55)"
          strokeWidth="1"
          fill="none"
        />
      </g>

      {/* small floating pads */}
      <g className="hero-iso__pad hero-iso__pad--a">
        <path d="M132 352 L164 368 L132 384 L100 368 Z" fill="rgba(23,214,238,0.16)" stroke="rgba(23,214,238,0.45)" strokeWidth="1" />
      </g>
      <g className="hero-iso__pad hero-iso__pad--b">
        <path d="M420 344 L456 362 L420 380 L384 362 Z" fill="rgba(125,92,255,0.14)" stroke="rgba(150,120,255,0.4)" strokeWidth="1" />
      </g>
    </svg>
  );
}

export default function HeroChapter() {
  return (
    <section
      className="chapter chapter--hero"
      id="top"
      data-a="0.00"
      data-b="0.06"
      data-side="center"
      data-dir="center"
    >
      <div className="panel panel--hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="kicker kicker--live">
              <span className="kicker__dot" aria-hidden="true" />
              AI trading system · live
            </p>
            <h1 className="hero-title">
              AI crypto trading <span className="hero-title__grad">that runs while you sleep</span>
            </h1>
            <p className="hero-lead">
              Connect your exchange — ByteBoom watches the market and places trades for you, day and night.
            </p>
            <div className="hero-actions">
              <a href="#productnode" className="btn btn--primary btn--lg" data-magnetic>
                Explore trading engines
                <svg className="i" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a href="#trustnode" className="btn btn--ghost btn--lg">
                See how it works
              </a>
            </div>
            <ul className="hero-assure" aria-label="Core guarantees">
              <li>Always-on automation</li>
              <li>Connect &amp; go</li>
              <li>Start in minutes</li>
            </ul>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <IsoSystem />
          </div>
        </div>

        <div className="hero-strip" aria-hidden="true">
          <span className="hero-strip__label">Enter the system</span>
          <span className="hero-strip__rail">
            <span className="hero-strip__rider" />
          </span>
          <span className="hero-strip__meta">08 nodes · scroll to travel</span>
        </div>
      </div>
    </section>
  );
}
