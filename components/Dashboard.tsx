
import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../App';
import { User, Order } from '../types';
import { Package, Clock, CheckCircle, Download, FileText, ChevronRight } from 'lucide-react';

interface DashboardProps {
  user: User;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const { lang, t } = useContext(LanguageContext);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(saved.filter((o: Order) => o.userId === user.id));
  }, [user.id]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'Processing': return 'text-blue-500 bg-blue-500/10';
      case 'Printing': return 'text-purple-500 bg-purple-500/10';
      case 'Ready': return 'text-green-500 bg-green-500/10';
      default: return 'text-zinc-500 bg-zinc-500/10';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 min-h-[70vh]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">
            {lang === 'en' ? `Welcome back, ${user.name}` : `مرحباً بعودتك، ${user.name}`}
          </h1>
          <p className="text-zinc-500">{lang === 'en' ? 'Manage your printing orders and profile settings.' : 'إدارة طلبات الطباعة وإعدادات ملفك الشخصي.'}</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-zinc-900 px-6 py-3 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl font-black text-yellow-400">{orders.length}</div>
            <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{lang === 'en' ? 'Total Orders' : 'إجمالي الطلبات'}</div>
          </div>
          <div className="bg-zinc-900 px-6 py-3 rounded-2xl border border-white/5 text-center">
            <div className="text-2xl font-black text-green-400">{orders.filter(o => o.status === 'Ready').length}</div>
            <div className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">{lang === 'en' ? 'Ready' : 'جاهزة'}</div>
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/5 bg-zinc-900/50 flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2">
            <Package size={18} className="text-yellow-400" />
            {t('user_dashboard')}
          </h3>
          <button className="text-xs text-yellow-400 font-bold hover:underline">{lang === 'en' ? 'Export CSV' : 'تصدير CSV'}</button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead>
              <tr className="text-[10px] uppercase font-bold text-zinc-500 border-b border-white/5">
                <th className="px-6 py-4 text-start">{lang === 'en' ? 'Order ID' : 'رقم الطلب'}</th>
                <th className="px-6 py-4 text-start">{lang === 'en' ? 'Service' : 'الخدمة'}</th>
                <th className="px-6 py-4 text-start">{lang === 'en' ? 'Date' : 'التاريخ'}</th>
                <th className="px-6 py-4 text-start">{lang === 'en' ? 'Amount' : 'المبلغ'}</th>
                <th className="px-6 py-4 text-start">{lang === 'en' ? 'Status' : 'الحالة'}</th>
                <th className="px-6 py-4 text-start">{lang === 'en' ? 'Actions' : 'إجراءات'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center text-zinc-600">
                    {lang === 'en' ? 'No orders found yet.' : 'لا توجد طلبات بعد.'}
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/5 transition-colors group">
                    <td className="px-6 py-6 font-mono text-xs text-yellow-400">{order.id}</td>
                    <td className="px-6 py-6">
                      <div className="text-sm font-bold">
                        {order.serviceId === '1' ? (lang === 'en' ? 'Business Cards' : 'كروت شخصية') : 'Custom Service'}
                      </div>
                      <div className="text-[10px] text-zinc-500">{order.specs.size} | Qty: {order.specs.quantity}</div>
                    </td>
                    <td className="px-6 py-6 text-sm text-zinc-400">
                      {new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US')}
                    </td>
                    <td className="px-6 py-6 font-bold">${order.price.toFixed(2)}</td>
                    <td className="px-6 py-6">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                          <Download size={16} />
                        </button>
                        <button className="p-2 bg-zinc-900 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors">
                          <FileText size={16} />
                        </button>
                      </div>
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

export default Dashboard;
