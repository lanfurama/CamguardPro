-- Migration: Thêm cột Excel (Status, NEW, Error Time, FixedTime, Reason, Done By, Solution) vào DB hiện có
-- Chạy khi đã có schema cũ: psql -f database/migrate-excel-columns.sql

-- cameras: cột NEW
ALTER TABLE cameras ADD COLUMN IF NOT EXISTS is_new BOOLEAN NOT NULL DEFAULT FALSE;

-- maintenance_logs: Error Time, FixedTime, Reason, Solution (Done By = technician đã có)
ALTER TABLE maintenance_logs ADD COLUMN IF NOT EXISTS error_time TIMESTAMPTZ;
ALTER TABLE maintenance_logs ADD COLUMN IF NOT EXISTS fixed_time TIMESTAMPTZ;
ALTER TABLE maintenance_logs ADD COLUMN IF NOT EXISTS reason TEXT;
ALTER TABLE maintenance_logs ADD COLUMN IF NOT EXISTS solution TEXT;

-- Cập nhật view v_cameras_full để có is_new (chạy lại CREATE OR REPLACE VIEW từ schema.sql hoặc:
DROP VIEW IF EXISTS v_cameras_full;
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
