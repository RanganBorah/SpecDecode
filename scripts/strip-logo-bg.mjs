import sharp from 'sharp';
import path from 'node:path';
import fs from 'node:fs/promises';

const LOGOS_DIR = path.resolve(process.cwd(), 'public/logos');

async function stripBackground(fileName, { mode, threshold = 12, feather = 35 }) {
  const filePath = path.join(LOGOS_DIR, fileName);
  const { data, info } = await sharp(filePath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // How far this pixel is from the background color (0 = exactly the
    // background color, larger = more clearly part of the artwork).
    const distanceFromBg = mode === 'white'
      ? 255 - Math.min(r, g, b)
      : Math.max(r, g, b);

    let alpha;
    if (distanceFromBg <= threshold) {
      alpha = 0;
    } else if (distanceFromBg >= threshold + feather) {
      alpha = 255;
    } else {
      alpha = Math.round(((distanceFromBg - threshold) / feather) * 255);
    }

    data[i + 3] = Math.min(data[i + 3], alpha);
  }

  const outPath = filePath + '.tmp.png';
  await sharp(data, { raw: { width, height, channels } }).png().toFile(outPath);
  await fs.rename(outPath, filePath);
  console.log(`Stripped ${mode} background from ${fileName}`);
}

await stripBackground('gdg-logo.png', { mode: 'white', threshold: 12, feather: 35 });
await stripBackground('devjams-logo.png', { mode: 'black', threshold: 12, feather: 35 });
