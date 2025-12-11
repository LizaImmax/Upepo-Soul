import Link from 'next/link';
import { Plus, Headphones } from 'lucide-react';

export default function PracticesListPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-orchid-600 to-lotus-600 bg-clip-text text-transparent">
            Guided Practices
          </h1>
          <p className="text-gray-600 mt-2">
            Manage audio and video guided practices
          </p>
        </div>
        <Link
          href="/admin/practices/create"
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-orchid-500 to-lotus-500 text-white font-semibold hover:shadow-lg transition-all"
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
            placeholder="Search practices..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-full border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
          />
          <select className="px-4 py-2 rounded-full border-2 border-sand-200 focus:border-orchid-500 focus:outline-none">
            <option value="">All Types</option>
            <option value="MEDITATION">Meditation</option>
            <option value="BREATHWORK">Breathwork</option>
            <option value="VISUALIZATION">Visualization</option>
            <option value="MOVEMENT">Movement</option>
          </select>
          <select className="px-4 py-2 rounded-full border-2 border-sand-200 focus:border-orchid-500 focus:outline-none">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select className="px-4 py-2 rounded-full border-2 border-sand-200 focus:border-orchid-500 focus:outline-none">
            <option value="">All Access</option>
            <option value="free">Free</option>
            <option value="premium">Premium</option>
          </select>
        </div>
      </div>

      {/* Practices List */}
      <div className="space-y-4">
        {/* Placeholder message */}
        <div className="bg-white rounded-2xl border-2 border-sand-200 p-12 text-center">
          <Headphones className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Practices Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first guided practice to get started
          </p>
          <Link
            href="/admin/practices/create"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-orchid-500 to-lotus-500 text-white font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Practice</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
