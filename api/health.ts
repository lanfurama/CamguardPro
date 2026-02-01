import type { VercelRequest, VercelResponse } from '@vercel/node';
import { checkConnection } from '../lib/db';

/**
 * GET /api/health - Health check + kiểm tra kết nối database
 */
export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const dbStatus = await checkConnection();

  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({
    ok: dbStatus.ok,
    service: 'CamGuard Pro API',
    timestamp: new Date().toISOString(),
    database: dbStatus.ok ? 'connected' : 'disconnected',
    ...(dbStatus.error && { databaseError: dbStatus.error }),
  });
}
