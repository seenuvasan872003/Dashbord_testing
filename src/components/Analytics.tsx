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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      
       {/* Dashboard Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Business Analytics</h1>
                <p className="text-lg text-slate-600">Deep insights and comprehensive performance analysis</p>
              </div>

      <div className="px-4 space-y-8">
        {/* 1. Key Business Insights */}
        <section className="transform hover:scale-[1.01] transition-transform duration-300">
          <AdvancedAnalytics />
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
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                      Performance Trends
                    </h2>
                    <p className="text-slate-500">Growth analytics & insights</p>
                  </div>
                </div>
                <SalesChart />
              </div>
            </div>
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      Sales & Revenue
                    </h2>
                    <p className="text-slate-500">Financial performance</p>
                  </div>
                </div>
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
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Revenue by Category
                    </h2>
                    <p className="text-slate-500">Sales distribution</p>
                  </div>
                </div>
                <PieChart />
              </div>
            </div>
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                      Customer Insights
                    </h2>
                    <p className="text-slate-500">Behavior analysis</p>
                  </div>
                </div>
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
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                      Customer Distribution
                    </h2>
                    <p className="text-slate-500">Segmentation analysis</p>
                  </div>
                </div>
                <CustomerDistribution />
              </div>
            </div>
          </div>
          <div className="transform hover:scale-[1.02] transition-transform duration-300">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      Top Locations
                    </h2>
                    <p className="text-slate-500">Geographic insights</p>
                  </div>
                </div>
                <CustomerDistribution />
              </div>
            </div>
          </div>
        </section>

        {/* 6. Best Selling Products (Full Width) */}
        <section className="transform hover:scale-[1.01] transition-transform duration-300 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-1 shadow-xl border border-white/20">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                    Best Selling Products
                  </h2>
                  <p className="text-slate-500">Top performing items</p>
                </div>
              </div>
              <BestProducts />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}