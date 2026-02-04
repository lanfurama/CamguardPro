import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Copy, AlertCircle, FileText, Loader2, CheckCircle } from 'lucide-react';
import { Camera, Property } from '../types';
import { STATUS_EXCEL_MAP } from '../constants';

const CHECKLIST_TEMPLATE = `No,Position,NEW,Error Time,FixedTime,Reason,Done By,Solution
1,ICP LOBBY,,,,,,`;

/** Parse full CSV text into rows; handles quoted fields that may contain newlines. */
function parseCsvWithQuotes(text: string): string[][] {
  const rows: string[][] = [];
  let i = 0;
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  while (i < text.length) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          currentField += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        currentRow.push(currentField);
        currentField = '';
        i += 1;
        if (text[i] === ',') i += 1;
        continue;
      }
      if (c === '\n' || c === '\r') {
        currentField += c;
        i += 1;
        if (c === '\r' && text[i] === '\n') i += 1;
        continue;
      }
      currentField += c;
      i += 1;
    } else {
      if (c === '"') {
        inQuotes = true;
        i += 1;
        continue;
      }
      if (c === ',') {
        currentRow.push(currentField.trim());
        currentField = '';
        i += 1;
        continue;
      }
      if (c === '\n' || c === '\r') {
        currentRow.push(currentField.trim());
        currentField = '';
        rows.push(currentRow);
        currentRow = [];
        i += 1;
        if (c === '\r' && text[i] === '\n') i += 1;
        continue;
      }
      currentField += c;
      i += 1;
    }
  }
  if (currentField !== '' || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }
  return rows;
}

const CHECKLIST_HEADER_NAMES = ['No', 'Position', 'NEW', 'Error Time', 'FixedTime', 'Reason', 'Done By', 'Solution'];

function findChecklistHeader(rows: string[][]): { headerRowIndex: number; indices: Record<string, number> } | null {
  for (let r = 0; r < rows.length; r++) {
    const row = rows[r].map(c => String(c ?? '').trim());
    const positionIdx = row.findIndex(c => /^Position$/i.test(c));
    const hasReason = row.some(c => /^Reason$/i.test(c));
    const hasErrorTime = row.some(c => /^Error\s*Time$/i.test(c));
    const hasFixedTime = row.some(c => /^FixedTime$/i.test(c));
    if (positionIdx === -1 || (!hasReason && !hasErrorTime && !hasFixedTime)) continue;

    const indices: Record<string, number> = {};
    for (const name of CHECKLIST_HEADER_NAMES) {
      const idx = row.findIndex(c => new RegExp(`^${name.replace(/\s+/g, '\\s*')}$`, 'i').test(c));
      if (idx >= 0) indices[name] = idx;
    }
    if (!indices['Position']) indices['Position'] = positionIdx;
    return { headerRowIndex: r, indices };
  }
  return null;
}

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

function toIsoIfDate(v: string | number): string | undefined {
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
}

