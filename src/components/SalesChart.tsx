import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { BarChart3, TrendingUp, Calendar, Download, FileText } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartData = [
  { day: 'Mon', revenue: 32000, cost: 24000, profit: 8000 },
  { day: 'Tue', revenue: 28000, cost: 21000, profit: 7000 },
  { day: 'Wed', revenue: 45000, cost: 34000, profit: 11000 },
  { day: 'Thu', revenue: 38000, cost: 29000, profit: 9000 },
  { day: 'Fri', revenue: 52000, cost: 39000, profit: 13000 },
  { day: 'Sat', revenue: 48000, cost: 36000, profit: 12000 },
  { day: 'Sun', revenue: 35000, cost: 26000, profit: 9000 },
];

export function SalesChart() {
  const [activeTab, setActiveTab] = useState<'7days' | 'month'>('7days');
  
  const data = {
    labels: chartData.map(d => d.day),
    datasets: [
      {
        label: 'Revenue',
        data: chartData.map(d => d.revenue),
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: 'Cost',
        data: chartData.map(d => d.cost),
        backgroundColor: 'rgba(248, 113, 113, 0.8)',
        borderColor: 'rgba(248, 113, 113, 1)',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
      {
        label: 'Profit',
        data: chartData.map(d => d.profit),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: '500',
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(148, 163, 184, 0.2)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const label = context.dataset.label || '';
            const value = context.parsed.y;
            return `${label}: ₹${value.toLocaleString()}`;
          },
          afterBody: function(tooltipItems: any) {
            const dataIndex = tooltipItems[0].dataIndex;
            const dayData = chartData[dataIndex];
            const margin = ((dayData.profit / dayData.revenue) * 100).toFixed(1);
            return [`Profit Margin: ${margin}%`];
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
            weight: '500',
          },
          color: '#64748b',
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#64748b',
          callback: function(value: any) {
            return '₹' + (value / 1000).toFixed(0) + 'k';
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };
  
  const handleExportReport = () => {
    // Create CSV data
    const csvData = [
      ['Day', 'Revenue', 'Cost', 'Profit', 'Profit Margin'],
      ...chartData.map(d => [
        d.day, 
        d.revenue, 
        d.cost, 
        d.profit, 
        `${((d.profit / d.revenue) * 100).toFixed(1)}%`
      ])
    ];
    
    const csvContent = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sales-report-${activeTab}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  const handleViewReport = () => {
    // Open detailed report in new window
    const reportWindow = window.open('', '_blank');
    if (reportWindow) {
      reportWindow.document.write(`
        <html>
          <head>
            <title>Sales Report - ${activeTab}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
              th { background-color: #f2f2f2; }
              .summary { background-color: #f9f9f9; padding: 15px; margin-bottom: 20px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <h1>Sales & Revenue Report</h1>
            <div class="summary">
              <h3>Summary</h3>
              <p><strong>Period:</strong> ${activeTab === '7days' ? 'Last 7 Days' : 'This Month'}</p>
              <p><strong>Total Revenue:</strong> ₹${chartData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}</p>
              <p><strong>Total Cost:</strong> ₹${chartData.reduce((sum, d) => sum + d.cost, 0).toLocaleString()}</p>
              <p><strong>Total Profit:</strong> ₹${chartData.reduce((sum, d) => sum + d.profit, 0).toLocaleString()}</p>
            </div>
            <table>
              <thead>
                <tr><th>Day</th><th>Revenue</th><th>Cost</th><th>Profit</th><th>Profit Margin</th></tr>
              </thead>
              <tbody>
                ${chartData.map(d => `
                  <tr>
                    <td>${d.day}</td>
                    <td>₹${d.revenue.toLocaleString()}</td>
                    <td>₹${d.cost.toLocaleString()}</td>
                    <td>₹${d.profit.toLocaleString()}</td>
                    <td>${((d.profit / d.revenue) * 100).toFixed(1)}%</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `);
    }
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Sales & Revenue</h2>
            <p className="text-sm text-slate-500">Performance analytics</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportReport}
            className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          
          <button
            onClick={handleViewReport}
            className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105"
          >
            <FileText className="w-4 h-4" />
            <span>View Report</span>
          </button>
          
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('7days')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === '7days'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setActiveTab('month')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                activeTab === 'month'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-800'
              }`}
            >
              This Month
            </button>
          </div>
        </div>
      </div>
      
      {/* Chart container with fixed height */}
      <div style={{ height: '400px' }}>
        <Bar data={data} options={options} />
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
        <div className="flex items-center space-x-4">
          <div className="text-sm text-slate-600">
            <span className="font-medium text-slate-800">Total Revenue:</span> ₹{chartData.reduce((sum, d) => sum + d.revenue, 0).toLocaleString()}
          </div>
          <div className="text-sm text-slate-600">
            <span className="font-medium text-slate-800">Total Profit:</span> ₹{chartData.reduce((sum, d) => sum + d.profit, 0).toLocaleString()}
          </div>
        </div>
        <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>+15.3% vs last week</span>
        </div>
      </div>
    </div>
  );
}