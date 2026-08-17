'use client';

/** Hero — brand statement left, isometric system visual right.
    The visual is pure SVG (transparent, glowing) so it reads as part of
    the 3D world behind it rather than an image pasted on top.

    Read it left to right: three sealed blocks in sequence, linked at their
    bases, and a fourth still being assembled off the front of the plate. The
    blocks are not decoration — each carries the payload for its stage of the
    loop, which is what makes this a picture of the product rather than stock
    "blockchain cubes":

      A  violet, small   market read      candlesticks on the lit face
      B  cyan, tall      the engine       conviction bars + ledger strata
      C  blue-cyan       execution        ledger slots on the top face, one lit
      D  wireframe       the next block   dashed, filling from the bottom

    D is the point of the whole illustration: the chain is still extending
    while nobody is watching it. */

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
        {/* execution block gets its own cooler top so the three roles read as
            three different things rather than one cube duplicated */}
        <linearGradient id="isoTopB" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7fe3ff" />
          <stop offset="1" stopColor="#2a9fe0" />
        </linearGradient>
        {/* conviction bars: bright at the tip, falling away toward the base,
            so they read as lit strokes rather than flat rectangles */}
        <linearGradient id="isoBar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8f4ff" />
          <stop offset="1" stopColor="rgba(23,214,238,0.22)" />
        </linearGradient>
        <linearGradient id="isoCore" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#5ce0f5" />
        </linearGradient>
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
        {/* feed into the block being assembled, not into empty space */}
        <path d="M446 346 H500 V286" />
      </g>
      <g className="hero-iso__nodes" fill="#9ff0fb">
        <circle cx="230" cy="96" r="3.2" />
        <circle cx="280" cy="72" r="4" />
        <circle cx="340" cy="84" r="3.2" />
        <circle cx="70" cy="240" r="3" />
        <circle cx="500" cy="286" r="3" />
      </g>

      {/* ---- the chain ----
          Beams run base to base along the sequence, so the blocks are linked
          in an order instead of floating apart. Drawn before the blocks so
          each one occludes the beam behind it and the depth holds up. */}
      <g className="hero-iso__chain">
        <path
          d="M170 301 L280 282 M280 282 L395 289 M395 289 L408 327"
          stroke="rgba(23,214,238,0.5)"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        <g className="hero-iso__flow" fill="#9ff0fb">
          <circle cx="225" cy="291" r="2.6" />
          <circle cx="337" cy="285" r="2.6" />
          <circle cx="401" cy="308" r="2.4" />
        </g>
      </g>

      {/* block A — market read (violet) */}
      <g className="hero-iso__cube hero-iso__cube--a">
        <ellipse cx="170" cy="292" rx="72" ry="30" fill="url(#isoGlowV)" />
        <path d="M170 205 L214 227 L170 249 L126 227 Z" fill="url(#isoTopV)" />
        <path d="M214 227 L170 249 L170 301 L214 279 Z" fill="url(#isoRightV)" />
        <path d="M126 227 L170 249 L170 301 L126 279 Z" fill="url(#isoLeftV)" />
        {/* ledger seam — one slab boundary, enough to say "stacked" at this size */}
        <path
          d="M170 275 L214 253 M126 253 L170 275"
          stroke="rgba(170,140,255,0.4)"
          strokeWidth="1"
          fill="none"
        />
        {/* candlesticks: wick + body, stepping up. The payload of a read is a
            price series, so that is what the face carries. */}
        <g strokeLinecap="round">
          <path d="M182 291 L182 267 M192 286 L192 264 M202 281 L202 255" stroke="rgba(190,170,255,0.5)" strokeWidth="1" />
          <path d="M182 287 L182 275 M192 282 L192 270 M202 277 L202 261" stroke="#c9bcff" strokeWidth="3.6" />
        </g>
        <path
          d="M170 205 L214 227 L170 249 L126 227 Z M214 227 L214 279 L170 301 L126 279 L126 227"
          stroke="rgba(160,130,255,0.5)"
          strokeWidth="1"
          fill="none"
        />
        {/* edge light along the two top-front edges — the single highlight that
            makes a flat isometric solid read as lit */}
        <path d="M126 227 L170 249 L214 227" stroke="rgba(215,200,255,0.85)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </g>

      {/* block B — the engine (cyan, tall) */}
      <g className="hero-iso__cube hero-iso__cube--b">
        <ellipse cx="280" cy="288" rx="96" ry="38" fill="url(#isoGlow)" />
        <path d="M280 150 L340 180 L280 210 L220 180 Z" fill="url(#isoTop)" />
        <path d="M340 180 L280 210 L280 282 L340 252 Z" fill="url(#isoRight)" />
        <path d="M220 180 L280 210 L280 282 L220 252 Z" fill="url(#isoLeft)" />
        {/* three strata: the block is a stack of committed layers, not a solid */}
        <path
          d="M280 234 L340 204 M220 204 L280 234 M280 258 L340 228 M220 228 L280 258"
          stroke="rgba(120,230,250,0.34)"
          strokeWidth="1"
          fill="none"
        />
        {/* conviction bars — the engine's live read, on the lit face */}
        <path
          d="M292 272 L292 250 M304 266 L304 232 M316 260 L316 234 M328 254 L328 214"
          stroke="url(#isoBar)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* hash strip on the shadow face — the committed record */}
        <g stroke="rgba(150,220,245,0.34)" strokeWidth="1.4" strokeLinecap="round">
          <path d="M228 218 L228 224 M236 222 L236 228 M244 226 L244 232 M252 230 L252 236 M260 234 L260 240 M268 238 L268 244" />
          <path d="M232 236 L232 241 M240 240 L240 245 M248 244 L248 249 M256 248 L256 253 M264 252 L264 257" opacity="0.6" />
        </g>
        {/* core showing through the top face */}
        <path d="M280 165 L310 180 L280 195 L250 180 Z" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
        <path className="hero-iso__core" d="M280 172 L296 180 L280 188 L264 180 Z" fill="url(#isoCore)" />
        <path
          d="M280 150 L340 180 L280 210 L220 180 Z M340 180 L340 252 L280 282 L220 252 L220 180"
          stroke="rgba(120,230,250,0.55)"
          strokeWidth="1.1"
          fill="none"
        />
        <path d="M220 180 L280 210 L340 180" stroke="rgba(210,250,255,0.9)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </g>

      {/* block C — execution */}
      <g className="hero-iso__cube hero-iso__cube--c">
        <ellipse cx="395" cy="272" rx="80" ry="32" fill="url(#isoGlow)" />
        <path d="M395 185 L443 209 L395 233 L347 209 Z" fill="url(#isoTopB)" />
        <path d="M443 209 L395 233 L395 289 L443 265 Z" fill="url(#isoRight)" />
        <path d="M347 209 L395 233 L395 289 L347 265 Z" fill="url(#isoLeft)" />
        <path
          d="M395 261 L443 237 M347 237 L395 261"
          stroke="rgba(120,230,250,0.3)"
          strokeWidth="1"
          fill="none"
        />
        {/* ledger slots, on the TOP face rather than a side face.
            The side face is ~34px wide once rendered — too small to hold a
            figurative mark, and its two axes are easy to misread as a tilt.
            The top rhombus has no such problem: quartering it along its own
            diagonals is pure isometric construction, symmetric about both
            axes, so there is no direction here to get wrong. One slot is lit:
            the position this block just wrote. */}
        <path
          d="M419 197 L371 221 M371 197 L419 221"
          stroke="rgba(10,44,70,0.5)"
          strokeWidth="1"
          fill="none"
        />
        <path className="hero-iso__slot" d="M419 197 L443 209 L419 221 L395 209 Z" fill="rgba(180,245,255,0.55)" />
        <path
          d="M395 185 L443 209 L395 233 L347 209 Z M443 209 L443 265 L395 289 L347 265 L347 209"
          stroke="rgba(120,230,250,0.5)"
          strokeWidth="1"
          fill="none"
        />
        <path d="M347 209 L395 233 L443 209" stroke="rgba(200,245,255,0.85)" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      </g>

      {/* block D — the next block, still being assembled.
          Off the front edge of the plate on purpose: it is not committed yet.
          Solid from the bottom up to the fill line, dashed above it. */}
      <g className="hero-iso__cube hero-iso__cube--d">
        <path className="hero-iso__form-fill" d="M446 370 L408 389 L408 409 L446 390 Z" fill="rgba(23,214,238,0.3)" />
        <path className="hero-iso__form-fill" d="M370 370 L408 389 L408 409 L370 390 Z" fill="rgba(23,214,238,0.16)" />
        <path
          className="hero-iso__form"
          d="M408 327 L446 346 L408 365 L370 346 Z M446 346 L446 390 L408 409 L370 390 L370 346 M408 365 L408 409"
          stroke="rgba(23,214,238,0.6)"
          strokeWidth="1.2"
          fill="none"
          strokeLinejoin="round"
        />
        <path className="hero-iso__form-ring" d="M408 320 L453 342 L408 364 L363 342 Z" stroke="rgba(140,239,251,0.4)" strokeWidth="1" fill="none" />
      </g>

      {/* one flat pad left in — it balances the forming block across the plate */}
      <g className="hero-iso__pad hero-iso__pad--a">
        <path d="M132 352 L164 368 L132 384 L100 368 Z" fill="rgba(23,214,238,0.16)" stroke="rgba(23,214,238,0.45)" strokeWidth="1" />
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
      </div>
    </section>
  );
}
