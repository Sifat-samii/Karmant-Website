import Link from 'next/link'
import Image from 'next/image'
import releasesData from '@/content/releases.json'

export default function LatestRelease() {
  const latestRelease = releasesData.releases[0]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Solid black background */}
      <div className="absolute inset-0 bg-black" />
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-metal-red mb-3 font-display uppercase tracking-tight">
            EP Spotlight
          </h2>
          <p className="text-metal-light/70 text-sm uppercase tracking-[0.2em]">From the Karmant Vault</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-10 items-start bg-black/30 border border-metal-gray/40 backdrop-blur-sm p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,0,0,0.08), transparent 60%)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(-135deg, rgba(255,0,0,0.06), transparent 60%)' }} />
          
          {/* EP Artwork + badge */}
          <div className="relative">
            <div className="absolute top-3 left-3 z-20 bg-metal-red text-black font-extrabold uppercase tracking-wider text-xs px-4 py-2 shadow-lg shadow-metal-red/30 rounded-sm">
              Out Now
            </div>
            <div className="relative aspect-square max-w-md mx-auto lg:mx-0 overflow-hidden border-2 border-metal-red/50 shadow-[0_25px_60px_rgba(0,0,0,0.55)]">
              <Image
                src="/images/releases/EPs/riot.png"
                alt={latestRelease.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/45 pointer-events-none" />
            </div>
            <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-metal-light/70">
              <span className="inline-flex items-center gap-2 px-3 py-1 bg-metal-red/15 border border-metal-red/40 text-metal-red font-bold">
                {latestRelease.type}
              </span>
              <span className="text-metal-light/70">
                {new Date(latestRelease.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
          
          {/* EP Details */}
          <div className="relative z-10 space-y-6 h-full flex flex-col">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-metal-light font-display uppercase tracking-tight mb-3">
                {latestRelease.title}
              </h3>
              <p className="text-metal-light/80 leading-relaxed">
                {latestRelease.description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-3">
              <div className="bg-metal-darker/60 border border-metal-gray/40 p-3 text-center">
                <p className="text-metal-light text-xs uppercase tracking-[0.2em] opacity-70">Tracks</p>
                <p className="text-metal-red font-extrabold text-xl">{latestRelease.tracklist.length}</p>
              </div>
              <div className="bg-metal-darker/60 border border-metal-gray/40 p-3 text-center">
                <p className="text-metal-light text-xs uppercase tracking-[0.2em] opacity-70">Format</p>
                <p className="text-metal-red font-extrabold text-xl">{latestRelease.type}</p>
              </div>
              <div className="bg-metal-darker/60 border border-metal-gray/40 p-3 text-center">
                <p className="text-metal-light text-xs uppercase tracking-[0.2em] opacity-70">Year</p>
                <p className="text-metal-red font-extrabold text-xl">{new Date(latestRelease.releaseDate).getFullYear()}</p>
              </div>
            </div>

            {/* Tracklist */}
            <div>
              <h4 className="text-metal-red font-bold uppercase tracking-wider text-sm mb-3 border-b border-metal-red/30 pb-2">
                Tracklist
              </h4>
              <ul className="space-y-2">
                {latestRelease.tracklist.map((track, index) => (
                  <li key={index} className="flex items-center gap-3 text-metal-light">
                    <span className="inline-flex items-center justify-center w-7 h-7 bg-metal-red/15 border border-metal-red/40 text-metal-red text-xs font-bold">
                      {index + 1}
                    </span>
                    <span className="font-semibold">{track}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2 items-start justify-start mt-auto">
              <Link 
                href={`/music/${latestRelease.slug}`} 
                className="inline-flex h-11 items-center justify-center gap-2 bg-metal-red text-white hover:bg-metal-red/80 transition-colors duration-200 px-6 text-sm font-bold uppercase tracking-wider"
              >
                View Release
              </Link>
              <Link 
                href="/music" 
                className="inline-flex h-11 items-center justify-center gap-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 px-5 text-sm font-bold uppercase tracking-wider"
              >
                Discography
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
