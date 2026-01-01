import { Metadata } from 'next'
import Image from 'next/image'
import ImageWithFallback from '@/components/ImageWithFallback'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Greed | Riot In Uniform | Karmant (BD)',
  description: 'Greed - Track from Riot In Uniform EP by Karmant',
}

const tracks = [
  { slug: 'nuclear-outbreak', title: 'Nuclear Outbreak' },
  { slug: 'riot-in-uniform', title: 'Riot in Uniform' },
  { slug: 'greed', title: 'Greed' },
  { slug: 'general-destroyer', title: 'General Destroyer' }
]

const currentTrackIndex = 2

const trackData = {
  title: 'Greed',
  duration: '04:07',
  epTitle: 'Riot In Uniform',
  epSlug: 'riot-in-uniform',
  artwork: '/images/releases/EPs/riot.png',
  releaseDate: 'April 01 2021',
  description: `A ruthless indictment of corruption and profit driven violence that exposes greed as a disease rotting humanity from within. The track confronts exploitation environmental destruction and moral collapse driven by power and money. It portrays a world numbed by injustice where conscience decays and reckoning becomes inevitable.`,
  lyrics: `ROT IN HELL you greedy son of a bitch!

Cerebral hemispheres
Manipulated, exploited
Biological warfare
Population evacuated

Poisoning earth to give you cancer
It's just earning money all they do care
Plotting mass murder to gain power
It's all about money, the human nature

Reckless driving
Merciless roadkill
Manslaughter everywhere
Mass murder feels nothing

Greed will make you want more and more
Necrosis of human mind, rotten to the core
A sanctuary of perversion, you've set up
Now pay for this insolence, you fucking whore

(Guitar solo by Rumman Sharier)

The road to slavery isn't satisfied
We watch in horror, eyes open wide
That rebel inside us has already died
Because there's no free food, no free ride

Malice keeps spreading in
Every imagination
The light has lost way
In feeble rejection

Through approach lies, a fear-induced hallucination
A halo of darkness has taken all the visions
Your goons are gone, your scene is dead
Riot in uniform was against your Greed
That Nuclear Outbreak wasn't a myth
General Destroyer will bring your ill fate`,
  streaming: {
    bandcamp: 'https://karmant.bandcamp.com/track/greed',
    spotify: 'https://open.spotify.com/track/5EJ8jvNqjTgD8bqgqjYpmm?si=379a8fed064949aa',
    apple: 'https://music.apple.com/ca/song/greed/1560509931',
    youtube: 'https://youtu.be/DEHnmwcYhmk?si=OnEatWkso-UcM_Eh',
    amazon: 'https://amazon.com/music/player/tracks/B0917TV1TW?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_NxHuoEUlTWRSCR5S5Zxf5kwst',
    tidal: 'https://tidal.com/track/178731944/u',
    deezer: 'https://link.deezer.com/s/322B8gd3BgrDmot0Z8yHU'
  },
  credits: `Vocal/Bass: Zami Hossain
Guitars: Rumman Sharier, Hasan Zamil
Drums: Naweed Kabir
Recorded at: Studio Mars, Bangladesh
Producer: Syed Arif Al Hoque and KARMANT
Cover art: Arcane Designs
Lyrics: Zami Hossain
Distributor: DistroKid`,
}

