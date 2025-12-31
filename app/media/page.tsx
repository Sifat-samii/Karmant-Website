import { Metadata } from 'next'
import VideoGallery from '@/components/VideoGallery'
import PhotoGallery from '@/components/PhotoGallery'

export const metadata: Metadata = {
  title: 'Media | Karmant',
  description: 'Videos and photos from Karmant',
}

export default function MediaPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="section-heading text-metal-red">Media</h1>
        
        <VideoGallery />
        <PhotoGallery />
      </div>
    </div>
  )
}

