'use client';

/** Security — the same split-row language as Custody: copy ranged left, the
    visual on the right.

    Custody (trustnode) already answers "what can the engine do with my
    money". This section answers the other half — what happens to the
    credentials themselves — so the two never restate each other. Every claim
    below is the one already documented on /privacy; keep them in step. */
const SECURITY_POINTS = [
  {
    icon: 'i-lock',
    tone: 'cyan',
    title: 'Locked when stored. Protected while they travel.',
  },
  {
    icon: 'i-shield',
    tone: 'violet',
    title: 'A key that can take money out is never accepted',
  },
  {
    icon: 'i-key',
    tone: 'green',
    title: 'We check what a key can do before it ever goes live',
  },
];

export default function SecurityChapter() {
  return (
    <section
      className="chapter chapter--security"
      id="securitynode"
      data-a="0.625"
      data-b="0.692"
      data-side="center"
      data-dir="center"
    >
      <div className="panel panel--security">
        <div className="sec-split" id="security-inline">
          <div className="sec-copy">
            <header className="sec-copy__head">
              <h2>Your keys are locked before we save them.</h2>
              <p className="sec-lead">
                They reach us on a private connection. We check what they can do,
                then lock them so nobody can read them.
              </p>
            </header>

            <ul className="sec-points">
              {SECURITY_POINTS.map((point) => (
                <li className="sec-point" data-tone={point.tone} key={point.title}>
                  <span className="sec-point__ico" aria-hidden="true">
                    <svg width="18" height="18">
                      <use href={`#${point.icon}`} />
                    </svg>
                  </span>
                  <h3 className="sec-point__text">{point.title}</h3>
                </li>
              ))}
            </ul>
          </div>

          <div className="sec-stage">
            <figure className="sec-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/sec4.2.png"
                alt="A hand unlocking a phone with a fingerprint while exchange API keys, user data and a secure connection stay protected"
                width={1536}
                height={1024}
                loading="lazy"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
