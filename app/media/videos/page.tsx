import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import videosData from '@/content/media/videos.json'

export const metadata: Metadata = {
  title: 'Videos | Media | Karmant',
  description: 'Music videos, rehearsal footage, and playthroughs from Karmant',
}

const videoTypes = [
  { label: 'All', value: 'all' },
  { label: 'Music Videos', value: 'music-video' },
  { label: 'Rehearsals', value: 'rehearsal' },
  { label: 'Playthroughs', value: 'playthrough' },
]

export default function VideosPage() {
  const allVideoTypes = Array.from(new Set(videosData.map(v => v.type)))
  
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
              Videos
            </h1>
            <p className="text-xl text-metal-light opacity-75 max-w-2xl mx-auto">
              Music videos, rehearsal footage, and playthroughs
            </p>
          </div>
        </div>

        {/* Videos Grid */}
        {videosData.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-metal-light text-xl">No videos available yet.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videosData.map((video) => (
              <div
                key={video.id}
                className="group relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300"
              >
                {/* Video Thumbnail */}
                <div className="relative w-full aspect-video overflow-hidden bg-metal-darker">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors pointer-events-none">
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/90 hover:bg-white text-black rounded-full p-3 transition-all duration-200 hover:scale-110 pointer-events-auto"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </a>
                  </div>

                  {/* Platform Icon */}
                  {video.platform === 'facebook' && (
                    <div className="absolute top-2 right-2 bg-black/50 rounded-full p-2">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Video Content */}
                <div className="p-6 relative z-10">
                  <div className="mb-2">
                    <span className="inline-block bg-metal-red text-white px-2 py-1 text-xs font-bold uppercase tracking-wider mb-2">
                      {video.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-metal-light mb-2 uppercase tracking-tight group-hover:text-metal-red transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-metal-light opacity-75 mb-3">
                    {new Date(video.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-metal-light opacity-90 line-clamp-2">
                    {video.description}
                  </p>
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

