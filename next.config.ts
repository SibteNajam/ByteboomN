import type { NextConfig } from 'next';
import os from 'os';

/** LAN / Wi‑Fi IPs so dev works when opened via http://192.168.x.x:3000 */
function networkDevOrigins(): string[] {
  const origins: string[] = [];
  try {
    const nets = os.networkInterfaces();
    for (const ifaces of Object.values(nets)) {
      for (const net of ifaces ?? []) {
        if (net.family === 'IPv4' && !net.internal) {
          origins.push(net.address);
          origins.push(`${net.address}:3000`);
        }
      }
    }
  } catch {
    /* ignore */
  }
  return origins;
}

const nextConfig: NextConfig = {
  /**
   * Next.js 16 blocks /_next/* dev assets from unknown origins (port-forward tunnels).
   * Without a match, client JS never loads → stations.js never runs → no 3D + hidden chapters.
   * Production (`npm run tunnel`) has no such restriction.
   */
  allowedDevOrigins: [
    '127.0.0.1',
    '127.0.0.1:3000',
    'localhost',
    'localhost:3000',
    '0.0.0.0',
    '0.0.0.0:3000',
    // Cursor / VS Code / GitHub / common tunnels
    '*.cursor.sh',
    '*.cursor.app',
    '*.cursor.com',
    '*.vscode.dev',
    '*.github.dev',
    '*.app.github.dev',
    '*.preview.app.github.dev',
    '*.ngrok-free.app',
    '*.ngrok.io',
    '*.trycloudflare.com',
    '*.loca.lt',
    '*.replit.dev',
    '*.exe.xyz',
    ...networkDevOrigins(),
    ...(process.env.TUNNEL_ORIGIN ? [process.env.TUNNEL_ORIGIN] : []),
  ],
};

export default nextConfig;
