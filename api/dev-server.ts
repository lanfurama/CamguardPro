/**
 * Dev server - mô phỏng đầy đủ API khi chạy `npm run dev` (Vite)
 */
import type { Connect } from 'vite';
import { IncomingMessage } from 'http';
import { checkConnection, isDbConfigured } from '../lib/db';
import { getCameras, getProperties, getBrands } from '../lib/api-data';
import * as cameraRepo from '../lib/repositories/cameraRepository';
import * as propertyRepo from '../lib/repositories/propertyRepository';
import * as brandRepo from '../lib/repositories/brandRepository';
import type { Camera, Property } from '../types';

function jsonRes(res: any, data: unknown, status = 200) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

async function parseBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(Buffer.from(chunk));
  try {
    return JSON.parse(Buffer.concat(chunks).toString() || '{}');
  } catch {
    return {};
  }
}

/** Middleware parse JSON body */
const bodyParser: Connect.NextHandleFunction = (req, res, next) => {
  if (['POST', 'PUT', 'PATCH'].includes(req.method || '')) {
    parseBody(req).then((body) => {
      (req as any).body = body;
      next();
    }).catch(() => {
      (req as any).body = {};
      next();
    });
  } else {
    (req as any).body = {};
    next();
  }
};

export const apiMiddleware: Connect.NextHandleFunction = async (req, res, next) => {
  const url = req.url || '';
  if (!url.startsWith('/api/')) return next();

  await new Promise<void>((resolve) => bodyParser(req, res, () => resolve()));

  const path = url.split('?')[0];
  const body = (req as any).body || {};

  try {
    // GET /api/health
    if ((req.method === 'GET') && (path === '/api/health' || path.startsWith('/api/health?'))) {
      const dbStatus = await checkConnection();
      return jsonRes(res, {
        ok: dbStatus.ok,
        service: 'CamGuard Pro API',
        timestamp: new Date().toISOString(),
        database: dbStatus.ok ? 'connected' : 'disconnected',
        ...(dbStatus.error && { databaseError: dbStatus.error }),
      });
    }

    if (!isDbConfigured()) {
      return jsonRes(res, { error: 'Database chưa được cấu hình' }, 503);
    }

    // ===== CAMERAS =====
    const camIdMatch = path.match(/^\/api\/cameras\/([^/]+)$/);
    if (camIdMatch) {
      const id = decodeURIComponent(camIdMatch[1]);
      if (req.method === 'PUT') {
        const data = body as Camera;
        if (data.id !== id) return jsonRes(res, { error: 'ID không khớp' }, 400);
        const updated = await cameraRepo.updateCamera(data);
        return jsonRes(res, updated);
      }
      if (req.method === 'PATCH') {
        const { notes } = body;
        if (typeof notes !== 'string') return jsonRes(res, { error: 'Thiếu notes' }, 400);
        await cameraRepo.updateCameraNotes(id, notes);
        return jsonRes(res, { ok: true });
      }
      if (req.method === 'DELETE') {
        await cameraRepo.deleteCamera(id);
        return jsonRes(res, { ok: true });
      }
      return jsonRes(res, { error: 'Method not allowed' }, 405);
    }

    if (path === '/api/cameras' || path.startsWith('/api/cameras?')) {
      if (req.method === 'GET') {
        const cameras = await getCameras();
        return jsonRes(res, cameras);
      }
      if (req.method === 'POST') {
        if (body.cameras?.length) {
          const created = await cameraRepo.importCameras(body.cameras);
          return jsonRes(res, created, 201);
        }
        if (body.camera) {
          const created = await cameraRepo.createCamera(body.camera);
          return jsonRes(res, created, 201);
        }
        return jsonRes(res, { error: 'Thiếu camera hoặc cameras' }, 400);
      }
    }

    // ===== PROPERTIES =====
    const propIdMatch = path.match(/^\/api\/properties\/([^/]+)$/);
    if (propIdMatch) {
      const id = decodeURIComponent(propIdMatch[1]);
      if (req.method === 'PUT') {
        const data = body as Property;
        if (data.id !== id) return jsonRes(res, { error: 'ID không khớp' }, 400);
        const updated = await propertyRepo.updateProperty(data);
        return jsonRes(res, updated);
      }
      if (req.method === 'DELETE') {
        const hasCameras = await propertyRepo.hasCamerasInProperty(id);
        if (hasCameras) return jsonRes(res, { error: 'Không thể xoá toà nhà đang chứa Camera.' }, 400);
        await propertyRepo.deleteProperty(id);
        return jsonRes(res, { ok: true });
      }
      return jsonRes(res, { error: 'Method not allowed' }, 405);
    }

    if (path === '/api/properties' || path.startsWith('/api/properties?')) {
      if (req.method === 'GET') {
        const properties = await getProperties();
        return jsonRes(res, properties);
      }
      if (req.method === 'POST') {
        const created = await propertyRepo.createProperty(body as Property);
        return jsonRes(res, created, 201);
      }
    }

    // ===== BRANDS =====
    const brandNameMatch = path.match(/^\/api\/brands\/([^/]+)$/);
    if (brandNameMatch) {
      const name = decodeURIComponent(brandNameMatch[1]);
      if (req.method === 'DELETE') {
        await brandRepo.deleteBrand(name);
        return jsonRes(res, { ok: true });
      }
      return jsonRes(res, { error: 'Method not allowed' }, 405);
    }

    if (path === '/api/brands' || path.startsWith('/api/brands?')) {
      if (req.method === 'GET') {
        const brands = await getBrands();
        return jsonRes(res, brands);
      }
      if (req.method === 'POST') {
        const { name } = body;
        if (!name?.trim()) return jsonRes(res, { error: 'Thiếu tên hãng' }, 400);
        await brandRepo.addBrand(name.trim());
        const brands = await getBrands();
        return jsonRes(res, brands, 201);
      }
    }

    jsonRes(res, { error: 'Not found' }, 404);
  } catch (err) {
    console.error('[api/dev-server]', err);
    jsonRes(res, { error: 'Internal server error' }, 500);
  }
};
