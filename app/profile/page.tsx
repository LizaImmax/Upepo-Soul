'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { User, Calendar, CreditCard, MessageSquare, Edit } from 'lucide-react';

interface Booking {
  id: string;
  status: string;
  scheduledDate: string;
  session: {
    title: string;
    type: string;
    price: number;
  };
}

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/signin');
    }

    if (status === 'authenticated') {
      fetchBookings();
    }
  }, [status]);

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      if (response.ok) {
        const data = await response.json();
        setBookings(data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand-50 via-moonlit-50 to-lotus-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-3xl border-2 border-sand-200 p-8 mb-8 shadow-lg">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold-400 to-orchid-400 flex items-center justify-center text-white text-3xl font-bold">
                {session.user?.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-serif font-bold text-gray-800 mb-1">
                  {session.user?.name}
                </h1>
                <p className="text-gray-600">{session.user?.email}</p>
                {(session.user as any)?.role === 'ADMIN' && (
                  <span className="inline-block mt-2 px-3 py-1 rounded-full bg-orchid-100 text-orchid-700 text-sm font-medium">
                    Administrator
                  </span>
                )}
              </div>
            </div>
            <Link
              href="/profile/edit"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border-2 border-sand-200 text-gray-700 hover:bg-sand-50 transition-all"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl border-2 border-gold-200 p-6">
            <Calendar className="w-8 h-8 text-gold-500 mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">{bookings.length}</h3>
            <p className="text-gray-600">Total Bookings</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-orchid-200 p-6">
            <MessageSquare className="w-8 h-8 text-orchid-500 mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">0</h3>
            <p className="text-gray-600">Comments</p>
          </div>
          <div className="bg-white rounded-2xl border-2 border-lotus-200 p-6">
            <CreditCard className="w-8 h-8 text-lotus-500 mb-3" />
            <h3 className="text-2xl font-bold text-gray-800 mb-1">0</h3>
            <p className="text-gray-600">Purchases</p>
          </div>
        </div>

        {/* My Bookings */}
        <div className="bg-white rounded-2xl border-2 border-sand-200 p-8">
          <h2 className="text-2xl font-serif font-bold text-gray-800 mb-6">
            My Bookings
          </h2>
          {bookings.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg mb-4">No bookings yet</p>
              <Link
                href="/soul-sessions"
                className="inline-block px-6 py-3 rounded-full bg-gradient-to-r from-lotus-500 to-gold-500 text-white font-semibold hover:shadow-lg transition-all"
              >
                Browse Soul Sessions
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border-2 border-sand-200 rounded-xl p-6 hover:shadow-md transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {booking.session.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {booking.session.type} • ${booking.session.price}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {new Date(booking.scheduledDate).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        booking.status === 'CONFIRMED'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
