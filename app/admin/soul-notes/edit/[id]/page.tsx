'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

export default function EditSoulNotePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    coverImage: '',
    theme: '',
    tags: '',
    published: false,
    featured: false,
  });

  useEffect(() => {
    // Fetch soul note data
    fetch(`/api/admin/soul-notes/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast.error(data.error);
          router.push('/admin/soul-notes');
        } else {
          setFormData({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt || '',
            content: data.content,
            coverImage: data.coverImage || '',
            theme: data.theme || '',
            tags: data.tags || '',
            published: data.published,
            featured: data.featured,
          });
          setFetching(false);
        }
      })
      .catch(() => {
        toast.error('Failed to load soul note');
        router.push('/admin/soul-notes');
      });
  }, [params.id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/admin/soul-notes/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update soul note');
      }

      toast.success('Soul Note updated successfully!');
      router.push('/admin/soul-notes');
    } catch (error: any) {
      toast.error(error.message || 'Failed to update soul note');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading soul note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/soul-notes"
          className="p-2 rounded-lg hover:bg-sand-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-gold-600 to-orchid-600 bg-clip-text text-transparent">
            Edit Soul Note
          </h1>
          <p className="text-gray-600 mt-2">
            Update your wisdom and insights
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-2xl border-2 border-sand-200 p-8 space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-gold-500 focus:outline-none text-lg"
              placeholder="Enter soul note title..."
            />
          </div>

          {/* Slug */}
          <div>
            <label htmlFor="slug" className="block text-sm font-semibold text-gray-700 mb-2">
              Slug *
            </label>
            <input
              id="slug"
              type="text"
              required
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-gold-500 focus:outline-none"
              placeholder="url-friendly-slug"
            />
            <p className="text-sm text-gray-500 mt-1">
              URL: /soul-notes/{formData.slug || 'your-slug'}
            </p>
          </div>

          {/* Excerpt */}
          <div>
            <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-700 mb-2">
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-gold-500 focus:outline-none"
              rows={2}
              placeholder="Brief summary for preview..."
            />
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-semibold text-gray-700 mb-2">
              Content * (Markdown supported)
            </label>
            <textarea
              id="content"
              required
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-gold-500 focus:outline-none font-mono text-sm"
              rows={20}
              placeholder="Write your soul note content in markdown..."
            />
          </div>

          {/* Cover Image */}
          <div>
            <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-700 mb-2">
              Cover Image URL
            </label>
            <input
              id="coverImage"
              type="text"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-gold-500 focus:outline-none"
              placeholder="https://..."
            />
          </div>

          {/* Theme & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="theme" className="block text-sm font-semibold text-gray-700 mb-2">
                Theme
              </label>
              <input
                id="theme"
                type="text"
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-gold-500 focus:outline-none"
                placeholder="e.g., Stillness, Abundance, Healing"
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-semibold text-gray-700 mb-2">
                Tags
              </label>
              <input
                id="tags"
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-gold-500 focus:outline-none"
                placeholder="mindfulness,meditation,healing"
              />
              <p className="text-sm text-gray-500 mt-1">Comma-separated</p>
            </div>
          </div>

          {/* Checkboxes */}
          <div className="flex items-center space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-sand-200 text-gold-500 focus:ring-gold-500"
              />
              <span className="text-sm font-semibold text-gray-700">Published</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-sand-200 text-orchid-500 focus:ring-orchid-500"
              />
              <span className="text-sm font-semibold text-gray-700">Featured</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-gold-500 to-orchid-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Saving...' : 'Update Soul Note'}</span>
          </button>
          <Link
            href="/admin/soul-notes"
            className="px-8 py-3 rounded-full border-2 border-sand-200 text-gray-700 font-semibold hover:bg-sand-50 transition-all"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
