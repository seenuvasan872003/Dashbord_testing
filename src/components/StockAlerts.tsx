import React from 'react';
import { AlertTriangle, Package, ShoppingCart, Clock } from 'lucide-react';

const lowStockItems = [
  {
    id: 1,
    name: 'Green Tea Bags',
    category: 'Food & Beverage',
    currentStock: 12,
    minStock: 50,
    urgency: 'high',
  },
  {
    id: 2,
    name: 'Phone Case Pro',
    category: 'Accessories',
    currentStock: 8,
    minStock: 25,
    urgency: 'critical',
  },
  {
    id: 3,
    name: 'Yoga Mat',
    category: 'Fitness',
    currentStock: 23,
    minStock: 30,
    urgency: 'medium',
  }
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
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-600 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Stock Alerts</h2>
            <p className="text-xs text-slate-500">Items requiring attention</p>
          </div>
        </div>
        <div className="text-sm text-slate-600">
          <span className="font-medium text-red-600">{lowStockItems.length}</span> items
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {lowStockItems.map((item) => (
          <div
            key={item.id}
            className="border border-slate-200 rounded-lg p-3 hover:shadow-sm transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-slate-200 transition-colors">
                  <Package className="w-4 h-4 text-slate-600" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-800 group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </div>
              </div>
              {getUrgencyBadge(item.urgency)}
            </div>
            
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div>
                <p className="text-xs text-slate-500">Current</p>
                <p className="text-sm font-semibold text-slate-800">{item.currentStock}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Min Required</p>
                <p className="text-sm font-semibold text-slate-800">{item.minStock}</p>
              </div>
            </div>
            
            <button className="w-full flex items-center justify-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
              <ShoppingCart className="w-3 h-3" />
              <span>Reorder</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}