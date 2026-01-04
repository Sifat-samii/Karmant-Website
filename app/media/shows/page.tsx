'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import showsData from '@/content/media/shows.json'

// Sort shows by date (newest first)
const sortedShows = [...showsData].sort((a, b) => {
  return new Date(b.date).getTime() - new Date(a.date).getTime()
})

// Get unique years from shows
const getYears = (shows: typeof showsData) => {
  const years = new Set(shows.map(show => new Date(show.date).getFullYear()))
  return Array.from(years).sort((a, b) => b - a) // Newest first
}

export default function ShowsPage() {
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [showScrollToTop, setShowScrollToTop] = useState(false)
  const years = getYears(sortedShows)
  const timelineRef = useRef<HTMLDivElement>(null)

  // Always show all shows (no filtering)
  const filteredShows = sortedShows

  // Track scroll position to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Show button if scrolled down more than 300px
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
    setSelectedYear(null) // Reset selected year when scrolling to top
  }

  // Scroll to year's shows when year is selected
  useEffect(() => {
    if (selectedYear) {
      const scrollToElement = () => {
        const yearElement = document.getElementById(`year-${selectedYear}`)
        if (yearElement) {
          const elementPosition = yearElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - 150 // Account for header and spacing
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
          return true
        }
        return false
      }

      // Try immediately, then with delays if needed
      if (!scrollToElement()) {
        setTimeout(() => {
          if (!scrollToElement()) {
            setTimeout(scrollToElement, 300)
          }
        }, 100)
      }
    }
  }, [selectedYear])

  // Scroll to year's shows
  const scrollToYear = (year: string) => {
    setSelectedYear(year)
  }

  // Group shows by year
  const showsByYear = useMemo(() => {
    const grouped: { [key: number]: typeof showsData } = {}
    filteredShows.forEach(show => {
      const year = new Date(show.date).getFullYear()
      if (!grouped[year]) {
        grouped[year] = []
      }
      grouped[year].push(show)
    })
    return grouped
  }, [filteredShows])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const month = date.toLocaleDateString('en-US', { month: 'long' })
    const day = date.getDate()
    const year = date.getFullYear()
    return { month, day, year }
  }

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background Image - Fixed and Aligned to Top */}
      <div 
        className="fixed inset-0 bg-top bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(/images/482093493_1177794414351547_208647928897630965_n.jpg)',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          zIndex: 0,
        }}
      />
      {/* Dark Overlay for Increased Opacity and Darkness */}
      <div 
        className="fixed inset-0"
        style={{
          backgroundColor: 'rgba(0,0,0,0.75)',
          zIndex: 1,
        }}
      />
      {/* Vignette Effect - Radial fadeout from edges */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 85%, rgba(0,0,0,0.95) 100%)',
          zIndex: 2,
        }}
      />
      {/* Horizontal Fadeout - Dissolve sides into black */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)',
          zIndex: 3,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Back to Home */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
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
          {/* Content */}
          <div className="relative z-10 pb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-0 font-display uppercase tracking-tight">
              Shows
            </h1>
          </div>
        </div>

        {/* Year Filter */}
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          {years.map((year) => (
            <button
              key={year}
              onClick={() => scrollToYear(year.toString())}
              className={`px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200 ${
                selectedYear === year.toString()
                  ? 'bg-metal-red text-white border-2 border-metal-red shadow-lg shadow-metal-red/30'
                  : 'bg-black/30 border-2 border-gray-400 text-metal-light hover:border-metal-red hover:text-metal-red hover:bg-black/50'
              }`}
            >
              {year}
            </button>
          ))}
        </div>

        {/* Timeline Container */}
        {filteredShows.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-metal-light text-xl opacity-75">No shows available for the selected year.</p>
          </div>
        ) : (
          <div className="relative">
            {/* Central Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-metal-red via-metal-red/50 to-transparent hidden md:block" />

            {/* Timeline Items */}
            <div className="space-y-0">
              {(() => {
                // Flatten all shows with their year info for global indexing
                let globalIndex = 0
                const allShows: Array<{ show: typeof showsData[0], year: number }> = []
                
                Object.keys(showsByYear)
                  .sort((a, b) => Number(b) - Number(a))
                  .forEach((yearStr) => {
                    const year = Number(yearStr)
                    const yearShows = showsByYear[year].sort((a, b) => {
                      return new Date(b.date).getTime() - new Date(a.date).getTime()
                    })
                    yearShows.forEach(show => {
                      allShows.push({ show, year })
                    })
                  })

                // Track which year we've seen to mark first show of each year
                const seenYears = new Set<number>()
                
                return allShows.map(({ show, year }, index) => {
                  const { month, day, year: showYear } = formatDate(show.date)
                  // Global index ensures strict alternation across ALL shows (existing and new)
                  // Even index = right side, Odd index = left side
                  const isEven = index % 2 === 0
                  
                  // Check if this is the first show of this year
                  const isFirstOfYear = !seenYears.has(year)
                  if (isFirstOfYear) {
                    seenYears.add(year)
                  }

                  return (
                    <div 
                      key={show.id} 
                      id={isFirstOfYear ? `year-${year}` : undefined}
                      className="relative mb-12 md:mb-16"
                    >
                      {/* Timeline Node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-metal-red rounded-full border-4 border-metal-darker z-10 hidden md:block" style={{ top: '0.5rem' }} />

                      {/* Connecting Line from Timeline to Date Badge */}
                      <div 
                        className="absolute hidden md:block z-5" 
                        style={{ 
                          top: 'calc(0.5rem + 0.75rem - 1px)',
                          height: '2px', 
                          backgroundColor: '#dc2626',
                          left: isEven ? 'calc(50% + 0.75rem)' : 'calc(50% - 5rem)',
                          width: isEven ? 'calc(5rem - 0.75rem)' : 'calc(5rem - 0.75rem)'
                        }} 
                      />

                      {/* Date Badge - On same side as card */}
                      <div className={`absolute z-20 hidden md:block ${
                        isEven ? 'right-[calc(50%-5rem)]' : 'left-[calc(50%-5rem)]'
                      }`} style={{ top: '0.5rem', transform: isEven ? 'translateX(100%)' : 'translateX(-100%)' }}>
                        <div className="bg-metal-red text-white px-3 py-1.5 font-bold uppercase tracking-wider text-xs whitespace-nowrap shadow-lg">
                          {month.toUpperCase()} {day}, {year}
                        </div>
                      </div>

                      {/* Show Card - Positioned below date badge, aligned with badge */}
                      <div className={`flex flex-col md:flex-row items-start ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}>
                        {/* Show Card */}
                        <Link 
                          href={`/media/shows/${show.id}`}
                          className={`w-full md:w-[calc(45%-0.975rem)] group block ${isEven ? 'md:ml-auto md:mt-[2.1625rem]' : 'md:mr-auto md:mt-[2.1625rem]'} cursor-pointer`}
                        >
                          <div className="relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300">
                            {/* Cancelled Banner - Big Ribbon Seal */}
                            {(show as any).cancelled && (
                              <div className={`absolute top-6 z-20 transform shadow-2xl ${
                                show.id === 'show-17' 
                                  ? '-left-14 -rotate-45' 
                                  : '-right-14 rotate-45'
                              }`}>
                                <div className="relative bg-red-600 text-white px-20 py-3 font-bold uppercase tracking-wider text-sm">
                                  <div className="absolute -left-2.5 top-0 bottom-0 w-2.5 bg-red-700 opacity-80"></div>
                                  <div className="absolute -right-2.5 top-0 bottom-0 w-2.5 bg-red-700 opacity-80"></div>
                                  <span className="relative z-10">CANCELLED</span>
                                </div>
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-5 border-r-5 border-t-5 border-transparent border-t-red-700"></div>
                              </div>
                            )}
                            {/* Show Thumbnail */}
                            {show.thumbnail && (
                              <div className="relative w-full overflow-hidden bg-metal-darker">
                                <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                                  <Image
                                    src={show.thumbnail}
                                    alt={show.title}
                                    width={600}
                                    height={450}
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 35vw"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Show Details */}
                            <div className="p-4">
                              {/* Date - Mobile only */}
                              <div className="mb-2 md:hidden">
                                <div className="inline-block bg-metal-red text-white px-2.5 py-1 font-bold uppercase tracking-wider text-xs">
                                  {month.toUpperCase()} {day}, {year}
                                </div>
                              </div>

                              <h3 className="text-xl md:text-2xl font-bold text-metal-light mb-2 uppercase tracking-tight group-hover:text-metal-red transition-colors">
                                {show.title}
                              </h3>
                              <p className="text-metal-red font-bold uppercase text-xs tracking-wider flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {show.venue}
                              </p>
                            </div>

                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  )
                })
              })()}
            </div>
          </div>
        )}

        {/* Back to Home - Bottom */}
        <div className="mt-16 flex items-center justify-center">
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
