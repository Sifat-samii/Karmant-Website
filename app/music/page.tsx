import { Metadata } from 'next'
import Link from 'next/link'
import ImageWithFallback from '@/components/ImageWithFallback'
import releasesData from '@/content/releases.json'

export const metadata: Metadata = {
  title: 'Music | Karmant',
  description: 'Discography and releases from Karmant',
}

export default function MusicPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="section-heading text-metal-red">Discography</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {releasesData.releases.map((release) => (
            <Link
              key={release.slug}
              href={`/music/${release.slug}`}
              className="card group"
            >
              <div className="relative aspect-square">
                <ImageWithFallback
                  src={release.artwork}
                  alt={release.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-metal-light mb-2 group-hover:text-metal-red transition-colors">
                  {release.title}
                </h3>
                <p className="text-metal-light mb-2 capitalize">{release.type}</p>
                <p className="text-sm text-metal-light opacity-75">
                  {new Date(release.releaseDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

