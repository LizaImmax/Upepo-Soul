import Link from 'next/link';
import { Wind, BookOpen, Sparkles, Users, Calendar, Heart } from 'lucide-react';
import Hero from '@/components/soul/Hero';
import FeatureCard from '@/components/soul/FeatureCard';
import NewsletterSection from '@/components/soul/NewsletterSection';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Soul Notes',
      description: 'Daily reflections and gentle reminders to ground you in your becoming.',
      href: '/soul-notes',
      color: 'from-gold-400 to-orchid-500',
    },
    {
      icon: Sparkles,
      title: 'Guided Practices',
      description: 'Breathwork, meditation, and inner work to realign your energy.',
      href: '/guided-practices',
      color: 'from-lotus-400 to-orchid-500',
    },
    {
      icon: Calendar,
      title: 'Soul Sessions',
      description: 'Live healing circles, meditation gatherings, and abundance sessions.',
      href: '/soul-sessions',
      color: 'from-orchid-500 to-gold-600',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with others on their soul journey. Share, reflect, grow together.',
      href: '/community',
      color: 'from-sand-400 to-sand-600',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Hero />

      {/* What is Upepo Soul */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-gold-500 to-orchid-500 bg-clip-text text-transparent">
            Welcome Home to Your Soul
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Upepo Soul is your sacred space for inner growth, healing, and spiritual connection. 
            Here, we slow down, breathe deeply, and return to our center. This is where self-awareness, 
            peace, and transformation begin—where you reconnect with your intuitive wisdom and remember 
            who you are becoming.
          </p>
        </div>

        {/* Core Themes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-gold-200 hover:border-orchid-400 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-4 shadow-lg shadow-gold-300/50">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-orchid-700">Inner Alignment</h3>
            <p className="text-gray-600 text-sm">Reconnect with your inner guide and find your center.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-orchid-200 hover:border-gold-400 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lotus-400 to-orchid-500 flex items-center justify-center mb-4 shadow-lg shadow-lotus-300/50">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-orchid-700">Healing & Expansion</h3>
            <p className="text-gray-600 text-sm">Process emotions, release blocks, and expand your heart.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-lotus-200 hover:border-gold-400 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orchid-400 to-gold-500 flex items-center justify-center mb-4 shadow-lg shadow-orchid-300/50">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-orchid-700">Spiritual Connection</h3>
            <p className="text-gray-600 text-sm">Connect to your intuition, presence, and soul purpose.</p>
          </div>
          
          <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border-2 border-sand-300 hover:border-gold-400 hover:shadow-xl transition-all">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sand-400 to-gold-500 flex items-center justify-center mb-4 shadow-lg shadow-gold-200/50">
              <Wind className="w-6 h-6 text-white animate-breathe" />
            </div>
            <h3 className="font-semibold text-lg mb-2 text-orchid-700">Mindfulness & Breath</h3>
            <p className="text-gray-600 text-sm">Ground yourself with breathwork and presence practices.</p>
          </div>
        </div>

        {/* Main Features */}
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </section>

      {/* Soul Note of the Day */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gold-50 via-lotus-50 to-moonlit-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-gold-100 border border-gold-500 text-sm text-gold-700 mb-6 shadow-sm">
            Today&apos;s Soul Note
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
            &quot;Today, breathe into your becoming.&quot;
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            You are allowed to rest. You are allowed to realign. Your journey is unfolding 
            exactly as it should. Trust the process, honor your pace, and remember—you are 
            exactly where you need to be.
          </p>
          <Link
            href="/soul-notes"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gold-500 text-white hover:bg-orchid-500 transition-all hover:shadow-lg"
          >
            <span>Explore More Soul Notes</span>
            <BookOpen className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Newsletter CTA */}
      <NewsletterSection />
    </div>
  );
}
