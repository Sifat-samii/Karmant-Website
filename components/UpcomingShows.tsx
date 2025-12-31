import Link from 'next/link'
import showsData from '@/content/shows.json'

export default function UpcomingShows() {
  const upcomingShows = showsData.upcoming.slice(0, 3)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading text-metal-red">Upcoming Shows</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {upcomingShows.map((show) => (
            <div key={show.id} className="card p-6">
              <div className="mb-4">
                <p className="text-metal-red font-bold text-lg mb-2">
                  {new Date(show.date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
                <h3 className="text-xl font-bold text-metal-light mb-1">{show.city}</h3>
                <p className="text-metal-light">{show.venue}</p>
                {show.support && (
                  <p className="text-sm text-metal-light mt-2 opacity-75">{show.support}</p>
                )}
              </div>
              {show.ticketUrl && (
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary w-full text-center block"
                >
                  Tickets
                </a>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Link href="/tour" className="btn-secondary">
            View All Shows
          </Link>
        </div>
      </div>
    </section>
  )
}

