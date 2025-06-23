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
  Plus,
  Search,
  Calendar,
  DollarSign,
  BarChart3,
  PieChart as PieChartIcon,
  Timer
} from 'lucide-react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

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

const recentOrders: Order[] = [
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
    status: 'processing',
    date: 'Today',
    time: '4 hours ago',
    paymentMethod: 'Card'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Anita Patel',
    items: 2,
    total: 3200,
    status: 'shipped',
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
    date: 'Yesterday',
    time: '1 day ago',
    paymentMethod: 'UPI'
  },
  {
    id: 'ORD-2024-005',
    customer: 'Meera Joshi',
    items: 1,
    total: 950,
    status: 'cancelled',
    date: 'Yesterday',
    time: '2 days ago',
    paymentMethod: 'Card'
  }
];

const mostOrderedItems = [
  { name: 'Premium Headphones', orders: 45, revenue: 128250 },
  { name: 'Smartphone Case', orders: 38, revenue: 13300 },
  { name: 'Wireless Charger', orders: 32, revenue: 48000 },
  { name: 'Bluetooth Speaker', orders: 28, revenue: 84000 },
  { name: 'Phone Stand', orders: 24, revenue: 12000 }
];

// Chart Data
const salesChartData = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Orders',
      data: [12, 19, 15, 25, 22, 18, 16],
      backgroundColor: 'rgba(59, 130, 246, 0.8)',
      borderColor: 'rgba(59, 130, 246, 1)',
      borderWidth: 2,
      borderRadius: 4,
    },
  ],
};

const orderTrendsData = {
  labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
  datasets: [
    {
      label: 'Order Volume',
      data: [85, 92, 78, 105],
      borderColor: 'rgba(16, 185, 129, 1)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

const orderStatusData = {
  labels: ['Delivered', 'In Progress', 'Cancelled'],
  datasets: [
    {
      data: [70, 20, 10],
      backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
      borderWidth: 2,
      borderColor: '#ffffff',
    },
  ],
};

export function OrderDashboard() {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [chartPeriod, setChartPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  
  const filteredOrders = recentOrders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const orderStats = {
    total: 128,
    pending: 15,
    processing: 23,
    shipped: 18,
    delivered: 67,
    cancelled: 5,
    totalRevenue: 425600,
    avgProcessingTime: 2.4
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock, emoji: '🟡' },
      processing: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Package, emoji: '🟡' },
      shipped: { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Package, emoji: '🟡' },
      delivered: { color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle, emoji: '🟢' },
      cancelled: { color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle, emoji: '🔴' }
    };

    const config = statusConfig[status as keyof typeof statusConfig];
    const Icon = config.icon;

    return (
      <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
        <span>{config.emoji}</span>
        <span className="capitalize">{status}</span>
      </div>
    );
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">📦 Order Management Dashboard</h1>
        <p className="text-slate-600">Complete overview of your business orders</p>
      </div>

      {/* 1. Total Orders & Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">📦 Total Orders</p>
              <p className="text-3xl font-bold text-slate-800">{orderStats.total}</p>
              <p className="text-xs text-slate-500">Last 30 Days</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">💵 Total Revenue</p>
              <p className="text-3xl font-bold text-slate-800">₹{orderStats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-slate-500">From Orders This Month</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">🟢 Delivered Orders</p>
              <p className="text-3xl font-bold text-slate-800">{orderStats.delivered}</p>
              <p className="text-xs text-slate-500">{((orderStats.delivered / orderStats.total) * 100).toFixed(1)}% Success Rate</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">⏱ Avg. Processing Time</p>
              <p className="text-3xl font-bold text-slate-800">{orderStats.avgProcessingTime}h</p>
              <p className="text-xs text-slate-500">Per Order</p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
              <Timer className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Recent Orders & Order Search */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">🕒 Recent Orders</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-3">
            {filteredOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                    {order.customer.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">{order.customer}</h3>
                    <p className="text-sm text-slate-500">{order.id}</p>
                  </div>
                </div>
                <div className="text-right">
                  {getStatusBadge(order.status)}
                  <p className="text-sm text-slate-600 mt-1">₹{order.total.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Search & Filter */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <h2 className="text-xl font-bold text-slate-800 mb-4">🔍 Order Search & Filter</h2>
          
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by Order ID or Customer"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="pending">🟡 Pending</option>
              <option value="processing">🟡 Processing</option>
              <option value="shipped">🟡 Shipped</option>
              <option value="delivered">🟢 Delivered</option>
              <option value="cancelled">🔴 Cancelled</option>
            </select>
            
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <input
                type="date"
                className="flex-1 px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. Daily/Weekly/Monthly Sales & Order Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-800">📆 Sales Overview</h2>
            <div className="flex bg-slate-100 rounded-lg p-1">
              {(['daily', 'weekly', 'monthly'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className={`px-3 py-1 text-sm font-medium rounded-md transition-all capitalize ${
                    chartPeriod === period
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-800'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div style={{ height: '300px' }}>
            <Bar data={salesChartData} options={chartOptions} />
          </div>
        </div>

        {/* Order Trends */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <h2 className="text-xl font-bold text-slate-800 mb-4">📈 Order Trends</h2>
          <div style={{ height: '300px' }}>
            <Line data={orderTrendsData} options={chartOptions} />
          </div>
        </div>
      </div>

      {/* 4. Order Status Summary & Most Ordered Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Order Status Summary */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <h2 className="text-xl font-bold text-slate-800 mb-4">🚚 Order Status Summary</h2>
          <div className="grid grid-cols-2 gap-4">
            <div style={{ height: '250px' }}>
              <Pie data={orderStatusData} options={pieOptions} />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">🟢 Delivered</span>
                </div>
                <span className="font-bold text-green-600">70%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm font-medium">🟡 In Progress</span>
                </div>
                <span className="font-bold text-yellow-600">20%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">🔴 Cancelled</span>
                </div>
                <span className="font-bold text-red-600">10%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Most Ordered Items */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200/50">
          <h2 className="text-xl font-bold text-slate-800 mb-4">🛒 Most Ordered Items</h2>
          <div className="space-y-3">
            {mostOrderedItems.map((item, index) => (
              <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">{item.name}</h3>
                    <p className="text-sm text-slate-500">{item.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-slate-800">₹{item.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Complete Order Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200/50">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">📋 All Orders</h2>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <Plus className="w-4 h-4" />
                <span>New Order</span>
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-4 px-6 text-sm font-semibold text-slate-600">Order Details</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Items</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Amount</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Status</th>
                <th className="text-center py-4 px-6 text-sm font-semibold text-slate-600">Date</th>
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