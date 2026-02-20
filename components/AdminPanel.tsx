
import React, { useState, useEffect, useContext } from 'react';
import { LanguageContext } from '../App';
import { Order } from '../types';
import { LayoutDashboard, Users, ShoppingCart, Settings, TrendingUp, Search, MoreHorizontal } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { lang } = useContext(LanguageContext);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(saved);
  }, []);

  const totalRevenue = orders.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black">{lang === 'en' ? 'Admin Control Center' : 'مركز تحكم الإدارة'}</h1>
          <p className="text-zinc-500">{lang === 'en' ? 'Real-time overview of business performance.' : 'نظرة عامة حقيقية على أداء العمل.'}</p>
        </div>
        <div className="flex items-center gap-2 bg-zinc-900 border border-white/5 px-4 py-2 rounded-xl">
          <Search size={18} className="text-zinc-500" />
          <input 
            placeholder={lang === 'en' ? 'Search orders...' : 'ابحث في الطلبات...'} 
            className="bg-transparent text-sm focus:outline-none w-48"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <ShoppingCart className="text-yellow-400" />
            <span className="text-green-500 text-xs font-bold">+12%</span>
          </div>
          <div>
            <div className="text-3xl font-black">{orders.length}</div>
            <div className="text-xs uppercase font-bold text-zinc-500 tracking-wider">New Orders</div>
          </div>
        </div>
        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <TrendingUp className="text-green-400" />
            <span className="text-green-500 text-xs font-bold">+8%</span>
          </div>
          <div>
            <div className="text-3xl font-black">${totalRevenue.toFixed(0)}</div>
            <div className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Total Revenue</div>
          </div>
        </div>
        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <Users className="text-blue-400" />
            <span className="text-red-500 text-xs font-bold">-2%</span>
          </div>
          <div>
            <div className="text-3xl font-black">128</div>
            <div className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Active Clients</div>
          </div>
        </div>
        <div className="bg-zinc-900 p-6 rounded-3xl border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <LayoutDashboard className="text-purple-400" />
          </div>
          <div>
            <div className="text-3xl font-black">94%</div>
            <div className="text-xs uppercase font-bold text-zinc-500 tracking-wider">Fulfillment Rate</div>
          </div>
        </div>
      </div>

      {/* Recent Orders List */}
      <div className="bg-zinc-950 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-bold">Recent Inquiries</h3>
          <button className="text-zinc-500 hover:text-white transition-colors">
            <MoreHorizontal />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-900/50">
              <tr className="text-[10px] font-bold text-zinc-500 uppercase">
                <th className="px-8 py-4 text-start">Customer</th>
                <th className="px-8 py-4 text-start">Order Detail</th>
                <th className="px-8 py-4 text-start">Files</th>
                <th className="px-8 py-4 text-start">Status</th>
                <th className="px-8 py-4 text-start">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr><td colSpan={5} className="px-8 py-12 text-center text-zinc-600">No data available</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5">
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold">Client ID: {order.userId}</div>
                      <div className="text-xs text-zinc-500">Member since 2024</div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="text-sm font-bold">${order.price.toFixed(2)}</div>
                      <div className="text-xs text-zinc-500">{order.specs.quantity} Units</div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-2">
                        {order.fileName ? (
                          <span className="text-blue-400 underline text-xs cursor-pointer">{order.fileName}</span>
                        ) : (
                          <span className="text-zinc-600 text-xs">No file</span>
                        )}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <select 
                        defaultValue={order.status}
                        className="bg-zinc-900 border border-white/10 rounded-lg text-xs p-2 focus:border-yellow-400"
                        onChange={(e) => {
                          const updated = orders.map(o => o.id === order.id ? {...o, status: e.target.value as any} : o);
                          localStorage.setItem('orders', JSON.stringify(updated));
                          setOrders(updated);
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Printing">Printing</option>
                        <option value="Ready">Ready</option>
                      </select>
                    </td>
                    <td className="px-8 py-6">
                      <button className="bg-yellow-400 text-black px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-yellow-500 transition-colors">
                        View Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
