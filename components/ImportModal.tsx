import React, { useState } from 'react';
import { X, Upload, Copy, AlertCircle, FileSpreadsheet, Download } from 'lucide-react';
import * as XLSX from 'xlsx';
import { Camera, Property } from '../types';
import { STATUS_EXCEL_MAP } from '../constants';

const TEMPLATE_SHEET_NAME = 'Cameras';
const TEMPLATE_FILENAME = 'CamguardPro_Import_Camera_Mau.xlsx';

/** Tạo và tải file Excel mẫu để người dùng biết định dạng import */
function downloadTemplateExcel(): void {
  const headers = ['Tên Camera', 'IP', 'Mã Toà Nhà', 'Khu Vực', 'Hãng', 'Model', 'Ghi chú'];
  const sampleRows = [
    ['Cam Sảnh 1', '192.168.1.100', 'PROP_001', 'Sảnh chính', 'Hikvision', 'DS-2CD', 'Camera quan sát cửa chính'],
    ['Cam Kho A-01', '192.168.1.101', 'PROP_002', 'Kho A', 'Dahua', 'IPC-HFW', 'Cửa nhập hàng'],
  ];
  const wsData = [headers, ...sampleRows];
  const ws = XLSX.utils.aoa_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, TEMPLATE_SHEET_NAME);
  XLSX.writeFile(wb, TEMPLATE_FILENAME);
}

interface Props {
  properties: Property[];
  onImport: (cameras: Camera[]) => void | Promise<boolean>;
  onClose: () => void;
}

const EXCEL_SHEET_TO_PROP: Record<string, string> = {
  RESORT: 'PROP_RESORT',
  VILLAS: 'PROP_VILLAS',
  ARIYANA: 'PROP_ARIYANA',
};

function mapExcelStatusToApp(status: string): 'ONLINE' | 'OFFLINE' | 'MAINTENANCE' | 'WARNING' {
  if (!status || typeof status !== 'string') return 'ONLINE';
  const s = status.trim();
  for (const [key, value] of Object.entries(STATUS_EXCEL_MAP)) {
    if (s.toLowerCase().includes(key.toLowerCase())) return value;
  }
  if (/ok|bình thường/i.test(s)) return 'ONLINE';
  if (/pending|chờ|lỗi|mất|nghi|error/i.test(s)) return 'WARNING';
  if (/maintenance|sửa|repair|done/i.test(s)) return 'MAINTENANCE';
  return 'ONLINE';
}

function parseSimpleSheet(wb: XLSX.WorkBook, ts: number): Camera[] | null {
  const sheetNames = wb.SheetNames;
  const templateNames = [TEMPLATE_SHEET_NAME, 'Danh sách camera', 'Cameras', 'Sheet1'];
  for (const name of [...templateNames, ...sheetNames]) {
    const sh = wb.Sheets[name];
    if (!sh) continue;
    const arr = XLSX.utils.sheet_to_json(sh, { header: 1, defval: '', raw: false }) as string[][];
    if (arr.length < 2) continue;
    const headerRow = (arr[0] || []).map((c: unknown) => String(c ?? '').trim());
    const idxName = headerRow.findIndex(h => /tên\s*camera|name/i.test(h));
    const idxIp = headerRow.findIndex(h => /^\s*ip\s*$/i.test(h));
    const idxProp = headerRow.findIndex(h => /mã\s*toà\s*nhà|property|propertyid/i.test(h));
    const idxZone = headerRow.findIndex(h => /khu\s*vực|zone/i.test(h));
    const idxBrand = headerRow.findIndex(h => /hãng|brand/i.test(h));
    const idxModel = headerRow.findIndex(h => /model/i.test(h));
    const idxNotes = headerRow.findIndex(h => /ghi\s*chú|notes/i.test(h));
    if (idxName === -1 || idxProp === -1) continue;
    const cameras: Camera[] = [];
    for (let i = 1; i < arr.length; i++) {
      const row = arr[i] || [];
      const name = (row[idxName] ?? '').toString().trim();
      const ip = idxIp >= 0 ? (row[idxIp] ?? '').toString().trim() : 'TBD';
      const propertyId = (row[idxProp] ?? '').toString().trim();
      if (!name && !propertyId) continue;
      const zone = idxZone >= 0 ? (row[idxZone] ?? '').toString().trim() : '';
      const brand = idxBrand >= 0 ? (row[idxBrand] ?? '').toString().trim() || 'Unknown' : 'Unknown';
      const model = idxModel >= 0 ? (row[idxModel] ?? '').toString().trim() : '';
      const notes = idxNotes >= 0 ? (row[idxNotes] ?? '').toString().trim() || 'Import từ Excel' : 'Import từ Excel';
      cameras.push({
        id: `CAM_EXCEL_${ts}_${name}_${i}`,
        name: name || `Camera ${i}`,
        ip: ip || 'TBD',
        propertyId: propertyId || 'PROP_001',
        zone: zone || name,
        location: zone || name,
        brand,
        model,
        specs: '',
        supplier: 'Import Excel',
        status: 'ONLINE',
        consecutiveDrops: 0,
        lastPingTime: Date.now(),
        logs: [],
        notes,
      });
    }
    if (cameras.length > 0) return cameras;
  }
  return null;
}

