/**
 * Builds public/images/security-lock.png from the sec3.1.png download.
 *
 *   node scripts/build-security-art.js
 *
 * Re-runnable: it always starts from the original, so running it twice gives
 * the same result and you can edit the numbers below and just run it again.
 *
 * sec3.1.png is a stock template. Its left third is not artwork — it is the
 * template's own placeholder label, with "VECTOR", "CYBER SECURITY
 * TECHNOLOGY" and "ABSTRACT BACKGROUND" set into the pixels. Shipping that
 * would put a stock-art watermark on the marketing page, so the crop keeps
 * only the lock-and-nodes assembly on the right.
 *
 * The window was measured off the source: the label panel ends and the
 * lock's outer glow begins around x=832, and the assembly spans y=112..834.
 * The trim() pass afterwards removes whatever transparent margin is left, so
 * the exported file has no padding of its own and the CSS can size it
 * directly.
 */
const sharp = require('sharp');
const path = require('path');

const DIR = path.join(__dirname, '..', 'public', 'images');
const SRC = path.join(DIR, 'sec3.1.png');
const OUT = path.join(DIR, 'security-lock.png');

/** the lock-and-nodes assembly, without the template's label panel */
const WINDOW = { left: 832, top: 112, width: 825, height: 722 };

sharp(SRC)
  .extract(WINDOW)
  .png()
  .toBuffer()
  // trim is a second pass on purpose: sharp cannot extract and trim in one
  .then((buf) => sharp(buf).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile(OUT))
  .then((info) => {
    console.log(`security-lock.png  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)}kB`);
  })
  .catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
