/**
 * Bundle mỗi API handler (TS) thành 1 file .js với toàn bộ _lib inline.
 * Chạy trên Vercel build để deploy chỉ file .js, tránh lỗi ERR_MODULE_NOT_FOUND.
 * Sau khi bundle (trên Vercel) xóa source .ts và _lib để chỉ chạy .js.
 */
import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

const entries = [
  'api/health.ts',
  'api/cameras/index.ts',
  'api/cameras/[id].ts',
  'api/brands/index.ts',
  'api/brands/[name].ts',
  'api/properties/index.ts',
  'api/properties/[id].ts',
];

function rmDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    if (fs.statSync(p).isDirectory()) rmDir(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
}

function deleteApiSources() {
  const apiDir = path.join(root, 'api');
  for (const name of fs.readdirSync(apiDir)) {
    const full = path.join(apiDir, name);
    if (name === '_lib') {
      rmDir(full);
      console.log('Removed api/_lib');
    } else if (name.endsWith('.ts')) {
      fs.unlinkSync(full);
      console.log('Removed', path.relative(root, full));
    } else if (fs.statSync(full).isDirectory()) {
      for (const sub of fs.readdirSync(full)) {
        const subFull = path.join(full, sub);
        if (sub.endsWith('.ts')) {
          fs.unlinkSync(subFull);
          console.log('Removed', path.relative(root, subFull));
        }
      }
    }
  }
}

async function main() {
  for (const entry of entries) {
    const entryPath = path.join(root, entry);
    if (!fs.existsSync(entryPath)) {
      console.warn('Skip (not found):', entry);
      continue;
    }
    const outfile = path.join(root, entry.replace(/\.ts$/, '.js'));
    const outDir = path.dirname(outfile);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    await esbuild.build({
      entryPoints: [entryPath],
      bundle: true,
      platform: 'node',
      format: 'esm',
      outfile,
      external: ['@vercel/node'],
      target: 'node18',
      sourcemap: false,
    });
    console.log('Bundled:', entry, '->', path.relative(root, outfile));
  }
  if (process.env.VERCEL === '1') deleteApiSources();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
