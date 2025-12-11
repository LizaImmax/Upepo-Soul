'use client';

import Link from 'next/link';
import { Calendar, Users, Video, Clock, DollarSign, ArrowRight } from 'lucide-react';

const mockSessions = [
  {
    id: '1',
    title: 'Full Moon Meditation Circle',
    slug: 'full-moon-meditation-circle',
    description: 'Join us for a powerful group meditation to release what no longer serves and set intentions for the new cycle.',
    type: 'GROUP',
    scheduledDate: '2025-12-15T19:00:00',
    duration: 90,
    price: 25,
    capacity: 50,
    spotsLeft: 12,
    facilitator: 'Soul Guide',
    coverImage: null,
  },
  {
    id: '2',
    title: 'One-on-One Soul Reading',
    slug: 'one-on-one-soul-reading',
    description: 'A personalized 60-minute session to gain clarity, receive intuitive guidance, and reconnect with your path.',
    type: 'INDIVIDUAL',
    scheduledDate: '2025-12-13T10:00:00',
    duration: 60,
    price: 111,
    capacity: 1,
    spotsLeft: 1,
    facilitator: 'Soul Guide',
    coverImage: null,
  },
  {
    id: '3',
    title: 'Abundance Alignment Workshop',
    slug: 'abundance-alignment-workshop',
    description: 'A transformative 2-hour workshop to shift your money mindset and align with the frequency of abundance.',
    type: 'WORKSHOP',
    scheduledDate: '2025-12-18T18:00:00',
    duration: 120,
    price: 44,
    capacity: 30,
    spotsLeft: 8,
    facilitator: 'Soul Guide',
    coverImage: null,
  },
];

export default function SoulSessionsPage() {
  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-block px-4 py-1 rounded-full bg-lotus-100 text-lotus-700 text-sm mb-6">
          Soul Sessions
        </div>
        <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-lotus-600 to-gold-600 bg-clip-text text-transparent">
          Transform Together
        </h1>
        <p className="text-lg text-gray-700">
          Join live healing circles, meditation gatherings, and one-on-one soul guidance sessions.
        </p>
      </div>

      {/* View Calendar CTA */}
      <div className="mb-12 text-center">
        <Link
          href="/soul-sessions/calendar"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-lotus-500 to-gold-500 text-white font-semibold hover:shadow-lg transition-all"
        >
          <Calendar className="w-5 h-5" />
          <span>View Full Calendar</span>
        </Link>
      </div>

      {/* Session Types */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="p-6 rounded-2xl bg-lotus-50 border-2 border-lotus-200 text-center">
          <Users className="w-10 h-10 text-lotus-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Group Sessions</h3>
          <p className="text-sm text-gray-600">
            Meditation circles, healing talks, and collective energy work
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-orchid-50 border-2 border-orchid-200 text-center">
          <Video className="w-10 h-10 text-orchid-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">One-on-One</h3>
          <p className="text-sm text-gray-600">
            Personalized soul readings, intuitive guidance, and private sessions
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-gold-50 border-2 border-gold-200 text-center">
          <Calendar className="w-10 h-10 text-gold-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Workshops</h3>
          <p className="text-sm text-gray-600">
            Deep-dive experiences on abundance, healing, and transformation
          </p>
        </div>
      </div>

      {/* Upcoming Sessions */}
      <div>
        <h2 className="text-3xl font-serif font-bold mb-8 bg-gradient-to-r from-lotus-600 to-gold-600 bg-clip-text text-transparent">Upcoming Sessions</h2>
        <div className="space-y-6">
          {mockSessions.map((session) => {
            const sessionDate = new Date(session.scheduledDate);
            const isFull = session.spotsLeft === 0;
            
            return (
              <div
                key={session.id}
                className="group relative p-8 rounded-2xl bg-white border-2 border-sand-200 hover:border-lotus-400 hover:shadow-xl transition-all"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Date Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-lotus-400 to-gold-400 flex flex-col items-center justify-center text-white">
                      <div className="text-3xl font-bold">{sessionDate.getDate()}</div>
                      <div className="text-sm uppercase">{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][sessionDate.getMonth()]}</div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="px-3 py-1 rounded-full bg-lotus-100 text-lotus-700 text-xs font-medium">
                            {session.type}
                          </span>
                          {isFull ? (
                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium">
                              Sold Out
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                              {session.spotsLeft} spots left
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-gray-900 group-hover:text-lotus-600 transition-colors mb-2">
                          {session.title}
                        </h3>
                        <p className="text-gray-600 mb-4">{session.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{sessionDate.getHours() % 12 || 12}:{sessionDate.getMinutes().toString().padStart(2, '0')} {sessionDate.getHours() >= 12 ? 'PM' : 'AM'}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{session.duration} minutes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>${session.price}</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      {isFull ? (
                        <button
                          disabled
                          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold bg-gray-300 text-gray-600 cursor-not-allowed"
                        >
                          <span>Session Full</span>
                        </button>
                      ) : (
                        <Link
                          href={`/checkout?type=session&itemId=${session.id}&title=${encodeURIComponent(session.title)}&price=${session.price}`}
                          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-lotus-500 to-gold-500 text-white hover:shadow-lg hover:scale-105 transition-all relative z-10"
                        >
                          <span>Book Now</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-lotus-500 to-gold-500 text-white text-center">
        <h2 className="text-3xl font-serif font-bold mb-4">
          Ready to Experience Transformation?
        </h2>
        <p className="text-lg mb-8 text-white/90">
          Browse our full calendar of upcoming soul sessions and secure your spot.
        </p>
        <Link
          href="/soul-sessions/calendar"
          className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-white text-lotus-600 font-semibold hover:bg-gold-50 transition-colors"
        >
          <Calendar className="w-5 h-5" />
          <span>View Calendar</span>
        </Link>
      </div>
    </div>
  );
}
