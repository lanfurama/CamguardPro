/**
 * Đọc file "Check list Camera All Site.xlsx" và sinh SQL để:
 * - UPDATE cameras.status theo cột Status (sheet RESORT)
 * - INSERT vào maintenance_logs: error_time, fixed_time, reason, solution, technician
 * Match camera theo property_id + name (Position hoặc "No - Position").
 *
 * Chạy: node scripts/update-cameras-from-excel.mjs
 * Output: database/update-cameras-from-excel.sql
 */

import X from 'xlsx';
import fs from 'fs';
import path from 'path';

const excelPath = path.join(process.cwd(), 'Check list Camera All Site.xlsx');
const outPath = path.join(process.cwd(), 'database', 'update-cameras-from-excel.sql');

const SHEET_TO_PROP = {
  RESORT: 'PROP_RESORT',
  VILLAS: 'PROP_VILLAS',
  ARIYANA: 'PROP_ARIYANA',
};

// Map Status Excel -> DB (giống constants.ts STATUS_EXCEL_MAP + fallback)
function mapStatus(statusStr) {
  if (!statusStr || typeof statusStr !== 'string') return 'ONLINE';
  const s = statusStr.trim();
  const map = {
    ok: 'ONLINE', OK: 'ONLINE', Ok: 'ONLINE',
    done: 'ONLINE', Done: 'ONLINE',
    pending: 'WARNING', Pending: 'WARNING',
    maintenance: 'MAINTENANCE', repair: 'MAINTENANCE',
    error: 'WARNING', lỗi: 'WARNING', mất: 'WARNING', nghi: 'WARNING',
  };
  const lower = s.toLowerCase();
  for (const [key, value] of Object.entries(map)) {
    if (lower.includes(key.toLowerCase())) return value;
  }
  if (/ok|bình thường/i.test(s)) return 'ONLINE';
  if (/pending|chờ|lỗi|mất|nghi|error/i.test(s)) return 'WARNING';
  if (/maintenance|sửa|repair|done/i.test(s)) return 'MAINTENANCE';
  return 'ONLINE';
}

