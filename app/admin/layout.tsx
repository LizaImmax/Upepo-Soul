import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  FileText, 
  Headphones, 
  Calendar, 
  Users, 
  MessageSquare,
  Settings,
  LogOut,
  Wind
} from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
    redirect('/auth/signin');
  }

  const navItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/soul-notes', icon: FileText, label: 'Soul Notes' },
    { href: '/admin/practices', icon: Headphones, label: 'Practices' },
    { href: '/admin/soul-sessions', icon: Calendar, label: 'Soul Sessions' },
    { href: '/admin/users', icon: Users, label: 'Users' },
    { href: '/admin/community', icon: MessageSquare, label: 'Community' },
    { href: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r-2 border-sand-200 shadow-lg">
        {/* Logo */}
        <div className="p-6 border-b-2 border-sand-200">
          <Link href="/" className="flex items-center space-x-3">
            <Wind className="w-8 h-8 text-gold-500" />
            <div>
              <span className="block text-xl font-serif font-bold text-gold-600">
                Upepo Soul
              </span>
              <span className="block text-xs text-gray-500">Admin Dashboard</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gold-50 hover:text-gold-600 transition-all group"
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t-2 border-sand-200">
          <div className="mb-3">
            <p className="text-sm font-medium text-gray-700">{session.user?.name}</p>
            <p className="text-xs text-gray-500">{session.user?.email}</p>
          </div>
          <Link
            href="/api/auth/signout"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
