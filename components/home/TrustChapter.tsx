'use client';

import type { CSSProperties } from 'react';

/** Trust — split row: custody copy on the left, app mockups on the right.
    No orbit rings; the phones sit in a soft aura over a fading dot field so
    the world's animation reads straight through the section. Exit is the
    signature fly-through, now growing from the mockups. */
/* One bold line each, in place of a heading plus a two-line paragraph that
   mostly restated it. Each line keeps the same shape — what ByteBoom does,
   then the guarantee after the dash — so the three read as one contract. */
const TRUST_POINTS = [
  {
    icon: 'i-key',
    tone: 'cyan',
    title: 'Opens and closes trades for you — it can never withdraw or move your money',
  },
  {
    icon: 'i-lock',
    tone: 'violet',
    title: 'Your money stays on your exchange — ByteBoom sends instructions, never holds your balance',
  },
  {
    icon: 'i-exit',
    tone: 'green',
    title: 'Pause or remove access anytime from your dashboard — no waiting, no support ticket',
  },
];

/** Intrinsic size of every export in /images/mobile mockup — a full device
    render (chassis, side keys, dynamic island) on a transparent ground, with
    ~3.5% of breathing room around the silhouette for its own contact shadow.

    So the render IS the hardware: wrapping it in a CSS chassis the way the
    old TrustViz build did would draw a second bezel, a second island and a
    second set of keys over the ones already baked into the pixels. Depth
    comes from the stage instead — perspective, yaw and z-offset in
    stations.css — and the only thing painted on top is a specular sweep
    masked by the PNG's own alpha, so it stops exactly at the rail. */
const SHOT_W = 1419;
const SHOT_H = 2796;

function PhoneMockup({
  className,
  src,
  alt,
}: {
  className: string;
  src: string;
  alt: string;
}) {
  return (
    <figure
      className={`trust-phone ${className}`}
      /* the mask needs the same file the <img> loads; encodeURI covers the
         space in the directory name, which url() cannot take raw */
      style={{ '--shot': `url("${encodeURI(src)}")` } as CSSProperties}
    >
      {/* The render is front-on, so yawing it foreshortens the screen but can
          never reveal a side — the thickness does not exist in the pixels.
          These two layers ARE the thickness: the same silhouette (masked from
          the shot's own alpha, so it traces the rounded rail exactly) shifted
          along the axis the yaw exposes. Body first, then the polished
          chamfer nearer the glass — that pair is what reads as metal. */}
      <span className="trust-phone__body" aria-hidden="true" />
      <span className="trust-phone__chamfer" aria-hidden="true" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="trust-phone__shot"
        src={src}
        alt={alt}
        width={SHOT_W}
        height={SHOT_H}
        loading="lazy"
        decoding="async"
      />
      <span className="trust-phone__gloss" aria-hidden="true" />
    </figure>
  );
}

export default function TrustChapter() {
  return (
    <section
      className="chapter chapter--trust"
      id="trustnode"
      data-a="0.08"
      data-b="0.17"
      data-side="center"
      data-dir="right"
      data-exit="into"
    >
      <div className="panel panel--trust">
        <div className="trust-split">
          <div className="trust-copy">
            <header className="trust-copy__head">
              <p className="kicker">
                <span className="kicker__dot" aria-hidden="true" />
                Custody
              </p>
              <h2>Connected to your exchange. Never in control of it.</h2>
              <p className="sec-lead">
                You link your exchange account so ByteBoom can trade for you — it can never take money
                out, transfer coins, or move your balance.
              </p>
            </header>

            <ul className="trust-points">
              {TRUST_POINTS.map((point) => (
                <li className="trust-point" data-tone={point.tone} key={point.title}>
                  <span className="trust-point__ico" aria-hidden="true">
                    <svg width="18" height="18">
                      <use href={`#${point.icon}`} />
                    </svg>
                  </span>
                  <h3 className="trust-point__text">{point.title}</h3>
                </li>
              ))}
            </ul>
          </div>

          <div className="trust-stage">
            <span className="trust-stage__field" aria-hidden="true" />

            <div className="trust-phones">
              {/* Signals leads: it is the denser, better-composed screen, and a
                  live $610.80 balance sells the product where the settings
                  screen's $0.00 does not. Bot controls plays the support role
                  behind it — still the right second screen for this section,
                  since Pause / Unlink is what the copy is promising.
                  *-clean.png are the shipped exports: same renders with the
                  personal notification icons patched out of the status bar and
                  the PnL figures rewritten as gains. Rebuild them from the
                  untouched originals with `node scripts/build-mockups.js`. */}
              <PhoneMockup
                className="trust-phone--back"
                src="/images/mobile mockup/bot-controls-clean.png"
                alt="ByteBoom app — trading engine controls, exchange link and unlink"
              />
              <PhoneMockup
                className="trust-phone--front"
                src="/images/mobile mockup/signals-clean.png"
                alt="ByteBoom app — live signals and portfolio"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
