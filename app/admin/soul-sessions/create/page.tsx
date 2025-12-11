'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function CreateSoulSessionPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'GROUP',
    duration: 60,
    price: 0,
    capacity: 10,
    date: '',
    time: '',
    isRecurring: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine date and time
      const sessionDate = new Date(`${formData.date}T${formData.time}`);

      const response = await fetch('/api/admin/soul-sessions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          date: sessionDate.toISOString(),
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create soul session');
      }

      toast.success('Soul Session created successfully!');
      router.push('/admin/soul-sessions');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create soul session');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/soul-sessions"
          className="p-2 rounded-lg hover:bg-sand-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-lotus-600 to-gold-600 bg-clip-text text-transparent">
            Create Soul Session
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new bookable session or event
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border-2 border-sand-200 p-8 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-lotus-500 focus:outline-none text-lg"
              placeholder="Enter session title..."
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-lotus-500 focus:outline-none"
              rows={4}
              placeholder="Describe the session..."
            />
          </div>

          {/* Type, Duration, Capacity */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                Type *
              </label>
              <select
                id="type"
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-lotus-500 focus:outline-none"
              >
                <option value="GROUP">Group Session</option>
                <option value="PRIVATE">Private Session</option>
                <option value="WORKSHOP">Workshop</option>
                <option value="RETREAT">Retreat</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                Duration (minutes) *
              </label>
              <input
                id="duration"
                type="number"
                required
                min="15"
                step="15"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-lotus-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="capacity" className="block text-sm font-semibold text-gray-700 mb-2">
                Capacity *
              </label>
              <input
                id="capacity"
                type="number"
                required
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-lotus-500 focus:outline-none"
                placeholder="Max attendees"
              />
            </div>
          </div>

          {/* Date, Time, Price */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2">
                Date *
              </label>
              <input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-lotus-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2">
                Time *
              </label>
              <input
                id="time"
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-lotus-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                id="price"
                type="number"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-lotus-500 focus:outline-none"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Recurring */}
          <div>
            <label className="flex items-center space-x-3 cursor-pointer p-4 rounded-xl border-2 border-sand-200 hover:bg-sand-50 transition-all">
              <input
                type="checkbox"
                checked={formData.isRecurring}
                onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-sand-200 text-lotus-500 focus:ring-lotus-500"
              />
              <div>
                <span className="text-sm font-semibold text-gray-700 block">Recurring Session</span>
                <span className="text-xs text-gray-500">This session repeats regularly</span>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-lotus-500 to-gold-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Saving...' : 'Save Soul Session'}</span>
          </button>
          <Link
            href="/admin/soul-sessions"
            className="px-8 py-3 rounded-full border-2 border-sand-200 text-gray-700 font-semibold hover:bg-sand-50 transition-all"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
