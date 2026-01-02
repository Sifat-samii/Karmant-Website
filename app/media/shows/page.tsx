'use client'

import { useState, useMemo } from 'react'
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
  const years = getYears(sortedShows)

  // Filter shows by selected year
  const filteredShows = useMemo(() => {
    if (!selectedYear) return sortedShows
    return sortedShows.filter(show => {
      const showYear = new Date(show.date).getFullYear().toString()
      return showYear === selectedYear
    })
  }, [selectedYear])

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
              Shows
            </h1>
            <p className="text-xl text-metal-light opacity-75 max-w-2xl mx-auto">
              Live performances, concert videos, and event photos
            </p>
          </div>
        </div>

        {/* Year Filter */}
        <div className="mb-16 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedYear(null)}
            className={`px-5 py-2.5 font-bold uppercase tracking-wider text-xs transition-all duration-200 ${
              selectedYear === null
                ? 'bg-metal-red text-white border-2 border-metal-red shadow-lg shadow-metal-red/30'
                : 'bg-black/30 border-2 border-metal-gray text-metal-light hover:border-metal-red hover:text-metal-red hover:bg-black/50'
            }`}
          >
            All
          </button>
          {years.map((year) => (
            <button
              key={year}
              onClick={() => setSelectedYear(year.toString())}
              className={`px-5 py-2.5 font-bold uppercase tracking-wider text-xs transition-all duration-200 ${
                selectedYear === year.toString()
                  ? 'bg-metal-red text-white border-2 border-metal-red shadow-lg shadow-metal-red/30'
                  : 'bg-black/30 border-2 border-metal-gray text-metal-light hover:border-metal-red hover:text-metal-red hover:bg-black/50'
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

                return allShows.map(({ show, year }, index) => {
                  const { month, day, year: showYear } = formatDate(show.date)
                  const isEven = index % 2 === 0

                  return (
                    <div key={show.id} className="relative mb-16 md:mb-24">
                      {/* Timeline Node */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-metal-red rounded-full border-4 border-metal-darker z-10 hidden md:block" />

                      {/* Show Card - Alternating Sides */}
                      <div className={`flex flex-col md:flex-row items-start gap-4 ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}>
                        {/* Show Card */}
                        <Link 
                          href={`/media/shows/${show.id}`}
                          className={`w-full md:w-[calc(50%-2rem)] group block ${isEven ? 'md:ml-auto' : 'md:mr-auto'} cursor-pointer`}
                        >
                          <div className="relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300">
                            {/* Show Thumbnail */}
                            {show.thumbnail && (
                              <div className="relative w-full overflow-hidden bg-metal-darker">
                                <div className="relative w-full" style={{ aspectRatio: 'auto' }}>
                                  <Image
                                    src={show.thumbnail}
                                    alt={show.title}
                                    width={800}
                                    height={600}
                                    className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Show Details */}
                            <div className="p-6">
                              {/* Date - Positioned outside image, above title */}
                              <div className="mb-3">
                                <div className="inline-block bg-metal-red text-white px-3 py-1.5 font-bold uppercase tracking-wider text-xs">
                                  {month.toUpperCase()} {day}, {year}
                                </div>
                              </div>

                              <h3 className="text-2xl md:text-3xl font-bold text-metal-light mb-2 uppercase tracking-tight group-hover:text-metal-red transition-colors">
                                {show.title}
                              </h3>
                              <p className="text-metal-red font-bold uppercase text-sm tracking-wider flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      </div>
    </div>
  )
}
