import React, { useState } from 'react';
import { MessageSquare, Calendar, Target, Megaphone, Clock, Plus, Edit, Trash2 } from 'lucide-react';

interface Announcement {
  id: number;
  title: string;
  message: string;
  type: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  icon: any;
  color: string;
  bgColor: string;
}

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: 'GST Filing Due',
    message: 'Monthly GST filing deadline approaching on June 20th.',
    type: 'reminder',
    priority: 'high',
    date: 'June 20',
    icon: Calendar,
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 2,
    title: 'Product Launch',
    message: 'Summer collection launch scheduled for July 5th.',
    type: 'event',
    priority: 'medium',
    date: 'July 5',
    icon: Target,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 3,
    title: 'Team Meeting',
    message: 'Monthly strategy meeting tomorrow at 2:00 PM.',
    type: 'meeting',
    priority: 'medium',
    date: 'Tomorrow',
    icon: MessageSquare,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
  }
];

export function Announcements() {
  const [announcements] = useState<Announcement[]>(initialAnnouncements);

  const getPriorityDot = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-green-500';
    }
  };
  
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200/50 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Megaphone className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">Announcements</h2>
            <p className="text-xs text-slate-500">Important reminders</p>
          </div>
        </div>
        <button className="flex items-center space-x-1 text-xs text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 hover:bg-indigo-100 px-2 py-1 rounded-lg transition-all duration-300">
          <Plus className="w-3 h-3" />
          <span>Add</span>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`${announcement.bgColor} border border-slate-200/50 rounded-lg p-3 hover:shadow-sm transition-all duration-300 group`}
          >
            <div className="flex items-start space-x-2">
              <div className={`w-8 h-8 bg-gradient-to-r ${announcement.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <announcement.icon className="w-4 h-4 text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-sm font-semibold text-slate-800 group-hover:text-slate-900">
                    {announcement.title}
                  </h3>
                  <div className={`w-2 h-2 rounded-full ${getPriorityDot(announcement.priority)}`}></div>
                </div>
                
                <p className="text-xs text-slate-600 mb-2 leading-relaxed">
                  {announcement.message}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-medium">
                    {announcement.date}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                    announcement.priority === 'high'
                      ? 'bg-red-100 text-red-700'
                      : announcement.priority === 'medium'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}