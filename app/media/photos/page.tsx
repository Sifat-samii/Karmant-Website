'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import showsData from '@/content/media/shows.json'

// Interface for photos with show metadata
interface PhotoWithMetadata {
  src: string
  alt: string
  showId: string
  showTitle: string
  showDate: string
  showYear: number
}

// Collect all photos from all shows with metadata
const getAllPhotos = (): PhotoWithMetadata[] => {
  const allPhotos: PhotoWithMetadata[] = []
  
  showsData.forEach(show => {
    if (show.photos && show.photos.length > 0) {
      const showYear = new Date(show.date).getFullYear()
      show.photos.forEach(photo => {
        allPhotos.push({
          src: photo.src,
          alt: photo.alt,
          showId: show.id,
          showTitle: show.title,
          showDate: show.date,
          showYear: showYear,
        })
      })
    }
  })
  
  // Sort by show date (newest first)
  return allPhotos.sort((a, b) => {
    return new Date(b.showDate).getTime() - new Date(a.showDate).getTime()
  })
}

// Get shows with photos, grouped by year
const getShowsByYear = () => {
  const showsWithPhotos = showsData
    .filter(show => show.photos && show.photos.length > 0)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  const grouped: Record<number, typeof showsWithPhotos> = {}
  showsWithPhotos.forEach(show => {
    const year = new Date(show.date).getFullYear()
    if (!grouped[year]) {
      grouped[year] = []
    }
    grouped[year].push(show)
  })
  
  return grouped
}

// Featured band photos
const featuredPhotos = [
  { src: '/images/photos/Band Photo/bp (1).jpg', alt: 'Karmant Band Photo 1' },
  { src: '/images/photos/Band Photo/bp (3).jpg', alt: 'Karmant Band Photo 3' },
  { src: '/images/photos/Band Photo/bp (4).jpg', alt: 'Karmant Band Photo 4' },
  { src: '/images/photos/Band Photo/bp (5).jpg', alt: 'Karmant Band Photo 5' },
  { src: '/images/photos/Band Photo/bp (6).jpg', alt: 'Karmant Band Photo 6' },
  { src: '/images/photos/Band Photo/bp (7).jpg', alt: 'Karmant Band Photo 7' },
  { src: '/images/photos/Band Photo/bp (8).jpg', alt: 'Karmant Band Photo 8' },
  { src: '/images/photos/Band Photo/bp (9).jpg', alt: 'Karmant Band Photo 9' },
  { src: '/images/photos/Band Photo/bp (10).jpg', alt: 'Karmant Band Photo 10' },
  { src: '/images/photos/Band Photo/bp (11).jpg', alt: 'Karmant Band Photo 11' },
  { src: '/images/photos/Band Photo/bp (12).jpg', alt: 'Karmant Band Photo 12' },
  { src: '/images/photos/Band Photo/bp (13).jpg', alt: 'Karmant Band Photo 13' },
  { src: '/images/photos/Band Photo/bp (14).jpg', alt: 'Karmant Band Photo 14' },
  { src: '/images/photos/Band Photo/bp (15).jpg', alt: 'Karmant Band Photo 15' },
]

