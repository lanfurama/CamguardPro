/**
 * Brand repository - truy vấn danh sách hãng camera
 */
import { query } from '../db';

export async function getAllBrands(): Promise<string[]> {
  const result = await query<{ name: string }>(`SELECT name FROM brands ORDER BY name`);
  return result.rows.map((r) => r.name);
}

export async function addBrand(name: string): Promise<void> {
  await query(
    `INSERT INTO brands (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`,
    [name.trim()]
  );
}

export async function deleteBrand(name: string): Promise<void> {
  await query(`DELETE FROM brands WHERE name = $1`, [name]);
}
