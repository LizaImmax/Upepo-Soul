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
    const practice = await prisma.practice.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!practice) {
      return NextResponse.json({ error: 'Practice not found' }, { status: 404 });
    }

    return NextResponse.json(practice);
  } catch (error) {
    console.error('Error fetching practice:', error);
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
      slug,
      description,
      type,
      duration,
      audioUrl,
      videoUrl,
      coverImage,
      isPremium,
      price,
      theme,
      tags,
      published,
      featured,
    } = body;

    const existing = await prisma.practice.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Practice not found' }, { status: 404 });
    }

    if (slug !== existing.slug) {
      const slugTaken = await prisma.practice.findUnique({
        where: { slug },
      });

      if (slugTaken) {
        return NextResponse.json(
          { error: 'A practice with this slug already exists' },
          { status: 400 }
        );
      }
    }

    const practice = await prisma.practice.update({
      where: { id },
      data: {
        title,
        slug,
        description,
        type,
        duration,
        audioUrl: audioUrl || null,
        videoUrl: videoUrl || null,
        coverImage: coverImage || null,
        isPremium: isPremium || false,
        price: isPremium ? (price || 0) : null,
        theme: theme || null,
        tags: tags || '',
        published: published || false,
        featured: featured || false,
      },
    });

    return NextResponse.json(practice);
  } catch (error) {
    console.error('Error updating practice:', error);
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
    const existing = await prisma.practice.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Practice not found' }, { status: 404 });
    }

    await prisma.practice.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Practice deleted successfully' });
  } catch (error) {
    console.error('Error deleting practice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
