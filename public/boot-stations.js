(function bootByteBoomLoader() {
  'use strict';

  var THREE_ID = 'byteboom-three-js';
  var STATIONS_ID = 'byteboom-stations-js';
  var POLL_MS = 50;
  var MAX_MS = 30000;

  function asset(path) {
    var base = document.querySelector('base');
    var root = base && base.href ? base.href.replace(/\/$/, '') : '';
    return root + path;
  }

  function runCineDetect() {
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var webgl = false;
    try {
      var c = document.createElement('canvas');
      webgl = !!(
        window.WebGLRenderingContext &&
        (c.getContext('webgl') || c.getContext('experimental-webgl'))
      );
    } catch (e) {
      /* ignore */
    }
    document.documentElement.classList.remove('flat', 'cine');
    document.documentElement.classList.add(!reduced && webgl ? 'cine' : 'flat');
  }

  function loadScript(src, id) {
    return new Promise(function (resolve, reject) {
      if (document.getElementById(id)) {
        resolve();
        return;
      }
      var s = document.createElement('script');
      s.id = id;
      s.src = src;
      s.async = false;
      s.onload = function () {
        resolve();
      };
      s.onerror = function () {
        reject(new Error('Failed to load ' + src));
      };
      document.head.appendChild(s);
    });
  }

  function injectStations() {
    if (window.__BYTEBOOM_STATIONS__) return true;
    if (!document.querySelector('.chapter')) return false;
    if (document.getElementById(STATIONS_ID)) return false;

    window.__BYTEBOOM_STOP__ = false;
    runCineDetect();

    var script = document.createElement('script');
    script.id = STATIONS_ID;
    script.src = asset('/stations.js?v=scroll-unlock');
    script.async = false;
    document.body.appendChild(script);
    return true;
  }

  function tick() {
    runCineDetect();
    if (typeof window.THREE === 'undefined') {
      loadScript(asset('/vendor/three.min.js'), THREE_ID)
        .then(function () {
          injectStations();
        })
        .catch(function () {
          /* retry on next poll */
        });
      return;
    }
    injectStations();
  }

  function whenReady(fn) {
    function start() {
      requestAnimationFrame(function () {
        requestAnimationFrame(fn);
      });
    }
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
  }

  whenReady(function () {
    tick();
    var interval = window.setInterval(function () {
      if (window.__BYTEBOOM_STATIONS__) {
        window.clearInterval(interval);
        return;
      }
      tick();
    }, POLL_MS);
    window.setTimeout(function () {
      window.clearInterval(interval);
    }, MAX_MS);
  });
})();
