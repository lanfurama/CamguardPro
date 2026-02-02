import { Camera, Property } from './types';

export const PROPERTIES: Property[] = [
  { 
    id: 'PROP_001', 
    name: 'Toà nhà Sunrise Tower', 
    address: '123 Nguyễn Hữu Thọ, Q7, TP.HCM', 
    manager: 'Nguyễn Văn A',
    zones: ['Sảnh chính', 'Hầm gửi xe', 'Hành lang Tầng 1', 'Thang máy']
  },
  { 
    id: 'PROP_002', 
    name: 'Kho vận Tân Bình', 
    address: '45 Cộng Hoà, Tân Bình, TP.HCM', 
    manager: 'Trần Thị B',
    zones: ['Kho A', 'Kho B', 'Khu đóng gói', 'Hàng rào', 'Cổng bảo vệ']
  },
  { 
    id: 'PROP_003', 
    name: 'Biệt thự Thảo Điền', 
    address: 'Đường 66, Thảo Điền, Thủ Đức', 
    manager: 'Lê Văn C',
    zones: ['Sân vườn', 'Phòng khách', 'Cổng sau', 'Gara']
  },
];

export const DEFAULT_BRANDS = ['Hikvision', 'Dahua', 'KBVision', 'Ezviz', 'Imou', 'Panasonic', 'Sony', 'Axis'];

/** Map Status từ Excel (Check list Camera) sang Status app */
export const STATUS_EXCEL_MAP: Record<string, 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'WARNING'> = {
  ok: 'ONLINE',
  OK: 'ONLINE',
  Ok: 'ONLINE',
  pending: 'WARNING',
  Pending: 'WARNING',
  done: 'ONLINE',
  Done: 'ONLINE',
  maintenance: 'MAINTENANCE',
  repair: 'MAINTENANCE',
  error: 'WARNING',
  lỗi: 'WARNING',
  mất: 'WARNING',
  nghi: 'WARNING',
};
/** Gợi ý: nếu Status Excel không khớp, mô tả chi tiết (VD "Mất hồng ngoại") nên ghi vào Ghi chú (Notes). */

export const INITIAL_CAMERAS: Camera[] = [
  {
    id: 'CAM_001',
    propertyId: 'PROP_001',
    zone: 'Sảnh chính',
    name: 'Cam Sảnh 1',
    location: 'Cổng ra vào',
    ip: '192.168.1.10',
    brand: 'Hikvision',
    model: 'DS-2CD2043G0-I',
    specs: '4MP, IR 30m',
    supplier: 'Phúc Anh Smart',
    status: 'ONLINE',
    consecutiveDrops: 0,
    lastPingTime: Date.now(),
    logs: [
      { id: 'L1', date: '2023-10-15', description: 'Thay nguồn adapter', type: 'REPAIR', technician: 'KTV Nam' }
    ],
    notes: 'Camera quan sát cửa chính'
  },
  {
    id: 'CAM_002',
    propertyId: 'PROP_001',
    zone: 'Hầm gửi xe',
    name: 'Cam Hầm B1-01',
    location: 'Khu vực xe máy',
    ip: '192.168.1.11',
    brand: 'Dahua',
    model: 'IPC-HFW2431S',
    specs: '4MP, Starlight',
    supplier: 'Phúc Anh Smart',
    status: 'ONLINE',
    consecutiveDrops: 0,
    lastPingTime: Date.now(),
    logs: [],
    notes: 'Ánh sáng yếu'
  },
  {
    id: 'CAM_003',
    propertyId: 'PROP_002',
    zone: 'Kho A',
    name: 'Cam Kho A-01',
    location: 'Cửa nhập hàng',
    ip: '10.0.0.50',
    brand: 'KBVision',
    model: 'KX-2011S4',
    specs: '2MP, IP67',
    supplier: 'Viễn Thông A',
    status: 'MAINTENANCE',
    consecutiveDrops: 0,
    lastPingTime: Date.now(),
    logs: [
      { id: 'L2', date: '2023-11-01', description: 'Bảo trì định kỳ, vệ sinh ống kính', type: 'CHECKUP' }
    ],
    notes: 'Đang chờ linh kiện thay thế'
  },
  {
    id: 'CAM_004',
    propertyId: 'PROP_002',
    zone: 'Hàng rào',
    name: 'Cam Chu vi 01',
    location: 'Góc Đông Bắc',
    ip: '10.0.0.51',
    brand: 'Hikvision',
    model: 'PTZ-Outdoor',
    specs: 'PTZ 25x Zoom',
    supplier: 'Viễn Thông A',
    status: 'ONLINE',
    consecutiveDrops: 0,
    lastPingTime: Date.now(),
    logs: [],
    notes: 'Quay quét tự động'
  },
   {
    id: 'CAM_005',
    propertyId: 'PROP_003',
    zone: 'Sân vườn',
    name: 'Cam Hồ bơi',
    location: 'Cạnh hồ bơi',
    ip: '192.168.100.5',
    brand: 'Ezviz',
    model: 'C8C',
    specs: 'Wifi, Color Night Vision',
    supplier: 'Tự lắp đặt',
    status: 'ONLINE',
    consecutiveDrops: 0,
    lastPingTime: Date.now(),
    logs: [],
    notes: ''
  }
];
