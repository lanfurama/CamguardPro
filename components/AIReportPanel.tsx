import React from 'react';
import { Sparkles } from 'lucide-react';

interface AIReportPanelProps {
  content: string;
  loading: boolean;
  onGenerate: () => void;
  onClose: () => void;
}

export const AIReportPanel: React.FC<AIReportPanelProps> = ({
  content,
  loading,
  onGenerate,
  onClose,
}) => (
  <>
    <div className="flex justify-end mb-6">
      <button
        onClick={onGenerate}
        disabled={loading}
        className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg shadow-md transition disabled:opacity-70"
      >
        <Sparkles size={18} />
        <span>{loading ? 'Đang tạo báo cáo...' : 'Tạo Báo Cáo Thông Minh (AI)'}</span>
      </button>
    </div>

    {content && (
      <div className="mb-8 bg-white p-6 rounded-xl shadow-sm border border-indigo-100 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
          <h3 className="font-bold text-slate-800 flex items-center">
            <Sparkles className="text-purple-500 mr-2" size={20} />
            Báo Cáo Hệ Thống
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            Đóng
          </button>
        </div>
        <div className="prose prose-slate prose-sm max-w-none text-slate-700">
          <pre className="whitespace-pre-wrap font-sans">{content}</pre>
        </div>
      </div>
    )}
  </>
);
