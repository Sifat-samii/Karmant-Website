'use client'

import Link from 'next/link'
import ImageWithFallback from '@/components/ImageWithFallback'

interface Release {
  slug: string
  title: string
  type: string
  releaseDate: string
  artwork: string
  tracklist: string[]
  streaming: Record<string, string>
}

interface ReleaseCardProps {
  release: Release
  viewMode?: 'grid' | 'timeline'
}

export default function ReleaseCard({ release, viewMode = 'grid' }: ReleaseCardProps) {
  const year = new Date(release.releaseDate).getFullYear()
  const trackCount = release.tracklist?.length || 0

  if (viewMode === 'timeline') {
    return (
      <div className="relative pl-8 pb-8 border-l-2 border-metal-red">
        <div className="absolute left-0 top-0 w-4 h-4 bg-metal-red rounded-full -translate-x-[9px]" />
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-32 text-metal-light font-bold text-sm">{year}</div>
          <div className="flex-1">
            <Link
              href={`/music/${release.slug}`}
              className="card card-tilt block group"
            >
              <div className="flex flex-col md:flex-row gap-4 p-4">
                <div className="relative w-full md:w-24 h-24 flex-shrink-0">
                  <ImageWithFallback
                    src={release.artwork}
                    alt={release.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <span className="inline-block px-2 py-1 bg-metal-red text-white text-xs font-bold uppercase mb-2">
                        {release.type}
                      </span>
                      <h3 className="text-xl font-bold text-metal-light group-hover:text-metal-red transition-colors mb-1">
                        {release.title}
                      </h3>
                    </div>
                    <span className="text-sm text-metal-light opacity-75">{trackCount} tracks</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/music/${release.slug}`}
                      className="text-sm text-metal-red hover:underline uppercase tracking-wider"
                    >
                      Open
                    </Link>
                    {release.streaming.bandcamp && release.streaming.bandcamp.trim() && (
                      <a
                        href={release.streaming.bandcamp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-metal-red hover:underline uppercase tracking-wider"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Listen
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <Link
      href={`/music/${release.slug}`}
      className="card card-tilt group block"
    >
      <div className="relative aspect-square overflow-hidden">
        <ImageWithFallback
          src={release.artwork}
          alt={release.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300 distortion-hover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="flex items-center justify-between text-white text-sm">
            <span>{trackCount} tracks</span>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-metal-red text-white text-xs font-bold uppercase">
                Open
              </span>
              {release.streaming.bandcamp && release.streaming.bandcamp.trim() && (
                <span className="px-2 py-1 bg-metal-red text-white text-xs font-bold uppercase">
                  Listen
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <span className="px-2 py-1 bg-metal-red text-white text-xs font-bold uppercase">
            {release.type}
          </span>
          <span className="text-sm text-metal-light opacity-75">{year}</span>
        </div>
        <h3 className="text-lg font-bold text-metal-light group-hover:text-metal-red transition-colors strike-line">
          {release.title}
        </h3>
      </div>
    </Link>
  )
}

