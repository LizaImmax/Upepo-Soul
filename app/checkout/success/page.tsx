'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Calendar, Home, User } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sand-50 via-moonlit-50 to-lotus-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand-50 via-moonlit-50 to-lotus-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-sand-200 p-12 shadow-xl text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-serif font-bold mb-4 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your journey continues...
          </p>

          {/* Session ID */}
          {sessionId && (
            <div className="bg-sand-50 rounded-xl p-4 mb-8">
              <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
              <p className="text-xs text-gray-600 font-mono break-all">{sessionId}</p>
            </div>
          )}

          {/* What's Next */}
          <div className="bg-gradient-to-r from-orchid-50 to-lotus-50 rounded-2xl p-8 mb-8 text-left">
            <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
              What's Next?
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orchid-600 mt-0.5 flex-shrink-0" />
                <span>A confirmation email has been sent to your inbox</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orchid-600 mt-0.5 flex-shrink-0" />
                <span>Your booking details are available in your profile</span>
              </li>
              <li className="flex items-start space-x-3">
                <CheckCircle className="w-5 h-5 text-orchid-600 mt-0.5 flex-shrink-0" />
                <span>You'll receive a reminder before your session</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/profile"
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-orchid-500 text-white font-semibold hover:shadow-lg transition-all"
            >
              <User className="w-5 h-5" />
              <span>My Profile</span>
            </Link>
            <Link
              href="/soul-sessions"
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-sand-300 text-gray-700 hover:bg-sand-50 transition-all"
            >
              <Calendar className="w-5 h-5" />
              <span>Book More</span>
            </Link>
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-sand-300 text-gray-700 hover:bg-sand-50 transition-all"
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
          </div>
        </div>

        {/* Additional Message */}
        <div className="text-center mt-8">
          <p className="text-gray-600 italic">
            "In every ending, there is a new beginning. Welcome to your journey."
          </p>
        </div>
      </div>
    </div>
  );
}
