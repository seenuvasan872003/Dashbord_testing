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
  },
  {
    title: 'Zero Returns',
    description: '7 days with no returns',
    date: 'This Week',
    icon: TrendingUp,
    color: 'text-green-600 bg-green-100'
  }
];

export function BusinessMetrics() {
  return (
    <div className="space-y-6">
      {/* Monthly Targets */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Target className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Monthly Targets</h2>
            <p className="text-sm text-slate-500">Progress towards goals</p>
          </div>
        </div>

        <div className="space-y-4">
          {metrics.map((metric, index) => (
            <div key={index} className={`${metric.bgColor} rounded-xl p-4`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                    <metric.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-800">{metric.title}</h3>
                    <p className="text-sm text-slate-600">
                      {typeof metric.current === 'number' && metric.current > 1000 
                        ? `₹${metric.current.toLocaleString()}` 
                        : metric.current} / {typeof metric.target === 'number' && metric.target > 1000 
                        ? `₹${metric.target.toLocaleString()}` 
                        : metric.target}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-slate-800">{metric.percentage}%</p>
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
      </div>

      {/* Recent Achievements */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Recent Achievements</h2>
            <p className="text-sm text-slate-500">Business milestones</p>
          </div>
        </div>

        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${achievement.color}`}>
                <achievement.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-slate-800">{achievement.title}</h3>
                <p className="text-sm text-slate-600">{achievement.description}</p>
              </div>
              <div className="text-xs text-slate-500">{achievement.date}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}