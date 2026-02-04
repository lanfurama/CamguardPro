import React from 'react';
import { Camera, Property } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { AlertTriangle, CheckCircle, PenTool, WifiOff } from 'lucide-react';

interface Props {
  cameras: Camera[];
  properties: Property[];
}

export const Dashboard: React.FC<Props> = ({ cameras, properties }) => {

  // Statistics
  const total = cameras.length;
  const online = cameras.filter(c => c.status === 'ONLINE').length;
  const offline = cameras.filter(c => c.status === 'OFFLINE').length;
  const maintenance = cameras.filter(c => c.status === 'MAINTENANCE').length;
  const hasError = cameras.filter(c => c.errorTime && !c.fixedTime).length;

  const statusData = [
    { name: 'Online', value: online, color: '#10b981' },
    { name: 'Offline', value: offline, color: '#7c3aed' },
    { name: 'Bảo trì', value: maintenance, color: '#f59e0b' },
    { name: 'Có lỗi', value: hasError, color: '#ef4444' },
  ];

  // Data for Bar Chart: Cameras by Property
  const propertyData = properties.map(prop => {
    const camsInProp = cameras.filter(c => c.propertyId === prop.id);
    return {
      name: prop.name.split(' ').slice(2).join(' '), // Shorten name
      Online: camsInProp.filter(c => c.status === 'ONLINE').length,
      Offline: camsInProp.filter(c => c.status === 'OFFLINE').length,
      Maintenance: camsInProp.filter(c => c.status === 'MAINTENANCE').length,
    };
  });

  return (
    <div className="space-y-4">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-medium">Tổng Camera</p>
            <h3 className="text-2xl font-bold text-slate-800 mt-0.5">{total}</h3>
          </div>
          <div className="w-10 h-10 bg-blue-50 flex items-center justify-center text-blue-600">
            <span className="font-bold text-sm">ALL</span>
          </div>
        </div>

        <div className="bg-white p-4 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-medium">Hoạt Động Tốt</p>
            <h3 className="text-2xl font-bold text-emerald-600 mt-0.5">{online}</h3>
          </div>
          <div className="w-10 h-10 bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="bg-white p-4 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-medium">Mất Tín Hiệu</p>
            <h3 className="text-2xl font-bold text-purple-600 mt-0.5">{offline}</h3>
          </div>
          <div className="w-10 h-10 bg-purple-50 flex items-center justify-center text-purple-600">
            <WifiOff size={20} />
          </div>
        </div>

        <div className="bg-white p-4 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-medium">Đang Bảo Trì</p>
            <h3 className="text-2xl font-bold text-amber-600 mt-0.5">{maintenance}</h3>
          </div>
          <div className="w-10 h-10 bg-amber-50 flex items-center justify-center text-amber-600">
            <PenTool size={20} />
          </div>
        </div>

        <div className="bg-white p-4 shadow-sm border border-slate-200 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-xs font-medium">Lỗi</p>
            <h3 className="text-2xl font-bold text-red-600 mt-0.5">{hasError}</h3>
          </div>
          <div className="w-10 h-10 bg-red-50 flex items-center justify-center text-red-600">
            <AlertTriangle size={20} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Pie Chart */}
        <div className="bg-white p-4 shadow-sm border border-slate-200 lg:col-span-1">
          <h3 className="font-bold text-slate-800 text-sm mb-4">Trạng Thái Hệ Thống</h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 shadow-sm border border-slate-200 lg:col-span-2">
          <h3 className="font-bold text-slate-800 text-sm mb-4">Phân Bố Theo Toà Nhà (Property)</h3>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={propertyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  cursor={{ fill: '#f1f5f9' }}
                  contentStyle={{ borderRadius: 0, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgb(0 0 0 / 0.06)' }}
                />
                <Legend />
                <Bar dataKey="Online" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                <Bar dataKey="Maintenance" stackId="a" fill="#f59e0b" />
                <Bar dataKey="Offline" stackId="a" fill="#7c3aed" radius={[0, 0, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Alert List */}
      {(offline > 0 || cameras.some(c => c.reason)) && (
        <div className="bg-red-50 border border-red-200 p-4">
          <h3 className="font-bold text-red-800 text-sm mb-3 flex items-center">
            <AlertTriangle className="mr-1.5" size={16} /> Camera Cần Xử Lý / Có Vấn Đề
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {cameras.filter(c => c.status !== 'ONLINE' || c.reason).map(c => (
              <div key={c.id} className="bg-white p-3 shadow-sm border-l-4 border-red-500 flex flex-col gap-1 min-h-[44px]">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="font-bold text-slate-700 text-sm">{c.name}</span>
                    <span className="text-xs text-slate-500 block">{c.ip}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 border ${c.status === 'ONLINE' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' :
                    c.status === 'OFFLINE' ? 'text-purple-600 border-purple-200 bg-purple-50' :
                      'text-amber-600 border-amber-200 bg-amber-50'
                    }`}>
                    {c.status}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {properties.find(p => p.id === c.propertyId)?.name} • {c.zone}
                </div>
                {c.reason && (
                  <div className="mt-1 pt-1 border-t border-slate-100 text-xs text-amber-700 font-medium flex items-start">
                    <AlertTriangle size={10} className="mr-1 mt-0.5 shrink-0" />
                    <span>{c.reason}</span>
                  </div>
                )}
                {c.errorTime && (
                  <div className="text-[10px] text-slate-400 pl-3.5">
                    {c.errorTime.slice(0, 10)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
