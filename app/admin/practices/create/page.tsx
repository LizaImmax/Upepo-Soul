'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import FileUpload from '@/components/soul/FileUpload';

export default function CreatePracticePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    type: 'MEDITATION',
    duration: 5,
    difficulty: 'Beginner',
    audioUrl: '',
    videoUrl: '',
    coverImage: '',
    isPremium: false,
    price: 0,
    theme: '',
    tags: '',
    published: false,
    featured: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/practices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create practice');
      }

      toast.success('Practice created successfully!');
      router.push('/admin/practices');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create practice');
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    });
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          href="/admin/practices"
          className="p-2 rounded-lg hover:bg-sand-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-4xl font-serif font-bold bg-gradient-to-r from-orchid-600 to-lotus-600 bg-clip-text text-transparent">
            Create Practice
          </h1>
          <p className="text-gray-600 mt-2">
            Add a new guided practice
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
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none text-lg"
              placeholder="Enter practice title..."
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
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
              placeholder="url-friendly-slug"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
              rows={4}
              placeholder="Describe the practice..."
            />
          </div>

          {/* Type, Duration, Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="type" className="block text-sm font-semibold text-gray-700 mb-2">
                Type *
              </label>
              <select
                id="type"
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
              >
                <option value="MEDITATION">Meditation</option>
                <option value="BREATHWORK">Breathwork</option>
                <option value="VISUALIZATION">Visualization</option>
                <option value="MOVEMENT">Movement</option>
              </select>
            </div>
            <div>
              <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
                Duration (minutes) *
              </label>
              <input
                id="duration"
                type="number"
                required
                min="1"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                id="difficulty"
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
            </div>
          </div>

          {/* Media URLs */}
          <div className="space-y-4">
            <div>
              <label htmlFor="audioUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                Audio URL
              </label>
              <div className="flex gap-2">
                <input
                  id="audioUrl"
                  type="text"
                  value={formData.audioUrl}
                  onChange={(e) => setFormData({ ...formData, audioUrl: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
                  placeholder="https://... or upload below"
                />
              </div>
              <div className="mt-2">
                <FileUpload 
                  endpoint="audioUploader" 
                  onUploadComplete={(url) => setFormData({ ...formData, audioUrl: url })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-semibold text-gray-700 mb-2">
                Video URL
              </label>
              <div className="flex gap-2">
                <input
                  id="videoUrl"
                  type="text"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
                  placeholder="https://... or upload below"
                />
              </div>
              <div className="mt-2">
                <FileUpload 
                  endpoint="videoUploader" 
                  onUploadComplete={(url) => setFormData({ ...formData, videoUrl: url })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="coverImage" className="block text-sm font-semibold text-gray-700 mb-2">
                Cover Image URL
              </label>
              <input
                id="coverImage"
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
                placeholder="https://... or upload below"
              />
              <div className="mt-2">
                <FileUpload 
                  endpoint="imageUploader" 
                  onUploadComplete={(url) => setFormData({ ...formData, coverImage: url })}
                />
              </div>
            </div>
          </div>

          {/* Premium & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center space-x-3 cursor-pointer p-4 rounded-xl border-2 border-sand-200 hover:bg-sand-50 transition-all">
                <input
                  type="checkbox"
                  checked={formData.isPremium}
                  onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                  className="w-5 h-5 rounded border-2 border-sand-200 text-orchid-500 focus:ring-orchid-500"
                />
                <div>
                  <span className="text-sm font-semibold text-gray-700 block">Premium Content</span>
                  <span className="text-xs text-gray-500">Requires payment to access</span>
                </div>
              </label>
            </div>
            {formData.isPremium && (
              <div>
                <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-2">
                  Price ($)
                </label>
                <input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
                  placeholder="9.99"
                />
              </div>
            )}
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
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
                placeholder="e.g., Calm, Energy, Sleep"
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
                className="w-full px-4 py-3 rounded-xl border-2 border-sand-200 focus:border-orchid-500 focus:outline-none"
                placeholder="meditation,breathing,relaxation"
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
                className="w-5 h-5 rounded border-2 border-sand-200 text-orchid-500 focus:ring-orchid-500"
              />
              <span className="text-sm font-semibold text-gray-700">Publish immediately</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="w-5 h-5 rounded border-2 border-sand-200 text-lotus-500 focus:ring-lotus-500"
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
            className="flex items-center space-x-2 px-8 py-3 rounded-full bg-gradient-to-r from-orchid-500 to-lotus-500 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            <span>{loading ? 'Saving...' : 'Save Practice'}</span>
          </button>
          <Link
            href="/admin/practices"
            className="px-8 py-3 rounded-full border-2 border-sand-200 text-gray-700 font-semibold hover:bg-sand-50 transition-all"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
