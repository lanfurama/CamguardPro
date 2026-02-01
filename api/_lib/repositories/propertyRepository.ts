/**
 * Property repository - truy vấn properties và zones
 */
import { query } from '../db';
import type { Property } from '../types';

interface PropertyRow {
  id: string;
  name: string;
  address: string | null;
  manager: string | null;
}

interface ZoneRow {
  property_id: string;
  name: string;
}

export async function getAllProperties(): Promise<Property[]> {
  const [propsResult, zonesResult] = await Promise.all([
    query<PropertyRow>(`SELECT id, name, address, manager FROM properties ORDER BY name`),
    query<ZoneRow>(`SELECT property_id, name FROM property_zones ORDER BY property_id, name`),
  ]);

  const zonesByProperty = new Map<string, string[]>();
  for (const z of zonesResult.rows) {
    const arr = zonesByProperty.get(z.property_id) ?? [];
    arr.push(z.name);
    zonesByProperty.set(z.property_id, arr);
  }

  return propsResult.rows.map((p) => ({
    id: p.id,
    name: p.name,
    address: p.address ?? '',
    manager: p.manager ?? '',
    zones: zonesByProperty.get(p.id) ?? [],
  }));
}

function generatePropertyId(): string {
  return `PROP_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function createProperty(data: Property): Promise<Property> {
  const id = data.id || generatePropertyId();

  await query(
    `INSERT INTO properties (id, name, address, manager) VALUES ($1, $2, $3, $4)`,
    [id, data.name, data.address || null, data.manager || null]
  );

  if (data.zones?.length) {
    for (const z of data.zones) {
      await query(
        `INSERT INTO property_zones (property_id, name) VALUES ($1, $2) ON CONFLICT (property_id, name) DO NOTHING`,
        [id, z]
      );
    }
  }

  const all = await getAllProperties();
  return all.find((p) => p.id === id)!;
}

export async function updateProperty(data: Property): Promise<Property> {
  await query(
    `UPDATE properties SET name=$2, address=$3, manager=$4 WHERE id=$1`,
    [data.id, data.name, data.address || null, data.manager || null]
  );

  await query(`DELETE FROM property_zones WHERE property_id = $1`, [data.id]);

  if (data.zones?.length) {
    for (const z of data.zones) {
      await query(
        `INSERT INTO property_zones (property_id, name) VALUES ($1, $2) ON CONFLICT (property_id, name) DO NOTHING`,
        [data.id, z]
      );
    }
  }

  const all = await getAllProperties();
  return all.find((p) => p.id === data.id)!;
}

export async function deleteProperty(id: string): Promise<void> {
  await query(`DELETE FROM properties WHERE id = $1`, [id]);
}

export async function hasCamerasInProperty(propertyId: string): Promise<boolean> {
  const r = await query<{ count: string }>(
    `SELECT COUNT(*) as count FROM cameras WHERE property_id = $1`,
    [propertyId]
  );
  return parseInt(r.rows[0]?.count ?? '0', 10) > 0;
}
