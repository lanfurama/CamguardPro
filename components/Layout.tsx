import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Building2, Bell, Settings, ShieldCheck, Menu, X } from 'lucide-react';
import { Notification } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications: Notification[];
  onClearNotifications: () => void;
}

const navButtonClass = (active: boolean) =>
  `flex items-center space-x-2 w-full p-2.5 min-h-[44px] transition-colors rounded ${active ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`;

function SidebarContent({
  activeTab,
  onTabChange,
  onNavClick,
}: {
  activeTab: string;
  onTabChange: (tab: string) => void;
  onNavClick?: () => void;
}) {
  const handleNav = (tab: string) => {
    onTabChange(tab);
    onNavClick?.();
  };
  return (
    <>
      <div className="p-3 flex items-center space-x-2 border-b border-slate-700">
        <ShieldCheck className="w-7 h-7 text-emerald-400 shrink-0" />
        <span className="text-lg font-bold tracking-tight">CamGuard Pro</span>
      </div>
      <nav className="flex-1 p-2 space-y-1">
        <button type="button" onClick={() => handleNav('dashboard')} className={navButtonClass(activeTab === 'dashboard')}>
          <LayoutDashboard size={18} className="shrink-0" />
          <span className="font-medium text-sm">Tổng Quan</span>
        </button>
        <button type="button" onClick={() => handleNav('properties')} className={navButtonClass(activeTab === 'properties')}>
          <Building2 size={18} className="shrink-0" />
          <span className="font-medium text-sm">Quản Lý Toà Nhà</span>
        </button>
      </nav>
      <div className="p-2 border-t border-slate-700">
        <div className="text-xs text-slate-500 mb-1 px-2">HỆ THỐNG</div>
        <button type="button" onClick={() => handleNav('settings')} className={navButtonClass(activeTab === 'settings')}>
          <Settings size={18} className="shrink-0" />
          <span>Cấu hình</span>
        </button>
      </div>
    </>
  );
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeTab,
  onTabChange,
  notifications,
  onClearNotifications,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const shortTitles: Record<string, string> = {
    dashboard: 'Tổng quan',
    properties: 'Toà nhà & Camera',
    settings: 'Cấu hình',
  };
  const longTitles: Record<string, string> = {
    dashboard: 'Bảng Điều Khiển Hệ Thống',
    properties: 'Quản Lý Toà Nhà & Camera',
    settings: 'Cấu Hình Hệ Thống',
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-shrink-0 bg-slate-900 text-white flex-col shadow-xl z-20">
        <SidebarContent activeTab={activeTab} onTabChange={onTabChange} />
      </aside>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-30 md:hidden"
          aria-hidden
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 max-w-[85vw] bg-slate-900 text-white flex flex-col shadow-2xl z-40 md:hidden transition-transform duration-200 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-3 flex items-center justify-between border-b border-slate-700">
          <span className="font-bold text-slate-100">Menu</span>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="p-2 -m-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Đóng menu"
          >
            <X size={20} />
          </button>
        </div>
        <SidebarContent activeTab={activeTab} onTabChange={onTabChange} onNavClick={() => setSidebarOpen(false)} />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white shadow-sm flex-shrink-0 min-h-12 flex items-center justify-between px-3 md:px-4 py-2 z-10 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Mở menu"
            >
              <Menu size={22} />
            </button>
            <h2 className="text-base md:text-lg font-semibold text-slate-800 truncate">
              <span className="md:hidden">{shortTitles[activeTab] ?? activeTab}</span>
              <span className="hidden md:inline">{longTitles[activeTab] ?? activeTab}</span>
            </h2>
          </div>

          <div className="flex items-center gap-1 md:gap-4 shrink-0">
            <div className="relative" ref={notificationRef}>
              <button
                type="button"
                onClick={() => setNotificationOpen((o) => !o)}
                className="p-2 text-slate-500 hover:bg-slate-100 relative min-h-[44px] min-w-[44px] flex items-center justify-center rounded"
                aria-label="Thông báo"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              {notificationOpen && (
                <div className="absolute right-0 mt-1 w-72 bg-white shadow-xl border border-slate-200 z-50 rounded-lg overflow-hidden">
                  <div className="p-2 border-b border-slate-100 flex justify-between items-center">
                    <span className="font-semibold text-sm">Thông báo</span>
                    <button
                      type="button"
                      onClick={() => {
                        onClearNotifications();
                        setNotificationOpen(false);
                      }}
                      className="text-xs text-blue-600 hover:underline py-1 px-2 min-h-[32px]"
                    >
                      Đã đọc hết
                    </button>
                  </div>
                  <div className="max-h-56 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-3 text-center text-slate-400 text-sm">Không có thông báo mới</div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-2 border-b border-slate-50 hover:bg-slate-50 ${!n.read ? 'bg-blue-50/50' : ''}`}
                        >
                          <p className={`text-sm ${n.type === 'ERROR' ? 'text-red-600' : 'text-slate-700'}`}>{n.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{new Date(n.timestamp).toLocaleTimeString()}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2 py-1">
              <div className="w-8 h-8 md:w-7 md:h-7 bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs rounded-full shrink-0">
                AD
              </div>
              <div className="text-sm hidden sm:block">
                <div className="font-medium text-slate-900">Admin</div>
                <div className="text-slate-500 text-xs hidden md:block">Super User</div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50 p-3 md:p-4 min-h-0 pb-[env(safe-area-inset-bottom)]">
          {children}
        </main>
      </div>
    </div>
  );
};
