import React from 'react';
import { Users, UserPlus, UserCheck, MapPin } from 'lucide-react';

const customerStats = {
  total: 1247,
  newCustomers: 89,
  returningCustomers: 1158,
  activeCustomers: 892,
  locations: [
    { city: 'Mumbai', customers: 342, percentage: 27.4, growth: '+12%' },
    { city: 'Delhi', customers: 289, percentage: 23.2, growth: '+8%' },
    { city: 'Bangalore', customers: 201, percentage: 16.1, growth: '+15%' },
    { city: 'Chennai', customers: 156, percentage: 12.5, growth: '+5%' },
    { city: 'Pune', customers: 123, percentage: 9.9, growth: '+18%' },
    { city: 'Hyderabad', customers: 89, percentage: 7.1, growth: '+22%' },
    { city: 'Others', customers: 47, percentage: 3.8, growth: '+10%' },
  ],
};

export function  TopLocations() {
  return (
    <div className="space-y-6">
      {/* Top Locations */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Top Locations</h2>
            <p className="text-sm text-slate-500">Customer geographic distribution</p>
          </div>
        </div>
        
        <div className="space-y-3">
          {customerStats.locations.map((location, index) => (
            <div key={location.city} className="flex items-center justify-between group hover:bg-slate-50 p-3 rounded-lg transition-colors">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-slate-800 group-hover:text-orange-600 transition-colors">
                    {location.city}
                  </p>
                  <p className="text-sm text-slate-500">{location.customers} customers</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-slate-800">{location.percentage}%</span>
                  <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full font-medium">
                    {location.growth}
                  </span>
                </div>
                <div className="w-16 bg-slate-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-gradient-to-r from-orange-400 to-red-500 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${location.percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CustomerDistribution() {
  const newCustomerPercentage = (customerStats.newCustomers / customerStats.total) * 100;
  const returningCustomerPercentage = (customerStats.returningCustomers / customerStats.total) * 100;
  const activeCustomerPercentage = (customerStats.activeCustomers / customerStats.total) * 100;

  return (
    <div className="space-y-6">
      {/* Customer Distribution */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Customer Distribution</h2>
            <p className="text-sm text-slate-500">Customer segmentation analysis</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Types */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Customer Types</h3>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <UserPlus className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium text-slate-700">New Customers</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{newCustomerPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${newCustomerPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">{customerStats.newCustomers} customers</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <UserCheck className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-slate-700">Returning Customers</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{returningCustomerPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-blue-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${returningCustomerPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">{customerStats.returningCustomers} customers</p>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium text-slate-700">Active Customers</span>
                </div>
                <span className="text-sm font-semibold text-slate-800">{activeCustomerPercentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-purple-400 to-purple-500 h-3 rounded-full transition-all duration-1000"
                  style={{ width: `${activeCustomerPercentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">{customerStats.activeCustomers} customers</p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Overview</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Total</p>
                    <p className="text-xl font-bold text-slate-800">{customerStats.total.toLocaleString()}</p>
                  </div>
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">New This Month</p>
                    <p className="text-xl font-bold text-slate-800">{customerStats.newCustomers}</p>
                  </div>
                  <UserPlus className="w-6 h-6 text-green-500" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Active</p>
                    <p className="text-xl font-bold text-slate-800">{customerStats.activeCustomers}</p>
                  </div>
                  <UserCheck className="w-6 h-6 text-purple-500" />
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Retention</p>
                    <p className="text-xl font-bold text-slate-800">{returningCustomerPercentage.toFixed(1)}%</p>
                  </div>
                  <Users className="w-6 h-6 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}