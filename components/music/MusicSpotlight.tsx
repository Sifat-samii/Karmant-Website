'use client'

import { useState } from 'react'
import Link from 'next/link'
import ImageWithFallback from '@/components/ImageWithFallback'
import EmbedModal from './EmbedModal'

interface Release {
  slug: string
  title: string
  type: string
  releaseDate: string
  artwork: string
  tracklist: string[]
  streaming: Record<string, string>
  featuredTrack?: string
  streamEmbeds?: Record<string, string>
  merchLink?: string
}

interface MusicSpotlightProps {
  release: Release
}

export default function MusicSpotlight({ release }: MusicSpotlightProps) {
  const [showEmbed, setShowEmbed] = useState(false)
  const featuredTrack = release.featuredTrack || release.tracklist[0]
  const hasBandcampEmbed = release.streamEmbeds?.bandcamp

  const handleQuickPlay = () => {
    if (hasBandcampEmbed) {
      setShowEmbed(true)
    } else if (release.streaming.bandcamp && release.streaming.bandcamp.trim()) {
      window.open(release.streaming.bandcamp, '_blank')
    }
  }

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8 relative grain">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Artwork */}
            <div className="relative aspect-square max-w-md mx-auto md:mx-0">
              <div className="thrash-border distortion-hover">
                <ImageWithFallback
                  src={release.artwork}
                  alt={release.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Meta */}
            <div>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-metal-red text-white text-xs font-bold uppercase tracking-wider mb-3">
                  {release.type}
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-metal-light mb-2 font-display">
                  {release.title}
                </h2>
                <p className="text-metal-light opacity-75 mb-4">
                  {new Date(release.releaseDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              {/* Featured Track */}
              {featuredTrack && (
                <div className="mb-6 p-4 bg-metal-gray border-l-2 border-metal-red">
                  <p className="text-sm text-metal-light opacity-75 mb-2">Featured Track</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-metal-light">{featuredTrack}</p>
                    <button
                      onClick={handleQuickPlay}
                      className="px-4 py-2 bg-metal-red text-white text-sm font-bold uppercase tracking-wider hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-metal-red"
                      aria-label={`Play ${featuredTrack}`}
                    >
                      Quick Play
                    </button>
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                {release.streaming.bandcamp && release.streaming.bandcamp.trim() && (
                  <a
                    href={release.streaming.bandcamp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    Listen
                  </a>
                )}
                {release.streaming.bandcamp && release.streaming.bandcamp.trim() && (
                  <a
                    href={release.streaming.bandcamp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Buy
                  </a>
                )}
                {release.streaming.youtube && release.streaming.youtube.trim() && (
                  <a
                    href={release.streaming.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Watch
                  </a>
                )}
                <Link
                  href={`/music/${release.slug}`}
                  className="btn-ghost"
                >
                  View Release
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showEmbed && hasBandcampEmbed && (
        <EmbedModal
          embedHtml={release.streamEmbeds!.bandcamp}
          title={release.title}
          onClose={() => setShowEmbed(false)}
        />
      )}
    </>
  )
}

