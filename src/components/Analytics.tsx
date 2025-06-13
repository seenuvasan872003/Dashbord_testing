import React from 'react';
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { TodaySellingProducts } from './TodaySellingProducts';
import { SalesChart } from './SalesChart';
import { PieChart } from './PieChart';
import { CustomerInsights } from './CustomerInsights';
import { BestProducts } from './BestProducts';
import { CustomerDistribution } from './CustomerDistribution';

export function Analytics() {
  return (
    <div className="space-y-8">
      {/* Analytics Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Business Analytics</h1>
        <p className="text-lg text-slate-600">Deep insights and comprehensive performance analysis</p>
      </div>

      {/* 1. Key Business Insights */}
      <div className="w-full">
        <AdvancedAnalytics />
      </div>

      {/* 2. Today Selling Products */}
      <div className="w-full">
        <TodaySellingProducts />
      </div>

      {/* 3. Performance Trends & Sales Revenue (Two Columns) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="w-full">
          <SalesChart />
        </div>
        <div className="w-full">
          <SalesChart />
        </div>
      </div>

      {/* 4. Revenue by Category & Customer Insights (Two Columns) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="w-full">
          <PieChart />
        </div>
        <div className="w-full">
          <CustomerInsights />
        </div>
      </div>

      {/* 5. Customer Distribution & Top Locations (Two Columns) */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="w-full">
          <CustomerDistribution />
        </div>
        <div className="w-full">
          <CustomerDistribution />
        </div>
      </div>

      {/* 6. Best Selling Products */}
      <div className="w-full">
        <BestProducts />
      </div>
    </div>
  );
}