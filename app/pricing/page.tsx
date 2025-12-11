import Link from 'next/link';
import { Check, Crown, Sparkles, Heart, Zap } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Free Explorer',
      price: 0,
      period: 'forever',
      description: 'Perfect for starting your soul journey',
      features: [
        'Access to all Soul Notes',
        'Free guided practices',
        'Community forum access',
        'Weekly newsletter',
        'Soul check-ins',
      ],
      cta: 'Get Started',
      href: '/auth/signup',
      gradient: 'from-sand-400 to-sand-600',
      bgGradient: 'from-sand-50 to-sand-100',
      borderColor: 'border-sand-300',
      icon: Heart,
    },
    {
      name: 'Soul Seeker',
      price: 27,
      period: 'month',
      description: 'For those ready to deepen their practice',
      features: [
        'Everything in Free Explorer',
        'All premium guided practices',
        'Monthly live meditation circles',
        '10% off Soul Sessions',
        'Early access to new content',
        'Download audio practices',
        'Priority community support',
      ],
      cta: 'Start Free Trial',
      href: '/auth/signup?plan=seeker',
      gradient: 'from-orchid-500 to-lotus-500',
      bgGradient: 'from-orchid-50 to-lotus-50',
      borderColor: 'border-orchid-400',
      icon: Sparkles,
      popular: true,
    },
    {
      name: 'Soul Guide',
      price: 77,
      period: 'month',
      description: 'Complete transformation and guidance',
      features: [
        'Everything in Soul Seeker',
        'Unlimited Soul Sessions access',
        'One-on-one monthly guidance call',
        'Exclusive workshops & masterclasses',
        'Personal soul journal & insights',
        'Private community access',
        'Lifetime access to purchased content',
        '30-day money-back guarantee',
      ],
      cta: 'Transform Now',
      href: '/auth/signup?plan=guide',
      gradient: 'from-gold-500 to-amber-500',
      bgGradient: 'from-gold-50 to-amber-50',
      borderColor: 'border-gold-400',
      icon: Crown,
    },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand-50 via-moonlit-50 to-lotus-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-orchid-100 text-orchid-700 text-sm mb-6">
            Pricing
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
            Choose Your Path
          </h1>
          <p className="text-xl text-gray-600">
            Every journey is unique. Find the plan that supports your soul's evolution.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl border-2 ${plan.borderColor} bg-gradient-to-br ${plan.bgGradient} p-8 hover:shadow-2xl transition-all ${
                  plan.popular ? 'scale-105 shadow-xl' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 rounded-full bg-gradient-to-r from-orchid-500 to-lotus-500 text-white text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    {plan.price > 0 && (
                      <span className="text-gray-600 ml-2">/{plan.period}</span>
                    )}
                  </div>
                  {plan.price === 0 && (
                    <p className="text-sm text-gray-500">No credit card required</p>
                  )}
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                        plan.popular ? 'text-orchid-600' : 'text-gray-600'
                      }`} />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block w-full py-3 rounded-full font-semibold text-center transition-all ${
                    plan.popular
                      ? `bg-gradient-to-r ${plan.gradient} text-white hover:shadow-lg`
                      : 'bg-white border-2 border-gray-300 text-gray-900 hover:border-gray-400'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-serif font-bold text-center mb-8 text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white border-2 border-sand-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel anytime?
              </h3>
              <p className="text-gray-600">
                Yes! You can cancel your subscription at any time. Your access will continue until the end of your billing period.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-sand-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's included in the free trial?
              </h3>
              <p className="text-gray-600">
                The Soul Seeker plan includes a 7-day free trial with full access to all features. No credit card required to start.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-sand-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do Soul Sessions work?
              </h3>
              <p className="text-gray-600">
                Soul Sessions are live or recorded sessions you can book separately, or get unlimited access with the Soul Guide plan.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border-2 border-sand-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I switch plans later?
              </h3>
              <p className="text-gray-600">
                Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect at your next billing cycle.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-gold-500 to-orchid-500 text-white text-center">
          <Zap className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg mb-8 text-white/90">
            We're here to support your journey. Reach out and we'll help you find the perfect plan.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 rounded-full bg-white text-orchid-600 font-semibold hover:bg-gold-50 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
