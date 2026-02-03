-- Cập nhật status, error time, fixed time, reason từ Check list Camera All Site.xlsx
-- Sinh bởi: node scripts/update-cameras-from-excel.mjs
-- Chạy sau khi đã có cameras (seed-furama-sites.sql): psql -f database/update-cameras-from-excel.sql
-- Match camera theo property_id + name (Position hoặc "No - Position").

-- RESORT row 5: ICP LOBBY
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP LOBBY' OR c.name = '1 - ICP LOBBY');
-- RESORT row 6: DANANG 1L
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'DANANG 1L' OR c.name = '2 - DANANG 1L');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_5_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'DANANG 1L' OR c.camera_name = '2 - DANANG 1L') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 7: DANANG 1R
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'DANANG 1R' OR c.name = '3 - DANANG 1R');
-- RESORT row 8: DANANG 2L
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'DANANG 2L' OR c.name = '4 - DANANG 2L');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_7_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'DANANG 2L' OR c.camera_name = '4 - DANANG 2L') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 9: DANANG 2R
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'DANANG 2R' OR c.name = '5 - DANANG 2R');
-- RESORT row 10: DANANG 3L
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'DANANG 3L' OR c.name = '6 - DANANG 3L');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_9_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'DANANG 3L' OR c.camera_name = '6 - DANANG 3L') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 11: DANANG 3R
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'DANANG 3R' OR c.name = '7 - DANANG 3R');
-- RESORT row 12: ICP FOYER
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP FOYER' OR c.name = '8 - ICP FOYER');
-- RESORT row 13: ICP CORRIDOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP CORRIDOR' OR c.name = '9 - ICP CORRIDOR');
-- RESORT row 14: ICP MAIN GATE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP MAIN GATE' OR c.name = '10 - ICP MAIN GATE');
-- RESORT row 15: ICP UPSTAIR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP UPSTAIR' OR c.name = '11 - ICP UPSTAIR');
-- RESORT row 16: BUTCHERY STORE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'BUTCHERY STORE' OR c.name = '12 - BUTCHERY STORE');
-- RESORT row 17: LUGGAGE 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LUGGAGE 2' OR c.name = '13 - LUGGAGE 2');
-- RESORT row 18: OCEAN STORE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'OCEAN STORE' OR c.name = '14 - OCEAN STORE');
-- RESORT row 19: GALLERY 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GALLERY 1' OR c.name = '15 - GALLERY 1');
-- RESORT row 20: GUEST PARKING
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GUEST PARKING' OR c.name = '16 - GUEST PARKING');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_19_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'GUEST PARKING' OR c.camera_name = '16 - GUEST PARKING') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 21: FURAMA PARKING
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'FURAMA PARKING' OR c.name = '17 - FURAMA PARKING');
-- RESORT row 22: LUGGAGE 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LUGGAGE 1' OR c.name = '18 - LUGGAGE 1');
-- RESORT row 23: GALLERY FOYER
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GALLERY FOYER' OR c.name = '19 - GALLERY FOYER');
-- RESORT row 24: ICP BACKDOOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP BACKDOOR' OR c.name = '20 - ICP BACKDOOR');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_23_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'ICP BACKDOOR' OR c.camera_name = '20 - ICP BACKDOOR') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 25: ICP KITCHEN
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP KITCHEN' OR c.name = '21 - ICP KITCHEN');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_24_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'ICP KITCHEN' OR c.camera_name = '21 - ICP KITCHEN') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 26: TENNIS-GARDEN
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'TENNIS-GARDEN' OR c.name = '22 - TENNIS-GARDEN');
-- RESORT row 27: ICP BIKE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP BIKE' OR c.name = '23 - ICP BIKE');
-- RESORT row 28: ICP CAR PARKING
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP CAR PARKING' OR c.name = '24 - ICP CAR PARKING');
-- RESORT row 29: BUGGY WAY
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'BUGGY WAY' OR c.name = '25 - BUGGY WAY');
-- RESORT row 30: FO LOBBY 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'FO LOBBY 1' OR c.name = '26 - FO LOBBY 1');
-- RESORT row 31: ICP ENTRANCE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP ENTRANCE' OR c.name = '27 - ICP ENTRANCE');
-- RESORT row 32: ICP REAGATE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP REAGATE' OR c.name = '28 - ICP REAGATE');
-- RESORT row 33: GUEST ENTRANCE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GUEST ENTRANCE' OR c.name = '29 - GUEST ENTRANCE');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_32_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'GUEST ENTRANCE' OR c.camera_name = '29 - GUEST ENTRANCE') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 34: ICP DROP OFF
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ICP DROP OFF' OR c.name = '30 - ICP DROP OFF');
-- RESORT row 35: LINEN ROOM
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LINEN ROOM' OR c.name = '31 - LINEN ROOM');
-- RESORT row 36: RIGHT STEAKHOUSE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'RIGHT STEAKHOUSE' OR c.name = '32 - RIGHT STEAKHOUSE');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_35_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'RIGHT STEAKHOUSE' OR c.camera_name = '32 - RIGHT STEAKHOUSE') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 37: LEFT STEAKHOUSE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LEFT STEAKHOUSE' OR c.name = '33 - LEFT STEAKHOUSE');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_36_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'LEFT STEAKHOUSE' OR c.camera_name = '33 - LEFT STEAKHOUSE') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 38: OUTSIDE STEAKHOUSE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'OUTSIDE STEAKHOUSE' OR c.name = '34 - OUTSIDE STEAKHOUSE');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_37_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'OUTSIDE STEAKHOUSE' OR c.camera_name = '34 - OUTSIDE STEAKHOUSE') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 41: STAFF PARKING
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'STAFF PARKING' OR c.name = '1 - STAFF PARKING');
-- RESORT row 42: ENG WORKSHOP
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ENG WORKSHOP' OR c.name = '2 - ENG WORKSHOP');
-- RESORT row 43: SMOKING AREA
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'SMOKING AREA' OR c.name = '3 - SMOKING AREA');
-- RESORT row 44: RECEIVING AREA
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'RECEIVING AREA' OR c.name = '4 - RECEIVING AREA');
-- RESORT row 45: GENERAL STORE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GENERAL STORE' OR c.name = '5 - GENERAL STORE');
-- RESORT row 46: ART ROOM 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ART ROOM 1' OR c.name = '6 - ART ROOM 1');
-- RESORT row 47: TRI'S ART ROOM
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'TRI''S ART ROOM' OR c.name = '7 - TRI''S ART ROOM');
-- RESORT row 48: SPA- MEDICAL
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'SPA- MEDICAL' OR c.name = '8 - SPA- MEDICAL');
-- RESORT row 49: LAGOON STORE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LAGOON STORE' OR c.name = '9 - LAGOON STORE');
-- RESORT row 50: HVL POOL
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'HVL POOL' OR c.name = '10 - HVL POOL');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_49_ml6przxm', c.id, '2026-02-03'::date, NULL, NULL, 'Done', 'Done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'HVL POOL' OR c.camera_name = '10 - HVL POOL') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 51: MAIA HOME
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'MAIA HOME' OR c.name = '11 - MAIA HOME');
-- RESORT row 52: GALLERY 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GALLERY 2' OR c.name = '12 - GALLERY 2');
-- RESORT row 53: GALLERY 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GALLERY 3' OR c.name = '13 - GALLERY 3');
-- RESORT row 54: GALLERY 4
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GALLERY 4' OR c.name = '14 - GALLERY 4');
-- RESORT row 55: CF INDO 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'CF INDO 1' OR c.name = '15 - CF INDO 1');
-- RESORT row 56: LD
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = '2025-03-31T17:00:00.000Z'::timestamptz,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LD' OR c.name = '16 - LD');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_55_ml6przxn', c.id, '2025-03-31'::date, '2025-03-31T17:00:00.000Z'::timestamptz, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'LD' OR c.camera_name = '16 - LD') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 57: GAME ROOM 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GAME ROOM 2' OR c.name = '17 - GAME ROOM 2');
-- RESORT row 58: EAST 3 FLOOR # 305
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST 3 FLOOR # 305' OR c.name = '18 - EAST 3 FLOOR # 305');
-- RESORT row 59: EAST 3 FLOOR # 323
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST 3 FLOOR # 323' OR c.name = '19 - EAST 3 FLOOR # 323');
-- RESORT row 60: HVL 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Done
done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'HVL 1' OR c.name = '20 - HVL 1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_59_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'Done
done', 'Done
done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'HVL 1' OR c.camera_name = '20 - HVL 1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 61: HVL 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'HVL 2' OR c.name = '21 - HVL 2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_60_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'Done', 'Done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'HVL 2' OR c.camera_name = '21 - HVL 2') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 62: GAME ROOM 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GAME ROOM 1' OR c.name = '22 - GAME ROOM 1');
-- RESORT row 63: OCEAN ROOM 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'OCEAN ROOM 1' OR c.name = '23 - OCEAN ROOM 1');
-- RESORT row 64: WEST FLOOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'WEST FLOOR' OR c.name = '24 - WEST FLOOR');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_63_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'WEST FLOOR' OR c.camera_name = '24 - WEST FLOOR') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 65: WEST FLOOR 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done
done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'WEST FLOOR 1' OR c.name = '25 - WEST FLOOR 1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_64_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done
done', 'done
done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'WEST FLOOR 1' OR c.camera_name = '25 - WEST FLOOR 1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 66: WEST FLOOR 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'WEST FLOOR 2' OR c.name = '26 - WEST FLOOR 2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_65_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'Cập nhật từ Excel', NULL, NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'WEST FLOOR 2' OR c.camera_name = '26 - WEST FLOOR 2') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 67: WEST FLOOR 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'WEST FLOOR 3' OR c.name = '27 - WEST FLOOR 3');
-- RESORT row 68: WEST FLOOR 4
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'WEST FLOOR 4' OR c.name = '28 - WEST FLOOR 4');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_67_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'Done', 'Done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'WEST FLOOR 4' OR c.camera_name = '28 - WEST FLOOR 4') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 69: STAFF GATE 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'STAFF GATE 1' OR c.name = '29 - STAFF GATE 1');
-- RESORT row 70: CF INDO 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'CF INDO 2' OR c.name = '30 - CF INDO 2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_69_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'CF INDO 2' OR c.camera_name = '30 - CF INDO 2') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 71: CF INDO 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'CF INDO 3' OR c.name = '31 - CF INDO 3');
-- RESORT row 72: OCEAN ROOM 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'OCEAN ROOM 2' OR c.name = '32 - OCEAN ROOM 2');
-- RESORT row 75: WEST ELEVATOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'WEST ELEVATOR' OR c.name = '1 - WEST ELEVATOR');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_74_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'WEST ELEVATOR' OR c.camera_name = '1 - WEST ELEVATOR') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 76: STAFF ELEVATOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = '2025-10-09T17:00:00.000Z'::timestamptz,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'PR repair'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'STAFF ELEVATOR' OR c.name = '2 - STAFF ELEVATOR');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_75_ml6przxn', c.id, '2025-10-09'::date, '2025-10-09T17:00:00.000Z'::timestamptz, NULL, 'done', 'done', NULL, 'PR repair', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'STAFF ELEVATOR' OR c.camera_name = '2 - STAFF ELEVATOR') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 77: EAST STAFF ELEVATOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST STAFF ELEVATOR' OR c.name = '3 - EAST STAFF ELEVATOR');
-- RESORT row 78: WEST STAFF ELEVATOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'WEST STAFF ELEVATOR' OR c.name = '4 - WEST STAFF ELEVATOR');
-- RESORT row 79: LUGGAGE AREA
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Done
done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LUGGAGE AREA' OR c.name = '5 - LUGGAGE AREA');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_78_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'Done
done', 'Done
done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'LUGGAGE AREA' OR c.camera_name = '5 - LUGGAGE AREA') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 80: EAST FLOOR 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST FLOOR 1' OR c.name = '6 - EAST FLOOR 1');
-- RESORT row 81: EAST FLOOR 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST FLOOR 2' OR c.name = '7 - EAST FLOOR 2');
-- RESORT row 82: EAST FLOOR 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST FLOOR 3' OR c.name = '8 - EAST FLOOR 3');
-- RESORT row 83: EAST 4 FLOOR LIFT
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST 4 FLOOR LIFT' OR c.name = '9 - EAST 4 FLOOR LIFT');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_82_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'EAST 4 FLOOR LIFT' OR c.camera_name = '9 - EAST 4 FLOOR LIFT') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 84: EAST FLOOR 4
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST FLOOR 4' OR c.name = '10 - EAST FLOOR 4');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_83_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'EAST FLOOR 4' OR c.camera_name = '10 - EAST FLOOR 4') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 85: EAST 4 FLOOR #423
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST 4 FLOOR #423' OR c.name = '11 - EAST 4 FLOOR #423');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_84_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'EAST 4 FLOOR #423' OR c.camera_name = '11 - EAST 4 FLOOR #423') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 86: EAST 4 FLOOR ST.CASE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST 4 FLOOR ST.CASE' OR c.name = '12 - EAST 4 FLOOR ST.CASE');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_85_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'EAST 4 FLOOR ST.CASE' OR c.camera_name = '12 - EAST 4 FLOOR ST.CASE') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 87: EAST 3 FLOOR LIFT
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST 3 FLOOR LIFT' OR c.name = '13 - EAST 3 FLOOR LIFT');
-- RESORT row 88: EAST 3 FLOOR ST.CASE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST 3 FLOOR ST.CASE' OR c.name = '14 - EAST 3 FLOOR ST.CASE');
-- RESORT row 89: TAYA 2 FLOOR LEFT
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'TAYA 2 FLOOR LEFT' OR c.name = '15 - TAYA 2 FLOOR LEFT');
-- RESORT row 90: TAYA 2 FLOOR RIGHT
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'TAYA 2 FLOOR RIGHT' OR c.name = '16 - TAYA 2 FLOOR RIGHT');
-- RESORT row 91: BC
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'BC' OR c.name = '17 - BC');
-- RESORT row 92: ROOM 144-146
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done
done
done
',
      done_by = '

