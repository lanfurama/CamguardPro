import { useState, useCallback, useEffect } from 'react';
import { Camera } from '../types';
import { camerasApi } from '../services/api';
import { parseCamerasResponse } from '../lib/api-response';
import { usePingSimulation } from './usePingSimulation';

type AddNotificationFn = (msg: string, type: 'ERROR' | 'INFO' | 'WARNING') => void;

export function useCameras(addNotification: AddNotificationFn) {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [simulatingCameraIds, setSimulatingCameraIds] = useState<Set<string>>(new Set());

  const fetchCameras = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await camerasApi.getAll();
      const data = parseCamerasResponse(raw);
      setCameras(data);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Không tải được danh sách camera';
      setError(msg);
      setCameras([]);
      addNotification(msg, 'ERROR');
    } finally {
      setLoading(false);
    }
  }, [addNotification]);

  useEffect(() => {
    fetchCameras();
  }, [fetchCameras]);

  usePingSimulation(cameras, setCameras, simulatingCameraIds, addNotification);

  const handleSaveCamera = useCallback(
    async (cameraData: Camera, editingCamera: Camera | null): Promise<boolean> => {
      try {
        if (editingCamera) {
          const updated = await camerasApi.update(cameraData);
          setCameras((prev) => prev.map((c) => (c.id === cameraData.id ? updated : c)));
          addNotification(`Đã cập nhật camera: ${cameraData.name}`, 'INFO');
        } else {
          const created = await camerasApi.create(cameraData);
          setCameras((prev) => [created, ...prev]);
          addNotification(`Đã thêm mới camera: ${cameraData.name}`, 'INFO');
        }
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Lỗi lưu camera';
        addNotification(msg, 'ERROR');
        return false;
      }
    },
    [addNotification]
  );

  const handleDeleteCamera = useCallback(
    async (id: string) => {
      try {
        await camerasApi.delete(id);
        setCameras((prev) => prev.filter((c) => c.id !== id));
        addNotification('Đã xoá camera khỏi hệ thống.', 'WARNING');
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Lỗi xoá camera';
        addNotification(msg, 'ERROR');
      }
    },
    [addNotification]
  );

  const handleImportCameras = useCallback(
    async (newCameras: Camera[]): Promise<boolean> => {
      try {
        const result = await camerasApi.import(newCameras);
        setCameras((prev) => {
          const byId = new Map(prev.map((c) => [c.id, c]));
          for (const c of result) byId.set(c.id, c);
          return Array.from(byId.values());
        });
        addNotification(`Đã import thành công ${result.length} camera (thêm mới và cập nhật).`, 'INFO');
        return true;
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Lỗi import camera';
        addNotification(msg, 'ERROR');
        return false;
      }
    },
    [addNotification]
  );

  const toggleSimulation = useCallback((cameraId: string) => {
    setSimulatingCameraIds((prev) => {
      const next = new Set(prev);
      if (next.has(cameraId)) {
        next.delete(cameraId);
        setCameras((curr) =>
          curr.map((c) =>
            c.id === cameraId ? { ...c, consecutiveDrops: 0, status: 'ONLINE' } : c
          )
        );
      } else {
        next.add(cameraId);
      }
      return next;
    });
  }, []);

  const updateCameraNotes = useCallback(
    async (id: string, notes: string) => {
      try {
        await camerasApi.updateNotes(id, notes);
        setCameras((curr) => curr.map((c) => (c.id === id ? { ...c, notes } : c)));
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Lỗi cập nhật ghi chú';
        addNotification(msg, 'ERROR');
      }
    },
    [addNotification]
  );

  return {
    cameras,
    setCameras,
    loading,
    error,
    refetch: fetchCameras,
    simulatingCameraIds,
    handleSaveCamera,
    handleDeleteCamera,
    handleImportCameras,
    toggleSimulation,
    updateCameraNotes,
  };
}
