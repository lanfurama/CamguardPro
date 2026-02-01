/**
 * Bundle mỗi API handler (TS) thành 1 file .js với toàn bộ _lib inline.
 * Output vào .api-build/ để tránh conflict path với api/*.ts.
 * Trên Vercel: xóa hết api/, rồi copy .api-build/ -> api/ để chỉ còn .js.
 */
import * as esbuild from 'esbuild';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const apiBuildDir = path.join(root, '.api-build');

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

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const name of fs.readdirSync(src)) {
    const srcPath = path.join(src, name);
    const destPath = path.join(dest, name);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function replaceApiWithBuild() {
  const apiDir = path.join(root, 'api');
  for (const name of fs.readdirSync(apiDir)) {
    const full = path.join(apiDir, name);
    if (fs.statSync(full).isDirectory()) rmDir(full);
    else fs.unlinkSync(full);
  }
  copyDir(apiBuildDir, apiDir);
  rmDir(apiBuildDir);
  console.log('Replaced api/ with bundled .js only');
}

async function main() {
  if (fs.existsSync(apiBuildDir)) rmDir(apiBuildDir);
  fs.mkdirSync(apiBuildDir, { recursive: true });

  for (const entry of entries) {
    const entryPath = path.join(root, entry);
    if (!fs.existsSync(entryPath)) {
      console.warn('Skip (not found):', entry);
      continue;
    }
    const relOut = entry.replace(/^api\//, '').replace(/\.ts$/, '.js');
    const outfile = path.join(apiBuildDir, relOut);
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

  if (process.env.VERCEL === '1') replaceApiWithBuild();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
