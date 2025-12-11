'use client';

import { UploadButton, UploadDropzone } from '@uploadthing/react';
import type { OurFileRouter } from '@/app/api/uploadthing/core';
import { Upload } from 'lucide-react';
import toast from 'react-hot-toast';

interface FileUploadProps {
  endpoint: 'imageUploader' | 'audioUploader' | 'videoUploader';
  onUploadComplete?: (url: string) => void;
  variant?: 'button' | 'dropzone';
}

export default function FileUpload({ 
  endpoint, 
  onUploadComplete,
  variant = 'button' 
}: FileUploadProps) {
  const handleUploadComplete = (res: any) => {
    if (res && res[0]?.url) {
      toast.success('Upload complete!');
      onUploadComplete?.(res[0].url);
    }
  };

  const handleUploadError = (error: Error) => {
    toast.error(`Upload failed: ${error.message}`);
  };

  if (variant === 'dropzone') {
    return (
      <UploadDropzone<OurFileRouter, typeof endpoint>
        endpoint={endpoint}
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
        appearance={{
          container: 'border-2 border-dashed border-orchid-300 rounded-2xl bg-orchid-50/50 hover:bg-orchid-50 transition-colors',
          uploadIcon: 'text-orchid-500',
          label: 'text-orchid-700 font-medium',
          allowedContent: 'text-orchid-600 text-sm',
          button: 'bg-gradient-to-r from-orchid-500 to-lotus-500 text-white ut-ready:bg-orchid-600 ut-uploading:bg-orchid-400',
        }}
      />
    );
  }

  return (
    <UploadButton<OurFileRouter, typeof endpoint>
      endpoint={endpoint}
      onClientUploadComplete={handleUploadComplete}
      onUploadError={handleUploadError}
      appearance={{
        button: 'px-6 py-3 rounded-xl bg-gradient-to-r from-orchid-500 to-lotus-500 text-white font-semibold hover:shadow-lg transition-all ut-ready:bg-orchid-600 ut-uploading:bg-orchid-400',
        container: 'flex items-center',
        allowedContent: 'hidden',
      }}
      content={{
        button({ ready, isUploading }) {
          if (isUploading) return 'Uploading...';
          if (ready) return (
            <span className="flex items-center space-x-2">
              <Upload className="w-4 h-4" />
              <span>Upload</span>
            </span>
          );
          return 'Loading...';
        },
      }}
    />
  );
}
