import Link from 'next/link';
import Image from 'next/image';
import { Heart, Sparkles, Wind, Users } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-block px-4 py-1 rounded-full bg-gold-50 border border-gold-400 text-gold-700 text-sm mb-6">
          About Upepo Soul
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-gold-500 via-orchid-500 to-lotus-500 bg-clip-text text-transparent">
          Welcome Home to Your Soul
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed">
          Upepo Soul is the spiritual, emotional, and inner-growth pillar of the Upepo Ecosystem.
          It is the space where we turn inward, reconnect with ourselves, and strengthen the inner 
          foundation that supports our learning, careers, creativity, and purpose.
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto space-y-16">
        {/* What is Upepo Soul */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-6 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">What Upepo Soul Is</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
            <p>
              If the Ecosystem is the body, and Voices is the story, and Learn is the mind —
              <strong className="text-orchid-600"> Upepo Soul is the heart.</strong>
            </p>
            <p>
              It's where we slow down, breathe, return to our center, and remind ourselves of who we are becoming.
            </p>
            <p>
              Upepo Soul exists to guide people inward, support emotional and spiritual grounding, 
              create inner clarity, nurture calmness, provide tools for alignment, and help people 
              reconnect to their intuitive wisdom.
            </p>
          </div>
        </section>

        {/* Core Themes */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">Core Themes</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-gold-50 border border-gold-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-4">
                <Wind className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Inner Alignment</h3>
              <p className="text-gray-700">
                Helping people reconnect with their inner guide, return home to the self, 
                understand emotions, and find their center.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-lotus-50 border border-lotus-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lotus-400 to-lotus-600 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Healing & Emotional Expansion</h3>
              <p className="text-gray-700">
                Creating safe space for processing emotions, healing inner blocks, letting go, 
                and expanding the heart.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-orchid-50 border border-orchid-200">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orchid-400 to-orchid-600 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Spiritual Connection</h3>
              <p className="text-gray-700">
                Encouraging connection to intuition, presence, soul purpose, higher consciousness, 
                gratitude, and abundance.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-sand-50 border border-sand-300">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center mb-4">
                <Wind className="w-6 h-6 text-white animate-breathe" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Mindfulness & Breathwork</h3>
              <p className="text-gray-700">
                Simple, practical rituals including breathwork for grounding, mindfulness moments, 
                and presence practices.
              </p>
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gold-50 to-lotus-50">
          <h2 className="text-3xl font-serif font-bold mb-6 text-gray-900">Our Mission</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              We believe that self-awareness, peace, and transformation begin when you turn inward. 
              Upepo Soul is where you slow down, breathe deeply, and reconnect with your center.
            </p>
            <p className="font-semibold text-orchid-700">
              People should feel held, understood, grounded, guided, lighter, connected, inspired, 
              and expanded after interacting with our content.
            </p>
          </div>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="text-3xl font-serif font-bold mb-8 text-center bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              href="/soul-notes"
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-gold-50 to-gold-100 border-2 border-gold-200 hover:border-gold-400 transition-all hover:shadow-xl hover:scale-105 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-300 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 text-gray-900 group-hover:text-gold-700 transition-colors">Soul Notes</h3>
                <p className="text-gray-700">
                  Daily or weekly reflections — gentle messages you need to hear to ground 
                  and reconnect throughout your week.
                </p>
              </div>
            </Link>

            <Link
              href="/guided-practices"
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-orchid-50 to-orchid-100 border-2 border-orchid-200 hover:border-orchid-400 transition-all hover:shadow-xl hover:scale-105 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-orchid-300 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orchid-400 to-orchid-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 text-gray-900 group-hover:text-orchid-700 transition-colors">Guided Practices</h3>
                <p className="text-gray-700">
                  Short audio and video practices including breathwork, meditation, visualization, 
                  and inner alignment check-ins.
                </p>
              </div>
            </Link>

            <Link
              href="/soul-sessions"
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-lotus-50 to-lotus-100 border-2 border-lotus-200 hover:border-lotus-400 transition-all hover:shadow-xl hover:scale-105 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-lotus-300 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-lotus-400 to-lotus-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 text-gray-900 group-hover:text-lotus-700 transition-colors">Soul Sessions</h3>
                <p className="text-gray-700">
                  Live or pre-recorded sessions including meditation circles, healing talks, 
                  and abundance alignment sessions.
                </p>
              </div>
            </Link>

            <Link
              href="/community"
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-sand-50 to-sand-100 border-2 border-sand-300 hover:border-sand-500 transition-all hover:shadow-xl hover:scale-105 overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-sand-400 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sand-400 to-sand-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="text-white font-bold text-lg">4</span>
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3 text-gray-900 group-hover:text-gray-700 transition-colors">Community</h3>
                <p className="text-gray-700">
                  Connect with others through soul check-ins, forums, and shared experiences 
                  on this journey of inner growth.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center p-12 rounded-3xl bg-gradient-to-br from-gold-500 to-orchid-500 text-white">
          <h2 className="text-3xl font-serif font-bold mb-4">
            Ready to Begin Your Soul Journey?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            Join our community and receive gentle reminders, practices, and guidance.
          </p>
          <Link
            href="/soul-notes"
            className="inline-block px-8 py-4 rounded-full bg-white text-orchid-600 font-semibold hover:bg-gold-50 transition-colors"
          >
            Explore Soul Notes
          </Link>
        </section>
      </div>
    </div>
  );
}
