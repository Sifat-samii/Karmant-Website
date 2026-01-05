import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import siteData from '@/content/site.json'
import aboutData from '@/content/about.json'
import bandData from '@/content/band.json'
import pressData from '@/content/press.json'
import showsData from '@/content/media/shows.json'
import { getAllNewsPosts } from '@/lib/news'
import PressActions from '@/components/PressActions'

export const metadata: Metadata = {
  title: 'Electronic Press Kit (EPK) | Karmant',
  description: 'Professional Electronic Press Kit for Karmant - Bangladesh Thrash Metal',
}

// Get recent shows (last 5)
const getRecentShows = () => {
  return showsData
    .filter(show => !show.cancelled)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5)
}

export default function PressPage() {
  const newsPosts = getAllNewsPosts()
  const recentShows = getRecentShows()
  
  // Get all releases matching the music page structure
  const allReleases = [
    {
      slug: 'riot-in-uniform',
      image: '/images/releases/EPs/riot.png',
      title: 'Riot In Uniform',
      releaseDate: '2021-04-01',
      type: 'EP',
      tracklist: ['Nuclear Outbreak', 'Riot in Uniform', 'Greed', 'General Destroyer'],
      streaming: {
        bandcamp: 'https://karmant.bandcamp.com/album/riot-in-uniform',
      },
    },
    {
      slug: 'smelling-death-rebirth-of-general-destroyer',
      image: '/images/releases/Singles/Smellingdeath.png',
      title: 'Smelling Death (Rebirth of General Destroyer)',
      releaseDate: '2022-06-29',
      type: 'Single',
      tracklist: [],
      streaming: {
        youtube: 'https://youtu.be/LlAY96Yts5o',
      },
    },
    {
      slug: 'zip-tied-gutted',
      image: '/images/releases/Singles/Ziptied.png',
      title: 'Zip-Tied, Gutted',
      releaseDate: '2023-02-08',
      type: 'Single',
      tracklist: [],
      streaming: {
        youtube: 'https://youtu.be/5E44XZxPtb4?si=gqJ-SqwoFR9QL7lc',
      },
    },
    {
      slug: 'hack-slash',
      image: '/images/releases/Albums/hackandslash.png',
      title: 'Hack & Slash',
      releaseDate: '',
      isUpcoming: true,
      type: 'Album',
      tracklist: ['Smelling Death', 'Skull Granade', 'Hyena', 'Zip-Tied, Gutted', 'Magma Sky', 'Hack & Slash', 'Slaughter Excursion', 'The Last Stand'],
      streaming: {},
    },
  ]

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background Image - Fixed and Full Page */}
      <div 
        className="fixed inset-0 bg-top bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(/images/482093493_1177794414351547_208647928897630965_n.jpg)',
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
        {/* Back to Home and Action Buttons */}
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
          <PressActions />
        </div>

        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/Screenshot_2026-01-01_042622_1-removebg-preview.png"
              alt="Karmant"
              width={600}
              height={300}
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-metal-light mb-4 font-display uppercase tracking-tight">
            Electronic Press Kit
          </h1>
          <p className="text-xl text-metal-red font-bold uppercase tracking-wider mb-2">
            {siteData.tagline}
          </p>
          <p className="text-metal-light opacity-90">
            {siteData.location} • Formed {siteData.formed} • {siteData.label}
          </p>
        </section>

        {/* Short Bio */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-6 uppercase tracking-wider text-center">
            Short Bio
          </h2>
          <div className="bg-black/30 border-2 border-metal-gray p-8">
            <p className="text-lg text-metal-light leading-relaxed text-center max-w-4xl mx-auto">
              {pressData.shortBio || aboutData.shortBio}
            </p>
          </div>
        </section>

        {/* Long Bio */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-6 uppercase tracking-wider text-center">
            Biography
          </h2>
          <div className="bg-black/30 border-2 border-metal-gray p-8">
            <div className="prose prose-invert max-w-none text-metal-light leading-relaxed whitespace-pre-line">
              {pressData.longBio || aboutData.longBio}
            </div>
          </div>
        </section>

        {/* Current Lineup */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
            Current Lineup
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bandData.currentLineup.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-black/40 border-2 border-metal-gray hover:border-metal-red transition-all duration-300"
              >
                {/* Member Image */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-metal-gray flex items-center justify-center">
                      <span className="text-4xl font-bold text-metal-red opacity-50">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-6 relative z-20">
                  <h3 className="text-xl font-bold text-metal-light group-hover:text-metal-red transition-colors uppercase tracking-tight mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-metal-red font-bold uppercase tracking-wider mb-1">
                    {member.role}
                  </p>
                  <p className="text-xs text-metal-light opacity-75 mb-3">
                    {member.years}
                  </p>
                  <p className="text-sm text-metal-light opacity-90 leading-relaxed">
                    {member.bio}
                  </p>
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </section>

        {/* Discography */}
        {allReleases.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
              Discography
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {allReleases.map((release, index) => (
                <div
                  key={index}
                  className={`group relative overflow-hidden bg-black/40 border-2 border-metal-gray hover:border-metal-red transition-all duration-300 ${(release.title.toLowerCase().includes('smelling death') || release.title.toLowerCase().includes('zip-tied')) ? 'flex flex-col h-full' : 'h-full flex flex-col'}`}
                >
                  {release.image && (
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={release.image}
                        alt={release.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className={`p-6 ${(release.title.toLowerCase().includes('smelling death') || release.title.toLowerCase().includes('zip-tied')) ? 'flex flex-col flex-grow min-h-0' : ''}`}>
                    <div className={(release.title.toLowerCase().includes('smelling death') || release.title.toLowerCase().includes('zip-tied')) ? 'flex-grow min-h-0' : ''}>
                      <h3 className="text-lg font-bold text-metal-light group-hover:text-metal-red transition-colors uppercase tracking-tight mb-2">
                        {release.title}
                      </h3>
                      <p className="text-sm text-metal-red font-bold uppercase tracking-wider mb-2">
                        {release.type}
                        {release.isUpcoming && (
                          <span className="ml-2 text-xs text-metal-light opacity-75">(Upcoming)</span>
                        )}
                      </p>
                      {release.releaseDate ? (
                        <p className="text-xs text-metal-light opacity-75 mb-3">
                          {new Date(release.releaseDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      ) : release.isUpcoming && (
                        <p className="text-xs text-metal-red opacity-75 mb-3 font-bold uppercase">
                          Coming Soon
                        </p>
                      )}
                      {release.tracklist && release.tracklist.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs text-metal-light opacity-90 uppercase tracking-wider mb-2">Tracklist:</p>
                          <ul className="text-xs text-metal-light opacity-75 space-y-1">
                            {release.tracklist.slice(0, 4).map((track, idx) => (
                              <li key={idx}>• {track}</li>
                            ))}
                            {release.tracklist.length > 4 && (
                              <li className="text-metal-red">+ {release.tracklist.length - 4} more</li>
                            )}
                          </ul>
                        </div>
                      )}
                      {!(release.title.toLowerCase().includes('smelling death') || release.title.toLowerCase().includes('zip-tied')) && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {release.streaming && release.streaming.bandcamp && (
                            <a
                              href={release.streaming.bandcamp}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block text-xs text-metal-red hover:text-metal-light border border-metal-red px-3 py-1 uppercase tracking-wider transition-colors"
                            >
                              Bandcamp
                            </a>
                          )}
                          {release.streaming && release.streaming.youtube && (
                            <a
                              href={release.streaming.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block text-xs text-metal-red hover:text-metal-light border border-metal-red px-3 py-1 uppercase tracking-wider transition-colors"
                            >
                              YouTube
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    {(release.title.toLowerCase().includes('smelling death') || release.title.toLowerCase().includes('zip-tied')) && (
                      <div className="mt-auto pt-4 flex flex-wrap gap-2 flex-shrink-0">
                        {release.streaming && release.streaming.bandcamp && (
                          <a
                            href={release.streaming.bandcamp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs text-metal-red hover:text-metal-light border border-metal-red px-3 py-1 uppercase tracking-wider transition-colors"
                          >
                            Bandcamp
                          </a>
                        )}
                        {release.streaming && release.streaming.youtube && (
                          <a
                            href={release.streaming.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block text-xs text-metal-red hover:text-metal-light border border-metal-red px-3 py-1 uppercase tracking-wider transition-colors"
                          >
                            YouTube
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Stream on */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
            Stream on
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://karmant.bandcamp.com/album/riot-in-uniform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30"
              aria-label="Listen on Bandcamp"
            >
              <Image
                src="/images/icons/bandcamp.png"
                alt="Bandcamp"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-bold uppercase tracking-wider">Bandcamp</span>
            </a>
            <a
              href="https://open.spotify.com/album/1BvSPb2mIsduZI1OAcm28O?si=fvjjQ7_tT9uXTcBkqNa1Zw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30"
              aria-label="Listen on Spotify"
            >
              <svg className="w-5 h-5" fill="#1DB954" viewBox="0 0 24 24">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span className="text-sm font-bold uppercase tracking-wider">Spotify</span>
            </a>
            <a
              href="https://music.apple.com/ca/album/riot-in-uniform-ep/1560509926"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30"
              aria-label="Listen on Apple Music"
            >
              <Image
                src="/images/icons/applemusic.png"
                alt="Apple Music"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-bold uppercase tracking-wider">Apple Music</span>
            </a>
            <a
              href="https://youtube.com/playlist?list=PLjvcEUPyZSDY0rLGnwnhBHem-ZaCjTANC&si=TsR6R4bzljAQRDLw"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30"
              aria-label="Listen on YouTube"
            >
              <Image
                src="/images/icons/youtube.png"
                alt="YouTube"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-bold uppercase tracking-wider">YouTube</span>
            </a>
            <a
              href="https://amazon.com/music/player/albums/B0917VKFDP?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_dyurMRRTgVWN8iNRKq91ii4KZ"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30"
              aria-label="Listen on Amazon Music"
            >
              <Image
                src="/images/icons/amazonmusic.png"
                alt="Amazon Music"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-bold uppercase tracking-wider">Amazon Music</span>
            </a>
            <a
              href="https://tidal.com/album/178731941/u"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30"
              aria-label="Listen on Tidal"
            >
              <Image
                src="/images/icons/tidal.png"
                alt="Tidal"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-bold uppercase tracking-wider">Tidal</span>
            </a>
            <a
              href="https://link.deezer.com/s/322vsfEw2bFGadoq0VVyi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30"
              aria-label="Listen on Deezer"
            >
              <Image
                src="/images/icons/deezer.png"
                alt="Deezer"
                width={20}
                height={20}
                className="w-5 h-5 object-contain"
              />
              <span className="text-sm font-bold uppercase tracking-wider">Deezer</span>
            </a>
          </div>
        </section>

        {/* Press Coverage */}
        {(() => {
          // Filter to show only the 5 specified articles
          const featuredPressArticles = newsPosts.filter(post => {
            const title = post.title.toLowerCase()
            return (
              title.includes('thrashing through society') ||
              (title.includes('riot in uniform') && title.includes('release debut ep')) ||
              title.includes('when protest finds expression in thrash metal') ||
              (title.includes('bangladeshi thrash metal band karmant to perform in kolkata') && post.date === '2022-05-28') ||
              title.includes('beyond the growls and screams')
            )
          })
          
          // Maintain specific order: 1. Thrashing through society, 2. Riot in Uniform, 3. When protest finds expression, 4. Kolkata, 5. Beyond Growls
          const sortedArticles = [
            featuredPressArticles.find(p => p.title.toLowerCase().includes('thrashing through society')),
            featuredPressArticles.find(p => p.title.toLowerCase().includes('riot in uniform') && p.title.toLowerCase().includes('release debut ep')),
            featuredPressArticles.find(p => p.title.toLowerCase().includes('when protest finds expression in thrash metal')),
            featuredPressArticles.find(p => p.title.toLowerCase().includes('bangladeshi thrash metal band karmant to perform in kolkata') && p.date === '2022-05-28'),
            featuredPressArticles.find(p => p.title.toLowerCase().includes('beyond the growls and screams')),
          ].filter(Boolean) // Remove any undefined entries
          
          return sortedArticles.length > 0 ? (
            <section className="mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
                Press Coverage
              </h2>
              <div className="space-y-6">
                {sortedArticles.map((post) => (
                <div
                  key={post.slug}
                  className="bg-black/40 border-2 border-metal-gray hover:border-metal-red transition-all duration-300 p-6"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {post.cover && (
                      <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                        <Image
                          src={post.cover}
                          alt={post.title}
                          fill
                          className="object-cover border border-metal-gray"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-metal-light mb-2 uppercase tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-sm text-metal-light opacity-75 mb-3">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <p className="text-metal-light opacity-90 mb-4 leading-relaxed">
                        {post.excerpt}
                      </p>
                        {post.externalLink && (
                          <a
                            href={post.externalLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-metal-red hover:text-metal-light transition-colors text-sm font-bold uppercase tracking-wider"
                          >
                            {post.title.toLowerCase().includes('bangladeshi thrash metal band karmant to perform in kolkata') ? 'Read Post' : 'Read Article'}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                    </div>
                  </div>
                </div>
                ))}
              </div>
            </section>
          ) : null
        })()}

        {/* Recent Shows */}
        {recentShows.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
              Recent Performances
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {recentShows.map((show) => (
                <div
                  key={show.id}
                  className="bg-black/40 border-2 border-metal-gray hover:border-metal-red transition-all duration-300 p-6 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                >
                  <h3 className="text-lg font-bold text-metal-light mb-2 uppercase tracking-tight">
                    {show.title}
                  </h3>
                  <p className="text-sm text-metal-red font-bold uppercase tracking-wider mb-2">
                    {new Date(show.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-metal-light opacity-75 mb-3">
                    {show.venue}
                  </p>
                  <Link
                    href={`/media/shows/${show.id}`}
                    className="inline-flex items-center gap-2 text-metal-red hover:text-metal-light transition-colors text-xs font-bold uppercase tracking-wider"
                  >
                    View Details
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Press Photos */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
            Press Photos
          </h2>
          {pressData.pressPhotos && pressData.pressPhotos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressData.pressPhotos.map((photo, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-black/40 border-2 border-metal-gray hover:border-metal-red transition-all duration-300"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image
                      src={photo.url}
                      alt={photo.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-bold text-metal-light mb-3 uppercase tracking-tight">
                      {photo.name}
                    </p>
                    {photo.downloadUrl && (
                      <a
                        href={photo.downloadUrl}
                        download
                        className="inline-flex items-center gap-2 text-metal-red hover:text-metal-light transition-colors text-xs font-bold uppercase tracking-wider border border-metal-red px-3 py-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Download
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-black/30 border-2 border-metal-gray p-8 text-center">
              <p className="text-metal-light opacity-75">
                Press photos coming soon. Contact us for high-resolution images.
              </p>
            </div>
          )}
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
            Contact
          </h2>
          <div className="bg-black/40 border-2 border-metal-red p-8">
            <div className="max-w-4xl mx-auto">
              <p className="text-lg font-bold text-metal-red mb-6 uppercase tracking-wider text-center">
                Booking | Management | Press
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
                {/* Email */}
                <a
                  href="mailto:mercilesskarmant@gmail.com"
                  className="flex items-center gap-3 text-metal-light hover:text-metal-red transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>mercilesskarmant@gmail.com</span>
                </a>

                {/* Phone */}
                <a
                  href="tel:+8801951320559"
                  className="flex items-center gap-3 text-metal-light hover:text-metal-red transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+880 1951-320559</span>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/8801951320559"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-metal-light hover:text-metal-red transition-colors"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span>+880 1951-320559</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Social Media & Links */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
            Connect
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.facebook.com/mercilesskarmant"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/k.a.r.m.a.n.t?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Instagram
            </a>
            <Link
              href="/merch"
              className="inline-flex items-center gap-2 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Merch
            </Link>
          </div>
        </section>

        {/* Download Assets Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
            Download Assets
          </h2>
          <div className="bg-black/40 border-2 border-metal-gray p-8 text-center">
            <p className="text-metal-light opacity-90 mb-6">
              For high-resolution logos, press photos, and other media assets, please contact us at{' '}
              <a
                href={`mailto:${siteData.emails.press}`}
                className="text-metal-red hover:text-metal-light transition-colors font-bold"
              >
                {siteData.emails.press}
              </a>
            </p>
            <p className="text-sm text-metal-light opacity-75">
              All assets are available for press and promotional use. Please credit Karmant when using our materials.
            </p>
          </div>
        </section>

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
