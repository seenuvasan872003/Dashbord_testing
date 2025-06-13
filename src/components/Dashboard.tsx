import React, { useState } from 'react';
import { KPICards } from './KPICards';
import { RecentOrders } from './RecentOrders';
import { BusinessMetrics } from './BusinessMetrics';
import { StockAlerts } from './StockAlerts';
import { Announcements } from './Announcements';
import { QuickActions } from './QuickActions';
import { Header } from './Header';
import { Analytics } from './Analytics';

export function Dashboard() {
  const [activeView, setActiveView] = useState<'dashboard' | 'analytics'>('dashboard');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header activeView={activeView} onViewChange={setActiveView} />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {activeView === 'dashboard' ? (
          <>
            {/* Dashboard Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800 mb-2">Business Dashboard</h1>
              <p className="text-lg text-slate-600">Real-time overview of your business operations</p>
            </div>

            {/* Dashboard Layout */}
            <div className="grid grid-cols-1 gap-6 lg:gap-8">
              
              {/* KPI Cards - Full width responsive grid */}
              <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
                <KPICards />
              </section>
              
              {/* Recent Orders & Business Metrics */}
              <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                <div className="xl:col-span-2">
                  <RecentOrders />
                </div>
                <div className="xl:col-span-1">
                  <BusinessMetrics />
                </div>
              </section>
              
              {/* Stock Alerts & Announcements */}
              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                <div className="w-full">
                  <StockAlerts />
                </div>
                <div className="w-full">
                  <Announcements />
                </div>
              </section>
              
              {/* Quick Actions */}
              <section className="w-full">
                <QuickActions />
              </section>
              
            </div>
          </>
        ) : (
          <Analytics />
        )}
      </main>
    </div>
  );
}