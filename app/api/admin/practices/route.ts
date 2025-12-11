import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const practices = await prisma.practice.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(practices);
  } catch (error) {
    console.error('Error fetching practices:', error);
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
      slug,
      description,
      type,
      duration,
      difficulty,
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

    // Validate required fields
    if (!title || !slug || !description || !type || !duration) {
      return NextResponse.json(
        { error: 'Title, slug, description, type, and duration are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.practice.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A practice with this slug already exists' },
        { status: 400 }
      );
    }

    // Create practice
    const practice = await prisma.practice.create({
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
        authorId: session.user!.id!,
      },
    });

    return NextResponse.json(practice, { status: 201 });
  } catch (error) {
    console.error('Error creating practice:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