function parseExcelFile(file: File): Promise<Camera[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        if (!data) {
          reject(new Error('Không đọc được file'));
          return;
        }
        const wb = XLSX.read(data, { type: 'binary', raw: false });
        const cameras: Camera[] = [];
        const ts = Date.now();

        const simple = parseSimpleSheet(wb, ts);
        if (simple && simple.length > 0) {
          resolve(simple);
          return;
        }

        for (const sheetName of ['RESORT', 'VILLAS', 'ARIYANA']) {
          const propId = EXCEL_SHEET_TO_PROP[sheetName];
          const sh = wb.Sheets[sheetName];
          if (!sh) continue;

          const arr = XLSX.utils.sheet_to_json(sh, { header: 1, defval: '', raw: false }) as string[][];
          const hasStatus = sheetName === 'RESORT'; // RESORT has Status column at index 2
          const dataStart = 4; // skip title rows, header at 2, "Màn hình" row at 3

          for (let i = dataStart; i < arr.length; i++) {
            const row = arr[i] || [];
            const no = (row[0] ?? '').toString().trim();
            const position = (row[1] ?? '').toString().trim();
            if (!position || position === 'Màn hình 1' || /^\d+$/.test(position)) continue;

            const statusStr = hasStatus ? (row[2] ?? '').toString().trim() : '';
            const errTime = (hasStatus ? row[4] : row[3]) ?? '';
            const fixedTime = (hasStatus ? row[5] : row[4]) ?? '';
            const reason = (hasStatus ? row[6] : row[5]) ?? '';
            const doneBy = (hasStatus ? row[7] : row[6]) ?? '';
            const solution = (hasStatus ? row[8] : row[7]) ?? '';

            const notesParts = [reason, solution, errTime ? `Error: ${errTime}` : '', fixedTime ? `Fixed: ${fixedTime}` : '', doneBy ? `By: ${doneBy}` : ''].filter(Boolean);
            const notes = notesParts.join(' | ') || 'Import từ Excel Check list Camera';

            /** Chuyển giá trị Excel (số serial hoặc chuỗi ngày) sang ISO string cho DB */
            const toIsoIfDate = (v: string | number): string | undefined => {
              const s = String(v ?? '').trim();
              if (!s) return undefined;
              const n = Number(s);
              if (!Number.isNaN(n) && n > 0 && n < 3000000) {
                const ms = (n - 25569) * 86400 * 1000;
                const d = new Date(ms);
                if (!Number.isNaN(d.getTime())) return d.toISOString();
              }
              const parsed = new Date(s);
              return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString();
            };

            const logs: Camera['logs'] = [];
            if (reason || solution || errTime || fixedTime || doneBy) {
              const errStr = String(errTime ?? '').trim();
              const fixStr = String(fixedTime ?? '').trim();
              const errIso = toIsoIfDate(errTime ?? '');
              const fixIso = toIsoIfDate(fixedTime ?? '');
              const logDateRaw = fixStr && /^\d/.test(fixStr) ? fixStr : errStr || new Date().toISOString().slice(0, 10);
              const logDateYmd = /^\d{4}-\d{2}-\d{2}$/.test(logDateRaw)
                ? logDateRaw
                : (fixIso || errIso || '').slice(0, 10) || new Date().toISOString().slice(0, 10);
              const desc = [reason, solution].filter(Boolean).join(' - ') || 'Lịch sử từ Excel';
              logs.push({
                id: `LOG_EXCEL_${ts}_${sheetName}_${i}`,
                date: logDateYmd,
                description: desc,
                technician: doneBy || undefined,
                type: 'REPAIR',
                errorTime: errIso || (errStr ? errStr : undefined),
                fixedTime: fixIso || (fixStr ? fixStr : undefined),
                reason: (reason && String(reason).trim()) || undefined,
                solution: (solution && String(solution).trim()) || undefined,
              });
            }

            cameras.push({
              id: `CAM_EXCEL_${ts}_${sheetName}_${i}`,
              name: no ? `${no} - ${position}` : position,
              ip: 'TBD',
              propertyId: propId,
              zone: position,
              location: position,
              brand: 'Unknown',
              model: '',
              specs: '',
              supplier: 'Import Excel',
              status: mapExcelStatusToApp(statusStr),
              consecutiveDrops: 0,
              lastPingTime: Date.now(),
              logs,
              notes,
            });
          }
        }

        resolve(cameras);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Lỗi đọc file'));
    reader.readAsBinaryString(file);
  });
}

