/**
 * Camera repository - truy vấn database
 * Dùng view v_cameras_full đã có sẵn zone_name
 */
import { query } from '../db';
import type { Camera } from '../../types';

interface CameraRow {
  id: string;
  property_id: string;
  zone_name: string;
  camera_name: string;
  location: string | null;
  ip: string;
  brand: string;
  model: string | null;
  specs: string | null;
  supplier: string | null;
  status: string;
  consecutive_drops: number;
  last_ping_time: string;
  notes: string | null;
  is_new?: boolean;
}

interface LogRow {
  id: string;
  camera_id: string;
  log_date: string;
  error_time: string | Date | null;
  fixed_time: string | Date | null;
  description: string;
  reason: string | null;
  solution: string | null;
  technician: string | null;
  type: string;
}

function mapToCamera(row: CameraRow, logs: LogRow[]): Camera {
  return {
    id: row.id,
    propertyId: row.property_id,
    zone: row.zone_name,
    name: row.camera_name,
    location: row.location ?? '',
    ip: row.ip,
    brand: row.brand,
    model: row.model ?? '',
    specs: row.specs ?? '',
    supplier: row.supplier ?? '',
    status: row.status as Camera['status'],
    consecutiveDrops: row.consecutive_drops,
    lastPingTime: Number(row.last_ping_time),
    notes: row.notes ?? '',
    isNew: row.is_new ?? false,
    logs: logs.map((l) => ({
      id: l.id,
      date: l.log_date,
      description: l.description,
      technician: l.technician ?? undefined,
      type: l.type as 'REPAIR' | 'CHECKUP' | 'INSTALLATION',
      errorTime: l.error_time != null ? (l.error_time instanceof Date ? l.error_time.toISOString() : String(l.error_time)) : undefined,
      fixedTime: l.fixed_time != null ? (l.fixed_time instanceof Date ? l.fixed_time.toISOString() : String(l.fixed_time)) : undefined,
      reason: l.reason ?? undefined,
      solution: l.solution ?? undefined,
    })),
  };
}

/** Row từ view v_cameras_full hoặc từ query fallback (cameras + JOIN) */
interface CameraRowLike {
  id: string;
  property_id: string;
  zone_name: string;
  camera_name: string;
  location: string | null;
  ip: string;
  brand: string;
  model: string | null;
  specs: string | null;
  supplier: string | null;
  status: string;
  consecutive_drops: number;
  last_ping_time: string | number;
  notes: string | null;
  is_new?: boolean;
}

async function fetchCameraRows(): Promise<CameraRowLike[]> {
  try {
    const result = await query<CameraRowLike>(
      `SELECT id, property_id, zone_name, camera_name, location, ip, brand, model, specs, supplier, status, consecutive_drops, last_ping_time, notes, is_new
       FROM v_cameras_full ORDER BY camera_name`
    );
    if (result.rows.length > 0) return result.rows;
    const direct = await query<CameraRowLike>(
      `SELECT c.id, c.property_id, COALESCE(pz.name, '') AS zone_name, c.name AS camera_name, c.location, c.ip, c.brand, c.model, c.specs, c.supplier, c.status, c.consecutive_drops, c.last_ping_time, c.notes, c.is_new
       FROM cameras c
       LEFT JOIN property_zones pz ON pz.id = c.zone_id
       ORDER BY c.name`
    );
    return direct.rows;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes('v_cameras_full') || msg.includes('does not exist') || msg.includes('relation')) {
      const fallback = await query<CameraRowLike>(
        `SELECT c.id, c.property_id, COALESCE(pz.name, '') AS zone_name, c.name AS camera_name, c.location, c.ip, c.brand, c.model, c.specs, c.supplier, c.status, c.consecutive_drops, c.last_ping_time, c.notes, c.is_new
         FROM cameras c
         LEFT JOIN property_zones pz ON pz.id = c.zone_id
         ORDER BY c.name`
      );
      return fallback.rows;
    }
    throw err;
  }
}