replace new camera'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ROOM 144-146' OR c.name = '18 - ROOM 144-146');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_91_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done
done
done
', 'done
done
done
', NULL, '

replace new camera', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'ROOM 144-146' OR c.camera_name = '18 - ROOM 144-146') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 93: ROOM 141-143
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ROOM 141-143' OR c.name = '19 - ROOM 141-143');
-- RESORT row 94: KID CLUB
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'KID CLUB' OR c.name = '20 - KID CLUB');
-- RESORT row 95: BEACH 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'BEACH 1' OR c.name = '21 - BEACH 1');
-- RESORT row 96: BEACH 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'BEACH 3' OR c.name = '22 - BEACH 3');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_95_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'BEACH 3' OR c.camera_name = '22 - BEACH 3') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 97: BEACH 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done
done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'BEACH 2' OR c.name = '23 - BEACH 2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_96_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done
done', 'done
done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'BEACH 2' OR c.camera_name = '23 - BEACH 2') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 98: ROOM 132-134
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ROOM 132-134' OR c.name = '24 - ROOM 132-134');
-- RESORT row 99: ROOM 136-138
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ROOM 136-138' OR c.name = '25 - ROOM 136-138');
-- RESORT row 100: ROOM 140.142
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ROOM 140.142' OR c.name = '26 - ROOM 140.142');
-- RESORT row 101: ROOM 149-151
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ROOM 149-151' OR c.name = '27 - ROOM 149-151');
-- RESORT row 102: ROOM 161-163
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ROOM 161-163' OR c.name = '28 - ROOM 161-163');
-- RESORT row 103: ROOM 155-157
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'ROOM 155-157' OR c.name = '29 - ROOM 155-157');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_102_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'ROOM 155-157' OR c.camera_name = '29 - ROOM 155-157') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 104: RIGHT LED
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'RIGHT LED' OR c.name = '30 - RIGHT LED');
-- RESORT row 105: LEFT LED
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LEFT LED' OR c.name = '31 - LEFT LED');
-- RESORT row 106: EAST ELEVATOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EAST ELEVATOR' OR c.name = '32 - EAST ELEVATOR');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_105_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'EAST ELEVATOR' OR c.camera_name = '32 - EAST ELEVATOR') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 109: OCEAN POOL
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'OCEAN POOL' OR c.name = '1 - OCEAN POOL');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_108_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'OCEAN POOL' OR c.camera_name = '1 - OCEAN POOL') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 110: MAIN KITCHEN 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'MAIN KITCHEN 1' OR c.name = '2 - MAIN KITCHEN 1');
-- RESORT row 111: MAIN KITCHEN 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'replace new cam'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'MAIN KITCHEN 3' OR c.name = '3 - MAIN KITCHEN 3');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_110_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, 'replace new cam', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'MAIN KITCHEN 3' OR c.camera_name = '3 - MAIN KITCHEN 3') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 112: MAIN KITCHEN 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'MAIN KITCHEN 2' OR c.name = '4 - MAIN KITCHEN 2');
-- RESORT row 113: SPA LEFT DOOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'SPA LEFT DOOR' OR c.name = '5 - SPA LEFT DOOR');
-- RESORT row 114: SECURITY OFFICE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'SECURITY OFFICE' OR c.name = '6 - SECURITY OFFICE');
-- RESORT row 115: CHANGING ROOM
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'CHANGING ROOM' OR c.name = '7 - CHANGING ROOM');
-- RESORT row 116: OCEAN OUTSIDE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'OCEAN OUTSIDE' OR c.name = '8 - OCEAN OUTSIDE');
-- RESORT row 117: KID OUTSIDE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'KID OUTSIDE' OR c.name = '9 - KID OUTSIDE');
-- RESORT row 118: BALL KID
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'BALL KID' OR c.name = '10 - BALL KID');
-- RESORT row 119: SPA WAY
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'SPA WAY' OR c.name = '11 - SPA WAY');
-- RESORT row 120: DROP OFF
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'DROP OFF' OR c.name = '12 - DROP OFF');
-- RESORT row 121: FO LOBBY 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'FO LOBBY 2' OR c.name = '13 - FO LOBBY 2');
-- RESORT row 122: FO RECEPTION
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'FO RECEPTION' OR c.name = '14 - FO RECEPTION');
-- RESORT row 123: HVL CORRIDOOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'HVL CORRIDOOR' OR c.name = '15 - HVL CORRIDOOR');
-- RESORT row 124: COURTYARD
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'COURTYARD' OR c.name = '16 - COURTYARD');
-- RESORT row 125: SPA FO
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'Replace new camera'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'SPA FO' OR c.name = '17 - SPA FO');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_124_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, 'Replace new camera', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'SPA FO' OR c.camera_name = '17 - SPA FO') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 126: BOH CORRIDOOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'BOH CORRIDOOR' OR c.name = '18 - BOH CORRIDOOR');
-- RESORT row 127: OUTSIDE JSC
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'OUTSIDE JSC' OR c.name = '19 - OUTSIDE JSC');
-- RESORT row 128: JSC OFFICE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'JSC OFFICE' OR c.name = '20 - JSC OFFICE');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_127_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'JSC OFFICE' OR c.camera_name = '20 - JSC OFFICE') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 129: LUNA
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LUNA' OR c.name = '21 - LUNA');
-- RESORT row 130: EXECUTIVE
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'EXECUTIVE' OR c.name = '22 - EXECUTIVE');
-- RESORT row 131: SPA CENTER DOOR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'SPA CENTER DOOR' OR c.name = '23 - SPA CENTER DOOR');
-- RESORT row 132: TAYA KIT
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = '2025-03-31T17:00:00.000Z'::timestamptz,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'TAYA KIT' OR c.name = '24 - TAYA KIT');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_131_ml6przxn', c.id, '2025-03-31'::date, '2025-03-31T17:00:00.000Z'::timestamptz, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'TAYA KIT' OR c.camera_name = '24 - TAYA KIT') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 133: TAYA 1 FLOOR RIGHT
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = '2025-03-31T17:00:00.000Z'::timestamptz,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'TAYA 1 FLOOR RIGHT' OR c.name = '25 - TAYA 1 FLOOR RIGHT');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_132_ml6przxn', c.id, '2025-03-31'::date, '2025-03-31T17:00:00.000Z'::timestamptz, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'TAYA 1 FLOOR RIGHT' OR c.camera_name = '25 - TAYA 1 FLOOR RIGHT') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 134: TAYA 1 FLOOR LEFT
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = '2025-03-31T17:00:00.000Z'::timestamptz,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'TAYA 1 FLOOR LEFT' OR c.name = '26 - TAYA 1 FLOOR LEFT');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_133_ml6przxn', c.id, '2025-03-31'::date, '2025-03-31T17:00:00.000Z'::timestamptz, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'TAYA 1 FLOOR LEFT' OR c.camera_name = '26 - TAYA 1 FLOOR LEFT') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 135: STAFF CANTEEN
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'STAFF CANTEEN' OR c.name = '27 - STAFF CANTEEN');
-- RESORT row 136: GYM
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'GYM' OR c.name = '28 - GYM');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_135_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'GYM' OR c.camera_name = '28 - GYM') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 137: LAGOON BAR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = '
done
done
done
pending',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LAGOON BAR' OR c.name = '29 - LAGOON BAR');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_136_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, '
done
done
done
pending', '
done
done
done
pending', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'LAGOON BAR' OR c.camera_name = '29 - LAGOON BAR') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 138: RIGHT LG POOL
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'RIGHT LG POOL' OR c.name = '30 - RIGHT LG POOL');
-- RESORT row 139: LG POOL 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = '2025-03-31T17:00:00.000Z'::timestamptz,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'LG POOL 2' OR c.name = '31 - LG POOL 2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_138_ml6przxn', c.id, '2025-03-31'::date, '2025-03-31T17:00:00.000Z'::timestamptz, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'LG POOL 2' OR c.camera_name = '31 - LG POOL 2') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 140: DONCIP
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'DONCIP' OR c.name = '32 - DONCIP');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_139_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'Done', 'Done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'DONCIP' OR c.camera_name = '32 - DONCIP') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 141: 7 Camera Floor 3,4 nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '7 Camera Floor 3,4 nolink' OR c.name = '33 - 7 Camera Floor 3,4 nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_140_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '7 Camera Floor 3,4 nolink' OR c.camera_name = '33 - 7 Camera Floor 3,4 nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 142: 11 Camera nolink West Wing
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '11 Camera nolink West Wing' OR c.name = '34 - 11 Camera nolink West Wing');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_141_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '11 Camera nolink West Wing' OR c.camera_name = '34 - 11 Camera nolink West Wing') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 143: 5 Camera D3-4 cabinet nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '5 Camera D3-4 cabinet nolink' OR c.name = '35 - 5 Camera D3-4 cabinet nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_142_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '5 Camera D3-4 cabinet nolink' OR c.camera_name = '35 - 5 Camera D3-4 cabinet nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 144: 8 Camera
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '8 Camera' OR c.name = '36 - 8 Camera');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_143_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '8 Camera' OR c.camera_name = '36 - 8 Camera') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 145: 4 camera Pick
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '4 camera Pick' OR c.name = '37 - 4 camera Pick');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_144_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '4 camera Pick' OR c.camera_name = '37 - 4 camera Pick') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 146: 2 Cam da nang 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '2 Cam da nang 3' OR c.name = '38 - 2 Cam da nang 3');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_145_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '2 Cam da nang 3' OR c.camera_name = '38 - 2 Cam da nang 3') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 147: 5 camera Taya
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '5 camera Taya' OR c.name = '39 - 5 camera Taya');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_146_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '5 camera Taya' OR c.camera_name = '39 - 5 camera Taya') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 148: 5 camera Lobby area
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '5 camera Lobby area' OR c.name = '40 - 5 camera Lobby area');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_147_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '5 camera Lobby area' OR c.camera_name = '40 - 5 camera Lobby area') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 149: all Recording
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'all Recording' OR c.name = '41 - all Recording');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_148_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'Cập nhật từ Excel', NULL, NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'all Recording' OR c.camera_name = '41 - all Recording') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 150: 3 camera East wing
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '3 camera East wing' OR c.name = '42 - 3 camera East wing');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_149_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '3 camera East wing' OR c.camera_name = '42 - 3 camera East wing') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 151: 12 camera Ocean wing
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'Replace new sw'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '12 camera Ocean wing' OR c.name = '43 - 12 camera Ocean wing');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_150_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, 'Replace new sw', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '12 camera Ocean wing' OR c.camera_name = '43 - 12 camera Ocean wing') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 152: Only 3 cam p28,p30,club house
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'pending',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'Only 3 cam p28,p30,club house' OR c.name = '44 - Only 3 cam p28,p30,club house');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_151_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'pending', 'pending', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'Only 3 cam p28,p30,club house' OR c.camera_name = '44 - Only 3 cam p28,p30,club house') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 153: 5 cam villas lobby
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'Replace new sw'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '5 cam villas lobby' OR c.name = '45 - 5 cam villas lobby');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_152_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, 'Replace new sw', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '5 cam villas lobby' OR c.camera_name = '45 - 5 cam villas lobby') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 154: All camera East wing
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'move cam port'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'All camera East wing' OR c.name = '46 - All camera East wing');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_153_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, 'move cam port', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'All camera East wing' OR c.camera_name = '46 - All camera East wing') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 155: Recorder 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'Recorder 1' OR c.name = '47 - Recorder 1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_154_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'Recorder 1' OR c.camera_name = '47 - Recorder 1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 156: Camera Ocean
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'Camera Ocean' OR c.name = '48 - Camera Ocean');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_155_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'Camera Ocean' OR c.camera_name = '48 - Camera Ocean') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 157: 5 camera icp, Floor4, LG
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '5 camera icp, Floor4, LG' OR c.name = '49 - 5 camera icp, Floor4, LG');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_156_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '5 camera icp, Floor4, LG' OR c.camera_name = '49 - 5 camera icp, Floor4, LG') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 158: Recorder 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'Recorder 1' OR c.name = '50 - Recorder 1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_157_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'Recorder 1' OR c.camera_name = '50 - Recorder 1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 159: Camera CF1,2,3 Dcip,Obar Main kit 1,2,3, Beach 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'Camera CF1,2,3 Dcip,Obar
Main kit 1,2,3, Beach 1' OR c.name = '51 - Camera CF1,2,3 Dcip,Obar
Main kit 1,2,3, Beach 1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_158_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'Camera CF1,2,3 Dcip,Obar
Main kit 1,2,3, Beach 1' OR c.camera_name = '51 - Camera CF1,2,3 Dcip,Obar
Main kit 1,2,3, Beach 1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 160: Spa cabinet nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'Replace new sw'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'Spa cabinet nolink' OR c.name = '52 - Spa cabinet nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_159_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, 'Replace new sw', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'Spa cabinet nolink' OR c.camera_name = '52 - Spa cabinet nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 161: More camera nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'More camera nolink' OR c.name = '53 - More camera nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_160_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'More camera nolink' OR c.camera_name = '53 - More camera nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 162: All Recorder
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'Recheck database for all Recorder'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'All Recorder' OR c.name = '54 - All Recorder');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_161_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, 'Recheck database for all Recorder', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'All Recorder' OR c.camera_name = '54 - All Recorder') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 163: 5 camera west floor1, 8 cam west wing room Taya
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '5 camera west floor1,
8 cam west wing room
Taya' OR c.name = '55 - 5 camera west floor1,
8 cam west wing room
Taya');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_162_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '5 camera west floor1,
8 cam west wing room
Taya' OR c.camera_name = '55 - 5 camera west floor1,
8 cam west wing room
Taya') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 164: All camera sw
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'Re-check resolution all camera'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'All camera sw' OR c.name = '56 - All camera sw');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_163_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, 'Re-check resolution all camera', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'All camera sw' OR c.camera_name = '56 - All camera sw') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 165: East Elevator Camera
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'East Elevator Camera' OR c.name = '57 - East Elevator Camera');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_164_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'East Elevator Camera' OR c.camera_name = '57 - East Elevator Camera') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 166: Recorder 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'Recorder 3' OR c.name = '58 - Recorder 3');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_165_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'Recorder 3' OR c.camera_name = '58 - Recorder 3') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 167: 10 camera resort
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '10 camera resort' OR c.name = '59 - 10 camera resort');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_166_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '10 camera resort' OR c.camera_name = '59 - 10 camera resort') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 168: Setup camera SH
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'Setup camera SH' OR c.name = '60 - Setup camera SH');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_167_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'Setup camera SH' OR c.camera_name = '60 - Setup camera SH') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 169: 3 camera SH down
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '3 camera SH down' OR c.name = '61 - 3 camera SH down');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_168_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '3 camera SH down' OR c.camera_name = '61 - 3 camera SH down') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 170: 3 camera SH down
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = 'UPS off'
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '3 camera SH down' OR c.name = '62 - 3 camera SH down');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_169_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, 'UPS off', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '3 camera SH down' OR c.camera_name = '62 - 3 camera SH down') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 171: 4 camera Floor 4
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '4 camera Floor 4' OR c.name = '63 - 4 camera Floor 4');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_170_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '4 camera Floor 4' OR c.camera_name = '63 - 4 camera Floor 4') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 172: East Elevator Camera
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = 'East Elevator Camera' OR c.name = '64 - East Elevator Camera');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_171_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = 'East Elevator Camera' OR c.camera_name = '64 - East Elevator Camera') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- RESORT row 173: 4 cam floor 1,2,3,4
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'done',
      done_by = NULL
    WHERE c.property_id = 'PROP_RESORT' AND (c.name = '4 cam floor 1,2,3,4' OR c.name = '65 - 4 cam floor 1,2,3,4');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_RES_172_ml6przxn', c.id, '2026-02-03'::date, NULL, NULL, 'done', 'done', NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_RESORT' AND (c.camera_name = '4 cam floor 1,2,3,4' OR c.camera_name = '65 - 4 cam floor 1,2,3,4') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 5: P05
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = '2026-07-31T17:00:00.000Z'::timestamptz,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P05' OR c.name = '1 - P05');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_4_ml6przxr', c.id, '2026-07-31'::date, '2026-07-31T17:00:00.000Z'::timestamptz, NULL, 'Cập nhật từ Excel', NULL, NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'P05' OR c.camera_name = '1 - P05') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 6: R29
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R29' OR c.name = '2 - R29');
-- VILLAS row 7: S05
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S05' OR c.name = '3 - S05');
-- VILLAS row 8: P35-C25.5
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Camera broken',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P35-C25.5' OR c.name = '4 - P35-C25.5');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_7_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Camera broken - Replace new cam', 'Camera broken', 'Replace new cam', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'P35-C25.5' OR c.camera_name = '4 - P35-C25.5') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 9: R18
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R18' OR c.name = '5 - R18');
-- VILLAS row 10: D7
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D7' OR c.name = '6 - D7');
-- VILLAS row 11: P33
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P33' OR c.name = '7 - P33');
-- VILLAS row 12: S08
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S08' OR c.name = '8 - S08');
-- VILLAS row 13: P24-C2.1 (villas P25)
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P24-C2.1 (villas P25)' OR c.name = '9 - P24-C2.1 (villas P25)');
-- VILLAS row 14: P27
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P27' OR c.name = '10 - P27');
-- VILLAS row 15: D02
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Camera broken',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D02' OR c.name = '11 - D02');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_14_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Camera broken', 'Camera broken', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D02' OR c.camera_name = '11 - D02') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 16: S20-C1.1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S20-C1.1' OR c.name = '12 - S20-C1.1');
-- VILLAS row 17: S26
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S26' OR c.name = '13 - S26');
-- VILLAS row 18: S06
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S06' OR c.name = '14 - S06');
-- VILLAS row 19: D04
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D04' OR c.name = '15 - D04');
-- VILLAS row 20: D05
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = '
Done


