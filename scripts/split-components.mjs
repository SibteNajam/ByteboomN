import fs from 'fs';
import path from 'path';

const rawPath = path.resolve('components/home/HomeContent.raw.tsx');
const raw = fs.readFileSync(rawPath, 'utf8');
const bodyMatch = raw.match(/return \(\s*<>\s*([\s\S]*)\s*<\/>\s*\);/);
const body = bodyMatch[1];

const slices = [
  { file: 'WorldLayer.tsx', fn: 'WorldLayer', start: '<div id="stage"', end: '<div className="jbar">' },
  { file: 'NavBar.tsx', fn: 'NavBar', start: '<div className="jbar">', end: '<section className="chapter" id="top"' },
  { file: 'HeroChapter.tsx', fn: 'HeroChapter', start: '<section className="chapter" id="top"', end: '<section className="chapter chapter--trust" id="trustnode"' },
  { file: 'TrustChapter.tsx', fn: 'TrustChapter', start: '<section className="chapter chapter--trust" id="trustnode"', end: '<section className="chapter chapter--bots" id="productnode"' },
  { file: 'BotsChapter.tsx', fn: 'BotsChapter', start: '<section className="chapter chapter--bots" id="productnode"', end: '<section className="chapter chapter--journey" id="journeynode"' },
  { file: 'JourneyChapter.tsx', fn: 'JourneyChapter', start: '<section className="chapter chapter--journey" id="journeynode"', end: '<section className="chapter chapter--pricing" id="pricingnode"' },
  { file: 'PricingChapter.tsx', fn: 'PricingChapter', start: '<section className="chapter chapter--pricing" id="pricingnode"', end: '<section className="chapter chapter--security" id="securitynode"' },
  { file: 'SecurityChapter.tsx', fn: 'SecurityChapter', start: '<section className="chapter chapter--security" id="securitynode"', end: '<section className="chapter chapter--edge" id="edgenode"' },
  { file: 'EdgeChapter.tsx', fn: 'EdgeChapter', start: '<section className="chapter chapter--edge" id="edgenode"', end: '<section className="chapter chapter--about" id="aboutnode"' },
  { file: 'AboutChapter.tsx', fn: 'AboutChapter', start: '<section className="chapter chapter--about" id="aboutnode"', end: '<div id="hint">' },
  { file: 'ScrollTail.tsx', fn: 'ScrollTail', start: '<div id="hint">', end: '<svg width="0" height="0"' },
  { file: 'SvgSprite.tsx', fn: 'SvgSprite', start: '<svg width="0" height="0"', end: null },
];

const outDir = path.resolve('components/home');
const componentNames = [];

for (const s of slices) {
  const si = body.indexOf(s.start);
  if (si === -1) {
    console.error('Missing start:', s.file, s.start.slice(0, 40));
    continue;
  }
  const ei = s.end ? body.indexOf(s.end, si + s.start.length) : body.length;
  if (s.end && ei === -1) {
    console.error('Missing end:', s.file, s.end.slice(0, 40));
    continue;
  }
  let chunk = body.slice(si, ei).trim();
  if (s.file === 'SvgSprite.tsx') {
    const endSvg = body.indexOf('</svg>', si) + 6;
    chunk = body.slice(si, endSvg).trim();
  }

  const content = `'use client';

export default function ${s.fn}() {
  return (
    <>
${chunk}
    </>
  );
}
`;
  fs.writeFileSync(path.join(outDir, s.file), content);
  componentNames.push(s.fn);
  console.log('Fixed', s.file);
}

const imports = componentNames.map(n => `import ${n} from './${n}';`).join('\n');
const components = componentNames.map(n => `      <${n} />`).join('\n');

fs.writeFileSync(
  path.join(outDir, 'HomePage.tsx'),
  `'use client';

import { CineDetector, StationsScripts } from './StationsLoader';
${imports}

export default function HomePage() {
  return (
    <>
      <CineDetector />
      <StationsScripts />
${components}
    </>
  );
}
`
);

console.log('All components fixed');
