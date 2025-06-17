import React from 'react';
import { Plus, Download, BarChart3, Package, Users, Settings, FileText, ShoppingCart } from 'lucide-react';

const quickActions = [
  {
    title: 'Add Product',
    icon: Plus,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Export Report',
    icon: Download,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'View Reports',
    icon: BarChart3,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Manage Orders',
    icon: ShoppingCart,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Customer Support',
    icon: Users,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-50',
  },
  {
    title: 'Inventory',
    icon: Package,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-50',
  },
  {
    title: 'Payment Setup',
    icon: FileText,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
  },
  {
    title: 'Settings',
    icon: Settings,
    color: 'from-slate-500 to-gray-600',
    bgColor: 'bg-slate-50',
  },
];

export function QuickActions() {
  const handleAction = (actionTitle: string) => {
    alert(`${actionTitle} feature coming soon!`);
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Settings className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Quick Actions</h2>
          <p className="text-xs text-slate-500">Common tasks</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2 flex-1">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleAction(action.title)}
            className={`${action.bgColor} hover:shadow-sm p-3 rounded-lg border border-slate-200/50 transition-all duration-300 group hover:scale-105 text-left`}
          >
            <div className="flex flex-col items-center space-y-2">
              <div className={`w-8 h-8 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-semibold text-slate-800 text-center">
                {action.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}