import { Metadata } from 'next'
import ImageWithFallback from '@/components/ImageWithFallback'
import pressData from '@/content/press.json'
import siteData from '@/content/site.json'

export const metadata: Metadata = {
  title: 'Press Kit | Karmant',
  description: 'Electronic Press Kit for Karmant',
}

export default function PressPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading text-metal-red">Electronic Press Kit</h1>
        
        {/* Short Bio */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-metal-red mb-4">Short Bio</h2>
          <p className="text-metal-light">{pressData.shortBio}</p>
        </section>

        {/* Long Bio */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-metal-red mb-4">Long Bio</h2>
          <p className="text-metal-light whitespace-pre-line">{pressData.longBio}</p>
        </section>

        {/* Similar To */}
        {pressData.similarTo && pressData.similarTo.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-metal-red mb-4">Similar To</h2>
            <p className="text-metal-light">{pressData.similarTo.join(', ')}</p>
          </section>
        )}

        {/* Key Facts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-metal-red mb-4">Key Facts</h2>
          <ul className="list-disc list-inside space-y-2 text-metal-light">
            {pressData.keyFacts.map((fact, index) => (
              <li key={index}>{fact}</li>
            ))}
          </ul>
        </section>

        {/* Press Photos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-metal-red mb-4">Press Photos</h2>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {pressData.pressPhotos.map((photo, index) => (
              <div key={index} className="card p-4">
                <div className="relative aspect-video mb-4">
                  <ImageWithFallback
                    src={photo.url}
                    alt={photo.name}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <p className="text-metal-light mb-2">{photo.name}</p>
                <a
                  href={photo.downloadUrl}
                  download
                  className="btn-secondary text-sm"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Streaming Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-metal-red mb-4">Streaming Links</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(siteData.socials).map(([platform, url]) => (
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
        </section>

        {/* Top Videos */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-metal-red mb-4">Top Videos</h2>
          <div className="space-y-4">
            {pressData.topVideos.map((video, index) => (
              <div key={index} className="card p-4">
                <div className="relative aspect-video mb-4">
                  <iframe
                    className="w-full h-full rounded"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="font-bold text-metal-light">{video.title}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Press Quotes */}
        {pressData.quotes && pressData.quotes.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-metal-red mb-4">Press Quotes</h2>
            <div className="space-y-6">
              {pressData.quotes.map((quote, index) => (
                <div key={index} className="card p-6">
                  <p className="text-metal-light text-lg italic mb-2">&ldquo;{quote.quote}&rdquo;</p>
                  <p className="text-metal-red font-bold">
                    — {quote.source} ({quote.date})
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-bold text-metal-red mb-4">Contact</h2>
          <div className="card p-6 space-y-4">
            <div>
              <p className="text-metal-red font-bold mb-1">Booking</p>
              <a href={`mailto:${siteData.emails.booking}`} className="text-metal-light hover:text-metal-red transition-colors">
                {siteData.emails.booking}
              </a>
            </div>
            <div>
              <p className="text-metal-red font-bold mb-1">Press</p>
              <a href={`mailto:${siteData.emails.press}`} className="text-metal-light hover:text-metal-red transition-colors">
                {siteData.emails.press}
              </a>
            </div>
            <div>
              <p className="text-metal-red font-bold mb-1">Management</p>
              <a href={`mailto:${siteData.emails.management}`} className="text-metal-light hover:text-metal-red transition-colors">
                {siteData.emails.management}
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

