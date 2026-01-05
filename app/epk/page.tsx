import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import siteData from '@/content/site.json'
import aboutData from '@/content/about.json'
import bandData from '@/content/band.json'
import pressData from '@/content/press.json'
import releasesData from '@/content/releases.json'
import showsData from '@/content/media/shows.json'
import { getAllNewsPosts } from '@/lib/news'

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

export default function EPKPage() {
  const newsPosts = getAllNewsPosts()
  const recentShows = getRecentShows()
  const featuredReleases = releasesData.releases || []
  const pressPhotos = (pressData.pressPhotos ?? []) as {
    url: string
    name: string
    downloadUrl?: string
  }[]

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
        {/* Back to Home */}
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

        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/images/Whitelogo.png"
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

        {/* Quick Facts - At a Glance */}
        <section className="mb-16">
          <div className="bg-black/40 border-2 border-metal-red p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-6 uppercase tracking-wider text-center">
              At a Glance
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-metal-red mb-2">{siteData.formed}</div>
                <div className="text-sm text-metal-light uppercase tracking-wider">Formed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-metal-red mb-2">{featuredReleases.length}</div>
                <div className="text-sm text-metal-light uppercase tracking-wider">Releases</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-metal-red mb-2">{showsData.filter(s => !s.cancelled).length}+</div>
                <div className="text-sm text-metal-light uppercase tracking-wider">Shows</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-metal-red mb-2">{bandData.currentLineup.length}</div>
                <div className="text-sm text-metal-light uppercase tracking-wider">Members</div>
              </div>
            </div>
            {pressData.keyFacts && pressData.keyFacts.length > 0 && (
              <div className="mt-8 pt-8 border-t border-metal-gray/30">
                <div className="flex flex-wrap justify-center gap-3">
                  {pressData.keyFacts.map((fact, index) => (
                    <span
                      key={index}
                      className="inline-block bg-metal-red/20 border border-metal-red/50 text-metal-light px-4 py-2 text-sm font-bold uppercase tracking-wider"
                    >
                      {fact}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
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
        {featuredReleases.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
              Discography
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredReleases.map((release, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-black/40 border-2 border-metal-gray hover:border-metal-red transition-all duration-300"
                >
                  {release.artwork && (
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image
                        src={release.artwork}
                        alt={release.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-metal-light group-hover:text-metal-red transition-colors uppercase tracking-tight mb-2">
                      {release.title}
                    </h3>
                    <p className="text-sm text-metal-red font-bold uppercase tracking-wider mb-2">
                      {release.type}
                    </p>
                    {release.releaseDate && (
                      <p className="text-xs text-metal-light opacity-75 mb-3">
                        {new Date(release.releaseDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
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
                    {release.streaming && release.streaming.bandcamp && (
                      <a
                        href={release.streaming.bandcamp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-xs text-metal-red hover:text-metal-light border border-metal-red px-3 py-1 uppercase tracking-wider transition-colors"
                      >
                        Listen
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Press Coverage */}
        {newsPosts.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
              Press Coverage
            </h2>
            <div className="space-y-6">
              {newsPosts.slice(0, 5).map((post) => (
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
                          Read Article
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
        )}

        {/* Recent Shows */}
        {recentShows.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">
              Recent Performances
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentShows.map((show) => (
                <div
                  key={show.id}
                  className="bg-black/40 border-2 border-metal-gray hover:border-metal-red transition-all duration-300 p-6"
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
          {pressPhotos.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pressPhotos.map((photo, index) => (
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
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h3 className="text-lg font-bold text-metal-red mb-3 uppercase tracking-wider">Booking</h3>
                <a
                  href={`mailto:${siteData.emails.booking}`}
                  className="text-metal-light hover:text-metal-red transition-colors block mb-1"
                >
                  {siteData.emails.booking}
                </a>
                {siteData.phone && (
                  <a
                    href={`tel:${siteData.phone}`}
                    className="text-metal-light hover:text-metal-red transition-colors text-sm opacity-75"
                  >
                    {siteData.phone}
                  </a>
                )}
              </div>
              <div>
                <h3 className="text-lg font-bold text-metal-red mb-3 uppercase tracking-wider">Press</h3>
                <a
                  href={`mailto:${siteData.emails.press}`}
                  className="text-metal-light hover:text-metal-red transition-colors block"
                >
                  {siteData.emails.press}
                </a>
              </div>
              <div>
                <h3 className="text-lg font-bold text-metal-red mb-3 uppercase tracking-wider">Management</h3>
                <a
                  href={`mailto:${siteData.emails.management}`}
                  className="text-metal-light hover:text-metal-red transition-colors block"
                >
                  {siteData.emails.management}
                </a>
              </div>
              <div>
                <h3 className="text-lg font-bold text-metal-red mb-3 uppercase tracking-wider">General</h3>
                <a
                  href={`mailto:${siteData.emails.general}`}
                  className="text-metal-light hover:text-metal-red transition-colors block"
                >
                  {siteData.emails.general}
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
            {siteData.socials.facebook && (
              <a
                href={siteData.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
                Facebook
              </a>
            )}
            {siteData.socials.bandcamp && (
              <a
                href={siteData.socials.bandcamp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 19.5c-4.136 0-7.5-3.364-7.5-7.5S7.864 4.5 12 4.5s7.5 3.364 7.5 7.5-3.364 7.5-7.5 7.5z"/>
                </svg>
                Bandcamp
              </a>
            )}
            {siteData.externalLinks.merch && (
              <a
                href={siteData.externalLinks.merch}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-black/40 border-2 border-metal-red/50 text-metal-light hover:bg-metal-red hover:text-white hover:border-metal-red px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Merch
              </a>
            )}
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

