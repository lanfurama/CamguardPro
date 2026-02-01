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

  const statusData = [
    { name: 'Online', value: online, color: '#10b981' },
    { name: 'Offline', value: offline, color: '#ef4444' },
    { name: 'Bảo trì', value: maintenance, color: '#f59e0b' },
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
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Tổng Camera</p>
            <h3 className="text-3xl font-bold text-slate-800 mt-1">{total}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
             <span className="font-bold text-lg">ALL</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Hoạt Động Tốt</p>
            <h3 className="text-3xl font-bold text-emerald-600 mt-1">{online}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
             <CheckCircle size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Mất Tín Hiệu</p>
            <h3 className="text-3xl font-bold text-red-600 mt-1">{offline}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-red-600">
             <WifiOff size={24} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-medium">Đang Bảo Trì</p>
            <h3 className="text-3xl font-bold text-amber-600 mt-1">{maintenance}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
             <PenTool size={24} />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pie Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-1">
          <h3 className="font-bold text-slate-800 mb-6">Trạng Thái Hệ Thống</h3>
          <div className="h-64">
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
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="font-bold text-slate-800 mb-6">Phân Bố Theo Toà Nhà (Property)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={propertyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false}/>
                <Tooltip 
                    cursor={{fill: '#f1f5f9'}}
                    contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                />
                <Legend />
                <Bar dataKey="Online" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
                <Bar dataKey="Maintenance" stackId="a" fill="#f59e0b" />
                <Bar dataKey="Offline" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Alert List */}
      {offline > 0 && (
         <div className="bg-red-50 border border-red-100 rounded-xl p-6">
            <h3 className="font-bold text-red-800 mb-4 flex items-center">
                <AlertTriangle className="mr-2" size={20}/> Camera Cần Xử Lý Ngay
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cameras.filter(c => c.status === 'OFFLINE').map(c => (
                    <div key={c.id} className="bg-white p-3 rounded-lg shadow-sm border-l-4 border-red-500 flex justify-between items-center">
                        <div>
                            <span className="font-bold text-slate-700">{c.name}</span>
                            <span className="text-xs text-slate-500 block">{c.ip} - {properties.find(p => p.id === c.propertyId)?.name}</span>
                        </div>
                        <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">OFFLINE</span>
                    </div>
                ))}
            </div>
         </div>
      )}
    </div>
  );
};
