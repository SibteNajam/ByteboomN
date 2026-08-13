'use client';

const SECURITY_ITEMS = [
  {
    id: '0',
    featured: true,
    image: '/images/funsecurity/sec1.png',
    alt: 'Private account connection',
    title: 'Private by Default',
    body: 'Your link stays between you and ByteBoom — never shared.',
  },
  {
    id: '1',
    featured: false,
    image: '/images/funsecurity/sec2.png',
    alt: 'You choose when access is on',
    title: 'Access On Your Schedule',
    body: 'Turn the connection on when you need it, off when you don’t.',
  },
  {
    id: '2',
    featured: false,
    image: '/images/funsecurity/sec3.png',
    alt: 'Protected connection details',
    title: 'Details Stay Protected',
    body: 'Login details are stored carefully — only you authorize access.',
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
        <div className="sec-header">
          <h2>Built to keep your link safe.</h2>
          <p className="sec-lead">
            Private connection. You’re in control. Easy to shut off.
          </p>
        </div>

        <div className="security-stage" id="security-inline">
          <div className="sec-stack">
            {SECURITY_ITEMS.map((item) => (
              <article
                key={item.id}
                className={`sec-item${item.featured ? ' sec-item--featured' : ''}`}
                data-sec={item.id}
              >
                <div className="sec-item__visual">
                  <span className="sec-item__orb" aria-hidden="true" />
                  <div className="sec-item__figure">
                    <img src={item.image} alt={item.alt} decoding="async" />
                  </div>
                  <span className="sec-item__plinth" aria-hidden="true" />
                </div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
