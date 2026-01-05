import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tour | Karmant',
  description: 'Upcoming and past tour dates for Karmant',
}

// Dummy tour data
const upcomingShows = [
  {
    id: 1,
    date: '2024-06-15',
    venue: 'The Underground',
    city: 'Dhaka',
    country: 'Bangladesh',
    event: 'Thrash Metal Night',
    ticketLink: '#',
    status: 'upcoming',
  },
  {
    id: 2,
    date: '2024-07-20',
    venue: 'Rock Arena',
    city: 'Chittagong',
    country: 'Bangladesh',
    event: 'Summer Metal Fest',
    ticketLink: '#',
    status: 'upcoming',
  },
  {
    id: 3,
    date: '2024-08-10',
    venue: 'Metal Temple',
    city: 'Sylhet',
    country: 'Bangladesh',
    event: 'Underground Showcase',
    ticketLink: '#',
    status: 'upcoming',
  },
]

const pastShows = [
  {
    id: 4,
    date: '2024-03-15',
    venue: 'Live Stage',
    city: 'Dhaka',
    country: 'Bangladesh',
    event: 'Spring Metal Festival',
    status: 'past',
  },
  {
    id: 5,
    date: '2024-02-10',
    venue: 'Concert Hall',
    city: 'Rajshahi',
    country: 'Bangladesh',
    event: 'Thrash Attack',
    status: 'past',
  },
  {
    id: 6,
    date: '2023-12-20',
    venue: 'The Pit',
    city: 'Dhaka',
    country: 'Bangladesh',
    event: 'Year End Metal Bash',
    status: 'past',
  },
  {
    id: 7,
    date: '2023-11-05',
    venue: 'Metal Zone',
    city: 'Chittagong',
    country: 'Bangladesh',
    event: 'Underground Thrash Night',
    status: 'past',
  },
]

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }
  return date.toLocaleDateString('en-US', options)
}

const getDateParts = (dateString: string) => {
  const date = new Date(dateString)
  const day = date.getDate()
  const month = date.toLocaleDateString('en-US', { month: 'short' })
  const year = date.getFullYear()
  return { day, month, year }
}

export default function TourPage() {
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
          <div className="relative z-10 pb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-0 font-display uppercase tracking-tight">
              Tour
            </h1>
          </div>
        </div>

        {/* Upcoming Shows */}
        {upcomingShows.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
              Upcoming Shows
            </h2>
            <div className="space-y-6">
              {upcomingShows.map((show) => {
                const { day, month, year } = getDateParts(show.date)
                return (
                  <div
                    key={show.id}
                    className="bg-black/30 border-2 border-metal-red/50 hover:border-metal-red transition-all duration-300 p-6"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Date Badge */}
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center bg-metal-red/20 border-2 border-metal-red px-4 py-3 min-w-[80px]">
                          <span className="text-metal-red font-bold text-2xl leading-none">{day}</span>
                          <span className="text-metal-light text-xs uppercase tracking-wider">{month}</span>
                          <span className="text-metal-light text-xs">{year}</span>
                        </div>
                        
                        {/* Show Info */}
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-metal-light uppercase tracking-tight mb-1">
                            {show.event}
                          </h3>
                          <p className="text-metal-light opacity-75 text-sm">
                            {show.venue} • {show.city}, {show.country}
                          </p>
                        </div>
                      </div>

                      {/* Ticket Button */}
                      <div>
                        <a
                          href={show.ticketLink}
                          className="inline-block bg-metal-red text-white hover:bg-metal-red/80 transition-colors duration-200 px-6 py-3 text-sm font-bold uppercase tracking-wider"
                        >
                          Get Tickets
                        </a>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Past Shows */}
        {pastShows.length > 0 && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
              Past Shows
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pastShows.map((show) => {
                const { day, month, year } = getDateParts(show.date)
                return (
                  <div
                    key={show.id}
                    className="bg-black/20 border border-metal-gray/50 hover:border-metal-gray transition-all duration-300 p-5"
                  >
                    <div className="flex items-start gap-4">
                      {/* Date Badge */}
                      <div className="flex flex-col items-center justify-center bg-metal-gray/30 border border-metal-gray px-3 py-2 min-w-[60px]">
                        <span className="text-metal-light font-bold text-xl leading-none">{day}</span>
                        <span className="text-metal-light text-xs uppercase tracking-wider">{month}</span>
                        <span className="text-metal-light text-xs">{year}</span>
                      </div>
                      
                      {/* Show Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-metal-light uppercase tracking-tight mb-1">
                          {show.event}
                        </h3>
                        <p className="text-metal-light opacity-60 text-sm">
                          {show.venue} • {show.city}, {show.country}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* No Shows Message */}
        {upcomingShows.length === 0 && pastShows.length === 0 && (
          <div className="text-center py-20">
            <p className="text-metal-light text-xl">No tour dates available at the moment.</p>
            <p className="text-metal-light opacity-75 mt-2">Check back soon for updates!</p>
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
    </div>
  )
}
