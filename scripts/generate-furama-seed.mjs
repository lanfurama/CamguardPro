import X from 'xlsx';
import fs from 'fs';
import path from 'path';

const w = X.readFile(path.join(process.cwd(), 'Check list Camera All Site.xlsx'));
const sheetToProp = {
  RESORT: { id: 'PROP_RESORT', name: 'Furama Resort', address: 'Furama Resort Danang', manager: 'IT' },
  VILLAS: { id: 'PROP_VILLAS', name: 'Furama Villas', address: 'Furama Villas Danang', manager: 'IT' },
  ARIYANA: { id: 'PROP_ARIYANA', name: 'Ariyana Centre', address: 'Ariyana Centre Danang', manager: 'IT' },
};

function esc(s) {
  return (s || '').replace(/'/g, "''");
}

let sql = `-- Furama sites: 3 properties + zones from Check list Camera All Site.xlsx
-- Chạy sau schema.sql: psql -f database/seed-furama-sites.sql

INSERT INTO properties (id, name, address, manager) VALUES
  ('${sheetToProp.RESORT.id}', '${esc(sheetToProp.RESORT.name)}', '${esc(sheetToProp.RESORT.address)}', '${esc(sheetToProp.RESORT.manager)}'),
  ('${sheetToProp.VILLAS.id}', '${esc(sheetToProp.VILLAS.name)}', '${esc(sheetToProp.VILLAS.address)}', '${esc(sheetToProp.VILLAS.manager)}'),
  ('${sheetToProp.ARIYANA.id}', '${esc(sheetToProp.ARIYANA.name)}', '${esc(sheetToProp.ARIYANA.address)}', '${esc(sheetToProp.ARIYANA.manager)}')
ON CONFLICT (id) DO NOTHING;

`;

for (const [sheet, prop] of Object.entries(sheetToProp)) {
  const sh = w.Sheets[sheet];
  const arr = X.utils.sheet_to_json(sh, { header: 1, defval: '', raw: false });
  const positions = new Set();
  for (let i = 3; i < arr.length; i++) {
    const pos = (arr[i][1] || '').toString().trim();
    if (pos && pos !== 'Màn hình 1' && !/^\d+$/.test(pos)) positions.add(pos);
  }
  const zones = Array.from(positions).sort();
  if (zones.length) {
    sql += `INSERT INTO property_zones (property_id, name) VALUES\n`;
    sql += zones.map((z) => `  ('${prop.id}', '${esc(z)}')`).join(',\n') + '\n';
    sql += `ON CONFLICT (property_id, name) DO NOTHING;\n\n`;
  }
}

const outPath = path.join(process.cwd(), 'database', 'seed-furama-sites.sql');
fs.writeFileSync(outPath, sql, 'utf8');
console.log('Wrote', outPath);
