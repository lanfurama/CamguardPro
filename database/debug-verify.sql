-- FILE: database/debug-verify.sql
-- Kiem tra xem camera co ton tai khong
SELECT 'Checking DANANG 1L' as check_name, id, name, property_id, status, error_time, reason 
FROM cameras 
WHERE name = 'DANANG 1L' OR name LIKE '%DANANG 1L%';

-- Kiem tra tong so camera
SELECT count(*) as total_cameras FROM cameras;

-- Kiem tra xem co camera nao da duoc update error_time chua
SELECT count(*) as updated_with_error FROM cameras WHERE error_time IS NOT NULL;

-- Kiem tra xem logs da vao chua
SELECT count(*) as maintenance_logs_count FROM maintenance_logs;
