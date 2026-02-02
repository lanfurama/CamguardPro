import React, { useState, useEffect, useMemo } from 'react';
import { Camera, Property } from '../types';
import type { CameraStatus } from '../types';
import { Search, Info, Zap, Plus, Upload, Trash2, Edit, Building2, Edit2, Filter, X } from 'lucide-react';
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
  onAddCamera: (propertyId?: string) => void;
  onImportCamera: () => void;
  onEditProperty?: (property: Property) => void;
  onAddProperty?: () => void;
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
  onImportCamera,
  onEditProperty,
  onAddProperty,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<CameraStatus | ''>('');
  const [filterZone, setFilterZone] = useState('');
  const [filterBrand, setFilterBrand] = useState('');

  const searchFiltered = useMemo(() =>
    cameras.filter(c =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.ip.includes(searchTerm) ||
      c.zone.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [cameras, searchTerm]
  );

  const filteredCameras = useMemo(() => {
    let list = searchFiltered;
    if (filterStatus) list = list.filter(c => c.status === filterStatus);
    if (filterZone) list = list.filter(c => c.zone === filterZone);
    if (filterBrand) list = list.filter(c => c.brand === filterBrand);
    return list;
  }, [searchFiltered, filterStatus, filterZone, filterBrand]);

  const selectedProp = properties.find(p => p.id === selectedPropertyId);
  const propCameras = selectedPropertyId
    ? filteredCameras.filter(c => c.propertyId === selectedPropertyId)
    : filteredCameras;

  const zoneOptions = useMemo(() => {
    if (filterByProperty && selectedProp?.zones?.length) {
      return selectedProp.zones;
    }
    return [...new Set(cameras.map(c => c.zone).filter(Boolean))].sort();
  }, [filterByProperty, selectedProp, cameras]);

  const brandOptions = useMemo(() =>
    [...new Set(cameras.map(c => c.brand).filter(Boolean))].sort(),
    [cameras]
  );

  const hasActiveFilters = !!(filterStatus || filterZone || filterBrand);
  const clearFilters = () => {
    setFilterStatus('');
    setFilterZone('');
    setFilterBrand('');
  };

  useEffect(() => {
    if (!filterByProperty || properties.length === 0) return;
    const stillValid = selectedPropertyId && properties.some(p => p.id === selectedPropertyId);
    if (!stillValid) setSelectedPropertyId(properties[0]?.id ?? null);
  }, [filterByProperty, properties, selectedPropertyId]);

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

  const renderPropertyTabsAndContent = () => {
    if (properties.length === 0) return null;
    return (
      <>
        <div className="flex flex-wrap gap-1 mb-4 border-b border-slate-200 pb-2">
          {properties.map(prop => {
            const count = cameras.filter(c => c.propertyId === prop.id).length;
            const isSelected = selectedPropertyId === prop.id;
            return (
              <button
                key={prop.id}
                type="button"
                onClick={() => setSelectedPropertyId(prop.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t border-b-2 transition-colors ${
                  isSelected
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-600 -mb-0.5'
                    : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-800'
                }`}
              >
                <Building2 size={14} />
                <span>{prop.name}</span>
                <span className="text-xs opacity-80">({count})</span>
              </button>
            );
          })}
        </div>
        <div className="bg-white shadow-sm border border-slate-200 overflow-hidden">
          {propCameras.length === 0 ? (
            <>
              {selectedProp && (
                <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
                  <h3 className="font-bold text-slate-800 text-sm flex items-center">
                    <span className="w-1.5 h-6 bg-indigo-500 mr-2"></span>
                    {selectedProp.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {onEditProperty && (
                      <button
                        type="button"
                        onClick={() => onEditProperty(selectedProp)}
                        className="flex items-center px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium"
                      >
                        <Edit2 size={12} className="mr-1" />
                        Sửa tòa nhà
                      </button>
                    )}
                    {selectedPropertyId && (
                      <button
                        type="button"
                        onClick={() => onAddCamera(selectedPropertyId)}
                        className="flex items-center px-2 py-1 bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-medium"
                      >
                        <Plus size={12} className="mr-1" />
                        Thêm camera
                      </button>
                    )}
                  </div>
                </div>
              )}
              <div className="py-10 text-center p-4">
                <p className="text-slate-500 text-sm">
                  Chưa có camera trong tòa nhà này. Nhấn &quot;Thêm camera&quot; để thêm camera vào tòa nhà.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
                <h3 className="font-bold text-slate-800 text-sm flex items-center">
                  <span className="w-1.5 h-6 bg-indigo-500 mr-2"></span>
                  {selectedProp?.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">{propCameras.length} Cameras</span>
                  {selectedProp && onEditProperty && (
                    <button
                      type="button"
                      onClick={() => onEditProperty(selectedProp)}
                      className="flex items-center px-2 py-1 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-medium"
                    >
                      <Edit2 size={12} className="mr-1" />
                      Sửa tòa nhà
                    </button>
                  )}
                  {selectedPropertyId && (
                    <button
                      type="button"
                      onClick={() => onAddCamera(selectedPropertyId)}
                      className="flex items-center px-2 py-1 bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-medium"
                    >
                      <Plus size={12} className="mr-1" />
                      Thêm camera
                    </button>
                  )}
                </div>
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
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <div>
        {/* Action Bar */}
        <div className="mb-4 flex flex-col gap-3">
            <div className="flex flex-col md:flex-row gap-3 justify-between items-start md:items-center">
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

            <div className="flex gap-2 flex-wrap">
                {filterByProperty && onAddProperty && (
                  <button
                    type="button"
                    onClick={onAddProperty}
                    className="flex items-center px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm font-medium text-xs"
                  >
                    <Building2 size={14} className="mr-1.5" />
                    Thêm Toà Nhà
                  </button>
                )}
                 <button onClick={() => onAddCamera()} className="flex items-center px-3 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm font-medium text-xs">
                    <Upload size={14} className="mr-1.5" />
                    Import Template
                </button>
                <button onClick={() => onAddCamera()} className="flex items-center px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm font-medium text-xs">
                    <Plus size={14} className="mr-1.5" />
                    Thêm Camera
                </button>
            </div>
            </div>

            {/* Filter row */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Filter size={14} className="text-slate-500" />
              <select
                value={filterStatus}
                onChange={e => setFilterStatus((e.target.value || '') as CameraStatus | '')}
                className="border border-slate-300 py-1.5 px-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-w-[100px]"
              >
                <option value="">Trạng thái</option>
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
                <option value="MAINTENANCE">Bảo trì</option>
                <option value="WARNING">Cảnh báo</option>
              </select>
              <select
                value={filterZone}
                onChange={e => setFilterZone(e.target.value)}
                className="border border-slate-300 py-1.5 px-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-w-[100px]"
              >
                <option value="">Zone</option>
                {zoneOptions.map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
              <select
                value={filterBrand}
                onChange={e => setFilterBrand(e.target.value)}
                className="border border-slate-300 py-1.5 px-2 rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-w-[100px]"
              >
                <option value="">Hãng</option>
                {brandOptions.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="flex items-center gap-1 px-2 py-1 text-slate-600 hover:bg-slate-100 text-xs font-medium"
                >
                  <X size={12} />
                  Xóa bộ lọc
                </button>
              )}
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

        {!camerasLoading && !camerasError && filterByProperty && properties.length === 0 && (
          <div className="py-10 text-center bg-white border border-slate-200 p-4">
            <p className="text-slate-500 text-sm">Chưa có tòa nhà. Thêm tòa nhà để bắt đầu.</p>
            {onAddProperty && (
              <button
                type="button"
                onClick={onAddProperty}
                className="mt-3 flex items-center px-3 py-1.5 bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm font-medium text-xs mx-auto"
              >
                <Building2 size={14} className="mr-1.5" />
                Thêm Toà Nhà
              </button>
            )}
          </div>
        )}

        {!camerasLoading && !camerasError && filterByProperty && properties.length > 0 && (
          renderPropertyTabsAndContent()
        )}

        {!camerasLoading && !camerasError && !filterByProperty && (
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
        )}

        {!camerasLoading && !camerasError && !filterByProperty && filteredCameras.length === 0 && (
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
