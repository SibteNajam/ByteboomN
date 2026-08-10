import Script from 'next/script';
import WorldLayerShell from '@/components/home/WorldLayerShell';
import '../styles/stations.css';
import '../styles/trust-viz.css';

/**
 * boot-stations.js loads Three + stations.js from /public (never blocked by Next dev guards).
 * WorldLayerShell is server HTML — canvas injection won't break React hydration.
 */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <WorldLayerShell />
      {children}
      <Script id="byteboom-boot-js" src="/boot-stations.js" strategy="lazyOnload" />
    </>
  );
}
