import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const session = await auth()

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const soulNotes = await prisma.soulNote.findMany({
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

    return NextResponse.json(soulNotes);
  } catch (error) {
    console.error('Error fetching soul notes:', error);
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
    const { title, slug, excerpt, content, coverImage, theme, tags, published, featured } = body;

    // Validate required fields
    if (!title || !slug || !content) {
      return NextResponse.json(
        { error: 'Title, slug, and content are required' },
        { status: 400 }
      );
    }

    // Check if slug already exists
    const existing = await prisma.soulNote.findUnique({
      where: { slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A soul note with this slug already exists' },
        { status: 400 }
      );
    }

    // Create soul note
    const soulNote = await prisma.soulNote.create({
      data: {
        title,
        slug,
        excerpt: excerpt || null,
        content,
        coverImage: coverImage || null,
        theme: theme || null,
        tags: tags || '',
        published: published || false,
        featured: featured || false,
        authorId: session.user!.id!,
      },
    });

    return NextResponse.json(soulNote, { status: 201 });
  } catch (error) {
    console.error('Error creating soul note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
