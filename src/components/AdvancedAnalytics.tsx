import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { TrendingUp, Calendar, Download, Filter } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const performanceData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Revenue Growth',
      data: [180000, 195000, 220000, 235000, 245000, 250000],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
    },
    {
      label: 'Customer Growth',
      data: [850, 920, 1050, 1150, 1200, 1247],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: true,
      yAxisID: 'y1',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index' as const,
    intersect: false,
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: 'Month',
      },
    },
    y: {
      type: 'linear' as const,
      display: true,
      position: 'left' as const,
      title: {
        display: true,
        text: 'Revenue (₹)',
      },
      ticks: {
        callback: function(value: any) {
          return '₹' + (value / 1000).toFixed(0) + 'k';
        },
      },
    },
    y1: {
      type: 'linear' as const,
      display: true,
      position: 'right' as const,
      title: {
        display: true,
        text: 'Customers',
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
  plugins: {
    legend: {
      position: 'top' as const,
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#ffffff',
      bodyColor: '#ffffff',
      borderColor: 'rgba(148, 163, 184, 0.2)',
      borderWidth: 1,
      cornerRadius: 8,
    },
  },
};

const insights = [
  {
    title: 'Revenue Trend',
    value: '+38.9%',
    description: 'Growth compared to last 6 months',
    trend: 'up',
    color: 'text-green-600'
  },
  {
    title: 'Customer Retention',
    value: '92.8%',
    description: 'Customers returning this month',
    trend: 'up',
    color: 'text-blue-600'
  },
  {
    title: 'Average Order Value',
    value: '₹2,010',
    description: 'Up from ₹1,850 last month',
    trend: 'up',
    color: 'text-purple-600'
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    description: 'Website visitors to customers',
    trend: 'up',
    color: 'text-orange-600'
  }
];

export function Insights() {

  return (
    <div className="space-y-6">
      {/* Key Insights */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Filter className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Key Business Insights</h2>
            <p className="text-sm text-slate-500">Performance indicators and trends</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <div key={index} className="bg-slate-50 rounded-xl p-4 hover:shadow-sm transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-700">{insight.title}</h3>
                <TrendingUp className={`w-4 h-4 ${insight.color}`} />
              </div>
              <p className={`text-2xl font-bold ${insight.color} mb-1`}>{insight.value}</p>
              <p className="text-sm text-slate-500">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState('6months');

  return (
    <div className="space-y-6">
      {/* Performance Trends */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Performance Trends</h2>
              <p className="text-sm text-slate-500">Revenue and customer growth analysis</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-100 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              <option value="3months">Last 3 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="1year">Last Year</option>
            </select>
          </div>
        </div>

        <div style={{ height: '400px' }}>
          <Line data={performanceData} options={options} />
        </div>
      </div>
    </div>
  );
}