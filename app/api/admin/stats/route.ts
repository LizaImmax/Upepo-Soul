import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch stats from database
    const [soulNotes, practices, sessions, users, bookings] = await Promise.all([
      prisma.soulNote.count(),
      prisma.practice.count(),
      prisma.soulSession.count(),
      prisma.user.count(),
      prisma.booking.count(),
    ]);

    // Calculate total views (placeholder - would need a views tracking system)
    const views = 0;

    return NextResponse.json({
      soulNotes,
      practices,
      sessions,
      users,
      views,
      bookings,
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
