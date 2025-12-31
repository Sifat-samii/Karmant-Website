import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import ImageWithFallback from '@/components/ImageWithFallback'
import releasesData from '@/content/releases.json'

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const release = releasesData.releases.find((r) => r.slug === params.slug)
  
  if (!release) {
    return {
      title: 'Release Not Found | Karmant',
    }
  }

  return {
    title: `${release.title} | Karmant (BD)`,
    description: release.description,
    openGraph: {
      title: `${release.title} | Karmant (BD)`,
      description: release.description,
      images: release.artwork ? [release.artwork] : [],
      type: 'music.album',
    },
  }
}

export default function ReleasePage({ params }: PageProps) {
  const release = releasesData.releases.find((r) => r.slug === params.slug)

  if (!release) {
    notFound()
  }

  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="relative aspect-square">
            <ImageWithFallback
              src={release.artwork}
              alt={release.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-metal-red mb-4">{release.title}</h1>
            <p className="text-metal-light mb-4 capitalize">{release.type}</p>
            <p className="text-metal-light mb-4">
              Released: {new Date(release.releaseDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-metal-light mb-6">{release.description}</p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              {Object.entries(release.streaming).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary capitalize"
                >
                  Listen on {platform}
                </a>
              ))}
            </div>
          </div>
        </div>

        {release.tracklist && release.tracklist.length > 0 && (
          <div className="card p-6">
            <h2 className="text-2xl font-bold text-metal-red mb-4">Tracklist</h2>
            <ol className="space-y-2">
              {release.tracklist.map((track, index) => (
                <li key={index} className="text-metal-light">
                  {track}
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </div>
  )
}

