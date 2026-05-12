import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/** Re-export base64 images and CSS from the original single-file HTML. Does not overwrite assets/js/main.js. */
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const srcPath =
  process.argv[2] ??
  path.join('C:', 'Users', 'User', 'Desktop', 'jj residential', 'Diseños', 'option_2.html');

const outCss = path.join(root, 'assets', 'css', 'main.css');
const outImages = path.join(root, 'assets', 'images');

const src = fs.readFileSync(srcPath, 'utf8');

const styleMatch = src.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error('No <style> block found');
fs.writeFileSync(outCss, styleMatch[1].trimEnd() + '\n');

let html = src.slice(0, src.lastIndexOf('</html>'));
html = html.replace(/<style>[\s\S]*?<\/style>/, '');
html = html.replace(/<script>[\s\S]*?<\/script>/s, '');

let n = 0;
const memo = new Map();
// src="data:..." and url('data:...')
const dataRe = /data:image\/[^;]+;base64,([^"'\\s)]+)/g;
html = html.replace(dataRe, (fullMatch) => {
  if (memo.has(fullMatch)) return memo.get(fullMatch);
  n += 1;
  const semi = fullMatch.indexOf(';');
  const mime = fullMatch.slice(11, semi);
  const b64 = fullMatch.slice(fullMatch.indexOf(',') + 1);
  const ext =
    mime === 'jpeg' || mime === 'jpg' ? 'jpg' : mime === 'png' ? 'png' : 'webp';
  const fn = `jj-${String(n).padStart(3, '0')}.${ext}`;
  fs.writeFileSync(path.join(outImages, fn), Buffer.from(b64, 'base64'));
  const rel = `assets/images/${fn}`;
  memo.set(fullMatch, rel);
  return rel;
});

console.log('Wrote', outCss, 'images:', n);
