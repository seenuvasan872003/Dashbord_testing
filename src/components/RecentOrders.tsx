import React, { useState } from 'react';
import { ShoppingCart, Clock, CheckCircle, XCircle, Package, Eye } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod: string;
}

const recentOrders: Order[] = [
  {
    id: 'ORD-2024-001',
    customer: 'Priya Sharma',
    items: 3,
    total: 4250,
    status: 'delivered',
    date: '2 hours ago',
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Rahul Kumar',
    items: 1,
    total: 1850,
    status: 'shipped',
    date: '4 hours ago',
    paymentMethod: 'Card'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Anita Patel',
    items: 2,
    total: 3200,
    status: 'processing',
    date: '6 hours ago',
    paymentMethod: 'Cash on Delivery'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Vikram Singh',
    items: 5,
    total: 7800,
    status: 'pending',
    date: '8 hours ago',
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD-2024-005',
    customer: 'Meera Joshi',
    items: 1,
    total: 950,
    status: 'cancelled',
    date: '1 day ago',
    paymentMethod: 'Card'
  }
];

export function RecentOrders() {
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-700', icon: Clock },
      processing: { color: 'bg-blue-100 text-blue-700', icon: Package },
      shipped: { color: 'bg-purple-100 text-purple-700', icon: Package },
      delivered: { color: 'bg-green-100 text-green-700', icon: CheckCircle },
      cancelled: { color: 'bg-red-100 text-red-700', icon: XCircle }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3" />
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Recent Orders</h2>
            <p className="text-xs text-slate-500">Latest customer orders</p>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          <span className="font-medium text-blue-600">{recentOrders.length}</span> orders today
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 pr-2">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="border border-slate-200 rounded-lg p-3 hover:shadow-sm transition-all duration-300 group"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {order.customer.charAt(0)}
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                    {order.customer}
                  </h3>
                  <p className="text-xs text-slate-500">{order.id}</p>
                </div>
              </div>
              {getStatusBadge(order.status)}
            </div>

            <div className="grid grid-cols-4 gap-2 mb-2">
              <div>
                <p className="text-xs text-slate-500">Items</p>
                <p className="text-sm font-semibold text-slate-800">{order.items}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Total</p>
                <p className="text-sm font-semibold text-slate-800">₹{order.total.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Payment</p>
                <p className="text-xs font-semibold text-slate-800">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Time</p>
                <p className="text-xs font-semibold text-slate-800">{order.date}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Order placed {order.date}
              </div>
              <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-xs font-medium">
                <Eye className="w-3 h-3" />
                <span>View</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100">
        <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300">
          View All Orders
        </button>
      </div>
    </div>
  );
}