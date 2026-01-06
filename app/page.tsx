import Hero from '@/components/Hero'
import LatestRelease from '@/components/LatestRelease'
import UpcomingShows from '@/components/UpcomingShows'
import MerchPreview from '@/components/MerchPreview'
import NewsPreview from '@/components/NewsPreview'
import Image from 'next/image'

export default function Home() {
  return (
    <div className="-mt-8">
      <Hero />
      <LatestRelease />
      <MerchPreview />
      <section className="relative w-full bg-black overflow-hidden">
        <Image
          src="/images/gpt%20art%20edited.png"
          alt="Karmant artwork"
          width={1920}
          height={1080}
          className="w-full h-auto opacity-75"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div
            className="w-full h-full flex items-center justify-center"
            style={{
              WebkitMaskImage:
                'radial-gradient(85% 85% at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
              maskImage:
                'radial-gradient(85% 85% at 50% 50%, rgba(0,0,0,1) 55%, rgba(0,0,0,0) 100%)',
              WebkitMaskSize: '100% 100%',
              maskSize: '100% 100%',
              WebkitMaskRepeat: 'no-repeat',
              maskRepeat: 'no-repeat',
            }}
          >
            <video
              className="w-full h-full object-contain opacity-80"
              src="/Videos/Riot%20Reel%20-%20Made%20with%20Clipchamp.mp4"
              controls
              playsInline
              preload="metadata"
            />
          </div>
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(80% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.85) 100%), linear-gradient(to right, rgba(0,0,0,0.9) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.9) 100%), linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.9) 100%)',
          }}
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage:
              'radial-gradient(90% 90% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
            maskImage:
              'radial-gradient(90% 90% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
            background:
              'linear-gradient(to right, rgba(0,0,0,0.9) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.9) 100%), linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.9) 100%)',
          }}
        />
      </section>
      <UpcomingShows />
      <NewsPreview />
    </div>
  )
}
