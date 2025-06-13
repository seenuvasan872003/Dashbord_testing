import React from 'react';
import { Users, MapPin, ShoppingBag, UserPlus } from 'lucide-react';

const customerData = {
  total: 1247,
  newCustomers: 89,
  returningCustomers: 1158,
  averageOrderValue: 1850,
};

export function CustomerInsights() {
  const newCustomerPercentage = (customerData.newCustomers / customerData.total) * 100;
  const returningCustomerPercentage = (customerData.returningCustomers / customerData.total) * 100;
  
  return (
    <div className="space-y-6">
      {/* Customer Overview */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Customer Insights</h2>
            <p className="text-base text-slate-500">Customer behavior analysis</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
            <div>
              <p className="text-sm text-slate-600">Total Customers</p>
              <p className="text-2xl font-bold text-slate-800">{customerData.total.toLocaleString()}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
            <div>
              <p className="text-sm text-slate-600">Average Order Value</p>
              <p className="text-2xl font-bold text-slate-800">₹{customerData.averageOrderValue.toLocaleString()}</p>
            </div>
            <ShoppingBag className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>
      
      {/* Customer Type Distribution */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Customer Distribution</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-4 h-4 text-green-500" />
                <span className="text-base font-medium text-slate-700">New Customers</span>
              </div>
              <span className="text-base font-semibold text-slate-800">{newCustomerPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${newCustomerPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-500 mt-1">{customerData.newCustomers} customers</p>
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-blue-500" />
                <span className="text-base font-medium text-slate-700">Returning Customers</span>
              </div>
              <span className="text-base font-semibold text-slate-800">{returningCustomerPercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
                style={{ width: `${returningCustomerPercentage}%` }}
              ></div>
            </div>
            <p className="text-sm text-slate-500 mt-1">{customerData.returningCustomers} customers</p>
          </div>
        </div>
      </div>
    </div>
  );
}