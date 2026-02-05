/**
 * API client - gọi backend API
 */
import type { Camera, Property } from '../types';

const BASE = ''; // Same origin

async function fetchApi<T>(
  path: string,
  options?: RequestInit & { body?: unknown }
): Promise<T> {
  const { body, ...opts } = options || {};
  const init: RequestInit = {
    ...opts,
    headers: {
      'Content-Type': 'application/json',
      ...opts.headers,
    },
  };
  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE}${path}`, init);
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const msg = (data as { error?: string })?.error || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return data as T;
}

// ===== Cameras =====
export const camerasApi = {
  getAll: () => fetchApi<Camera[]>('/api/cameras'),
  create: (camera: Camera) => fetchApi<Camera>('/api/cameras', { method: 'POST', body: { camera } }),
  update: (camera: Camera) =>
    fetchApi<Camera>(`/api/cameras/${encodeURIComponent(camera.id)}`, {
      method: 'PUT',
      body: camera,
    }),
  delete: (id: string) =>
    fetchApi<{ ok: boolean }>(`/api/cameras/${encodeURIComponent(id)}`, { method: 'DELETE' }),
  deleteByProperty: (propertyId: string) =>
    fetchApi<{ deleted: number }>(`/api/cameras?propertyId=${encodeURIComponent(propertyId)}`, { method: 'DELETE' }),
  updateNotes: (id: string, notes: string) =>
    fetchApi<{ ok: boolean }>(`/api/cameras/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: { notes },
    }),
  import: (cameras: Camera[]) =>
    fetchApi<Camera[]>('/api/cameras', { method: 'POST', body: { cameras } }),
  testConnection: (ip: string) =>
    fetchApi<{ ok: boolean; port?: number; message?: string; error?: string }>('/api/cameras/test-connection', {
      method: 'POST',
      body: { ip },
    }),
};

// ===== Properties =====
export const propertiesApi = {
  getAll: () => fetchApi<Property[]>('/api/properties'),
  create: (property: Property) =>
    fetchApi<Property>('/api/properties', { method: 'POST', body: property }),
  update: (property: Property) =>
    fetchApi<Property>(`/api/properties/${encodeURIComponent(property.id)}`, {
      method: 'PUT',
      body: property,
    }),
  delete: (id: string) =>
    fetchApi<{ ok: boolean }>(`/api/properties/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    }),
};

// ===== Brands =====
export const brandsApi = {
  getAll: () => fetchApi<string[]>('/api/brands'),
  add: (name: string) =>
    fetchApi<string[]>('/api/brands', { method: 'POST', body: { name } }),
  delete: (name: string) =>
    fetchApi<{ ok: boolean }>(`/api/brands/${encodeURIComponent(name)}`, {
      method: 'DELETE',
    }),
};

// ===== Health =====
export const healthApi = {
  check: () =>
    fetchApi<{ ok: boolean; database?: string }>('/api/health'),
};
