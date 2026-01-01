import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import ImageWithFallback from '@/components/ImageWithFallback'
import Link from 'next/link'

interface PageProps {
  params: {
    slug: string
  }
}

// Release data - this should match the data in /music/page.tsx
const releasesData: Record<string, any> = {
  'smelling-death-rebirth-of-general-destroyer': {
    slug: 'smelling-death-rebirth-of-general-destroyer',
    image: '/images/releases/Singles/Smellingdeath.png',
    title: 'Smelling Death (Rebirth of General Destroyer)',
    releaseDate: '29 Jun 2022',
    type: 'Single',
    isDemo: true,
    description: `The lyrics describe the journey of a fetus from innocence to awareness, fear, and ultimately, vengeance. Initially, it views conception as a victory, unaware of the impending threat of abortion.

As the fetus becomes aware, fear takes hold, realizing it is unwanted, trapped in silence, and facing the prospect of death. Eventually, the fear transforms into rage, marking a critical moment when the fetus rejects its fate and vows to fight back. Even in death, it lingers as an entity of vengeance, symbolizing a curse upon those who denied its life.

The fetus evolves from a passive victim into General Destroyer, a fictional character that embodies the anti-hero aspect of all living beings, serving as a metaphysical force of wrath that manifests the consequences of a world that discards life so easily.`,
    tracklist: [],
    streaming: {
      youtube: "https://youtu.be/LlAY96Yts5o?si=l702-kraIc7NNb8r"
    },
    credits: `Lyrics: Mahmudul Alam
Singing: Mahdee Manzil Swarga
Composition, arrangement, guitar & bass: Zami Hossain
Guitar Solo: Fahim Pasha
Post-production: Studio Baksho`,
    lyrics: `Verse (01)

A race among thousands
Only one makes it to the end
Sees the light of the victory
With no eyes, with no vision
Naive placentas vanquisher
Too sophisticated to melt
Power surge of victuals
In a womb of a pathetic self

Verse (02)

The race of life to make it to the end
The light of victory disappeared in an instant
The culling of humans and the earth they left
Without eyes or vision, the womb of pathetic self
Afraid of life, unwanted, vilified
Searching for an unknown light
To create a life where crime is to survive
Locked in the abyss of mind

Chorus (01)

My violent nightmares
Convulsions & smelling of death
My life's reflection
Twisted cord in scalpel's wake
To create a life where crime is to survive
We are monsters of our own demise

Verse (03)

Still not aware of the truth
Life to go astray
Lump of flesh denied birth
Meant to be thrown away
At that moment, I knew
I would destroy this world
A society so rotten
Walls of rubble & mud

Recitation

Am I hearing things in my head?
Am I smelling my own death?
Afraid of life, unwanted, vilified
You'll be hacked to death if I survive

Verse (04)

Shadowed cloisters run in slithered contour
Unfurls the pretense of good in light no more
Hatred of a lifetime brings forth a glorious birth
A wretched soul wakes to eat the marrow of the earth
A path forward to fight this deception
A rise in the surge of bitter self-perception

Chorus (02)

My violent nightmares
Convulsions & smelling of death
My life's reflection
Twisted cord in scalpel's wake
To create a life where crime is to survive
We are monsters of our own demise`,
  },
  'riot-in-uniform': {
    slug: 'riot-in-uniform',
    image: '/images/releases/EPs/riot.png',
    title: 'Riot In Uniform',
    releaseDate: 'April 01 2021',
    type: 'EP',
    description: `Riot in Uniform addresses the root of all problems in a society which is the system itself. This EP symbolizes the sacrifices made by students in uniform back in 2018 after two children were killed by a speeding bus. Through the fast and raw manifestation the band wishes to pay a tribute to all those brave souls who stood together to make a change in the streets of Bangladesh which they ultimately did.

The EP stands as a reminder that uniforms once worn for learning became symbols of courage and unity.`,
    tracklist: [
      { name: 'Nuclear Outbreak', duration: '05:11' },
      { name: 'Riot in Uniform', duration: '05:11', hasLyrics: true, buyTrack: 'https://karmant.bandcamp.com/track/riot-in-uniform' },
      { name: 'Greed', duration: '04:07' },
      { name: 'General Destroyer', duration: '05:26' }
    ],
    streaming: {
      bandcamp: 'https://karmant.bandcamp.com/album/riot-in-uniform',
      spotify: 'https://open.spotify.com/album/1BvSPb2mIsduZI1OAcm28O?si=fvjjQ7_tT9uXTcBkqNa1Zw',
      apple: 'https://music.apple.com/ca/album/riot-in-uniform-ep/1560509926',
      youtube: 'https://youtube.com/playlist?list=PLjvcEUPyZSDY0rLGnwnhBHem-ZaCjTANC&si=TsR6R4bzljAQRDLw',
      amazon: 'https://amazon.com/music/player/albums/B0917VKFDP?marketplaceId=ATVPDKIKX0DER&musicTerritory=US&ref=dm_sh_dyurMRRTgVWN8iNRKq91ii4KZ',
      tidal: 'https://tidal.com/album/178731941/u',
      deezer: 'https://link.deezer.com/s/322vsfEw2bFGadoq0VVyi'
    },
    credits: `Vocal/Bass: Zami Hossain
Guitars: Rumman Sharier, Hasan Zamil
Drums: Naweed Kabir
Recorded at: Studio Mars, Bangladesh
Producer: Syed Arif Al Hoque and KARMANT
Cover art: Arcane Designs
Lyrics: Zami Hossain
Distributor: DistroKid`,
  },
  'zip-tied-gutted': {
    slug: 'zip-tied-gutted',
    image: '/images/releases/Singles/Ziptied.png',
    title: 'Zip-Tied, Gutted',
    releaseDate: '8 Feb 2023',
    type: 'Single',
    isDemo: true,
    description: `The main theme explores the pain of being trapped in a hostile environment, feeling restrained and broken, and the eventual fight against those who cause harm and suffering. It paints a vivid picture of a society on the brink of rebellion, fueled by anger and injustice, while also highlighting the mental toll of surviving in such harsh conditions.

It further reflects a collective awakening where silence turns into defiance and endurance hardens into resolve.

The narrative centers on moral reckoning exposing cycles of oppression and retaliation born from prolonged neglect. It emphasizes unity forged through shared trauma and the reclaiming of identity from systems built to erase it.

At its core the theme confronts power consequence and the irreversible moment when survival demands resistance.`,
    tracklist: [],
    streaming: {
      youtube: "https://youtu.be/5E44XZxPtb4?si=gqJ-SqwoFR9QL7lc"
    },
    credits: `Lyrics: Mahmudul Alam
Singing & post-production: Mahdee Manzil Shorgo
Composition, arrangement, guitar & bass: Zami Hossain
Guitar Solo: Rakibul Alam Rafat, Fahim Pasha`,
    lyrics: `Verse (01)

Confined in this land of dissent 
Days spent in self-loathing & desolate hate
Living among festering parasites
Slumbering every day & we're left to die 

Verse (02)

Innocence adrift in fatal objection
Locked in our own land for far too long
Enough of watching away in misery
Sharpen the axe in hand, reclaim the destiny 

Chorus (01)

Slandered & corroded
The bullets are loaded
Lynched & executed
The deviants untamed
What you dealt to us
Will be dealt unto you
Zip-tied, gutted
Brutalized & ran through

Verse (03)

Bewildered, demented claustrophobia
Friends turned enemies, knock-off eutopia
Corpses lying stiff & thoughtlessly ravaged
Either we rise up, or they sever our heads

Chorus (02)

Slandered & corroded
The bullets are loaded
Lynched & executed
The deviants untamed
What you dealt to us
Will be dealt unto you
Zip-tied, gutted
Brutalized & ran through

Verse (04)

Our sacrifices are engraved in the crystal blue
Victims of war will never be subdued
You blamed us without any discretion
Now rest assured of your own destruction
 
Chorus (03)

Slandered & corroded
The bullets are loaded
Lynched & executed
The deviants untamed
What you dealt to us
Will be dealt unto you
Zip-tied, gutted
Brutalized & ran through`,
  },
  'hack-slash': {
    slug: 'hack-slash',
    image: '/images/releases/Albums/hackandslash.png',
    title: 'Hack & Slash',
    releaseDate: '',
    isUpcoming: true,
    type: 'Album',
    description: `1. Smelling Death
2. Skull Granade
3. Hyena
4. Zip-Tied, Gutted
5. Magma Sky
6. Hack & Slash
7. Slaughter Excursion
8. The Last Stand`,
    tracklist: [
      'Smelling Death',
      'Skull Granade',
      'Hyena',
      'Zip-Tied, Gutted',
      'Magma Sky',
      'Hack & Slash',
      'Slaughter Excursion',
      'The Last Stand'
    ],
    streaming: {},
  },
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const release = releasesData[params.slug]
  
  if (!release) {
    return {
      title: 'Release Not Found | Karmant (BD)',
    }
  }

  return {
    title: `${release.title} | Karmant (BD)`,
    description: release.description || `${release.title} - ${release.type} by Karmant`,
    openGraph: {
      title: `${release.title} | Karmant (BD)`,
      description: release.description || `${release.title} - ${release.type} by Karmant`,
      images: release.image ? [release.image] : [],
      type: 'music.song',
    },
  }
}

