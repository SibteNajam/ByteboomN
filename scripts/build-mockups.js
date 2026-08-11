/**
 * Builds the *-clean.png phone mockups from the untouched screenshot exports.
 *
 *   node scripts/build-mockups.js
 *
 * Re-runnable: it always starts from the originals, so running it twice gives
 * the same result and you can edit the numbers below and just run it again.
 *
 * Two things happen here:
 *   1. Both shots get the personal notification icons wiped out of the status
 *      bar. The bar's background is a single flat colour, so the patch is an
 *      exact fill, not a blur — verified 0 residual pixels.
 *   2. The signals shot gets its losing figures rewritten as gains.
 *
 * Nothing is eyeballed. Fonts, colours and string formats are lifted from the
 * app that produced the screenshots (../../mobile-app-futures):
 *   src/app/(tabs)/index.tsx               cardValue -> fonts.sansBold, neon.green
 *   src/components/ui/PersistentHeader.tsx pnlText   -> fonts.sans, dark pnlColor
 * and the pixel sizes were calibrated by re-rendering the ORIGINAL strings and
 * matching their >50%-alpha ink box to the screenshot's, so replacement text
 * lands at the same weight and baseline as the untouched "$82.54" beside it.
 */
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const DIR = path.join(__dirname, '..', 'public', 'images', 'mobile mockup');
const FONTS = path.join(__dirname, '..', '..', 'mobile-app-futures',
  'node_modules', '@expo-google-fonts', 'ibm-plex-sans');
const BOLD = path.join(FONTS, '700Bold', 'IBMPlexSans_700Bold.ttf');
const REG = path.join(FONTS, '400Regular', 'IBMPlexSans_400Regular.ttf');

/* ── the figures. Edit these, re-run, done. ────────────────────────────────
   Formats are the app's own templates, so they stay believable:
     cardValue  `${v >= 0 ? '+' : ''}$${Math.abs(v).toFixed(2)}`
     pnlText    `${+ }${gain} (${pct}%) 24h`
   The portfolio reads $610.80, so a +8.00% day is 610.80 - 610.80/1.08 =
   45.24 gained. Keep those two consistent if you change the percentage. */
const FLOATING_PNL = '+$10.00';
const TOTAL_PNL = '+$50.00';
const GAIN_24H = '+45.24 (8.00%) 24h';

/* ── measured constants (px, in the 1419x2796 export) ─────────────────── */
const PAGE_SIGNALS = { r: 0, g: 10, b: 22, alpha: 1 };   // header background
const PAGE_CONTROLS = { r: 1, g: 17, b: 33, alpha: 1 };
const CARD = { r: 1, g: 14, b: 30, alpha: 1 };            // metrics card fill
const GREEN_VALUE = '#4DB86A';                            // colors.neon.green, dark theme
const GREEN_PNL = '#86efac';                              // PersistentHeader pnlColor, dark theme

// clock ends x=269/277, dynamic island starts x=523 — the patch fills the gap
const STATUS_PATCH = { left: 279, top: 148, width: 244, height: 78 };

const SS = 4; // render big, downscale — mimics the screenshot's own resampling

/** Render text with the real TTF and report where its ink actually starts. */
async function text(str, fontfile, px, color) {
  const big = await sharp({
    text: {
      text: `<span foreground="${color}">${str}</span>`,
      font: `IBM Plex Sans ${px * SS}`, fontfile, dpi: 72, rgba: true,
    },
  }).png().toBuffer({ resolveWithObject: true });
  return measure(big.data, Math.round(big.info.width / SS), Math.round(big.info.height / SS));
}

/** Feather "arrow-up-right" — what the app draws when the 24h change is positive. */
async function arrow(size, color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size * SS}" height="${size * SS}"
    viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
    <line x1="7" y1="17" x2="17" y2="7"/><polyline points="7 7 17 7 17 17"/></svg>`;
  const big = await sharp(Buffer.from(svg)).png().toBuffer();
  return measure(big, size, size);
}

async function measure(input, w, h) {
  const buf = await sharp(input).resize({ width: w, height: h, kernel: 'lanczos3' }).png().toBuffer();
  const raw = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = raw.info;
  let x0 = 1e9, y0 = 1e9, x1 = -1, y1 = -1;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    if (raw.data[(y * W + x) * C + 3] > 127) {
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    }
  }
  return { buf, x0, y0, w: x1 - x0 + 1, h: y1 - y0 + 1 };
}

const fill = (bg, width, height) =>
  sharp({ create: { width, height, channels: 4, background: bg } }).png().toBuffer();

/** place by ink box, not by buffer edge — glyph side bearings vary per string */
const atLeft = (r, left, top) => ({ input: r.buf, left: left - r.x0, top: top - r.y0 });
const atCentre = (r, cx, top) => ({ input: r.buf, left: Math.round(cx - r.x0 - r.w / 2), top: top - r.y0 });

async function write(src, out, layers) {
  const tmp = out + '.tmp';
  await sharp(path.join(DIR, src)).composite(layers).png({ compressionLevel: 9 }).toFile(path.join(DIR, tmp));
  fs.renameSync(path.join(DIR, tmp), path.join(DIR, out));
}

(async () => {
  // ---- bot controls: status bar only
  await write('contorlsbot-portrait.png', 'bot-controls-clean.png', [
    { input: await fill(PAGE_CONTROLS, STATUS_PATCH.width, STATUS_PATCH.height), ...STATUS_PATCH },
  ]);
  console.log('bot-controls-clean.png  <- status bar cleared');

  // ---- signals: status bar + the three losing figures
  const floating = await text(FLOATING_PNL, BOLD, 48, GREEN_VALUE);
  const total = await text(TOTAL_PNL, BOLD, 48, GREEN_VALUE);
  const up = await arrow(40, GREEN_PNL);
  const gain = await text(GAIN_24H, REG, 39, GREEN_PNL);

  await write('live singnals free-3.png', 'signals-clean.png', [
    // erase. Bounds sit in measured gaps: card rows 849..860 and 913..936 are
    // empty, the column dividers are at x 541..544 and 875..876, and the header
    // band 619..631 is clear above the "Funding:" line.
    { input: await fill(PAGE_SIGNALS, STATUS_PATCH.width, STATUS_PATCH.height), ...STATUS_PATCH },
    { input: await fill(CARD, 285, 66), left: 250, top: 855 },
    { input: await fill(CARD, 310, 66), left: 555, top: 855 },
    { input: await fill(PAGE_SIGNALS, 445, 53), left: 205, top: 566 },
    // redraw. Both card values share ink top y=869 and centre on their column.
    atCentre(floating, 374, 869),
    atCentre(total, 709, 869),
    atLeft(up, 214, 579),
    atLeft(gain, 262, 575),
  ]);
  console.log('signals-clean.png       <- status bar cleared, PnL rewritten');
  console.log('  ink heights (must match the originals): value %d/%d (was 42), arrow %d (was 20), 24h %d (was 35)',
    floating.h, total.h, up.h, gain.h);
})();