export async function getAllCameras(): Promise<Camera[]> {
  const rows = await fetchCameraRows();
  if (rows.length === 0) return [];

  const cameraIds = rows.map((r) => r.id);
  const logsResult = await query<LogRow>(
    `SELECT id, camera_id, log_date::text, error_time, fixed_time, description, reason, solution, technician, type FROM maintenance_logs WHERE camera_id = ANY($1) ORDER BY log_date DESC`,
    [cameraIds]
  );

  const logsByCamera = new Map<string, LogRow[]>();
  for (const log of logsResult.rows) {
    const arr = logsByCamera.get(log.camera_id) ?? [];
    arr.push(log);
    logsByCamera.set(log.camera_id, arr);
  }

  return rows.map((row) =>
    mapToCamera(
      {
        ...row,
        last_ping_time: String(row.last_ping_time ?? ''),
      } as CameraRow,
      logsByCamera.get(row.id) ?? []
    )
  );
}

/** Lấy hoặc tạo zone_id từ property_id + zone name */
async function getOrCreateZoneId(propertyId: string, zoneName: string): Promise<number> {
  let result = await query<{ id: number }>(
    `SELECT id FROM property_zones WHERE property_id = $1 AND name = $2`,
    [propertyId, zoneName]
  );
  if (result.rows.length > 0) return result.rows[0].id;

  result = await query<{ id: number }>(
    `INSERT INTO property_zones (property_id, name) VALUES ($1, $2) ON CONFLICT (property_id, name) DO UPDATE SET name = $2 RETURNING id`,
    [propertyId, zoneName]
  );
  return result.rows[0].id;
}

/** Tạo ID mới cho camera */
function generateCameraId(): string {
  return `CAM_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export async function createCamera(data: Camera): Promise<Camera> {
  const id = data.id || generateCameraId();
  const zoneId = await getOrCreateZoneId(data.propertyId, data.zone);

  await query(
    `INSERT INTO cameras (id, property_id, zone_id, name, location, ip, brand, model, specs, supplier, status, consecutive_drops, last_ping_time, notes, is_new)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)`,
    [
      id,
      data.propertyId,
      zoneId,
      data.name,
      data.location || null,
      data.ip,
      data.brand,
      data.model || null,
      data.specs || null,
      data.supplier || null,
      data.status || 'ONLINE',
      data.consecutiveDrops ?? 0,
      data.lastPingTime ?? Date.now(),
      data.notes || null,
      data.isNew ?? false,
    ]
  );

  if (data.logs?.length) {
    const today = new Date().toISOString().slice(0, 10);
    for (let i = 0; i < data.logs.length; i++) {
      const log = data.logs[i];
      const logId = log.id || `LOG_${id}_${i}`;
      let logDate = (log.date || '').toString().trim();
      if (!/^\d{4}-\d{2}-\d{2}$/.test(logDate)) logDate = today;
      await query(
        `INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
         VALUES ($1, $2, $3::date, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO NOTHING`,
        [
          logId,
          id,
          logDate,
          log.errorTime ? new Date(log.errorTime).toISOString() : null,
          log.fixedTime ? new Date(log.fixedTime).toISOString() : null,
          log.description || '',
          log.reason ?? null,
          log.solution ?? null,
          log.technician || null,
          log.type || 'CHECKUP',
        ]
      );
    }
  }

  const all = await getAllCameras();
  return all.find((c) => c.id === id)!;
}

export async function updateCamera(data: Camera): Promise<Camera> {
  const zoneId = await getOrCreateZoneId(data.propertyId, data.zone);

  await query(
    `UPDATE cameras SET property_id=$2, zone_id=$3, name=$4, location=$5, ip=$6, brand=$7, model=$8, specs=$9, supplier=$10, status=$11, consecutive_drops=$12, last_ping_time=$13, notes=$14, is_new=$15 WHERE id=$1`,
    [
      data.id,
      data.propertyId,
      zoneId,
      data.name,
      data.location || null,
      data.ip,
      data.brand,
      data.model || null,
      data.specs || null,
      data.supplier || null,
      data.status,
      data.consecutiveDrops ?? 0,
      data.lastPingTime ?? Date.now(),
      data.notes || null,
      data.isNew ?? false,
    ]
  );

  const all = await getAllCameras();
  return all.find((c) => c.id === data.id)!;
}

export async function deleteCamera(id: string): Promise<void> {
  await query(`DELETE FROM cameras WHERE id = $1`, [id]);
}

export async function updateCameraNotes(id: string, notes: string): Promise<void> {
  await query(`UPDATE cameras SET notes = $2 WHERE id = $1`, [id, notes]);
}

export async function importCameras(cameras: Camera[]): Promise<Camera[]> {
  const created: Camera[] = [];
  for (const cam of cameras) {
    const c = await createCamera({ ...cam, id: cam.id || undefined });
    created.push(c);
  }
  return created;
}
