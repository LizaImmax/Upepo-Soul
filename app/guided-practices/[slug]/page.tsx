import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Clock, DollarSign, Play } from 'lucide-react';
import prisma from '@/lib/prisma';
import AudioPlayer from '@/components/soul/AudioPlayer';
import VideoPlayer from '@/components/soul/VideoPlayer';
import CommentSection from '@/components/soul/CommentSection';

interface PageProps {
  params: {
    slug: string;
  };
}

async function getPractice(slug: string) {
  try {
    const practice = await prisma.practice.findUnique({
      where: { slug },

    });
    return practice;
  } catch (error) {
    return null;
  }
}

export default async function PracticeDetailPage({ params }: PageProps) {
  const practice = await getPractice(params.slug);

  if (!practice) {
    notFound();
  }

  const tags = practice.tags?.split(',').filter(Boolean) || [];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-sand-50 via-moonlit-50 to-lotus-50">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/guided-practices"
          className="inline-flex items-center space-x-2 text-gray-600 hover:text-orchid-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Guided Practices</span>
        </Link>

        {/* Practice Header */}
        <div className="bg-white rounded-3xl border-2 border-sand-200 p-8 md:p-12 mb-8 shadow-lg">
          {practice.coverImage && (
            <img
              src={practice.coverImage}
              alt={practice.title}
              className="w-full h-64 object-cover rounded-2xl mb-8"
            />
          )}

          <div className="mb-6">
            {practice.theme && (
              <span className="inline-block px-4 py-1 rounded-full bg-orchid-100 text-orchid-700 text-sm mb-4">
                {practice.theme}
              </span>
            )}
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
              {practice.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600 text-sm mb-6">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>{practice.duration} minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <Play className="w-4 h-4" />
                <span>{practice.type}</span>
              </div>
              {practice.isPremium && (
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4" />
                  <span>${practice.price}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-lg text-gray-700 mb-8">{practice.description}</p>

          {/* Media Player */}
          {practice.audioUrl && (
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                Audio Practice
              </h2>
              <AudioPlayer url={practice.audioUrl} title={practice.title} />
            </div>
          )}

          {practice.videoUrl && (
            <div className="mb-8">
              <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                Video Practice
              </h2>
              <VideoPlayer url={practice.videoUrl} />
            </div>
          )}

          {/* Instructions section - field doesn't exist in schema, using description instead */}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="pt-8 border-t border-sand-200">
              <div className="flex items-center flex-wrap gap-2">
                {tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-sand-100 text-gray-700 text-sm"
                  >
                    {tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Purchase CTA */}
          {practice.isPremium && (
            <div className="mt-8 pt-8 border-t border-sand-200">
              <div className="bg-gradient-to-r from-lotus-50 to-orchid-50 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-2">
                  Access This Premium Practice
                </h3>
                <p className="text-gray-600 mb-6">
                  Unlock unlimited access to this transformative practice
                </p>
                <button className="px-8 py-3 rounded-full bg-gradient-to-r from-lotus-500 to-gold-500 text-white font-semibold hover:shadow-lg transition-all">
                  Get Access for ${practice.price}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <CommentSection contentType="practice" contentId={practice.id} />
      </div>
    </div>
  );
}
