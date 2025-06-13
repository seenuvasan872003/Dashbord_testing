import React from 'react';
import { Plus, Download, BarChart3, Package, Users, Settings, FileText, ShoppingCart } from 'lucide-react';

const quickActions = [
  {
    title: 'Add New Product',
    description: 'Add items to inventory',
    icon: Plus,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100',
  },
  {
    title: 'Export Report',
    description: 'Download CSV/Excel',
    icon: Download,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100',
  },
  {
    title: 'View Reports',
    description: 'Monthly analytics',
    icon: BarChart3,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100',
  },
  {
    title: 'Manage Orders',
    description: 'View customer orders',
    icon: ShoppingCart,
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    hoverColor: 'hover:bg-orange-100',
  },
  {
    title: 'Customer Support',
    description: 'Help center tickets',
    icon: Users,
    color: 'from-teal-500 to-cyan-600',
    bgColor: 'bg-teal-50',
    hoverColor: 'hover:bg-teal-100',
  },
  {
    title: 'Inventory Check',
    description: 'Stock level overview',
    icon: Package,
    color: 'from-indigo-500 to-purple-600',
    bgColor: 'bg-indigo-50',
    hoverColor: 'hover:bg-indigo-100',
  },
  {
    title: 'Payment Setup',
    description: 'Configure payment',
    icon: FileText,
    color: 'from-pink-500 to-rose-600',
    bgColor: 'bg-pink-50',
    hoverColor: 'hover:bg-pink-100',
  },
  {
    title: 'Settings',
    description: 'App configuration',
    icon: Settings,
    color: 'from-slate-500 to-gray-600',
    bgColor: 'bg-slate-50',
    hoverColor: 'hover:bg-slate-100',
  },
];

export function QuickActions() {
  const handleAction = (actionTitle: string) => {
    switch (actionTitle) {
      case 'Add New Product':
        alert('Opening Add Product form...');
        break;
      case 'Export Report':
        // Create sample CSV data
        const csvData = [
          ['Date', 'Revenue', 'Orders', 'Customers'],
          ['2024-01-01', '₹25,000', '45', '32'],
          ['2024-01-02', '₹32,000', '52', '41'],
          ['2024-01-03', '₹28,000', '38', '29'],
        ];
        const csvContent = csvData.map(row => row.join(',')).join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'business-report.csv';
        a.click();
        window.URL.revokeObjectURL(url);
        break;
      case 'View Reports':
        // Open detailed report in new window
        const reportWindow = window.open('', '_blank');
        if (reportWindow) {
          reportWindow.document.write(`
            <html>
              <head>
                <title>Business Analytics Report</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 20px; }
                  .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; }
                  .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
                  .metric-card { background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea; }
                  .metric-value { font-size: 24px; font-weight: bold; color: #333; }
                  .metric-label { color: #666; font-size: 14px; }
                </style>
              </head>
              <body>
                <div class="header">
                  <h1>📊 Business Analytics Report</h1>
                  <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>
                <div class="metrics">
                  <div class="metric-card">
                    <div class="metric-value">₹2,50,000</div>
                    <div class="metric-label">Total Revenue</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-value">430</div>
                    <div class="metric-label">Orders Completed</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-value">1,247</div>
                    <div class="metric-label">Total Customers</div>
                  </div>
                  <div class="metric-card">
                    <div class="metric-value">22%</div>
                    <div class="metric-label">Profit Margin</div>
                  </div>
                </div>
                <h3>📈 Performance Summary</h3>
                <ul>
                  <li>Revenue increased by 12.5% this month</li>
                  <li>Customer satisfaction rating: 4.6/5 stars</li>
                  <li>Return rate decreased to 4.5%</li>
                  <li>Top selling product: Premium Bluetooth Headphones</li>
                </ul>
              </body>
            </html>
          `);
        }
        break;
      case 'Manage Orders':
        alert('Opening Order Management system...');
        break;
      case 'Customer Support':
        alert('Opening Customer Support dashboard...');
        break;
      case 'Inventory Check':
        alert('Opening Inventory Management...');
        break;
      case 'Payment Setup':
        alert('Opening Payment Configuration...');
        break;
      case 'Settings':
        alert('Opening Application Settings...');
        break;
      default:
        alert(`${actionTitle} feature coming soon!`);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Settings className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Quick Actions</h2>
          <p className="text-sm text-slate-500">Shortcuts to common tasks</p>
        </div>
      </div>
      
      {/* Modern CSS Grid for Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={() => handleAction(action.title)}
            className={`${action.bgColor} ${action.hoverColor} p-4 rounded-xl border border-slate-200/50 transition-all duration-300 group hover:shadow-md hover:scale-105 text-left`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <action.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-slate-800 group-hover:text-slate-900 text-sm">
                  {action.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {action.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}