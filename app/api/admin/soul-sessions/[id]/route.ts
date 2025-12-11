import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const soulSession = await prisma.soulSession.findUnique({
      where: { id },
      include: {
        bookings: true,
      },
    });

    if (!soulSession) {
      return NextResponse.json({ error: 'Soul session not found' }, { status: 404 });
    }

    return NextResponse.json(soulSession);
  } catch (error) {
    console.error('Error fetching soul session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const {
      title,
      description,
      type,
      duration,
      price,
      capacity,
      isRecurring,
    } = body;

    const existing = await prisma.soulSession.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Soul session not found' }, { status: 404 });
    }

    const soulSession = await prisma.soulSession.update({
      where: { id },
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

    return NextResponse.json(soulSession);
  } catch (error) {
    console.error('Error updating soul session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const existing = await prisma.soulSession.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Soul session not found' }, { status: 404 });
    }

    await prisma.soulSession.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Soul session deleted successfully' });
  } catch (error) {
    console.error('Error deleting soul session:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
