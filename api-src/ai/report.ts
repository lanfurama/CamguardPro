import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateSystemReport } from '../../services/geminiService';
import type { Camera } from '../../types';

/** POST /api/ai/report - Tạo báo cáo tổng quan (chạy trên server → dùng được Vertex AI) */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const cameras = (req.body?.cameras) as Camera[] | undefined;
  if (!Array.isArray(cameras)) {
    return res.status(400).json({ error: 'Thiếu cameras (mảng)' });
  }
  try {
    const text = await generateSystemReport(cameras);
    return res.status(200).json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[api/ai/report]', err);
    return res.status(500).json({
      error: 'Lỗi tạo báo cáo AI',
      detail: process.env.NODE_ENV === 'development' ? message : undefined,
    });
  }
}
