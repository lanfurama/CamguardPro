/**
 * Service layer - lấy dữ liệu từ database
 * File nằm trong api/_lib để Vercel đóng gói cùng serverless.
 */
import { isDbConfigured } from './db';
import * as cameraRepo from './repositories/cameraRepository';
import * as propertyRepo from './repositories/propertyRepository';
import * as brandRepo from './repositories/brandRepository';
import type { Camera, Property } from './types';

export async function getCameras(): Promise<Camera[]> {
  if (!isDbConfigured()) return [];
  try {
    return await cameraRepo.getAllCameras();
  } catch (err) {
    console.error('[api-data] getCameras error:', err);
    throw err;
  }
}

export async function getProperties(): Promise<Property[]> {
  if (!isDbConfigured()) return [];
  try {
    return await propertyRepo.getAllProperties();
  } catch (err) {
    console.error('[api-data] getProperties error:', err);
    throw err;
  }
}

export async function getBrands(): Promise<string[]> {
  if (!isDbConfigured()) return [];
  try {
    return await brandRepo.getAllBrands();
  } catch (err) {
    console.error('[api-data] getBrands error:', err);
    throw err;
  }
}
