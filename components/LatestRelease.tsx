import Link from 'next/link'
import ImageWithFallback from '@/components/ImageWithFallback'
import releasesData from '@/content/releases.json'

export default function LatestRelease() {
  const latestRelease = releasesData.releases[0]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative" style={{ backgroundColor: '#000000' }}>
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at center, rgba(57, 255, 20, 0.15) 0%, transparent 70%)'
        }}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="section-heading mb-20" style={{ color: '#39ff14' }}>Latest Release</h2>
        
        <div className="grid md:grid-cols-2 gap-4 items-start">
          <div className="relative aspect-square max-w-md mx-auto md:mx-0 md:ml-32">
            <ImageWithFallback
              src="/images/riot.png"
              alt={latestRelease.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          
          <div className="max-w-md mx-auto md:mx-0">
            <h3 className="text-4xl font-bold text-metal-red mb-4">{latestRelease.title}</h3>
            <p className="text-metal-light mb-4">
              Released: {new Date(latestRelease.releaseDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-metal-light mb-2">Debut EP consisting four tracks of raw thrash metal intensity:</p>
            <ul className="text-metal-light mb-6 space-y-3">
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-metal-red flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                  <line x1="12" y1="2" x2="12" y2="6"/>
                  <line x1="12" y1="18" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="6" y2="12"/>
                  <line x1="18" y1="12" x2="22" y2="12"/>
                </svg>
                <span className="font-semibold">Nuclear Outbreak</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-metal-red flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                  <line x1="12" y1="2" x2="12" y2="6"/>
                  <line x1="12" y1="18" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="6" y2="12"/>
                  <line x1="18" y1="12" x2="22" y2="12"/>
                </svg>
                <span className="font-semibold">Riot in Uniform</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-metal-red flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                  <line x1="12" y1="2" x2="12" y2="6"/>
                  <line x1="12" y1="18" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="6" y2="12"/>
                  <line x1="18" y1="12" x2="22" y2="12"/>
                </svg>
                <span className="font-semibold">Greed</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-6 h-6 text-metal-red flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                  <line x1="12" y1="2" x2="12" y2="6"/>
                  <line x1="12" y1="18" x2="12" y2="22"/>
                  <line x1="2" y1="12" x2="6" y2="12"/>
                  <line x1="18" y1="12" x2="22" y2="12"/>
                </svg>
                <span className="font-semibold">General Destroyer</span>
              </li>
            </ul>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {Object.entries(latestRelease.streaming).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary capitalize"
                >
                  {platform}
                </a>
              ))}
            </div>
            
            <div className="mt-10">
              <Link href={`/music/${latestRelease.slug}`} className="btn-primary">
                View Release
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

