'use client';

import Script from 'next/script';

export function StationsScripts() {
  return (
    <>
      <Script src="/vendor/three.min.js" strategy="beforeInteractive" />
      <Script src="/stations.js" strategy="beforeInteractive" />
    </>
  );
}
