import React from 'react';
import { KPICards } from './KPICards'
import { AdvancedAnalytics } from './AdvancedAnalytics';
import { TodaySellingProducts } from './TodaySellingProducts';
import { SalesChart } from './SalesChart';
import { PieChart } from './PieChart';
import { CustomerInsights } from './CustomerInsights';
import { BestProducts } from './BestProducts';
import { CustomerDistribution } from './CustomerDistribution';

export function Analytics() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
       {/* Dashboard Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Business Analytics</h1>
                <p className="text-lg text-slate-600">Deep insights and comprehensive performance analysis</p>
              </div>

      <div className="px-4 space-y-8">
        {/* 1. Key Business Insights */}
        <section className="transform hover:scale-[1.01] transition-transform duration-300">
          <KPICards/>
        </section>

        {/* 2. Today Selling Products */}
        <section className="transform hover:scale-[1.01] transition-transform duration-300">
          <TodaySellingProducts />
        </section>

        {/* 3. Performance Trends & Sales Revenue (Two Columns) */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <AdvancedAnalytics />
              </div>
            </div>
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <SalesChart />
              </div>
            </div>
          </div>
        </section>

        {/* 4. Revenue by Category & Customer Insights (Two Columns) */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <PieChart />
              </div>
            </div>
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <CustomerInsights />
              </div>
            </div>
          </div>
        </section>

        {/* 5. Customer Distribution & Top Locations (Two Columns) */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <CustomerDistribution />
              </div>
            </div>
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <CustomerDistribution />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Best Selling Products (Full Width) */}
        <section className="transform hover:scale-[1.01] transition-transform duration-300 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <BestProducts />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}