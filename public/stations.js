(function bootByteBoomStations() {
  if (typeof window !== 'undefined' && window.__BYTEBOOM_STATIONS__) return;
  if (typeof window !== 'undefined') {
    window.__BYTEBOOM_STATIONS__ = true;
    window.__BYTEBOOM_STOP__ = false;
  }

/* ===================================================================
   ByteBoom — "Enter the System" immersive journey
   The 3D flight IS the hero. Camera flies a WINDING route with real
   90° turns; each section is a NODE you arrive at — its content panel
   fades in framed to one side while the node structure sits opposite.
=================================================================== */
(() => {
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let webgl = true;
  try { const c = document.createElement('canvas'); webgl = !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl'))); } catch (e) { webgl = false; }
  if (reduced || !webgl || typeof THREE === 'undefined') { root.classList.remove('cine'); root.classList.add('flat'); }
  const CINE = root.classList.contains('cine');
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- chapters ---------- */
  const chapters = $$('.chapter').map(el => ({ el, a: +el.dataset.a, b: +el.dataset.b, dir: el.dataset.dir || 'up', exit: el.dataset.exit || '', panel: $('.panel', el) }));
  const depthBar = $('#depth'), runwayEl = $('#runway'), scrollTailHint = $('#scrollTailHint');
  const navLinks = $$('.jnav a'); let navAt = '';
  const routeMap = $('#routemap');
  const litPath = $('#routemap #litpath'), rider = $('#routemap #rider'), rmNodes = $$('#routemap .node');
  let litLen = 0; if (litPath) { litLen = litPath.getTotalLength(); litPath.style.strokeDasharray = litLen; litPath.style.strokeDashoffset = litLen; }

  function cineScrollMax() {
    if (!runwayEl) return Math.max(document.body.scrollHeight - innerHeight, 1);
    const top = runwayEl.offsetTop;
    return Math.max(top + runwayEl.offsetHeight - innerHeight, 1);
  }

  function fadeWindow(p, a, b) {
    const f = Math.min((b - a) * 0.32, 0.03);
    if (p < a || p > b) return 0;
    if (p < a + f) return a <= 0 ? 1 : (p - a) / f;
    if (p > b - f) return b >= 1 ? 1 : (b - p) / f;
    return 1;
  }
  /* Called every frame, so nothing may touch the DOM unless the value it
     would write actually changed. Opacity is quantised to 1/500 — finer than
     the eye resolves — which lets a settled chapter cost zero style writes. */
  const chapState = chapters.map(() => ({ op: -1, tf: '', fl: '' }));
  let lastRoutePaint = -1;

  function chapterOpacity(c, p) {
    if (c.el.id !== 'edgenode') return fadeWindow(p, c.a, c.b);
    // Edge needs a solid hold so both waves can finish a full zoom
    const f = 0.01;
    if (p < c.a || p > c.b) return 0;
    if (p < c.a + f) return (p - c.a) / f;
    if (p > c.b - f) return (c.b - p) / f;
    return 1;
  }

  /* `pp` may run past 1 during the About -> FAQ hand-off. Everything that
     describes the corridor clamps to 1 and instead dissolves by `tailT`, so
     the last chapter fades out under the incoming FAQ rather than cutting. */
  function updateChapters(pp, tailT) {
    const p = pp > 1 ? 1 : pp;
    const live = 1 - (tailT || 0);
    const flat = root.classList.contains('flat');
    chapters.forEach((c, i) => {
      const st = chapState[i];
      const opacity = Math.round(chapterOpacity(c, p) * live * 500) / 500;
      /* The `=== ''` arms make the cache self-healing: if anything wipes the
         inline styles (a re-render, HMR) we repaint instead of trusting it. */
      if (opacity !== st.op || c.el.style.opacity === '') {
        st.op = opacity;
        c.el.style.opacity = opacity;
        c.el.classList.toggle('live', opacity > 0.01);
        c.el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      }
      if (flat || !c.panel) return;

      const s = 1 - opacity;
      let tf, fl;
      if (c.el.id === 'edgenode' || c.el.id === 'productnode') {
        tf = 'translate3d(0,0,0) scale(1)';
        fl = 'none';
      } else if (c.exit === 'into') {
        // Fly-through: depth on the way in, rush past + blur on the way out.
        const out = p > (c.a + c.b) / 2;
        const z = out ? s * 90 : -s * 42;
        tf = `translate3d(0,0,${z.toFixed(1)}px) scale(${(out ? 1 + s * 0.5 : 1 - s * 0.12).toFixed(3)})`;
        fl = out && s > 0.002 ? `blur(${(s * 12).toFixed(1)}px)` : 'none';
      } else {
        let tx = 0, ty = 0, ry = 0, rx = 0;
        const tz = -s * 76;
        if (c.dir === 'left') { tx = -s * 110; ry = s * 7; }
        else if (c.dir === 'right') { tx = s * 110; ry = -s * 7; }
        else { ty = s * 46; rx = s * 4.5; }
        tf = `translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,${tz.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) scale(${(0.92 + 0.08 * opacity).toFixed(3)})`;
        fl = s > 0.38 ? `blur(${(s * 2.8).toFixed(1)}px)` : 'none';
      }
      if (tf !== st.tf || c.panel.style.transform === '') { st.tf = tf; c.panel.style.transform = tf; }
      if (fl !== st.fl || c.panel.style.filter === '') { st.fl = fl; c.panel.style.filter = fl; }
    });

    /* HUD dissolves on the same curve as the chapter, so nothing is left
       hanging over the FAQ waiting for the tail-mode class to catch up. */
    if (depthBar) { depthBar.style.width = (p * 100) + '%'; depthBar.style.opacity = live; }
    if (routeMap) routeMap.style.opacity = live;
    if (scrollTailHint) {
      const showTailHint = !flat && p > 0.88 && live > 0.99 && !root.classList.contains('tail-mode');
      scrollTailHint.classList.toggle('is-on', showTailHint);
      scrollTailHint.setAttribute('aria-hidden', showTailHint ? 'false' : 'true');
    }
    if (navLinks.length) {
      const inTail = root.classList.contains('tail-mode') || live < 0.5;
      const here = inTail
        ? chapters.find(c => c.el.id === 'aboutnode')
        : chapters.find(c => p >= c.a && p <= c.b);
      let id = here ? here.el.id : '';
      if (inTail) {
        id = 'faqnode';
        const footerEl = $('#footer');
        if (footerEl && footerEl.getBoundingClientRect().top < innerHeight * 0.55) id = 'footer';
      }
      if (id !== navAt) {
        navAt = id;
        navLinks.forEach(a => a.classList.toggle('is-on', a.hash === '#' + id));
      }
    }
    /* getPointAtLength() forces SVG geometry work — 1/500 steps is plenty for
       a 150px-tall minimap and skips it entirely while the camera is parked. */
    const routeStep = Math.round(p * 500);
    if (routeStep !== lastRoutePaint && litPath && rider && litPath.isConnected && rider.isConnected) {
      lastRoutePaint = routeStep;
      try {
        litPath.style.strokeDashoffset = litLen * (1 - p);
        const pt = litPath.getPointAtLength(litLen * p);
        rider.setAttribute('cx', pt.x);
        rider.setAttribute('cy', pt.y);
        rmNodes.forEach((n, i) => n.classList.toggle('on', p >= i / (rmNodes.length - 1) - 0.02));
      } catch (e) { /* SVG detached during React HMR */ }
    }
  }

  /* ---------- HELLO BYTEBOOM: one card per zoom ----------
     Scrolling only nominates which card is up; the hand-off itself runs on its
     own clock. So any scroll — a nudge or a flick — plays the whole move: the
     card on screen swells and dissolves, then the next one lands dead centre
     at full size. A card is never left parked half-zoomed. */
  const edgeSlides = $$('#edgenode .edge-slide');
  const edgeFixed = $('#edgenode .edge-fixed');
  // Hard ceiling on the zoom: at its widest the card must still sit inside the
  // viewport with a margin showing, never grow past the screen edges. The card
  // is 840px / 92vw wide, so the usable multiplier depends on the window.
  let edgeMax = 1.3;
  const measureEdgeZoom = () => {
    if (!edgeSlides.length) return;
    const w = edgeSlides[0].offsetWidth || 1;   // layout width, ignores transforms
    edgeMax = Math.max(1.18, Math.min(1.5, innerWidth * 0.94 / w));
  };
  addEventListener('resize', measureEdgeZoom); measureEdgeZoom();

  const EDGE_MS = 820;    // one full hand-off, matched to the edge card flight
  const EDGE_OUT = 0.5;   // first half sends the old card away, second brings the new one
  let edgeIdx = 0, edgeFrom = 0, edgeT0 = 0, edgeBusy = false;
  const easeIO = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(2 - 2 * x, 3) / 2;

  /* Runs inside the frame loop, so it must be a no-op once a card has settled. */
  const edgeLast = edgeSlides.map(() => '');
  const edgePaint = (slide, scale, opacity, ty, i) => {
    const tf = `translate(-50%, calc(-50% + ${ty.toFixed(1)}px)) scale(${scale.toFixed(3)})`;
    const key = tf + '|' + opacity.toFixed(3);
    if (edgeLast[i] === key && slide.style.transform !== '') return;
    edgeLast[i] = key;
    slide.style.visibility = opacity < 0.02 ? 'hidden' : 'visible';
    slide.style.opacity = String(opacity);
    slide.style.transform = tf;
    slide.style.pointerEvents = opacity > 0.9 && scale > 0.95 && scale < 1.05 ? 'auto' : 'none';
  };
  // cards already sent off rest oversized, ones still to come rest small
  const edgeRest = i => i < edgeIdx ? edgeMax : 0.24;

  /* Driven by the scroll engine's committed stop, not by live scroll position,
     so the hand-off starts on the flick instead of halfway through the flight. */
  function updateEdgeZoom(wantIdx) {
    if (!edgeSlides.length) return;
    const n = edgeSlides.length;
    const want = Math.max(0, Math.min(n - 1, wantIdx | 0));
    if (!edgeBusy && want === edgeIdx && edgeLast[edgeIdx]) return;   // settled
    const now = performance.now();

    // Only ever animate a single step, so a fast flick jumps straight to the
    // newest card instead of queueing a hand-off for every one it passed.
    if (!edgeBusy && want !== edgeIdx) {
      edgeFrom = want > edgeIdx ? want - 1 : want + 1;
      edgeIdx = want;
      edgeT0 = now;
      edgeBusy = true;
    }

    let q = 1;
    if (edgeBusy) {
      q = (now - edgeT0) / EDGE_MS;
      if (q >= 1) { q = 1; edgeBusy = false; }
    }

    const fwd = edgeIdx > edgeFrom;
    edgeSlides.forEach((slide, i) => {
      if (q >= 1) {
        if (i === edgeIdx) edgePaint(slide, 1, 1, 0, i);
        else edgePaint(slide, edgeRest(i), 0, 0, i);
      } else if (i === edgeFrom) {
        // leaving: forward it swells past the reader, backward it recedes
        const e = easeIO(Math.min(1, q / EDGE_OUT));
        edgePaint(slide, fwd ? 1 + e * (edgeMax - 1) : 1 - e * 0.7, 1 - e, fwd ? -e * 40 : e * 20, i);
      } else if (i === edgeIdx) {
        // arriving: waits for the screen to clear, then settles at full size
        const r = q <= EDGE_OUT ? 0 : easeIO((q - EDGE_OUT) / (1 - EDGE_OUT));
        edgePaint(slide, fwd ? 0.3 + r * 0.7 : edgeMax - r * (edgeMax - 1), r, (fwd ? 26 : -26) * (1 - r), i);
      } else {
        edgePaint(slide, edgeRest(i), 0, 0, i);
      }
      const live = i === edgeIdx;
      if (slide.classList.contains('is-live') !== live) {
        if (live) {
          /* Drop + reflow + re-add so .is-live chart CSS animations always restart */
          slide.classList.remove('is-live');
          void slide.offsetWidth;
          slide.classList.add('is-live');
        } else {
          slide.classList.remove('is-live');
        }
      }
    });

    if (edgeFixed) edgeFixed.style.opacity = '1';
  }

  /* ---------- decision-core sim (chapter 5) ---------- */
  const verdictEl = $('#verdict'), logEl = $('#corelog');
  if (verdictEl && logEl) {
    const checks = [['BTC/USDT', 'context aligned', 'qualified'], ['ETH/USDT', 'weak structure', 'rejected · verify'], ['BTC/USDT', 'protection check', 'risk gate clear'], ['SOL/USDT', 'isolated spike', 'no context · skip'], ['ETH/USDT', 'conditions thin', 'waiting is correct'], ['BTC/USDT', 'all gates green', 'order placed · managed']];
    let ci = 0;
    (function tickCore() {
      const c = checks[ci % checks.length], exec = (ci % 6) === 5;
      const ln = document.createElement('div'); ln.className = 'ln';
      ln.innerHTML = `<b>${c[0]}</b> · ${c[1]} · <span class="${exec ? 'ok' : 'wait'}">${exec ? 'EXECUTE' : c[2]}</span>`;
      logEl.appendChild(ln); while (logEl.children.length > 5) logEl.removeChild(logEl.firstChild);
      verdictEl.textContent = exec ? 'EXECUTE' : 'WAIT'; verdictEl.classList.toggle('exec', exec);
      if (window.__coreFlash) window.__coreFlash(exec);
      ci++; setTimeout(tickCore, exec ? 2600 : 1600);
    })();
  }

  /* ---------- light UI: hero carousel, chips, faq, community ---------- */
  (function ui() {
    // hero mini-carousel
    const ring = $('#ring');
    if (ring) {
      const cards = $$('.tcard', ring), dots = $$('.ring__dots .dot', ring); let active = 1;
      const layout = () => { const n = cards.length; cards.forEach((cd, i) => { const rel = (i - active + n) % n; cd.dataset.slot = rel === 0 ? 'center' : rel === n - 1 ? 'left' : 'right'; }); dots.forEach((d, i) => d.classList.toggle('is-on', i === active)); };
      const go = i => { active = (i + cards.length) % cards.length; layout(); };
      cards.forEach(cd => cd.addEventListener('click', () => { if (cd.dataset.slot === 'center') ring.classList.toggle('focus'); else { ring.classList.remove('focus'); go(cards.indexOf(cd)); } }));
      dots.forEach((d, i) => d.addEventListener('click', () => { ring.classList.remove('focus'); go(i); }));
      layout(); if (!reduced) setInterval(() => { if (!ring.classList.contains('focus')) go(active + 1); }, 4200);
    }
    // hero position cards: curved arc, centre slot rotates through
    const heroArc = $('#heroArc');
    if (heroArc) {
      const hcards = $$('.hero-card', heroArc);
      const n = hcards.length;
      let hActive = 1;
      const hLayout = () => hcards.forEach((cd, i) => {
        let rel = i - hActive;
        if (rel > n / 2) rel -= n;
        if (rel < -n / 2) rel += n;
        cd.dataset.slot = String(rel);
      });
      const hGo = i => { hActive = (i + n) % n; hLayout(); };
      hcards.forEach(cd => cd.addEventListener('click', () => hGo(hcards.indexOf(cd))));
      hLayout();
      if (!reduced) setInterval(() => hGo(hActive + 1), 4200);
    }
    // chips
    $$('.chips[data-single]').forEach(g => g.addEventListener('click', e => { const b = e.target.closest('.chip'); if (!b) return; $$('.chip', g).forEach(c => c.classList.remove('is-on')); b.classList.add('is-on'); }));
    // community unlock
    const form = $('#commForm'), board = $('#commBoard');
    form && form.addEventListener('submit', e => { e.preventDefault(); board.classList.add('unlocked'); });
    /* faq accordion (single open) — the markup is .faq-grid > details.faq-item;
       the old '.faq__list details' selector matched nothing, so every answer
       just stacked open. */
    const fq = $$('.faq-grid details');
    fq.forEach(d => d.addEventListener('toggle', () => {
      if (!d.open) return;
      fq.forEach(o => { if (o !== d && o.open) o.open = false; });
    }));
  })();

  /* ---------- inline trading journey (chapter 3) ----------
     Five category docks (no second pass). Each dock holds 1+ screenshots.
     Scroll advances one screenshot beat; same dock crossfades in-phone;
     dock highlight only moves when the category changes. */
  const JOURNEY_NOOP = {
    STOP_COUNT: 1,
    setStep() { },
  };

  function initInlineJourney(rootEl) {
    if (!rootEl) return JOURNEY_NOOP;
    const q = sel => rootEl.querySelector(sel);
    const qa = sel => [...rootEl.querySelectorAll(sel)];
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const rail = q('.jp-rail');
    const slots = qa('.jp-slot');
    if (!rail || !slots.length) return JOURNEY_NOOP;

    /* Category docks — screenshots are placeholders; flow is what matters */
    const DOCKS = [
      {
        label: 'Onboard',
        shots: [
          {
            kicker: '01 · Open',
            title: 'Open the app',
            body: 'Land in ByteBoom and see live market updates before you commit to anything.',
            mock: 'onboard.jpeg',
          },
          {
            kicker: '02 · Account',
            title: 'Login / Signup',
            body: 'Create an account or sign in — quick start, no exchange link yet.',
            mock: 'login.jpeg',
          },
          {
            kicker: '03 · Explore',
            title: 'Signals + demo',
            body: 'Preview free signals and watch a demo trading engine run on live prices.',
            mock: 'live singnals free.jpeg',
          },
        ],
      },
      {
        label: 'Wallet',
        shots: [
          {
            kicker: '04 · Wallet',
            title: 'Connect wallet',
            body: 'Pay in one step from your crypto wallet.',
            mock: 'connect wallet.jpeg',
          },
          {
            kicker: '05 · Pay',
            title: 'Approve & verify',
            body: 'Approve in your wallet — ByteBoom confirms the payment.',
            mock: 'connectwalet2.jpeg',
          },
        ],
      },
      {
        label: 'Subscribe',
        shots: [
          {
            kicker: '06 · Plan',
            title: 'Choose your plan',
            body: 'Pick the plan that fits, then unlock the full experience.',
            mock: 'chooseplan.jpeg',
          },
          {
            kicker: '07 · Pay',
            title: 'Pay now',
            body: 'Confirm your subscription payment to continue setup.',
            mock: 'paynow.jpeg',
          },
          {
            kicker: '08 · Approve',
            title: 'Confirm in wallet',
            body: 'Approve the payment in your wallet when prompted.',
            mock: 'confirmpayinwallet.jpeg',
          },
          {
            kicker: '09 · Verify',
            title: 'ByteBoom verifies',
            body: 'ByteBoom confirms your payment before unlocking access.',
            mock: 'byteboomverifiespayment.jpeg',
          },
          {
            kicker: '10 · Confirmed',
            title: 'Payment verified',
            body: 'You’re subscribed — next, link your exchange account and activate.',
            mock: 'paymentverifiestalset.jpeg',
          },
        ],
      },
      {
        label: 'Connect',
        shots: [
          {
            kicker: '11 · Link',
            title: 'Link exchange account',
            body: 'Connect so ByteBoom can trade for you — it still can’t take money out.',
            mock: 'setupapikeys.jpeg',
          },
          {
            kicker: '12 · Setup',
            title: 'Set permissions',
            body: 'Allow trading only — withdrawals stay off so your funds stay put.',
            mock: 'setupapikeys2.jpeg',
          },
          {
            kicker: '13 · Confirm',
            title: 'Connection ready',
            body: 'Confirm the link — your money stays in your exchange account.',
            mock: 'setupkeys4.jpeg',
          },
        ],
      },
      {
        label: 'Activate',
        shots: [
          {
            kicker: '14 · Activate',
            title: 'Start & follow',
            body: 'Run the trading engine and follow results — pause, unlink, or delete whenever you choose.',
            mock: 'contorlsbot.jpeg',
          },
        ],
      },
    ];

    const STEPS = [];
    DOCKS.forEach((dock, dockIdx) => {
      dock.shots.forEach((shot, shotIdx) => {
        STEPS.push({ ...shot, dock: dockIdx, shot: shotIdx });
      });
    });

    const STOP_COUNT = STEPS.length;
    const DOCK_COUNT = Math.min(slots.length, DOCKS.length);

    const mockDir = rootEl.dataset.mockDir || '/traidngjourney/images/';
    const mockSrc = file => mockDir + encodeURIComponent(file);
    STEPS.forEach(s => { if (s.mock) { const im = new Image(); im.src = mockSrc(s.mock); } });

    const legend = qa('.jp-legend li');

    let currentStep = -1;
    let liveDock = -1;

    const ensureShotLayers = slotEl => {
      const screen = slotEl.querySelector('.phone-screen');
      if (!screen) return [];
      let layers = [...screen.querySelectorAll('.jp-shot')];
      if (layers.length < 2) {
        const template = layers[0];
        const second = document.createElement('img');
        second.className = 'jp-shot';
        second.alt = '';
        second.width = template ? Number(template.getAttribute('width')) || 390 : 390;
        second.height = template ? Number(template.getAttribute('height')) || 844 : 844;
        second.decoding = 'async';
        if (template) screen.insertBefore(second, template.nextSibling);
        else screen.prepend(second);
        layers = [...screen.querySelectorAll('.jp-shot')];
      }
      return layers;
    };

    const paintSpeech = (slotEl, step) => {
      const kicker = slotEl.querySelector('.jp-kicker');
      const title = slotEl.querySelector('.jp-title');
      const body = slotEl.querySelector('.jp-body');
      const num = slotEl.querySelector('.jp-stop-num');
      if (kicker) kicker.textContent = step.kicker;
      if (title) title.textContent = step.title;
      if (body) body.textContent = step.body;
      if (num) num.textContent = String(step.dock + 1);
    };

    const setShotOnLayer = (img, step, beatNum) => {
      if (!img) return;
      if (step.mock) {
        const src = mockSrc(step.mock);
        if (img.getAttribute('src') !== src) img.setAttribute('src', src);
        img.alt = step.title + ' — ByteBoom app screen ' + beatNum;
        img.hidden = false;
      } else {
        img.removeAttribute('src');
        img.alt = '';
        img.hidden = true;
      }
    };

    /* Crossfade inside one phone: outgoing eases out, incoming eases in */
    const showShot = (slotEl, step, beatNum, animate) => {
      const layers = ensureShotLayers(slotEl);
      const fallback = slotEl.querySelector('.jp-mock-fallback');
      if (!layers.length) return;

      if (!step.mock) {
        layers.forEach(l => {
          l.classList.remove('is-on');
          l.hidden = true;
        });
        if (fallback) fallback.hidden = false;
        return;
      }
      if (fallback) fallback.hidden = true;

      const onIdx = layers.findIndex(l => l.classList.contains('is-on'));
      const cur = onIdx >= 0 ? layers[onIdx] : layers[0];
      const next = layers[(onIdx >= 0 ? onIdx ^ 1 : 1) % layers.length] || layers[0];
      const sameSrc = cur.getAttribute('src') === mockSrc(step.mock);

      if (!animate || sameSrc || onIdx < 0) {
        setShotOnLayer(cur, step, beatNum);
        layers.forEach(l => l.classList.toggle('is-on', l === cur));
        return;
      }

      setShotOnLayer(next, step, beatNum);
      void next.offsetWidth;
      cur.classList.remove('is-on');
      next.classList.add('is-on');
    };

    const shotIndexForDock = (dockIdx, stepIdx) => {
      const dock = DOCKS[dockIdx];
      if (!dock) return 0;
      if (dockIdx < STEPS[stepIdx].dock) return dock.shots.length - 1;
      if (dockIdx > STEPS[stepIdx].dock) return 0;
      return STEPS[stepIdx].shot;
    };

    const syncRail = (stepIdx, animateShot) => {
      rail.dataset.pass = '0';
      for (let d = 0; d < DOCK_COUNT; d++) {
        const slot = slots[d];
        const dock = DOCKS[d];
        if (!dock) continue;
        slot.classList.remove('is-empty');
        slot.dataset.dock = String(d);
        const shotIdx = shotIndexForDock(d, stepIdx);
        const step = { ...dock.shots[shotIdx], dock: d, shot: shotIdx };
        const beatNum = STEPS.findIndex(s => s.dock === d && s.shot === shotIdx) + 1;
        paintSpeech(slot, step);
        const isLive = d === STEPS[stepIdx].dock;
        showShot(slot, step, beatNum, animateShot && isLive);
      }
      for (let d = DOCK_COUNT; d < slots.length; d++) {
        slots[d].classList.add('is-empty');
        slots[d].classList.remove('is-live');
      }
    };

    const setLiveDock = dock => {
      slots.forEach((el, i) => {
        el.classList.toggle('is-live', i === dock && !el.classList.contains('is-empty'));
      });
    };

    /* Paint one beat. The scroll engine owns pacing, so this is pure output:
       no arming, no locks, no wheel state to fall out of sync with the page. */
    const goToStep = (idx, animate) => {
      idx = clamp(idx, 0, STOP_COUNT - 1);
      if (idx === currentStep && liveDock >= 0) return;
      const prevDock = liveDock;
      const dock = STEPS[idx].dock;
      currentStep = idx;
      liveDock = dock;

      legend.forEach((li, i) => {
        li.classList.toggle('is-active', i === dock);
        li.classList.toggle('is-done', i < dock);
      });

      if (!animate) {
        rail.classList.add('is-instant');
        syncRail(idx, false);
        setLiveDock(dock);
        void rail.offsetWidth;
        rail.classList.remove('is-instant');
        return;
      }

      rail.classList.remove('is-instant');
      syncRail(idx, dock === prevDock || prevDock < 0);
      setLiveDock(dock);
    };

    goToStep(0, false);

    return {
      STOP_COUNT,
      setStep(idx, animate) { goToStep(idx, animate !== false); },
    };
  }

  const journeyCtrl = initInlineJourney($('#bbj-inline'));

  /* ---------- simple one-at-a-time stacks (pricing plans, security items) ----------
     Each exposes its item count so the scroll engine can give every item its
     own stop; setting the index is the only thing scroll has to do. */
  function initStack(rootEl, sel) {
    const items = rootEl ? [...rootEl.querySelectorAll(sel)] : [];
    if (!items.length) return { count: 1, set() { } };
    let activeIdx = -1;
    const api = {
      count: items.length,
      set(idx) {
        idx = idx < 0 ? 0 : idx > items.length - 1 ? items.length - 1 : idx;
        if (idx === activeIdx) return;
        activeIdx = idx;
        items.forEach((el, i) => el.classList.toggle('is-active', i === idx));
      },
    };
    api.set(0);
    return api;
  }
  const pricingStack = initStack($('#pricing-inline'), '.pcard');
  const securityStack = initStack($('#security-inline'), '.sec-item');

  /* ===================================================================
     SCROLL ENGINE — one impulse, one stop

     Every chapter, and every card inside a chapter, is a STOP: a scroll
     position where something is fully composed on screen. Scroll input never
     moves the page directly — it only picks the next stop, and a time-based
     tween flies the camera there. That buys three things the old free-scroll
     + rescue-glide model could not:
       · the view can never park between two chapters
       · one flick always completes one whole move, at any refresh rate
       · there is no arm / hold / release / bypass state left to desync
  =================================================================== */
  let p = 0;                     // camera progress — the single source of truth
  let scrollMax = 1;

  /* p runs 0..1 across the runway. The classic-scroll tail (FAQ + footer) sits
     a screen below the runway's end, so it gets its own slice of p ABOVE 1.
     Without it, leaving About meant jumping to p=1 — the last, empty screen of
     the runway — which is the blank frame between About and the FAQ. Giving
     the tail real p means the hand-off runs through the same tween as every
     other transition: About fades while the FAQ slides up under it. */
  const tailEl = $('#scroll-tail');
  let pTail = 1;
  const measureScroll = () => {
    scrollMax = cineScrollMax();
    pTail = tailEl && tailEl.offsetTop > 0
      ? Math.max(1.0001, tailEl.offsetTop / scrollMax)
      : 1;
  };
  measureScroll();

  const clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v);
  const clampP = v => (v < 0 ? 0 : v > pTail ? pTail : v);
  /* how far into the About -> FAQ hand-off we are, 0..1 */
  const tailProgress = () => (pTail > 1 ? clamp01((p - 1) / (pTail - 1)) : (p >= 1 ? 1 : 0));
  const easeInOut = x => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(2 - 2 * x, 3) / 2);
  /* refresh-rate independent approach; tau in seconds */
  const smoothTo = (cur, tgt, tau, dt) => cur + (tgt - cur) * (1 - Math.exp(-dt / tau));

  /* A chapter's plateau is the stretch of its window where it is fully
     opaque — mirrors fadeWindow() and the edge chapter's custom hold. */
  const fadeSpan = c => (c.el.id === 'edgenode' ? 0.01 : Math.min((c.b - c.a) * 0.32, 0.03));
  const plateauOf = c => {
    const f = fadeSpan(c) + 0.006;
    return {
      A: c.a <= 0 ? 0 : Math.min(c.a + f, c.b),
      B: c.b >= 1 ? 1 : Math.max(c.b - f, c.a),
    };
  };

  /* Stops a chapter owns — one per card it scrolls through */
  const subCount = id =>
    id === 'journeynode' ? journeyCtrl.STOP_COUNT :
      id === 'pricingnode' ? pricingStack.count :
        id === 'securitynode' ? securityStack.count :
          id === 'edgenode' ? Math.max(1, edgeSlides.length) : 1;

  const STOPS = [];
  chapters.forEach(c => {
    const { A, B } = plateauOf(c);
    const k = subCount(c.el.id);
    for (let j = 0; j < k; j++) STOPS.push({ p: A + (B - A) * ((j + 0.5) / k), ch: c, sub: j });
  });
  STOPS.sort((a, b) => a.p - b.p);
  const LAST = Math.max(0, STOPS.length - 1);

  let stopIdx = 0;
  let edgeWant = 0;
  let tailReleased = false;
  const capturing = () => !tailReleased;

  const nearestStop = at => {
    let bi = 0, bd = Infinity;
    for (let i = 0; i < STOPS.length; i++) {
      const d = Math.abs(STOPS[i].p - at);
      if (d < bd) { bd = d; bi = i; }
    }
    return bi;
  };

  /* The page's scroll position is an OUTPUT of p, never an input. Always
     behavior:'auto' — a browser-animated write here would race the tween. */
  let selfWriteAt = -1e9;
  const writeScroll = () => {
    const want = Math.round(p * scrollMax);
    if (Math.abs(scrollY - want) > 1) {
      selfWriteAt = performance.now();
      scrollTo({ top: want, behavior: 'auto' });
    }
  };

  const enterTail = () => {
    if (tailReleased) return;
    tailReleased = true;
    tween = null;
    p = pTail;
    root.classList.add('tail-mode');
  };

  /* Cards are driven from the COMMITTED stop, not from live p, so a hand-off
     starts the instant you flick instead of halfway through the flight. */
  const paintStop = i => {
    const s = STOPS[i];
    if (!s) return;
    const id = s.ch.el.id;
    if (id === 'journeynode') journeyCtrl.setStep(s.sub, true);
    else if (id === 'pricingnode') pricingStack.set(s.sub);
    else if (id === 'securitynode') securityStack.set(s.sub);
    else if (id === 'edgenode') edgeWant = s.sub;
  };

  /* ---- the flight ---- */
  /* Pacing. A short hop inside a chapter (card to card) rides near TWEEN_MIN;
     a full chapter-to-chapter flight lands near TWEEN_MAX. */
  const TWEEN_MIN = 640, TWEEN_MAX = 1550, TWEEN_PER_P = 5400;
  let tween = null;                 // { from, to, t0, dur, thenRelease }
  /* set while absorbing a native fling on the way out of the tail — see leaveTail */
  let recapturing = false, recaptureY = 0, recaptureQuiet = 0, recaptureUntil = 0;
  let scrubUntil = 0, scrubTo = 0;  // user is dragging the scrollbar

  const flyTo = (to, opts) => {
    const o = opts || {};
    scrubUntil = 0;
    if (o.instant || reduced) {
      tween = null;
      p = clampP(to);
      if (o.thenRelease) enterTail(); else writeScroll();
      return;
    }
    const d = Math.abs(to - p);
    tween = {
      from: p,
      to: clampP(to),
      t0: performance.now(),
      dur: Math.max(TWEEN_MIN, Math.min(TWEEN_MAX, TWEEN_MIN + d * TWEEN_PER_P)),
      thenRelease: !!o.thenRelease,
    };
  };

  /* An explicit jump — nav link, skip button, Home/End — always wins, which
     means it has to take the page back from whatever currently owns it. */
  const goToStop = (i, opts) => {
    if (!STOPS.length) return;
    recapturing = false;
    if (tailReleased) {
      tailReleased = false;
      root.classList.remove('tail-mode');
    }
    stopIdx = i < 0 ? 0 : i > LAST ? LAST : i;
    paintStop(stopIdx);
    flyTo(STOPS[stopIdx].p, opts);
  };

  /* ---- coming back out of the tail ----
     The tail scrolls natively, so leaving it upward means a fling is usually
     still in flight — and a fling's wheel events are non-cancelable, so
     preventDefault cannot stop it. Writing scrollY into that is a fight the
     engine cannot win: every frame it yanks the page back up while the
     compositor pulls it down, which is the judder at this boundary.
     So while the fling decays we drive the camera ONLY and never touch
     scrollY. Nothing on screen is anchored to scroll position — the chapters
     are fixed and driven by p — so the single correction once it settles is
     invisible. Destination is always About: you came back from the tail, so
     you arrive at the last chapter rather than wherever the fling ran out. */
  const leaveTail = () => {
    if (!tailReleased) return;
    tailReleased = false;
    root.classList.remove('tail-mode');
    scrubUntil = 0;
    stopIdx = LAST;
    paintStop(LAST);
    flyTo(STOPS[LAST].p);
    recapturing = true;
    recaptureY = scrollY;
    recaptureQuiet = 0;
    recaptureUntil = performance.now() + 2200;
  };

  /* ---------- in-page links ----------
     Chapters are position:fixed, so a plain #hash has nothing to scroll to.
     Translate the target's scroll window into a runway offset instead; the
     camera lerp turns the jump into a flight. Flat mode stacks the chapters
     normally, so there the browser's own anchor handling is correct. */
  if (CINE) {
    const jumpTo = id => {
      if (id === 'faqnode' || id === 'footer') {
        const tailTop = pTail * scrollMax;
        enterTail();
        const top = id === 'footer' ? $('#footer')?.offsetTop ?? tailTop : tailTop;
        scrollTo({ top, behavior: 'smooth' });
        return true;
      }
      const i = STOPS.findIndex(s => s.ch.el.id === id);
      if (i < 0) return false;
      goToStop(i);          // takes the page back from the tail on its own
      return true;
    };
    addEventListener('click', e => {
      const link = e.target.closest('a[href^="#"]');
      if (!link || !link.hash || link.hash === '#') return;
      if (jumpTo(link.hash.slice(1))) {
        e.preventDefault();
        history.replaceState(null, '', link.hash);
      }
    });
    if (location.hash.length > 1) requestAnimationFrame(() => jumpTo(location.hash.slice(1)));
  }

  if (!CINE) {
    // flat fallback: every chapter is a normal stacked block, no engine
    chapters.forEach(c => {
      c.el.style.opacity = 1;
      c.el.classList.add('live');
      c.el.style.pointerEvents = 'auto';
      if (c.panel) { c.panel.style.transform = 'none'; c.panel.style.filter = 'none'; }
    });
    journeyCtrl.setStep(0, false);
    pricingStack.set(0);
    securityStack.set(0);
    if (depthBar) {
      addEventListener('scroll', () => {
        const max = Math.max(document.body.scrollHeight - innerHeight, 1);
        depthBar.style.width = clamp01(scrollY / max) * 100 + '%';
      }, { passive: true });
    }
    return;
  }

  /* ---------- input: one gesture = one stop ----------
     Nothing here touches scrollY. Input only nominates a stop; the tween in
     stepScroll() owns every pixel of movement, so there is exactly one thing
     animating the page at any moment. */
  let lockUntil = 0;

  const releaseToTail = now => {
    if (tailReleased) return;
    flyTo(pTail, { thenRelease: true });
    lockUntil = now + (tween ? tween.dur : 560);
  };

  /* Input that lands mid-flight is dropped, not queued. Queueing it looked
     helpful but a single trackpad flick fires ~15 events on the way up to its
     peak, so the queue always held one and every flick advanced two stops.
     Dropping keeps the contract exact: one gesture moves you one stop, and a
     sustained drag keeps its own events coming, so it still advances steadily
     as soon as the lock clears. */
  const impulse = dir => {
    const now = performance.now();
    /* Inertia left over from the tail is not a new instruction */
    if (recapturing) return;
    if (now < lockUntil) return;
    if (dir > 0 && stopIdx >= LAST) { releaseToTail(now); return; }
    if (dir < 0 && stopIdx <= 0) { goToStop(0); return; }
    goToStop(stopIdx + dir);
    lockUntil = now + (tween ? tween.dur * 0.68 : 260);
  };

  /* Trackpad inertia keeps firing wheel events for up to a second after the
     fingers lift. Those decaying tails must not read as fresh flicks, or one
     swipe would run through three chapters. Inertia decays monotonically, so
     treat a run that has fallen well under the gesture's peak as coasting —
     with hysteresis, since a real drag's magnitude wobbles and must recover. */
  let wheelAt = 0, wheelPeak = 0, coasting = false;
  addEventListener('wheel', e => {
    if (!capturing()) return;
    e.preventDefault();
    const mag = Math.abs(e.deltaY);
    if (mag < 1) return;
    const now = performance.now();
    if (now - wheelAt > 140) { wheelPeak = 0; coasting = false; }   // new gesture
    wheelAt = now;
    if (mag >= wheelPeak) wheelPeak = mag;
    if (coasting) {
      if (mag <= wheelPeak * 0.6) return;
      coasting = false;
    } else if (mag < wheelPeak * 0.45) {
      coasting = true;
      return;
    }
    impulse(e.deltaY > 0 ? 1 : -1);
  }, { passive: false });

  let touchY = 0, touchLive = false, touchFired = false;
  addEventListener('touchstart', e => {
    if (!capturing() || !e.touches.length) return;
    touchY = e.touches[0].clientY;
    touchLive = true;
    touchFired = false;
  }, { passive: true });
  addEventListener('touchmove', e => {
    if (!capturing() || !touchLive || !e.touches.length) return;
    e.preventDefault();
    if (touchFired) return;
    const dy = touchY - e.touches[0].clientY;
    if (Math.abs(dy) > 24) { impulse(dy > 0 ? 1 : -1); touchFired = true; }
  }, { passive: false });
  addEventListener('touchend', () => { touchLive = false; }, { passive: true });

  addEventListener('keydown', e => {
    if (!capturing() || e.metaKey || e.ctrlKey || e.altKey) return;
    const tag = e.target && e.target.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
    switch (e.key) {
      case 'ArrowDown': case 'PageDown': case ' ': e.preventDefault(); impulse(1); break;
      case 'ArrowUp': case 'PageUp': e.preventDefault(); impulse(-1); break;
      case 'Home': e.preventDefault(); goToStop(0); break;
      case 'End': e.preventDefault(); goToStop(LAST); break;
      default: break;
    }
  });

  /* Scroll events are only ever a report, never a command. Either the engine
     wrote that position (ignore it) or something native did — scrollbar drag,
     find-in-page, an anchor — in which case follow it live and snap to the
     nearest stop once it settles. */
  addEventListener('scroll', () => {
    const y = scrollY;
    const tailTop = pTail * scrollMax;
    if (tailReleased) {
      if (y < tailTop - 2) leaveTail();
      return;
    }
    /* A fling out of the tail keeps firing these; stepScroll is absorbing it. */
    if (recapturing) return;
    /* Scroll events arrive a frame or two after the write that caused them, by
       which time p has moved on — so position alone cannot tell our own writes
       from the user's. Mid-flight the engine owns the page outright, and just
       after a correction we allow a short settling window. */
    if (tween) return;
    if (y > tailTop - 2) { enterTail(); return; }
    if (performance.now() - selfWriteAt < 120) return;
    if (Math.abs(y - Math.round(p * scrollMax)) <= 2) return;
    scrubTo = clamp01(y / scrollMax);
    scrubUntil = performance.now() + 180;
  }, { passive: true });

  const skipBackBtn = $('#journeySkipBack');
  const skipFwdBtn = $('#journeySkipForward');
  const firstStopOf = id => STOPS.findIndex(s => s.ch.el.id === id);
  const lastStopOf = id => {
    let at = -1;
    STOPS.forEach((s, i) => { if (s.ch.el.id === id) at = i; });
    return at;
  };
  if (skipBackBtn) skipBackBtn.addEventListener('click', () => {
    const i = lastStopOf('productnode');
    if (i >= 0) goToStop(i);
  });
  if (skipFwdBtn) skipFwdBtn.addEventListener('click', () => {
    const i = firstStopOf('pricingnode');
    if (i >= 0) goToStop(i);
  });

  /* ---- per-frame integration, called once from tick() ---- */
  function stepScroll(now, dt) {
    if (recapturing) {
      /* Camera returns to About on its own clock; scrollY is left to the
         fling until it dies, then corrected once. */
      if (tween) {
        const q = Math.min(1, (now - tween.t0) / tween.dur);
        p = tween.from + (tween.to - tween.from) * easeInOut(q);
        if (q >= 1) { p = tween.to; tween = null; }
      }
      const moving = Math.abs(scrollY - recaptureY) > 1.5;
      recaptureY = scrollY;
      recaptureQuiet = moving ? 0 : recaptureQuiet + 1;
      if ((!tween && recaptureQuiet >= 3) || now > recaptureUntil) {
        recapturing = false;
        tween = null;
        p = STOPS[LAST].p;
        stopIdx = LAST;
        writeScroll();
      }
      return;
    }

    if (tween) {
      const q = Math.min(1, (now - tween.t0) / tween.dur);
      p = tween.from + (tween.to - tween.from) * easeInOut(q);
      if (q >= 1) {
        p = tween.to;
        const rel = tween.thenRelease;
        tween = null;
        if (rel) { enterTail(); return; }
      }
      writeScroll();
      return;
    }

    if (scrubUntil) {
      if (now < scrubUntil) { p = smoothTo(p, scrubTo, 0.06, dt); return; }
      scrubUntil = 0;
      goToStop(nearestStop(p));
      return;
    }

    if (capturing()) writeScroll();
  }

  /* Honour a restored scroll position, but land it on a real stop — unless the
     browser restored us inside the tail, where native scrolling already rules. */
  if (scrollY > pTail * scrollMax - 2) enterTail();
  else goToStop(nearestStop(clamp01(scrollY / Math.max(scrollMax, 1))), { instant: true });

  /* =================================================================
     WORLD
  ================================================================= */
  const CYAN = 0x17d6ee, BLUE = 0x22a8ff, VIOLET = 0x7d5cff, HOT = 0xd8f6ff;
  const COLS = [CYAN, VIOLET, BLUE, CYAN, VIOLET, BLUE, CYAN, VIOLET, HOT];
  const stage = $('#stage');
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2)); renderer.setSize(innerWidth, innerHeight); renderer.setClearColor(0x000000, 0);
  stage.appendChild(renderer.domElement);
  const scene = new THREE.Scene(); scene.fog = new THREE.FogExp2(0x05080f, 0.012);
  const cam = new THREE.PerspectiveCamera(64, innerWidth / innerHeight, 0.1, 900);
  scene.add(new THREE.AmbientLight(0x6f8bb0, 0.6));
  const key = new THREE.DirectionalLight(0xbfe6ff, 0.55); key.position.set(6, 12, 8); scene.add(key);
  const camLight = new THREE.PointLight(CYAN, 1.1, 46); scene.add(camLight);

  function glowTex() { const cv = document.createElement('canvas'); cv.width = cv.height = 128; const g = cv.getContext('2d'); const gr = g.createRadialGradient(64, 64, 0, 64, 64, 64); gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.25, 'rgba(255,255,255,.5)'); gr.addColorStop(1, 'rgba(255,255,255,0)'); g.fillStyle = gr; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(cv); }
  const GLOW = glowTex();
  const glow = (color, size, op) => { const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: GLOW, color, transparent: true, opacity: op || .9, blending: THREE.AdditiveBlending, depthWrite: false })); s.scale.setScalar(size); return s; };
  function envFace(t, m, b) { const cv = document.createElement('canvas'); cv.width = cv.height = 64; const g = cv.getContext('2d'); const gr = g.createLinearGradient(0, 0, 0, 64); gr.addColorStop(0, t); gr.addColorStop(.55, m); gr.addColorStop(1, b); g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return cv; }
  const ENV = new THREE.CubeTexture([envFace('#0e2740', '#0a1626', '#05080f'), envFace('#0c2238', '#0a1626', '#05080f'), envFace('#16405f', '#0e2a44', '#0a1626'), envFace('#05080f', '#04060c', '#020409'), envFace('#0e2740', '#0a1a2e', '#05080f'), envFace('#122a44', '#0c1c30', '#05080f')]); ENV.needsUpdate = true;
  const metal = (color, rough, em, ei) => new THREE.MeshStandardMaterial({ color, metalness: .95, roughness: rough, envMap: ENV, envMapIntensity: 1.2, emissive: em || 0, emissiveIntensity: ei || 0 });

  /* floor grid follows the route region */
  const g1 = new THREE.GridHelper(900, 180, 0x1c5f78, 0x123043); g1.material.transparent = true; g1.material.opacity = .42; g1.position.set(0, -6, -180); scene.add(g1);

  /* ---- WINDING ROUTE: straight legs + REAL 90° corners ----
     Manhattan snake: forward, hard right, forward, hard left, ...
     One straight leg per node (10 legs with Edge chapter). */
  const V = [
    [0, 1.6, 12], [0, 1.6, -34],      // L0 forward   (node 0)
    [46, 1.7, -34],                    // corner → +x
    [46, 1.9, -80],                    // L2 forward   (node 2)  [L1 is the +x leg = node 1]
    [-46, 2.1, -80],                   // corner → -x  (long crossing leg = node 3)
    [-46, 2.3, -126],                  // L4 forward   (node 4)
    [42, 2.5, -126],                   // +x leg       (node 5)
    [42, 2.7, -172],                   // L6 forward   (node 6)
    [-8, 3.0, -172],                   // -x leg       (node 7)
    [-8, 3.2, -216],                   // L8 forward   (node 8)
    [40, 3.4, -216],                   // corner → +x
    [40, 3.6, -262],                   // L10 forward  (node 9) → arrival
  ].map(a => new THREE.Vector3(a[0], a[1], a[2]));
  const R = 7;                                          // corner radius
  function buildPath(verts, r) {
    const cp = new THREE.CurvePath(); const n = verts.length; const dir = [];
    for (let i = 0; i < n - 1; i++) dir.push(verts[i + 1].clone().sub(verts[i]).normalize());
    for (let i = 0; i < n - 1; i++) {
      const A = verts[i], B = verts[i + 1], d = dir[i];
      const s = (i === 0) ? A.clone() : A.clone().addScaledVector(d, r);
      const e = (i === n - 2) ? B.clone() : B.clone().addScaledVector(d, -r);
      cp.add(new THREE.LineCurve3(s, e));
      if (i < n - 2) cp.add(new THREE.QuadraticBezierCurve3(B.clone().addScaledVector(d, -r), B.clone(), B.clone().addScaledVector(dir[i + 1], r)));
    }
    return cp;
  }
  const path = buildPath(V, R);
  const totalLen = path.getLength();
  const curveLens = path.getCurveLengths();            // cumulative
  const N = chapters.length;                            // 9 straight legs = 9 nodes
  const nodeU = [];                                     // arc-length fraction at each leg midpoint
  for (let i = 0; i < N; i++) {
    const idx = 2 * i, before = idx > 0 ? curveLens[idx - 1] : 0, legLen = path.curves[idx].getLength();
    nodeU.push((before + legLen * 0.5) / totalLen);
  }
  // scroll p -> arc-length u: dwell (slow) at each node, quick sweep through the corner between
  function routeU(pp) {
    const c = Math.max(0, Math.min(0.999999, pp)) * (N - 1);
    let i = Math.floor(c); if (i > N - 2) i = N - 2;
    let t = c - i; t = t * t * (3 - 2 * t);
    return nodeU[i] + (nodeU[i + 1] - nodeU[i]) * t;
  }

  /* ---- node structures: gate you fly through + crystal AHEAD in view ---- */
  const nodeGroups = [];
  const nodeDecor = [];
  nodeU.forEach((u, i) => {
    const pos = path.getPointAt(u);
    const tan = path.getTangentAt(u);
    const aheadU = Math.min(u + 0.02, 0.999);
    const cpos = path.getPointAt(aheadU);              // a little down the leg = straight ahead in view
    const rightv = new THREE.Vector3(-tan.z, 0, tan.x).normalize();
    const col = COLS[i % COLS.length];
    // gate ring at the node point — camera flies through it on the way out
    const g = new THREE.Group(); g.position.copy(pos);
    // framed mockup nodes: slide gate aside so it doesn't cut the centered PNG
    if (i === 1) g.position.addScaledVector(rightv, 9.5);   // trust → gate right
    if (i === 2) g.position.addScaledVector(rightv, -9.5);  // bots → gate left
    scene.add(g);
    const facing = pos.clone().add(tan);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(6.2, 0.09, 16, 100), metal(0x0b1626, .2, col, .5));
    ring.lookAt(facing); g.add(ring);
    const halo = new THREE.Mesh(new THREE.RingGeometry(6.0, 6.5, 100), new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: .06, side: THREE.DoubleSide }));
    halo.lookAt(facing); g.add(halo);
    // crystal core: ahead + nudged to the side opposite the content panel so both read
    const dir = (chapters[i] && chapters[i].dir) || 'up';
    const side = dir === 'left' ? 1 : dir === 'right' ? -1 : 0;   // panel left -> crystal right
    // trust (1) + bots (2): push diamond further aside so mockup owns center
    const sideDist = (i === 1 || i === 2) ? 12.5 : 3.4;
    const core = new THREE.Group();
    core.position.copy(cpos).addScaledVector(rightv, side * sideDist); core.position.y += 2.0;
    scene.add(core); nodeGroups.push(core);
    const crys = new THREE.Mesh(new THREE.OctahedronGeometry(1.2, 0), metal(0x0b1626, .1, col, .85)); core.add(crys);
    const cage = new THREE.Mesh(new THREE.TorusKnotGeometry(1.8, 0.05, 120, 8, 2, 3), metal(0xbfe6ff, .1, col, .5)); core.add(cage);
    core.add(glow(col, 5.5, .45));
    const pl = new THREE.PointLight(col, .9, 30);
    pl.position.copy(cpos).addScaledVector(rightv, side * ((i === 1 || i === 2) ? sideDist : 0));
    pl.position.y += 3; scene.add(pl);
    // Only the bots node keeps decorations — the hero, trust and every content
    // chapter stay clean (no gate rings, crystals or glow).
    const hideAlways = i !== 2;
    if (hideAlways) {
      g.visible = false;
      core.visible = false;
      pl.visible = false;
    }
    nodeDecor.push({ g, core, pl, hideAlways });
    core.userData = { crys, cage, baseY: core.position.y };
    if (i === 5) window.__coreFlash = (exec) => { crys.material.emissive.setHex(exec ? CYAN : VIOLET); crys.material.emissiveIntensity = exec ? 2.4 : .85; };
  });

  /* Floor route line + dash dots removed — camera still follows the invisible path. */

  /* ---- motes: crypto marks ----
     A bare PointsMaterial draws each point as a flat square, which is what the
     background specks used to be. They now carry one of seven crypto glyphs
     instead — BTC, ETH, SOL, XRP, BNB, ADA, DOGE — drawn as vector paths into
     128px canvases (no webfont, so nothing to load and nothing to miss) and
     baked to textures once, shared by every mote layer. Point sizes are
     unchanged; a glyph covers less of its quad than a solid square did, so
     opacity is raised to keep the field at its old brightness. */
  const GLYPHS = [
    /* BTC — the ₿: stem, two bowls, four ticks */
    c => {
      c.lineWidth = 12;
      c.beginPath();
      c.moveTo(42, 6); c.lineTo(42, 22);
      c.moveTo(60, 6); c.lineTo(60, 22);
      c.moveTo(42, 78); c.lineTo(42, 94);
      c.moveTo(60, 78); c.lineTo(60, 94);
      c.moveTo(34, 18); c.lineTo(34, 82);
      c.stroke();
      c.beginPath();
      c.moveTo(34, 18); c.lineTo(58, 18);
      c.bezierCurveTo(76, 18, 76, 44, 58, 44);
      c.lineTo(34, 44);
      c.stroke();
      c.beginPath();
      c.moveTo(34, 50); c.lineTo(62, 50);
      c.bezierCurveTo(82, 50, 82, 82, 62, 82);
      c.lineTo(34, 82);
      c.stroke();
    },
    /* ETH — the faceted diamond; alpha splits read as the two shaded faces */
    c => {
      c.beginPath(); c.moveTo(50, 4); c.lineTo(18, 52); c.lineTo(50, 70); c.fill();
      c.globalAlpha = .55;
      c.beginPath(); c.moveTo(50, 4); c.lineTo(82, 52); c.lineTo(50, 70); c.fill();
      c.globalAlpha = .92;
      c.beginPath(); c.moveTo(18, 60); c.lineTo(50, 78); c.lineTo(50, 96); c.fill();
      c.globalAlpha = .5;
      c.beginPath(); c.moveTo(82, 60); c.lineTo(50, 78); c.lineTo(50, 96); c.fill();
      c.globalAlpha = 1;
    },
    /* SOL — three skewed bars, middle one counter-slanted */
    c => {
      c.beginPath(); c.moveTo(24, 14); c.lineTo(92, 14); c.lineTo(76, 32); c.lineTo(8, 32); c.fill();
      c.beginPath(); c.moveTo(8, 41); c.lineTo(76, 41); c.lineTo(92, 59); c.lineTo(24, 59); c.fill();
      c.beginPath(); c.moveTo(24, 68); c.lineTo(92, 68); c.lineTo(76, 86); c.lineTo(8, 86); c.fill();
    },
    /* XRP — two curved sweeps meeting at the waist */
    c => {
      c.lineWidth = 12;
      c.beginPath();
      c.moveTo(12, 14); c.bezierCurveTo(30, 14, 34, 50, 50, 50); c.bezierCurveTo(66, 50, 70, 14, 88, 14);
      c.moveTo(12, 86); c.bezierCurveTo(30, 86, 34, 50, 50, 50); c.bezierCurveTo(66, 50, 70, 86, 88, 86);
      c.stroke();
    },
    /* BNB — four satellite diamonds around a larger centre */
    c => {
      const dia = (x, y, r) => { c.beginPath(); c.moveTo(x, y - r); c.lineTo(x + r, y); c.lineTo(x, y + r); c.lineTo(x - r, y); c.fill(); };
      dia(50, 14, 13); dia(14, 50, 13); dia(86, 50, 13); dia(50, 86, 13); dia(50, 50, 18);
    },
    /* ADA — the Cardano dot constellation */
    c => {
      const dot = (x, y, r) => { c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); };
      dot(50, 50, 8);
      c.globalAlpha = .9;
      for (let i = 0; i < 6; i++) { const t = i / 6 * Math.PI * 2; dot(50 + Math.cos(t) * 24, 50 + Math.sin(t) * 24, 6); }
      c.globalAlpha = .62;
      for (let i = 0; i < 12; i++) { const t = i / 12 * Math.PI * 2 + .26; dot(50 + Math.cos(t) * 42, 50 + Math.sin(t) * 42, 4.2); }
      c.globalAlpha = 1;
    },
    /* DOGE — the Ð: bowl plus crossed stem */
    c => {
      c.lineWidth = 12;
      c.beginPath();
      c.moveTo(38, 16); c.lineTo(38, 84);
      c.moveTo(38, 16); c.lineTo(52, 16);
      c.bezierCurveTo(84, 16, 84, 84, 52, 84);
      c.lineTo(38, 84);
      c.moveTo(15, 50); c.lineTo(50, 50);
      c.stroke();
    },
  ];
  const MAXANISO = renderer.capabilities.getMaxAnisotropy();
  const SYMTEX = GLYPHS.map(draw => {
    const S = 128, cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const c = cv.getContext('2d');
    c.scale(S / 100, S / 100);
    c.fillStyle = '#fff'; c.strokeStyle = '#fff';
    c.lineJoin = 'round'; c.lineCap = 'round';
    draw(c);
    const tex = new THREE.CanvasTexture(cv);
    tex.anisotropy = Math.min(4, MAXANISO);
    return tex;
  });
  /* Round star dot for the dense field. Solid core + soft falloff, so it keeps
     most of a square's coverage (and therefore its brightness) while never
     reading as a cube on the ones that pass close to the camera. */
  const DOTTEX = (() => {
    const S = 32, cv = document.createElement('canvas');
    cv.width = cv.height = S;
    const c = cv.getContext('2d');
    const gr = c.createRadialGradient(16, 16, 0, 16, 16, 16);
    gr.addColorStop(0, '#fff'); gr.addColorStop(.55, '#fff');
    gr.addColorStop(.78, 'rgba(255,255,255,.45)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    c.fillStyle = gr; c.fillRect(0, 0, S, S);
    return new THREE.CanvasTexture(cv);
  })();
  /* A fixed-size box of points reads as a clump down the middle of the screen:
     everything deep in Z projects toward the vanishing point, leaving the
     margins bare and the corners empty.
     `fx`/`fy` open the scatter up per unit of depth so the volume roughly
     tracks the camera frustum instead of being a box. At this fov (62°) and a
     wide viewport the frustum grows about 1.1 units per unit of depth
     horizontally and 0.6 vertically, so an fx near 2.2 / fy near 1.2 (full
     extents, hence double) fills the frame edge to edge — including the top
     and bottom corners, which a narrow vertical fan leaves empty. */
  function scatter(n, fx, fy) {
    const a = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const z = 12 - Math.random() * 240;
      const d = 14 - z;
      a[i * 3] = (Math.random() - .5) * (24 + d * fx);
      a[i * 3 + 1] = 7 + (Math.random() - .5) * (20 + d * fy);
      a[i * 3 + 2] = z;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(a, 3));
    return geo;
  }
  /* Dense star field: world-sized, so it attenuates with distance like before. */
  function motes(count, color, size, op) {
    const pts = new THREE.Points(scatter(count, 1.8, 1.0), new THREE.PointsMaterial({ color, size, map: DOTTEX, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false }));
    scene.add(pts);
    return pts;
  }
  const m1 = motes(820, 0x9fd8ff, .16, .85), m2 = motes(360, VIOLET, .2, .5);

  /* ---- crypto marks: a field that tiles around the camera ----
     Any fixed volume of points fails here. The route runs from z:+12 out to
     z:-262 and turns four 90° corners, so on the +x legs the camera is looking
     sideways out of the box entirely: density drops off as you scroll and dies
     past the last leg. Corners of the frame are the same problem seen from the
     other end — a box that is not the shape of the frustum leaves them bare.

     So the symbols are scattered uniformly through one cube of half-extent
     SYMB, and the vertex shader repeats that cube infinitely around whichever
     point the camera has reached:

         p = home + 2·SYMB · round((camera − home) / 2·SYMB)

     A point holds still in world space (so it parallaxes normally) until the
     camera passes the halfway mark, then jumps one cube over. Uniform density
     in a cube around the camera is uniform density per unit of solid angle,
     which is exactly "same quantity everywhere, edges and corners included,
     no clumping" — and it holds for every leg of the route, at any heading.

     The jump is hidden by the distance fade: uFar (78) is inside SYMB (80), so
     a point is already invisible by the time it wraps. Fixed pixel size — a
     world-sized sprite 200 units out collapses to one pixel and no glyph
     survives that — with depth still reading through the three size tiers, the
     opacity split, the fade and the depth test against scene geometry. */
  const SYMB = 80;
  const FIELDS = [];
  const SYM_VERT = `
    uniform vec3 uCam, uDrift;
    uniform float uB, uSize, uPR, uNear, uFade, uFar;
    varying float vA;
    void main() {
      vec3 home = position + uDrift;
      vec3 p = home + 2.0 * uB * floor((uCam - home) / (2.0 * uB) + 0.5);
      vec4 mv = viewMatrix * vec4(p, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = uSize * uPR;
      float d = length(mv.xyz);
      vA = smoothstep(uFar, uFade, d) * smoothstep(uNear * 0.25, uNear, d);
    }`;
  const SYM_FRAG = `
    uniform sampler2D uMap;
    uniform vec3 uColor;
    uniform float uOpacity;
    varying float vA;
    void main() {
      float m = texture2D(uMap, vec2(gl_PointCoord.x, 1.0 - gl_PointCoord.y)).a;
      float a = m * uOpacity * vA;
      if (a < 0.003) discard;
      gl_FragColor = vec4(uColor, a);
    }`;
  function symbols(perGlyph, px, op, color, driftSpeed) {
    const grp = new THREE.Group();
    SYMTEX.forEach(map => {
      const a = new Float32Array(perGlyph * 3);
      for (let i = 0; i < perGlyph * 3; i++) a[i] = (Math.random() - .5) * 2 * SYMB;
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(a, 3));
      const mat = new THREE.ShaderMaterial({
        uniforms: {
          uMap: { value: map }, uColor: { value: new THREE.Color(color) },
          uOpacity: { value: op }, uSize: { value: px },
          uPR: { value: renderer.getPixelRatio() },
          uCam: { value: new THREE.Vector3() }, uDrift: { value: new THREE.Vector3() },
          uB: { value: SYMB }, uNear: { value: 7 }, uFade: { value: 62 }, uFar: { value: 78 },
        },
        vertexShader: SYM_VERT, fragmentShader: SYM_FRAG,
        transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const pts = new THREE.Points(geo, mat);
      /* the shader moves points away from their buffer positions, so three's
         bounding-sphere cull would throw the whole layer away at the corners */
      pts.frustumCulled = false;
      grp.add(pts);
      FIELDS.push({ mat, ds: driftSpeed });
    });
    scene.add(grp);
    return grp;
  }
  /* Three tiers: only a handful stay at the big readable size as accents, the
     rest step down so the field reads as texture, not as a wall of logos.
     ~203 total (29 per glyph). Counts read high next to a forward-cone scatter
     because these fill a whole cube — only about a fourteenth of it falls
     inside the frustum and the fade radius — so this lands near 15 symbols on
     screen, and unlike a fixed volume it stays there for the entire scroll. */
  const s1 = symbols(4, 24, .58, 0xcdeaff, .28),
        s2 = symbols(9, 15, .44, 0xa9d4ff, .22),
        s3 = symbols(16, 10, .32, 0x8fb6ff, .19);

  /* ---- world-coupled parallax ----
     The same smoothed mouse numbers steer the camera AND translate the DOM
     chapters in screen space, so content moves WITH the world every frame
     instead of sitting frozen on top of it. */
  let mx = 0, my = 0, smx = 0, smy = 0;
  if (matchMedia('(pointer:fine)').matches) {
    addEventListener('pointermove', e => {
      mx = (e.clientX / innerWidth - 0.5) * 2;
      my = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
  }
  const rightDir = new THREE.Vector3();

  /* ---- foreground dust ----
     A sparse bokeh layer that drifts IN FRONT of the content with stronger
     parallax. Occlusion is the cue that made the canvas structures feel
     embedded — now the panels get the same treatment. */
  const dust = document.createElement('canvas');
  dust.id = 'fgdust';
  document.body.appendChild(dust);
  const dctx = dust.getContext('2d');
  let DW = 0, DH = 0;
  const sizeDust = () => { DW = dust.width = innerWidth; DH = dust.height = innerHeight; };
  sizeDust(); addEventListener('resize', sizeDust);
  const dustSprite = rgb => {
    const cv = document.createElement('canvas'); cv.width = cv.height = 64;
    const g = cv.getContext('2d');
    const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, `rgba(${rgb},.9)`); gr.addColorStop(.4, `rgba(${rgb},.28)`); gr.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
    return cv;
  };
  const DSPR = [dustSprite('165,225,255'), dustSprite('150,125,255'), dustSprite('220,245,255')];
  const DUST = [];
  const dustCount = innerWidth < 720 ? 6 : 13;
  for (let i = 0; i < dustCount; i++) {
    DUST.push({
      x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      zf: 1.25 + Math.random() * 1.15,          // deeper than content -> moves more
      r: 1.6 + Math.random() * 3.6,
      vx: (Math.random() - .5) * .12, vy: -.05 - Math.random() * .14,
      ph: Math.random() * Math.PI * 2,
      sp: DSPR[i % 3],
    });
  }
  let lastWX = 0, lastWY = 0, lastPd = 0;

  /* ---- adaptive quality: keep the flight smooth on slower machines ----
     If the average frame time stays above ~24ms (≈42fps) for 2s, step the
     render resolution and particle load down. Two tiers; never steps back
     up mid-session so quality doesn't visibly pump. */
  let qTier = 2, qAcc = 0, qN = 0, qLastCheck = performance.now(), qPrevT = 0;
  function adaptQuality(now, t) {
    const dt = Math.min((t - qPrevT) * 1000, 100);
    qPrevT = t;
    if (dt > 0) { qAcc += dt; qN++; }
    if (now - qLastCheck < 2000) return;
    const avg = qAcc / Math.max(qN, 1);
    qAcc = 0; qN = 0; qLastCheck = now;
    if (avg > 24 && qTier > 0) {
      qTier--;
      if (qTier === 1) {
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.25));
        DUST.length = Math.min(DUST.length, 8);
        s3.visible = false;
      } else {
        renderer.setPixelRatio(1);
        m2.visible = false;
        s2.visible = false; s3.visible = false;
        DUST.length = Math.min(DUST.length, 5);
      }
      renderer.setSize(innerWidth, innerHeight);
    }
  }

  /* ---- camera drive ---- */
  let roll = 0; const clock = new THREE.Clock();
  const look = new THREE.Vector3(), tan = new THREE.Vector3();
  const worldUp = new THREE.Vector3(0, 1, 0);
  addEventListener('resize', () => {
    cam.aspect = innerWidth / innerHeight;
    cam.updateProjectionMatrix();
    renderer.setSize(innerWidth, innerHeight);
    /* Runway height is in vh, so the scroll span moves with the viewport —
       re-measure once here instead of on every scroll event. */
    measureScroll();
    if (capturing()) writeScroll();
  });

  // nearest node (for gentle side-framing so its content owns the opposite half)
  function nearestNode(u) { let bi = 0, bd = 1e9; for (let i = 0; i < nodeU.length; i++) { const d = Math.abs(u - nodeU[i]); if (d < bd) { bd = d; bi = i; } } let lock = Math.max(0, 1 - bd / 0.04); lock = lock * lock * (3 - 2 * lock); return { i: bi, lock }; }
  const tA = new THREE.Vector3(), tB = new THREE.Vector3();
  const getPt = (uu, out) => out.copy(path.getPointAt(Math.max(0, Math.min(1, uu))));
  const getTan = (uu, out) => out.copy(path.getTangentAt(Math.max(0, Math.min(0.9999, uu))));

  // Chapters that own the screen: no gate rings, crystals or point lights may
  // sit in frame while they are up, including ones bleeding in from a
  // neighbouring node. [id, pad before, pad after] in scroll units.
  const cleanWindows = [
    ['top', 1, 0.01], ['trustnode', 0.03, 0.03],
    ['securitynode', 0.06, 0.06], ['edgenode', 0.04, 0.04]
  ].map(([id, padA, padB]) => {
    const c = chapters.find(ch => ch.el.id === id);
    return c && { a: c.a - padA, b: c.b + padB };
  }).filter(Boolean);

  let framePrev = performance.now();

  function tick() {
    if (typeof window !== 'undefined' && window.__BYTEBOOM_STOP__) return;
    requestAnimationFrame(tick);
    if (!stage || !stage.isConnected) return;
    const t = clock.getElapsedTime();
    const now = performance.now();
    const dt = Math.min((now - framePrev) / 1000, 0.05);
    framePrev = now;
    adaptQuality(now, t);

    stepScroll(now, dt);

    /* The corridor ends at p=1; anything past that is the tail hand-off, where
       the camera simply holds its last pose behind the incoming FAQ. */
    const pc = p > 1 ? 1 : p;
    const tailT = tailProgress();
    const u = routeU(pc);

    getPt(u, cam.position); cam.position.y += Math.sin(t * .8) * .05;
    getTan(u, tan); tan.normalize();
    // Mouse sway: a small positional + rotational drift. Freeze it while the
    // bots cards are live so the three-card UI doesn't drift with the cursor.
    const botsLive = !!chapters.find(ch => ch.el.id === 'productnode' && ch.el.classList.contains('live'));
    const swayTargetX = botsLive ? 0 : mx;
    const swayTargetY = botsLive ? 0 : my;
    smx += (swayTargetX - smx) * (botsLive ? 0.12 : 0.045);
    smy += (swayTargetY - smy) * (botsLive ? 0.12 : 0.045);
    rightDir.set(-tan.z, 0, tan.x).normalize();
    cam.position.addScaledVector(rightDir, smx * 0.16);
    cam.position.y -= smy * 0.09;
    // Look along the path tangent (never sample a clamped point that collapses onto the camera —
    // that made lookAt aim nearly straight up near path end and flip the view).
    look.copy(cam.position).addScaledVector(tan, 10);
    look.addScaledVector(rightDir, smx * 0.26);
    look.y += 0.28 - smy * 0.14;
    cam.up.copy(worldUp);
    cam.lookAt(look);
    // Soft bank in corners only — keep upright; never enough roll to invert
    getTan(u, tA); getTan(Math.min(0.9999, u + 0.008), tB);
    let hA = Math.atan2(tA.x, -tA.z), hB = Math.atan2(tB.x, -tB.z), dh = hB - hA;
    while (dh > Math.PI) dh -= 2 * Math.PI; while (dh < -Math.PI) dh += 2 * Math.PI;
    const targetRoll = Math.max(-0.18, Math.min(0.18, -dh * 4.5));
    roll += (targetRoll - roll) * 0.12; cam.rotateZ(roll);
    cam.fov = 62 + Math.min(8, Math.abs(dh) * 90); cam.updateProjectionMatrix();
    camLight.position.copy(cam.position);

    // node life
    nodeGroups.forEach((ng, i) => { const d = ng.userData; d.crys.rotation.y = t * .5 + i; d.crys.rotation.x = Math.sin(t * .6 + i) * .3; d.cage.rotation.z = t * .3; ng.position.y = d.baseY + Math.sin(t * 1.1 + i) * .18; });

    m1.rotation.y = Math.sin(t * .03) * .05; m1.position.y = Math.sin(t * .4) * .4; m2.position.y = Math.cos(t * .3) * .5;
    /* Symbol layers wrap around the camera in the shader, so they are driven
       by uniforms rather than by moving the group — a group offset would shift
       the tiling lattice with it and defeat the point. Drift rides on uDrift
       for the same reason. Camera position is read AFTER the sway above so the
       wrap tracks exactly where the view ended up this frame. */
    for (const f of FIELDS) {
      f.mat.uniforms.uCam.value.copy(cam.position);
      f.mat.uniforms.uDrift.value.set(Math.sin(t * f.ds * .7) * 1.4, Math.sin(t * f.ds) * 1.1, 0);
      f.mat.uniforms.uPR.value = renderer.getPixelRatio();
    }

    updateChapters(p, tailT);

    /* Foreground dust still tracks camera sway so occlusion cues remain. */
    dctx.clearRect(0, 0, DW, DH);
    const bobPx = Math.sin(t * .8) * .05 * 105;
    const wx = -smx * 40;
    const wy = smy * 22 + bobPx;
    const dwx = wx - lastWX, dwy = wy - lastWY;
    const fly = Math.min(28, Math.abs(p - lastPd) * 5200);
    lastWX = wx; lastWY = wy; lastPd = p;
    const dcx = DW / 2, dcy = DH / 2;
    for (const b of DUST) {
      b.x += b.vx + dwx * b.zf + (b.x - dcx) / Math.max(dcx, 1) * fly * 0.06 * b.zf;
      b.y += b.vy + dwy * b.zf + (b.y - dcy) / Math.max(dcy, 1) * fly * 0.06 * b.zf;
      if (b.x < -30) b.x += DW + 60; else if (b.x > DW + 30) b.x -= DW + 60;
      if (b.y < -30) b.y += DH + 60; else if (b.y > DH + 30) b.y -= DH + 60;
      const a = 0.10 + 0.10 * Math.sin(t * 0.9 + b.ph);
      const s = b.r * (2.6 + 0.5 * Math.sin(t * 0.7 + b.ph));
      dctx.globalAlpha = Math.max(0.03, a);
      dctx.drawImage(b.sp, b.x - s, b.y - s, s * 2, s * 2);
    }
    dctx.globalAlpha = 1;

    const clean = cleanWindows.some(w => pc >= w.a && pc <= w.b);
    nodeDecor.forEach(d => {
      const show = !d.hideAlways && !clean;
      d.g.visible = false;   // gate ring retired — only the crystal reads as the node marker
      d.core.visible = show;
      d.pl.visible = show;
    });

    /* Edge keeps its own hand-off clock; the engine only says which card wins. */
    updateEdgeZoom(edgeWant);

    renderer.render(scene, cam);
  }
  updateChapters(0); tick();
})();

})();
