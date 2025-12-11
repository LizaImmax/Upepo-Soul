'use client';

import Link from 'next/link';
import { XCircle, ArrowLeft, Home, HelpCircle } from 'lucide-react';

export default function CheckoutCancelPage() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand-50 via-moonlit-50 to-lotus-50">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl border-2 border-sand-200 p-12 shadow-xl text-center">
          {/* Cancel Icon */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
              <XCircle className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Cancel Message */}
          <h1 className="text-4xl font-serif font-bold mb-4 text-gray-800">
            Payment Cancelled
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Your payment was not processed. No charges were made.
          </p>

          {/* Explanation */}
          <div className="bg-sand-50 rounded-2xl p-6 mb-8 text-left">
            <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-orchid-600" />
              <span>What happened?</span>
            </h2>
            <p className="text-gray-700 mb-4">
              You cancelled the payment process before it was completed. This is completely normal and happens for many reasons:
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start space-x-2">
                <span className="text-orchid-600 mt-1">•</span>
                <span>You changed your mind</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orchid-600 mt-1">•</span>
                <span>You need more time to decide</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orchid-600 mt-1">•</span>
                <span>You wanted to review other options</span>
              </li>
            </ul>
          </div>

          {/* Reassurance Message */}
          <div className="bg-gradient-to-r from-lotus-50 to-orchid-50 rounded-2xl p-6 mb-8">
            <p className="text-gray-700 italic">
              "There's no rush on your journey. Come back whenever you're ready."
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full bg-gradient-to-r from-gold-500 to-orchid-500 text-white font-semibold hover:shadow-lg transition-all"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="flex items-center justify-center space-x-2 px-6 py-3 rounded-full border-2 border-sand-300 text-gray-700 hover:bg-sand-50 transition-all"
            >
              <Home className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>

        {/* Support Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Need help?{' '}
            <Link href="/contact" className="text-orchid-600 hover:text-orchid-700 font-semibold">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
