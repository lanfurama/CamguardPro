import type { VercelRequest, VercelResponse } from '@vercel/node';
import { analyzeCameraLogs } from '../../services/geminiService';
import type { Camera } from '../../types';

/** POST /api/ai/analyze-logs - Phân tích log bảo trì camera (chạy trên server → dùng được Vertex AI) */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const camera = (req.body?.camera) as Camera | undefined;
  if (!camera) {
    return res.status(400).json({ error: 'Thiếu camera' });
  }
  try {
    const text = await analyzeCameraLogs(camera);
    return res.status(200).json({ text });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[api/ai/analyze-logs]', err);
    return res.status(500).json({
      error: 'Lỗi phân tích AI',
      detail: process.env.NODE_ENV === 'development' ? message : undefined,
    });
  }
}
