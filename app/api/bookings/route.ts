import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { sessionId, scheduledDate } = body;

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Check if session exists
    const soulSession = await prisma.soulSession.findUnique({
      where: { id: sessionId },
      include: {
        bookings: true,
      },
    });

    if (!soulSession) {
      return NextResponse.json({ error: 'Session not found' }, { status: 404 });
    }

    // Check capacity
    if (soulSession.bookings.length >= soulSession.capacity) {
      return NextResponse.json(
        { error: 'Session is fully booked' },
        { status: 400 }
      );
    }

    // Check if user already booked
    const existingBooking = await prisma.booking.findFirst({
      where: {
        sessionId,
        userId: session.user!.id,
        status: { not: 'CANCELLED' },
      },
    });

    if (existingBooking) {
      return NextResponse.json(
        { error: 'You have already booked this session' },
        { status: 400 }
      );
    }

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        sessionId,
        userId: session.user!.id!,
        scheduledAt: scheduledDate ? new Date(scheduledDate) : new Date(),
        status: 'CONFIRMED',
      },
      include: {
        session: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(booking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await auth();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const bookings = await prisma.booking.findMany({
      where: {
        userId: session.user!.id,
      },
      include: {
        session: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
