import React, { useState } from 'react';
import { Header } from './Header';
import { OrderDashboard } from './OrderDashboard';
import { CookieConsent } from './CookieConsent';

export function Dashboard() {
  const [activeView, setActiveView] = useState<'dashboard' | 'analytics'>('dashboard');

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">
      <Header activeView={activeView} onViewChange={setActiveView} />
      
      <main className="container mx-auto px-4 py-6">
        <OrderDashboard />
      </main>
      
      <CookieConsent />
    </div>
  );
}