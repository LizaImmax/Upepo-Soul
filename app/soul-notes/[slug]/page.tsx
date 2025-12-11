import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft, Heart, Share2 } from 'lucide-react';
import prisma from '@/lib/prisma';
import CommentSection from '@/components/soul/CommentSection';

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

interface PageProps {
  params: {
    slug: string;
  };
}

async function getSoulNote(slug: string) {
  try {
    const soulNote = await prisma.soulNote.findUnique({
      where: { slug },
      include: {
        _count: {
          select: { comments: true },
        },
      },
    });
    return soulNote;
  } catch (error) {
    return null;
  };
}

// OLD Mock data - now using real database query
const mockSoulNote = {
  id: '1',
  title: 'Today, breathe into your becoming',
  slug: 'breathe-into-your-becoming',
  content: `
You are allowed to rest.

You are allowed to realign.

Your journey is unfolding exactly as it should.

---

Sometimes we forget that becoming is not a race. It's not about how fast we move or how much we achieve in a day. It's about the small, quiet moments where we choose ourselves—where we choose to pause, to breathe, to listen to what our soul is telling us.

Today, I want you to know: **you don't have to have it all figured out.**

You don't have to be perfect, polished, or "further along" than you are. You're exactly where you need to be. And that's not just okay—it's beautiful.

## The Power of the Pause

In a world that constantly tells us to go faster, do more, be more—the pause is revolutionary.

When you pause, you create space.

Space to feel. Space to heal. Space to remember who you are beneath all the noise.

**This is where transformation happens.**

Not in the doing, but in the being.
Not in the rushing, but in the returning.

## A Practice for Today

Take a moment right now. Place your hand on your heart. Feel it beating. Feel yourself breathing.

Say this to yourself:

*"I am allowed to rest."*
*"I am allowed to realign."*
*"I am exactly where I need to be."*

Repeat it as many times as you need.

Let it sink in. Let it soften the edges of your worry. Let it remind you that you are held, you are guided, and you are becoming—one breath at a time.

---

With love,
Your soul already knows the way. Trust it.
  `,
  excerpt: 'You are allowed to rest. You are allowed to realign. Your journey is unfolding exactly as it should.',
  coverImage: null,
  theme: 'Stillness',
  tags: ['mindfulness', 'presence', 'self-compassion'],
  author: {
    name: 'Upepo Soul',
    image: null,
  },
  createdAt: new Date('2025-12-10'),
};

export default async function SoulNotePage({ params }: PageProps) {
  const note = await getSoulNote(params.slug);

  if (!note) {
    notFound();
  }

  return (
    <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-8">
        <Link
          href="/soul-notes"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-orchid-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Soul Notes</span>
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="px-4 py-1 rounded-full bg-orchid-100 text-orchid-700 text-sm">
              {note.theme}
            </div>
            <div className="flex items-center text-sm text-gray-500 space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(note.createdAt)}</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
            {note.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {(typeof note.tags === 'string' ? JSON.parse(note.tags) : note.tags || []).map((tag: string) => (
              <span key={tag} className="flex items-center space-x-1 text-sm text-gray-500 px-3 py-1 rounded-full bg-sand-100">
                <Tag className="w-3 h-3" />
                <span>{tag}</span>
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between border-y border-sand-200 py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orchid-400 to-lotus-400 flex items-center justify-center text-white font-semibold">
                U
              </div>
              <div>
                <p className="font-medium text-gray-900">Upepo Soul</p>
                <p className="text-sm text-gray-500">Soul Guide</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-sand-200 hover:border-orchid-300 hover:text-orchid-600 transition-all">
                <Heart className="w-4 h-4" />
                <span className="text-sm">Save</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm border border-sand-200 hover:border-orchid-300 hover:text-orchid-600 transition-all">
                <Share2 className="w-4 h-4" />
                <span className="text-sm">Share</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-6 text-lg">
            {note.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim() === '') return null;
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-serif font-bold mt-12 mb-4 text-gray-900">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return (
                  <p key={index} className="font-semibold text-gray-900">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                return (
                  <p key={index} className="italic text-orchid-700 font-serif text-xl">
                    {paragraph.replace(/\*/g, '')}
                  </p>
                );
              }
              if (paragraph === '---') {
                return <hr key={index} className="my-8 border-sand-200" />;
              }
              return (
                <p key={index} className="mb-6">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Reflection Prompt */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-orchid-50 to-lotus-50 border border-orchid-200">
          <h3 className="text-xl font-serif font-bold mb-4 text-gray-900">
            Reflection Prompt
          </h3>
          <p className="text-gray-700 mb-6">
            Where in your life do you need to soften? What would it look like to give yourself permission to rest and realign today?
          </p>
          <Link
            href="/community"
            className="inline-flex items-center space-x-2 text-orchid-600 hover:text-lotus-600 font-medium transition-colors"
          >
            <span>Share your reflection in the community</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </article>

      {/* Comments Section */}
      <div className="max-w-4xl mx-auto mt-12">
        <CommentSection contentType="soulNote" contentId={note.id} />
      </div>
    </div>
  );
}