export default function TrackPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back to EP */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/music/riot-in-uniform"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to EP – {trackData.epTitle}
          </Link>
          
          {/* Track Navigation */}
          <div className="flex items-center gap-4">
            {currentTrackIndex > 0 && (
              <Link
                href={`/music/riot-in-uniform/${tracks[currentTrackIndex - 1].slug}`}
                className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Prev
              </Link>
            )}
            {currentTrackIndex < tracks.length - 1 && (
              <Link
                href={`/music/riot-in-uniform/${tracks[currentTrackIndex + 1].slug}`}
                className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
              >
                Next
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Artwork */}
          <div className="relative aspect-square max-w-lg mx-auto md:mx-0 w-full" style={{ maxWidth: 'calc(32rem + 44px)' }}>
            <div className="relative w-full h-full thrash-border distortion-hover overflow-hidden">
              <ImageWithFallback
                src={trackData.artwork}
                alt={trackData.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-block px-3 py-1 bg-metal-red text-white text-xs font-bold uppercase tracking-wider">
                  Track 3
                </span>
                <Link
                  href="/music/riot-in-uniform"
                  className="inline-block px-3 py-1 bg-black/30 border border-metal-red text-metal-red text-xs font-bold uppercase tracking-wider hover:bg-metal-red hover:text-white transition-colors"
                >
                  {trackData.epTitle}
                </Link>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-metal-light mb-4 font-display">
                {trackData.title}
              </h1>
              {trackData.releaseDate && (
                <div className="flex flex-col gap-2 text-metal-light opacity-75 mb-6">
                  <span>Released: {trackData.releaseDate}</span>
                  <span>Duration: {trackData.duration}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {trackData.description && (
              <div className="mb-12">
                <p className="text-base text-metal-light leading-relaxed whitespace-pre-line opacity-90">
                  {trackData.description}
                </p>
              </div>
            )}

            {/* Streaming Buttons */}
            {trackData.streaming && Object.keys(trackData.streaming).length > 0 && (
              <div className="mb-8">
                <h3 className="text-base font-bold text-metal-red mb-4 uppercase tracking-wider -mt-[3px]">Stream on</h3>
                <div className="flex flex-wrap gap-3">
                  {trackData.streaming.bandcamp && trackData.streaming.bandcamp.trim() && (
                    <a
                      href={trackData.streaming.bandcamp}
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
                  )}
                  {trackData.streaming.spotify && trackData.streaming.spotify.trim() && (
                    <a
                      href={trackData.streaming.spotify}
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
                  )}
                  {trackData.streaming.apple && trackData.streaming.apple.trim() && (
                    <a
                      href={trackData.streaming.apple}
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
                  )}
                  {trackData.streaming.youtube && trackData.streaming.youtube.trim() && (
                    <a
                      href={trackData.streaming.youtube}
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
                  )}
                  {trackData.streaming.amazon && trackData.streaming.amazon.trim() && (
                    <a
                      href={trackData.streaming.amazon}
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
                  )}
                  {trackData.streaming.tidal && trackData.streaming.tidal.trim() && (
                    <a
                      href={trackData.streaming.tidal}
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
                  )}
                  {trackData.streaming.deezer && trackData.streaming.deezer.trim() && (
                    <a
                      href={trackData.streaming.deezer}
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
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Lyrics */}
        {trackData.lyrics && (
          <section className="mb-16">
            <div className="flex justify-center mb-6">
              <h2 className="text-base md:text-lg font-bold text-metal-red uppercase tracking-wider relative inline-block px-6 py-2">
                <span className="relative z-10">Lyrics</span>
                <span className="absolute inset-0 bg-metal-red/20 blur-md" />
                <span className="absolute inset-0 border border-metal-red/30" />
              </h2>
            </div>
            <div className="relative p-4 md:p-6 overflow-hidden">
              {/* Background artwork with dark overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${trackData.artwork})`,
                  opacity: 0.6,
                }}
              />
              {/* Dark overlay for readability */}
              <div className="absolute inset-0 bg-black/80" />
              {/* Fade edges effect - dissolves into page background */}
              <div className="absolute inset-0 pointer-events-none" style={{
                background: 'linear-gradient(to right, rgba(0, 0, 0, 0.8) 0%, transparent 5%, transparent 95%, rgba(0, 0, 0, 0.8) 100%), linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 0%, transparent 5%, transparent 95%, rgba(0, 0, 0, 0.8) 100%)'
              }} />
              
              {/* Content */}
              <div className="relative z-10 prose prose-invert max-w-none text-sm text-center">
                {trackData.lyrics.split('\n\n').map((section: string, sectionIndex: number) => {
                  const lines = section.split('\n').filter(line => line.trim())
                  if (lines.length === 0) return null
                  
                  return (
                    <div key={sectionIndex} className="mb-6 last:mb-0">
                      <div className="space-y-1 text-metal-light leading-relaxed text-center">
                        {lines.map((line: string, lineIndex: number) => {
                          if (!line.trim()) return null
                          // Check if line is a special note (like guitar solo)
                          const isSpecialNote = line.trim().startsWith('(') && line.trim().endsWith(')')
                          
                          return (
                            <p 
                              key={lineIndex} 
                              className={`text-sm opacity-90 ${isSpecialNote ? 'italic text-metal-red opacity-75' : ''}`}
                            >
                              {line.trim()}
                            </p>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Credits and Video */}
        {(trackData.credits || trackData.streaming?.youtube) && (
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-2 items-stretch">
            {/* Credits */}
            {trackData.credits && (
              <section>
            <h2 className="text-base md:text-lg font-bold text-metal-red mb-10 uppercase tracking-wider relative inline-block px-6 py-2">
              <span className="relative z-10">Credits</span>
              <span className="absolute inset-0 bg-metal-red/20 blur-md" />
              <span className="absolute inset-0 border border-metal-red/30" />
            </h2>
            <div className="w-full bg-metal-darker border-l-2 border-metal-red pt-0 pb-0 pl-6 md:pl-8 pr-6 md:pr-8 space-y-4">
              {trackData.credits.split('\n').map((credit: string, index: number) => {
                if (!credit.trim()) return null
                const [role, ...nameParts] = credit.split(':')
                const name = nameParts.join(':').trim()
                
                return (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-6">
                    <div className="text-metal-red font-bold text-sm uppercase tracking-wider w-[140px] sm:w-[200px] flex-shrink-0 break-words">
                      {role.trim()}
                    </div>
                    <div className="text-metal-light text-sm opacity-90 flex-1 min-w-0">
                      {name}
                    </div>
                  </div>
                )
              })}
            </div>
              </section>
            )}

            {/* YouTube Video */}
            {trackData.streaming?.youtube && trackData.streaming.youtube.trim() && (() => {
              // Extract video ID from YouTube URL
              const getYouTubeVideoId = (url: string): string | null => {
                const patterns = [
                  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
                  /youtube\.com\/.*[?&]v=([^&\n?#]+)/
                ]
                for (const pattern of patterns) {
                  const match = url.match(pattern)
                  if (match && match[1]) {
                    return match[1]
                  }
                }
                return null
              }
              
              const videoId = getYouTubeVideoId(trackData.streaming.youtube)
              
              if (videoId) {
                return (
                  <div className="w-full h-full overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`}
                      title={`${trackData.title} - Video`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )
              }
              return null
            })()}
          </div>
        )}
      </div>
    </div>
  )
}

