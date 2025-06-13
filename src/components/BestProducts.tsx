import React, { useState } from 'react';
import { Package, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Premium Bluetooth Headphones',
    category: 'Electronics',
    unitsSold: 124,
    revenue: 89250,
    profit: 22500,
    profitMargin: 25.2,
    stock: 45,
    stockStatus: 'medium',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 2,
    name: 'Organic Green Tea Bags',
    category: 'Food & Beverage',
    unitsSold: 89, 
    revenue: 34500,
    profit: 15800,
    profitMargin: 45.8,
    stock: 12,
    stockStatus: 'low',
    image: 'https://images.pexels.com/photos/1638280/pexels-photo-1638280.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 3,
    name: 'Cotton Casual T-Shirt',
    category: 'Clothing',
    unitsSold: 156,
    revenue: 42800,
    profit: 18500,
    profitMargin: 43.2,
    stock: 78,
    stockStatus: 'high',
  },
  {
    id: 4,
    name: 'Smartphone Case Pro',
    category: 'Accessories',
    unitsSold: 203,
    revenue: 28400,
    profit: 12100,
    profitMargin: 42.6,
    stock: 8,
    stockStatus: 'low',
    image: 'https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
  {
    id: 5,
    name: 'Yoga Mat Premium',
    category: 'Fitness',
    unitsSold: 67,
    revenue: 45200,
    profit: 19800,
    profitMargin: 43.8,
    stock: 23,
    stockStatus: 'medium',
    image: 'https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg?auto=compress&cs=tinysrgb&w=100',
  },
];

export function BestProducts() {
  const [sortBy, setSortBy] = useState<'revenue' | 'units' | 'profit'>('revenue');
  
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'units':
        return b.unitsSold - a.unitsSold;
      case 'profit':
        return b.profit - a.profit;
      default:
        return b.revenue - a.revenue;
    }
  });
  
  const getStockBadge = (status: string, stock: number) => {
    switch (status) {
      case 'low':
        return (
          <div className="flex items-center space-x-1 text-red-600 bg-red-50 px-2 py-1 rounded-full">
            <AlertCircle className="w-3 h-3" />
            <span className="text-xs font-medium">Low ({stock})</span>
          </div>
        );
      case 'medium':
        return (
          <div className="flex items-center space-x-1 text-yellow-600 bg-yellow-50 px-2 py-1 rounded-full">
            <Package className="w-3 h-3" />
            <span className="text-xs font-medium">Medium ({stock})</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1 text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
            <span className="text-xs font-medium">High ({stock})</span>
          </div>
        );
    }
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Best Selling Products</h2>
            <p className="text-sm text-slate-500">Top performing items this month</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-slate-600">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          >
            <option value="revenue">Revenue</option>
            <option value="units">Units Sold</option>
            <option value="profit">Profit</option>
          </select>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">Product</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Units Sold</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Revenue</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Profit</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Margin</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">Stock</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product, index) => (
              <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
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
                      <div className="absolute -top-1 -left-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800 group-hover:text-purple-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-slate-500">{product.category}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-semibold text-slate-800">{product.unitsSold}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-semibold text-slate-800">₹{product.revenue.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-semibold text-green-600">₹{product.profit.toLocaleString()}</span>
                </td>
                <td className="py-4 px-4 text-center">
                  <span className="font-semibold text-blue-600">{product.profitMargin}%</span>
                </td>
                <td className="py-4 px-4 text-center">
                  {getStockBadge(product.stockStatus, product.stock)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}