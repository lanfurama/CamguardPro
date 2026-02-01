import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isDbConfigured } from '../../lib/db';
import * as cameraRepo from '../../lib/repositories/cameraRepository';
import type { Camera } from '../../types';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const id = req.query.id as string;
  if (!id) return res.status(400).json({ error: 'Thiếu id camera' });

  if (!isDbConfigured()) {
    return res.status(503).json({ error: 'Database chưa được cấu hình' });
  }

  try {
    if (req.method === 'PUT') {
      const data = req.body as Camera;
      if (data.id !== id) return res.status(400).json({ error: 'ID không khớp' });
      const updated = await cameraRepo.updateCamera(data);
      return res.status(200).json(updated);
    }

    if (req.method === 'PATCH') {
      const { notes } = req.body as { notes?: string };
      if (typeof notes !== 'string') return res.status(400).json({ error: 'Thiếu notes' });
      await cameraRepo.updateCameraNotes(id, notes);
      return res.status(200).json({ ok: true });
    }

    if (req.method === 'DELETE') {
      await cameraRepo.deleteCamera(id);
      return res.status(200).json({ ok: true });
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/cameras/[id]]', err);
    return res.status(500).json({ error: 'Lỗi xử lý yêu cầu' });
  }
}
