import type { VercelRequest, VercelResponse } from '@vercel/node';
import { isDbConfigured } from '../../lib/db';
import * as brandRepo from '../../lib/repositories/brandRepository';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const name = req.query.name as string;
  if (!name) return res.status(400).json({ error: 'Thiếu tên hãng' });

  if (!isDbConfigured()) {
    return res.status(503).json({ error: 'Database chưa được cấu hình' });
  }

  try {
    if (req.method === 'DELETE') {
      await brandRepo.deleteBrand(decodeURIComponent(name));
      return res.status(200).json({ ok: true });
    }
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/brands/[name]]', err);
    return res.status(500).json({ error: 'Lỗi khi xoá hãng' });
  }
}
