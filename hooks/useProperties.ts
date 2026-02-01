import { useState, useCallback, useEffect } from 'react';
import { Property } from '../types';
import { propertiesApi } from '../services/api';

type AddNotificationFn = (msg: string, type: 'ERROR' | 'INFO' | 'WARNING') => void;

export function useProperties(addNotification: AddNotificationFn) {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await propertiesApi.getAll();
      setProperties(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Không tải được danh sách toà nhà';
      setError(msg);
      setProperties([]);
      addNotification(msg, 'ERROR');
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    fetchProperties();
  }, [fetchProperties]);

  const handleSaveProperty = useCallback(
    async (prop: Property): Promise<boolean> => {
      try {
        const exists = properties.some((p) => p.id === prop.id);
        if (exists) {
          const updated = await propertiesApi.update(prop);
          setProperties((prev) => prev.map((p) => (p.id === prop.id ? updated : p)));
          addNotification(`Cập nhật toà nhà: ${prop.name}`, 'INFO');
        } else {
          const created = await propertiesApi.create(prop);
          setProperties((prev) => [...prev, created]);
          addNotification(`Thêm toà nhà mới: ${prop.name}`, 'INFO');
        }
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Lỗi lưu toà nhà';
        addNotification(msg, 'ERROR');
        return false;
      }
    },
    [addNotification, properties]
  );

  const handleDeleteProperty = useCallback(
    async (id: string) => {
      if (!window.confirm('Bạn chắc chắn muốn xoá toà nhà này?')) return;
      try {
        await propertiesApi.delete(id);
        setProperties((prev) => prev.filter((p) => p.id !== id));
        addNotification('Đã xoá toà nhà.', 'INFO');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Lỗi xoá toà nhà';
        addNotification(msg, 'ERROR');
        alert(msg);
      }
    },
    [addNotification]
  );

  return {
    properties,
    loading,
    error,
    refetch: fetchProperties,
    handleSaveProperty,
    handleDeleteProperty,
  };
}
