import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Camera, Property } from '../types';
import type { CameraStatus } from '../types';
import { Search, Info, Zap, Plus, Trash2, Edit, Building2, Edit2, Filter, X, FileSpreadsheet, Cctv } from 'lucide-react';
import { CameraDetailModal } from './CameraDetailModal';

const SEARCH_DEBOUNCE_MS = 250;

function searchableString(c: Camera, propertyName: string): string {
  const parts = [
    c.name,
    c.ip,
    c.zone,
    c.location ?? '',
    c.brand ?? '',
    c.model ?? '',
    c.specs ?? '',
    c.supplier ?? '',
    c.notes ?? '',
    c.reason ?? '',
    c.solution ?? '',
    c.doneBy ?? '',
    propertyName,
  ];
  return parts.join(' ').toLowerCase();
}

interface Props {
  cameras: Camera[];
  camerasLoading?: boolean;
  camerasError?: string | null;
  onRefetchCameras?: () => void | Promise<void>;
  properties: Property[];
  propertiesLoading?: boolean;
  simulatingIds: Set<string>;
  onToggleSimulate: (id: string) => void;
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
  onUpdateNotes,
  onEditCamera,
  onDeleteCamera,
  onAddCamera,
  onImportCamera,
  onEditProperty,
  onAddProperty,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDebounced, setSearchDebounced] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<Camera | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<CameraStatus | 'ERROR' | 'FIXED' | ''>('');
  const [filterZone, setFilterZone] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterIsNew, setFilterIsNew] = useState<'' | 'yes'>('');
  const [propertySearchTerm, setPropertySearchTerm] = useState('');
  const [filterPanelOpen, setFilterPanelOpen] = useState(false);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchDebounced(searchTerm.trim());
      debounceRef.current = null;
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchTerm]);

  const propertyMap = useMemo(() => {
    const m = new Map<string, Property>();
    properties.forEach(p => m.set(p.id, p));
    return m;
  }, [properties]);

  const searchFiltered = useMemo(() => {
    const q = searchDebounced.trim();
    if (!q) return cameras;
    const words = q.split(/\s+/).filter(Boolean).map(w => w.toLowerCase());
    return cameras.filter(c => {
      const prop = propertyMap.get(c.propertyId);
      const propName = prop ? prop.name : '';
      const text = searchableString(c, propName);
      return words.every(word => text.includes(word));
    });
  }, [cameras, searchDebounced, propertyMap]);

  const filteredCamerasWithoutProperty = useMemo(() => {
    let list = searchFiltered;
    if (filterStatus === 'ERROR') {
      list = list.filter(c => !!c.errorTime && !c.fixedTime);
    } else if (filterStatus === 'FIXED') {
      list = list.filter(c => !!c.errorTime && !!c.fixedTime);
    } else if (filterStatus) {
      list = list.filter(c => c.status === filterStatus);
    }
    if (filterZone) list = list.filter(c => c.zone === filterZone);
    if (filterBrand) list = list.filter(c => c.brand === filterBrand);
    if (filterIsNew === 'yes') list = list.filter(c => !!c.isNew);
    return list;
  }, [searchFiltered, filterStatus, filterZone, filterBrand, filterIsNew]);

  const filteredCameras = useMemo(() => {
    if (!selectedPropertyId) return filteredCamerasWithoutProperty;
    return filteredCamerasWithoutProperty.filter(c => c.propertyId === selectedPropertyId);
  }, [filteredCamerasWithoutProperty, selectedPropertyId]);

  const selectedProp = selectedPropertyId ? properties.find(p => p.id === selectedPropertyId) : null;
  const propCameras = filteredCameras;

  const zoneOptions = useMemo(() => {
    if (selectedProp?.zones?.length) {
      return selectedProp.zones;
    }
    return [...new Set(searchFiltered.map(c => c.zone).filter(Boolean))].sort();
  }, [selectedProp, searchFiltered]);

  const brandOptions = useMemo(() =>
    [...new Set(searchFiltered.map(c => c.brand).filter(Boolean))].sort(),
    [searchFiltered]
  );

  const hasActiveFilters = !!(filterStatus || filterZone || filterBrand || filterIsNew || selectedPropertyId);
  const clearFilters = () => {
    setFilterStatus('');
    setFilterZone('');
    setFilterBrand('');
    setFilterIsNew('');
    setSelectedPropertyId(null);
  };

  const filteredProperties = useMemo(() => {
    const q = propertySearchTerm.trim().toLowerCase();
    if (!q) return properties;
    return properties.filter(
      p =>
        (p.name && p.name.toLowerCase().includes(q)) ||
        (p.address && p.address.toLowerCase().includes(q)) ||
        (p.manager && p.manager.toLowerCase().includes(q))
    );
  }, [properties, propertySearchTerm]);

  useEffect(() => {
    if (selectedPropertyId && properties.length > 0 && !properties.some(p => p.id === selectedPropertyId)) {
      setSelectedPropertyId(null);
    }
  }, [properties, selectedPropertyId]);

  const getRowStyle = (camera: Camera) => {
    const hasError = !!(camera.errorTime && !camera.fixedTime);
    if (hasError) {
      return 'border-l-4 border-l-red-500 bg-red-50/80 hover:bg-red-100/80';
    }
    if (camera.status === 'OFFLINE') {
      return 'border-l-4 border-l-purple-500 bg-purple-50/60 hover:bg-purple-100/60';
    }
    if (camera.status === 'MAINTENANCE') {
      return 'border-l-4 border-l-amber-500 bg-amber-50/60 hover:bg-amber-100/60';
    }
    if (camera.status === 'ONLINE' && camera.consecutiveDrops > 0) {
      return 'border-l-4 border-l-orange-400 bg-orange-50/50 hover:bg-orange-100/50';
    }
    return 'border-l-4 border-l-emerald-500 bg-white hover:bg-slate-50';
  };

  const getStatusDot = (camera: Camera) => {
    const hasError = !!(camera.errorTime && !camera.fixedTime);
    if (hasError) return 'bg-red-500 ring-2 ring-red-200';
    if (camera.status === 'OFFLINE') return 'bg-purple-500 ring-2 ring-purple-200';
    if (camera.status === 'MAINTENANCE') return 'bg-amber-500 ring-2 ring-amber-200';
    if (camera.status === 'ONLINE' && camera.consecutiveDrops > 0) return 'bg-orange-400 ring-2 ring-orange-200';
    return 'bg-emerald-500 ring-2 ring-emerald-200';
  };

  const renderCameraRow = (camera: Camera, index: number) => {
    const isSimulating = simulatingIds.has(camera.id);
    const dropPercentage = (camera.consecutiveDrops / 10) * 100;
    const hasError = !!(camera.errorTime && !camera.fixedTime);

    return (
      <tr key={camera.id} className={`transition-colors border-b border-slate-100 last:border-0 group ${getRowStyle(camera)}`}>
        {/* No */}
        <td className="px-3 py-2 text-center text-sm text-slate-600 font-medium border-r border-slate-200/80">
          {index + 1}
        </td>

        {/* Position (Name + IP) — status dot + optional LỖI badge */}
        <td className="px-3 py-2 border-r border-slate-200/80">
          <div className="flex items-center gap-2 flex-wrap">
            <span className={`shrink-0 w-2.5 h-2.5 rounded-full ${getStatusDot(camera)}`} title={camera.status} aria-hidden />
            <div>
              <div className="font-medium text-slate-900 text-sm flex items-center gap-1.5 flex-wrap">
                {camera.name}
                {hasError && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white uppercase tracking-wide">
                    Lỗi
                  </span>
                )}
                {camera.isNew && !hasError && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                    NEW
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-mono">{camera.ip}</div>
            </div>
          </div>
        </td>

        {/* NEW */}
        <td className="px-3 py-2 text-center border-r border-slate-200/80">
          {camera.isNew && (
            <div className="text-xs">
              <div className="font-semibold text-emerald-700">new</div>
              <div className="text-[10px] text-slate-500">
                {camera.errorTime ? new Date(camera.errorTime).toLocaleDateString('en-GB') : ''}
              </div>
            </div>
          )}
        </td>

        {/* Error Time */}
        <td className={`px-3 py-2 text-sm border-r border-slate-200/80 ${hasError ? 'bg-red-100/70 text-red-800 font-medium' : 'text-slate-700'}`}>
          {camera.errorTime ? (
            <div className="text-xs">
              {new Date(camera.errorTime).toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              })}
            </div>
          ) : (
            <span className="text-slate-400">—</span>
          )}
        </td>

        {/* Fixed Time */}
        <td className="px-3 py-2 text-sm text-slate-700 border-r border-slate-200/80">
          {camera.fixedTime ? (
            <div className="text-xs text-emerald-700 font-medium">
              {new Date(camera.fixedTime).toLocaleString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              })}
            </div>
          ) : (
            <span className="text-slate-400">—</span>
          )}
        </td>

        {/* Reason */}
        <td className={`px-3 py-2 text-sm border-r border-slate-200/80 ${camera.reason && hasError ? 'bg-amber-100/70' : ''}`}>
          {camera.reason ? (
            <span className={`text-xs ${hasError ? 'text-amber-900 font-medium' : 'text-amber-700'}`}>{camera.reason}</span>
          ) : (
            <span className="text-slate-400 italic text-xs">—</span>
          )}
        </td>

        {/* Done By */}
        <td className="px-3 py-2 text-sm text-center border-r border-slate-200/80">
          {camera.doneBy ? (
            <span className="text-xs text-slate-700">{camera.doneBy}</span>
          ) : (
            <span className="text-slate-400 text-xs">—</span>
          )}
        </td>

        {/* Solution */}
        <td className="px-3 py-2 text-sm border-r border-slate-200/80">
          {camera.solution ? (
            <span className="text-xs text-slate-700">{camera.solution}</span>
          ) : (
            <span className="text-slate-400 italic text-xs">—</span>
          )}
        </td>

        {/* Ping */}
        <td className="px-3 py-2 border-r border-slate-200/80">
          <div className="flex items-center space-x-2">
            <div className="flex-1 h-2 bg-slate-200 overflow-hidden rounded-full min-w-[60px]">
              {camera.status === 'ONLINE' && camera.consecutiveDrops === 0 ? (
                <div className="h-full bg-emerald-500 w-full rounded-full" />
              ) : (
                <div
                  className={`h-full rounded-full transition-all duration-300 ease-out ${dropPercentage >= 100 ? 'bg-red-600' : dropPercentage >= 5 ? 'bg-orange-500' : 'bg-amber-400'}`}
                  style={{ width: `${Math.min(dropPercentage, 100)}%` }}
                />
              )}
            </div>
            <span className={`text-xs font-mono w-8 text-right tabular-nums ${camera.consecutiveDrops > 0 ? 'text-red-600 font-semibold' : 'text-slate-500'}`}>
              {camera.consecutiveDrops}/10
            </span>
          </div>
          {isSimulating && <span className="text-[10px] text-red-500 italic block mt-1">Đang mô phỏng...</span>}
        </td>

        {/* Thao tác */}
        <td className="px-3 py-2 text-right bg-white/50">
          <div className="flex items-center justify-end space-x-1 flex-wrap">
            <button type="button" onClick={() => onEditCamera(camera)} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Sửa">
              <Edit size={14} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Bạn có chắc muốn xoá camera này?')) onDeleteCamera(camera.id);
              }}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"
              title="Xóa"
            >
              <Trash2 size={14} />
            </button>
            <button
              type="button"
              onClick={() => onToggleSimulate(camera.id)}
              className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors border rounded ${isSimulating ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-slate-400 border-slate-200 hover:border-slate-300'}`}
              title="Mô phỏng rớt mạng (Ping Drop)"
            >
              <Zap size={14} />
            </button>
            <button
              type="button"
              onClick={() => setSelectedCamera(camera)}
              className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 transition-colors rounded"
              title="Chi tiết & AI"
            >
              <Info size={14} />
            </button>
          </div>
        </td>
      </tr>
    );
  };

  const getCardBorderClass = (camera: Camera) => {
    const hasError = !!(camera.errorTime && !camera.fixedTime);
    if (hasError) return 'border-l-4 border-l-red-500 bg-red-50/70';
    if (camera.status === 'OFFLINE') return 'border-l-4 border-l-purple-500 bg-purple-50/60';
    if (camera.status === 'MAINTENANCE') return 'border-l-4 border-l-amber-500 bg-amber-50/60';
    if (camera.status === 'ONLINE' && camera.consecutiveDrops > 0) return 'border-l-4 border-l-orange-400 bg-orange-50/50';
    return 'border-l-4 border-l-emerald-500 bg-white';
  };

  const renderCameraCard = (camera: Camera) => {
    const isSimulating = simulatingIds.has(camera.id);
    const dropPercentage = (camera.consecutiveDrops / 10) * 100;
    const hasError = !!(camera.errorTime && !camera.fixedTime);
    const statusBadgeClass =
      hasError
        ? 'text-red-700 border-red-200 bg-red-100'
        : camera.status === 'ONLINE'
          ? 'text-emerald-600 border-emerald-200 bg-emerald-50'
          : camera.status === 'OFFLINE'
            ? 'text-purple-600 border-purple-200 bg-purple-50'
            : 'text-amber-600 border-amber-200 bg-amber-50';
    const propName = propertyMap.get(camera.propertyId)?.name ?? '';

    return (
      <div
        key={camera.id}
        className={`border border-slate-200 rounded-lg p-3 shadow-sm space-y-2 ${getCardBorderClass(camera)}`}
      >
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0 flex items-start gap-2">
            <span className={`shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 ${getStatusDot(camera)}`} aria-hidden />
            <div>
              <div className="font-medium text-slate-900 text-sm flex items-center gap-1.5 flex-wrap">
                <span className="truncate">{camera.name}</span>
                {hasError && (
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-500 text-white uppercase">
                    Lỗi
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 font-mono">{camera.ip}</div>
              {propName && <div className="text-xs text-slate-400 truncate">{propName} • {camera.zone}</div>}
            </div>
          </div>
          <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 border rounded ${statusBadgeClass}`}>
            {camera.status}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 h-2 bg-slate-200 overflow-hidden rounded-full min-w-0">
            {camera.status === 'ONLINE' && camera.consecutiveDrops === 0 ? (
              <div className="h-full bg-emerald-500 w-full rounded-full" />
            ) : (
              <div
                className={`h-full rounded-full transition-all ${dropPercentage >= 100 ? 'bg-red-600' : dropPercentage >= 5 ? 'bg-orange-500' : 'bg-amber-400'}`}
                style={{ width: `${Math.min(dropPercentage, 100)}%` }}
              />
            )}
          </div>
          <span className={`text-xs font-mono w-8 text-right tabular-nums ${camera.consecutiveDrops > 0 ? 'text-red-600 font-semibold' : 'text-slate-500'}`}>
            {camera.consecutiveDrops}/10
          </span>
        </div>
        {(camera.errorTime || camera.reason) && (
          <div className={`text-xs space-y-0.5 p-2 rounded ${hasError ? 'bg-red-100/80 text-red-800' : 'bg-slate-50 text-slate-600'}`}>
            {camera.errorTime && (
              <div className="font-medium">
                Lỗi: {new Date(camera.errorTime).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })}
                {!camera.fixedTime && <span className="ml-1 text-red-600">(chưa xử lý)</span>}
              </div>
            )}
            {camera.reason && <div className={hasError ? 'text-amber-900 font-medium' : 'text-amber-700'}>{camera.reason}</div>}
          </div>
        )}
        <div className="flex items-center justify-end gap-1 pt-1 border-t border-slate-100">
          <button
            type="button"
            onClick={() => onEditCamera(camera)}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded"
            title="Sửa"
          >
            <Edit size={16} />
          </button>
          <button
            type="button"
            onClick={() => window.confirm('Bạn có chắc muốn xoá camera này?') && onDeleteCamera(camera.id)}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-500 hover:text-red-600 hover:bg-red-50 rounded"
            title="Xóa"
          >
            <Trash2 size={16} />
          </button>
          <button
            type="button"
            onClick={() => onToggleSimulate(camera.id)}
            className={`p-2 min-h-[44px] min-w-[44px] flex items-center justify-center border rounded ${
              isSimulating ? 'bg-red-50 text-red-600 border-red-200' : 'bg-white text-slate-400 border-slate-200'
            }`}
            title="Mô phỏng"
          >
            <Zap size={16} />
          </button>
          <button
            type="button"
            onClick={() => setSelectedCamera(camera)}
            className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded"
            title="Chi tiết"
          >
            <Info size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderPropertyTabsAndContent = () => (
      <>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <div className="relative flex items-center">
            <Building2 className="absolute left-2.5 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Tìm toà nhà..."
              className="pl-8 pr-3 py-1.5 border border-slate-300 rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm w-48"
              value={propertySearchTerm}
              onChange={e => setPropertySearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="flex overflow-x-auto gap-1 mb-4 border-b border-slate-200 pb-2 scroll-smooth flex-nowrap md:flex-wrap">
          <button
            type="button"
            onClick={() => setSelectedPropertyId(null)}
            className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t border-b-2 transition-colors shrink-0 ${selectedPropertyId === null
              ? 'bg-indigo-50 text-indigo-700 border-indigo-600 -mb-0.5'
              : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-800'
              }`}
          >
            <Cctv size={14} />
            <span>Tất cả</span>
            <span className="text-xs opacity-80">({filteredCamerasWithoutProperty.length})</span>
          </button>
          {filteredProperties.map(prop => {
            const count = filteredCamerasWithoutProperty.filter(c => c.propertyId === prop.id).length;
            const isSelected = selectedPropertyId === prop.id;
            return (
              <button
                key={prop.id}
                type="button"
                onClick={() => setSelectedPropertyId(prop.id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-t border-b-2 transition-colors shrink-0 ${isSelected
                  ? 'bg-indigo-50 text-indigo-700 border-indigo-600 -mb-0.5'
                  : 'text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-800'
                  }`}
                title={count !== cameras.filter(c => c.propertyId === prop.id).length ? `Sau bộ lọc: ${count}` : undefined}
              >
                <Building2 size={14} />
                <span className="truncate max-w-[120px] md:max-w-none">{prop.name}</span>
                <span className="text-xs opacity-80">({count})</span>
              </button>
            );
          })}
        </div>
        <div className="bg-white shadow-sm border border-slate-200 overflow-hidden">
          {propCameras.length === 0 ? (
            <>
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
                <h3 className="font-bold text-slate-800 text-sm flex items-center">
                  <span className="w-1.5 h-6 bg-indigo-500 mr-2"></span>
                  {selectedProp ? selectedProp.name : 'Tất cả'}
                </h3>
                <div className="flex items-center gap-2">
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
                  <button
                    type="button"
                    onClick={() => onAddCamera(selectedPropertyId ?? undefined)}
                    className="flex items-center px-2 py-1 bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-medium"
                  >
                    <Plus size={12} className="mr-1" />
                    Thêm camera
                  </button>
                </div>
              </div>
              <div className="py-10 text-center p-4">
                <p className="text-slate-500 text-sm">
                  {selectedProp
                    ? 'Chưa có camera trong tòa nhà này. Nhấn &quot;Thêm camera&quot; để thêm camera vào tòa nhà.'
                    : 'Chưa có camera nào. Nhấn &quot;Thêm Camera&quot; hoặc &quot;Import CSV&quot; để bắt đầu.'}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex justify-between items-center flex-wrap gap-2">
                <h3 className="font-bold text-slate-800 text-sm flex items-center">
                  <span className="w-1.5 h-6 bg-indigo-500 mr-2"></span>
                  {selectedProp ? selectedProp.name : 'Tất cả'}
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
                  <button
                    type="button"
                    onClick={() => onAddCamera(selectedPropertyId ?? undefined)}
                    className="flex items-center px-2 py-1 bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-medium"
                  >
                    <Plus size={12} className="mr-1" />
                    Thêm camera
                  </button>
                </div>
              </div>
              <>
                {/* Mobile: card list */}
                <div className="lg:hidden p-3 space-y-3">
                  {propCameras.map(c => renderCameraCard(c))}
                </div>
                {/* Desktop: table + legend */}
                <div className="hidden lg:block overflow-x-auto">
                  <div className="flex flex-wrap items-center gap-4 px-3 py-2 bg-slate-100/80 border-b border-slate-200 text-xs text-slate-600">
                    <span className="font-medium text-slate-700">Chú thích:</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-200" /> Bình thường</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 ring-2 ring-red-200" /> Đang lỗi</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500 ring-2 ring-purple-200" /> Mất tín hiệu</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 ring-2 ring-amber-200" /> Bảo trì</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-orange-400 ring-2 ring-orange-200" /> Ping bất ổn</span>
                  </div>
                  <table className="w-full text-sm text-left">
                    <thead className="bg-slate-800 text-white font-semibold text-xs border-b-2 border-slate-700">
                      <tr>
                        <th className="px-3 py-2.5 text-center border-r border-slate-600 w-12">No</th>
                        <th className="px-3 py-2.5 text-left border-r border-slate-600 min-w-[180px]">Position / Trạng thái</th>
                        <th className="px-3 py-2.5 text-center border-r border-slate-600">NEW</th>
                        <th className="px-3 py-2.5 text-left border-r border-slate-600">Error Time</th>
                        <th className="px-3 py-2.5 text-left border-r border-slate-600">FixedTime</th>
                        <th className="px-3 py-2.5 text-left border-r border-slate-600">Reason</th>
                        <th className="px-3 py-2.5 text-center border-r border-slate-600">Done By</th>
                        <th className="px-3 py-2.5 text-left border-r border-slate-600">Solution</th>
                        <th className="px-3 py-2.5 text-left border-r border-slate-600">Ping</th>
                        <th className="px-3 py-2.5 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {propCameras.map((camera, idx) => renderCameraRow(camera, idx))}
                    </tbody>
                  </table>
                </div>
              </>
            </>
          )}
        </div>
      </>
    );

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
                placeholder="Tìm theo tên, IP, khu vực, hãng, model, ghi chú..."
                className="w-full pl-8 pr-3 py-1.5 border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {onAddProperty && (
              <button
                type="button"
                onClick={onAddProperty}
                className="flex items-center px-3 py-2 min-h-[44px] bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm font-medium text-xs rounded"
              >
                <Building2 size={14} className="mr-1.5" />
                Thêm Toà Nhà
              </button>
            )}
            <button type="button" onClick={onImportCamera} className="flex items-center px-3 py-2 min-h-[44px] bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm font-medium text-xs rounded">
              <FileSpreadsheet size={14} className="mr-1.5" />
              Import CSV
            </button>
            <button type="button" onClick={() => onAddCamera()} className="flex items-center px-3 py-2 min-h-[44px] bg-indigo-600 text-white hover:bg-indigo-700 shadow-sm font-medium text-xs rounded">
              <Plus size={14} className="mr-1.5" />
              Thêm Camera
            </button>
          </div>
        </div>

        {/* Filter: mobile dropdown */}
        <div className="md:hidden relative">
          <button
            type="button"
            onClick={() => setFilterPanelOpen(o => !o)}
            className="flex items-center gap-2 px-3 py-2.5 min-h-[44px] border border-slate-300 rounded text-sm font-medium text-slate-700 bg-white hover:bg-slate-50"
          >
            <Filter size={16} />
            Bộ lọc
            {hasActiveFilters && <span className="w-2 h-2 bg-indigo-500 rounded-full" />}
          </button>
          {filterPanelOpen && (
            <div className="absolute left-0 right-0 top-full mt-1 p-3 bg-white border border-slate-200 rounded-lg shadow-lg z-20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-medium text-sm">Bộ lọc</span>
                <button type="button" onClick={() => setFilterPanelOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X size={18} />
                </button>
              </div>
              <select
                value={selectedPropertyId ?? ''}
                onChange={e => { setSelectedPropertyId(e.target.value || null); }}
                className="w-full border border-slate-300 py-2.5 px-3 min-h-[44px] rounded text-sm"
              >
                <option value="">Toà nhà</option>
                {properties.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={e => setFilterStatus((e.target.value || '') as CameraStatus | 'ERROR' | 'FIXED' | '')}
                className="w-full border border-slate-300 py-2.5 px-3 min-h-[44px] rounded text-sm"
              >
                <option value="">Trạng thái</option>
                <option value="ONLINE">Online</option>
                <option value="OFFLINE">Offline</option>
                <option value="ERROR">Lỗi / Đang fix</option>
                <option value="FIXED">Đã fix</option>
              </select>
              <select
                value={filterZone}
                onChange={e => setFilterZone(e.target.value)}
                className="w-full border border-slate-300 py-2.5 px-3 min-h-[44px] rounded text-sm"
              >
                <option value="">Zone</option>
                {zoneOptions.map(z => (
                  <option key={z} value={z}>{z}</option>
                ))}
              </select>
              <select
                value={filterBrand}
                onChange={e => setFilterBrand(e.target.value)}
                className="w-full border border-slate-300 py-2.5 px-3 min-h-[44px] rounded text-sm"
              >
                <option value="">Hãng</option>
                {brandOptions.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
              <select
                value={filterIsNew}
                onChange={e => setFilterIsNew((e.target.value || '') as '' | 'yes')}
                className="w-full border border-slate-300 py-2.5 px-3 min-h-[44px] rounded text-sm"
              >
                <option value="">Mới</option>
                <option value="yes">Camera mới</option>
              </select>
              {hasActiveFilters && (
                <button type="button" onClick={() => { clearFilters(); setFilterPanelOpen(false); }} className="w-full flex items-center justify-center gap-1 py-2.5 text-slate-600 hover:bg-slate-100 text-sm font-medium rounded">
                  <X size={14} /> Xóa bộ lọc
                </button>
              )}
            </div>
          )}
        </div>

        {/* Filter row: desktop */}
        <div className="hidden md:flex flex-wrap items-center gap-2 text-sm">
          <Filter size={14} className="text-slate-500" />
          <select
            value={selectedPropertyId ?? ''}
            onChange={e => setSelectedPropertyId(e.target.value || null)}
            className="border border-slate-300 py-2 px-3 min-h-[44px] rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-w-[120px]"
          >
            <option value="">Toà nhà</option>
            {properties.map(p => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus((e.target.value || '') as CameraStatus | 'ERROR' | 'FIXED' | '')}
            className="border border-slate-300 py-2 px-3 min-h-[44px] rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-w-[100px]"
          >
            <option value="">Trạng thái</option>
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
            <option value="ERROR">Lỗi / Đang fix</option>
            <option value="FIXED">Đã fix</option>
          </select>
          <select
            value={filterZone}
            onChange={e => setFilterZone(e.target.value)}
            className="border border-slate-300 py-2 px-3 min-h-[44px] rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-w-[100px]"
          >
            <option value="">Zone</option>
            {zoneOptions.map(z => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
          <select
            value={filterBrand}
            onChange={e => setFilterBrand(e.target.value)}
            className="border border-slate-300 py-2 px-3 min-h-[44px] rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-w-[100px]"
          >
            <option value="">Hãng</option>
            {brandOptions.map(b => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
          <select
            value={filterIsNew}
            onChange={e => setFilterIsNew((e.target.value || '') as '' | 'yes')}
            className="border border-slate-300 py-2 px-3 min-h-[44px] rounded focus:ring-2 focus:ring-indigo-500 outline-none text-sm min-w-[100px]"
          >
            <option value="">Mới</option>
            <option value="yes">Camera mới</option>
          </select>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1 px-3 py-2 min-h-[44px] text-slate-600 hover:bg-slate-100 text-xs font-medium rounded"
            >
              <X size={12} />
              Xóa bộ lọc
            </button>
          )}
        </div>
        {(searchDebounced || hasActiveFilters) && (
          <p className="text-sm text-slate-500">
            Đang hiển thị {propCameras.length} / {cameras.length} camera
          </p>
        )}
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

      {!camerasLoading && !camerasError && (
        renderPropertyTabsAndContent()
      )}

      <CameraDetailModal
        camera={selectedCamera}
        onClose={() => setSelectedCamera(null)}
        onUpdateNotes={onUpdateNotes}
      />
    </div>
  );
};
