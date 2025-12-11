'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/soul-notes', label: 'Soul Notes' },
    { href: '/guided-practices', label: 'Guided Practices' },
    { href: '/soul-sessions', label: 'Soul Sessions' },
    { href: '/community', label: 'Community' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Image 
              src="/upepo-soul-logo.png" 
              alt="Upepo Soul" 
              width={40} 
              height={40}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="text-2xl font-serif font-bold text-gold-500">
              Upepo Soul
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-orchid-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/signin"
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gold-500 text-white hover:bg-orchid-500 transition-all"
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-sand-100 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-sand-200 animate-slide-up">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-4 py-2 rounded-lg hover:bg-sand-50 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/auth/signin"
              className="flex items-center justify-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-gold-500 to-orchid-500 text-white"
              onClick={() => setIsOpen(false)}
            >
              <User className="w-4 h-4" />
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
