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
  const depthBar = $('#depth'), hint = $('#hint'), runwayEl = $('#runway'), scrollTailHint = $('#scrollTailHint');
  const navLinks = $$('.jnav a'); let navAt = '';
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
  function updateChapters(p) {
    const flat = root.classList.contains('flat');
    chapters.forEach(c => {
      let opacity = fadeWindow(p, c.a, c.b);
      // Edge needs a solid hold so both waves can finish a full zoom
      if (c.el.id === 'edgenode') {
        const edgeIn = 0.01, edgeOut = 0.01;
        if (p < c.a || p > c.b) opacity = 0;
        else if (p < c.a + edgeIn) opacity = (p - c.a) / edgeIn;
        else if (p > c.b - edgeOut) opacity = (c.b - p) / edgeOut;
        else opacity = 1;
      }
      c.el.style.opacity = opacity;
      c.el.classList.toggle('live', opacity > 0.01);
      c.el.style.pointerEvents = opacity > 0.5 ? 'auto' : 'none';
      if (!flat && c.panel) {
        const s = 1 - opacity;
        const scale = (0.92 + 0.08 * opacity).toFixed(3);
        if (c.el.id === 'edgenode' || c.el.id === 'productnode' || c.el.id === 'journeynode') {
          c.panel.style.transform = 'translate3d(0,0,0) scale(1)';
          c.panel.style.filter = 'none';
          return;
        }
        if (c.exit === 'into') {
          // Fly-through: depth on the way in, rush past + blur on the way out.
          const out = p > (c.a + c.b) / 2;
          const z = out ? s * 90 : -s * 42;
          c.panel.style.transform = `translate3d(0,0,${z.toFixed(1)}px) scale(${(out ? 1 + s * 0.5 : 1 - s * 0.12).toFixed(3)})`;
          c.panel.style.filter = out && s > 0.002 ? `blur(${(s * 12).toFixed(1)}px)` : 'none';
          return;
        }
        let tx = 0, ty = 0, ry = 0, rx = 0, tz = -s * 76;
        if (c.dir === 'left') { tx = -s * 110; ry = s * 7; }
        else if (c.dir === 'right') { tx = s * 110; ry = -s * 7; }
        else { ty = s * 46; rx = s * 4.5; }
        c.panel.style.transform = `translate3d(${tx.toFixed(1)}px,${ty.toFixed(1)}px,${tz.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg) scale(${scale})`;
        c.panel.style.filter = s > 0.38 ? `blur(${(s * 2.8).toFixed(1)}px)` : 'none';
      }
    });
    if (depthBar) depthBar.style.width = (p * 100) + '%';
    if (hint) hint.style.opacity = p > 0.015 ? 0 : 1;
    if (scrollTailHint) {
      const showTailHint = !flat && p > 0.88 && !root.classList.contains('tail-mode');
      scrollTailHint.classList.toggle('is-on', showTailHint);
      scrollTailHint.setAttribute('aria-hidden', showTailHint ? 'false' : 'true');
    }
    if (navLinks.length) {
      const inTail = root.classList.contains('tail-mode');
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
    if (litPath && rider && litPath.isConnected && rider.isConnected) {
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

  const EDGE_MS = 1000;   // one full hand-off, start to finish
  const EDGE_OUT = 0.5;   // first half sends the old card away, second brings the new one
  let edgeIdx = 0, edgeFrom = 0, edgeT0 = 0, edgeBusy = false;
  const easeIO = x => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(2 - 2 * x, 3) / 2;

  const edgePaint = (slide, scale, opacity, ty) => {
    slide.style.visibility = opacity < 0.02 ? 'hidden' : 'visible';
    slide.style.opacity = String(opacity);
    slide.style.transform = `translate(-50%, calc(-50% + ${ty.toFixed(1)}px)) scale(${scale.toFixed(3)})`;
    slide.style.pointerEvents = opacity > 0.9 && scale > 0.95 && scale < 1.05 ? 'auto' : 'none';
  };
  // cards already sent off rest oversized, ones still to come rest small
  const edgeRest = i => i < edgeIdx ? edgeMax : 0.24;

  function updateEdgeZoom(t) {
    if (!edgeSlides.length) return;
    const n = edgeSlides.length;
    const want = Math.max(0, Math.min(n - 1, Math.floor(t * n)));
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
        if (i === edgeIdx) edgePaint(slide, 1, 1, 0);
        else edgePaint(slide, edgeRest(i), 0, 0);
      } else if (i === edgeFrom) {
        // leaving: forward it swells past the reader, backward it recedes
        const e = easeIO(Math.min(1, q / EDGE_OUT));
        edgePaint(slide, fwd ? 1 + e * (edgeMax - 1) : 1 - e * 0.7, 1 - e, fwd ? -e * 40 : e * 20);
      } else if (i === edgeIdx) {
        // arriving: waits for the screen to clear, then settles at full size
        const r = q <= EDGE_OUT ? 0 : easeIO((q - EDGE_OUT) / (1 - EDGE_OUT));
        edgePaint(slide, fwd ? 0.3 + r * 0.7 : edgeMax - r * (edgeMax - 1), r, (fwd ? 26 : -26) * (1 - r));
      } else {
        edgePaint(slide, edgeRest(i), 0, 0);
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
    // faq accordion (single open)
    const fq = $$('.faq__list details'); fq.forEach(d => d.addEventListener('toggle', () => { if (d.open) fq.forEach(o => { if (o !== d) o.open = false; }); }));
  })();

  /* ---------- inline trading journey (chapter 3) ----------
     Four FIXED phone docks. Scroll advances sections; only screenshots
     inside the docks crossfade. Empty docks stay as dim ghost frames. */
  const JOURNEY_NOOP = {
    STOP_COUNT: 0,
    tick() { },
    isArmed: () => false,
    isCompleted: () => false,
    isAnimating: () => false,
    isLocked: () => false,
    getStep: () => 0,
    setArmed() { },
    resetToStart() { },
    releaseAtEnd() { },
    resetCompleted() { },
    handleWheel: () => ({ consumed: false }),
    setProgress() { },
  };

  function initInlineJourney(rootEl) {
    if (!rootEl) return JOURNEY_NOOP;
    const q = sel => rootEl.querySelector(sel);
    const qa = sel => [...rootEl.querySelectorAll(sel)];
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const rail = q('.jp-rail');
    const slots = qa('.jp-slot');
    const speech = q('.jp-speech--section') || q('.jp-beat') || q('.jp-speech');
    if (!rail || !slots.length) return JOURNEY_NOOP;

    const SECTIONS = [
      {
        kicker: '01 · Open',
        title: 'Open & sign in',
        body: 'Land in ByteBoom, then create an account or sign in — no exchange access yet.',
        screens: ['onboard.jpeg', 'login.jpeg'],
      },
      {
        kicker: '02 · Explore',
        title: 'Signals + plan',
        body: 'Preview live signals free, then pick the plan that fits your risk.',
        screens: ['live singnals free.jpeg', 'chooseplan.jpeg'],
      },
      {
        kicker: '03 · Wallet',
        title: 'Connect wallet',
        body: 'Link MetaMask, Binance Wallet, SafePal or Trust — one tap to pay.',
        screens: ['connect wallet.jpeg', 'connectwalet2.jpeg'],
      },
      {
        kicker: '04 · Pay',
        title: 'Approve & verify',
        body: 'Approve in your wallet — ByteBoom verifies the payment on-chain.',
        screens: [
          'paynow.jpeg',
          'confirmpayinwallet.jpeg',
          'byteboomverifiespayment.jpeg',
          'paymentverifiestalset.jpeg',
        ],
      },
      {
        kicker: '05 · Activate',
        title: 'Keys & go live',
        body: 'Trade-only API keys, then run the bot — unlink or delete whenever you choose.',
        screens: [
          'setupapikeys.jpeg',
          'setupapikeys2.jpeg',
          'contorlsbot.jpeg',
        ],
      },
    ];

    const STOP_COUNT = SECTIONS.length;
    const DOCK_COUNT = Math.min(4, slots.length);

    const mockSrc = file =>
      '/images/userJourney/' + encodeURIComponent(file);

    SECTIONS.forEach(sec => {
      sec.screens.forEach(file => {
        const im = new Image();
        im.src = mockSrc(file);
      });
    });

    const legend = qa('.jp-legend li');

    /* Visual fade can stay long; wheel unlock stays short so scroll
       doesn't feel stuck / pulled back while screenshots ease. */
    const FADE_MS = reduced ? 200 : 750;
    const STEP_COOLDOWN_MS = reduced ? 220 : 460;
    const WHEEL_LOCK_MS = STEP_COOLDOWN_MS;

    let currentStep = -1;
    let armed = false;
    let wheelLocked = false;
    let completed = false;
    let animating = false;
    let animTimer = 0;
    let lockTimer = 0;
    let lastStepAt = 0;
    const dockLayer = slots.map(() => 'a');

    const paintSpeech = section => {
      if (!speech) return;
      const kicker = speech.querySelector('.jp-kicker');
      const title = speech.querySelector('.jp-title');
      const body = speech.querySelector('.jp-body');
      if (kicker) kicker.textContent = section.kicker;
      if (title) title.textContent = section.title;
      if (body) body.textContent = section.body;
      speech.classList.add('is-on');
    };

    /* Swap only the screenshot layers. Neon phone chrome never hides. */
    const setDockScreen = (slotEl, dockIdx, file, label, animate) => {
      const shotA = slotEl.querySelector('.jp-shot[data-layer="a"]');
      const shotB = slotEl.querySelector('.jp-shot[data-layer="b"]');
      if (!shotA || !shotB) return;

      if (!file) {
        shotA.classList.remove('is-on');
        shotB.classList.remove('is-on');
        slotEl.classList.add('is-empty');
        slotEl.classList.remove('is-filled');
        return;
      }

      slotEl.classList.remove('is-empty');
      slotEl.classList.add('is-filled');

      const src = mockSrc(file);
      const currKey = dockLayer[dockIdx];
      const outgoing = currKey === 'a' ? shotA : shotB;
      const incoming = currKey === 'a' ? shotB : shotA;

      if (outgoing.classList.contains('is-on') && outgoing.getAttribute('src') === src) {
        return;
      }

      const commit = () => {
        incoming.alt = label || '';
        /* Simultaneous crossfade — outgoing stays until incoming is on */
        incoming.classList.add('is-on');
        outgoing.classList.remove('is-on');
        dockLayer[dockIdx] = incoming.dataset.layer;
      };

      if (!animate || reduced) {
        incoming.setAttribute('src', src);
        commit();
        return;
      }

      /* Prepare incoming under the current shot, then crossfade together */
      incoming.classList.remove('is-on');
      let done = false;
      const onReady = () => {
        if (done) return;
        done = true;
        incoming.removeEventListener('load', onReady);
        incoming.removeEventListener('error', onReady);
        requestAnimationFrame(() => {
          requestAnimationFrame(commit);
        });
      };
      incoming.addEventListener('load', onReady);
      incoming.addEventListener('error', onReady);
      if (incoming.getAttribute('src') !== src) {
        incoming.setAttribute('src', src);
      }
      if (incoming.complete && incoming.naturalWidth > 0 && incoming.getAttribute('src') === src) {
        onReady();
      }
    };

    const syncSection = (sectionIdx, animate) => {
      const section = SECTIONS[sectionIdx];
      if (!section) return;
      paintSpeech(section);
      rail.dataset.section = String(sectionIdx);

      for (let d = 0; d < DOCK_COUNT; d++) {
        const file = section.screens[d] || null;
        const label = file ? section.title + ' — screen ' + (d + 1) : '';
        setDockScreen(slots[d], d, file, label, animate);
      }
      for (let d = DOCK_COUNT; d < slots.length; d++) {
        setDockScreen(slots[d], d, null, '', false);
      }
    };

    const goToStep = (idx, animate) => {
      idx = clamp(idx, 0, STOP_COUNT - 1);
      if (idx === currentStep && currentStep >= 0) return;
      currentStep = idx;
      clearTimeout(animTimer);

      legend.forEach((li, i) => {
        li.classList.toggle('is-active', i === idx);
        li.classList.toggle('is-done', i < idx);
      });

      if (!animate) {
        rail.classList.add('is-instant');
        syncSection(idx, false);
        void rail.offsetWidth;
        rail.classList.remove('is-instant');
        animating = false;
        return;
      }

      rail.classList.remove('is-instant');
      animating = true;
      syncSection(idx, true);
      animTimer = setTimeout(() => { animating = false; }, FADE_MS);
    };

    const lockWheel = () => {
      wheelLocked = true;
      clearTimeout(lockTimer);
      lockTimer = setTimeout(() => { wheelLocked = false; }, WHEEL_LOCK_MS);
    };

    goToStep(0, false);

    return {
      STOP_COUNT,
      tick() { },
      isArmed: () => armed,
      isCompleted: () => completed,
      isAnimating: () => animating,
      isLocked: () => wheelLocked,
      getStep: () => currentStep,
      setArmed(on) {
        if (on === armed) return;
        armed = on;
        wheelLocked = false;
        if (on && completed) completed = false;
      },
      resetToStart() {
        completed = false;
        goToStep(0, false);
      },
      releaseAtEnd() {
        armed = false;
        wheelLocked = false;
        completed = true;
        goToStep(STOP_COUNT - 1, false);
      },
      resetCompleted() {
        completed = false;
        if (!armed) goToStep(0, false);
      },
      handleWheel(deltaY, opts = {}) {
        const fastRewind = !!(opts && opts.fastRewind);
        if (!armed) return { consumed: false };
        const now = performance.now();

        if (deltaY > 0 && currentStep >= STOP_COUNT - 1) {
          if (now - lastStepAt < STEP_COOLDOWN_MS) return { consumed: true };
          return { consumed: false, atEnd: true };
        }
        if (deltaY < 0 && currentStep <= 0 && !fastRewind) {
          return { consumed: false, atStart: true };
        }

        /* Don't gate on animating — long screenshot fades must not snap-scroll back */
        if (!fastRewind && wheelLocked) return { consumed: true };
        if (fastRewind) {
          animating = false;
          wheelLocked = false;
        }
        if (!fastRewind && now - lastStepAt < STEP_COOLDOWN_MS) return { consumed: true };

        if (deltaY > 0) {
          lastStepAt = now;
          lockWheel();
          goToStep(currentStep + 1, true);
          return { consumed: true };
        }
        if (deltaY < 0) {
          if (fastRewind) {
            if (currentStep > 0) {
              wheelLocked = false;
              lastStepAt = 0;
              goToStep(0, false);
              return { consumed: true };
            }
            return { consumed: false, atStart: true };
          }
          lastStepAt = now;
          lockWheel();
          goToStep(currentStep - 1, true);
          return { consumed: true };
        }
        return { consumed: false };
      },
      setProgress(tNow) {
        if (armed) return;
        const idx = clamp(Math.floor(clamp(tNow, 0, 1) * STOP_COUNT), 0, STOP_COUNT - 1);
        goToStep(idx, false);
      },
    };
  }

  const journeyCtrl = initInlineJourney($('#bbj-inline'));

  /* ---------- inline pricing (chapter 4) — scroll through plans one at a time on mobile ---- */
  function initInlinePricing(rootEl) {
    if (!rootEl) return () => { };
    const cards = [...rootEl.querySelectorAll('.pcard')];
    if (!cards.length) return () => { };

    const PLAN_COUNT = cards.length;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    let activeIdx = 0;

    const setActive = idx => {
      activeIdx = clamp(idx, 0, PLAN_COUNT - 1);
      cards.forEach((card, i) => card.classList.toggle('is-active', i === activeIdx));
    };

    setActive(0);

    return function setPricingProgress(tNow) {
      const pLocal = clamp(tNow, 0, 1);
      const idx = clamp(Math.floor(pLocal * PLAN_COUNT), 0, PLAN_COUNT - 1);
      if (idx !== activeIdx) setActive(idx);
    };
  }
  const pricingProgress = initInlinePricing($('#pricing-inline'));

  function initInlineSecurity(rootEl) {
    if (!rootEl) return () => { };
    const items = [...rootEl.querySelectorAll('.sec-item')];
    if (!items.length) return () => { };

    const ITEM_COUNT = items.length;
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    let activeIdx = 0;

    const setActive = idx => {
      activeIdx = clamp(idx, 0, ITEM_COUNT - 1);
      items.forEach((item, i) => item.classList.toggle('is-active', i === activeIdx));
    };

    setActive(0);

    return function setSecurityProgress(tNow) {
      const pLocal = clamp(tNow, 0, 1);
      const idx = clamp(Math.floor(pLocal * ITEM_COUNT), 0, ITEM_COUNT - 1);
      if (idx !== activeIdx) setActive(idx);
    };
  }
  const securityProgress = initInlineSecurity($('#security-inline'));

  /* ---------- scroll ---------- */
  let target = 0, p = 0;
  let journeyExiting = false;
  let journeyReleased = false;
  let journeyExitTarget = null;
  let journeyHoldP = null;
  let journeyLastScrollY = 0;
  let lastReadScrollY = 0;
  let scrollDirectionUp = false;
  let journeyBypass = false;

  const clearJourneyRelease = () => {
    journeyReleased = false;
    journeyExitTarget = null;
    journeyExiting = false;
  };

  const readScroll = () => {
    if (journeyExiting) return;
    const max = cineScrollMax();
    scrollDirectionUp = scrollY < lastReadScrollY - 1;
    let next;
    if (scrollY <= max) {
      next = Math.max(0, Math.min(1, scrollY / Math.max(max, 1)));
      root.classList.remove('tail-mode');
    } else {
      next = 1;
      root.classList.add('tail-mode');
    }
    const journeyCh = chapters.find(c => c.el.id === 'journeynode');
    if (journeyReleased && journeyExitTarget != null) {
      const exitScroll = journeyExitTarget * max;
      /* Only unlock when the user intentionally scrolls back below the
         pricing entry — not on tiny upward jitter while already in Pricing. */
      if (scrollDirectionUp && next < journeyExitTarget - 0.01) {
        clearJourneyRelease();
      } else if (!scrollDirectionUp && next < journeyExitTarget) {
        next = journeyExitTarget;
        if (scrollY < exitScroll - 2) {
          scrollTo({ top: exitScroll, behavior: 'auto' });
        }
      }
    }
    if (!journeyReleased && journeyCh && scrollDirectionUp && next < journeyCh.a - 0.008) {
      clearJourneyRelease();
      journeyHoldP = null;
      journeyBypass = false;
    }
    if (journeyCh) {
      const inJourney = next >= journeyCh.a - 0.004 && next <= journeyCh.b + 0.02;
      if (scrollDirectionUp && inJourney) {
        if (journeyCtrl.isCompleted() || journeyReleased || next > journeyCh.a + (journeyCh.b - journeyCh.a) * 0.28) {
          journeyBypass = true;
        }
      } else if (!scrollDirectionUp && inJourney && next <= journeyCh.a + (journeyCh.b - journeyCh.a) * 0.12) {
        journeyBypass = false;
      } else if (!inJourney) {
        journeyBypass = false;
      }
    }
    target = next;
    lastReadScrollY = scrollY;
  };
  addEventListener('scroll', readScroll, { passive: true }); readScroll();

  /* ---------- in-page links ----------
     Chapters are position:fixed, so a plain #hash has nothing to scroll to.
     Translate the target's scroll window into a runway offset instead; the
     camera lerp turns the jump into a flight. Flat mode stacks the chapters
     normally, so there the browser's own anchor handling is correct. */
  if (CINE) {
    const jumpTo = id => {
      if (id === 'faqnode' || id === 'footer') {
        const top = id === 'footer' ? $('#footer')?.offsetTop ?? cineScrollMax() + 2 : cineScrollMax() + 2;
        scrollTo({ top, behavior: 'smooth' });
        return true;
      }
      const c = chapters.find(ch => ch.el.id === id);
      if (!c) return false;
      // land just past the fade-in so the panel is already solid on arrival
      const at = c.a <= 0 ? 0 : Math.min(c.a + Math.min((c.b - c.a) * 0.32, 0.03) + 0.004, c.b);
      scrollTo({ top: at * cineScrollMax(), behavior: 'auto' });
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
    // flat fallback: reveal all chapters as normal stacked blocks
    chapters.forEach(c => { c.el.style.opacity = 1; c.el.classList.add('live'); if (c.panel) c.panel.style.transform = 'none'; });
    addEventListener('scroll', () => { readScroll(); if (depthBar) depthBar.style.width = (target * 100) + '%'; }, { passive: true });
    updateChapters(0);
    journeyCtrl.setProgress(1);
    pricingProgress(1);
    securityProgress(1);
    return;
  }

  /* ---------- journey: one scroll impulse = one step ----------
     Hold page scroll while the section is active; wheel nominates the next
     beat. Animation waits until the panel is fully opaque (not mid-fade). */
  const journeyChapter = chapters.find(c => c.el.id === 'journeynode');

  const journeyVisibleP = () => {
    if (!journeyChapter) return 1;
    const fadeIn = Math.min((journeyChapter.b - journeyChapter.a) * 0.32, 0.03);
    return journeyChapter.a + fadeIn;
  };

  const journeyFullyVisible = () => {
    if (!journeyChapter) return false;
    return fadeWindow(p, journeyChapter.a, journeyChapter.b) >= 0.98;
  };

  const snapJourneyScroll = holdP => {
    if (journeyExiting || journeyReleased) return;
    const holdScroll = holdP * cineScrollMax();
    if (Math.abs(scrollY - holdScroll) > 3) {
      scrollTo({ top: holdScroll, behavior: 'auto' });
      target = holdP;
      p = holdP;
      journeyLastScrollY = holdScroll;
    }
  };

  const shouldHoldJourneyScroll = () => {
    if (journeyBypass) return false;
    if (!journeyChapter || !journeyCtrl.isArmed()) return false;
    if (journeyReleased) return false;
    const visP = journeyVisibleP();
    if (scrollDirectionUp && p > visP + 0.012) return false;
    return true;
  };

  const journeyExitP = () => {
    if (!journeyChapter) return 1;
    const pricingChapter = chapters.find(c => c.el.id === 'pricingnode');
    if (pricingChapter) {
      const fadeIn = Math.min((pricingChapter.b - pricingChapter.a) * 0.32, 0.03);
      return Math.max(journeyChapter.b + 0.012, pricingChapter.a + fadeIn + 0.004);
    }
    return journeyChapter.b + 0.02;
  };

  const releaseJourneyForward = () => {
    if (journeyReleased || journeyExiting) return;
    journeyReleased = true;
    journeyHoldP = null;
    journeyExitTarget = journeyExitP();
    journeyCtrl.releaseAtEnd();
    beginJourneyExit();
  };

  const beginJourneyExit = () => {
    const exitP = journeyExitTarget != null ? journeyExitTarget : journeyExitP();
    if (reduced) {
      target = exitP;
      p = exitP;
      const exitScroll = exitP * cineScrollMax();
      scrollTo({ top: exitScroll, behavior: 'auto' });
      journeyLastScrollY = exitScroll;
      return;
    }
    journeyExiting = true;
    target = exitP;
  };

  const skipJourneyForward = () => {
    if (!journeyChapter) return;
    journeyBypass = false;
    journeyCtrl.releaseAtEnd();
    if (!journeyReleased && !journeyExiting) {
      releaseJourneyForward();
      return;
    }
    const exitP = journeyExitTarget != null ? journeyExitTarget : journeyExitP();
    clearJourneyRelease();
    journeyReleased = true;
    journeyExitTarget = exitP;
    journeyHoldP = null;
    target = exitP;
    p = exitP;
    const top = exitP * cineScrollMax();
    scrollTo({ top, behavior: reduced ? 'auto' : 'smooth' });
    journeyLastScrollY = top;
    lastReadScrollY = top;
  };

  const releaseJourneyBack = () => {
    if (journeyExiting) return;
    journeyCtrl.setArmed(false);
    journeyCtrl.resetToStart();
    clearJourneyRelease();
    journeyHoldP = null;
    /* Bypass so the tick loop does not re-arm + snap while leaving */
    journeyBypass = true;
    const bots = chapters.find(c => c.el.id === 'productnode');
    if (!bots) return;
    const at = Math.max(0, bots.b - 0.012);
    if (reduced) {
      target = at;
      p = at;
      const top = at * cineScrollMax();
      scrollTo({ top, behavior: 'auto' });
      journeyLastScrollY = top;
      lastReadScrollY = top;
      return;
    }
    /* Same camera-lerp exit as forward → Pricing */
    journeyExitTarget = at;
    journeyExiting = true;
    target = at;
  };

  const skipJourneyBack = () => {
    if (!journeyChapter) return;
    releaseJourneyBack();
  };

  const skipBackBtn = $('#journeySkipBack');
  const skipFwdBtn = $('#journeySkipForward');
  if (skipBackBtn) skipBackBtn.addEventListener('click', skipJourneyBack);
  if (skipFwdBtn) skipFwdBtn.addEventListener('click', skipJourneyForward);

  addEventListener('wheel', e => {
    if (!journeyChapter || reduced) return;
    if (journeyBypass) return;
    if (journeyExiting) {
      e.preventDefault();
      return;
    }
    if (journeyReleased) return;
    const inRange = p >= journeyChapter.a - 0.002 && p <= journeyChapter.b + 0.002;
    if (!inRange) return;

    /* Approaching the section: hold only when scrolling forward.
       Scrolling up must be free so we can leave back to Bots. */
    if (!journeyFullyVisible()) {
      if (e.deltaY < 0) {
        journeyHoldP = null;
        journeyCtrl.setArmed(false);
        journeyBypass = true;
        return;
      }
      e.preventDefault();
      const visP = journeyVisibleP();
      journeyHoldP = visP;
      snapJourneyScroll(visP);
      return;
    }

    if (!journeyCtrl.isArmed() && !journeyReleased) {
      /* Don't arm while the user is clearly scrolling back out */
      if (e.deltaY < 0 && journeyCtrl.getStep() <= 0) {
        releaseJourneyBack();
        e.preventDefault();
        return;
      }
      journeyCtrl.setArmed(true);
      journeyHoldP = journeyVisibleP();
      if (e.deltaY > 0) snapJourneyScroll(journeyHoldP);
    }

    const holdActive = shouldHoldJourneyScroll();
    const fastRewind = e.deltaY < 0 && journeyCtrl.getStep() > 0;
    const result = journeyCtrl.handleWheel(e.deltaY, { fastRewind });
    if (result.consumed) {
      e.preventDefault();
      if (journeyHoldP != null) snapJourneyScroll(journeyHoldP);
      return;
    }
    if (result.atEnd && e.deltaY > 0) {
      e.preventDefault();
      releaseJourneyForward();
      return;
    }
    if (result.atStart && e.deltaY < 0) {
      e.preventDefault();
      releaseJourneyBack();
      return;
    }
    if (holdActive || journeyCtrl.isLocked() || journeyCtrl.isAnimating()) {
      e.preventDefault();
      if (journeyHoldP != null) snapJourneyScroll(journeyHoldP);
    }
  }, { passive: false });

  addEventListener('scroll', () => {
    if (!journeyChapter || reduced) return;
    if (journeyBypass) {
      journeyLastScrollY = scrollY;
      return;
    }
    if (journeyExiting || journeyReleased) return;
    /* Hold scroll only — wheel owns one-impulse-one-step */
    if (journeyHoldP != null && shouldHoldJourneyScroll()) {
      target = journeyHoldP;
      snapJourneyScroll(journeyHoldP);
    }
    journeyLastScrollY = scrollY;
  }, { passive: true });

  /* ---- auto-glide: never park the user between chapters ----
     If scrolling stops while a transition is mid-flight (panel fading or
     blurred), glide automatically to the next chapter anchor — forward or
     back depending on the last scroll direction. Feels automated: any
     nudge past a section completes the whole move. */
  const GLIDE_IDLE_MS = 320;
  let lastUserInputAt = performance.now();
  let autoGliding = false;
  let glideTop = 0;
  const noteUserInput = () => { lastUserInputAt = performance.now(); autoGliding = false; };
  addEventListener('wheel', noteUserInput, { passive: true });
  addEventListener('touchmove', noteUserInput, { passive: true });
  addEventListener('pointerdown', noteUserInput, { passive: true });
  addEventListener('keydown', noteUserInput);

  // matches updateChapters: edge holds solid longer, others fade over f
  const glideFadeSpan = c => c.el.id === 'edgenode' ? 0.01 : Math.min((c.b - c.a) * 0.32, 0.03);
  const glideVis = c => {
    if (c.el.id === 'edgenode') {
      if (p < c.a || p > c.b) return 0;
      if (p < c.a + 0.01) return (p - c.a) / 0.01;
      if (p > c.b - 0.01) return (c.b - p) / 0.01;
      return 1;
    }
    return fadeWindow(p, c.a, c.b);
  };
  const glideArrival = c => c.a <= 0 ? 0 : Math.min(c.a + glideFadeSpan(c) + 0.006, c.b);
  const glideHold = c => c.b >= 1 ? 1 : Math.max(c.b - glideFadeSpan(c) - 0.006, c.a);

  function maybeAutoGlide() {
    if (autoGliding || root.classList.contains('tail-mode')) return;
    if (performance.now() - lastUserInputAt < GLIDE_IDLE_MS) return;
    if (journeyExiting || journeyReleased || journeyCtrl.isArmed()) return;
    /* Don't auto-pull back into Journey after the user has left it */
    if (journeyChapter && journeyCtrl.isCompleted() && p > journeyChapter.b - 0.002) return;
    if (Math.abs(target - p) > 0.003) return;              // camera still flying
    let vis = 0;
    for (const c of chapters) { const v = glideVis(c); if (v > vis) vis = v; }
    if (vis >= 0.95) return;                                // a chapter owns the screen
    let at = null;
    if (scrollDirectionUp) {
      for (let i = chapters.length - 1; i >= 0; i--) {
        if (glideHold(chapters[i]) < p - 0.001) { at = glideHold(chapters[i]); break; }
      }
    } else {
      for (const c of chapters) {
        if (glideArrival(c) > p + 0.001) { at = glideArrival(c); break; }
      }
    }
    if (at == null) return;
    autoGliding = true;
    glideTop = at * cineScrollMax();
    scrollTo({ top: glideTop, behavior: 'smooth' });
  }

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

  /* motes */
  function motes(count, color, size, op) { const geo = new THREE.BufferGeometry(); const a = new Float32Array(count * 3); for (let i = 0; i < count; i++) { a[i * 3] = (Math.random() - .5) * 160; a[i * 3 + 1] = Math.random() * 26 - 6; a[i * 3 + 2] = 12 - Math.random() * 240; } geo.setAttribute('position', new THREE.BufferAttribute(a, 3)); const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color, size, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false })); scene.add(pts); return pts; }
  const m1 = motes(1400, 0x9fd8ff, .13, .5), m2 = motes(650, VIOLET, .17, .26);

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
  const dustCount = innerWidth < 720 ? 12 : 26;
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
        DUST.length = Math.min(DUST.length, 14);
      } else {
        renderer.setPixelRatio(1);
        m2.visible = false;
        DUST.length = Math.min(DUST.length, 8);
      }
      renderer.setSize(innerWidth, innerHeight);
    }
  }

  /* ---- camera drive ---- */
  let roll = 0; const clock = new THREE.Clock();
  const look = new THREE.Vector3(), tan = new THREE.Vector3();
  const worldUp = new THREE.Vector3(0, 1, 0);
  addEventListener('resize', () => { cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); readScroll(); });

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

  function tick() {
    if (typeof window !== 'undefined' && window.__BYTEBOOM_STOP__) return;
    requestAnimationFrame(tick);
    if (!stage || !stage.isConnected) return;
    const t = clock.getElapsedTime();
    adaptQuality(performance.now(), t);
    p += (target - p) * 0.1; if (Math.abs(target - p) < 0.0004) p = target;

    if (journeyExiting) {
      const syncScroll = p * cineScrollMax();
      if (Math.abs(scrollY - syncScroll) > 2) {
        scrollTo({ top: syncScroll, behavior: 'auto' });
      }
      journeyLastScrollY = syncScroll;
      if (Math.abs(p - target) < 0.0006) {
        const exitP = journeyExitTarget != null ? journeyExitTarget : target;
        journeyExiting = false;
        p = exitP;
        target = exitP;
        const finalScroll = exitP * cineScrollMax();
        scrollTo({ top: finalScroll, behavior: 'auto' });
        journeyLastScrollY = finalScroll;
      }
    }

    const u = routeU(p);

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

    updateChapters(p);

    /* Chapters stay planted. Mouse/bob used to shift every live chapter in
       screen space, which read as a floating overlay on the world rather
       than content living in the corridor (the crystal/ring does not get
       that extra DOM sway — only camera motion). */
    chapters.forEach(c => {
      if (c.el.style.transform) c.el.style.transform = '';
    });

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

    /* auto-glide bookkeeping: release when the glide lands, then re-check */
    if (autoGliding && Math.abs(scrollY - glideTop) < 4) autoGliding = false;
    maybeAutoGlide();

    const clean = cleanWindows.some(w => p >= w.a && p <= w.b);
    nodeDecor.forEach(d => {
      const show = !d.hideAlways && !clean;
      d.g.visible = false;   // gate ring retired — only the crystal reads as the node marker
      d.core.visible = show;
      d.pl.visible = show;
    });

    const edgeChapter = chapters.find(c => c.el.id === 'edgenode');
    if (edgeChapter) {
      updateEdgeZoom(Math.max(0, Math.min(1, (p - edgeChapter.a) / Math.max(edgeChapter.b - edgeChapter.a, 1e-6))));
    }

    const journeyChapterTick = chapters.find(c => c.el.id === 'journeynode');
    if (journeyChapterTick) {
      const inRange = p >= journeyChapterTick.a && p <= journeyChapterTick.b;
      const fullyVisible = fadeWindow(p, journeyChapterTick.a, journeyChapterTick.b) >= 0.98;
      const visP = journeyVisibleP();
      /* Only snap during approach into Journey — NOT when past it (Pricing+).
         Old check used !fullyVisible which is also true after leaving, and
         yanked scroll back to Journey from later sections. */
      const approaching =
        p >= journeyChapterTick.a - 0.002 &&
        p <= visP + 0.045 &&
        !scrollDirectionUp;

      if (!journeyReleased && !journeyExiting && !journeyBypass && approaching && !fullyVisible && p > visP + 0.004) {
        snapJourneyScroll(visP);
        target = visP;
      }

      if (inRange && fullyVisible && !journeyReleased && !journeyExiting && !journeyBypass) {
        if (!journeyCtrl.isArmed()) {
          /* Only arm when arriving forward — never re-trap while leaving upward */
          if (!scrollDirectionUp) {
            journeyCtrl.setArmed(true);
            journeyHoldP = visP;
            snapJourneyScroll(journeyHoldP);
          }
        } else if (shouldHoldJourneyScroll() && journeyHoldP != null) {
          snapJourneyScroll(journeyHoldP);
          target = journeyHoldP;
        }
      } else if (journeyBypass && inRange) {
        journeyCtrl.setArmed(false);
        journeyHoldP = null;
      } else if (p < journeyChapterTick.a - 0.008) {
        journeyCtrl.setArmed(false);
        journeyCtrl.resetToStart();
        journeyHoldP = null;
        clearJourneyRelease();
        journeyBypass = false;
      } else if (p > journeyChapterTick.b + 0.008) {
        journeyHoldP = null;
        journeyCtrl.setArmed(false);
        /* Stay released once past Journey so later sections can't re-trap */
        if (journeyCtrl.isCompleted() && !journeyReleased && !journeyExiting) {
          journeyReleased = true;
          journeyExitTarget = journeyExitTarget != null ? journeyExitTarget : journeyExitP();
        }
      }

      journeyCtrl.tick();
    }

    const pricingChapter = chapters.find(c => c.el.id === 'pricingnode');
    if (pricingChapter) {
      const rawPricing = Math.max(0, Math.min(1, (p - pricingChapter.a) / Math.max(pricingChapter.b - pricingChapter.a, 1e-6)));
      pricingProgress(rawPricing);
    }

    const securityChapter = chapters.find(c => c.el.id === 'securitynode');
    if (securityChapter) {
      const rawSecurity = Math.max(0, Math.min(1, (p - securityChapter.a) / Math.max(securityChapter.b - securityChapter.a, 1e-6)));
      securityProgress(rawSecurity);
    }
    renderer.render(scene, cam);
  }
  updateChapters(0); tick();
})();

})();
