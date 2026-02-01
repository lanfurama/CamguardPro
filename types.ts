export type CameraStatus = 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'WARNING';

export interface MaintenanceLog {
  id: string;
  date: string;
  description: string;
  technician?: string;
  type: 'REPAIR' | 'CHECKUP' | 'INSTALLATION';
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
  specs: string; // e.g., "4K, Night Vision"
  supplier: string;
  status: CameraStatus;
  consecutiveDrops: number; // For ping simulation
  lastPingTime: number;
  logs: MaintenanceLog[];
  notes: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  manager: string;
  zones: string[]; // List of zones available in this property
}

export interface Notification {
  id: string;
  timestamp: number;
  message: string;
  type: 'ERROR' | 'INFO' | 'WARNING';
  read: boolean;
}

export interface AppState {
  cameras: Camera[];
  properties: Property[];
  notifications: Notification[];
  isSimulating: boolean;
}
