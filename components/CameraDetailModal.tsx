import React, { useState } from 'react';
import { X, Server, Calendar, Cpu, MapPin, Activity, Sparkles, AlertTriangle } from 'lucide-react';
import { Camera, MaintenanceLog } from '../types';

interface Props {
  camera: Camera | null;
  onClose: () => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export const CameraDetailModal: React.FC<Props> = ({ camera, onClose, onUpdateNotes }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [notes, setNotes] = useState(camera?.notes || '');

  if (!camera) return null;

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch('/api/ai/analyze-logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ camera }),
      });
      const data = await res.json().catch(() => ({}));
      setAiAnalysis(res.ok ? (data.text ?? '') : (data.error || data.detail || 'Lỗi phân tích'));
    } finally {
      setAnalyzing(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ONLINE': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'OFFLINE': return 'bg-red-100 text-red-800 border-red-200';
      case 'MAINTENANCE': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-3">
      <div className="bg-white shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-3 border-b border-slate-200 flex justify-between items-start bg-slate-50">
          <div>
            <div className="flex items-center space-x-2 mb-0.5">
              <h3 className="text-lg font-bold text-slate-900">{camera.name}</h3>
              <span className={`px-2 py-0.5 text-xs font-bold border ${getStatusColor(camera.status)}`}>
                {camera.status}
              </span>
            </div>
            <p className="text-slate-500 flex items-center text-xs">
              <MapPin size={12} className="mr-1" /> {camera.location} - {camera.zone}
            </p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-200 transition">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          {/* Left Column: Specs & Info */}
          <div className="space-y-4">
            <div className="bg-slate-50 p-3 border border-slate-100">
              <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wider mb-3 flex items-center">
                <Cpu size={14} className="mr-1.5 text-indigo-500" /> Thông số kỹ thuật
              </h4>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <div>
                  <span className="text-slate-500 block">IP Address</span>
                  <span className="font-mono text-slate-700 font-medium">{camera.ip}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Hãng SX</span>
                  <span className="text-slate-700 font-medium">{camera.brand}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Model</span>
                  <span className="text-slate-700 font-medium">{camera.model}</span>
                </div>
                 <div>
                  <span className="text-slate-500 block">Nhà cung cấp</span>
                  <span className="text-slate-700 font-medium">{camera.supplier}</span>
                </div>
                 <div className="col-span-2">
                  <span className="text-slate-500 block">Chi tiết kỹ thuật</span>
                  <span className="text-slate-700 font-medium">{camera.specs}</span>
                </div>
              </div>
            </div>

            <div className="bg-white">
               <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Ghi chú vận hành</h4>
               <textarea 
                className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                onBlur={() => onUpdateNotes(camera.id, notes)}
                placeholder="Nhập ghi chú cho camera này..."
               />
            </div>
          </div>

          {/* Right Column: Logs & AI */}
          <div className="space-y-4">
             {/* Ping Status */}
             <div className="bg-indigo-50 p-3 border border-indigo-100 flex items-center justify-between">
                <div>
                    <h4 className="text-sm font-semibold text-indigo-900 flex items-center">
                        <Activity size={16} className="mr-2" /> Trạng thái mạng
                    </h4>
                    <p className="text-xs text-indigo-700 mt-1">
                        Ping gần nhất: {new Date(camera.lastPingTime).toLocaleTimeString()}
                    </p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-indigo-600">
                        {camera.consecutiveDrops}/10
                    </div>
                    <div className="text-[10px] text-indigo-400 uppercase font-bold">Gói tin rớt liên tiếp</div>
                </div>
             </div>

            {/* Logs */}
            <div>
              <div className="flex justify-between items-center mb-4">
                 <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider flex items-center">
                    <Calendar size={16} className="mr-2 text-indigo-500" /> Nhật ký bảo trì
                 </h4>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                {camera.logs.length === 0 ? (
                    <p className="text-sm text-slate-400 italic">Chưa có lịch sử bảo trì.</p>
                ) : (
                    camera.logs.map(log => (
                        <div key={log.id} className="text-sm border-l-2 border-slate-300 pl-3 py-1">
                            <div className="flex justify-between text-xs text-slate-500 mb-1">
                                <span>{log.date}</span>
                                <span className="font-medium text-slate-700">{log.type}</span>
                            </div>
                            <p className="text-slate-800">{log.description}</p>
                            {log.technician && <p className="text-xs text-slate-400 mt-1">KTV: {log.technician}</p>}
                        </div>
                    ))
                )}
              </div>
            </div>

            {/* AI Action */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-3 border border-indigo-100">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xs font-bold text-indigo-900 flex items-center">
                        <Sparkles size={14} className="mr-1.5 text-purple-600" /> Phân tích AI
                    </h4>
                    <button 
                        onClick={handleAnalyze}
                        disabled={analyzing}
                        className="text-[11px] bg-white hover:bg-white/80 text-indigo-600 border border-indigo-200 px-2 py-1 shadow-sm transition disabled:opacity-50 font-medium"
                    >
                        {analyzing ? 'Đang phân tích...' : 'Phân tích Logs'}
                    </button>
                </div>
                
                {aiAnalysis ? (
                    <div className="text-xs text-slate-700 bg-white/50 p-2 border border-indigo-50/50 whitespace-pre-line leading-relaxed">
                        {aiAnalysis}
                    </div>
                ) : (
                    <p className="text-xs text-indigo-400 leading-relaxed">
                        Sử dụng Gemini AI để phân tích lịch sử bảo trì, dự đoán lỗi tiềm ẩn và đề xuất giải pháp kỹ thuật.
                    </p>
                )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
