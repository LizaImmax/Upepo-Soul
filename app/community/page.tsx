import Link from 'next/link';
import { MessageSquare, Plus } from 'lucide-react';

export default function CommunityPage() {
  const categories = [
    { name: 'General Discussion', count: 0, color: 'gold' },
    { name: 'Meditation & Practice', count: 0, color: 'orchid' },
    { name: 'Soul Sessions', count: 0, color: 'lotus' },
    { name: 'Q&A', count: 0, color: 'gold' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand-50 via-moonlit-50 to-lotus-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
            Community Forum
          </h1>
          <p className="text-xl text-gray-600">
            Connect, share, and grow together
          </p>
        </div>

        {/* Create Post Button */}
        <div className="flex justify-end mb-8">
          <Link
            href="/community/new"
            className="flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-orchid-500 text-white font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            <span>New Post</span>
          </Link>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/community/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`bg-white rounded-2xl border-2 border-${category.color}-200 p-6 hover:shadow-lg transition-all group`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <MessageSquare className={`w-6 h-6 text-${category.color}-500`} />
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-orchid-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full bg-${category.color}-100 text-${category.color}-700 text-sm font-medium`}>
                  {category.count} posts
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent Posts */}
        <div className="bg-white rounded-2xl border-2 border-sand-200 p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
            Recent Discussions
          </h2>
          <div className="text-center py-12 text-gray-500">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-lg mb-4">No posts yet</p>
            <p className="mb-6">Be the first to start a conversation!</p>
            <Link
              href="/community/new"
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-orchid-500 text-white font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              <span>Create Post</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
