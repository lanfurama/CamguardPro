import 'dotenv/config';

/**
 * PostgreSQL connection pool - tối ưu cho cả dev và Vercel serverless
 * Dùng singleton để tránh tạo quá nhiều connection
 *
 * Hỗ trợ 2 cách cấu hình:
 * 1. DATABASE_URL=postgresql://user:pass@host:port/db
 * 2. DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
 */
import pg from 'pg';

const { Pool } = pg;

declare global {
  // eslint-disable-next-line no-var
  var __dbPool: pg.Pool | undefined;
}

function buildConnectionString(): string | null {
  // Cách 1: DATABASE_URL
  const url = process.env.DATABASE_URL;
  if (url && !url.includes('PLACEHOLDER') && url.includes('@')) {
    return url;
  }

  // Cách 2: Biến rời
  const host = process.env.DB_HOST;
  const port = process.env.DB_PORT || '5432';
  const name = process.env.DB_NAME;
  const user = process.env.DB_USER;
  const password = process.env.DB_PASSWORD;

  if (host && name && user && password) {
    const useSsl =
      process.env.DB_SSL !== 'false' &&
      host !== 'localhost' &&
      host !== '127.0.0.1';
    const ssl = useSsl ? '?sslmode=require' : '';
    return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${encodeURIComponent(name)}${ssl}`;
  }
  return null;
}

function getPool(): pg.Pool | null {
  const url = buildConnectionString();
  if (!url) return null;

  if (!global.__dbPool) {
    global.__dbPool = new Pool({
      connectionString: url,
      ssl: url.includes('sslmode=require') ? { rejectUnauthorized: false } : false,
      max: process.env.NODE_ENV === 'production' ? 2 : 10,
      idleTimeoutMillis: 10000,
      connectionTimeoutMillis: 5000,
    });
  }
  return global.__dbPool;
}

export async function query<T = pg.QueryResultRow>(
  text: string,
  params?: unknown[]
): Promise<pg.QueryResult<T>> {
  const pool = getPool();
  if (!pool) throw new Error('DATABASE_URL chưa được cấu hình');

  const client = await pool.connect();
  try {
    return await client.query<T>(text, params);
  } finally {
    client.release();
  }
}

export async function checkConnection(): Promise<{ ok: boolean; error?: string }> {
  const pool = getPool();
  if (!pool) {
    return { ok: false, error: 'DATABASE_URL chưa cấu hình' };
  }

  try {
    await pool.query('SELECT 1');
    return { ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

export function isDbConfigured(): boolean {
  return buildConnectionString() !== null;
}
