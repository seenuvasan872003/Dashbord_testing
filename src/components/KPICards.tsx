import React from 'react';
import { TrendingUp, TrendingDown, ShoppingCart, RotateCcw, Star, DollarSign } from 'lucide-react';

const kpiData = [
  {
    title: 'Total Revenue',
    value: '₹2,50,000',
    subtitle: 'This Month',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
  },
  {
    title: 'Net Profit Margin',
    value: '22%',
    subtitle: 'Monthly Average',
    change: '+3.2%',
    trend: 'up',
    icon: TrendingUp,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
  },
  {
    title: 'Orders Completed',
    value: '430',
    subtitle: 'This Month',
    change: '+8.1%',
    trend: 'up',
    icon: ShoppingCart,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
  },
  {
    title: 'Return Rate',
    value: '4.5%',
    subtitle: 'Monthly Average',
    change: '-0.8%',
    trend: 'down',
    icon: RotateCcw,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
  },
  {
    title: 'Customer Satisfaction',
    value: '4.6',
    subtitle: '★ out of 5',
    change: '+0.2',
    trend: 'up',
    icon: Star,
    color: 'from-yellow-500 to-amber-600',
    bgColor: 'bg-yellow-50',
  },
];

export function KPICards() {
  return (
    <>
      {kpiData.map((kpi, index) => (
        <div
          key={index}
          className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200/50 hover:shadow-md transition-all duration-300 group"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${kpi.bgColor} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
              <div className={`w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r ${kpi.color} rounded-md flex items-center justify-center`}>
                <kpi.icon className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className={`flex items-center space-x-1 text-xs font-medium ${
              kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {kpi.trend === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span>{kpi.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-1">{kpi.value}</h3>
            <p className="text-sm text-slate-500">{kpi.title}</p>
            <p className="text-xs text-slate-400 mt-1">{kpi.subtitle}</p>
          </div>
        </div>
      ))}
    </>
  );
}