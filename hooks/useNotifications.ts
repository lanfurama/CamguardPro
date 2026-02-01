import { useState, useCallback } from 'react';
import { Notification } from '../types';

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((msg: string, type: 'ERROR' | 'INFO' | 'WARNING') => {
    const newNotif: Notification = {
      id: Date.now().toString() + Math.random(),
      timestamp: Date.now(),
      message: msg,
      type,
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  return { notifications, addNotification, clearNotifications };
}
