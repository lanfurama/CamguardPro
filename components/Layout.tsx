import React from 'react';
import { LayoutDashboard, Building2, Bell, Settings, Cctv, ShieldCheck } from 'lucide-react';
import { Notification } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  notifications: Notification[];
  onClearNotifications: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  notifications,
  onClearNotifications
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20">
        <div className="p-6 flex items-center space-x-3 border-b border-slate-700">
          <ShieldCheck className="w-8 h-8 text-emerald-400" />
          <span className="text-xl font-bold tracking-tight">CamGuard Pro</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => onTabChange('dashboard')}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Tổng Quan</span>
          </button>
          
          <button 
            onClick={() => onTabChange('properties')}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'properties' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Building2 size={20} />
            <span className="font-medium">Quản Lý Toà Nhà</span>
          </button>
           <button 
            onClick={() => onTabChange('cameras')}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-colors ${activeTab === 'cameras' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Cctv size={20} />
            <span className="font-medium">Tất Cả Camera</span>
          </button>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="text-xs text-slate-500 mb-2">HỆ THỐNG</div>
          <button 
            onClick={() => onTabChange('settings')}
            className={`flex items-center space-x-3 w-full p-2 rounded transition-colors ${activeTab === 'settings' ? 'text-white bg-slate-800' : 'text-slate-400 hover:text-white'}`}
          >
            <Settings size={18} />
            <span>Cấu hình</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center justify-between px-8 z-10">
          <h2 className="text-xl font-semibold text-slate-800">
            {activeTab === 'dashboard' && 'Bảng Điều Khiển Hệ Thống'}
            {activeTab === 'properties' && 'Quản Lý Property & Zone'}
            {activeTab === 'cameras' && 'Danh Sách Camera'}
            {activeTab === 'settings' && 'Cấu Hình Hệ Thống'}
          </h2>
          
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-full relative">
                <Bell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 hidden group-hover:block z-50">
                <div className="p-3 border-b border-slate-100 flex justify-between items-center">
                  <span className="font-semibold text-sm">Thông báo</span>
                  <button onClick={onClearNotifications} className="text-xs text-blue-600 hover:underline">Đã đọc hết</button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-400 text-sm">Không có thông báo mới</div>
                  ) : (
                    notifications.map(n => (
                      <div key={n.id} className={`p-3 border-b border-slate-50 hover:bg-slate-50 ${!n.read ? 'bg-blue-50/50' : ''}`}>
                         <p className={`text-sm ${n.type === 'ERROR' ? 'text-red-600' : 'text-slate-700'}`}>{n.message}</p>
                         <p className="text-xs text-slate-400 mt-1">{new Date(n.timestamp).toLocaleTimeString()}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
                    AD
                </div>
                <div className="text-sm">
                    <div className="font-medium text-slate-900">Admin</div>
                    <div className="text-slate-500 text-xs">Super User</div>
                </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
