import React from 'react';
import { Target, Users, ShoppingBag, TrendingUp, Calendar, Award } from 'lucide-react';

const metrics = [
  {
    title: 'Monthly Target',
    current: 250000,
    target: 300000,
    percentage: 83.3,
    icon: Target,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50'
  },
  {
    title: 'Customer Acquisition',
    current: 89,
    target: 120,
    percentage: 74.2,
    icon: Users,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50'
  },
  {
    title: 'Product Sales',
    current: 430,
    target: 500,
    percentage: 86.0,
    icon: ShoppingBag,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50'
  }
];

const achievements = [
  {
    title: 'Best Month Ever',
    description: 'Highest revenue recorded',
    date: 'This Month',
    icon: Award,
    color: 'text-yellow-600 bg-yellow-100'
  },
  {
    title: '1000+ Customers',
    description: 'Customer milestone reached',
    date: 'Last Week',
    icon: Users,
    color: 'text-blue-600 bg-blue-100'
  }
];

export function BusinessMetrics() {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Target className="w-4 h-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-800">Monthly Targets</h2>
          <p className="text-xs text-slate-500">Progress towards goals</p>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        {metrics.map((metric, index) => (
          <div key={index} className={`${metric.bgColor} rounded-lg p-3`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 bg-gradient-to-r ${metric.color} rounded-md flex items-center justify-center`}>
                  <metric.icon className="w-3 h-3 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-800">{metric.title}</h3>
                  <p className="text-xs text-slate-600">
                    {typeof metric.current === 'number' && metric.current > 1000 
                      ? `₹${metric.current.toLocaleString()}` 
                      : metric.current} / {typeof metric.target === 'number' && metric.target > 1000 
                      ? `₹${metric.target.toLocaleString()}` 
                      : metric.target}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800">{metric.percentage}%</p>
              </div>
            </div>
            <div className="w-full bg-white/50 rounded-full h-2">
              <div
                className={`bg-gradient-to-r ${metric.color} h-2 rounded-full transition-all duration-1000`}
                style={{ width: `${metric.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex-1">
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-md flex items-center justify-center">
            <Award className="w-3 h-3 text-white" />
          </div>
          <h3 className="text-sm font-bold text-slate-800">Recent Achievements</h3>
        </div>

        <div className="space-y-2">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-slate-50 rounded-lg">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${achievement.color}`}>
                <achievement.icon className="w-3 h-3" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-slate-800">{achievement.title}</h4>
                <p className="text-xs text-slate-600">{achievement.description}</p>
              </div>
              <div className="text-xs text-slate-500">{achievement.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}