export default function ReleasePage({ params }: PageProps) {
  const release = releasesData[params.slug]

  if (!release) {
    notFound()
  }

  const isEP = release.type === 'EP'
  const isSingle = release.type === 'Single'
  const isAlbum = release.type === 'Album'

  // Get all releases by type for navigation
  const allEPs = Object.values(releasesData)
    .filter((r: any) => r.type === 'EP')
    .map((r: any) => r.slug)
  
  const allAlbums = Object.values(releasesData)
    .filter((r: any) => r.type === 'Album')
    .map((r: any) => r.slug)

  // Get all singles for navigation
  const parseDate = (dateStr: string): number => {
    if (!dateStr) return 0
    // Handle formats like "29 Jun 2022" or "8 Feb 2023" or "April 01 2021"
    const monthMap: Record<string, number> = {
      'jan': 0, 'january': 0, 'feb': 1, 'february': 1, 'mar': 2, 'march': 2,
      'apr': 3, 'april': 3, 'may': 4, 'jun': 5, 'june': 5,
      'jul': 6, 'july': 6, 'aug': 7, 'august': 7, 'sep': 8, 'september': 8,
      'oct': 9, 'october': 9, 'nov': 10, 'november': 10, 'dec': 11, 'december': 11
    }
    
    const parts = dateStr.toLowerCase().trim().split(/\s+/)
    if (parts.length >= 3) {
      const day = parseInt(parts[0])
      const month = monthMap[parts[1]] ?? 0
      const year = parseInt(parts[2])
      if (!isNaN(day) && !isNaN(year) && month !== undefined) {
        return new Date(year, month, day).getTime()
      }
    }
    // Fallback to standard Date parsing
    const parsed = new Date(dateStr).getTime()
    return isNaN(parsed) ? 0 : parsed
  }

  const allSingles = Object.values(releasesData)
    .filter((r: any) => r.type === 'Single')
    .sort((a: any, b: any) => {
      // Sort by release date (oldest first)
      return parseDate(a.releaseDate) - parseDate(b.releaseDate)
    })
    .map((r: any) => r.slug)

  const currentSingleIndex = isSingle ? allSingles.indexOf(params.slug) : -1
  const firstSingleSlug = allSingles.length > 0 ? allSingles[0] : null
  const firstAlbumSlug = allAlbums.length > 0 ? allAlbums[0] : null
  const firstEPSlug = allEPs.length > 0 ? allEPs[0] : null

  return (
    <div className={`relative ${isEP || isAlbum ? 'min-h-screen' : ''} pt-20 pb-20 px-4 sm:px-6 lg:px-8`}>
      {/* Hero Background - Full Page (EP and Album) */}
      {(isEP || isAlbum) && (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url(${release.image})`,
              backgroundPosition: 'center 70%',
              opacity: 0.5,
            }}
          />
          {/* Dark overlay for increased darkness */}
          <div className="absolute inset-0 bg-black/75" />
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Back to Music */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/music"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Discography
          </Link>
          
          {/* Single Navigation */}
          {isSingle && currentSingleIndex >= 0 && (
            <div className="flex items-center gap-4">
              {currentSingleIndex > 0 && (
                <Link
                  href={`/music/${allSingles[currentSingleIndex - 1]}`}
                  className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Prev
                </Link>
              )}
              {currentSingleIndex < allSingles.length - 1 && (
                <Link
                  href={`/music/${allSingles[currentSingleIndex + 1]}`}
                  className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Main Layout */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Artwork */}
          <div className="relative aspect-square max-w-lg mx-auto md:mx-0 w-full" style={{ maxWidth: 'calc(32rem + 44px)' }}>
            <div className="relative w-full h-full thrash-border distortion-hover overflow-hidden">
              <ImageWithFallback
                src={release.image}
                alt={release.title}
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
              <div className="flex items-center justify-between gap-2 mb-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="inline-block px-3 py-1 bg-metal-red text-white text-xs font-bold uppercase tracking-wider">
                    {release.type}
                  </span>
                  {release.isDemo && (
                    <span className="inline-block px-3 py-1 bg-black/30 border border-metal-red text-metal-red text-xs font-bold uppercase tracking-wider">
                      Demo
                    </span>
                  )}
                </div>
                
                {/* View Other Types Navigation */}
                {(isEP || isSingle || isAlbum) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    {isEP && (
                      <>
                        {firstSingleSlug && (
                          <Link
                            href={`/music/${firstSingleSlug}`}
                            className="flex items-center gap-2 px-3 py-1 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                          >
                            View Singles
                          </Link>
                        )}
                        {firstAlbumSlug && (
                          <Link
                            href={`/music/${firstAlbumSlug}`}
                            className="flex items-center gap-2 px-3 py-1 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                          >
                            View Albums
                          </Link>
                        )}
                      </>
                    )}
                    {isSingle && (
                      <>
                        {firstEPSlug && (
                          <Link
                            href={`/music/${firstEPSlug}`}
                            className="flex items-center gap-2 px-3 py-1 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                          >
                            View EP
                          </Link>
                        )}
                        {firstAlbumSlug && (
                          <Link
                            href={`/music/${firstAlbumSlug}`}
                            className="flex items-center gap-2 px-3 py-1 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                          >
                            View Albums
                          </Link>
                        )}
                      </>
                    )}
                    {isAlbum && (
                      <>
                        {firstEPSlug && (
                          <Link
                            href={`/music/${firstEPSlug}`}
                            className="flex items-center gap-2 px-3 py-1 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                          >
                            View EP
                          </Link>
                        )}
                        {firstSingleSlug && (
                          <Link
                            href={`/music/${firstSingleSlug}`}
                            className="flex items-center gap-2 px-3 py-1 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 text-xs font-bold uppercase tracking-wider"
                          >
                            View Singles
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-metal-light mb-4 font-display">
                {release.title}
              </h1>
              {release.releaseDate && (
                <div className="flex items-center gap-4 text-metal-light opacity-75 mb-6 flex-wrap">
                  <span>Released: {release.releaseDate}</span>
                  {release.type === 'Single' && release.streaming?.youtube && release.streaming.youtube.trim() && (
                    <a
                      href={release.streaming.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md hover:shadow-metal-red/30"
                      aria-label="Listen on YouTube"
                    >
                      <Image
                        src="/images/icons/youtube.png"
                        alt="YouTube"
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5 object-contain"
                      />
                      <span className="text-xs font-bold uppercase tracking-wider">Listen</span>
                    </a>
                  )}
                </div>
              )}
              {release.isUpcoming && (
                <div className="mb-6">
                  <span className="text-2xl font-bold text-metal-red uppercase tracking-wider">
                    Impending Release!
                  </span>
                </div>
              )}
            </div>

            {/* Description */}
            {release.description && (
              <div className="mb-12">
                {release.type === 'Album' && release.tracklist && release.tracklist.length > 0 ? (
                  <>
                    <h2 className={`text-base md:text-lg font-bold text-metal-red mb-6 uppercase tracking-wider relative inline-block px-6 py-2 ${release.isUpcoming ? 'mt-8' : ''}`}>
                      <span className="relative z-10">Tracklist</span>
                      <span className="absolute inset-0 bg-metal-red/20 blur-md" />
                      <span className="absolute inset-0 bg-black/30" />
                      <span className="absolute inset-0 border border-metal-red/30" />
                    </h2>
                    <div className="w-full bg-transparent pt-0 pb-0">
                      <ol className="space-y-2 text-left">
                        {release.tracklist.map((track: any, index: number) => {
                          const trackName = typeof track === 'string' ? track : track.name
                          return (
                            <li key={index} className="text-metal-light text-base opacity-90">
                              {index + 1}. {trackName}
                            </li>
                          )
                        })}
                      </ol>
                    </div>
                  </>
                ) : (
                  <p className="text-base text-metal-light leading-relaxed whitespace-pre-line opacity-90">
                    {release.description}
                  </p>
                )}
              </div>
            )}

            {/* Streaming Buttons */}
            {release.type !== 'Single' && Object.keys(release.streaming || {}).length > 0 && (
              <div className="mb-8">
                <h3 className="text-base font-bold text-metal-red mb-4 uppercase tracking-wider -mt-[3px]">Stream on</h3>
                <div className="flex flex-wrap gap-3">
                  {release.streaming.bandcamp && release.streaming.bandcamp.trim() && (
                    <a
                      href={release.streaming.bandcamp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105"
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
                  {release.streaming.spotify && release.streaming.spotify.trim() && (
                    <a
                      href={release.streaming.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105"
                      aria-label="Listen on Spotify"
                    >
                      <svg className="w-5 h-5" fill="#1DB954" viewBox="0 0 24 24">
                        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                      </svg>
                      <span className="text-sm font-bold uppercase tracking-wider">Spotify</span>
                    </a>
                  )}
                  {release.streaming.apple && release.streaming.apple.trim() && (
                    <a
                      href={release.streaming.apple}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105"
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
                  {release.streaming.youtube && release.streaming.youtube.trim() && (
                    <a
                      href={release.streaming.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105"
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
                  {release.streaming.amazon && release.streaming.amazon.trim() && (
                    <a
                      href={release.streaming.amazon}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105"
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
                  {release.streaming.tidal && release.streaming.tidal.trim() && (
                    <a
                      href={release.streaming.tidal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105"
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
                  {release.streaming.deezer && release.streaming.deezer.trim() && (
                    <a
                      href={release.streaming.deezer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 hover:scale-105"
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

        {/* Tracklist */}
        {release.tracklist && release.tracklist.length > 0 && release.type !== 'Album' && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-metal-red mb-8 uppercase tracking-wider text-center">Tracklist</h2>
            {release.tracklist.length === 4 ? (
              // Special grid layout for 4-track EPs
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {release.tracklist.map((track: any, index: number) => {
                  const trackName = typeof track === 'string' ? track : track.name
                  const trackDuration = typeof track === 'object' ? track.duration : ''
                  const trackSlug = trackName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
                  const trackUrl = release.slug === 'riot-in-uniform' ? `/music/riot-in-uniform/${trackSlug}` : null
                  
                  const TrackCard = trackUrl ? Link : 'div'
                  const cardProps = trackUrl ? { href: trackUrl } : {}
                  
                  return (
                    <TrackCard
                      key={index}
                      {...cardProps}
                      className={`group relative overflow-hidden border-2 border-metal-light/30 hover:border-metal-red transition-all duration-300 ${trackUrl ? 'cursor-pointer' : ''}`}
                    >
                      {/* Background artwork overlay */}
                      <div 
                        className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                        style={{
                          backgroundImage: `url(${release.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          filter: 'blur(8px)'
                        }}
                      />
                      {/* Dark overlay - semi-transparent to match original darkness, becomes more transparent on hover */}
                      <div className="absolute inset-0 bg-metal-darker/50 group-hover:bg-metal-darker/20 transition-all duration-300" />
                      {/* Content */}
                      <div className="relative z-10 p-6 flex items-center justify-between">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="relative flex-shrink-0">
                              <span className="text-4xl font-bold text-metal-red opacity-50 group-hover:opacity-70 transition-opacity leading-none">
                                {String(index + 1)}
                              </span>
                            </div>
                          <div className="flex-1 min-w-0 pt-1">
                            <h3 className="text-xl font-bold text-metal-light group-hover:text-metal-red transition-colors uppercase tracking-tight">
                              {trackName}
                            </h3>
                            {trackDuration && (
                              <p className="text-sm text-metal-light opacity-75 mt-1">
                                {trackDuration}
                              </p>
                            )}
                          </div>
                        </div>
                        {/* Play icon on hover */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-6 h-6 text-metal-red" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                      {/* Hover accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                    </TrackCard>
                  )
                })}
              </div>
            ) : (
              // Default list layout for other track counts
              <div className="setlist-card">
                <ol className="space-y-3">
                  {release.tracklist.map((track: any, index: number) => {
                    const trackName = typeof track === 'string' ? track : track.name
                    const trackDuration = typeof track === 'object' ? track.duration : ''
                    
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-between group py-2 border-b border-metal-gray last:border-0"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-metal-red font-bold text-sm w-8 flex-shrink-0">
                            {String(index + 1)}
                          </span>
                          <div className="flex items-center gap-3">
                            <span className="text-metal-light font-semibold">{trackName}</span>
                            {trackDuration && (
                              <span className="text-sm text-metal-light opacity-75">
                                {trackDuration}
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ol>
              </div>
            )}
          </section>
        )}

        {/* Lyrics */}
        {release.lyrics && (
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
                  backgroundImage: `url(${release.image})`,
                  opacity: 0.4,
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
                {release.lyrics.split('\n\n').map((section: string, sectionIndex: number) => {
                  const lines = section.split('\n').filter(line => line.trim())
                  if (lines.length === 0) return null
                  
                  const firstLine = lines[0]?.trim() || ''
                  
                  // Check if first line is a section title (Verse, Chorus, Recitation with numbers or just "Recitation")
                  const isSectionTitle = /^(Verse|Chorus|Recitation)\s*(\(?\d+\)?)?$/i.test(firstLine)
                  
                  return (
                    <div key={sectionIndex} className="mb-6 last:mb-0">
                      {isSectionTitle ? (
                        <>
                          <h3 
                            className="text-sm md:text-base font-bold text-metal-red mb-4 uppercase tracking-wider text-center"
                            style={{
                              textShadow: '0 4px 8px rgba(220, 38, 38, 0.5), 0 2px 4px rgba(0, 0, 0, 0.8)'
                            }}
                          >
                            {firstLine}
                          </h3>
                          <div className="space-y-1 text-metal-light leading-relaxed text-center">
                            {lines.slice(1).map((line: string, lineIndex: number) => {
                              if (!line.trim()) return null
                              return (
                                <p key={lineIndex} className="text-sm opacity-90">
                                  {line.trim()}
                                </p>
                              )
                            })}
                          </div>
                        </>
                      ) : (
                        <div className="space-y-1 text-metal-light leading-relaxed text-center">
                          {lines.map((line: string, lineIndex: number) => {
                            if (!line.trim()) return null
                            return (
                              <p key={lineIndex} className="text-sm opacity-90">
                                {line.trim()}
                              </p>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Credits and Video */}
        {(release.credits || release.streaming?.youtube) && (
          <div className="grid md:grid-cols-[1.2fr_1fr] gap-2 items-stretch">
            {/* Credits */}
            {release.credits && (
              <section>
                <h2 className="text-base md:text-lg font-bold text-metal-red mb-10 uppercase tracking-wider relative inline-block px-6 py-2">
                  <span className="relative z-10">Credits</span>
                  <span className="absolute inset-0 bg-metal-red/20 blur-md" />
                  <span className="absolute inset-0 bg-black/30" />
                  <span className="absolute inset-0 border border-metal-red/30" />
                </h2>
                 <div className="w-full bg-transparent border-l-2 border-metal-red pt-0 pb-0 pl-6 md:pl-8 pr-6 md:pr-8 space-y-4">
                  {release.credits.split('\n').map((credit: string, index: number) => {
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
            {release.streaming?.youtube && release.streaming.youtube.trim() && (() => {
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
              
              const videoId = getYouTubeVideoId(release.streaming.youtube)
              
              if (videoId) {
                return (
                  <div className="w-full h-full overflow-hidden">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}?rel=0&enablejsapi=1`}
                      title={`${release.title} - Video`}
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
