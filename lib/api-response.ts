/**
 * Chuẩn hóa response từ API - hỗ trợ nhiều định dạng (array trực tiếp, { data }, { cameras }, { properties })
 * và chuẩn hóa snake_case -> camelCase nếu backend trả về snake_case.
 */
import type { Camera, Property } from '../types';

function toCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function objectToCamelCase<T extends Record<string, unknown>>(obj: T): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    const key = toCamel(k);
    out[key] = Array.isArray(v)
      ? v.map((item) => (item && typeof item === 'object' && !Array.isArray(item) ? objectToCamelCase(item as Record<string, unknown>) : item))
      : v && typeof v === 'object' && !Array.isArray(v) && v !== null
        ? objectToCamelCase(v as Record<string, unknown>)
        : v;
  }
  return out;
}

function normalizeCamera(row: unknown): Camera {
  if (row && typeof row === 'object') {
    const o = objectToCamelCase(row as Record<string, unknown>) as Record<string, unknown>;
    const logs = (o.logs as unknown[]) || [];
    return {
      id: String(o.id ?? ''),
      propertyId: String(o.propertyId ?? o.property_id ?? ''),
      zone: String(o.zone ?? o.zoneName ?? o.zone_name ?? ''),
      name: String(o.name ?? o.cameraName ?? o.camera_name ?? ''),
      location: String(o.location ?? ''),
      ip: String(o.ip ?? ''),
      brand: String(o.brand ?? ''),
      model: String(o.model ?? ''),
      specs: String(o.specs ?? ''),
      supplier: String(o.supplier ?? ''),
      status: (o.status as Camera['status']) ?? 'ONLINE',
      consecutiveDrops: Number(o.consecutiveDrops ?? o.consecutive_drops ?? 0),
      lastPingTime: Number(o.lastPingTime ?? o.last_ping_time ?? Date.now()),
      notes: String(o.notes ?? ''),
      logs: logs.map((l) => {
        const log = l && typeof l === 'object' ? (l as Record<string, unknown>) : {};
        return {
          id: String(log.id ?? ''),
          date: String(log.date ?? log.log_date ?? ''),
          description: String(log.description ?? ''),
          technician: log.technician != null ? String(log.technician) : undefined,
          type: (log.type as 'REPAIR' | 'CHECKUP' | 'INSTALLATION') ?? 'CHECKUP',
        };
      }),
    };
  }
  return {} as Camera;
}

function normalizeProperty(row: unknown): Property {
  if (row && typeof row === 'object') {
    const o = objectToCamelCase(row as Record<string, unknown>) as Record<string, unknown>;
    const zones = (o.zones as string[]) ?? [];
    return {
      id: String(o.id ?? ''),
      name: String(o.name ?? ''),
      address: String(o.address ?? ''),
      manager: String(o.manager ?? ''),
      zones: Array.isArray(zones) ? zones.map(String) : [],
    };
  }
  return {} as Property;
}

/** Lấy mảng cameras từ response (array | { cameras } | { data } | { result }) và chuẩn hóa từng item. */
export function parseCamerasResponse(raw: unknown): Camera[] {
  let arr: unknown[] = [];
  if (Array.isArray(raw)) arr = raw;
  else if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    if (Array.isArray(obj.cameras)) arr = obj.cameras;
    else if (Array.isArray(obj.data)) arr = obj.data;
    else if (Array.isArray(obj.result)) arr = obj.result;
  }
  return arr.map(normalizeCamera).filter((c) => c.id);
}

/** Lấy mảng properties từ response (array | { properties } | { data } | { result }) và chuẩn hóa từng item. */
export function parsePropertiesResponse(raw: unknown): Property[] {
  let arr: unknown[] = [];
  if (Array.isArray(raw)) arr = raw;
  else if (raw && typeof raw === 'object') {
    const obj = raw as Record<string, unknown>;
    if (Array.isArray(obj.properties)) arr = obj.properties;
    else if (Array.isArray(obj.data)) arr = obj.data;
    else if (Array.isArray(obj.result)) arr = obj.result;
  }
  return arr.map(normalizeProperty).filter((p) => p.id);
}
