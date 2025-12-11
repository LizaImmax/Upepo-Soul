import Link from 'next/link';
import { Wind, Heart, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-sand-50 to-lotus-50 border-t border-sand-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 group mb-4">
              <Wind className="w-8 h-8 text-gold-500" />
              <span className="text-2xl font-serif font-bold text-gold-500">
                Upepo Soul
              </span>
            </Link>
            <p className="text-gray-600 max-w-md mb-4">
              A sacred space for inner growth, healing, and spiritual connection. 
              Breathe, return to your center, and reconnect with who you are becoming.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Heart className="w-4 h-4 text-red-400" />
              <span>Made with love for your soul journey</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-orchid-700 mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/soul-notes" className="text-gray-600 hover:text-gold-600 transition-colors">
                  Soul Notes
                </Link>
              </li>
              <li>
                <Link href="/guided-practices" className="text-gray-600 hover:text-gold-600 transition-colors">
                  Guided Practices
                </Link>
              </li>
              <li>
                <Link href="/soul-sessions" className="text-gray-600 hover:text-gold-600 transition-colors">
                  Soul Sessions
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-gray-600 hover:text-gold-600 transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-orchid-700 mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-600 mb-4">
              Receive soul notes and gentle reminders in your inbox.
            </p>
            <Link
              href="/newsletter"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gold-500 text-white text-sm hover:bg-orchid-500 transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Subscribe</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-sand-200 mt-12 pt-8 text-center text-sm text-gray-500">
          <p>© {currentYear} Upepo Soul. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
