import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { Camera, Property } from '../types';

interface Props {
  camera?: Camera | null;
  properties: Property[];
  brands: string[];
  onSave: (camera: Camera) => void | Promise<void>;
  onClose: () => void;
}

export const CameraFormModal: React.FC<Props> = ({ camera, properties, brands, onSave, onClose }) => {
  const isEditing = !!camera;
  
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Camera>>({
    name: '',
    ip: '',
    propertyId: properties[0]?.id || '',
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
    }
  }, [camera]);

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

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <h3 className="text-xl font-bold text-slate-900">{isEditing ? 'Cập Nhật Camera' : 'Thêm Camera Mới'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên Camera *</label>
                <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ví dụ: Cam Sảnh A" />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Địa chỉ IP *</label>
                <input required type="text" name="ip" value={formData.ip} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none font-mono" placeholder="192.168.1.xxx" />
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Toà nhà (Property) *</label>
                <select name="propertyId" value={formData.propertyId} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                   {properties.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Khu vực (Zone)</label>
                <select name="zone" value={formData.zone} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                   <option value="">-- Chọn khu vực --</option>
                   {availableZones.map(z => <option key={z} value={z}>{z}</option>)}
                </select>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Hãng (Brand)</label>
                <select name="brand" value={formData.brand} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none">
                   {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                <input type="text" name="model" value={formData.model} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" />
             </div>
          </div>

          <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Vị trí chi tiết</label>
             <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Ví dụ: Góc hành lang phía Tây" />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Thông số (Specs)</label>
                <input type="text" name="specs" value={formData.specs} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="2MP, IR 30m..." />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nhà cung cấp</label>
                <input type="text" name="supplier" value={formData.supplier} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none" />
             </div>
          </div>

           <div>
             <label className="block text-sm font-medium text-slate-700 mb-1">Ghi chú</label>
             <textarea name="notes" rows={3} value={formData.notes} onChange={handleChange} className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"></textarea>
          </div>

          <div className="flex justify-end pt-4 space-x-3 border-t">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium">Huỷ</button>
            <button type="submit" disabled={saving} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white rounded-lg font-medium flex items-center shadow-lg shadow-indigo-200">
                <Save size={18} className="mr-2" /> {saving ? 'Đang lưu...' : 'Lưu Camera'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
