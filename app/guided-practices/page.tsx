import Link from 'next/link';
import { Play, Clock, Sparkles, Heart, Wind, Crown } from 'lucide-react';

const mockPractices = [
  {
    id: '1',
    title: 'Morning Grounding Breathwork',
    slug: 'morning-grounding-breathwork',
    description: 'Start your day centered and calm with this 10-minute breathwork practice designed to ground your energy and set intentions.',
    type: 'BREATHWORK',
    duration: 10,
    coverImage: null,
    theme: 'Grounding',
    isPremium: false,
  },
  {
    id: '2',
    title: 'Healing Heart Meditation',
    slug: 'healing-heart-meditation',
    description: 'A gentle 15-minute guided meditation to open your heart, release emotional blocks, and invite healing energy.',
    type: 'MEDITATION',
    duration: 15,
    coverImage: null,
    theme: 'Healing',
    isPremium: false,
  },
  {
    id: '3',
    title: 'Abundance Visualization Journey',
    slug: 'abundance-visualization',
    description: 'Step into the frequency of abundance with this powerful 20-minute visualization practice.',
    type: 'VISUALIZATION',
    duration: 20,
    coverImage: null,
    theme: 'Abundance',
    isPremium: true,
  },
  {
    id: '4',
    title: 'Evening Wind-Down Reflection',
    slug: 'evening-wind-down',
    description: 'Release the day and return to peace with this calming evening reflection and breathwork practice.',
    type: 'REFLECTION',
    duration: 12,
    coverImage: null,
    theme: 'Stillness',
    isPremium: false,
  },
];

const practiceTypes = ['All', 'Breathwork', 'Meditation', 'Visualization', 'Reflection', 'Healing'];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'BREATHWORK':
      return Wind;
    case 'MEDITATION':
      return Sparkles;
    case 'VISUALIZATION':
      return Heart;
    default:
      return Play;
  }
};

export default function GuidedPracticesPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block px-4 py-1 rounded-full bg-lotus-100 text-lotus-700 text-sm mb-6">
          Guided Practices
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-orchid-600 to-gold-600 bg-clip-text text-transparent">
          Realign Your Energy
        </h1>
        <p className="text-lg text-gray-700">
          Breathwork, meditation, and inner work practices to help you ground, heal, and reconnect with your center.
        </p>
      </div>

      {/* Type Filter */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {practiceTypes.map((type) => (
          <button
            key={type}
            className={`px-6 py-2 rounded-full transition-all ${
              type === 'All'
                ? 'bg-gradient-to-r from-orchid-500 to-lotus-500 text-white'
                : 'bg-white/60 backdrop-blur-sm border border-sand-200 text-gray-700 hover:border-orchid-300 hover:text-orchid-600'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Featured Practice */}
      <div className="mb-16">
        <div className="relative rounded-3xl bg-gradient-to-br from-orchid-100 to-lotus-100 p-8 md:p-12 overflow-hidden group cursor-pointer">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orchid-300 to-lotus-300 rounded-full blur-3xl opacity-30" />
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            {/* Play Button */}
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Play className="w-10 h-10 text-orchid-600 fill-orchid-600" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm text-sm text-orchid-700">
                  Featured Practice
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{mockPractices[2].duration} min</span>
                </div>
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-gray-900">
                {mockPractices[2].title}
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                {mockPractices[2].description}
              </p>
              <Link
                href={`/guided-practices/${mockPractices[2].slug}`}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-orchid-500 to-lotus-500 text-white hover:shadow-lg transition-all"
              >
                <Play className="w-4 h-4" />
                <span>Start Practice</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Practices Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockPractices.map((practice) => {
          const Icon = getTypeIcon(practice.type);
          return (
            <Link
              key={practice.id}
              href={`/guided-practices/${practice.slug}`}
              className="group relative p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-sand-200 hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              {practice.isPremium && (
                <div className="absolute top-4 right-4 flex items-center space-x-1 px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-white text-xs">
                  <Crown className="w-3 h-3" />
                  <span>Premium</span>
                </div>
              )}

              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orchid-400 to-lotus-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-8 h-8 text-white fill-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="px-3 py-1 rounded-full bg-lotus-100 text-lotus-700 text-xs">
                  {practice.theme}
                </div>
                <div className="flex items-center text-xs text-gray-500 space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{practice.duration} min</span>
                </div>
              </div>

              <h3 className="text-xl font-serif font-bold mb-3 text-gray-900 text-center group-hover:text-orchid-600 transition-colors">
                {practice.title}
              </h3>

              <p className="text-gray-600 text-center leading-relaxed">
                {practice.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Premium CTA */}
      <div className="mt-16 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-200">
        <div className="text-center max-w-2xl mx-auto">
          <Crown className="w-12 h-12 mx-auto mb-6 text-amber-500" />
          <h2 className="text-3xl font-serif font-bold mb-4 text-gray-900">
            Unlock All Practices
          </h2>
          <p className="text-lg text-gray-700 mb-8">
            Get unlimited access to our full library of guided practices, exclusive deep-dive meditations, and new releases every week.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-lg font-medium hover:shadow-lg transition-all"
          >
            <Crown className="w-5 h-5" />
            <span>Upgrade to Premium</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
