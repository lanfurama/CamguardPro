import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getCameras } from '../_lib/api-data';
import * as cameraRepo from '../_lib/repositories/cameraRepository';
import type { Camera } from '../_lib/types';

/**
 * GET /api/cameras - Lấy danh sách camera
 * POST /api/cameras - Tạo mới hoặc import (body: { cameras?: Camera[], camera?: Camera })
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const cameras = await getCameras();
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(cameras);
    }

    if (req.method === 'POST') {
      const body = req.body as { cameras?: Camera[]; camera?: Camera };
      if (body.cameras?.length) {
        const created = await cameraRepo.importCameras(body.cameras);
        return res.status(201).json(created);
      }
      if (body.camera) {
        const created = await cameraRepo.createCamera(body.camera);
        return res.status(201).json(created);
      }
      return res.status(400).json({ error: 'Thiếu camera hoặc cameras' });
    }

    if (req.method === 'DELETE') {
      const propertyId = (req.query?.propertyId as string)?.trim();
      if (!propertyId) return res.status(400).json({ error: 'Thiếu propertyId' });
      const deleted = await cameraRepo.deleteCamerasByProperty(propertyId);
      return res.status(200).json({ deleted });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[api/cameras]', message, err);
    return res.status(500).json({
      error: 'Lỗi khi xử lý camera',
      hint:
        'Kiểm tra trên Vercel: Project → Settings → Environment Variables đã thêm DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD (hoặc DATABASE_URL). Database phải cho phép kết nối từ internet.',
      detail: process.env.NODE_ENV === 'development' ? message : undefined,
    });
  }
}
