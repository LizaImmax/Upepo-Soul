import Link from 'next/link';
import { Plus, FileText, Eye, Edit, Trash2 } from 'lucide-react';

export default function SoulNotesListPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
            Soul Notes
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your blog posts and spiritual content
          </p>
        </div>
        <Link
          href="/admin/soul-notes/create"
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-orchid-500 text-white font-semibold hover:shadow-lg transition-all"
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
            placeholder="Search soul notes..."
            className="flex-1 min-w-[200px] px-4 py-2 rounded-full border-2 border-sand-200 focus:border-gold-500 focus:outline-none"
          />
          <select className="px-4 py-2 rounded-full border-2 border-sand-200 focus:border-gold-500 focus:outline-none">
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <select className="px-4 py-2 rounded-full border-2 border-sand-200 focus:border-gold-500 focus:outline-none">
            <option value="">All Themes</option>
            <option value="stillness">Stillness</option>
            <option value="abundance">Abundance</option>
            <option value="healing">Healing</option>
          </select>
        </div>
      </div>

      {/* Soul Notes List */}
      <div className="space-y-4">
        {/* Placeholder message */}
        <div className="bg-white rounded-2xl border-2 border-sand-200 p-12 text-center">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No Soul Notes Yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first soul note to get started
          </p>
          <Link
            href="/admin/soul-notes/create"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-orchid-500 text-white font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>Create Soul Note</span>
          </Link>
        </div>

        {/* Example of what a soul note card would look like (commented out for now) */}
        {/* <div className="bg-white rounded-2xl border-2 border-sand-200 p-6 hover:shadow-lg transition-all">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                  Published
                </span>
                <span className="px-3 py-1 rounded-full bg-gold-100 text-gold-700 text-xs font-medium">
                  Stillness
                </span>
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                Today, breathe into your becoming
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                What if the point isn't to arrive, but to notice where you already are?
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>Created: Dec 11, 2025</span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>0 views</span>
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Link
                href="/admin/soul-notes/edit/1"
                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Edit className="w-5 h-5" />
              </Link>
              <button className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