'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D05' OR c.name = '16 - D05');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_19_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cập nhật từ Excel', NULL, NULL, '
Done


', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D05' OR c.camera_name = '16 - D05') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 21: P03-C10.2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P03-C10.2' OR c.name = '17 - P03-C10.2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_20_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cập nhật từ Excel', NULL, NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'P03-C10.2' OR c.camera_name = '17 - P03-C10.2') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 22: Villas Bãi xe
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Villas Bãi xe' OR c.name = '18 - Villas Bãi xe');
-- VILLAS row 23: Bảo Vệ S2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Bảo Vệ S2' OR c.name = '19 - Bảo Vệ S2');
-- VILLAS row 24: Buggy station
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Buggy station' OR c.name = '20 - Buggy station');
-- VILLAS row 25: Parking-ACC
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Parking-ACC' OR c.name = '21 - Parking-ACC');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_24_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink', 'nolink', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'Parking-ACC' OR c.camera_name = '21 - Parking-ACC') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 26: Villas Lobby
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Villas Lobby' OR c.name = '22 - Villas Lobby');
-- VILLAS row 27: S18
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Cable broken',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S18' OR c.name = '23 - S18');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_26_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cable broken - Repair Net cable', 'Cable broken', 'Repair Net cable', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'S18' OR c.camera_name = '23 - S18') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 28: House Control
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Replace new camera',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'House Control' OR c.name = '24 - House Control');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_27_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Replace new camera', 'Replace new camera', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'House Control' OR c.camera_name = '24 - House Control') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 29: Đón trả khách
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Đón trả khách' OR c.name = '25 - Đón trả khách');
-- VILLAS row 30: View nhà vườn (củ)
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'View nhà vườn (củ)' OR c.name = '26 - View nhà vườn (củ)');
-- VILLAS row 31: Dân Sinh
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Dân Sinh' OR c.name = '27 - Dân Sinh');
-- VILLAS row 32: DROP OFF
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'DROP OFF' OR c.name = '28 - DROP OFF');
-- VILLAS row 33: Waiting room
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Waiting room' OR c.name = '29 - Waiting room');
-- VILLAS row 34: DROP OFF 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'DROP OFF 1' OR c.name = '30 - DROP OFF 1');
-- VILLAS row 35: D5-1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D5-1' OR c.name = '31 - D5-1');
-- VILLAS row 36: R19
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R19' OR c.name = '32 - R19');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_35_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink', 'nolink', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'R19' OR c.camera_name = '32 - R19') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 37: R16
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R16' OR c.name = '33 - R16');
-- VILLAS row 38: D5 Vườn
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D5 Vườn' OR c.name = '34 - D5 Vườn');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_37_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cập nhật từ Excel', NULL, NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D5 Vườn' OR c.camera_name = '34 - D5 Vườn') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 42: Pickleball 01
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Pickleball 01' OR c.name = '1 - Pickleball 01');
-- VILLAS row 43: Pickleball 02
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Pickleball 02' OR c.name = '2 - Pickleball 02');
-- VILLAS row 44: Pickleball 03
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Pickleball 03' OR c.name = '3 - Pickleball 03');
-- VILLAS row 45: Pickleball 04
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Pickleball 04' OR c.name = '4 - Pickleball 04');
-- VILLAS row 46: Le Tan Pickleball
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Le Tan Pickleball' OR c.name = '5 - Le Tan Pickleball');
-- VILLAS row 47: Club House inhouse 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'RJ45 error',
      done_by = 'Done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Club House inhouse 1' OR c.name = '6 - Club House inhouse 1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_46_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'RJ45 error', 'RJ45 error', NULL, 'Done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'Club House inhouse 1' OR c.camera_name = '6 - Club House inhouse 1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 48: Club House inhouse 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Club House inhouse 3' OR c.name = '7 - Club House inhouse 3');
