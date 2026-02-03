-- Add solution column to cameras table
ALTER TABLE cameras ADD COLUMN IF NOT EXISTS solution TEXT;

COMMENT ON COLUMN cameras.solution IS 'Giải pháp xử lý khi có lỗi';
