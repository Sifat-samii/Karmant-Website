'use client'

import { useState } from 'react'
import ImageWithFallback from '@/components/ImageWithFallback'

// Placeholder photo data - replace with actual photos
const photos = [
  { id: '1', src: '/images/photos/photo-1.jpg', alt: 'Live performance' },
  { id: '2', src: '/images/photos/photo-2.jpg', alt: 'Band photo' },
  { id: '3', src: '/images/photos/photo-3.jpg', alt: 'Studio session' },
  { id: '4', src: '/images/photos/photo-4.jpg', alt: 'Backstage' },
  { id: '5', src: '/images/photos/photo-5.jpg', alt: 'Concert' },
  { id: '6', src: '/images/photos/photo-6.jpg', alt: 'Band members' },
]

export default function PhotoGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const selectedPhotoData = photos.find((p) => p.id === selectedPhoto)

  return (
    <section>
      <h2 className="text-3xl font-bold text-metal-red mb-8 text-center">Photos</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => setSelectedPhoto(photo.id)}
            className="relative aspect-square overflow-hidden rounded-lg group"
          >
            <ImageWithFallback
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && selectedPhotoData && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 text-white hover:text-metal-red transition-colors z-10"
            aria-label="Close photo"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="relative max-w-6xl max-h-[90vh] w-full h-full" onClick={(e) => e.stopPropagation()}>
            <ImageWithFallback
              src={selectedPhotoData.src}
              alt={selectedPhotoData.alt}
              fill
              className="object-contain"
            />
          </div>
        </div>
      )}
    </section>
  )
}

