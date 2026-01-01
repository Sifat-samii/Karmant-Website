'use client'

interface Track {
  name: string
  release: string
  releaseSlug: string
  year: number
  link?: string
}

interface TopTracksProps {
  tracks: Track[]
}

export default function TopTracks({ tracks }: TopTracksProps) {
  if (tracks.length === 0) {
    return null
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading text-metal-red mb-8">Top Tracks</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tracks.map((track, index) => (
            <div
              key={`${track.releaseSlug}-${track.name}-${index}`}
              className="p-4 bg-metal-gray border border-metal-gray hover:border-metal-red transition-colors group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-bold text-metal-light group-hover:text-metal-red transition-colors truncate">
                    {track.name}
                  </p>
                  <p className="text-sm text-metal-light opacity-75 truncate">
                    {track.release} ({track.year})
                  </p>
                </div>
                <span className="text-xs text-metal-light opacity-50 ml-2 flex-shrink-0">
                  #{index + 1}
                </span>
              </div>
              
              {track.link ? (
                <a
                  href={track.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-metal-red text-white text-sm font-bold uppercase tracking-wider hover:bg-red-600 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-metal-red"
                >
                  Listen
                </a>
              ) : (
                <button
                  disabled
                  className="inline-block px-4 py-2 bg-metal-gray border border-metal-gray text-metal-light opacity-50 text-sm font-bold uppercase tracking-wider cursor-not-allowed"
                  title="No streaming link available"
                  aria-label={`No streaming link available for ${track.name}`}
                >
                  Listen
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

