import Link from 'next/link';
import { BookOpen, Calendar, Tag, ArrowRight } from 'lucide-react';
import { formatDate } from '@/lib/utils';

// This will be replaced with real data from the database
const mockSoulNotes = [
  {
    id: '1',
    title: 'Today, breathe into your becoming',
    slug: 'breathe-into-your-becoming',
    excerpt: 'You are allowed to rest. You are allowed to realign. Your journey is unfolding exactly as it should.',
    coverImage: null,
    theme: 'Stillness',
    tags: ['mindfulness', 'presence', 'self-compassion'],
    createdAt: new Date('2025-12-10'),
  },
  {
    id: '2',
    title: 'Where abundance already flows',
    slug: 'where-abundance-flows',
    excerpt: 'Look around you. Notice the abundance that is already here—in your breath, in the sunrise, in the love around you.',
    coverImage: null,
    theme: 'Abundance',
    tags: ['abundance', 'gratitude', 'awareness'],
    createdAt: new Date('2025-12-09'),
  },
  {
    id: '3',
    title: 'Healing begins in the pause',
    slug: 'healing-in-the-pause',
    excerpt: 'Between action and reaction, there is a space. In that space lies your power to choose healing.',
    coverImage: null,
    theme: 'Healing',
    tags: ['healing', 'inner-work', 'transformation'],
    createdAt: new Date('2025-12-08'),
  },
];

const themes = ['All', 'Stillness', 'Healing', 'Abundance', 'Presence', 'Inner Strength'];

export default function SoulNotesPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block px-4 py-1 rounded-full bg-orchid-100 text-orchid-700 text-sm mb-6">
          Soul Notes
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
          Daily Reflections for Your Soul
        </h1>
        <p className="text-lg text-gray-700">
          Gentle reminders and heartfelt messages to help you ground, reconnect, and realign throughout your journey.
        </p>
      </div>

      {/* Theme Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {themes.map((theme) => (
          <button
            key={theme}
            className={`px-6 py-2 rounded-full transition-all ${
              theme === 'All'
                ? 'bg-gradient-to-r from-orchid-500 to-lotus-500 text-white'
                : 'bg-white/60 backdrop-blur-sm border border-sand-200 text-gray-700 hover:border-orchid-300 hover:text-orchid-600'
            }`}
          >
            {theme}
          </button>
        ))}
      </div>

      {/* Featured Note */}
      <div className="mb-16">
        <div className="relative rounded-3xl bg-gradient-to-br from-orchid-100 to-lotus-100 p-8 md:p-12 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orchid-300 to-lotus-300 rounded-full blur-3xl opacity-30" />
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm text-sm text-orchid-700 mb-4">
              Featured
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
              {mockSoulNotes[0].title}
            </h2>
            <p className="text-lg text-gray-700 mb-6 max-w-2xl">
              {mockSoulNotes[0].excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(mockSoulNotes[0].createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Tag className="w-4 h-4" />
                <span>{mockSoulNotes[0].theme}</span>
              </div>
            </div>
            <Link
              href={`/soul-notes/${mockSoulNotes[0].slug}`}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-orchid-500 to-lotus-500 text-white hover:shadow-lg transition-all"
            >
              <span>Read Full Note</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Soul Notes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockSoulNotes.slice(1).map((note) => (
          <Link
            key={note.id}
            href={`/soul-notes/${note.slug}`}
            className="group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-sand-200 hover:shadow-xl hover:scale-[1.02] transition-all"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="px-3 py-1 rounded-full bg-orchid-100 text-orchid-700 text-xs">
                {note.theme}
              </div>
              <div className="flex items-center text-xs text-gray-500 space-x-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(note.createdAt)}</span>
              </div>
            </div>
            <h3 className="text-xl font-serif font-bold mb-3 text-gray-900 group-hover:text-orchid-600 transition-colors">
              {note.title}
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {note.excerpt}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {note.tags.map((tag) => (
                <span key={tag} className="text-xs text-gray-500 px-2 py-1 rounded-full bg-sand-100">
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center text-orchid-600 font-medium group-hover:text-lotus-600 transition-colors">
              <span className="text-sm">Read more</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center mt-12">
        <button className="px-8 py-3 rounded-full bg-white/60 backdrop-blur-sm border-2 border-orchid-300 text-orchid-700 font-medium hover:bg-white hover:shadow-lg transition-all">
          Load More Soul Notes
        </button>
      </div>
    </div>
  );
}
