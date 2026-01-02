import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import photosData from '@/content/media/photos.json'

export const metadata: Metadata = {
  title: 'Photos | Media | Karmant',
  description: 'Event photos, photoshoots, and behind-the-scenes from Karmant',
}

const photoCategories = [
  { label: 'All', value: 'all' },
  { label: 'Shows', value: 'show' },
  { label: 'Photoshoots', value: 'photoshoot' },
  { label: 'Rehearsals', value: 'rehearsal' },
  { label: 'Events', value: 'event' },
]

export default function PhotosPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative text-center mb-16 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/releases/EPs/riot.png)',
              backgroundPosition: 'center 70%',
              opacity: 0.3,
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Gradient */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 85%, black 100%)',
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 pt-20 pb-20">
            <div className="mb-4">
              <Link 
                href="/media"
                className="inline-flex items-center gap-2 text-metal-red hover:text-metal-light transition-colors text-sm uppercase tracking-wider mb-6"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Media
              </Link>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-4 font-display uppercase tracking-tight">
              Photos
            </h1>
            <p className="text-xl text-metal-light opacity-75 max-w-2xl mx-auto">
              Event photos, photoshoots, and behind-the-scenes
            </p>
          </div>
        </div>

        {/* Photos Gallery */}
        {photosData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-metal-light text-xl">No photos available yet.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {photosData.map((album) => (
              <div
                key={album.id}
                className="group relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300"
              >
                <div className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="inline-block bg-metal-red text-white px-3 py-1 text-xs font-bold uppercase tracking-wider mb-2">
                          {album.category}
                        </span>
                        <h2 className="text-3xl font-bold text-metal-light mb-2 uppercase tracking-tight">
                          {album.title}
                        </h2>
                        <p className="text-sm text-metal-light opacity-75 mb-2">
                          {new Date(album.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        {album.description && (
                          <p className="text-lg text-metal-light opacity-90 leading-relaxed">
                            {album.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Photos Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {album.photos.map((photo, idx) => (
                      <div
                        key={idx}
                        className="group/photo relative aspect-square overflow-hidden bg-metal-darker border border-metal-gray hover:border-metal-red transition-all duration-300"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          className="object-cover group-hover/photo:scale-110 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover/photo:bg-black/20 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

