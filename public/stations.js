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
        if (c.el.id === 'journeynode' || c.el.id === 'edgenode') {
          c.panel.style.transform = 'translate(0px,0px) scale(1)';
          return;
        }
        const s = 1 - opacity;
        if (c.exit === 'into') {
          // The camera flies through this panel rather than shoving it aside:
          // approaching from depth on the way in, rushing past the viewer and
          // blurring out of focus on the way out.
          const out = p > (c.a + c.b) / 2;
          c.panel.style.transform = `translate(0px,0px) scale(${(out ? 1 + s * 0.5 : 1 - s * 0.12).toFixed(3)})`;
          c.panel.style.filter = out && s > 0.002 ? `blur(${(s * 12).toFixed(1)}px)` : 'none';
          return;
        }
        let tx = 0, ty = 0;
        if (c.dir === 'left') tx = -s * 120;
        else if (c.dir === 'right') tx = s * 120;
        else if (c.dir === 'center') ty = s * 60;
        else ty = s * 40;
        c.panel.style.transform = `translate(${tx.toFixed(1)}px,${ty.toFixed(1)}px) scale(${(0.94 + 0.06 * opacity).toFixed(3)})`;
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

  /* ---------- inline trading journey (chapter 3) ---------- */
  function initInlineJourney(rootEl) {
    if (!rootEl) return () => { };
    const q = sel => rootEl.querySelector(sel);
    const qa = sel => [...rootEl.querySelectorAll(sel)];
    const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
    const lit = q('.jp-route-lit');
    const bot = q('.jp-bot');
    const stopsG = q('.jp-stops');
    const popup = q('.jp-popup');
    if (!lit || !bot || !stopsG || !popup) return () => { };

    const JOURNEY_GROUPS = [
      { groupId: 1, kicker: '01 · Open', title: 'Login / Signup', body: 'Creates an account or logs in — fast entry into the product.', mocks: ['onboard.jpeg', 'login.jpeg'] },
      { groupId: 2, kicker: '02 · Explore', title: 'Signals + Demo', body: 'Preview signals free and watch the simulated demo bot against live prices. Demo is not indicative of future performance.', mocks: ['live singnals free.jpeg'] },
      { groupId: 3, kicker: '03 · Subscribe', title: 'Wallet one-click pay', body: 'Choose a plan, approve the wallet payment, then unlock the full product experience.', mocks: ['chooseplan.jpeg', 'connect wallet.jpeg', 'connectwalet2.jpeg', 'paynow.jpeg', 'confirmpayinwallet.jpeg', 'byteboomverifiespayment.jpeg', 'paymentverifiestalset.jpeg'] },
      { groupId: 4, kicker: '04 · Connect', title: 'Binance API keys', body: 'Trade on, withdrawals off. Funds stay on Binance while the in-app guide walks the setup.', mocks: ['setupapikeys.jpeg', 'setupapikeys2.jpeg', 'setupkeys4.jpeg'] },
      { groupId: 5, kicker: '05 · Activate', title: 'Start & follow', body: 'Start the bot and monitor positions, orders, and status in one place.', mocks: ['contorlsbot.jpeg'] },
      { groupId: 6, kicker: '06 · Unlink', title: 'Remove exchange keys', body: 'Disconnect Binance from ByteBoom without deleting your profile.', mocks: [] },
      { groupId: 7, kicker: '07 · Delete', title: 'Delete account', body: 'Complete exit from the product after unlink if still linked.', mocks: [] },
    ];

    /* One thread dot = one screenshot (14 total — matches /traidngjourney/images/). */
    const STOPS = [];
    let stopId = 1;
    JOURNEY_GROUPS.forEach(g => {
      g.mocks.forEach(mock => {
        STOPS.push({
          id: stopId++,
          groupId: g.groupId,
          kicker: g.kicker,
          title: g.title,
          body: g.body,
          mock,
        });
      });
    });
    const STOP_COUNT = STOPS.length;
    STOPS.forEach((s, i) => {
      s.at = STOP_COUNT === 1 ? 0.5 : 0.02 + (i / (STOP_COUNT - 1)) * 0.94;
    });

    const mockDir = rootEl.dataset.mockDir || '../traidngjourney/images/';
    const mockSrc = file => mockDir + encodeURIComponent(file);
    const len = lit.getTotalLength();
    lit.style.strokeDasharray = String(len);
    lit.style.strokeDashoffset = String(len);

    const ringR = STOP_COUNT > 10 ? 8 : 11;
    const dotR = STOP_COUNT > 10 ? 3.5 : 4.5;
    STOPS.forEach(s => {
      const pt = lit.getPointAtLength(len * s.at);
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.classList.add('jp-stop');
      g.dataset.stop = String(s.id);
      g.setAttribute('transform', `translate(${pt.x},${pt.y})`);
      g.innerHTML = '<circle r="' + ringR + '" class="jp-stop-ring"/><circle r="' + dotR + '" class="jp-stop-dot"/><text y="22" text-anchor="middle" class="jp-stop-label">' + s.id + '</text>';
      stopsG.appendChild(g);
    });

    const legend = qa('.jp-legend li');
    const slides = qa('.jp-slide');
    const slideA = slides[0], slideB = slides[1];
    const fallback = q('.jp-mock-fallback');
    const kickerEl = q('.jp-kicker');
    const titleEl = q('.jp-title');
    const bodyEl = q('.jp-body');
    const numEl = q('.jp-stop-num');
    let activeGroupId = -1, shownKey = '', frontIsA = true, sliding = false;
    const SLIDE_MS = 520;
    const frontEl = () => frontIsA ? slideA : slideB;
    const backEl = () => frontIsA ? slideB : slideA;

    const syncMarkers = (stop, legendGroup) => {
      if (!stop) return;
      const lg = legendGroup != null ? legendGroup : stop.groupId;
      qa('.jp-stop').forEach(n => n.classList.toggle('is-active', n.dataset.stop === String(stop.id)));
      legend.forEach(li => li.classList.toggle('is-active', li.dataset.group === String(lg)));
    };
    const syncLegendGroup = groupId => {
      if (groupId === activeGroupId) return;
      const g = JOURNEY_GROUPS.find(x => x.groupId === groupId);
      if (!g) return;
      activeGroupId = groupId;
      kickerEl.textContent = g.kicker;
      titleEl.textContent = g.title;
      bodyEl.textContent = g.body;
      popup.classList.add('is-open');
    };
    const syncCopy = stop => syncLegendGroup(stop.groupId);
    const showImmediate = (el, src, alt) => {
      if (!el) return;
      el.classList.remove('is-enter', 'is-exit', 'is-show');
      el.src = src; el.alt = alt; el.classList.add('is-show');
    };
    const slideTo = (src, alt, animate) => {
      const front = frontEl(), back = backEl();
      if (!front || !back) return;
      const canAnimate = animate && !reduced && front.classList.contains('is-show') && front.getAttribute('src');
      if (!canAnimate) {
        showImmediate(front, src, alt);
        back.classList.remove('is-show', 'is-enter', 'is-exit');
        sliding = false;
        return;
      }
      if (front.getAttribute('src') === src) return;
      sliding = true;
      back.classList.remove('is-show', 'is-enter', 'is-exit');
      back.src = src; back.alt = alt;
      const run = () => {
        back.classList.add('is-enter');
        void back.offsetWidth;
        front.classList.remove('is-show');
        front.classList.add('is-exit');
        back.classList.remove('is-enter');
        back.classList.add('is-show');
        setTimeout(() => {
          front.classList.remove('is-exit');
          frontIsA = !frontIsA;
          sliding = false;
        }, SLIDE_MS);
      };
      if (back.complete) run();
      else back.onload = () => { back.onload = null; run(); };
    };
    const applyFrame = (stop, animate) => {
      const key = String(stop.id);
      if (key === shownKey) return;
      if (sliding) return;
      shownKey = key;
      if (numEl) numEl.textContent = String(stop.id);
      if (!stop.mock) {
        slideA.classList.remove('is-show');
        slideB.classList.remove('is-show');
        if (fallback) fallback.hidden = false;
        return;
      }
      if (fallback) fallback.hidden = true;
      slideTo(mockSrc(stop.mock), stop.title + ' — screen ' + stop.id, animate);
    };

    const BEATS = STOPS.map((stop, idx) => ({ stop, idx }));

    STOPS.forEach(s => { if (s.mock) { const im = new Image(); im.src = mockSrc(s.mock); } });

    const STEP_MS = reduced ? 0 : 620;
    const WHEEL_LOCK_MS = reduced ? 0 : 1100;
    let currentStep = 0;
    let pathProgress = STOPS[0].at;
    let pathFrom = pathProgress;
    let pathTo = pathProgress;
    let pathT0 = 0;
    let pathAnimating = false;
    let armed = false;
    let wheelLocked = false;
    let completed = false;

    const paintPath = path => {
      lit.style.strokeDashoffset = String(len * (1 - path));
      const pt = lit.getPointAtLength(len * path);
      bot.setAttribute('transform', `translate(${pt.x},${pt.y})`);
    };

    const paintStep = (idx, path) => {
      paintPath(path);
      const beat = BEATS[idx];
      syncMarkers(beat.stop, beat.stop.groupId);
    };

    const goToStep = (idx, animate) => {
      idx = clamp(idx, 0, STOP_COUNT - 1);
      const beat = BEATS[idx];
      const targetPath = beat.stop.at;
      currentStep = idx;
      if (animate && !reduced) {
        pathFrom = pathProgress;
        pathTo = targetPath;
        pathT0 = performance.now();
        pathAnimating = true;
      } else {
        pathProgress = targetPath;
        pathAnimating = false;
        paintStep(idx, pathProgress);
      }
      syncCopy(beat.stop);
      applyFrame(beat.stop, animate && !reduced);
      if (!pathAnimating) paintStep(idx, pathProgress);
    };

    const tick = () => {
      if (pathAnimating) {
        const now = performance.now();
        const t = clamp((now - pathT0) / STEP_MS, 0, 1);
        const eased = t * t * (3 - 2 * t);
        pathProgress = pathFrom + (pathTo - pathFrom) * eased;
        paintStep(currentStep, pathProgress);
        if (t >= 1) {
          pathAnimating = false;
          pathProgress = pathTo;
          paintStep(currentStep, pathProgress);
        }
      } else if (armed || completed || currentStep > 0) {
        paintStep(currentStep, pathProgress);
      } else {
        paintStep(0, STOPS[0].at);
      }
    };

    goToStep(0, false);
    popup.classList.add('is-open');

    return {
      STOP_COUNT,
      tick,
      isArmed: () => armed,
      isCompleted: () => completed,
      isAnimating: () => pathAnimating || sliding,
      isLocked: () => wheelLocked,
      getStep: () => currentStep,
      setArmed(on) {
        if (on === armed) return;
        armed = on;
        wheelLocked = false;
        if (on) {
          if (completed) completed = false;
        } else if (!completed) {
          goToStep(0, false);
        }
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
      handleWheel(deltaY) {
        if (!armed || wheelLocked || pathAnimating || sliding) return { consumed: false };
        if (deltaY > 0) {
          if (currentStep >= STOP_COUNT - 1) return { consumed: false, atEnd: true };
          wheelLocked = true;
          setTimeout(() => { wheelLocked = false; }, WHEEL_LOCK_MS);
          goToStep(currentStep + 1, true);
          return { consumed: true };
        }
        if (deltaY < 0) {
          if (currentStep <= 0) return { consumed: false, atStart: true };
          wheelLocked = true;
          setTimeout(() => { wheelLocked = false; }, WHEEL_LOCK_MS);
          goToStep(currentStep - 1, true);
          return { consumed: true };
        }
        return { consumed: false };
      },
      setProgress(tNow) {
        if (armed) return;
        const idx = clamp(Math.floor(clamp(tNow, 0, 1) * STOP_COUNT), 0, STOP_COUNT - 1);
        if (idx !== currentStep) goToStep(idx, false);
        else paintStep(currentStep, STOPS[currentStep].at);
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
      if (scrollDirectionUp && (next < journeyExitTarget || scrollY < exitScroll - 1)) {
        clearJourneyRelease();
      } else if (!scrollDirectionUp) {
        next = Math.max(journeyExitTarget, next);
        if (scrollY < exitScroll - 2) {
          scrollTo({ top: exitScroll, behavior: 'auto' });
        }
      }
    }
    if (!journeyReleased && journeyCh && scrollDirectionUp && next < journeyCh.a - 0.008) {
      clearJourneyRelease();
      journeyHoldP = null;
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

  addEventListener('wheel', e => {
    if (!journeyChapter || reduced) return;
    if (journeyExiting) {
      e.preventDefault();
      return;
    }
    if (journeyReleased) return;
    const inRange = p >= journeyChapter.a && p <= journeyChapter.b;
    if (!inRange || !journeyFullyVisible()) return;

    if (!journeyCtrl.isArmed() && !journeyReleased) {
      journeyCtrl.setArmed(true);
      journeyHoldP = journeyVisibleP();
      snapJourneyScroll(journeyHoldP);
    }

    const holdActive = shouldHoldJourneyScroll();
    const result = journeyCtrl.handleWheel(e.deltaY);
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
      journeyCtrl.setArmed(false);
      journeyCtrl.resetToStart();
      clearJourneyRelease();
      journeyHoldP = null;
      return;
    }
    if (holdActive || journeyCtrl.isLocked() || journeyCtrl.isAnimating()) {
      e.preventDefault();
      if (journeyHoldP != null) snapJourneyScroll(journeyHoldP);
    }
  }, { passive: false });

  addEventListener('scroll', () => {
    if (!journeyChapter || reduced) return;
    if (journeyExiting || journeyReleased) return;
    const inRange = p >= journeyChapter.a && p <= journeyChapter.b;
    if (inRange && journeyFullyVisible() && journeyCtrl.isArmed() && shouldHoldJourneyScroll()) {
      const delta = scrollY - journeyLastScrollY;
      if (Math.abs(delta) > 12 && !journeyCtrl.isLocked() && !journeyCtrl.isAnimating()) {
        const result = journeyCtrl.handleWheel(delta);
        if (result.atEnd && delta > 0) {
          releaseJourneyForward();
        }
      }
    }
    if (journeyHoldP != null && shouldHoldJourneyScroll()) {
      target = journeyHoldP;
      snapJourneyScroll(journeyHoldP);
    }
    journeyLastScrollY = scrollY;
  }, { passive: true });

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

  /* avenues (glowing dashes trace the route along the floor) */
  const routePts = path.getSpacedPoints(320);
  const routeLine = new THREE.Line(new THREE.BufferGeometry().setFromPoints(routePts.map(p => new THREE.Vector3(p.x, -4.9, p.z))), new THREE.LineBasicMaterial({ color: CYAN, transparent: true, opacity: .3 }));
  scene.add(routeLine);
  for (let i = 6; i < routePts.length; i += 7) { const d = glow(i % 14 ? CYAN : VIOLET, 0.7, .5); d.position.set(routePts[i].x, -4.8, routePts[i].z); scene.add(d); }

  /* motes */
  function motes(count, color, size, op) { const geo = new THREE.BufferGeometry(); const a = new Float32Array(count * 3); for (let i = 0; i < count; i++) { a[i * 3] = (Math.random() - .5) * 160; a[i * 3 + 1] = Math.random() * 26 - 6; a[i * 3 + 2] = 12 - Math.random() * 240; } geo.setAttribute('position', new THREE.BufferAttribute(a, 3)); const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color, size, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false })); scene.add(pts); return pts; }
  const m1 = motes(1400, 0x9fd8ff, .13, .5), m2 = motes(650, VIOLET, .17, .26);

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
    // Look along the path tangent (never sample a clamped point that collapses onto the camera —
    // that made lookAt aim nearly straight up near path end and flip the view).
    look.copy(cam.position).addScaledVector(tan, 10);
    look.y += 0.28;
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

    const clean = cleanWindows.some(w => p >= w.a && p <= w.b);
    nodeDecor.forEach(d => {
      const show = !d.hideAlways && !clean;
      d.g.visible = show;
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

      if (!journeyReleased && !journeyExiting && p >= journeyChapterTick.a && !fullyVisible && p > visP + 0.004) {
        snapJourneyScroll(visP);
        target = visP;
      }

      if (inRange && fullyVisible && !journeyReleased && !journeyExiting) {
        if (!journeyCtrl.isArmed()) {
          journeyCtrl.setArmed(true);
          journeyHoldP = visP;
          if (!scrollDirectionUp || p <= visP + 0.015) {
            snapJourneyScroll(journeyHoldP);
          }
        } else if (shouldHoldJourneyScroll() && journeyHoldP != null) {
          snapJourneyScroll(journeyHoldP);
          target = journeyHoldP;
        }
      } else if (p < journeyChapterTick.a - 0.008) {
        journeyCtrl.setArmed(false);
        journeyCtrl.resetToStart();
        journeyHoldP = null;
        clearJourneyRelease();
      } else if (p > journeyChapterTick.b + 0.008) {
        journeyHoldP = null;
        if (journeyReleased || journeyCtrl.isCompleted()) {
          journeyCtrl.setArmed(false);
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
