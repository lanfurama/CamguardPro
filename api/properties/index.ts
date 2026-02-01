import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getProperties } from '../_lib/api-data';
import * as propertyRepo from '../_lib/repositories/propertyRepository';
import type { Property } from '../_lib/types';

/**
 * GET /api/properties - Lấy danh sách toà nhà
 * POST /api/properties - Tạo toà nhà mới
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const properties = await getProperties();
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json(properties);
    }

    if (req.method === 'POST') {
      const data = req.body as Property;
      const created = await propertyRepo.createProperty(data);
      return res.status(201).json(created);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('[api/properties]', err);
    return res.status(500).json({ error: 'Lỗi khi xử lý toà nhà' });
  }
}
