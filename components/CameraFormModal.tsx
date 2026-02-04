import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { Camera, Property } from '../types';

interface Props {
  camera?: Camera | null;
  properties: Property[];
  brands: string[];
  defaultPropertyId?: string;
  onSave: (camera: Camera) => void | Promise<void>;
  onClose: () => void;
}

export const CameraFormModal: React.FC<Props> = ({ camera, properties, brands, defaultPropertyId, onSave, onClose }) => {
  const isEditing = !!camera;

  const initialPropertyId = defaultPropertyId || properties[0]?.id || '';

  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Camera>>({
    name: '',
    ip: '',
    propertyId: initialPropertyId,
    zone: '',
    brand: brands[0] || '',
    model: '',
    location: '',
    specs: '',
    supplier: '',
    status: 'ONLINE',
    logs: [],
    notes: '',
    consecutiveDrops: 0,
    lastPingTime: Date.now()
  });

  useEffect(() => {
    if (camera) {
      setFormData(camera);
    } else if (defaultPropertyId) {
      setFormData(prev => ({ ...prev, propertyId: defaultPropertyId }));
    }
  }, [camera, defaultPropertyId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.ip || !formData.propertyId) {
      alert("Vui lòng điền các thông tin bắt buộc (Tên, IP, Toà nhà)");
      return;
    }
    setSaving(true);
    try {
      const newCamera: Camera = {
        ...formData as Camera,
        id: camera?.id || `CAM_${Date.now()}`,
        lastPingTime: Date.now(),
        logs: camera?.logs || []
      };
      await onSave(newCamera);
      onClose();
    } finally {
      setSaving(false);
    }
  };

  // Get zones for selected property
  const selectedProperty = properties.find(p => p.id === formData.propertyId);
  const availableZones = selectedProperty?.zones || [];

  const inputClass = 'w-full border border-slate-300 p-2.5 min-h-[44px] text-sm focus:ring-2 focus:ring-indigo-500 outline-none rounded';
  const labelClass = 'block text-xs font-medium text-slate-700 mb-0.5';

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-0 md:p-4">
      <div className="bg-white shadow-2xl w-full h-full max-h-full md:max-w-2xl md:max-h-[90vh] md:h-auto overflow-hidden flex flex-col rounded-none md:rounded-lg">
        <div className="p-3 md:p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 flex-shrink-0">
          <h3 className="text-base md:text-lg font-bold text-slate-900">{isEditing ? 'Cập Nhật Camera' : 'Thêm Camera Mới'}</h3>
          <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-2 min-h-[44px] min-w-[44px] flex items-center justify-center rounded" aria-label="Đóng">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 space-y-3 pb-[env(safe-area-inset-bottom)]">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div>
                <label className={labelClass}>Tên Camera *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Ví dụ: Cam Sảnh A" />
             </div>
             <div>
                <label className={labelClass}>Địa chỉ IP *</label>
                <input required type="text" name="ip" value={formData.ip} onChange={handleChange} className={`${inputClass} font-mono`} placeholder="192.168.1.xxx" />
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div>
                <label className={labelClass}>Toà nhà (Property) *</label>
                <select name="propertyId" value={formData.propertyId} onChange={handleChange} className={inputClass}>
                   {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
             </div>
             <div>
                <label className={labelClass}>Khu vực (Zone)</label>
                <select name="zone" value={formData.zone} onChange={handleChange} className={inputClass}>
                   <option value="">-- Chọn khu vực --</option>
                   {availableZones.map(z => <option key={z} value={z}>{z}</option>)}
                </select>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div>
                <label className={labelClass}>Hãng (Brand)</label>
                <select name="brand" value={formData.brand} onChange={handleChange} className={inputClass}>
                   {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
             </div>
             <div>
                <label className={labelClass}>Model</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} className={inputClass} />
             </div>
          </div>

          <div>
             <label className={labelClass}>Vị trí chi tiết</label>
             <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="Ví dụ: Góc hành lang phía Tây" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             <div>
                <label className={labelClass}>Thông số (Specs)</label>
                <input type="text" name="specs" value={formData.specs} onChange={handleChange} className={inputClass} placeholder="2MP, IR 30m..." />
             </div>
             <div>
                <label className={labelClass}>Nhà cung cấp</label>
                <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} className={inputClass} />
             </div>
          </div>

           <div>
             <label className={labelClass}>Ghi chú</label>
             <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} className={`${inputClass} min-h-[80px]`} />
          </div>

          <div className="flex justify-end pt-3 space-x-2 border-t gap-2">
            <button type="button" onClick={onClose} className="px-3 py-2.5 min-h-[44px] text-slate-600 hover:bg-slate-100 text-sm font-medium rounded">Huỷ</button>
            <button type="submit" disabled={saving} className="px-3 py-2.5 min-h-[44px] bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-sm font-medium flex items-center rounded">
                <Save size={16} className="mr-1.5" /> {saving ? 'Đang lưu...' : 'Lưu Camera'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
