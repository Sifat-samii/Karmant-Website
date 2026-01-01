'use client'

import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

type TabType = 'All' | 'Singles' | "EPs" | 'Albums'

interface Release {
  slug: string
  image: string
  title: string
  releaseDate: string
  isUpcoming?: boolean
  type: 'Single' | 'EP' | 'Album'
}

function MusicPageContent() {
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get('tab')
  const initialTab = (tabParam && ['All', 'Singles', "EPs", 'Albums'].includes(tabParam) ? tabParam : 'All') as TabType
  const [activeTab, setActiveTab] = useState<TabType>(initialTab)

  useEffect(() => {
    if (tabParam && ['All', 'Singles', "EPs", 'Albums'].includes(tabParam)) {
      setActiveTab(tabParam as TabType)
    }
  }, [tabParam])

  const tabs: TabType[] = ['All', 'Singles', "EPs", 'Albums']

  const allReleases: Release[] = [
    {
      slug: 'riot-in-uniform',
      image: '/images/releases/EPs/riot.png',
      title: 'Riot In Uniform',
      releaseDate: 'April 01 2021',
      type: 'EP',
    },
    {
      slug: 'smelling-death-rebirth-of-general-destroyer',
      image: '/images/releases/Singles/Smellingdeath.png',
      title: 'Smelling Death (Rebirth of General Destroyer)',
      releaseDate: '29 Jun 2022',
      type: 'Single',
    },
    {
      slug: 'zip-tied-gutted',
      image: '/images/releases/Singles/Ziptied.png',
      title: 'Zip-Tied, Gutted',
      releaseDate: '8 Feb 2023',
      type: 'Single',
    },
    {
      slug: 'hack-slash',
      image: '/images/releases/Albums/hackandslash.png',
      title: 'Hack & Slash',
      releaseDate: '',
      isUpcoming: true,
      type: 'Album',
    },
  ]

  // Parse date for sorting (handles different date formats)
  const parseDate = (dateStr: string): Date => {
    if (!dateStr || dateStr.trim() === '') {
      return new Date(9999, 11, 31) // Put upcoming releases at the end
    }
    
    // Try different date formats
    const formats = [
      /(\w+)\s+(\d{1,2})\s+(\d{4})/, // "April 01 2021" or "29 Jun 2022"
      /(\d{1,2})\s+(\w+)\s+(\d{4})/, // "01 April 2021"
    ]
    
    for (const format of formats) {
      const match = dateStr.match(format)
      if (match) {
        const monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
        const month = monthNames.findIndex(m => dateStr.toLowerCase().includes(m))
        if (month !== -1) {
          const day = parseInt(match[2] || match[1])
          const year = parseInt(match[3])
          return new Date(year, month, day)
        }
      }
    }
    
    // Fallback: try standard Date parsing
    const parsed = new Date(dateStr)
    return isNaN(parsed.getTime()) ? new Date(9999, 11, 31) : parsed
  }

  // Sort releases by date (oldest first)
  const sortedReleases = useMemo(() => {
    return [...allReleases].sort((a, b) => {
      const dateA = parseDate(a.releaseDate)
      const dateB = parseDate(b.releaseDate)
      return dateA.getTime() - dateB.getTime()
    })
  }, [])

  // Filter releases by type
  const singles = useMemo(() => {
    return sortedReleases.filter(r => r.type === 'Single')
  }, [sortedReleases])

  const eps = useMemo(() => {
    return sortedReleases.filter(r => r.type === 'EP')
  }, [sortedReleases])

  const albums = useMemo(() => {
    return sortedReleases.filter(r => r.type === 'Album')
  }, [sortedReleases])

  return (
    <div className="pt-20 pb-20">
      {/* Header */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-4 font-display uppercase tracking-tight">
            Discography
          </h1>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 pb-4">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === tab
                    ? 'bg-metal-red text-white hover:bg-red-600'
                    : 'bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white'
                }`}
                aria-pressed={activeTab === tab}
                aria-label={`Show ${tab} releases`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Content */}
      {activeTab === 'All' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8">
              {sortedReleases.map((release, index) => (
                <Link
                  key={index}
                  href={`/music/${release.slug}`}
                  className={`relative aspect-square group cursor-pointer overflow-hidden w-full max-w-sm block ${release.type === 'EP' ? '' : ''}`}
                >
                  {release.type === 'EP' && (
                    <div className="absolute inset-0 border border-metal-red group-hover:border-black/0 transition-all duration-300 z-10 pointer-events-none" />
                  )}
                  <div className="relative w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:opacity-80">
                    <Image
                      src={release.image}
                      alt={release.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* Overlay with title and date */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    {release.isUpcoming && (
                      <p className="text-3xl font-bold text-metal-red mb-4 uppercase tracking-wider">
                        Impending Release!
                      </p>
                    )}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {release.title}
                    </h3>
                    <div className="flex items-end justify-between">
                      {release.releaseDate && (
                        <p className="text-sm text-metal-light opacity-90">
                          {release.releaseDate}
                        </p>
                      )}
                      {/* Type label aligned with release date */}
                      <span className="text-xs font-bold text-metal-light opacity-75 uppercase tracking-wider">
                        {release.type === 'EP' ? 'EP' : release.type === 'Single' ? 'Single' : 'Album'}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Singles Content */}
      {activeTab === 'Singles' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8">
              {singles.map((release, index) => (
                <Link
                  key={index}
                  href={`/music/${release.slug}`}
                  className="relative aspect-square group cursor-pointer overflow-hidden w-full max-w-sm block"
                >
                  <div className="relative w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:opacity-80">
                    <Image
                      src={release.image}
                      alt={release.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* Overlay with title and date */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {release.title}
                    </h3>
                    {release.releaseDate && (
                      <p className="text-sm text-metal-light opacity-90">
                        {release.releaseDate}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* EPs Content */}
      {activeTab === "EPs" && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8">
              {eps.map((release, index) => (
                <Link
                  key={index}
                  href={`/music/${release.slug}`}
                  className="relative aspect-square group cursor-pointer overflow-hidden w-full max-w-sm block"
                >
                  <div className="absolute inset-0 border border-metal-red group-hover:border-black/0 transition-all duration-300 z-10 pointer-events-none" />
                  <div className="relative w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:opacity-80">
                    <Image
                      src={release.image}
                      alt={release.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* Overlay with title and date */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {release.title}
                    </h3>
                    {release.releaseDate && (
                      <p className="text-sm text-metal-light opacity-90">
                        {release.releaseDate}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Albums Content */}
      {activeTab === 'Albums' && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap justify-center gap-8">
              {albums.map((album, index) => (
                <Link
                  key={index}
                  href={`/music/${album.slug}`}
                  className="relative aspect-square group cursor-pointer overflow-hidden w-full max-w-sm block"
                >
                  <div className="relative w-full h-full transition-all duration-300 group-hover:scale-105 group-hover:opacity-80">
                    <Image
                      src={album.image}
                      alt={album.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  {/* Overlay with title and date */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                    {album.isUpcoming && (
                      <p className="text-3xl font-bold text-metal-red mb-4 uppercase tracking-wider">
                        Impending Release!
                      </p>
                    )}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {album.title}
                    </h3>
                    {album.releaseDate && (
                      <p className="text-sm text-metal-light opacity-90">
                        {album.releaseDate}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

export default function MusicPage() {
  return (
    <Suspense fallback={
      <div className="pt-20 pb-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-4 font-display uppercase tracking-tight">
            Discography
          </h1>
        </div>
      </div>
    }>
      <MusicPageContent />
    </Suspense>
  )
}
