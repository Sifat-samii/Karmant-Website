'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import showsData from '@/content/media/shows.json'

// Interface for videos with show metadata
interface VideoWithMetadata {
  title: string
  url: string
  type: string
  showId: string
  showTitle: string
  showDate: string
  showYear: number
  showThumbnail?: string
  isExternal?: boolean
}

// Collect all videos from all shows with metadata
const getAllVideos = (): VideoWithMetadata[] => {
  const allVideos: VideoWithMetadata[] = []
  
  showsData.forEach(show => {
    const showYear = new Date(show.date).getFullYear()
    
    // Add embeddable videos
    if (show.videos && show.videos.length > 0) {
      show.videos.forEach((video: any) => {
        allVideos.push({
          title: video.title,
          url: video.url,
          type: video.type,
          showId: show.id,
          showTitle: show.title,
          showDate: show.date,
          showYear: showYear,
          showThumbnail: show.thumbnail,
          isExternal: false,
        })
      })
    }
    
    // Add external videos (non-embeddable)
    if ((show as any).externalVideos && (show as any).externalVideos.length > 0) {
      (show as any).externalVideos.forEach((video: any) => {
        allVideos.push({
          title: video.title,
          url: video.url,
          type: 'youtube',
          showId: show.id,
          showTitle: show.title,
          showDate: show.date,
          showYear: showYear,
          showThumbnail: show.thumbnail,
          isExternal: true,
        })
      })
    }
  })
  
  // Sort by show date (newest first)
  return allVideos.sort((a, b) => {
    return new Date(b.showDate).getTime() - new Date(a.showDate).getTime()
  })
}

