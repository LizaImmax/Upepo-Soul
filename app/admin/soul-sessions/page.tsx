import Link from 'next/link';
import { Plus, Calendar } from 'lucide-react';

export default function SoulSessionsListPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-lotus-600 to-gold-600 bg-clip-text text-transparent">
            Soul Sessions
          </h1>
          <p className="text-gray-600 mt-2">
            Manage bookable events and sessions
          </p>
        </div>
        <Link
          href="/admin/soul-sessions/create"
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-lotus-500 to-gold-500 text-white font-semibold hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>Create New</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border-2 border-sand-200 p-6">
        <div className="flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search sessions..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-full border-2 border-sand-200 focus:border-lotus-500 focus:outline-none"
          />
          <select className="px-4 py-2 rounded-full border-2 border-sand-200 focus:border-lotus-500 focus:outline-none">
            <option value="">All Types</option>
            <option value="GROUP">Group Session</option>
            <option value="PRIVATE">Private Session</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="RETREAT">Retreat</option>
          </select>
          <input
            type="date"
            className="px-4 py-2 rounded-full border-2 border-sand-200 focus:border-lotus-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {/* Placeholder message */}
        <div className="bg-white rounded-2xl border-2 border-sand-200 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Soul Sessions Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first soul session to get started
          </p>
          <Link
            href="/admin/soul-sessions/create"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-lotus-500 to-gold-500 text-white font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Soul Session</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
