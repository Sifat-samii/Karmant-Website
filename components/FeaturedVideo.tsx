'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import showsData from '@/content/media/shows.json'

export default function FeaturedVideo() {
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Get the first show with a video
  const featuredShow = showsData.find(show => show.videos && show.videos.length > 0)
  const featuredVideo = featuredShow?.videos?.[0]
  
  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/.*[?&]v=([^&\n?#]+)/
    ]
    for (const pattern of patterns) {
      const match = url.match(pattern)
      if (match && match[1]) {
        return match[1]
      }
    }
    return null
  }
  
  const videoId = featuredVideo?.url ? getYouTubeVideoId(featuredVideo.url) : null

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)
    return () => clearTimeout(timer)
  }, [])

  if (!videoId) {
    return null
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center">
      {/* Background with fadeout effects */}
      <div className="absolute inset-0 bg-black">
        {/* Horizontal Fadeout */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)'
          }}
        />
        {/* Vertical Fadeout */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.7) 100%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-metal-red mb-4 font-display uppercase tracking-tight">
            Featured Video
          </h2>
          <div className="w-24 h-1 bg-metal-red mx-auto mb-6"></div>
          {featuredShow && (
            <p className="text-metal-light opacity-75 text-sm uppercase tracking-wider">
              {featuredShow.title}
            </p>
          )}
        </div>
        
        {/* Video Container */}
        <div className="max-w-5xl mx-auto">
          <div className="relative aspect-video overflow-hidden bg-metal-darker border-2 border-metal-red/50 hover:border-metal-red transition-all duration-300">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center z-10 bg-metal-darker">
                <div className="text-metal-light uppercase tracking-wider">Loading video...</div>
              </div>
            )}
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`}
              title={featuredVideo?.title || 'Featured Video'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              onLoad={() => setIsLoaded(true)}
            />
          </div>
          
          {/* View More Videos Link */}
          <div className="text-center mt-8">
            <Link 
              href="/media/videos"
              className="inline-block bg-black/30 border border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red transition-all duration-200 px-6 py-2 text-sm font-bold uppercase tracking-wider"
            >
              View All Videos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