export const ImportModal: React.FC<Props> = ({ properties, onImport, onClose }) => {
  const [mode, setMode] = useState<'csv' | 'excel'>('csv');
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [excelFile, setExcelFile] = useState<File | null>(null);

  const template = `Tên Camera,IP,Mã Toà Nhà,Khu Vực,Hãng,Model
Cam Sảnh 1,192.168.1.100,PROP_001,Sảnh chính,Hikvision,DS-2CD
Cam Kho 2,192.168.1.101,PROP_002,Kho A,Dahua,IPC-HFW`;

  const propertyList = properties.map(p => `${p.id}: ${p.name}`).join('\n');

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(template);
  };

  const handleProcessCsv = async () => {
    setError(null);
    if (!text.trim()) return;

    const lines = text.trim().split('\n');
    const newCameras: Camera[] = [];
    const lineErrors: string[] = [];
    const startIdx = lines[0].includes('Mã Toà Nhà') ? 1 : 0;

    for (let i = startIdx; i < lines.length; i++) {
      const parts = lines[i].split(',').map(p => p.trim());
      if (parts.length < 3) {
        lineErrors.push(`Dòng ${i + 1}: Thiếu thông tin (Tên, IP, Mã Toà Nhà là bắt buộc)`);
        continue;
      }
      const [name, ip, propId, zone, brand, model] = parts;
      const propExists = properties.find(p => p.id === propId);
      if (!propExists) {
        lineErrors.push(`Dòng ${i + 1}: Mã toà nhà '${propId}' không tồn tại.`);
        continue;
      }
      newCameras.push({
        id: `CAM_IMP_${Date.now()}_${i}`,
        name,
        ip,
        propertyId: propId,
        zone: zone || '',
        brand: brand || 'Unknown',
        model: model || '',
        location: '',
        specs: '',
        supplier: 'Imported',
        status: 'ONLINE',
        consecutiveDrops: 0,
        lastPingTime: Date.now(),
        logs: [],
        notes: 'Imported via bulk tool',
      });
    }

    if (lineErrors.length > 0) {
      setError(lineErrors.join('\n'));
    } else {
      setImporting(true);
      try {
        const result = await onImport(newCameras);
        if (result !== false) onClose();
      } finally {
        setImporting(false);
      }
    }
  };

  const handleProcessExcel = async () => {
    setError(null);
    if (!excelFile) {
      setError('Vui lòng chọn file Excel (.xlsx).');
      return;
    }
    setImporting(true);
    try {
      const cameras = await parseExcelFile(excelFile);
      if (cameras.length === 0) {
        setError('Không tìm thấy dòng camera nào. Dùng file mẫu (sheet Cameras) hoặc sheet RESORT/VILLAS/ARIYANA.');
        setImporting(false);
        return;
      }
      const missingProps = [...new Set(cameras.map(c => c.propertyId))].filter(id => !properties.some(p => p.id === id));
      if (missingProps.length) {
        setError(`Chưa có toà nhà: ${missingProps.join(', ')}. Thêm toà nhà trước hoặc dùng đúng Mã Toà Nhà (xem danh sách toà nhà bên dưới).`);
        setImporting(false);
        return;
      }
      const result = await onImport(cameras);
      if (result !== false) onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi đọc file Excel');
    } finally {
      setImporting(false);
    }
  };

  const handleProcess = () => {
    if (mode === 'excel') handleProcessExcel();
    else handleProcessCsv();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-3">
      <div className="bg-white shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        <div className="p-3 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="text-lg font-bold text-slate-900 flex items-center">
            <Upload className="mr-1.5" size={18} /> Import Camera
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>

        <div className="border-b border-slate-200 flex">
          <button
            type="button"
            onClick={() => { setMode('csv'); setError(null); }}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${mode === 'csv' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            CSV (dán)
          </button>
          <button
            type="button"
            onClick={() => { setMode('excel'); setError(null); }}
            className={`px-4 py-2 text-sm font-medium border-b-2 flex items-center gap-1.5 transition ${mode === 'excel' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <FileSpreadsheet size={16} /> Excel (.xlsx)
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {mode === 'csv' && (
            <>
              <div className="bg-blue-50 p-3 mb-3 text-xs text-blue-800 border border-blue-100">
                <p className="font-bold mb-0.5 flex items-center"><AlertCircle size={12} className="mr-1"/> Hướng dẫn:</p>
                <p>Nhập dữ liệu theo định dạng CSV (ngăn cách bởi dấu phẩy). Dòng đầu tiên có thể là tiêu đề.</p>
                <p className="mt-1.5 font-mono bg-white p-1.5 border border-blue-200 text-[11px]">{template}</p>
                <button onClick={handleCopyTemplate} className="mt-1.5 flex items-center text-[11px] font-bold text-blue-600 hover:underline">
                  <Copy size={10} className="mr-1"/> Copy Template
                </button>
              </div>
              <div className="mb-3 text-xs text-slate-500">
                <strong>Mã Toà Nhà hiện có:</strong>
                <pre className="mt-0.5 p-1.5 bg-slate-100 max-h-16 overflow-y-auto text-[11px]">{propertyList}</pre>
              </div>
              <textarea
                className="w-full h-40 border border-slate-300 p-2 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Dán dữ liệu CSV vào đây..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </>
          )}

          {mode === 'excel' && (
            <>
              <div className="bg-amber-50 p-3 mb-3 text-xs text-amber-800 border border-amber-100">
                <p className="font-bold mb-0.5 flex items-center"><FileSpreadsheet size={12} className="mr-1"/> Import file Excel</p>
                <p>Hỗ trợ 2 định dạng:</p>
                <ul className="list-disc ml-4 mt-0.5 space-y-0.5">
                  <li><strong>File mẫu (1 sheet):</strong> Cột Tên Camera, IP, Mã Toà Nhà, Khu Vực, Hãng, Model, Ghi chú. Tải file mẫu bên dưới để xem định dạng.</li>
                  <li><strong>Check list Furama (3 sheet):</strong> RESORT, VILLAS, ARIYANA với No, Position, Status, Error Time, FixedTime, Reason, Done By, Solution.</li>
                </ul>
                <button
                  type="button"
                  onClick={downloadTemplateExcel}
                  className="mt-2 flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-medium rounded border border-amber-200 text-xs"
                >
                  <Download size={14} />
                  Tải file mẫu Excel ({TEMPLATE_FILENAME})
                </button>
              </div>
              <div className="mb-3 text-xs text-slate-500">
                <strong className="text-slate-700">Mã Toà Nhà hiện có:</strong>
                <pre className="mt-0.5 p-1.5 bg-slate-100 max-h-16 overflow-y-auto text-[11px]">{propertyList}</pre>
              </div>
              <div className="mb-3">
                <label className="block text-xs font-medium text-slate-700 mb-1">Chọn file .xlsx</label>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:border-0 file:bg-indigo-50 file:text-indigo-700 file:font-medium file:text-xs"
                  onChange={(e) => setExcelFile(e.target.files?.[0] || null)}
                />
                {excelFile && <p className="mt-0.5 text-[11px] text-slate-500">{excelFile.name}</p>}
              </div>
              <p className="text-[11px] text-slate-500">Điền đúng Mã Toà Nhà từ danh sách trên (hoặc thêm toà nhà mới trước khi import).</p>
            </>
          )}

          {error && (
            <div className="mt-3 p-2 bg-red-50 text-red-700 text-xs border border-red-100 whitespace-pre-line">
              <strong>Lỗi Import:</strong><br/>{error}
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-200 flex justify-end space-x-2 bg-slate-50">
          <button onClick={onClose} className="px-3 py-1.5 text-slate-600 hover:bg-slate-200 text-sm font-medium">Đóng</button>
          <button
            onClick={handleProcess}
            disabled={importing || (mode === 'excel' && !excelFile) || (mode === 'csv' && !text.trim())}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-sm font-medium"
          >
            {importing ? 'Đang import...' : mode === 'excel' ? 'Import từ Excel' : 'Xử Lý Import'}
          </button>
        </div>
      </div>
    </div>
  );
};
