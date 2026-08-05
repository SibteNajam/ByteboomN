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

/** Comma-separated extra hosts: TUNNEL_ORIGIN=foo.dev,bar.ngrok.io */
function envTunnelOrigins(): string[] {
  const raw = process.env.TUNNEL_ORIGIN ?? process.env.TUNNEL_ORIGINS ?? '';
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

const nextConfig: NextConfig = {
  /**
   * Next.js 16 blocks /_next/* from unknown origins in dev.
   * Animation scripts live in /public and load via boot-stations.js (no React needed).
   * These origins still matter for dev HMR / client hydration on shared URLs.
   */
  allowedDevOrigins: [
    '127.0.0.1',
    '127.0.0.1:3000',
    'localhost',
    'localhost:3000',
    '[::1]',
    '[::1]:3000',
    '0.0.0.0',
    '0.0.0.0:3000',
    // Cursor / VS Code / GitHub / common tunnels
    '*.cursor.sh',
    '*.cursor.app',
    '*.cursor.com',
    '*.anysphere.dev',
    '*.vscode.dev',
    '*.github.dev',
    '*.app.github.dev',
    '*.preview.app.github.dev',
    '*.codespaces.dev',
    '*.ngrok-free.app',
    '*.ngrok.io',
    '*.ngrok.app',
    '*.trycloudflare.com',
    '*.loca.lt',
    '*.replit.dev',
    '*.exe.xyz',
    '*.serveo.net',
    '*.tunnelmole.net',
    ...networkDevOrigins(),
    ...envTunnelOrigins(),
  ],
};

export default nextConfig;
