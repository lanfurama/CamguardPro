import React, { useState } from 'react';
import { Property } from '../types';
import { Plus, Trash2, Edit2, Check, X, Building2, Map, Tag } from 'lucide-react';

interface Props {
  properties: Property[];
  brands: string[];
  propertiesLoading?: boolean;
  brandsLoading?: boolean;
  onSaveProperty: (property: Property) => void | Promise<boolean>;
  onDeleteProperty: (id: string) => void;
  onAddBrand: (brand: string) => void;
  onDeleteBrand: (brand: string) => void;
}

export const ConfigurationPanel: React.FC<Props> = ({ 
  properties, 
  brands,
  propertiesLoading,
  brandsLoading,
  onSaveProperty, 
  onDeleteProperty,
  onAddBrand,
  onDeleteBrand
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'properties' | 'brands'>('properties');
  const [saving, setSaving] = useState(false);
  
  // Property Editing State
  const [editingProp, setEditingProp] = useState<Property | null>(null);
  const [zoneInput, setZoneInput] = useState('');

  // Brand Input
  const [newBrand, setNewBrand] = useState('');

  const handleEditProp = (prop: Property) => {
    setEditingProp({ ...prop });
    setZoneInput('');
  };

  const handleNewProp = () => {
    setEditingProp({
        id: `PROP_${Date.now()}`,
        name: '',
        address: '',
        manager: '',
        zones: []
    });
    setZoneInput('');
  };

  const handlePropSave = async () => {
    if (editingProp && editingProp.name) {
        setSaving(true);
        try {
            const ok = await onSaveProperty(editingProp);
            if (ok) setEditingProp(null);
        } finally {
            setSaving(false);
        }
    }
  };

  const addZone = () => {
    if (zoneInput.trim() && editingProp) {
        if (!editingProp.zones.includes(zoneInput.trim())) {
            setEditingProp({
                ...editingProp,
                zones: [...editingProp.zones, zoneInput.trim()]
            });
        }
        setZoneInput('');
    }
  };

  const removeZone = (zone: string) => {
    if (editingProp) {
        setEditingProp({
            ...editingProp,
            zones: editingProp.zones.filter(z => z !== zone)
        });
    }
  };

  const tabButtonClass = (active: boolean) =>
    `flex items-center space-x-2 px-3 py-2.5 min-h-[44px] text-sm font-medium rounded transition-colors ${active ? 'bg-white shadow-sm text-indigo-700 font-bold border border-indigo-100' : 'text-slate-500 hover:bg-white/50'}`;

  return (
    <div className="flex flex-col md:flex-row h-full gap-4 md:gap-6">
        {/* Mobile: horizontal tabs */}
        <div className="flex md:hidden gap-2 border-b border-slate-200 pb-2">
            <button
                type="button"
                onClick={() => setActiveSubTab('properties')}
                className={tabButtonClass(activeSubTab === 'properties')}
            >
                <Building2 size={16} />
                <span>Toà nhà & Zone</span>
            </button>
            <button
                type="button"
                onClick={() => setActiveSubTab('brands')}
                className={tabButtonClass(activeSubTab === 'brands')}
            >
                <Tag size={16} />
                <span>Hãng Sản Xuất</span>
            </button>
        </div>

        {/* Desktop: Sub Sidebar */}
        <div className="hidden md:block w-40 flex-shrink-0 space-y-1">
            <button
                type="button"
                onClick={() => setActiveSubTab('properties')}
                className={`w-full text-left ${tabButtonClass(activeSubTab === 'properties')}`}
            >
                <Building2 size={16} />
                <span>Toà nhà & Zone</span>
            </button>
            <button
                type="button"
                onClick={() => setActiveSubTab('brands')}
                className={`w-full text-left ${tabButtonClass(activeSubTab === 'brands')}`}
            >
                <Tag size={16} />
                <span>Hãng Sản Xuất</span>
            </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 min-h-0 bg-white shadow-sm border border-slate-200 p-4 overflow-y-auto">
            
            {activeSubTab === 'properties' && (
                <div>
                    {propertiesLoading && (
                        <div className="py-12 text-center text-slate-500">Đang tải danh sách toà nhà...</div>
                    )}
                    {!propertiesLoading && (
                    <>
                    {!editingProp ? (
                        <>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-base font-bold text-slate-800">Danh Sách Toà Nhà (Property)</h3>
                                <button type="button" onClick={handleNewProp} className="flex items-center px-3 py-2.5 min-h-[44px] bg-indigo-600 text-white hover:bg-indigo-700 text-xs font-medium rounded">
                                    <Plus size={14} className="mr-1" /> Thêm Toà Nhà
                                </button>
                            </div>
                            <div className="space-y-3">
                                {properties.map(p => (
                                    <div key={p.id} className="border border-slate-200 p-3 flex justify-between items-start hover:bg-slate-50 transition">
                                        <div>
                                            <div className="font-bold text-slate-800 text-sm">{p.name}</div>
                                            <div className="text-xs text-slate-500">{p.address}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">Quản lý: {p.manager}</div>
                                            <div className="mt-2 flex flex-wrap gap-1.5">
                                                {p.zones.map(z => (
                                                    <span key={z} className="px-1.5 py-0.5 bg-indigo-50 text-indigo-700 text-[11px] border border-indigo-100 flex items-center">
                                                        <Map size={9} className="mr-0.5"/> {z}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex space-x-1 shrink-0">
                                            <button type="button" onClick={() => handleEditProp(p)} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded"><Edit2 size={16} /></button>
                                            <button type="button" onClick={() => onDeleteProperty(p.id)} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-red-600 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="max-w-2xl mx-auto">
                            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-2">
                                <h3 className="text-base font-bold text-slate-800">{editingProp.id.startsWith('PROP_') && !properties.find(p=>p.id===editingProp.id) ? 'Thêm Toà Nhà Mới' : 'Chỉnh Sửa Toà Nhà'}</h3>
                                <button type="button" onClick={() => setEditingProp(null)} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-600 rounded" aria-label="Đóng"><X size={20} /></button>
                            </div>
                            
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-0.5">Tên Toà Nhà</label>
                                    <input type="text" value={editingProp.name} onChange={e => setEditingProp({...editingProp, name: e.target.value})} className="w-full border border-slate-300 p-2.5 min-h-[44px] text-sm focus:ring-2 focus:ring-indigo-500 outline-none rounded" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-0.5">Địa chỉ</label>
                                    <input type="text" value={editingProp.address} onChange={e => setEditingProp({...editingProp, address: e.target.value})} className="w-full border border-slate-300 p-2.5 min-h-[44px] text-sm focus:ring-2 focus:ring-indigo-500 outline-none rounded" />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-0.5">Người Quản Lý</label>
                                    <input type="text" value={editingProp.manager} onChange={e => setEditingProp({...editingProp, manager: e.target.value})} className="w-full border border-slate-300 p-2.5 min-h-[44px] text-sm focus:ring-2 focus:ring-indigo-500 outline-none rounded" />
                                </div>

                                <div className="pt-3 border-t border-slate-100">
                                    <label className="block text-xs font-bold text-slate-800 mb-1.5">Quản Lý Khu Vực (Zones)</label>
                                    <div className="flex gap-2 mb-2">
                                        <input 
                                            type="text" 
                                            placeholder="Nhập tên khu vực (VD: Sảnh A, Tầng 1)..." 
                                            value={zoneInput} 
                                            onChange={e => setZoneInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && addZone()}
                                            className="flex-1 border border-slate-300 p-2.5 min-h-[44px] text-sm focus:ring-2 focus:ring-indigo-500 outline-none rounded"
                                        />
                                        <button type="button" onClick={addZone} className="px-3 py-2.5 min-h-[44px] bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded">Thêm Zone</button>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border border-slate-100 min-h-[80px]">
                                        {editingProp.zones.length === 0 && <span className="text-xs text-slate-400 italic">Chưa có khu vực nào.</span>}
                                        {editingProp.zones.map(z => (
                                            <span key={z} className="px-2 py-0.5 bg-white text-indigo-700 text-xs border border-indigo-200 flex items-center">
                                                {z}
                                                <button type="button" onClick={() => removeZone(z)} className="ml-1.5 p-1 min-h-[28px] min-w-[28px] inline-flex items-center justify-center text-indigo-400 hover:text-red-500 rounded"><X size={12}/></button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end gap-2">
                                    <button type="button" onClick={() => setEditingProp(null)} className="px-3 py-2.5 min-h-[44px] text-slate-600 hover:bg-slate-100 text-sm font-medium rounded">Huỷ</button>
                                    <button type="button" onClick={handlePropSave} disabled={saving} className="px-3 py-2.5 min-h-[44px] bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-sm font-medium flex items-center rounded">
                                        <Check size={16} className="mr-1.5" /> {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    </>
                    )}
                </div>
            )}

            {activeSubTab === 'brands' && (
                <div>
                    {brandsLoading && (
                        <div className="py-12 text-center text-slate-500">Đang tải danh sách hãng...</div>
                    )}
                    {!brandsLoading && (
                    <>
                    <h3 className="text-lg font-bold text-slate-800 mb-6">Cấu Hình Hãng Sản Xuất</h3>
                    
                    <div className="flex flex-col sm:flex-row gap-2 mb-6 max-w-md">
                        <input
                            type="text"
                            placeholder="Nhập tên hãng mới..."
                            value={newBrand}
                            onChange={e => setNewBrand(e.target.value)}
                            className="flex-1 border border-slate-300 p-2.5 min-h-[44px] rounded focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                        <button
                            type="button"
                            onClick={() => {
                                if (newBrand.trim()) {
                                    onAddBrand(newBrand.trim());
                                    setNewBrand('');
                                }
                            }}
                            className="px-4 py-2.5 min-h-[44px] bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                            Thêm
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {brands.map(brand => (
                            <div key={brand} className="p-3 bg-slate-50 border border-slate-200 rounded flex justify-between items-center gap-2">
                                <span className="font-medium text-slate-700 truncate min-w-0">{brand}</span>
                                <button type="button" onClick={() => onDeleteBrand(brand)} className="p-2 min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-red-500 rounded shrink-0">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                    </>
                    )}
                </div>
            )}
        </div>
    </div>
  );
};