-- VILLAS row 49: Club House inhouse 4
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Cam Port error',
      done_by = 'done
pending'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Club House inhouse 4' OR c.name = '8 - Club House inhouse 4');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_48_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cam Port error', 'Cam Port error', NULL, 'done
pending', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'Club House inhouse 4' OR c.camera_name = '8 - Club House inhouse 4') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 50: Kitchen floor 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Kitchen floor 2' OR c.name = '9 - Kitchen floor 2');
-- VILLAS row 51: Buggy Parking
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Buggy Parking' OR c.name = '10 - Buggy Parking');
-- VILLAS row 52: Kitchen floor 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'Done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Kitchen floor 1' OR c.name = '11 - Kitchen floor 1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_51_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink', 'nolink', NULL, 'Done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'Kitchen floor 1' OR c.camera_name = '11 - Kitchen floor 1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 53: Club house lobby 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Club house lobby 2' OR c.name = '12 - Club house lobby 2');
-- VILLAS row 54: Club House inhouse 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Club House inhouse 2' OR c.name = '13 - Club House inhouse 2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_53_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink', 'nolink', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'Club House inhouse 2' OR c.camera_name = '13 - Club House inhouse 2') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 55: Gym
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Gym' OR c.name = '14 - Gym');
-- VILLAS row 56: Club house lobby
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Club house lobby' OR c.name = '15 - Club house lobby');
-- VILLAS row 57: RoundBar 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'RoundBar 2' OR c.name = '16 - RoundBar 2');
-- VILLAS row 58: RoundBar 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'cam lost',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'RoundBar 1' OR c.name = '17 - RoundBar 1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_57_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'cam lost', 'cam lost', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'RoundBar 1' OR c.camera_name = '17 - RoundBar 1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 59: Minimat
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Minimat' OR c.name = '18 - Minimat');
-- VILLAS row 60: V-Sen 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'V-Sen 2' OR c.name = '19 - V-Sen 2');
-- VILLAS row 61: V-Sen Bar
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'V-Sen Bar' OR c.name = '20 - V-Sen Bar');
-- VILLAS row 62: V-Sen Kit
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'V-Sen Kit' OR c.name = '21 - V-Sen Kit');
-- VILLAS row 63: V-Sen 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'V-Sen 1' OR c.name = '22 - V-Sen 1');
-- VILLAS row 64: V-Sen 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'V-Sen 3' OR c.name = '23 - V-Sen 3');
-- VILLAS row 68: D3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'pending'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D3' OR c.name = '1 - D3');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_67_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink', 'nolink', NULL, 'pending', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D3' OR c.camera_name = '1 - D3') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 69: D6-C8.2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D6-C8.2' OR c.name = '2 - D6-C8.2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_68_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink', 'nolink', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D6-C8.2' OR c.camera_name = '2 - D6-C8.2') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 70: P37-C19.3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P37-C19.3' OR c.name = '3 - P37-C19.3');
-- VILLAS row 71: S44
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S44' OR c.name = '4 - S44');
-- VILLAS row 72: S46
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S46' OR c.name = '5 - S46');
-- VILLAS row 73: R39
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Camera broken',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R39' OR c.name = '6 - R39');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_72_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Camera broken - replace new cam', 'Camera broken', 'replace new cam', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'R39' OR c.camera_name = '6 - R39') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 74: R27
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R27' OR c.name = '7 - R27');
-- VILLAS row 75: P28
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'done
done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P28' OR c.name = '8 - P28');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_74_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, '
replace new cam', NULL, '
replace new cam', 'done
done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'P28' OR c.camera_name = '8 - P28') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 76: P30
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P30' OR c.name = '9 - P30');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_75_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink - replace new cam', 'nolink', 'replace new cam', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'P30' OR c.camera_name = '9 - P30') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 77: P32-C12.3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P32-C12.3' OR c.name = '10 - P32-C12.3');
-- VILLAS row 78: R44-C20.4
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'pending'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R44-C20.4' OR c.name = '11 - R44-C20.4');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_77_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cập nhật từ Excel', NULL, NULL, 'pending', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'R44-C20.4' OR c.camera_name = '11 - R44-C20.4') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 79: R37
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R37' OR c.name = '12 - R37');
-- VILLAS row 80: D1-P27-1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D1-P27-1' OR c.name = '13 - D1-P27-1');
-- VILLAS row 81: D1-P27-2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D1-P27-2' OR c.name = '14 - D1-P27-2');
-- VILLAS row 82: D1-P27-3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D1-P27-3' OR c.name = '15 - D1-P27-3');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_81_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cập nhật từ Excel', NULL, NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D1-P27-3' OR c.camera_name = '15 - D1-P27-3') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 83: D3-D4-1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D3-D4-1' OR c.name = '16 - D3-D4-1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_82_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink', 'nolink', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D3-D4-1' OR c.camera_name = '16 - D3-D4-1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 84: D3-D4-2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D3-D4-2' OR c.name = '17 - D3-D4-2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_83_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink', 'nolink', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D3-D4-2' OR c.camera_name = '17 - D3-D4-2') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 85: D3-D4-3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'nolink',
      done_by = 'done
