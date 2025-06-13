import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PieChart as PieChartIcon, TrendingUp } from 'lucide-react';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const categoryData = [
  { category: 'Electronics', revenue: 89250, percentage: 35.7, color: '#3B82F6' },
  { category: 'Clothing', revenue: 67800, percentage: 27.1, color: '#10B981' },
  { category: 'Food & Beverage', revenue: 45600, percentage: 18.2, color: '#F59E0B' },
  { category: 'Fitness', revenue: 28400, percentage: 11.4, color: '#EF4444' },
  { category: 'Accessories', revenue: 18950, percentage: 7.6, color: '#8B5CF6' },
];

export function PieChart() {
  const data = {
    labels: categoryData.map(item => item.category),
    datasets: [
      {
        data: categoryData.map(item => item.revenue),
        backgroundColor: categoryData.map(item => item.color),
        borderColor: categoryData.map(item => item.color),
        borderWidth: 2,
        hoverBorderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll create a custom legend
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context: any) {
            const value = context.parsed;
            const percentage = ((value / categoryData.reduce((sum, item) => sum + item.revenue, 0)) * 100).toFixed(1);
            return `₹${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
    interaction: {
      intersect: false,
    },
  };

  const totalRevenue = categoryData.reduce((sum, item) => sum + item.revenue, 0);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <PieChartIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Revenue by Category</h2>
            <p className="text-sm text-slate-500">Sales distribution analysis</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Total Revenue</p>
          <p className="text-2xl font-bold text-slate-800">₹{totalRevenue.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="relative" style={{ height: '300px' }}>
          <Pie data={data} options={options} />
        </div>

        {/* Custom Legend */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Category Breakdown</h3>
          {categoryData.map((item, index) => (
            <div key={item.category} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div>
                  <p className="font-medium text-slate-800 group-hover:text-purple-600 transition-colors">
                    {item.category}
                  </p>
                  <p className="text-sm text-slate-500">
                    ₹{item.revenue.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-slate-800">{item.percentage}%</p>
                <div className="w-16 bg-slate-200 rounded-full h-2 mt-1">
                  <div
                    className="h-2 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.color 
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Electronics leading with 35.7% share</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}