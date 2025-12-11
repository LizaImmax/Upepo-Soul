'use client';

import { useEffect, useState } from 'react';
import { FileText, Headphones, Calendar, Users, TrendingUp, Eye } from 'lucide-react';

interface Stats {
  soulNotes: number;
  practices: number;
  sessions: number;
  users: number;
  views: number;
  bookings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    soulNotes: 0,
    practices: 0,
    sessions: 0,
    users: 0,
    views: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch stats from API
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        // If API fails, show placeholder data
        setLoading(false);
      });
  }, []);

  const statCards = [
    {
      title: 'Soul Notes',
      value: stats.soulNotes,
      icon: FileText,
      color: 'gold',
      bgColor: 'bg-gold-50',
      textColor: 'text-gold-600',
      borderColor: 'border-gold-200',
    },
    {
      title: 'Practices',
      value: stats.practices,
      icon: Headphones,
      color: 'orchid',
      bgColor: 'bg-orchid-50',
      textColor: 'text-orchid-600',
      borderColor: 'border-orchid-200',
    },
    {
      title: 'Soul Sessions',
      value: stats.sessions,
      icon: Calendar,
      color: 'lotus',
      bgColor: 'bg-lotus-50',
      textColor: 'text-lotus-600',
      borderColor: 'border-lotus-200',
    },
    {
      title: 'Total Users',
      value: stats.users,
      icon: Users,
      color: 'gold',
      bgColor: 'bg-gold-50',
      textColor: 'text-gold-600',
      borderColor: 'border-gold-200',
    },
    {
      title: 'Total Views',
      value: stats.views,
      icon: Eye,
      color: 'orchid',
      bgColor: 'bg-orchid-50',
      textColor: 'text-orchid-600',
      borderColor: 'border-orchid-200',
    },
    {
      title: 'Total Bookings',
      value: stats.bookings,
      icon: TrendingUp,
      color: 'lotus',
      bgColor: 'bg-lotus-50',
      textColor: 'text-lotus-600',
      borderColor: 'border-lotus-200',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
          Dashboard Overview
        </h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with Upepo Soul.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.title}
              className={`${card.bgColor} border-2 ${card.borderColor} rounded-2xl p-6 hover:shadow-lg transition-all`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className={`w-8 h-8 ${card.textColor}`} />
                {loading ? (
                  <div className="h-8 w-16 bg-gray-200 animate-pulse rounded" />
                ) : (
                  <span className={`text-3xl font-bold ${card.textColor}`}>
                    {card.value}
                  </span>
                )}
              </div>
              <h3 className="text-gray-700 font-semibold">{card.title}</h3>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border-2 border-sand-200 p-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/soul-notes/create"
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-white font-semibold hover:shadow-lg transition-all text-center"
          >
            Create Soul Note
          </a>
          <a
            href="/admin/practices/create"
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-orchid-500 to-orchid-600 text-white font-semibold hover:shadow-lg transition-all text-center"
          >
            Create Practice
          </a>
          <a
            href="/admin/soul-sessions/create"
            className="px-6 py-4 rounded-xl bg-gradient-to-r from-lotus-500 to-lotus-600 text-white font-semibold hover:shadow-lg transition-all text-center"
          >
            Create Soul Session
          </a>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border-2 border-sand-200 p-6">
        <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="space-y-3">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-100 animate-pulse rounded-xl" />
              ))}
            </>
          ) : (
            <p className="text-gray-500 text-center py-8">
              No recent activity to display
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
