import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getBrands } from '../_lib/api-data';
import * as brandRepo from '../_lib/repositories/brandRepository';

/**
 * GET /api/brands - Lấy danh sách hãng camera
 * POST /api/brands - Thêm hãng mới (body: { name: string })
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const brands = await getBrands();
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(brands);
    }

    if (req.method === 'POST') {
      const { name } = req.body as { name?: string };
      if (!name?.trim()) return res.status(400).json({ error: 'Thiếu tên hãng' });
      await brandRepo.addBrand(name.trim());
      const brands = await getBrands();
      return res.status(201).json(brands);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/brands]', err);
    return res.status(500).json({ error: 'Lỗi khi xử lý hãng camera' });
  }
}

