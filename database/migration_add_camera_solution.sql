-- Ensure cameras table has solution column for Error Time / FixedTime / Reason / Done By / Solution display.
-- Run after schema.sql. Safe to run multiple times (IF NOT EXISTS).
--
-- Required columns on cameras (or v_cameras_full) for table display: is_new, error_time, fixed_time, reason, done_by, solution.
-- If v_cameras_full is built from cameras, recreate the view after this migration so it includes solution.

ALTER TABLE cameras ADD COLUMN IF NOT EXISTS solution TEXT;
