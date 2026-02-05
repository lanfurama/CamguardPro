import type { VercelRequest, VercelResponse } from '@vercel/node';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

/**
 * POST /api/cameras/test-connection — Test bằng ping ICMP
 * body: { ip: string }
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const ip = typeof (req.body as { ip?: string })?.ip === 'string'
      ? (req.body as { ip: string }).ip.trim()
      : '';
    if (!ip) return res.status(400).json({ ok: false, error: 'Thiếu địa chỉ IP' });
    if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
      return res.status(400).json({ ok: false, error: 'IP không hợp lệ' });
    }
    const isWin = process.platform === 'win32';
    const cmd = isWin ? `ping -n 1 -w 4000 ${ip}` : `ping -c 1 -W 4 ${ip}`;
    let output = '';
    try {
      const { stdout, stderr } = await execAsync(cmd);
      output = (stdout + ' ' + stderr).toLowerCase();
    } catch (e: unknown) {
      const err = e as { stdout?: string; stderr?: string };
      output = ((err.stdout ?? '') + ' ' + (err.stderr ?? '')).toLowerCase();
    }
    const isUnreachable = /unreachable|timed out|100%\s*(packet\s*)?loss|request timed out|destination host unreachable|ttl expired|transmit failed/i.test(output);
    const hasReply = /reply from|bytes=\d+\s+time=|from \d+\.\d+\.\d+\.\d+:\s+bytes=\d+/i.test(output);
    if (isUnreachable || !hasReply) {
      return res.status(200).json({ ok: false, message: 'Không ping được (host không phản hồi hoặc Destination host unreachable)' });
    }
    return res.status(200).json({ ok: true, message: 'Ping thành công' });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error('[api/cameras/test-connection]', msg);
    return res.status(500).json({ ok: false, error: msg });
  }
}
