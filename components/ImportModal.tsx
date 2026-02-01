import React, { useState } from 'react';
import { X, Upload, Copy, AlertCircle } from 'lucide-react';
import { Camera, Property } from '../types';

interface Props {
  properties: Property[];
  onImport: (cameras: Camera[]) => void | Promise<boolean>;
  onClose: () => void;
}

export const ImportModal: React.FC<Props> = ({ properties, onImport, onClose }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const template = `Tên Camera,IP,Mã Toà Nhà,Khu Vực,Hãng,Model
Cam Sảnh 1,192.168.1.100,PROP_001,Sảnh chính,Hikvision,DS-2CD
Cam Kho 2,192.168.1.101,PROP_002,Kho A,Dahua,IPC-HFW`;

  const propertyList = properties.map(p => `${p.id}: ${p.name}`).join('\n');

  const handleCopyTemplate = () => {
    navigator.clipboard.writeText(template);
  };

  const handleProcess = async () => {
    setError(null);
    if (!text.trim()) return;

    const lines = text.trim().split('\n');
    const newCameras: Camera[] = [];
    let lineErrors: string[] = [];

    // Skip header if present (simple check: includes "Mã Toà Nhà")
    const startIdx = lines[0].includes('Mã Toà Nhà') ? 1 : 0;

    for (let i = startIdx; i < lines.length; i++) {
        const parts = lines[i].split(',').map(p => p.trim());
        if (parts.length < 3) {
            lineErrors.push(`Dòng ${i+1}: Thiếu thông tin (Tên, IP, Mã Toà Nhà là bắt buộc)`);
            continue;
        }

        const [name, ip, propId, zone, brand, model] = parts;

        const propExists = properties.find(p => p.id === propId);
        if (!propExists) {
            lineErrors.push(`Dòng ${i+1}: Mã toà nhà '${propId}' không tồn tại.`);
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
            notes: 'Imported via bulk tool'
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

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900 flex items-center">
            <Upload className="mr-2" size={20} /> Import Camera
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
            <div className="bg-blue-50 p-4 rounded-lg mb-4 text-sm text-blue-800 border border-blue-100">
                <p className="font-bold mb-1 flex items-center"><AlertCircle size={14} className="mr-1"/> Hướng dẫn:</p>
                <p>Nhập dữ liệu theo định dạng CSV (ngăn cách bởi dấu phẩy). Dòng đầu tiên có thể là tiêu đề.</p>
                <p className="mt-2 font-mono bg-white p-2 rounded border border-blue-200 text-xs">
                    {template}
                </p>
                <button onClick={handleCopyTemplate} className="mt-2 flex items-center text-xs font-bold text-blue-600 hover:underline">
                    <Copy size={12} className="mr-1"/> Copy Template
                </button>
            </div>

            <div className="mb-4 text-xs text-slate-500">
                <strong>Mã Toà Nhà hiện có:</strong>
                <pre className="mt-1 p-2 bg-slate-100 rounded max-h-20 overflow-y-auto">{propertyList}</pre>
            </div>

            <textarea 
                className="w-full h-48 border border-slate-300 rounded-lg p-3 text-sm font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Dán dữ liệu CSV vào đây..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            ></textarea>

            {error && (
                <div className="mt-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg border border-red-100 whitespace-pre-line">
                    <strong>Lỗi Import:</strong><br/>
                    {error}
                </div>
            )}
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-end space-x-3 bg-slate-50">
            <button onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg font-medium">Đóng</button>
            <button onClick={handleProcess} disabled={importing} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white rounded-lg font-medium">{importing ? 'Đang import...' : 'Xử Lý Import'}</button>
        </div>
      </div>
    </div>
  );
};
