import { useEffect } from 'react';
import { Camera } from '../types';

type AddNotificationFn = (msg: string, type: 'ERROR' | 'INFO' | 'WARNING') => void;

export function usePingSimulation(
  cameras: Camera[],
  setCameras: React.Dispatch<React.SetStateAction<Camera[]>>,
  simulatingCameraIds: Set<string>,
  addNotification: AddNotificationFn
) {
  useEffect(() => {
    const interval = setInterval(() => {
      setCameras((currentCameras) =>
        currentCameras.map((camera) => {
          const isTargetedForFail = simulatingCameraIds.has(camera.id);
          if (camera.status === 'MAINTENANCE') return camera;

          let newConsecutive = camera.consecutiveDrops;
          let newStatus = camera.status;
          let statusChanged = false;

          if (isTargetedForFail) {
            newConsecutive += 1;
            if (newConsecutive === 10 && newStatus !== 'OFFLINE') {
              newStatus = 'OFFLINE';
              statusChanged = true;
              addNotification(
                `CẢNH BÁO: Camera ${camera.name} (${camera.ip}) mất kết nối!`,
                'ERROR'
              );
            }
          } else {
            if (newConsecutive > 0) {
              newConsecutive = 0;
              if (newStatus === 'OFFLINE') {
                newStatus = 'ONLINE';
                statusChanged = true;
                addNotification(`Camera ${camera.name} đã kết nối trở lại.`, 'INFO');
              }
            }
          }

          if (statusChanged || newConsecutive !== camera.consecutiveDrops) {
            return {
              ...camera,
              consecutiveDrops: newConsecutive,
              status: newStatus,
              lastPingTime: Date.now(),
            };
          }
          return { ...camera, lastPingTime: Date.now() };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [simulatingCameraIds, addNotification, setCameras]);
}
