'use client';

import { useEffect } from 'react';
import Script from 'next/script';

function runCineDetect() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let webgl = false;
  try {
    const c = document.createElement('canvas');
    webgl = !!(
      window.WebGLRenderingContext &&
      (c.getContext('webgl') || c.getContext('experimental-webgl'))
    );
  } catch {
    /* ignore */
  }
  document.documentElement.classList.remove('flat', 'cine');
  document.documentElement.classList.add(!reduced && webgl ? 'cine' : 'flat');
}

declare global {
  interface Window {
    THREE?: unknown;
    __BYTEBOOM_STATIONS__?: boolean;
    __BYTEBOOM_STOP__?: boolean;
  }
}

const STATIONS_SCRIPT_ID = 'byteboom-stations-js';
const THREE_SCRIPT_ID = 'byteboom-three-js';

export default function StationsInit() {
  const bootStations = () => {
    if (window.__BYTEBOOM_STATIONS__) return;
    if (typeof window.THREE === 'undefined') return;
    if (!document.querySelector('.chapter')) return;
    if (document.getElementById(STATIONS_SCRIPT_ID)) return;

    window.__BYTEBOOM_STOP__ = false;
    runCineDetect();

    const script = document.createElement('script');
    script.id = STATIONS_SCRIPT_ID;
    script.src = '/stations.js';
    script.async = false;
    document.body.appendChild(script);
  };

  useEffect(() => {
    runCineDetect();
    bootStations();

    const interval = window.setInterval(() => {
      if (window.__BYTEBOOM_STATIONS__) {
        window.clearInterval(interval);
        return;
      }
      bootStations();
    }, 50);

    const timeout = window.setTimeout(() => window.clearInterval(interval), 5000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
      window.__BYTEBOOM_STOP__ = true;
      window.__BYTEBOOM_STATIONS__ = false;
      document.getElementById(STATIONS_SCRIPT_ID)?.remove();
    };
  }, []);

  return (
    <Script
      id={THREE_SCRIPT_ID}
      src="/vendor/three.min.js"
      strategy="afterInteractive"
      onLoad={() => bootStations()}
    />
  );
}
