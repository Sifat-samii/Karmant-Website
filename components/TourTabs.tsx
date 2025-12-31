'use client'

import { useState } from 'react'

interface Show {
  id: string
  date: string
  city: string
  venue: string
  venueUrl?: string
  ticketUrl?: string
  bandsintownUrl?: string
  support?: string
  notable?: boolean
}

interface ShowsData {
  upcoming: Show[]
  past: Show[]
}

export default function TourTabs({ shows }: { shows: ShowsData }) {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const currentShows = activeTab === 'upcoming' ? shows.upcoming : shows.past

  return (
    <div>
      {/* Tabs */}
      <div className="flex justify-center mb-8 border-b border-metal-gray">
        <button
          onClick={() => setActiveTab('upcoming')}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'upcoming'
              ? 'text-metal-red border-b-2 border-metal-red'
              : 'text-metal-light hover:text-metal-red'
          }`}
        >
          Upcoming ({shows.upcoming.length})
        </button>
        <button
          onClick={() => setActiveTab('past')}
          className={`px-6 py-3 font-bold uppercase tracking-wider transition-colors ${
            activeTab === 'past'
              ? 'text-metal-red border-b-2 border-metal-red'
              : 'text-metal-light hover:text-metal-red'
          }`}
        >
          Past ({shows.past.length})
        </button>
      </div>

      {/* Shows List */}
      <div className="space-y-4">
        {activeTab === 'upcoming' && currentShows.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-metal-light text-lg mb-2">No dates announced.</p>
            <p className="text-metal-light text-sm opacity-75">Check back soon for upcoming shows.</p>
          </div>
        ) : currentShows.length === 0 ? (
          <p className="text-center text-metal-light py-12">No past shows listed.</p>
        ) : (
          currentShows.map((show) => (
            <div
              key={show.id}
              className={`card p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                show.notable ? 'border-metal-red border-2' : ''
              }`}
            >
              <div className="flex-1">
                {show.notable && (
                  <span className="inline-block bg-metal-red text-white text-xs font-bold px-2 py-1 mb-2 uppercase">
                    Notable Appearance
                  </span>
                )}
                <p className="text-metal-red font-bold text-lg mb-2">
                  {show.date.includes('-') ? formatDate(show.date) : show.date}
                </p>
                <h3 className="text-2xl font-bold text-metal-light mb-1">{show.city}</h3>
                {show.venueUrl ? (
                  <a
                    href={show.venueUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-metal-light hover:text-metal-red transition-colors"
                  >
                    {show.venue}
                  </a>
                ) : (
                  <p className="text-metal-light">{show.venue}</p>
                )}
                {show.support && (
                  <p className="text-sm text-metal-light mt-2 opacity-75">{show.support}</p>
                )}
              </div>
              <div className="flex gap-4">
                {show.ticketUrl && (
                  <a
                    href={show.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Tickets
                  </a>
                )}
                {show.bandsintownUrl && (
                  <a
                    href={show.bandsintownUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Bandsintown
                  </a>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

