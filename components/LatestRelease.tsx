import Link from 'next/link'
import Image from 'next/image'
import releasesData from '@/content/releases.json'

export default function LatestRelease() {
  const latestRelease = releasesData.releases[0]

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
            Latest Release
          </h2>
          <div className="w-24 h-1 bg-metal-red mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* EP Artwork */}
          <div className="relative aspect-square max-w-md mx-auto md:mx-0">
            <div className="relative w-full h-full group">
              <Image
                src="/images/releases/EPs/riot.png"
                alt={latestRelease.title}
                fill
                className="object-cover border-2 border-metal-red/50 group-hover:border-metal-red transition-all duration-300"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Hover overlay effect */}
              <div className="absolute inset-0 bg-metal-red/0 group-hover:bg-metal-red/10 transition-all duration-300"></div>
            </div>
          </div>
          
          {/* EP Details */}
          <div className="space-y-6">
            {/* Title and Type */}
            <div>
              <div className="inline-block bg-metal-red/20 border border-metal-red px-3 py-1 mb-4">
                <span className="text-metal-red font-bold uppercase tracking-wider text-sm">
                  {latestRelease.type}
                </span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-metal-light mb-3 font-display uppercase tracking-tight">
                {latestRelease.title}
              </h3>
              <p className="text-metal-light opacity-75 text-sm uppercase tracking-wider">
                Released: {new Date(latestRelease.releaseDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>

            {/* Description */}
            <p className="text-metal-light opacity-90 leading-relaxed">
              {latestRelease.description}
            </p>

            {/* Tracklist */}
            <div>
              <h4 className="text-metal-red font-bold uppercase tracking-wider text-sm mb-4 border-b border-metal-red/30 pb-2">
                Tracklist
              </h4>
              <ul className="space-y-3">
                {latestRelease.tracklist.map((track, index) => (
                  <li key={index} className="flex items-center gap-3 group">
                    <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-metal-red/20 border border-metal-red/50 group-hover:bg-metal-red/30 group-hover:border-metal-red transition-all duration-200">
                      <span className="text-metal-red text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-metal-light font-semibold group-hover:text-metal-red transition-colors duration-200">
                      {track}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Streaming Links */}
            {Object.keys(latestRelease.streaming).length > 0 && (
              <div>
                <h4 className="text-metal-red font-bold uppercase tracking-wider text-sm mb-4 border-b border-metal-red/30 pb-2">
                  Stream Now
                </h4>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(latestRelease.streaming).map(([platform, url]) => {
                    if (!url) return null
                    return (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/30 border border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red transition-all duration-200 px-4 py-2 text-sm font-bold uppercase tracking-wider"
                      >
                        {platform}
                      </a>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* View Release Button */}
            <div className="pt-4">
              <Link 
                href={`/music/${latestRelease.slug}`} 
                className="inline-block bg-metal-red text-white hover:bg-metal-red/80 transition-colors duration-200 px-8 py-3 text-sm font-bold uppercase tracking-wider"
              >
                View Full Release
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