export default function PhotosPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const [expandedYears, setExpandedYears] = useState<Set<number>>(new Set())
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0)
  const prevFilterRef = useRef<string>('all')
  
  const allPhotos = getAllPhotos()
  const showsByYear = getShowsByYear()
  const years = Object.keys(showsByYear).map(Number).sort((a, b) => b - a)

  // Filter photos based on selected filter
  const filteredPhotos = useMemo(() => {
    if (selectedFilter === 'all') {
      return allPhotos
    }
    return allPhotos.filter(photo => photo.showId === selectedFilter)
  }, [selectedFilter, allPhotos])

  // Get photos for the modal (based on current filter) - include featured photos at the start when showing all
  const modalPhotos = useMemo(() => {
    if (selectedFilter === 'all') {
      // When showing all, include featured photos first
      const featuredWithMetadata = featuredPhotos.map(p => ({
        src: p.src,
        alt: p.alt,
        showId: 'featured',
        showTitle: 'Band Photoshoot',
        showDate: '',
        showYear: new Date().getFullYear()
      }))
      return [...featuredWithMetadata, ...filteredPhotos]
    }
    return filteredPhotos
  }, [selectedFilter, filteredPhotos])

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

  // Scroll to first photo when show filter is selected (only on filter change, not on initial load)
  useEffect(() => {
    // Only scroll if filter actually changed (not on initial mount)
    if (prevFilterRef.current !== selectedFilter && selectedFilter !== 'all' && filteredPhotos.length > 0) {
      const scrollToFirstPhoto = () => {
        const firstPhotoElement = document.getElementById(`photo-${selectedFilter}`)
        if (firstPhotoElement) {
          // Check if element is actually rendered and has dimensions
          const rect = firstPhotoElement.getBoundingClientRect()
          if (rect.width === 0 && rect.height === 0) {
            return false // Element not yet rendered
          }

          // Use requestAnimationFrame for better timing
          requestAnimationFrame(() => {
            // Calculate accurate offset accounting for fixed header
            const headerOffset = 100 // Adjust based on your header height
            const elementTop = firstPhotoElement.offsetTop
            const offsetPosition = elementTop - headerOffset
            
            // Use scrollIntoView for more reliable scrolling
            firstPhotoElement.scrollIntoView({
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
          if (scrollToFirstPhoto()) {
            return
          }
          if (retries > 0) {
            setTimeout(() => attemptScroll(retries - 1, delay + 50), delay)
          }
        }

        // Start with initial delay to ensure DOM is ready
        setTimeout(() => {
          if (!scrollToFirstPhoto()) {
            attemptScroll()
          }
        }, 100)
      })
    }
    
    // Update previous filter ref
    prevFilterRef.current = selectedFilter
  }, [selectedFilter, filteredPhotos])

  // Auto-play slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeaturedIndex((prev) => (prev + 1) % featuredPhotos.length)
    }, 4000) // Change slide every 4 seconds

    return () => clearInterval(interval)
  }, [])

  // Navigate slideshow
  const nextFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % featuredPhotos.length)
  }

  const prevFeatured = () => {
    setCurrentFeaturedIndex((prev) => (prev - 1 + featuredPhotos.length) % featuredPhotos.length)
  }

  const goToSlide = (index: number) => {
    setCurrentFeaturedIndex(index)
  }

  // Modal functions
  const openModal = (index: number) => {
    // If viewing filtered photos, adjust index
    if (selectedFilter !== 'all') {
      setSelectedPhoto(index)
    } else {
      setSelectedPhoto(index)
    }
  }

  const closeModal = () => {
    setSelectedPhoto(null)
  }

  const nextPhoto = () => {
    if (selectedPhoto !== null && selectedPhoto < modalPhotos.length - 1) {
      setSelectedPhoto(selectedPhoto + 1)
    }
  }

  const prevPhoto = () => {
    if (selectedPhoto !== null && selectedPhoto > 0) {
      setSelectedPhoto(selectedPhoto - 1)
    }
  }

  // Keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhoto === null) return
      
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowRight' && selectedPhoto < modalPhotos.length - 1) {
        setSelectedPhoto(selectedPhoto + 1)
      } else if (e.key === 'ArrowLeft' && selectedPhoto > 0) {
        setSelectedPhoto(selectedPhoto - 1)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, modalPhotos.length])

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background Image - Fixed and Full Page */}
      <div 
        className="fixed inset-0 bg-top bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(/images/482093493_1177794414351547_208647928897630965_n.jpg)',
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
              Photos
            </h1>
          </div>
        </div>

        {/* Featured Photos Slideshow */}
        <div className="mb-16">
          <div className="mb-8 text-center">
            <span className="inline-block bg-black/30 text-metal-light px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 border-metal-red">
              Featured
            </span>
          </div>
          
          {/* Slideshow Container */}
          <div className="relative max-w-5xl mx-auto">
            <div 
              className="relative aspect-[16/10] overflow-hidden bg-metal-darker border-2 border-metal-gray group"
            >
              {/* Slides */}
              <div className="relative w-full h-full">
                {featuredPhotos.map((photo, idx) => (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-opacity duration-700 ${
                      idx === currentFeaturedIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 90vw, 80vw"
                      priority={idx === currentFeaturedIndex}
                    />
                    <div 
                      className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors duration-300 cursor-pointer"
                      onClick={() => {
                        if (selectedFilter !== 'all') {
                          setSelectedFilter('all')
                          setTimeout(() => {
                            openModal(idx)
                          }, 100)
                        } else {
                          openModal(idx)
                        }
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevFeatured}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
                aria-label="Previous photo"
                type="button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={nextFeatured}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 z-20 opacity-0 group-hover:opacity-100"
                aria-label="Next photo"
                type="button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {featuredPhotos.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      idx === currentFeaturedIndex
                        ? 'bg-metal-red w-8'
                        : 'bg-white/40 hover:bg-white/60 w-2'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                    type="button"
                  />
                ))}
              </div>

              {/* Photo Counter */}
              <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 text-sm font-bold uppercase tracking-wider z-20">
                {currentFeaturedIndex + 1} / {featuredPhotos.length}
              </div>

            </div>
          </div>
        </div>

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
              
              {/* All Photos Button */}
              <button
                onClick={() => setSelectedFilter('all')}
                className={`w-full text-left px-4 py-3 mb-4 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  selectedFilter === 'all'
                    ? 'bg-metal-red text-white'
                    : 'bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white'
                }`}
                type="button"
              >
                All Photos ({allPhotos.length})
              </button>

              {/* Tree/Folder Structure */}
              <div className="space-y-2">
                {years.map((year) => {
                  const yearShows = showsByYear[year] || []
                  const isExpanded = expandedYears.has(year)
                  const yearPhotoCount = yearShows.reduce((sum, show) => sum + (show.photos?.length || 0), 0)

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
                          <span className="text-xs opacity-60">({yearPhotoCount})</span>
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
                                    {formattedDate} • {show.photos?.length || 0} photos
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

          {/* Photos Grid */}
          <div className="lg:col-span-3">
            {filteredPhotos.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-metal-light text-xl">No photos available.</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <p className="text-metal-light text-sm uppercase tracking-wider">
                    Showing {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
                    {selectedFilter !== 'all' && (
                      <span className="ml-2 text-metal-red">
                        • {filteredPhotos[0]?.showTitle}
                      </span>
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filteredPhotos.map((photo, idx) => {
                    // Add ID to first photo of each show when filtered
                    const isFirstOfShow = idx === 0 && selectedFilter !== 'all'
                    return (
                    <div
                      key={`${photo.showId}-${idx}`}
                      id={isFirstOfShow ? `photo-${selectedFilter}` : undefined}
                      onClick={() => openModal(idx)}
                      className="relative aspect-square overflow-hidden bg-metal-darker border border-metal-gray/50 hover:border-metal-red transition-all duration-300 group cursor-pointer"
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      {/* Show label overlay on hover */}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-xs text-metal-light font-bold uppercase tracking-wider">
                          {photo.showTitle}
                        </p>
                      </div>
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

      {/* Photo Modal */}
      {selectedPhoto !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          {/* Close Button */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white hover:text-metal-red transition-colors z-10"
            aria-label="Close"
            type="button"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Button */}
          {selectedPhoto > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                prevPhoto()
              }}
              className="absolute left-4 text-white hover:text-metal-red transition-colors z-10"
              aria-label="Previous"
              type="button"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {selectedPhoto < modalPhotos.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation()
                nextPhoto()
              }}
              className="absolute right-4 text-white hover:text-metal-red transition-colors z-10"
              aria-label="Next"
              type="button"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image */}
          <div
            className="relative max-w-7xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={modalPhotos[selectedPhoto].src}
              alt={modalPhotos[selectedPhoto].alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          {/* Photo Info */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center z-10">
            <p className="text-white text-sm mb-1">
              {selectedPhoto + 1} / {modalPhotos.length}
            </p>
            <p className="text-metal-light text-xs uppercase tracking-wider">
              {modalPhotos[selectedPhoto].showTitle}
            </p>
          </div>
        </div>
      )}

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
