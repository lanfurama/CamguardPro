import React, { useState } from 'react';
import { Camera, Property } from '../types';
import { Search, Filter, Signal, Activity, Info, Zap, Plus, Upload, Trash2, Edit } from 'lucide-react';
import { CameraDetailModal } from './CameraDetailModal';

interface Props {
  cameras: Camera[];
  camerasLoading?: boolean;
  camerasError?: string | null;
  onRefetchCameras?: () => void | Promise<void>;
  properties: Property[];
  propertiesLoading?: boolean;
  simulatingIds: Set<string>;
  onToggleSimulate: (id: string) => void;
  filterByProperty: boolean;
  onUpdateNotes: (id: string, notes: string) => void;
  onEditCamera: (camera: Camera) => void;
  onDeleteCamera: (id: string) => void;
  onAddCamera: () => void;
  onImportCamera: () => void;
}

export const CameraList: React.FC<Props> = ({ 
  cameras, 
  camerasLoading,
  camerasError,
  onRefetchCameras,
  properties, 
  propertiesLoading,
  simulatingIds, 
  onToggleSimulate,
  filterByProperty,
  onUpdateNotes,
  onEditCamera,
  onDeleteCamera,
  onAddCamera,
  onImportCamera
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);

  const filteredCameras = cameras.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.ip.includes(searchTerm) ||
    c.zone.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderCameraRow = (camera: Camera) => {
    const isSimulating = simulatingIds.has(camera.id);
    const dropPercentage = (camera.consecutiveDrops / 10) * 100;
    
    return (
      <tr key={camera.id} className="hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 group">
        <td className="px-4 py-2">
            <div className="font-medium text-slate-900">{camera.name}</div>
            <div className="text-xs text-slate-500">{camera.ip}</div>
        </td>
        <td className="px-4 py-2 text-slate-600 text-sm">{camera.zone}</td>
        <td className="px-4 py-2 text-slate-600 hidden md:table-cell text-sm">{camera.brand}</td>
        <td className="px-4 py-2">
            <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium
                ${camera.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-800' : ''}
                ${camera.status === 'OFFLINE' ? 'bg-red-100 text-red-800' : ''}
                ${camera.status === 'MAINTENANCE' ? 'bg-amber-100 text-amber-800' : ''}
            `}>
                {camera.status === 'ONLINE' && <span className="w-1.5 h-1.5 bg-emerald-500 mr-1.5"></span>}
                {camera.status === 'OFFLINE' && <span className="w-1.5 h-1.5 bg-red-500 mr-1.5"></span>}
                {camera.status}
            </span>
        </td>
        <td className="px-4 py-2 w-48">
            <div className="flex items-center space-x-2">
                <div className="flex-1 h-1.5 bg-slate-200 overflow-hidden">
                     {camera.status === 'ONLINE' && camera.consecutiveDrops === 0 ? (
                        <div className="h-full bg-emerald-500 w-full"></div>
                     ) : (
                         <div className="h-full bg-red-500 transition-all duration-300 ease-out" style={{ width: `${dropPercentage}%`}}></div>
                     )}
                </div>
                <span className="text-xs text-slate-400 font-mono w-8 text-right">
                    {camera.consecutiveDrops}/10
                </span>
            </div>
            {isSimulating && <span className="text-[10px] text-red-500 italic block mt-1">Đang mô phỏng lỗi...</span>}
        </td>
        <td className="px-4 py-2 text-right">
            <div className="flex items-center justify-end space-x-1">
                <div className="hidden group-hover:flex space-x-1 mr-1 border-r border-slate-200 pr-1">
                     <button onClick={() => onEditCamera(camera)} className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50"><Edit size={14}/></button>
                     <button 
                        onClick={() => {
                            if(window.confirm('Bạn có chắc muốn xoá camera này?')) onDeleteCamera(camera.id);
                        }} 
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50"
                    >
                        <Trash2 size={14}/>
                    </button>
                </div>

                <button 
                    onClick={() => onToggleSimulate(camera.id)}
                    className={`p-1 transition-colors border ${isSimulating ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
                    title="Mô phỏng rớt mạng (Ping Drop)"
                >
                    <Zap size={14} />
                </button>
                <button 
                    onClick={() => setSelectedCamera(camera)}
                    className="p-1 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors"
                    title="Chi tiết & AI"
                >
                    <Info size={14} />
                </button>
            </div>
        </td>
      </tr>
    );
  };

  const renderGroupedList = () => {
    return properties.map(prop => {
        const propCameras = filteredCameras.filter(c => c.propertyId === prop.id);
        if (propCameras.length === 0) return null;

        return (
            <div key={prop.id} className="mb-4 bg-white shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 text-sm flex items-center">
                        <span className="w-1.5 h-6 bg-indigo-500 mr-2"></span>
                        {prop.name}
                    </h3>
                    <span className="text-sm text-slate-500">{propCameras.length} Cameras</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                         <thead className="bg-white text-slate-500 font-medium text-xs border-b border-slate-100">
                            <tr>
                                <th className="px-4 py-2 w-1/4">Tên Camera / IP</th>
                                <th className="px-4 py-2">Khu Vực (Zone)</th>
                                <th className="px-4 py-2 hidden md:table-cell">Hãng</th>
                                <th className="px-4 py-2">Trạng Thái</th>
                                <th className="px-4 py-2">Ping</th>
                                <th className="px-4 py-2 text-right">Thao Tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {propCameras.map(renderCameraRow)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    });
  };

  return (
    <div>
        {/* Action Bar */}
        <div className="mb-4 flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
            <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-72">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input 
                        type="text" 
                        placeholder="Tìm theo tên, IP, khu vực..." 
                        className="w-full pl-8 pr-3 py-1.5 border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-2">
                 <button onClick={onImportCamera} className="flex items-center px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm font-medium text-xs">
                    <Upload size={14} className="mr-1.5" />
                    Import Template
                </button>
                <button onClick={onAddCamera} className="flex items-center px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm font-medium text-xs">
                    <Plus size={14} className="mr-1.5" />
                    Thêm Camera
                </button>
            </div>
        </div>

        {camerasError && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700">
            <p className="font-medium text-sm">{camerasError}</p>
            {(camerasError.includes('Database') || camerasError.includes('cấu hình') || camerasError.includes('503')) && (
              <p className="mt-1.5 text-xs opacity-90">
                Kiểm tra file <code className="bg-red-100 px-1">.env</code> và đã chạy <code>database/schema.sql</code>, <code>database/seed-furama-sites.sql</code>. Chạy <code>npm run dev</code> để API load .env.
              </p>
            )}
            {onRefetchCameras && (
              <button type="button" onClick={() => onRefetchCameras()} className="mt-2 px-2 py-1 bg-red-100 hover:bg-red-200 text-red-800 text-xs font-medium">Thử lại</button>
            )}
          </div>
        )}

        {camerasLoading && (
          <div className="py-16 text-center text-slate-500">Đang tải danh sách camera...</div>
        )}

        {!camerasLoading && !camerasError && (filterByProperty ? (
            renderGroupedList()
        ) : (
             <div className="bg-white shadow-sm border border-slate-200 overflow-hidden">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium text-xs border-b border-slate-200">
                        <tr>
                            <th className="px-4 py-2 w-1/4">Tên Camera / IP</th>
                            <th className="px-4 py-2">Khu Vực (Zone)</th>
                            <th className="px-4 py-2 hidden md:table-cell">Hãng</th>
                            <th className="px-4 py-2">Trạng Thái</th>
                            <th className="px-4 py-2">Ping</th>
                            <th className="px-4 py-2 text-right">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCameras.map(renderCameraRow)}
                    </tbody>
                </table>
             </div>
        ))}

        {!camerasLoading && !camerasError && filteredCameras.length === 0 && (
          <div className="py-10 text-center bg-white border border-slate-200 p-4">
            <p className="text-slate-500 text-sm">Chưa có camera nào. Nhấn &quot;Thêm Camera&quot; hoặc &quot;Import Template&quot; để bắt đầu.</p>
            <p className="mt-2 text-xs text-slate-500 max-w-lg mx-auto">
              API trả 200 nhưng danh sách rỗng? Đảm bảo đã chạy <code className="bg-slate-100 px-1">database/schema.sql</code> (có seed camera). Nếu dùng Furama thì chạy thêm <code className="bg-slate-100 px-1">database/seed-furama-sites.sql</code>.
            </p>
          </div>
        )}

        <CameraDetailModal 
            camera={selectedCamera} 
            onClose={() => setSelectedCamera(null)} 
            onUpdateNotes={onUpdateNotes}
        />
    </div>
  );
};
