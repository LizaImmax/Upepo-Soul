import Stripe from 'stripe';

// Use a dummy key for build time if not set
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build';

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2025-11-17.clover',
  typescript: true,
});