pending'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D3-D4-3' OR c.name = '18 - D3-D4-3');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_84_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'nolink', 'nolink', NULL, 'done
pending', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D3-D4-3' OR c.camera_name = '18 - D3-D4-3') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 86: D7-P1-1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D7-P1-1' OR c.name = '19 - D7-P1-1');
-- VILLAS row 87: D7-P1-2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D7-P1-2' OR c.name = '20 - D7-P1-2');
-- VILLAS row 88: D7-P1-3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = '2025-12-31T17:00:00.000Z'::timestamptz,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'pending'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D7-P1-3' OR c.name = '21 - D7-P1-3');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_87_ml6przxr', c.id, '2025-12-31'::date, '2025-12-31T17:00:00.000Z'::timestamptz, NULL, 'Cập nhật từ Excel', NULL, NULL, 'pending', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D7-P1-3' OR c.camera_name = '21 - D7-P1-3') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 89: P23-2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P23-2' OR c.name = '22 - P23-2');
-- VILLAS row 90: P23-1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P23-1' OR c.name = '23 - P23-1');
-- VILLAS row 91: P23-3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P23-3' OR c.name = '24 - P23-3');
-- VILLAS row 92: R32-C32.6
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R32-C32.6' OR c.name = '25 - R32-C32.6');
-- VILLAS row 93: S22
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S22' OR c.name = '26 - S22');
-- VILLAS row 94: P8-C28.6
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P8-C28.6' OR c.name = '27 - P8-C28.6');
-- VILLAS row 95: P10-C29.6
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P10-C29.6' OR c.name = '28 - P10-C29.6');
-- VILLAS row 96: S39
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S39' OR c.name = '29 - S39');
-- VILLAS row 97: P11-C30.6
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P11-C30.6' OR c.name = '30 - P11-C30.6');
-- VILLAS row 98: S03-C34.7
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S03-C34.7' OR c.name = '31 - S03-C34.7');
-- VILLAS row 99: P23-4
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = '2025-01-08T17:00:00.000Z'::timestamptz,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'pending'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P23-4' OR c.name = '32 - P23-4');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_98_ml6przxr', c.id, '2025-01-08'::date, '2025-01-08T17:00:00.000Z'::timestamptz, NULL, 'Cập nhật từ Excel', NULL, NULL, 'pending', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'P23-4' OR c.camera_name = '32 - P23-4') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 100: 2 camera R16,R19 nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Cable uplink broken',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = '2 camera R16,R19 nolink' OR c.name = '33 - 2 camera R16,R19 nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_99_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cable uplink broken', 'Cable uplink broken', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = '2 camera R16,R19 nolink' OR c.camera_name = '33 - 2 camera R16,R19 nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 101: 2 camera D2, S18
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Not save old data',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = '2 camera D2, S18' OR c.name = '34 - 2 camera D2, S18');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_100_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Not save old data', 'Not save old data', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = '2 camera D2, S18' OR c.camera_name = '34 - 2 camera D2, S18') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 102: 4 camera Pickleball
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Network error',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = '4 camera Pickleball' OR c.name = '35 - 4 camera Pickleball');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_101_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Network error', 'Network error', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = '4 camera Pickleball' OR c.camera_name = '35 - 4 camera Pickleball') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 103: all camera lobby
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Power down',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'all camera lobby' OR c.name = '36 - all camera lobby');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_102_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Power down', 'Power down', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'all camera lobby' OR c.camera_name = '36 - all camera lobby') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 104: R39 cabiniet nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Sw down',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R39 cabiniet nolink' OR c.name = '37 - R39 cabiniet nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_103_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Sw down - replace new sw', 'Sw down', 'replace new sw', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'R39 cabiniet nolink' OR c.camera_name = '37 - R39 cabiniet nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 105: S3 cabinet nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'convertor error',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'S3 cabinet nolink' OR c.name = '38 - S3 cabinet nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_104_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'convertor error', 'convertor error', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'S3 cabinet nolink' OR c.camera_name = '38 - S3 cabinet nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 106: D3-4 cabinet nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Sw down',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D3-4 cabinet nolink' OR c.name = '39 - D3-4 cabinet nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_105_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Sw down', 'Sw down', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D3-4 cabinet nolink' OR c.camera_name = '39 - D3-4 cabinet nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 107: 9cam P8,P10,P11,P33, R32,S22,R29,R16,R19
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'FFTH broken at v-sense',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = '9cam P8,P10,P11,P33,
R32,S22,R29,R16,R19' OR c.name = '40 - 9cam P8,P10,P11,P33,
R32,S22,R29,R16,R19');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_106_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'FFTH broken at v-sense - Mr Dũng project process', 'FFTH broken at v-sense', 'Mr Dũng project process', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = '9cam P8,P10,P11,P33,
R32,S22,R29,R16,R19' OR c.camera_name = '40 - 9cam P8,P10,P11,P33,
R32,S22,R29,R16,R19') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 108: 25 camera villas nolink P23 cabinet
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = '25 camera villas nolink
P23 cabinet' OR c.name = '41 - 25 camera villas nolink
P23 cabinet');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_107_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cập nhật từ Excel', NULL, NULL, NULL, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = '25 camera villas nolink
P23 cabinet' OR c.camera_name = '41 - 25 camera villas nolink
P23 cabinet') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 109: D7,D3 Cabinet
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D7,D3 Cabinet' OR c.name = '42 - D7,D3 Cabinet');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_108_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Mr Dũng project process', NULL, 'Mr Dũng project process', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D7,D3 Cabinet' OR c.camera_name = '42 - D7,D3 Cabinet') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 110: 13 camera nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Sw camera down',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = '13 camera nolink' OR c.name = '43 - 13 camera nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_109_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Sw camera down', 'Sw camera down', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = '13 camera nolink' OR c.camera_name = '43 - 13 camera nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 111: 5 cam R16,R19, R29,P33,P35
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Cabinet P33 down',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = '5 cam R16,R19,
R29,P33,P35' OR c.name = '44 - 5 cam R16,R19,
R29,P33,P35');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_110_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'Cabinet P33 down - convertor timeout', 'Cabinet P33 down', 'convertor timeout', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = '5 cam R16,R19,
R29,P33,P35' OR c.camera_name = '44 - 5 cam R16,R19,
R29,P33,P35') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 112: 23 camera P23,p27,D1-D7…
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'FFTH fiber broken',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = '23 camera P23,p27,D1-D7…' OR c.name = '45 - 23 camera P23,p27,D1-D7…');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_111_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'FFTH fiber broken - Vendor repair FFTH fiber', 'FFTH fiber broken', 'Vendor repair FFTH fiber', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = '23 camera P23,p27,D1-D7…' OR c.camera_name = '45 - 23 camera P23,p27,D1-D7…') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 113: P33 cabinet down
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'sw error',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P33 cabinet down' OR c.name = '46 - P33 cabinet down');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_112_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'sw error - replace new sw', 'sw error', 'replace new sw', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'P33 cabinet down' OR c.camera_name = '46 - P33 cabinet down') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 114: move camera beach 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'move camera beach 1' OR c.name = '47 - move camera beach 1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_113_ml6przxr', c.id, '2026-02-03'::date, NULL, NULL, 'PR ', NULL, 'PR ', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'move camera beach 1' OR c.camera_name = '47 - move camera beach 1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 115: P33 camera
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'adj camera',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'P33 camera' OR c.name = '48 - P33 camera');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_114_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'adj camera', 'adj camera', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'P33 camera' OR c.camera_name = '48 - P33 camera') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 116: D3-4 cabinet nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Sw down',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'D3-4 cabinet nolink' OR c.name = '49 - D3-4 cabinet nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_115_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'Sw down - replace new sw', 'Sw down', 'replace new sw', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'D3-4 cabinet nolink' OR c.camera_name = '49 - D3-4 cabinet nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 117: R29 cabinet nolink
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Sw down',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R29 cabinet nolink' OR c.name = '50 - R29 cabinet nolink');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_116_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'Sw down - replace new sw', 'Sw down', 'replace new sw', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'R29 cabinet nolink' OR c.camera_name = '50 - R29 cabinet nolink') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 118: Replace new HDD
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = '2025-05-07T17:00:00.000Z'::timestamptz,
      reason = 'HDD error',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Replace new HDD' OR c.name = '51 - Replace new HDD');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_117_ml6przxs', c.id, '2025-05-07'::date, NULL, '2025-05-07T17:00:00.000Z'::timestamptz, 'HDD error', 'HDD error', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'Replace new HDD' OR c.camera_name = '51 - Replace new HDD') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 119: Camera V-sense
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Camera V-sense' OR c.name = '52 - Camera V-sense');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_118_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'active camera v-sen', NULL, 'active camera v-sen', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'Camera V-sense' OR c.camera_name = '52 - Camera V-sense') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 120: R27,R28 camera
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'Camera broken',
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'R27,R28 camera' OR c.name = '53 - R27,R28 camera');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_119_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'Camera broken - replace new cam', 'Camera broken', 'replace new cam', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'R27,R28 camera' OR c.camera_name = '53 - R27,R28 camera') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 121: Tivi
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'done'
    WHERE c.property_id = 'PROP_VILLAS' AND (c.name = 'Tivi' OR c.name = '54 - Tivi');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_VIL_120_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'replace new tivi', NULL, 'replace new tivi', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_VILLAS' AND (c.camera_name = 'Tivi' OR c.camera_name = '54 - Tivi') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- VILLAS row 123: Thời gian lưu MH1: 36 ngày
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND c.name = 'Thời gian lưu MH1: 36 ngày';
-- VILLAS row 124: Thời gian lưu MH2: 37 ngày
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND c.name = 'Thời gian lưu MH2: 37 ngày';
-- VILLAS row 125: Thời gian lưu MH3: 24 ngày
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND c.name = 'Thời gian lưu MH3: 24 ngày';
-- VILLAS row 126: * Camera vận hành : 49 Camera củ + 9 Camera mới + 09 Danaksara + 03 lobby + 02 Lamuse Gomet + 02 D5 (trong vườn) + 01 Cam P23-4 + 01 Cam S18 + 01 buggy + 05 Cam pickleball (19/2/25) + 01 Cam Minimat (5/6/25) + 05 Cam V-sense Tổng Cộng: 88 camera đang vận hành.
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_VILLAS' AND c.name = '* Camera vận hành : 49 Camera củ + 9 Camera mới + 09 Danaksara + 03 lobby + 02 Lamuse Gomet + 02 D5 (trong vườn)
+ 01 Cam P23-4 + 01 Cam S18 + 01 buggy + 05 Cam pickleball (19/2/25) + 01 Cam Minimat (5/6/25) + 05 Cam V-sense
Tổng Cộng: 88 camera đang vận hành.';
-- ARIYANA row 5: P.Rữa 19L
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'P.Rữa 19L' OR c.name = '1 - P.Rữa 19L');
-- ARIYANA row 6: Hành Lang
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang' OR c.name = '2 - Hành Lang');
-- ARIYANA row 7: P.Chiết Rót
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'P.Chiết Rót' OR c.name = '3 - P.Chiết Rót');
-- ARIYANA row 8: Hành lang Beack lounge
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành lang Beack lounge' OR c.name = '4 - Hành lang Beack lounge');
-- ARIYANA row 9: HL B room 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'HL B room 3' OR c.name = '5 - HL B room 3');
-- ARIYANA row 10: Trước BR3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Trước BR3' OR c.name = '6 - Trước BR3');
-- ARIYANA row 11: Giữa BR1 ab
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Giữa BR1 ab' OR c.name = '7 - Giữa BR1 ab');
-- ARIYANA row 12: Giữa BR1 b a
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Giữa BR1 b a' OR c.name = '8 - Giữa BR1 b a');
-- ARIYANA row 13: Sau, Giữa BR
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Sau, Giữa BR' OR c.name = '9 - Sau, Giữa BR');
-- ARIYANA row 14: P.Lọc RO
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'P.Lọc RO' OR c.name = '10 - P.Lọc RO');
-- ARIYANA row 15: Thành Phẩm
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Thành Phẩm' OR c.name = '11 - Thành Phẩm');
-- ARIYANA row 16: San pickleball 3
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'San pickleball 3' OR c.name = '12 - San pickleball 3');
-- ARIYANA row 17: san pickleball 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'san pickleball 2' OR c.name = '13 - san pickleball 2');
-- ARIYANA row 18: Quầy pickleball
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Quầy pickleball' OR c.name = '14 - Quầy pickleball');
-- ARIYANA row 19: sân pickleball 4
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'sân pickleball 4' OR c.name = '15 - sân pickleball 4');
-- ARIYANA row 20: sân pickleball 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'sân pickleball 1' OR c.name = '16 - sân pickleball 1');
-- ARIYANA row 21: Cam AR 2 sau
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Cam AR 2 sau' OR c.name = '17 - Cam AR 2 sau');
-- ARIYANA row 22: Cam AR 2 trước
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Cam AR 2 trước' OR c.name = '18 - Cam AR 2 trước');
-- ARIYANA row 23: Cam AR 3 sau
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Cam AR 3 sau' OR c.name = '19 - Cam AR 3 sau');
-- ARIYANA row 24: Cam AR 1 sau
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Cam AR 1 sau' OR c.name = '20 - Cam AR 1 sau');
-- ARIYANA row 25: Cam AR 1 trước
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'Done'
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Cam AR 1 trước' OR c.name = '21 - Cam AR 1 trước');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_ARI_24_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'Cập nhật từ Excel', NULL, NULL, 'Done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_ARIYANA' AND (c.camera_name = 'Cam AR 1 trước' OR c.camera_name = '21 - Cam AR 1 trước') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- ARIYANA row 26: Cam AR 2 trước
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'No colour',
      done_by = 'done'
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Cam AR 2 trước' OR c.name = '22 - Cam AR 2 trước');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_ARI_25_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'No colour', 'No colour', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_ARIYANA' AND (c.camera_name = 'Cam AR 2 trước' OR c.camera_name = '22 - Cam AR 2 trước') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- ARIYANA row 27: Beach luonge
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Beach luonge' OR c.name = '23 - Beach luonge');
-- ARIYANA row 28: WC sau Beach Lounge
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'WC sau Beach Lounge' OR c.name = '24 - WC sau Beach Lounge');
-- ARIYANA row 29: CNN.1 Ocean Gate
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CNN.1 Ocean Gate' OR c.name = '25 - CNN.1 Ocean Gate');
-- ARIYANA row 30: B.H.DAN
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'B.H.DAN' OR c.name = '26 - B.H.DAN');
-- ARIYANA row 31: Drop Off
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Drop Off' OR c.name = '27 - Drop Off');
-- ARIYANA row 32: Ra Ram Dóc
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Ra Ram Dóc' OR c.name = '28 - Ra Ram Dóc');
-- ARIYANA row 33: Ngũ Hành Sơn
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Ngũ Hành Sơn' OR c.name = '29 - Ngũ Hành Sơn');
-- ARIYANA row 34: Hành Lang T2 hướng VNG
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang T2 hướng VNG' OR c.name = '30 - Hành Lang T2 hướng VNG');
-- ARIYANA row 35: Hành Lang Huế Room
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang Huế Room' OR c.name = '31 - Hành Lang Huế Room');
-- ARIYANA row 36: Hành Lang Phong Nha
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang Phong Nha' OR c.name = '32 - Hành Lang Phong Nha');
-- ARIYANA row 37: Hành lang Hạ Long
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành lang Hạ Long' OR c.name = '33 - Hành lang Hạ Long');
-- ARIYANA row 38: WC sau Mỹ Sơn
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'WC sau Mỹ Sơn' OR c.name = '34 - WC sau Mỹ Sơn');
-- ARIYANA row 39: Hành Lang Mỹ Sơn & Hội An
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang Mỹ Sơn & Hội An' OR c.name = '35 - Hành Lang Mỹ Sơn & Hội An');
-- ARIYANA row 40: Hành Lang Hội An & Mỹ Sơn
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang Hội An & Mỹ Sơn' OR c.name = '36 - Hành Lang Hội An & Mỹ Sơn');
-- ARIYANA row 41: Hành Lang T2 Central
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang T2 Central' OR c.name = '37 - Hành Lang T2 Central');
-- ARIYANA row 42: Hành Lang T2 central VNG
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang T2 central VNG' OR c.name = '38 - Hành Lang T2 central VNG');
-- ARIYANA row 43: Hành Lang T2 Giữa
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang T2 Giữa' OR c.name = '39 - Hành Lang T2 Giữa');
-- ARIYANA row 44: Hội An 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hội An 1' OR c.name = '40 - Hội An 1');
-- ARIYANA row 45: Hội An 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hội An 2' OR c.name = '41 - Hội An 2');
-- ARIYANA row 46: My Sơn 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'My Sơn 1' OR c.name = '42 - My Sơn 1');
-- ARIYANA row 47: My Sơn 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'My Sơn 2' OR c.name = '43 - My Sơn 2');
-- ARIYANA row 48: Huế
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Huế' OR c.name = '44 - Huế');
-- ARIYANA row 49: Phong Nha
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Phong Nha' OR c.name = '45 - Phong Nha');
-- ARIYANA row 50: Hạ Long
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hạ Long' OR c.name = '46 - Hạ Long');
-- ARIYANA row 51: Hành Lang Bep
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang Bep' OR c.name = '47 - Hành Lang Bep');
-- ARIYANA row 52: Hành Lang Bếp
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Hành Lang Bếp' OR c.name = '48 - Hành Lang Bếp');
-- ARIYANA row 53: Main Kitchen T1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'no colour',
      done_by = 'done'
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Main Kitchen T1' OR c.name = '49 - Main Kitchen T1');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_ARI_52_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'no colour', 'no colour', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_ARIYANA' AND (c.camera_name = 'Main Kitchen T1' OR c.camera_name = '49 - Main Kitchen T1') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- ARIYANA row 56: CT 2 Vào Trệt 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT 2 Vào Trệt 1' OR c.name = '1 - CT 2 Vào Trệt 1');
-- ARIYANA row 57: CT 4 Cầu Thang
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT 4 Cầu Thang' OR c.name = '2 - CT 4 Cầu Thang');
-- ARIYANA row 58: CT 3 Function 1 6 7
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT 3 Function 1 6 7' OR c.name = '3 - CT 3 Function 1 6 7');
-- ARIYANA row 59: C1.6 Ram Dóc
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'C1.6 Ram Dóc' OR c.name = '4 - C1.6 Ram Dóc');
-- ARIYANA row 60: IP dome
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'IP dome' OR c.name = '5 - IP dome');
-- ARIYANA row 61: CNN4.Ipdome
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CNN4.Ipdome' OR c.name = '6 - CNN4.Ipdome');
-- ARIYANA row 62: CT.5 Kho Hoa
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT.5 Kho Hoa' OR c.name = '7 - CT.5 Kho Hoa');
-- ARIYANA row 63: T.Máy NV 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'T.Máy NV 2' OR c.name = '8 - T.Máy NV 2');
-- ARIYANA row 64: T.Máy 3 KIT
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'T.Máy 3 KIT' OR c.name = '9 - T.Máy 3 KIT');
-- ARIYANA row 65: CT6. Thang Máy 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT6. Thang Máy 1' OR c.name = '10 - CT6. Thang Máy 1');
-- ARIYANA row 66: CT 7 Rest room
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT 7 Rest room' OR c.name = '11 - CT 7 Rest room');
-- ARIYANA row 67: CT.8 Office
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT.8 Office' OR c.name = '12 - CT.8 Office');
-- ARIYANA row 68: CT.9 Kho 7 canteen
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT.9 Kho 7 canteen' OR c.name = '13 - CT.9 Kho 7 canteen');
-- ARIYANA row 69: CT 10 Thang Máy NV
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT 10 Thang Máy NV' OR c.name = '14 - CT 10 Thang Máy NV');
-- ARIYANA row 70: CT11 Kiểm Tra NV
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT11 Kiểm Tra NV' OR c.name = '15 - CT11 Kiểm Tra NV');
-- ARIYANA row 71: CT12 Receiving
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT12 Receiving' OR c.name = '16 - CT12 Receiving');
-- ARIYANA row 72: CT13 Vào trệt 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT13 Vào trệt 2' OR c.name = '17 - CT13 Vào trệt 2');
-- ARIYANA row 73: CT16 Linen room
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT16 Linen room' OR c.name = '18 - CT16 Linen room');
-- ARIYANA row 74: CT1 Lối Vào Trệt 1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT1 Lối Vào Trệt 1' OR c.name = '19 - CT1 Lối Vào Trệt 1');
-- ARIYANA row 75: CT Nhà Xe NV
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = 'done'
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT Nhà Xe NV' OR c.name = '20 - CT Nhà Xe NV');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_ARI_74_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'move camera', NULL, 'move camera', 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_ARIYANA' AND (c.camera_name = 'CT Nhà Xe NV' OR c.camera_name = '20 - CT Nhà Xe NV') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- ARIYANA row 76: CT Can teen
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT Can teen' OR c.name = '21 - CT Can teen');
-- ARIYANA row 77: CT Kho Lạnh
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT Kho Lạnh' OR c.name = '22 - CT Kho Lạnh');
-- ARIYANA row 78: Gaz Store
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Gaz Store' OR c.name = '23 - Gaz Store');
-- ARIYANA row 79: CNN.3 Ipdome Tượng Mẹ
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'no colour',
      done_by = 'done'
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CNN.3 Ipdome Tượng Mẹ' OR c.name = '24 - CNN.3 Ipdome Tượng Mẹ');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_ARI_78_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'no colour', 'no colour', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_ARIYANA' AND (c.camera_name = 'CNN.3 Ipdome Tượng Mẹ' OR c.camera_name = '24 - CNN.3 Ipdome Tượng Mẹ') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- ARIYANA row 80: CNN.2 Ipdome A7
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CNN.2 Ipdome A7' OR c.name = '25 - CNN.2 Ipdome A7');
-- ARIYANA row 81: C1.10 Main Kitchen t1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'C1.10 Main Kitchen t1' OR c.name = '26 - C1.10 Main Kitchen t1');
-- ARIYANA row 82: C2 Kho 2.2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'C2 Kho 2.2' OR c.name = '27 - C2 Kho 2.2');
-- ARIYANA row 83: C2 Kho 2.1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'C2 Kho 2.1' OR c.name = '28 - C2 Kho 2.1');
-- ARIYANA row 84: C2 Kho 1.1
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'C2 Kho 1.1' OR c.name = '29 - C2 Kho 1.1');
-- ARIYANA row 85: C2 Kho 1.2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'C2 Kho 1.2' OR c.name = '30 - C2 Kho 1.2');
-- ARIYANA row 86: CT14 Giữa Trệt 1&2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT14 Giữa Trệt 1&2' OR c.name = '31 - CT14 Giữa Trệt 1&2');
-- ARIYANA row 87: CT.15 Kho ENG vào trệt 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = NULL,
      done_by = NULL
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'CT.15 Kho ENG vào trệt 2' OR c.name = '32 - CT.15 Kho ENG vào trệt 2');
-- ARIYANA row 88: 5 camera Pickleball
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'power down',
      done_by = 'done'
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = '5 camera Pickleball' OR c.name = '33 - 5 camera Pickleball');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_ARI_87_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'power down', 'power down', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_ARIYANA' AND (c.camera_name = '5 camera Pickleball' OR c.camera_name = '33 - 5 camera Pickleball') LIMIT 1
ON CONFLICT (id) DO NOTHING;
-- ARIYANA row 89: Monitor 2
UPDATE cameras c SET 
      status = 'ONLINE'::camera_status,
      error_time = NULL,
      fixed_time = NULL,
      reason = 'monitor lag',
      done_by = 'done'
    WHERE c.property_id = 'PROP_ARIYANA' AND (c.name = 'Monitor 2' OR c.name = '34 - Monitor 2');
INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT 'L_ARI_88_ml6przxs', c.id, '2026-02-03'::date, NULL, NULL, 'monitor lag', 'monitor lag', NULL, 'done', 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = 'PROP_ARIYANA' AND (c.camera_name = 'Monitor 2' OR c.camera_name = '34 - Monitor 2') LIMIT 1
ON CONFLICT (id) DO NOTHING;

-- Tổng: 361 UPDATE cameras, 131 INSERT maintenance_logs (nếu có dữ liệu).