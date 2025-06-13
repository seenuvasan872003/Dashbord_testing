import React from 'react';
import { SalesChart } from './SalesChart';
import { PieChart } from './PieChart';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { BestProducts } from './BestProducts';
import { CustomerInsights } from './CustomerInsights';

export function Analytics() {
  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Business Analytics</h1>
        <p className="text-lg text-slate-600">Deep insights and comprehensive performance analysis</p>
      </div>

      {/* Advanced Analytics */}
      <div className="w-full">
        <AdvancedAnalytics />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8">
        {/* Sales Chart */}
        <div className="w-full">
          <SalesChart />
        </div>
        
        {/* Pie Chart */}
        <div className="w-full">
          <PieChart />
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <BestProducts />
        </div>
        <div className="xl:col-span-1">
          <CustomerInsights />
        </div>
      </div>
    </div>
  );
}