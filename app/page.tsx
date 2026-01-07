import Hero from '@/components/Hero'
import LatestRelease from '@/components/LatestRelease'
import UpcomingShows from '@/components/UpcomingShows'
import MerchPreview from '@/components/MerchPreview'
import NewsPreview from '@/components/NewsPreview'
import BackgroundVideo from '@/components/BackgroundVideo'
import Image from 'next/image'
// No Image import needed here; components below handle their own imagery.

export default function Home() {
  return (
    <div className="-mt-8">
      <Hero />
      <LatestRelease />
      <div className="flex flex-wrap justify-center gap-3 px-4 sm:px-6 lg:px-8 mt-0 mb-10">
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
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z" />
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
          href="https://www.youtube.com/watch?v=3XjTYmYPniw"
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
          href="https://music.amazon.com/albums/B091YQGJGB"
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
          href="https://tidal.com/browse/album/179807087"
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
          href="https://www.deezer.com/us/album/220268272"
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
      <section className="relative w-full bg-black overflow-hidden">
        <BackgroundVideo
          className="w-full h-full object-cover opacity-60 cursor-pointer"
          src="/Videos/video%20bg%20compressed.mp4"
          autoPlayOnView
          showPlayOverlay
          showMuteOverlay
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(80% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.85) 100%), linear-gradient(to right, rgba(0,0,0,0.9) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.9) 100%), linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 35%, transparent 85%, rgba(0,0,0,0.2) 100%)',
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
      <MerchPreview />
      <UpcomingShows />
      <NewsPreview />
      <section className="relative w-full bg-black overflow-hidden pb-0">
        <Image
          src="/images/Newlineup.png"
          alt="Karmant lineup"
          width={1920}
          height={1080}
          className="w-full h-auto object-cover opacity-60"
          priority
        />
        <div className="absolute inset-0 flex items-end justify-center pb-10 z-10">
          <a
            href="/band"
            className="inline-block bg-metal-red text-white hover:bg-metal-red/80 transition-colors duration-200 px-8 py-3 text-sm font-bold uppercase tracking-wider"
          >
            View Current Lineup
          </a>
        </div>
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            WebkitMaskImage:
              'radial-gradient(90% 90% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
            maskImage:
              'radial-gradient(90% 90% at 50% 50%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
            background:
              'radial-gradient(80% 80% at 50% 50%, rgba(0,0,0,0.4), transparent 75%), linear-gradient(to right, rgba(0,0,0,0.9) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.9) 100%), linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.85) 100%)',
          }}
        />
      </section>
    </div>
  )
}
