import Link from 'next/link'
import showsData from '@/content/media/shows.json'

export default function UpcomingShows() {
  // Get recent shows (sorted by date, newest first)
  const featuredIds = ['show-13', 'show-23', 'show-7']
  const recentShows = featuredIds
    .map(id => showsData.find(show => show.id === id))
    .filter((show): show is NonNullable<typeof show> => Boolean(show))

  const getDateParts = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.getFullYear()
    return { day, month, year }
  }

  const formatCityCountry = (venue: string) => {
    // Expect venue like "Place, City, Country" — return "City, Country"
    const parts = venue.split(',').map(p => p.trim()).filter(Boolean)
    if (parts.length >= 2) {
      const city = parts[parts.length - 2]
      const country = parts[parts.length - 1]
      return `${city}, ${country}`
    }
    return venue
  }

  return (
    <section className="pt-14 pb-24 px-4 sm:px-6 lg:px-8 relative">
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
          <h2 className="text-4xl md:text-5xl font-bold text-metal-red mb-3 font-display uppercase tracking-tight">
            Live Assaults
          </h2>
          <p className="text-metal-light/70 text-sm uppercase tracking-[0.2em]">
            Featured
          </p>
        </div>
        
        {/* Shows Grid */}
        {recentShows.length > 0 ? (
          <>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {recentShows.map((show) => {
                const { day, month, year } = getDateParts(show.date)
                return (
                  <Link
                    key={show.id}
                    href={`/media/shows/${show.id}`}
                    className="group relative overflow-hidden bg-black/40 border border-metal-gray/50 hover:border-metal-red/70 transition-all duration-300 shadow-[0_18px_45px_rgba(0,0,0,0.35)] p-6"
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-70" style={{ background: 'radial-gradient(circle at 20% 20%, rgba(255,0,0,0.12), transparent 40%)' }} />
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,0,0,0.08), transparent 55%)' }} />

                    <div className="relative flex flex-col gap-4 h-full">
                      <div className="flex items-center gap-4">
                        <div className="flex flex-col items-center justify-center bg-metal-red/20 border border-metal-red px-4 py-3 min-w-[70px]">
                          <span className="text-metal-red font-bold text-xl leading-none">{day}</span>
                          <span className="text-metal-light text-xs uppercase tracking-wider">{month}</span>
                          <span className="text-metal-light text-[11px]">{year}</span>
                        </div>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-metal-red/60 to-transparent" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-lg font-bold text-metal-light uppercase tracking-tight group-hover:text-metal-red transition-colors leading-tight">
                          {show.title}
                        </h3>
                        <p className="text-metal-light/75 text-xs">
                          {formatCityCountry(show.venue)}
                        </p>
                      </div>

                      <div className="mt-auto">
                        <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-metal-light/80 group-hover:text-metal-red transition-colors">
                          <span className="h-px w-8 bg-metal-red/70" />
                          <span>View details</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
            
            {/* View All Shows Button */}
            <div className="text-center">
              <Link 
                href="/media/shows"
                className="inline-block bg-metal-red text-white hover:bg-metal-red/80 transition-colors duration-200 px-8 py-3 text-sm font-bold uppercase tracking-wider"
              >
                View All Shows
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <p className="text-metal-light text-xl mb-4">No upcoming shows scheduled.</p>
            <p className="text-metal-light opacity-75 text-sm">Check back soon for updates!</p>
          </div>
        )}
      </div>
    </section>
  )
}
