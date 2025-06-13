import React, { useState } from 'react';
import { MessageSquare, Calendar, Target, Megaphone, Clock, Plus, Edit, Trash2, Save, X } from 'lucide-react';

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
    message: 'Monthly GST filing deadline is approaching on June 20th. Ensure all invoices are ready.',
    type: 'reminder',
    priority: 'high',
    date: 'June 20, 2024',
    icon: Calendar,
    color: 'from-red-500 to-pink-600',
    bgColor: 'bg-red-50',
  },
  {
    id: 2,
    title: 'New Product Launch',
    message: 'Summer collection launch scheduled for July 5th. Marketing campaign starts next week.',
    type: 'event',
    priority: 'medium',
    date: 'July 5, 2024',
    icon: Target,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
  },
  {
    id: 3,
    title: 'Team Meeting',
    message: 'Monthly strategy meeting to discuss Q3 goals and new market opportunities.',
    type: 'meeting',
    priority: 'medium',
    date: 'Tomorrow, 2:00 PM',
    icon: MessageSquare,
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
  },
  {
    id: 4,
    title: 'Inventory Audit',
    message: 'Quarterly inventory audit scheduled. Please ensure all stock records are updated.',
    type: 'task',
    priority: 'low',
    date: 'Next Week',
    icon: Clock,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
  },
];

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({
    title: '',
    message: '',
    priority: 'medium' as 'high' | 'medium' | 'low',
    date: ''
  });

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

  const handleEdit = (announcement: Announcement) => {
    setEditingId(announcement.id);
    setEditForm({
      title: announcement.title,
      message: announcement.message,
      priority: announcement.priority,
      date: announcement.date
    });
  };

  const handleSave = (id: number) => {
    setAnnouncements(prev => prev.map(ann => 
      ann.id === id 
        ? { ...ann, ...editForm }
        : ann
    ));
    setEditingId(null);
    setEditForm({ title: '', message: '', priority: 'medium', date: '' });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      setAnnouncements(prev => prev.filter(ann => ann.id !== id));
    }
  };

  const handleAdd = () => {
    if (editForm.title && editForm.message) {
      const newAnnouncement: Announcement = {
        id: Math.max(...announcements.map(a => a.id)) + 1,
        title: editForm.title,
        message: editForm.message,
        type: 'custom',
        priority: editForm.priority,
        date: editForm.date || 'Today',
        icon: Megaphone,
        color: editForm.priority === 'high' ? 'from-red-500 to-pink-600' : 
               editForm.priority === 'medium' ? 'from-blue-500 to-indigo-600' : 
               'from-green-500 to-emerald-600',
        bgColor: editForm.priority === 'high' ? 'bg-red-50' : 
                 editForm.priority === 'medium' ? 'bg-blue-50' : 
                 'bg-green-50',
      };
      
      setAnnouncements(prev => [newAnnouncement, ...prev]);
      setShowAddForm(false);
      setEditForm({ title: '', message: '', priority: 'medium', date: '' });
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setShowAddForm(false);
    setEditForm({ title: '', message: '', priority: 'medium', date: '' });
  };
  
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/50">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Megaphone className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-800">Announcements</h2>
            <p className="text-sm text-slate-500">Important reminders & updates</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 text-sm text-indigo-600 hover:text-indigo-700 font-medium bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>Add New</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="mb-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
          <h3 className="font-semibold text-slate-800 mb-3">Add New Announcement</h3>
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Title"
              value={editForm.title}
              onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <textarea
              placeholder="Message"
              value={editForm.message}
              onChange={(e) => setEditForm(prev => ({ ...prev, message: e.target.value }))}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
              rows={3}
            />
            <div className="flex space-x-3">
              <select
                value={editForm.priority}
                onChange={(e) => setEditForm(prev => ({ ...prev, priority: e.target.value as any }))}
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
              <input
                type="text"
                placeholder="Date (e.g., Tomorrow, June 20)"
                value={editForm.date}
                onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleAdd}
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center space-x-2 bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {announcements.map((announcement) => (
          <div
            key={announcement.id}
            className={`${announcement.bgColor} border border-slate-200/50 rounded-xl p-4 hover:shadow-sm transition-all duration-300 group`}
          >
            {editingId === announcement.id ? (
              // Edit Form
              <div className="space-y-3">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
                <textarea
                  value={editForm.message}
                  onChange={(e) => setEditForm(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none"
                  rows={3}
                />
                <div className="flex space-x-3">
                  <select
                    value={editForm.priority}
                    onChange={(e) => setEditForm(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                  </select>
                  <input
                    type="text"
                    value={editForm.date}
                    onChange={(e) => setEditForm(prev => ({ ...prev, date: e.target.value }))}
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                  />
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSave(announcement.id)}
                    className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 bg-slate-500 hover:bg-slate-600 text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              // Display Mode
              <div className="flex items-start space-x-3">
                <div className={`w-10 h-10 bg-gradient-to-r ${announcement.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <announcement.icon className="w-5 h-5 text-white" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-slate-800 group-hover:text-slate-900">
                      {announcement.title}
                    </h3>
                    <div className={`w-2 h-2 rounded-full ${getPriorityDot(announcement.priority)}`}></div>
                  </div>
                  
                  <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                    {announcement.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">
                      {announcement.date}
                    </span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        announcement.priority === 'high'
                          ? 'bg-red-100 text-red-700'
                          : announcement.priority === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700'
                      }`}>
                        {announcement.priority} priority
                      </span>
                      <button
                        onClick={() => handleEdit(announcement)}
                        className="p-1 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(announcement.id)}
                        className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-slate-100">
        <button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02]">
          View All Announcements
        </button>
      </div>
    </div>
  );
}