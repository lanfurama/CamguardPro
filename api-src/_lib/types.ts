/** Types dùng bởi API (bản sao từ root types.ts để Vercel đóng gói cùng serverless) */
export type CameraStatus = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'WARNING';

export interface MaintenanceLog {
  id: string;
  date: string;
  description: string;
  technician?: string;
  type: 'REPAIR' | 'CHECKUP' | 'INSTALLATION';
  errorTime?: string;
  fixedTime?: string;
  reason?: string;
  solution?: string;
}

export interface Camera {
  id: string;
  propertyId: string;
  zone: string;
  name: string;
  location: string;
  ip: string;
  brand: string;
  model: string;
  specs: string;
  supplier: string;
  status: CameraStatus;
  consecutiveDrops: number;
  lastPingTime: number;
  logs: MaintenanceLog[];
  notes: string;
  isNew?: boolean;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  manager: string;
  zones: string[];
}
