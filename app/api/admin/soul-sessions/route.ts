import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const sessions = await prisma.soulSession.findMany({
      include: {
        bookings: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Error fetching soul sessions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const {
      title,
      description,
      type,
      duration,
      price,
      capacity,
      date,
      isRecurring,
    } = body;

    // Validate required fields
    if (!title || !description || !type || !duration || price === undefined || !capacity || !date) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create soul session
    const soulSession = await prisma.soulSession.create({
      data: {
        title,
        description,
        type,
        duration,
        price,
        capacity,
        isRecurring: isRecurring || false,
      },
    });

    return NextResponse.json(soulSession, { status: 201 });
  } catch (error) {
    console.error('Error creating soul session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