// Get shows with videos, grouped by year
const getShowsByYear = () => {
  const showsWithVideos = showsData
    .filter(show => {
      const hasEmbeddableVideos = show.videos && show.videos.length > 0
      const hasExternalVideos = (show as any).externalVideos && (show as any).externalVideos.length > 0
      return hasEmbeddableVideos || hasExternalVideos
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const grouped: Record<number, typeof showsWithVideos> = {}
  showsWithVideos.forEach(show => {
    const year = new Date(show.date).getFullYear()
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(show)
  })
  
  return grouped
}

// Extract YouTube video ID from URL
const getYouTubeVideoId = (url: string): string | null => {
  const match = url.match(/(?:youtube\.com\/embed\/|youtu\.be\/|youtube\.com\/watch\?v=)([^&\n?#]+)/)
  return match ? match[1] : null
}

// Get YouTube thumbnail URL
const getYouTubeThumbnail = (url: string): string => {
  const videoId = getYouTubeVideoId(url)
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
  return ''
}

export default function VideosPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set())
  const prevFilterRef = useRef<string>('all')
  
  const allVideos = getAllVideos()
  const showsByYear = getShowsByYear()
  const years = Object.keys(showsByYear).map(Number).sort((a, b) => b - a)

  // Filter videos based on selected filter
  const filteredVideos = useMemo(() => {
    if (selectedFilter === 'all') {
      return allVideos
    }
    return allVideos.filter(video => video.showId === selectedFilter)
  }, [selectedFilter, allVideos])

  // Scroll to first video when show filter is selected (only on filter change, not on initial load)
  useEffect(() => {
    // Only scroll if filter actually changed (not on initial mount)
    if (prevFilterRef.current !== selectedFilter && selectedFilter !== 'all' && filteredVideos.length > 0) {
      const scrollToFirstVideo = () => {
        const firstVideoElement = document.getElementById(`video-${selectedFilter}`)
        if (firstVideoElement) {
          // Check if element is actually rendered and has dimensions
          const rect = firstVideoElement.getBoundingClientRect()
          if (rect.width === 0 && rect.height === 0) {
            return false // Element not yet rendered
          }

          // Use requestAnimationFrame for better timing
          requestAnimationFrame(() => {
            // Calculate accurate offset accounting for fixed header
            const headerOffset = 100 // Adjust based on your header height
            const elementTop = firstVideoElement.offsetTop
            const offsetPosition = elementTop - headerOffset
            
            // Use scrollIntoView for more reliable scrolling
            firstVideoElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            })
            
            // Fine-tune with manual scroll for precise positioning
            setTimeout(() => {
              const currentScroll = window.pageYOffset || document.documentElement.scrollTop
              const targetScroll = elementTop - headerOffset
              
              if (Math.abs(currentScroll - targetScroll) > 10) {
                window.scrollTo({
                  top: Math.max(0, targetScroll),
                  behavior: 'smooth'
                })
              }
            }, 100)
          })
          
          return true
        }
        return false
      }

      // Wait for next frame to ensure DOM is updated
      requestAnimationFrame(() => {
        // Try scrolling with multiple retries and increasing delays
        const attemptScroll = (retries = 5, delay = 100) => {
          if (scrollToFirstVideo()) {
            return
          }
          if (retries > 0) {
            setTimeout(() => attemptScroll(retries - 1, delay + 50), delay)
          }
        }

        // Start with initial delay to ensure DOM is ready
        setTimeout(() => {
          if (!scrollToFirstVideo()) {
            attemptScroll()
          }
        }, 100)
      })
    }
    
    // Update previous filter ref
    prevFilterRef.current = selectedFilter
  }, [selectedFilter, filteredVideos])

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // Toggle year expansion
  const toggleYear = (year: number) => {
    const newExpanded = new Set(expandedYears)
    if (newExpanded.has(year)) {
      newExpanded.delete(year)
    } else {
      newExpanded.add(year)
    }
    setExpandedYears(newExpanded)
  }

  // Expand all years by default
  useEffect(() => {
    setExpandedYears(new Set(years))
  }, [])

  // Scroll to top on page reload
  useEffect(() => {
    // Check if page was reloaded (not a normal navigation)
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    if (navigation && navigation.type === 'reload') {
      window.scrollTo({
        top: 0,
        behavior: 'instant'
      })
    }
  }, [])

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background Image - Fixed and Full Page */}
      <div 
        className="fixed inset-0 bg-top bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(/images/482092638_1177497837714538_7463511424547364812_n.jpg)',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          zIndex: 0,
        }}
      />
      {/* Dark Overlay */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.75)',
          zIndex: 1,
        }}
      />
      {/* Vignette Effect */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 85%, rgba(0,0,0,0.95) 100%)',
          zIndex: 2,
        }}
      />
      {/* Horizontal Fadeout */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)',
          zIndex: 3,
        }}
      />
      {/* Vertical Fadeout */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.95) 95%, black 100%)',
          zIndex: 4,
        }}
      />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Back to Home - Top */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="relative text-center mb-0 overflow-hidden">
          <div className="relative z-10 pb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-0 font-display uppercase tracking-tight">
              Videos
            </h1>
          </div>
        </div>

        {/* Rehearsal Videos */}
        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red uppercase tracking-wider text-center mb-6">
            Rehearsal Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Violator - Futurephobia (cover)', src: '/Videos/Futurephobia - Violator cover [790524607187244].mp4', ratio: '9 / 16' },
              { title: 'General Destroyer', src: '/Videos/General Destroyer [760665620350369].mp4', ratio: '9 / 16' },
              { title: 'Havok - Afterburner (Cover)', src: '/Videos/Havok - Afterburner [791429790446741].mp4', ratio: '9 / 16' },
            ].map((item) => (
              <div key={item.src} className="bg-black/30 border-2 border-metal-gray hover:border-metal-red transition-colors duration-200">
                <div className="relative w-full overflow-hidden bg-metal-darker" style={{ aspectRatio: item.ratio }}>
                  <video
                    src={item.src}
                    controls
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
                <div className="px-4 py-3 text-center">
                  <p className="text-metal-light font-bold uppercase tracking-wider text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className="lg:col-span-1">
            <div 
              className="bg-black/30 border-2 border-metal-gray p-6 sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto custom-scrollbar"
              style={{
                scrollbarWidth: 'thin',
                scrollbarColor: 'rgba(220, 38, 38, 0.4) transparent',
              }}
            >
              <h2 className="text-xl font-bold text-metal-red mb-4 uppercase tracking-wider">
                Filter by Show
              </h2>
              
              {/* All Videos Button */}
              <button
                onClick={() => setSelectedFilter('all')}
                className={`w-full text-left px-4 py-3 mb-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedFilter === 'all'
                    ? 'bg-metal-red text-white'
                    : 'bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white'
                }`}
                type="button"
              >
                All Videos ({allVideos.length})
              </button>

              {/* Tree/Folder Structure */}
              <div className="space-y-2">
                {years.map((year) => {
                  const yearShows = showsByYear[year] || []
                  const isExpanded = expandedYears.has(year)
                  const yearVideoCount = yearShows.reduce((sum, show) => {
                    return sum + (show.videos?.length || 0) + ((show as any).externalVideos?.length || 0)
                  }, 0)

                  return (
                    <div key={year} className="border-b border-metal-gray/30 pb-2">
                      {/* Year Header */}
                      <button
                        onClick={() => toggleYear(year)}
                        className="w-full text-left flex items-center justify-between px-2 py-2 text-sm font-bold text-metal-light hover:text-metal-red transition-colors uppercase tracking-wider"
                        type="button"
                      >
                        <div className="flex items-center gap-2">
                          <svg
                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          <span>{year}</span>
                          <span className="text-xs opacity-60">({yearVideoCount + (yearShows.reduce((sum, show) => sum + ((show as any).externalVideos?.length || 0), 0))})</span>
                        </div>
                      </button>

                      {/* Shows under Year */}
                      {isExpanded && (
                        <div className="ml-6 mt-2 space-y-1">
                          {yearShows.map((show) => {
                            const showDate = new Date(show.date)
                            const formattedDate = showDate.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })
                            
                            return (
                              <button
                                key={show.id}
                                onClick={() => setSelectedFilter(show.id)}
                                className={`w-full text-left px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                                  selectedFilter === show.id
                                    ? 'bg-metal-red text-white'
                                    : 'bg-black/20 border border-metal-gray/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red'
                                }`}
                                type="button"
                              >
                                <div className="flex flex-col">
                                  <span className="leading-tight">{show.title}</span>
                                  <span className={`text-xs font-normal normal-case tracking-normal mt-0.5 ${
                                    selectedFilter === show.id ? 'opacity-80' : 'opacity-60'
                                  }`}>
                                    {formattedDate} • {(show.videos?.length || 0) + ((show as any).externalVideos?.length || 0)} videos
                                  </span>
                                </div>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="lg:col-span-3">
            {filteredVideos.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-metal-light text-xl">No videos available.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-metal-light text-sm uppercase tracking-wider">
                    Showing {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'}
                    {selectedFilter !== 'all' && (
                      <span className="ml-2 text-metal-red">
                        • {filteredVideos[0]?.showTitle}
                      </span>
                    )}
                  </p>
                </div>
                <div className="space-y-8">
                  {filteredVideos.map((video, idx) => {
                    const isYouTube = video.type === 'youtube'
                    const isFacebook = video.type === 'facebook'
                    const isExternal = video.isExternal
                    // Add ID to first video of each show when filtered
                    const isFirstOfShow = idx === 0 && selectedFilter !== 'all'
                    
                    return (
                      <div
                        key={`${video.showId}-${idx}`}
                        id={isFirstOfShow ? `video-${selectedFilter}` : undefined}
                        className="group relative overflow-hidden bg-black/30 border-2 border-metal-gray hover:border-metal-red transition-all duration-300"
                      >
                        {/* Video Player */}
                        <div className="relative w-full aspect-video overflow-hidden bg-metal-darker">
                          {isExternal ? (
                            <div className="relative w-full h-full flex items-center justify-center">
                              {/* Thumbnail Image Background */}
                              {video.showThumbnail && (
                                <Image
                                  src={video.showThumbnail}
                                  alt={video.showTitle}
                                  fill
                                  className="object-cover"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 66vw, 50vw"
                                />
                              )}
                              {/* Dark Overlay for better contrast */}
                              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/50 transition-colors duration-300" />
                              {/* Play Button and Text */}
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="relative z-10 flex flex-col items-center gap-4 p-8 hover:opacity-90 transition-opacity"
                              >
                                <div className="bg-white/90 hover:bg-white text-black rounded-full p-6 transition-all duration-200 hover:scale-110">
                                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                  </svg>
                                </div>
                                <div className="text-center">
                                  <p className="text-metal-light font-bold uppercase tracking-wider mb-3 text-xs opacity-80">Watch on YouTube</p>
                                  <p className="text-metal-light font-bold text-lg md:text-xl uppercase tracking-wider">{video.title}</p>
                                </div>
                              </a>
                            </div>
                          ) : isYouTube ? (
                            <iframe
                              src={video.url}
                              title={video.title}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute top-0 left-0 w-full h-full"
                            />
                          ) : isFacebook ? (
                            <div className="relative w-full h-full flex items-center justify-center bg-metal-darker">
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-4 p-8 hover:opacity-80 transition-opacity"
                              >
                                <div className="bg-white/90 hover:bg-white text-black rounded-full p-6 transition-all duration-200 hover:scale-110">
                                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                                <div className="text-center">
                                  <p className="text-metal-light font-bold uppercase tracking-wider mb-2">Watch on Facebook</p>
                                  <p className="text-metal-light opacity-75 text-sm">{video.title}</p>
                                </div>
                              </a>
                            </div>
                          ) : (
                            <div className="w-full h-full bg-metal-darker flex items-center justify-center">
                              <a
                                href={video.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-4 p-8 hover:opacity-80 transition-opacity"
                              >
                                <div className="bg-white/90 hover:bg-white text-black rounded-full p-6 transition-all duration-200 hover:scale-110">
                                  <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                                <p className="text-metal-light font-bold uppercase tracking-wider">{video.title}</p>
                              </a>
                            </div>
                          )}
                        </div>

                         {/* Video Info */}
                         <div className="px-6 py-4 text-center">
                           <p className="text-base font-bold text-metal-light mb-1 uppercase tracking-tight group-hover:text-metal-red transition-colors">
                             {video.showTitle}
                           </p>
                           <p className="text-sm text-metal-light opacity-75">
                             {new Date(video.showDate).toLocaleDateString('en-US', {
                               year: 'numeric',
                               month: 'long',
                               day: 'numeric'
                             })}
                           </p>
                         </div>

                        {/* Hover Accent Line */}
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Back to Home - Bottom */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>

      {/* Scroll to Top Button - Thrash Metal Style */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Scroll to top"
          type="button"
        >
          <div className="relative bg-metal-darker border-2 border-metal-red hover:border-metal-red/80 p-3 transition-all duration-300 transform hover:scale-105 hover:shadow-md hover:shadow-metal-red/20">
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-metal-red opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
            
            {/* Arrow Icon */}
            <div className="relative flex items-center justify-center">
              <svg 
                className="w-6 h-6 text-metal-red group-hover:text-metal-red/80 transition-colors" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M5 10l7-7m0 0l7 7m-7-7v18" 
                />
              </svg>
            </div>
            
            {/* Corner accents for aggressive look */}
            <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-metal-red opacity-50"></div>
            <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-metal-red opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-metal-red opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-metal-red opacity-50"></div>
          </div>
        </button>
      )}
    </div>
  )
}
