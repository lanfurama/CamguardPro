-- ============================================================
-- CamguardPro - PostgreSQL Schema
-- Tối ưu cho mở rộng, chuẩn hóa, có audit và index
-- Chạy thủ công trong PostgreSQL (psql hoặc pgAdmin)
-- ============================================================

-- Enable UUID extension (optional, for future use)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================
CREATE TYPE camera_status AS ENUM ('ONLINE', 'OFFLINE', 'MAINTENANCE', 'WARNING');
CREATE TYPE maintenance_log_type AS ENUM ('REPAIR', 'CHECKUP', 'INSTALLATION');
CREATE TYPE notification_type AS ENUM ('ERROR', 'INFO', 'WARNING');

-- ============================================================
-- TABLES
-- ============================================================

-- 1. Properties (Toà nhà / Cơ sở)
CREATE TABLE properties (
  id           VARCHAR(32) PRIMARY KEY,
  name         VARCHAR(255) NOT NULL,
  address      TEXT,
  manager      VARCHAR(255),
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE properties IS 'Toà nhà, kho, biệt thự - đơn vị quản lý camera';

-- 2. Property Zones (Khu vực trong từng toà nhà)
CREATE TABLE property_zones (
  id          SERIAL PRIMARY KEY,
  property_id VARCHAR(32) NOT NULL REFERENCES properties(id) ON DELETE CASCADE,
  name        VARCHAR(255) NOT NULL,
  UNIQUE(property_id, name)
);

CREATE INDEX idx_property_zones_property ON property_zones(property_id);
COMMENT ON TABLE property_zones IS 'Các khu vực trong một property (sảnh, hầm, kho...)';

-- 3. Brands (Hãng camera - cấu hình)
CREATE TABLE brands (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

COMMENT ON TABLE brands IS 'Danh sách hãng camera hỗ trợ trong form';

-- 4. Cameras
CREATE TABLE cameras (
  id                 VARCHAR(32) PRIMARY KEY,
  property_id        VARCHAR(32) NOT NULL REFERENCES properties(id) ON DELETE RESTRICT,
  zone_id            INTEGER NOT NULL REFERENCES property_zones(id) ON DELETE RESTRICT,
  name               VARCHAR(255) NOT NULL,
  location           VARCHAR(255),
  ip                 VARCHAR(45) NOT NULL,
  brand              VARCHAR(100) NOT NULL,
  model              VARCHAR(255),
  specs              TEXT,
  supplier           VARCHAR(255),
  status             camera_status NOT NULL DEFAULT 'ONLINE',
  consecutive_drops  INTEGER NOT NULL DEFAULT 0,
  last_ping_time     BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000),
  notes              TEXT,
  is_new             BOOLEAN NOT NULL DEFAULT FALSE,
  created_at         TIMESTAMPTZ DEFAULT NOW(),
  updated_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_cameras_property ON cameras(property_id);
CREATE INDEX idx_cameras_zone ON cameras(zone_id);
CREATE INDEX idx_cameras_status ON cameras(status);
CREATE INDEX idx_cameras_last_ping ON cameras(last_ping_time);
COMMENT ON TABLE cameras IS 'Thiết bị camera gắn với property và zone';

-- 5. Maintenance Logs (Lịch sử bảo trì / sửa chữa)
CREATE TABLE maintenance_logs (
  id          VARCHAR(32) PRIMARY KEY,
  camera_id   VARCHAR(32) NOT NULL REFERENCES cameras(id) ON DELETE CASCADE,
  log_date    DATE NOT NULL,
  error_time  TIMESTAMPTZ,
  fixed_time  TIMESTAMPTZ,
  description TEXT NOT NULL,
  reason      TEXT,
  solution    TEXT,
  technician  VARCHAR(255),
  type        maintenance_log_type NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_maintenance_logs_camera ON maintenance_logs(camera_id);
CREATE INDEX idx_maintenance_logs_date ON maintenance_logs(log_date);
COMMENT ON TABLE maintenance_logs IS 'Lịch sử bảo trì, sửa chữa, lắp đặt camera';

-- 6. Notifications (Thông báo hệ thống)
CREATE TABLE notifications (
  id        VARCHAR(64) PRIMARY KEY,
  timestamp BIGINT NOT NULL,
  message   TEXT NOT NULL,
  type      notification_type NOT NULL,
  read      BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_notifications_timestamp ON notifications(timestamp DESC);
COMMENT ON TABLE notifications IS 'Thông báo lỗi, cảnh báo, info từ hệ thống';

-- ============================================================
-- TRIGGER: auto updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER tr_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

CREATE TRIGGER tr_cameras_updated_at
  BEFORE UPDATE ON cameras
  FOR EACH ROW EXECUTE PROCEDURE set_updated_at();

-- ============================================================
-- SEED DATA (theo constants.ts)
-- ============================================================

-- Properties
INSERT INTO properties (id, name, address, manager) VALUES
  ('PROP_001', 'Toà nhà Sunrise Tower', '123 Nguyễn Hữu Thọ, Q7, TP.HCM', 'Nguyễn Văn A'),
  ('PROP_002', 'Kho vận Tân Bình', '45 Cộng Hoà, Tân Bình, TP.HCM', 'Trần Thị B'),
  ('PROP_003', 'Biệt thự Thảo Điền', 'Đường 66, Thảo Điền, Thủ Đức', 'Lê Văn C');

-- Property Zones (theo zones trong constants)
INSERT INTO property_zones (property_id, name) VALUES
  ('PROP_001', 'Sảnh chính'),
  ('PROP_001', 'Hầm gửi xe'),
  ('PROP_001', 'Hành lang Tầng 1'),
  ('PROP_001', 'Thang máy'),
  ('PROP_002', 'Kho A'),
  ('PROP_002', 'Kho B'),
  ('PROP_002', 'Khu đóng gói'),
  ('PROP_002', 'Hàng rào'),
  ('PROP_002', 'Cổng bảo vệ'),
  ('PROP_003', 'Sân vườn'),
  ('PROP_003', 'Phòng khách'),
  ('PROP_003', 'Cổng sau'),
  ('PROP_003', 'Gara');

-- Brands
INSERT INTO brands (name) VALUES
  ('Hikvision'), ('Dahua'), ('KBVision'), ('Ezviz'), ('Imou'), ('Panasonic'), ('Sony'), ('Axis');

-- Cameras (zone_id lấy theo thứ tự insert: 1=Sảnh chính, 2=Hầm gửi xe, 5=Kho A, 8=Hàng rào, 10=Sân vườn)
INSERT INTO cameras (id, property_id, zone_id, name, location, ip, brand, model, specs, supplier, status, consecutive_drops, notes) VALUES
  ('CAM_001', 'PROP_001', 1, 'Cam Sảnh 1', 'Cổng ra vào', '192.168.1.10', 'Hikvision', 'DS-2CD2043G0-I', '4MP, IR 30m', 'Phúc Anh Smart', 'ONLINE', 0, 'Camera quan sát cửa chính'),
  ('CAM_002', 'PROP_001', 2, 'Cam Hầm B1-01', 'Khu vực xe máy', '192.168.1.11', 'Dahua', 'IPC-HFW2431S', '4MP, Starlight', 'Phúc Anh Smart', 'ONLINE', 0, 'Ánh sáng yếu'),
  ('CAM_003', 'PROP_002', 5, 'Cam Kho A-01', 'Cửa nhập hàng', '10.0.0.50', 'KBVision', 'KX-2011S4', '2MP, IP67', 'Viễn Thông A', 'MAINTENANCE', 0, 'Đang chờ linh kiện thay thế'),
  ('CAM_004', 'PROP_002', 8, 'Cam Chu vi 01', 'Góc Đông Bắc', '10.0.0.51', 'Hikvision', 'PTZ-Outdoor', 'PTZ 25x Zoom', 'Viễn Thông A', 'ONLINE', 0, 'Quay quét tự động'),
  ('CAM_005', 'PROP_003', 10, 'Cam Hồ bơi', 'Cạnh hồ bơi', '192.168.100.5', 'Ezviz', 'C8C', 'Wifi, Color Night Vision', 'Tự lắp đặt', 'ONLINE', 0, '');

-- Maintenance logs (L1 cho CAM_001, L2 cho CAM_003)
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type) VALUES
  ('L1', 'CAM_001', '2023-10-15', NULL, NULL, 'Thay nguồn adapter', NULL, NULL, 'KTV Nam', 'REPAIR'),
  ('L2', 'CAM_003', '2023-11-01', NULL, NULL, 'Bảo trì định kỳ, vệ sinh ống kính', NULL, NULL, NULL, 'CHECKUP');

-- ============================================================
-- VIEWS (tiện query và upscale sau)
-- ============================================================

-- View: Camera kèm tên property và zone
CREATE OR REPLACE VIEW v_cameras_full AS
SELECT
  c.id,
  c.property_id,
  p.name AS property_name,
  c.zone_id,
  pz.name AS zone_name,
  c.name AS camera_name,
  c.location,
  c.ip,
  c.brand,
  c.model,
  c.specs,
  c.supplier,
  c.status,
  c.consecutive_drops,
  c.last_ping_time,
  c.notes,
  c.is_new,
  c.created_at,
  c.updated_at
FROM cameras c
JOIN properties p ON p.id = c.property_id
JOIN property_zones pz ON pz.id = c.zone_id;

-- View: Thống kê camera theo property
CREATE OR REPLACE VIEW v_property_camera_stats AS
SELECT
  p.id AS property_id,
  p.name AS property_name,
  COUNT(c.id) AS total_cameras,
  COUNT(c.id) FILTER (WHERE c.status = 'ONLINE') AS online_count,
  COUNT(c.id) FILTER (WHERE c.status = 'OFFLINE') AS offline_count,
  COUNT(c.id) FILTER (WHERE c.status = 'MAINTENANCE') AS maintenance_count,
  COUNT(c.id) FILTER (WHERE c.status = 'WARNING') AS warning_count
FROM properties p
LEFT JOIN cameras c ON c.property_id = p.id
GROUP BY p.id, p.name;

-- ============================================================
-- Ghi chú upscale sau
-- ============================================================
-- - Thêm bảng users / roles khi có đăng nhập.
-- - Thêm bảng events (sự kiện từ camera) nếu tích hợp AI/event.
-- - Thêm bảng alerts (rule cảnh báo) nếu cần alert tùy chỉnh.
-- - last_ping_time đang lưu epoch ms; có thể đổi sang TIMESTAMPTZ nếu chuẩn hóa thời gian.
-- ============================================================
