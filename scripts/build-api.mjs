/**
 * Bundle mỗi API handler từ api-src/*.ts thành api/*.js (chỉ .js).
 * Repo chỉ có api-src/ → Vercel không thấy api/*.ts, không conflict.
 */
import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const apiOutDir = path.join(root, 'api');

const entries = [
  'api-src/health.ts',
  'api-src/cameras/index.ts',
  'api-src/cameras/[id].ts',
  'api-src/cameras/test-connection.ts',
  'api-src/brands/index.ts',
  'api-src/brands/[name].ts',
  'api-src/properties/index.ts',
  'api-src/properties/[id].ts',
  'api-src/ai/report.ts',
  'api-src/ai/analyze-logs.ts',
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

async function main() {
  if (fs.existsSync(apiOutDir)) rmDir(apiOutDir);
  fs.mkdirSync(apiOutDir, { recursive: true });

  for (const entry of entries) {
    const entryPath = path.join(root, entry);
    if (!fs.existsSync(entryPath)) {
      console.warn('Skip (not found):', entry);
      continue;
    }
    const relOut = entry.replace(/^api-src\//, '').replace(/\.ts$/, '.js');
    const outfile = path.join(apiOutDir, relOut);
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
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
