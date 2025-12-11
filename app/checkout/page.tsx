'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2, CheckCircle, Calendar, DollarSign, Tag } from 'lucide-react';
import Link from 'next/link';

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const type = searchParams.get('type'); // 'session', 'practice', or 'membership'
  const itemId = searchParams.get('itemId');
  const title = searchParams.get('title');
  const price = searchParams.get('price');

  useEffect(() => {
    if (status === 'unauthenticated') {
      // Redirect to sign-in with return URL
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.href)}`);
    }
  }, [status, router]);

  const handleCheckout = async () => {
    if (!type || !itemId || !price) {
      setError('Missing checkout information');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          itemId,
          price: parseFloat(price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Checkout failed');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-lotus-600" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <div className="bg-white rounded-3xl shadow-xl border-2 border-sand-200 p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-lotus-400 to-gold-400 mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-serif font-bold mb-2 bg-gradient-to-r from-lotus-600 to-gold-600 bg-clip-text text-transparent">
            Complete Your Booking
          </h1>
          <p className="text-gray-600">
            You're one step away from your transformation
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-sand-50 rounded-2xl p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <Tag className="w-5 h-5 text-lotus-600 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">{decodeURIComponent(title || '')}</div>
                <div className="text-sm text-gray-600 capitalize">{type} Booking</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-sand-200">
              <div className="flex items-center space-x-2 text-gray-600">
                <DollarSign className="w-5 h-5" />
                <span className="font-medium">Total</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">${price}</span>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <button
          onClick={handleCheckout}
          disabled={loading}
          className="w-full py-4 px-6 rounded-full bg-gradient-to-r from-lotus-500 to-gold-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Proceed to Payment</span>
            </>
          )}
        </button>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            🔒 Secure checkout powered by Stripe. Your payment information is encrypted and secure.
          </p>
        </div>

        {/* Back Link */}
        <div className="mt-8 text-center">
          <Link
            href="/soul-sessions"
            className="text-sm text-gray-600 hover:text-lotus-600 transition-colors"
          >
            ← Back to Soul Sessions
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-lotus-600" />
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}
