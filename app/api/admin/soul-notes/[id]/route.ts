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
    const soulNote = await prisma.soulNote.findUnique({
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

    if (!soulNote) {
      return NextResponse.json({ error: 'Soul note not found' }, { status: 404 });
    }

    return NextResponse.json(soulNote);
  } catch (error) {
    console.error('Error fetching soul note:', error);
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
    const { title, slug, excerpt, content, coverImage, theme, tags, published, featured } = body;

    // Check if soul note exists
    const existing = await prisma.soulNote.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Soul note not found' }, { status: 404 });
    }

    // Check if slug is taken by another soul note
    if (slug !== existing.slug) {
      const slugTaken = await prisma.soulNote.findUnique({
        where: { slug },
      });

      if (slugTaken) {
        return NextResponse.json(
          { error: 'A soul note with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update soul note
    const soulNote = await prisma.soulNote.update({
      where: { id },
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
      },
    });

    return NextResponse.json(soulNote);
  } catch (error) {
    console.error('Error updating soul note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();

    if (!session || !session.user || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Check if soul note exists
    const existing = await prisma.soulNote.findUnique({
      where: { id: params.id },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Soul note not found' }, { status: 404 });
    }

    // Delete soul note (comments will cascade delete due to onDelete: Cascade)
    await prisma.soulNote.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Soul note deleted successfully' });
  } catch (error) {
    console.error('Error deleting soul note:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
