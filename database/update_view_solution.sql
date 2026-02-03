-- Update v_cameras_full view to include solution column
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
  c.error_time,
  c.fixed_time,
  c.reason,
  c.done_by,
  c.solution,
  c.created_at,
  c.updated_at
FROM cameras c
JOIN properties p ON p.id = c.property_id
JOIN property_zones pz ON pz.id = c.zone_id;
