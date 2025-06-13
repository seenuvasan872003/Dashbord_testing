import React from 'react';
import { AlertTriangle, Package, ShoppingCart, Clock } from 'lucide-react';

const lowStockItems = [
  {
    id: 1,
    name: 'Organic Green Tea Bags',
    category: 'Food & Beverage',
    currentStock: 12,
    minStock: 50,
    reorderLevel: 100,
    lastOrdered: '2 days ago',
    supplier: 'Green Valley Suppliers',
    urgency: 'high',
  },
  {
    id: 2,
    name: 'Smartphone Case Pro',
    category: 'Accessories',
    currentStock: 8,
    minStock: 25,
    reorderLevel: 75,
    lastOrdered: '1 week ago',
    supplier: 'TechCare Solutions',
    urgency: 'critical',
  },
  {
    id: 3,
    name: 'Yoga Mat Premium',
    category: 'Fitness',
    currentStock: 23,
    minStock: 30,
    reorderLevel: 60,
    lastOrdered: '3 days ago',
    supplier: 'FitLife Products',
    urgency: 'medium',
  },
  {
    id: 4,
    name: 'Wireless Mouse Pro',
    category: 'Electronics',
    currentStock: 15,
    minStock: 40,
    reorderLevel: 80,
    lastOrdered: '5 days ago',
    supplier: 'ElectroWorld',
    urgency: 'high',
  },
];

export function StockAlerts() {
  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case 'critical':
        return (
          <div className="flex items-center space-x-1 text-red-700 bg-red-100 px-2 py-1 rounded-full">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-xs font-medium">Critical</span>
          </div>
        );
      case 'high':
        return (
          <div className="flex items-center space-x-1 text-orange-700 bg-orange-100 px-2 py-1 rounded-full">
            <AlertTriangle className="w-3 h-3" />
            <span className="text-xs font-medium">High</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center space-x-1 text-yellow-700 bg-yellow-100 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-medium">Medium</span>
          </div>
        );
    }
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-600 rounded-xl flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Stock Alerts</h2>
            <p className="text-sm text-slate-500">Items requiring attention</p>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          <span className="font-medium text-red-600">{lowStockItems.length}</span> items low
        </div>
      </div>
      
      <div className="space-y-4">
        {lowStockItems.map((item) => (
          <div
            key={item.id}
            className="border border-slate-200 rounded-xl p-4 hover:shadow-sm transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <Package className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-800 group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-500">{item.category}</p>
                </div>
              </div>
              {getUrgencyBadge(item.urgency)}
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-xs text-slate-500">Current Stock</p>
                <p className="font-semibold text-slate-800">{item.currentStock} units</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Min Required</p>
                <p className="font-semibold text-slate-800">{item.minStock} units</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Reorder Level</p>
                <p className="font-semibold text-slate-800">{item.reorderLevel} units</p>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-xs text-slate-500">
                Last ordered: {item.lastOrdered} • {item.supplier}
              </div>
              <button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">
                <ShoppingCart className="w-3 h-3" />
                <span>Reorder Now</span>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100">
        <button className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02]">
          View All Stock Alerts
        </button>
      </div>
    </div>
  );
}