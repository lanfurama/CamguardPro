import React, { useState, useEffect } from 'react';
import { Property } from '../types';
import { X, Check, Map } from 'lucide-react';

interface Props {
  property: Property | null;
  onSave: (property: Property) => void | Promise<boolean>;
  onClose: () => void;
  onDelete?: (id: string) => void;
}

export const PropertyFormModal: React.FC<Props> = ({ property, onSave, onClose, onDelete }) => {
  const isEditing = !!property && property.name !== '';

  const [saving, setSaving] = useState(false);
  const [zoneInput, setZoneInput] = useState('');
  const [formData, setFormData] = useState<Property>({
    id: `PROP_${Date.now()}`,
    name: '',
    address: '',
    manager: '',
    zones: [],
  });

  useEffect(() => {
    if (property) {
      setFormData({ ...property });
    } else {
      setFormData({
        id: `PROP_${Date.now()}`,
        name: '',
        address: '',
        manager: '',
        zones: [],
      });
    }
    setZoneInput('');
  }, [property]);

  const handleSave = async () => {
    if (!formData.name.trim()) return;
    setSaving(true);
    try {
      const ok = await onSave(formData);
      if (ok) onClose();
    } finally {
      setSaving(false);
    }
  };

  const addZone = () => {
    if (!zoneInput.trim()) return;
    if (formData.zones.includes(zoneInput.trim())) {
      setZoneInput('');
      return;
    }
    setFormData({
      ...formData,
      zones: [...formData.zones, zoneInput.trim()],
    });
    setZoneInput('');
  };

  const removeZone = (zone: string) => {
    setFormData({
      ...formData,
      zones: formData.zones.filter(z => z !== zone),
    });
  };

  const handleDelete = () => {
    if (!onDelete || !formData.id) return;
    onDelete(formData.id);
    onClose();
  };

  const inputClass = 'w-full border border-slate-300 p-2.5 min-h-[44px] text-sm focus:ring-2 focus:ring-indigo-500 outline-none rounded';

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4">
      <div className="bg-white shadow-2xl w-full h-full max-h-full md:max-w-2xl md:max-h-[90vh] md:h-auto overflow-hidden flex flex-col rounded-none md:rounded-lg">
        <div className="p-3 md:p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 flex-shrink-0">
          <h3 className="text-base md:text-lg font-bold text-slate-900">
            {isEditing ? 'Chỉnh Sửa Toà Nhà' : 'Thêm Toà Nhà Mới'}
          </h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded" aria-label="Đóng">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-[env(safe-area-inset-bottom)]">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">Tên Toà Nhà *</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              className={inputClass}
              placeholder="Ví dụ: Furama Resort Đà Nẵng"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">Địa chỉ</label>
            <input
              type="text"
              value={formData.address}
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-0.5">Người Quản Lý</label>
            <input
              type="text"
              value={formData.manager}
              onChange={e => setFormData({ ...formData, manager: e.target.value })}
              className={inputClass}
            />
          </div>

          <div className="pt-3 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-800 mb-1.5">Quản Lý Khu Vực (Zones)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Nhập tên khu vực (VD: Sảnh A, Tầng 1)..."
                value={zoneInput}
                onChange={e => setZoneInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addZone())}
                className={`flex-1 ${inputClass}`}
              />
              <button
                type="button"
                onClick={addZone}
                className="px-3 py-2.5 min-h-[44px] bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded"
              >
                Thêm Zone
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5 p-3 bg-slate-50 border border-slate-100 min-h-[80px]">
              {formData.zones.length === 0 && (
                <span className="text-xs text-slate-400 italic">Chưa có khu vực nào.</span>
              )}
              {formData.zones.map(z => (
                <span
                  key={z}
                  className="px-2 py-0.5 bg-white text-indigo-700 text-xs border border-indigo-200 flex items-center"
                >
                  <Map size={9} className="mr-0.5" /> {z}
                  <button
                    type="button"
                    onClick={() => removeZone(z)}
                    className="ml-1.5 text-indigo-400 hover:text-red-500"
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 flex justify-between items-center flex-wrap gap-2 flex-shrink-0">
          <div>
            {isEditing && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="px-3 py-2.5 min-h-[44px] text-red-600 hover:bg-red-50 text-sm font-medium rounded"
              >
                Xoá tòa nhà
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2.5 min-h-[44px] text-slate-600 hover:bg-slate-100 text-sm font-medium rounded"
            >
              Huỷ
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving || !formData.name.trim()}
              className="px-3 py-2.5 min-h-[44px] bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-sm font-medium flex items-center rounded"
            >
              <Check size={16} className="mr-1.5" /> {saving ? 'Đang lưu...' : 'Lưu Thay Đổi'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
