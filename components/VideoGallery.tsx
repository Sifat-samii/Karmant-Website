'use client'

import { useState } from 'react'
import mediaData from '@/content/media.json'

type VideoItem = {
  id: string
  title: string
}

export default function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const videos = (mediaData.videos || []) as VideoItem[]

  return (
    <section className="mb-20">
      <h2 className="text-3xl font-bold text-metal-red mb-8 text-center">Videos</h2>
      
      {videos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-metal-light mb-2">No videos available yet.</p>
          <p className="text-metal-light text-sm opacity-75">
            Add YouTube video IDs in <code className="text-metal-red">/content/media.json</code>
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video) => (
          <div key={video.id} className="card overflow-hidden">
            <div className="relative aspect-video">
              <img
                src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                alt={video.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="360"%3E%3Crect fill="%231a1a1a" width="640" height="360"/%3E%3Ctext fill="%23dc2626" font-family="Arial" font-size="24" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EVIDEO%3C/text%3E%3C/svg%3E'
                }}
              />
              <button
                onClick={() => setSelectedVideo(video.id)}
                className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/70 transition-colors"
                aria-label={`Play ${video.title}`}
              >
                <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-metal-light">{video.title}</h3>
            </div>
          </div>
        ))}
        </div>
      )}

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="relative w-full max-w-4xl aspect-video">
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-metal-red transition-colors"
              aria-label="Close video"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
              title="Video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}
