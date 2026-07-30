/*
  Utility: generate-icons.js
  - Requires: `npm install sharp` in the `client` folder
  - Place your source PNG at: client/public/logo.png
  - Run: `node client/scripts/generate-icons.js`
  - Output: client/public/icons/{icon-32.png, icon-192.png, apple-touch-icon.png}

  Note: Creating an ICO file is not handled here; use ImageMagick or an online tool if you need favicon.ico.
*/

import path from "path";
import fs from "fs";
import sharp from "sharp";

const root = path.resolve(".");
const src = path.join(root, "public", "logo.png");
const outDir = path.join(root, "public", "icons");

if (!fs.existsSync(src)) {
  console.error("Source image not found:", src);
  console.error("Place your PNG at client/public/logo.png and try again.");
  process.exit(1);
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const sizes = [
  { name: "icon-32.png", size: 32 },
  { name: "icon-192.png", size: 192 },
  { name: "apple-touch-icon.png", size: 180 },
];

(async () => {
  try {
    for (const s of sizes) {
      const out = path.join(outDir, s.name);
      await sharp(src).resize({ width: s.size, height: s.size, fit: "cover" }).png().toFile(out);
      console.log("Written:", out);
    }
    console.log("Done. Add a favicon.ico using ImageMagick if needed.");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
