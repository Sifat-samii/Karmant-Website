import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import showsData from '@/content/media/shows.json'
import { notFound } from 'next/navigation'
import PhotoGallery from '@/components/PhotoGallery'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const show = showsData.find(s => s.id === params.slug)
  
  if (!show) {
    return {
      title: 'Show Not Found | Media | Karmant',
    }
  }

  return {
    title: `${show.title} | Shows | Media | Karmant`,
    description: show.description || `Details about ${show.title} performance`,
  }
}

export default function ShowDetailPage({ params }: { params: { slug: string } }) {
  const show = showsData.find(s => s.id === params.slug)

  if (!show) {
    notFound()
  }

  const showDate = new Date(show.date)
  const month = showDate.toLocaleDateString('en-US', { month: 'long' })
  const day = showDate.getDate()
  const year = showDate.getFullYear()

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <Link 
            href="/media/shows"
            className="inline-flex items-center gap-2 text-metal-red hover:text-metal-light transition-colors text-sm uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Shows
          </Link>
        </div>

        {/* Show Poster */}
        <div className="mb-12">
          <div className="relative w-full overflow-hidden bg-metal-darker border-2 border-metal-gray">
            <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
              <Image
                src={show.thumbnail}
                alt={show.title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
                sizes="100vw"
                priority
              />
            </div>
          </div>
        </div>

        {/* Show Details - Center Aligned */}
        <div className="text-center mb-16">
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-metal-light mb-6 uppercase tracking-tight">
            {show.title}
          </h1>

          {/* Date and Location */}
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <div className="inline-block bg-metal-red text-white px-4 py-2 font-bold uppercase tracking-wider text-sm">
                {month.toUpperCase()} {day}, {year}
              </div>
              {show.id === 'show-1' && (
                <a
                  href="https://www.facebook.com/events/872383166852380/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-black/40 border border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-4 py-2 font-bold uppercase tracking-wider text-sm transition-all duration-200 hover:scale-105"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                  View Event
                </a>
              )}
            </div>
            <p className="text-metal-red font-bold uppercase text-lg tracking-wider flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {show.venue}
            </p>
          </div>

          {/* Description */}
          {show.description && (
            <p className="text-lg text-metal-light opacity-90 leading-relaxed max-w-3xl mx-auto">
              {show.description}
            </p>
          )}
        </div>

        {/* Video Section */}
        {show.id === 'show-1' && (
          <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-metal-red mb-6 uppercase tracking-wider">
              Video
            </h2>
            <div className="max-w-6xl mx-auto">
              <div className="relative w-full aspect-video overflow-hidden bg-metal-darker border-2 border-metal-gray">
                <iframe
                  src="https://www.youtube.com/embed/N5gY-HkEJIo"
                  title="Perpetual Suffering 2021"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        )}

        {/* Photos Section */}
        {show.photos && show.photos.length > 0 && (
          <PhotoGallery photos={show.photos} />
        )}

        {/* Back Button - Bottom */}
        <div className="mt-16 text-center">
          <Link 
            href="/media/shows"
            className="inline-flex items-center gap-2 text-metal-red hover:text-metal-light transition-colors text-sm uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Shows
          </Link>
        </div>
      </div>
    </div>
  )
}

