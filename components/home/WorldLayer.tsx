'use client';

export default function WorldLayer() {
  return (
    <>
<div id="stage" aria-hidden="true"></div>
  <div id="veil" aria-hidden="true"></div>
  <div id="depth" aria-hidden="true"></div>
  <div id="routemap" aria-hidden="true">
    <div className="cap">route</div>
    <svg width="60" height="150" viewBox="0 0 60 150">
      <defs>
        <linearGradient id="rmgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#14e0d0" />
          <stop offset="1" stopColor="#7d5cff" />
        </linearGradient>
      </defs>
      <polyline className="trail" points="30,8 48,30 12,52 48,74 12,96 40,116 20,134 30,146" />
      <polyline id="litpath" className="lit" points="30,8 48,30 12,52 48,74 12,96 40,116 20,134 30,146" />
      <circle className="node" cx="30" cy="8" r="3" />
      <circle className="node" cx="48" cy="30" r="3" />
      <circle className="node" cx="12" cy="52" r="3" />
      <circle className="node" cx="48" cy="74" r="3" />
      <circle className="node" cx="12" cy="96" r="3" />
      <circle className="node" cx="40" cy="116" r="3" />
      <circle className="node" cx="20" cy="134" r="3" />
      <circle className="node" cx="30" cy="146" r="3" />
      <circle className="node" cx="30" cy="146" r="3" />
      <circle id="rider" cx="30" cy="8" r="3.4" />
    </svg>
  </div>
    </>
  );
}
