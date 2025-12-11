import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from 'react-hot-toast';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { Providers } from '@/components/Providers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Upepo Soul - Your Journey Inward",
  description: "A sacred space for inner growth, healing, and spiritual connection. Reconnect with yourself through guided practices, soulful reflections, and abundant wisdom.",
  keywords: ["meditation", "mindfulness", "spiritual growth", "inner peace", "healing", "breathwork", "soul journey"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-br from-sand-50 via-moonlit-50 to-lotus-50`}
      >
        <Providers>
          <Navigation />
          {children}
          <Footer />
          <Toaster position="bottom-right" />
        </Providers>
      </body>
    </html>
  );
}
