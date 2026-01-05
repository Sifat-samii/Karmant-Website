import Link from 'next/link'
import showsData from '@/content/media/shows.json'

export default function UpcomingShows() {
  // Get recent shows (sorted by date, newest first)
  const recentShows = showsData
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3)

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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-metal-red mb-4 font-display uppercase tracking-tight">
            Recent Shows
          </h2>
          <div className="w-24 h-1 bg-metal-red mx-auto"></div>
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
                    className="group bg-black/30 border-2 border-metal-gray/50 hover:border-metal-red transition-all duration-300 p-6"
                  >
                    {/* Date Badge */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex flex-col items-center justify-center bg-metal-red/20 border-2 border-metal-red px-4 py-3 min-w-[70px]">
                        <span className="text-metal-red font-bold text-xl leading-none">{day}</span>
                        <span className="text-metal-light text-xs uppercase tracking-wider">{month}</span>
                        <span className="text-metal-light text-xs">{year}</span>
                      </div>
                      
                      {/* Show Info */}
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-metal-light uppercase tracking-tight mb-1 group-hover:text-metal-red transition-colors">
                          {show.title}
                        </h3>
                        <p className="text-metal-light opacity-75 text-xs">
                          {show.venue}
                        </p>
                      </div>
                    </div>
                    
                    {/* Hover accent line */}
                    <div className="h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
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
