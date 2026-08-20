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
    title: 'Locked while we keep it. Protected on the way.',
  },
  {
    icon: 'i-shield',
    tone: 'violet',
    title: 'Access that can take money out is never accepted',
  },
  {
    icon: 'i-key',
    tone: 'green',
    title: 'We check what it can do before anything turns on',
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
              <h2>Your access is locked before we save it.</h2>
              <p className="sec-lead">
                It comes to us on a private connection. We check what it can do,
                then lock it so nobody can read it.
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
                alt="A hand unlocking a phone while user data and a secure connection stay protected"
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
