import React, { useState } from 'react';
import { Camera, Property } from '../types';
import { Search, Filter, Signal, Activity, Info, Zap, Plus, Upload, Trash2, Edit } from 'lucide-react';
import { CameraDetailModal } from './CameraDetailModal';

interface Props {
  cameras: Camera[];
  camerasLoading?: boolean;
  camerasError?: string | null;
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
        <td className="px-6 py-4">
            <div className="font-medium text-slate-900">{camera.name}</div>
            <div className="text-xs text-slate-500">{camera.ip}</div>
        </td>
        <td className="px-6 py-4 text-slate-600">{camera.zone}</td>
        <td className="px-6 py-4 text-slate-600 hidden md:table-cell">{camera.brand}</td>
        <td className="px-6 py-4">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                ${camera.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-800' : ''}
                ${camera.status === 'OFFLINE' ? 'bg-red-100 text-red-800' : ''}
                ${camera.status === 'MAINTENANCE' ? 'bg-amber-100 text-amber-800' : ''}
            `}>
                {camera.status === 'ONLINE' && <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span>}
                {camera.status === 'OFFLINE' && <span className="w-1.5 h-1.5 bg-red-500 rounded-full mr-1.5"></span>}
                {camera.status}
            </span>
        </td>
        <td className="px-6 py-4 w-48">
            <div className="flex items-center space-x-2">
                <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
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
        <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end space-x-2">
                <div className="hidden group-hover:flex space-x-1 mr-2 border-r border-slate-200 pr-2">
                     <button onClick={() => onEditCamera(camera)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Edit size={16}/></button>
                     <button 
                        onClick={() => {
                            if(window.confirm('Bạn có chắc muốn xoá camera này?')) onDeleteCamera(camera.id);
                        }} 
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                        <Trash2 size={16}/>
                    </button>
                </div>

                <button 
                    onClick={() => onToggleSimulate(camera.id)}
                    className={`p-1.5 rounded-lg transition-colors border ${isSimulating ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
                    title="Mô phỏng rớt mạng (Ping Drop)"
                >
                    <Zap size={16} />
                </button>
                <button 
                    onClick={() => setSelectedCamera(camera)}
                    className="p-1.5 text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                    title="Chi tiết & AI"
                >
                    <Info size={16} />
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
            <div key={prop.id} className="mb-8 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 flex items-center">
                        <span className="w-2 h-8 bg-indigo-500 rounded-full mr-3"></span>
                        {prop.name}
                    </h3>
                    <span className="text-sm text-slate-500">{propCameras.length} Cameras</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                         <thead className="bg-white text-slate-500 font-medium border-b border-slate-100">
                            <tr>
                                <th className="px-6 py-3 w-1/4">Tên Camera / IP</th>
                                <th className="px-6 py-3">Khu Vực (Zone)</th>
                                <th className="px-6 py-3 hidden md:table-cell">Hãng</th>
                                <th className="px-6 py-3">Trạng Thái</th>
                                <th className="px-6 py-3">Ping</th>
                                <th className="px-6 py-3 text-right">Thao Tác</th>
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
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                        type="text" 
                        placeholder="Tìm theo tên, IP, khu vực..." 
                        className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-2">
                 <button onClick={onImportCamera} className="flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 shadow-sm font-medium text-sm">
                    <Upload size={16} className="mr-2" />
                    Import Template
                </button>
                <button onClick={onAddCamera} className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-sm font-medium text-sm">
                    <Plus size={16} className="mr-2" />
                    Thêm Camera
                </button>
            </div>
        </div>

        {camerasError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {camerasError}
          </div>
        )}

        {camerasLoading && (
          <div className="py-16 text-center text-slate-500">Đang tải danh sách camera...</div>
        )}

        {!camerasLoading && !camerasError && (filterByProperty ? (
            renderGroupedList()
        ) : (
             <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                 <table className="w-full text-sm text-left">
                    <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-3 w-1/4">Tên Camera / IP</th>
                            <th className="px-6 py-3">Khu Vực (Zone)</th>
                            <th className="px-6 py-3 hidden md:table-cell">Hãng</th>
                            <th className="px-6 py-3">Trạng Thái</th>
                            <th className="px-6 py-3">Ping</th>
                            <th className="px-6 py-3 text-right">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCameras.map(renderCameraRow)}
                    </tbody>
                </table>
             </div>
        ))}

        {!camerasLoading && !camerasError && filteredCameras.length === 0 && (
          <div className="py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
            Chưa có camera nào. Nhấn &quot;Thêm Camera&quot; hoặc &quot;Import Template&quot; để bắt đầu.
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
