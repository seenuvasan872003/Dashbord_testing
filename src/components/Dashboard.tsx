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
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 h-screen overflow-hidden">
      <Header activeView={activeView} onViewChange={setActiveView} />
      
      <main className="h-[calc(100vh-80px)] overflow-hidden">
        <div className="container mx-auto px-4 py-4 h-full">
          {activeView === 'dashboard' ? (
            <div className="h-full flex flex-col space-y-4">
              {/* Dashboard Header - Compact */}
              <div className="text-center">
                <h1 className="text-2xl font-bold text-slate-800">Business Dashboard</h1>
                <p className="text-sm text-slate-600">Real-time business overview</p>
              </div>

              {/* Main Dashboard Grid - Fixed Height */}
              <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
                
                {/* Left Column - KPIs and Quick Actions */}
                <div className="col-span-3 flex flex-col space-y-4">
                  {/* KPI Cards - Vertical Stack */}
                  <div className="flex-1 space-y-3">
                    <KPICards />
                  </div>
                  
                  {/* Quick Actions - Compact */}
                  <div className="h-48">
                    <QuickActions />
                  </div>
                </div>
                
                {/* Center Column - Recent Orders */}
                <div className="col-span-5">
                  <div className="h-full">
                    <RecentOrders />
                  </div>
                </div>
                
                {/* Right Column - Metrics, Alerts, Announcements */}
                <div className="col-span-4 flex flex-col space-y-4">
                  {/* Business Metrics */}
                  <div className="flex-1">
                    <BusinessMetrics />
                  </div>
                  
                  {/* Stock Alerts and Announcements - Side by Side */}
                  <div className="grid grid-cols-2 gap-4 h-80">
                    <div className="h-full">
                      <StockAlerts />
                    </div>
                    <div className="h-full">
                      <Announcements />
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          ) : (
            <div className="h-full overflow-auto">
              <Analytics />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}