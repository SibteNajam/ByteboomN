'use client';

/** Icon system — "traced plate".
 *
 *  One construction grid for every UI icon, so the set reads as drawn for
 *  ByteBoom rather than pulled from a pack:
 *
 *   · 24×24 box, live area 3–21, stroke 1.7 (≈1.2px at the 16–20px these
 *     actually render at — see .about-principle__icon .i, which is 15px).
 *   · Geometry is orthogonal or exactly 45°. Corners are chamfered, never
 *     arced, matching the routed traces in BotsChapter's CircuitWires and
 *     the corridor the whole site is built on.
 *   · Concept icons carry exactly ONE filled terminal node — the live
 *     point. Utility glyphs (check / x / chevron) carry none; a functional
 *     mark should not wear jewellery.
 *
 *  Brand and asset marks below the divider are deliberately untouched:
 *  GitHub, LinkedIn, X, Discord, BTC, ETH and SOL have to stay
 *  recognisable, and bb-bot is the product's own mark.
 */

const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const;

/** filled terminal node — the one lit point in a concept icon */
const NODE = { fill: 'currentColor', stroke: 'none' } as const;

export default function SvgSprite() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <defs>
          <linearGradient id="bbgrad" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#14e0d0" />
            <stop offset="1" stopColor="#17d6ee" />
          </linearGradient>

          {/* ---- concept icons ---- */}

          {/* shield: a chamfered plate over a distribution node — the rules
              fan out underneath the guard */}
          <symbol id="i-shield" viewBox="0 0 24 24">
            <g {...S}>
              <path d="M12 3.2 19.2 5.9v5.3l-3.5 7.2L12 20.6l-3.7-2.2-3.5-7.2V5.9Z" />
              <path d="M12 11.8 9.8 14v2.2M12 11.8 14.2 14v2.2" />
            </g>
            <circle cx="12" cy="10" r="1.8" {...NODE} />
          </symbol>

          {/* key: the head is a pad on the 45° grid, not a keyring circle */}
          <symbol id="i-key" viewBox="0 0 24 24">
            <g {...S}>
              <path d="M8.5 4.2 12.8 8.5 8.5 12.8 4.2 8.5Z" />
              <path d="m10.6 10.6 8.8 8.8" />
              <path d="m14.6 14.6 2.4-2.4" />
            </g>
            <circle cx="8.5" cy="8.5" r="1.6" {...NODE} />
          </symbol>

          {/* lock: the shackle is routed with chamfers rather than bent as an
              arc — same language as the traces on the bot cards */}
          <symbol id="i-lock" viewBox="0 0 24 24">
            <g {...S}>
              <path d="M6.2 11.6 7.8 10h8.4l1.6 1.6v6.8L16.2 20H7.8l-1.6-1.6Z" />
              <path d="M9 10V7.6L10.6 6h2.8L15 7.6V10" />
              <path d="M12 15.9v1.5" />
            </g>
            <circle cx="12" cy="14.2" r="1.7" {...NODE} />
          </symbol>

          {/* exit: the trace leaves the plate and keeps going — disconnection,
              not a door */}
          <symbol id="i-exit" viewBox="0 0 24 24">
            <g {...S}>
              <path d="M14.2 4.4H18l1.8 1.8v11.6L18 19.6h-3.8" />
              <path d="M13.7 12H6.4" />
              <path d="M9.8 8.6 6.4 12l3.4 3.4" />
            </g>
            <circle cx="15.4" cy="12" r="1.7" {...NODE} />
          </symbol>

          {/* market: candles, because this product trades — not a line chart,
              which could belong to any analytics page */}
          <symbol id="i-market" viewBox="0 0 24 24">
            <g {...S}>
              <path d="M8 4.8v14.4" />
              <path d="M5.9 8.4h4.2v7.2H5.9Z" />
              <path d="M16 4v16" />
            </g>
            <path d="M13.9 7.4h4.2v9.2h-4.2Z" {...NODE} />
          </symbol>

          {/* signal: separate inputs converge on one node, and only then does
              anything leave — "act only when signals align", drawn literally */}
          <symbol id="i-signal" viewBox="0 0 24 24">
            <g {...S}>
              <path d="M3.4 7.6h4.4L10 9.8" />
              <path d="M3.4 16.4h4.4L10 14.2" />
              <path d="M14.1 12h6.2" />
              <path d="M17.9 9.6 20.5 12l-2.6 2.4" />
            </g>
            <circle cx="12" cy="12" r="2.1" {...NODE} />
          </symbol>

          {/* clock: the hand ends in a lit node riding the rim, the way the
              rider rides the route map */}
          <symbol id="i-clock" viewBox="0 0 24 24">
            <g {...S}>
              <circle cx="12" cy="12" r="8" />
              <path d="m12 12 4.1-4.1" />
            </g>
            <circle cx="12" cy="12" r="1" {...NODE} />
            <circle cx="17.7" cy="6.3" r="1.9" {...NODE} />
          </symbol>

          {/* rules: identical pulses, identical every cycle. A square wave says
              "deterministic" in a way a stack of layers never did */}
          <symbol id="i-rules" viewBox="0 0 24 24">
            <path d="M3.5 16.4H7V7.6h4v8.8h4V7.6h4v8.8h1.5" {...S} />
          </symbol>

          {/* ---- tier marks: the plans differ by how many exchanges you can
                  connect, so the icons count connections ---- */}

          <symbol id="i-tier-1" viewBox="0 0 24 24">
            <g {...S}>
              <circle cx="12" cy="12" r="2.9" />
              <path d="M12 9.1V6.6" />
            </g>
            <circle cx="12" cy="4.8" r="1.8" {...NODE} />
          </symbol>

          <symbol id="i-tier-3" viewBox="0 0 24 24">
            <g {...S}>
              <circle cx="12" cy="12" r="2.9" />
              <path d="M12 9.1V6.6" />
              <path d="m14.5 13.5 2 1.1" />
              <path d="m9.5 13.5-2 1.1" />
            </g>
            <circle cx="12" cy="4.8" r="1.8" {...NODE} />
            <circle cx="18.1" cy="15.5" r="1.8" {...NODE} />
            <circle cx="5.9" cy="15.5" r="1.8" {...NODE} />
          </symbol>

          {/* every seat on the bus is taken — the ring is the connection */}
          <symbol id="i-tier-max" viewBox="0 0 24 24">
            <g {...S}>
              <circle cx="12" cy="12" r="7.4" strokeWidth="1.3" />
              <circle cx="12" cy="12" r="2.9" />
            </g>
            <circle cx="12" cy="4.6" r="1.55" {...NODE} />
            <circle cx="18.4" cy="8.3" r="1.55" {...NODE} />
            <circle cx="18.4" cy="15.7" r="1.55" {...NODE} />
            <circle cx="12" cy="19.4" r="1.55" {...NODE} />
            <circle cx="5.6" cy="15.7" r="1.55" {...NODE} />
            <circle cx="5.6" cy="8.3" r="1.55" {...NODE} />
          </symbol>

          {/* ---- utility glyphs: pure 45° geometry, no terminal node ---- */}

          <symbol id="i-check" viewBox="0 0 24 24">
            <path d="M5.5 12.5 10 17l8.5-8.5" {...S} strokeWidth="2" />
          </symbol>

          <symbol id="i-x" viewBox="0 0 24 24">
            <path d="m6.8 6.8 10.4 10.4M17.2 6.8 6.8 17.2" {...S} strokeWidth="2" />
          </symbol>

          <symbol id="i-chev" viewBox="0 0 24 24">
            <path d="m6.7 9.6 5.3 5.3 5.3-5.3" {...S} strokeWidth="2" />
          </symbol>

          {/* =================================================================
              Below this line: brand and asset marks. These are other people's
              identities (and our own) — they stay as drawn.
          ================================================================= */}

          <symbol id="bb-bot" viewBox="0 0 40 40">
            <g
              fill="none"
              stroke="url(#bbgrad)"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="14.5" cy="8.5" r="1.8" />
              <circle cx="25.5" cy="8.5" r="1.8" />
              <path d="M14.5 10.3v3.2M25.5 10.3v3.2" />
              <path d="M10 15.5h20a4 4 0 0 1 4 4v6.5a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6V19.5a4 4 0 0 1 4-4Z" />
              <circle cx="15" cy="23.5" r="2.4" fill="url(#bbgrad)" stroke="none" />
              <rect x="21" y="21.4" width="7" height="4.2" rx="2.1" />
            </g>
          </symbol>

          <symbol id="i-github" viewBox="0 0 24 24">
            <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .2-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6A4.6 4.6 0 0 0 17 3.8c-.5-.5-1.1-.8-2-.9C14.2 2 13.4 2.5 12 2.5S9.8 2 8 2.9c-.9.1-1.5.4-2 .9A4.6 4.6 0 0 0 4.5 9c0 4.6 2.7 5.7 5.5 6-.7.6-.7 1.2-.5 2V21" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          </symbol>

          <symbol id="i-linkedin" viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-12h4v2" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="2" y="9" width="4" height="12" fill="none" stroke="currentColor" strokeWidth="1.7" />
            <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
          </symbol>

          <symbol id="i-x-social" viewBox="0 0 24 24">
            <path d="M4 4l16 16M20 4L4 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </symbol>

          <symbol id="i-discord" viewBox="0 0 24 24">
            <path d="M7.5 7.5c2.2-1 4.5-1 6.5 0 1.4 2.2 2.2 4.6 2.5 7.2-.8.6-1.7 1.1-2.7 1.4-.6-.6-1.1-1.3-1.5-2.1.9-.3 1.7-.7 2.5-1.2-.5-.2-1-.5-1.4-.8-2.7 1.3-4.5 1.3-7.2 0-.4.3-.9.6-1.4.8.8.5 1.6.9 2.5 1.2-.4.8-.9 1.5-1.5 2.1-1-.3-1.9-.8-2.7-1.4.3-2.6 1.1-5 2.5-7.2Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <circle cx="10" cy="12.5" r=".9" fill="currentColor" stroke="none" />
            <circle cx="14.5" cy="12.5" r=".9" fill="currentColor" stroke="none" />
          </symbol>

          <linearGradient id="solgrad" x1="360.9" y1="351.5" x2="141.2" y2="-69.3" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#00ffa3" />
            <stop offset="1" stopColor="#dc1fff" />
          </linearGradient>

          <symbol id="c-btc" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill="#f7931a" />
            <path fill="#fff"
              d="M17.288 10.291c.24-1.59-.974-2.45-2.64-3.03l.54-2.153-1.315-.33-.525 2.107c-.345-.087-.705-.167-1.064-.25l.526-2.127-1.32-.33-.54 2.165c-.285-.067-.565-.132-.84-.2l-.002-.006-1.815-.45-.35 1.407s.975.225.955.238c.535.136.63.486.615.766l-.615 2.477c.36.09.75.216 1.14.34l-.66 2.643c-.045.135-.18.34-.51.26.015.02-.96-.24-.96-.24l-.324 1.51 1.83.45c.34.085.674.174 1.005.258l-.54 2.19 1.32.327.54-2.17c.36.1.705.19 1.05.273l-.51 2.154 1.32.33.545-2.19c2.24.427 3.93.257 4.6-1.774.54-1.637-.03-2.58-1.217-3.196.87-.2 1.522-.75 1.695-1.85zm-3.02 4.22c-.38 1.56-3.1.71-3.98.49l.72-2.9c.88.216 3.66.65 3.26 2.41zm.386-4.24c-.354 1.42-2.61.7-3.5.48l.67-2.67c.89.22 3.2.63 2.83 2.19z" />
          </symbol>

          <symbol id="c-eth" viewBox="0 0 32 32">
            <circle cx="16" cy="16" r="16" fill="#627eea" />
            <g fill="#fff">
              <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z" />
              <path d="M16.498 4L9 16.22l7.498-3.35z" />
              <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z" />
              <path d="M16.498 27.995v-6.028L9 17.616z" />
              <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z" />
              <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z" />
            </g>
          </symbol>

          <symbol id="c-sol" viewBox="0 0 398 312">
            <g fill="url(#solgrad)">
              <path d="M64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1l62.7-62.7z" />
              <path d="M64.6 3.8C67.1 1.4 70.4 0 73.8 0h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8H6.5c-5.8 0-8.7-7-4.6-11.1L64.6 3.8z" />
              <path d="M333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8H6.5c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1l-62.7-62.7z" />
            </g>
          </symbol>
        </defs>
      </svg>
    </>
  );
}
