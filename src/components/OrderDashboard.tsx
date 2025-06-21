import React, { useState } from 'react';
import { 
  ShoppingCart, 
  TrendingUp, 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  Filter,
  Download,
  Plus
} from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  time: string;
  paymentMethod: string;
}

const todayOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customer: 'Priya Sharma',
    items: 3,
    total: 4250,
    status: 'delivered',
    date: 'Today',
    time: '2 hours ago',
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Rahul Kumar',
    items: 1,
    total: 1850,
    status: 'shipped',
    date: 'Today',
    time: '4 hours ago',
    paymentMethod: 'Card'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Anita Patel',
    items: 2,
    total: 3200,
    status: 'processing',
    date: 'Today',
    time: '6 hours ago',
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Vikram Singh',
    items: 5,
    total: 7800,
    status: 'pending',
    date: 'Today',
    time: '8 hours ago',
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD-2024-005',
    customer: 'Meera Joshi',
    items: 1,
    total: 950,
    status: 'cancelled',
    date: 'Yesterday',
    time: '1 day ago',
    paymentMethod: 'Card'
  },
  {
    id: 'ORD-2024-006',
    customer: 'Arjun Reddy',
    items: 4,
    total: 5600,
    status: 'delivered',
    date: 'Today',
    time: '3 hours ago',
    paymentMethod: 'UPI'
  }
];

export function OrderDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const filteredOrders = statusFilter === 'all' 
    ? todayOrders 
    : todayOrders.filter(order => order.status === statusFilter);

  const orderStats = {
    total: todayOrders.length,
    pending: todayOrders.filter(o => o.status === 'pending').length,
    processing: todayOrders.filter(o => o.status === 'processing').length,
    shipped: todayOrders.filter(o => o.status === 'shipped').length,
    delivered: todayOrders.filter(o => o.status === 'delivered').length,
    cancelled: todayOrders.filter(o => o.status === 'cancelled').length,
    totalRevenue: todayOrders.reduce((sum, order) => sum + order.total, 0),
    avgOrderValue: Math.round(todayOrders.reduce((sum, order) => sum + order.total, 0) / todayOrders.length)
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
      processing: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Package },
      shipped: { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Package },
      delivered: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
        <Icon className="w-4 h-4" />
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const handleExport = () => {
    const csvData = [
      ['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Payment Method'],
      ...filteredOrders.map(order => [
        order.id,
        order.customer,
        order.items,
        order.total,
        order.status,
        order.date,
        order.paymentMethod
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Order Management</h1>
        <p className="text-slate-600">Track and manage your orders efficiently</p>
      </div>

      {/* Order Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{orderStats.total}</p>
              <p className="text-sm text-slate-500">Total Orders</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{orderStats.pending}</p>
              <p className="text-sm text-slate-500">Pending</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{orderStats.processing}</p>
              <p className="text-sm text-slate-500">Processing</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{orderStats.delivered}</p>
              <p className="text-sm text-slate-500">Delivered</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">₹{orderStats.totalRevenue.toLocaleString()}</p>
              <p className="text-sm text-slate-500">Revenue</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">₹{orderStats.avgOrderValue.toLocaleString()}</p>
              <p className="text-sm text-slate-500">Avg Order</p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/50">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Recent Orders</h2>
              <p className="text-sm text-slate-500">Manage and track your orders</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleExport}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              
              <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Order</span>
              </button>
              
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Order Details</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Items</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Total</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Payment</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Time</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {order.customer.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium text-slate-800">{order.customer}</h3>
                        <p className="text-sm text-slate-500">{order.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-semibold text-slate-800">{order.items}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="font-semibold text-slate-800">₹{order.total.toLocaleString()}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm text-slate-600">{order.paymentMethod}</span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div>
                      <span className="text-sm font-medium text-slate-800">{order.date}</span>
                      <p className="text-xs text-slate-500">{order.time}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium mx-auto">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}