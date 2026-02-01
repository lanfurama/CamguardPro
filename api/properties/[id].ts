import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isDbConfigured } from '../../lib/db';
import * as propertyRepo from '../../lib/repositories/propertyRepository';
import type { Property } from '../../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: 'Thiếu id property' });

  if (!isDbConfigured()) {
    return res.status(503).json({ error: 'Database chưa được cấu hình' });
  }

  try {
    if (req.method === 'PUT') {
      const data = req.body as Property;
      if (data.id !== id) return res.status(400).json({ error: 'ID không khớp' });
      const updated = await propertyRepo.updateProperty(data);
      return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
      const hasCameras = await propertyRepo.hasCamerasInProperty(id);
      if (hasCameras) {
        return res.status(400).json({
          error: 'Không thể xoá toà nhà đang chứa Camera. Vui lòng di chuyển hoặc xoá camera trước.',
        });
      }
      await propertyRepo.deleteProperty(id);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/properties/[id]]', err);
    return res.status(500).json({ error: 'Lỗi xử lý yêu cầu' });
  }
}