/** Parse Check list date formats (e.g. "07h14 16/01/25", "16h 26/02/25", "28/01/25") to ISO for PostgreSQL timestamptz. */
function parseChecklistDateToIso(raw: string): string | undefined {
  const firstLine = String(raw ?? '').split(/\r?\n/)[0].trim().replace(/\s+/g, ' ');
  const s = firstLine;
  if (!s) return undefined;
  const iso = toIsoIfDate(s);
  if (iso) return iso;
  // "07h14 16/01/25" or "7h36 25/02/25" or "16h 26/02/25" (no minutes)
  const withTime = s.match(/^(\d{1,2})h(\d{0,2})\s+(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/i);
  if (withTime) {
    const hour = parseInt(withTime[1], 10);
    const min = withTime[2] ? parseInt(withTime[2], 10) : 0;
    const day = parseInt(withTime[3], 10);
    const month = parseInt(withTime[4], 10) - 1;
    let year = parseInt(withTime[5], 10);
    if (year < 100) year += 2000;
    const d = new Date(year, month, day, hour, min, 0, 0);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }
  // "16/01/25" or "28/01/25" or "8/1/26" (date only)
  const dateOnly = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (dateOnly) {
    const day = parseInt(dateOnly[1], 10);
    const month = parseInt(dateOnly[2], 10) - 1;
    let year = parseInt(dateOnly[3], 10);
    if (year < 100) year += 2000;
    const d = new Date(year, month, day, 0, 0, 0, 0);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
  }
  return undefined;
}

interface Props {
  properties: Property[];
  onImport: (cameras: Camera[]) => void | Promise<boolean>;
  onClose: () => void;
}

export const ImportModal: React.FC<Props> = ({ properties, onImport, onClose }) => {
  const [text, setText] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  const checklistTemplate = CHECKLIST_TEMPLATE;

  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [error]);

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(checklistTemplate);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setText(String(reader.result ?? ''));
      setError(null);
    };
    reader.readAsText(file, 'UTF-8');
    e.target.value = '';
  };

  const handleProcessCsv = async () => {
    setError(null);
    setSuccessMessage(null);
    setImporting(true);
    try {
      if (!text.trim()) {
        setError('Vui lòng dán nội dung CSV hoặc chọn file CSV.');
        return;
      }
      if (!selectedPropertyId) {
        setError('Vui lòng chọn toà nhà.');
        return;
      }
      const prop = properties.find(p => p.id === selectedPropertyId);
      if (!prop) {
        setError('Toà nhà đã chọn không tồn tại.');
        return;
      }

      const rows = parseCsvWithQuotes(text.trim());
      if (rows.length === 0) {
        setError('Không có dòng dữ liệu.');
        return;
      }

      const headerResult = findChecklistHeader(rows);
      if (!headerResult) {
        setError('Không tìm thấy dòng tiêu đề đúng format. Cần có các cột: No, Position, NEW, Error Time, FixedTime, Reason, Done By, Solution.');
        return;
      }

    const { headerRowIndex, indices } = headerResult;
    const idxNo = indices['No'] ?? 0;
    const idxPosition = indices['Position'] ?? 1;
    const idxNew = indices['NEW'];
    const idxErrorTime = indices['Error Time'];
    const idxFixedTime = indices['FixedTime'];
    const idxReason = indices['Reason'];
    const idxDoneBy = indices['Done By'];
    const idxSolution = indices['Solution'];

    const cameras: Camera[] = [];
    const ts = Date.now();

    for (let i = headerRowIndex + 1; i < rows.length; i++) {
      const row = rows[i] || [];
      const position = (row[idxPosition] ?? '').toString().trim();
      if (!position || position === 'Màn hình 1' || /^\d+$/.test(position)) continue;

      const no = (row[idxNo] ?? '').toString().trim();
      const newVal = (typeof idxNew === 'number' && idxNew >= 0 ? row[idxNew] : '')?.toString().trim() ?? '';
      const errTimeRaw = (typeof idxErrorTime === 'number' && idxErrorTime >= 0 ? row[idxErrorTime] : '')?.toString().trim() ?? '';
      const fixedTimeRaw = (typeof idxFixedTime === 'number' && idxFixedTime >= 0 ? row[idxFixedTime] : '')?.toString().trim() ?? '';
      const reason = (typeof idxReason === 'number' && idxReason >= 0 ? row[idxReason] : '')?.toString().trim() ?? '';
      const doneBy = (typeof idxDoneBy === 'number' && idxDoneBy >= 0 ? row[idxDoneBy] : '')?.toString().trim() ?? '';
      const solution = (typeof idxSolution === 'number' && idxSolution >= 0 ? row[idxSolution] : '')?.toString().trim() ?? '';

      const errorTime = parseChecklistDateToIso(errTimeRaw);
      const fixedTime = parseChecklistDateToIso(fixedTimeRaw);
      const isNew = /new|mới/i.test(newVal) || !!newVal.trim();

      const notesParts = [reason, solution, errTimeRaw ? `Error: ${errTimeRaw}` : '', fixedTimeRaw ? `Fixed: ${fixedTimeRaw}` : '', doneBy ? `By: ${doneBy}` : ''].filter(Boolean);
      const notes = notesParts.join(' | ') || 'Import từ CSV Check list Camera';

      const status = mapExcelStatusToApp(doneBy || reason || newVal);

      cameras.push({
        id: `CAM_CSV_${ts}_${i}`,
        name: no ? `${no} - ${position}` : position,
        ip: 'TBD',
        propertyId: selectedPropertyId,
        zone: position,
        location: position,
        brand: 'Unknown',
        model: '',
        specs: '',
        supplier: 'Import CSV',
        status,
        consecutiveDrops: 0,
        lastPingTime: Date.now(),
        logs: [],
        notes,
        isNew: isNew || undefined,
        errorTime: errorTime || undefined,
        fixedTime: fixedTime || undefined,
        reason: reason || undefined,
        doneBy: doneBy || undefined,
        solution: solution || undefined,
      });
    }

      if (cameras.length === 0) {
        setError('Không có dòng camera nào hợp lệ (cột Position bắt buộc).');
        return;
      }

      const result = await onImport(cameras);
      if (result !== false) {
        setSuccessMessage(`Import thành công ${cameras.length} camera. Đang đóng...`);
        setTimeout(() => onClose(), 1500);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi import.');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4">
      <div className="bg-white shadow-2xl w-full h-full max-h-full md:max-w-3xl md:max-h-[90vh] md:h-auto flex flex-col rounded-none md:rounded-lg overflow-hidden">
        <div className="p-3 md:p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 flex-shrink-0">
          <h3 className="text-base md:text-lg font-bold text-slate-900 flex items-center min-w-0">
            <Upload className="mr-1.5 shrink-0" size={18} /> <span className="truncate">Import CSV (format Check list)</span>
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center shrink-0 rounded" aria-label="Đóng">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto pb-[env(safe-area-inset-bottom)]">
          <div className="bg-blue-50 p-3 mb-3 text-xs text-blue-800 border border-blue-100 rounded">
            <p className="font-bold mb-1 flex items-center"><AlertCircle size={12} className="mr-1" /> Hướng dẫn &amp; lưu ý</p>
            <ul className="list-disc ml-4 space-y-0.5">
              <li><strong>Format bắt buộc:</strong> File CSV phải có dòng tiêu đề chứa đúng các cột: <strong>No, Position, NEW, Error Time, FixedTime, Reason, Done By, Solution</strong> — giống file &quot;Check list Camera All Site&quot; (RESORT / VILLAS / ARIYANA).</li>
              <li><strong>Dòng tiêu đề:</strong> Có thể có 1–2 dòng mô tả phía trên (tên báo cáo, tên site); hệ thống sẽ tự tìm dòng có cột Position và Reason (hoặc Error Time) để nhận diện header.</li>
              <li><strong>Chọn toà nhà:</strong> Chọn đúng toà nhà tương ứng với nội dung file (ví dụ: Furama Resort, Furama Villas, Ariyana Centre).</li>
              <li><strong>Cột bắt buộc:</strong> <strong>Position</strong> = tên/vị trí camera (bắt buộc). Các cột NEW, Error Time, FixedTime, Reason, Done By, Solution có thể để trống.</li>
              <li><strong>Lưu ý kỹ thuật:</strong> Nếu xuất từ Excel (Lưu dưới dạng CSV), ô có dấu phẩy hoặc xuống dòng sẽ được bọc trong dấu ngoặc kép. Nên dùng encoding <strong>UTF-8</strong> để hiển thị đúng tiếng Việt.</li>
            </ul>
            <div className="mt-2 flex items-center gap-2">
              <span className="font-mono bg-white px-1.5 py-0.5 border border-blue-200 text-[11px] rounded">No,Position,NEW,Error Time,FixedTime,Reason,Done By,Solution</span>
              <button type="button" onClick={handleCopyTemplate} className="flex items-center text-[11px] font-bold text-blue-600 hover:underline">
                <Copy size={10} className="mr-1" /> Copy mẫu
              </button>
            </div>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-slate-700 mb-1">Chọn toà nhà <span className="text-red-600">*</span></label>
            <select
              value={selectedPropertyId}
              onChange={(e) => { setSelectedPropertyId(e.target.value); setError(null); }}
              className="w-full border border-slate-300 py-2 px-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none rounded"
            >
              <option value="">-- Chọn toà nhà --</option>
              {properties.map(p => (
                <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
              ))}
            </select>
            {properties.length === 0 && (
              <p className="mt-0.5 text-[11px] text-amber-600">Chưa có toà nhà. Vui lòng thêm toà nhà trước khi import.</p>
            )}
          </div>

          <div className="mb-3 flex gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              className="hidden"
              onChange={handleFileSelect}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center px-3 py-2.5 min-h-[44px] bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium rounded"
            >
              <FileText size={14} className="mr-1.5" /> Chọn file CSV
            </button>
          </div>

          <div className="mb-3">
            <label className="block text-xs font-medium text-slate-700 mb-1">Dán nội dung CSV</label>
            <textarea
              className="w-full h-44 border border-slate-300 p-2 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none rounded"
              placeholder="Dán dữ liệu CSV vào đây (hoặc chọn file CSV bên trên)..."
              value={text}
              onChange={(e) => { setText(e.target.value); setError(null); }}
            />
          </div>

          {successMessage && (
            <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 text-sm border border-emerald-200 rounded flex items-center gap-2">
              <CheckCircle size={18} className="shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}
          {error && (
            <div ref={errorRef} className="mt-3 p-3 bg-red-50 text-red-700 text-sm border border-red-200 whitespace-pre-line rounded flex items-start gap-2">
              <AlertCircle size={18} className="shrink-0 mt-0.5" />
              <div>
                <strong>Lỗi Import:</strong><br />{error}
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-slate-200 flex justify-end gap-2 bg-slate-50 flex-shrink-0">
          <button type="button" onClick={onClose} className="px-3 py-2.5 min-h-[44px] text-slate-600 hover:bg-slate-200 text-sm font-medium rounded" disabled={importing}>Đóng</button>
          <button
            type="button"
            onClick={handleProcessCsv}
            disabled={importing || !text.trim() || !selectedPropertyId || properties.length === 0}
            className="px-3 py-2.5 min-h-[44px] bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-sm font-medium rounded flex items-center justify-center gap-2 min-w-[140px]"
          >
            {importing ? (
              <>
                <Loader2 size={18} className="animate-spin shrink-0" />
                <span>Đang import...</span>
              </>
            ) : (
              'Xử lý Import'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
