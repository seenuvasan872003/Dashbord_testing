import React, { useState } from 'react';
import { Package, TrendingUp, Calendar, Download, FileText, Eye } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  category: string;
  quantity: number;
  price: number;
  total: number;
  time: string;
  image?: string;
}

const todayProducts: Product[] = [
  {
    id: 1,
    name: 'Premium Bluetooth Headphones',
    category: 'Electronics',
    quantity: 3,
    price: 2850,
    total: 8550,
    time: '2 hours ago',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 2,
    name: 'Organic Green Tea Bags',
    category: 'Food & Beverage',
    quantity: 5,
    price: 450,
    total: 2250,
    time: '3 hours ago',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 3,
    name: 'Cotton Casual T-Shirt',
    category: 'Clothing',
    quantity: 8,
    price: 650,
    total: 5200,
    time: '4 hours ago',
  },
  {
    id: 4,
    name: 'Smartphone Case Pro',
    category: 'Accessories',
    quantity: 12,
    price: 350,
    total: 4200,
    time: '5 hours ago',
    image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 5,
    name: 'Yoga Mat Premium',
    category: 'Fitness',
    quantity: 2,
    price: 1200,
    total: 2400,
    time: '6 hours ago',
    image: 'https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

const monthlyData = {
  'January': [
    { id: 1, name: 'Winter Jacket', category: 'Clothing', quantity: 45, price: 2500, total: 112500, time: 'Jan 2024' },
    { id: 2, name: 'Hot Coffee Beans', category: 'Food & Beverage', quantity: 89, price: 800, total: 71200, time: 'Jan 2024' },
  ],
  'February': [
    { id: 1, name: 'Valentine Gift Set', category: 'Gifts', quantity: 67, price: 1500, total: 100500, time: 'Feb 2024' },
    { id: 2, name: 'Romantic Candles', category: 'Home Decor', quantity: 34, price: 450, total: 15300, time: 'Feb 2024' },
  ],
  'March': [
    { id: 1, name: 'Spring Collection Dress', category: 'Clothing', quantity: 78, price: 1800, total: 140400, time: 'Mar 2024' },
    { id: 2, name: 'Garden Tools Set', category: 'Tools', quantity: 23, price: 2200, total: 50600, time: 'Mar 2024' },
  ],
  'April': [
    { id: 1, name: 'Summer Hat', category: 'Accessories', quantity: 56, price: 750, total: 42000, time: 'Apr 2024' },
    { id: 2, name: 'Sunscreen Lotion', category: 'Beauty', quantity: 89, price: 650, total: 57850, time: 'Apr 2024' },
  ],
  'May': [
    { id: 1, name: 'Mother\'s Day Flowers', category: 'Gifts', quantity: 123, price: 500, total: 61500, time: 'May 2024' },
    { id: 2, name: 'Perfume Set', category: 'Beauty', quantity: 45, price: 3200, total: 144000, time: 'May 2024' },
  ],
  'June': todayProducts,
};

export function TodaySellingProducts() {
  const [activeTab, setActiveTab] = useState<'today' | 'monthly'>('today');
  const [selectedMonth, setSelectedMonth] = useState('June');
  
  const currentData = activeTab === 'today' ? todayProducts : monthlyData[selectedMonth as keyof typeof monthlyData];
  const totalRevenue = currentData.reduce((sum, product) => sum + product.total, 0);
  const totalQuantity = currentData.reduce((sum, product) => sum + product.quantity, 0);

  const handleExport = () => {
    const csvData = [
      ['Product Name', 'Category', 'Quantity', 'Price', 'Total', 'Time'],
      ...currentData.map(product => [
        product.name,
        product.category,
        product.quantity,
        product.price,
        product.total,
        product.time
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `selling-products-${activeTab}-${activeTab === 'monthly' ? selectedMonth : 'today'}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleViewReport = () => {
    const reportWindow = window.open('', '_blank');
    if (reportWindow) {
      reportWindow.document.write(`
        <html>
          <head>
            <title>Selling Products Report - ${activeTab === 'today' ? 'Today' : selectedMonth}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; margin-bottom: 20px; }
              table { border-collapse: collapse; width: 100%; margin-top: 20px; }
              th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
              th { background-color: #f2f2f2; }
              .summary { background-color: #f9f9f9; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>📦 Selling Products Report</h1>
              <p>Period: ${activeTab === 'today' ? 'Today' : selectedMonth + ' 2024'}</p>
              <p>Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <div class="summary">
              <h3>Summary</h3>
              <p><strong>Total Products Sold:</strong> ${totalQuantity} units</p>
              <p><strong>Total Revenue:</strong> ₹${totalRevenue.toLocaleString()}</p>
              <p><strong>Average Order Value:</strong> ₹${Math.round(totalRevenue / currentData.length).toLocaleString()}</p>
            </div>
            <table>
              <thead>
                <tr><th>Product Name</th><th>Category</th><th>Quantity</th><th>Price</th><th>Total</th><th>Time</th></tr>
              </thead>
              <tbody>
                ${currentData.map(product => `
                  <tr>
                    <td>${product.name}</td>
                    <td>${product.category}</td>
                    <td>${product.quantity}</td>
                    <td>₹${product.price.toLocaleString()}</td>
                    <td>₹${product.total.toLocaleString()}</td>
                    <td>${product.time}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Package className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Selling Products</h2>
            <p className="text-sm text-slate-500">Product sales tracking</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
          
          <button
            onClick={handleViewReport}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>View Report</span>
          </button>
          
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('today')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'today'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setActiveTab('monthly')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'monthly'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>

      {/* Month Selector for Monthly View */}
      {activeTab === 'monthly' && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-3">
            <Calendar className="w-4 h-4 text-slate-500" />
            <span className="text-sm text-slate-600">Select Month:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.keys(monthlyData).map((month) => (
              <button
                key={month}
                onClick={() => setSelectedMonth(month)}
                className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-all ${
                  selectedMonth === month
                    ? 'bg-green-500 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Products</p>
              <p className="text-2xl font-bold text-slate-800">{currentData.length}</p>
            </div>
            <Package className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Quantity</p>
              <p className="text-2xl font-bold text-slate-800">{totalQuantity}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-800">₹{totalRevenue.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Product</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Quantity</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Price</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Total</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Time</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((product, index) => (
              <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gradient-to-r from-slate-200 to-slate-300 rounded-lg flex items-center justify-center">
                        <Package className="w-5 h-5 text-slate-500" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium text-slate-800 group-hover:text-green-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-500">{product.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-semibold text-slate-800">{product.quantity}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-semibold text-slate-800">₹{product.price.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-semibold text-green-600">₹{product.total.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="text-sm text-slate-500">{product.time}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}