function esc(s) {
  return (s || '').replace(/'/g, "''");
}

/** Excel serial hoặc chuỗi ngày -> ISO string cho PostgreSQL */
function toIsoIfDate(v) {
  const s = String(v ?? '').trim();
  if (!s) return null;
  const n = Number(s);
  if (!Number.isNaN(n) && n > 0 && n < 3000000) {
    const ms = (n - 25569) * 86400 * 1000;
    const d = new Date(ms);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }
  const parsed = new Date(s);
  return Number.isNaN(parsed.getTime()) ? null : parsed.toISOString();
}

/** Chuỗi ngày -> YYYY-MM-DD cho log_date */
function toDateOnly(v) {
  const iso = toIsoIfDate(v);
  return iso ? iso.slice(0, 10) : null;
}

if (!fs.existsSync(excelPath)) {
  console.error('File không tồn tại:', excelPath);
  process.exit(1);
}

const wb = X.readFile(excelPath);
const statements = [];

statements.push(`-- Cập nhật status, error time, fixed time, reason từ Check list Camera All Site.xlsx
-- Sinh bởi: node scripts/update-cameras-from-excel.mjs
-- Chạy sau khi đã có cameras (seed-furama-sites.sql): psql -f database/update-cameras-from-excel.sql
-- Match camera theo property_id + name (Position hoặc "No - Position").
`);

let updateCount = 0;
let logCount = 0;

for (const sheetName of ['RESORT', 'VILLAS', 'ARIYANA']) {
  const propId = SHEET_TO_PROP[sheetName];
  const sh = wb.Sheets[sheetName];
  if (!sh) continue;

  const arr = X.utils.sheet_to_json(sh, { header: 1, defval: '', raw: false });
  const hasStatus = sheetName === 'RESORT';
  const dataStart = 4;

  for (let i = dataStart; i < arr.length; i++) {
    const row = arr[i] || [];
    const no = (row[0] ?? '').toString().trim();
    const position = (row[1] ?? '').toString().trim();
    if (!position || position === 'Màn hình 1' || /^\d+$/.test(position)) continue;

    const statusStr = hasStatus ? (row[2] ?? '').toString().trim() : '';
    const errTime = hasStatus ? row[4] : row[3];
    const fixedTime = hasStatus ? row[5] : row[4];
    const reason = (hasStatus ? row[6] : row[5]) ?? '';
    const doneBy = (hasStatus ? row[7] : row[6]) ?? '';
    const solution = (hasStatus ? row[8] : row[7]) ?? '';

    const nameAlt = no ? `${no} - ${position}` : position;
    const status = mapStatus(statusStr);

    const errIso = toIsoIfDate(errTime);
    const fixIso = toIsoIfDate(fixedTime);
    const reasonVal = reason && String(reason).trim() ? `'${esc(reason)}'` : 'NULL';
    const doneByVal = doneBy && String(doneBy).trim() ? `'${esc(doneBy)}'` : 'NULL';

    // UPDATE cameras SET status = ... WHERE property_id AND (name = position OR name = nameAlt)
    const whereName = no
      ? `(c.name = '${esc(position)}' OR c.name = '${esc(nameAlt)}')`
      : `c.name = '${esc(position)}'`;
    statements.push(`-- ${sheetName} row ${i + 1}: ${position.replace(/[\r\n]+/g, ' ')}`);
    statements.push(`UPDATE cameras c SET 
      status = '${status}'::camera_status,
      error_time = ${errIso ? `'${errIso}'::timestamptz` : 'NULL'},
      fixed_time = ${fixIso ? `'${fixIso}'::timestamptz` : 'NULL'},
      reason = ${reasonVal},
      done_by = ${doneByVal}
    WHERE c.property_id = '${propId}' AND ${whereName};`);
    updateCount++;

    // INSERT maintenance_logs nếu có ít nhất một trong: reason, solution, errTime, fixedTime, doneBy
    const hasLog = [reason, solution, errTime, fixedTime, doneBy].some((x) => x != null && String(x).trim() !== '');
    if (hasLog) {
      const logId = `L_${sheetName.slice(0, 3)}_${i}_${Date.now().toString(36)}`.replace(/\s/g, '_');
      const logDate = toDateOnly(fixedTime) || toDateOnly(errTime) || new Date().toISOString().slice(0, 10);
      const desc = [reason, solution].filter(Boolean).join(' - ') || 'Cập nhật từ Excel';
      const fromWhere = no
        ? `(c.camera_name = '${esc(position)}' OR c.camera_name = '${esc(nameAlt)}')`
        : `c.camera_name = '${esc(position)}'`;

      statements.push(`INSERT INTO maintenance_logs (id, camera_id, log_date, error_time, fixed_time, description, reason, solution, technician, type)
SELECT '${logId}', c.id, '${logDate}'::date, ${errIso ? `'${errIso}'::timestamptz` : 'NULL'}, ${fixIso ? `'${fixIso}'::timestamptz` : 'NULL'}, '${esc(desc)}', ${reason && String(reason).trim() ? `'${esc(reason)}'` : 'NULL'}, ${solution && String(solution).trim() ? `'${esc(solution)}'` : 'NULL'}, ${doneBy && String(doneBy).trim() ? `'${esc(doneBy)}'` : 'NULL'}, 'REPAIR'
FROM v_cameras_full c WHERE c.property_id = '${propId}' AND ${fromWhere} LIMIT 1
ON CONFLICT (id) DO NOTHING;`);
      logCount++;
    }
  }
}

statements.push('');
statements.push(`-- Tổng: ${updateCount} UPDATE cameras, ${logCount} INSERT maintenance_logs (nếu có dữ liệu).`);

fs.writeFileSync(outPath, statements.join('\n'), 'utf8');
console.log('Wrote', outPath);
console.log('UPDATE cameras:', updateCount, '| INSERT maintenance_logs:', logCount);
