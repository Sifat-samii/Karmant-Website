interface Release {
  slug: string
  title: string
  type: string
  releaseDate: string
  artwork: string
  tracklist: string[]
  streaming: Record<string, string>
  featuredTrack?: string
  description?: string
}

type FilterType = 'All' | 'EP' | 'Single' | 'Album' | 'Live'
type SortOption = 'newest' | 'oldest' | 'a-z'

export function buildSearchIndex(releases: Release[]): Map<string, string[]> {
  const index = new Map<string, string[]>()
  
  releases.forEach((release) => {
    const terms: string[] = []
    
    // Add title terms
    release.title.toLowerCase().split(/\s+/).forEach((term) => {
      if (term.length > 2) {
        terms.push(term)
      }
    })
    
    // Add track terms
    release.tracklist?.forEach((track) => {
      track.toLowerCase().split(/\s+/).forEach((term) => {
        if (term.length > 2) {
          terms.push(term)
        }
      })
    })
    
    // Add description terms
    if (release.description) {
      release.description.toLowerCase().split(/\s+/).forEach((term) => {
        if (term.length > 2) {
          terms.push(term)
        }
      })
    }
    
    terms.forEach((term) => {
      if (!index.has(term)) {
        index.set(term, [])
      }
      if (!index.get(term)!.includes(release.slug)) {
        index.get(term)!.push(release.slug)
      }
    })
  })
  
  return index
}

export function searchReleases(
  releases: Release[],
  query: string,
  searchIndex: Map<string, string[]>
): Release[] {
  if (!query.trim()) {
    return releases
  }
  
  const queryTerms = query.toLowerCase().split(/\s+/).filter((term) => term.length > 2)
  const matchingSlugs = new Set<string>()
  
  queryTerms.forEach((term) => {
    searchIndex.forEach((slugs, indexTerm) => {
      if (indexTerm.includes(term) || term.includes(indexTerm)) {
        slugs.forEach((slug) => matchingSlugs.add(slug))
      }
    })
  })
  
  return releases.filter((release) => matchingSlugs.has(release.slug))
}

export function filterReleases(releases: Release[], filter: FilterType): Release[] {
  if (filter === 'All') {
    return releases
  }
  
  return releases.filter((release) => release.type.toLowerCase() === filter.toLowerCase())
}

export function sortReleases(releases: Release[], sort: SortOption): Release[] {
  const sorted = [...releases]
  
  switch (sort) {
    case 'newest':
      return sorted.sort((a, b) => 
        new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
      )
    case 'oldest':
      return sorted.sort((a, b) => 
        new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()
      )
    case 'a-z':
      return sorted.sort((a, b) => a.title.localeCompare(b.title))
    default:
      return sorted
  }
}

export function getTopTracks(releases: Release[], limit: number = 10): Array<{
  name: string
  release: string
  releaseSlug: string
  year: number
  link?: string
}> {
  const tracks: Array<{
    name: string
    release: string
    releaseSlug: string
    year: number
    link?: string
  }> = []
  
  releases.forEach((release) => {
    const year = new Date(release.releaseDate).getFullYear()
    const featuredTrack = release.featuredTrack || release.tracklist[0]
    
    if (featuredTrack) {
      tracks.push({
        name: featuredTrack,
        release: release.title,
        releaseSlug: release.slug,
        year,
        link: (release.streaming.bandcamp && release.streaming.bandcamp.trim()) 
          || (release.streaming.spotify && release.streaming.spotify.trim())
          || (release.streaming.youtube && release.streaming.youtube.trim()),
      })
    }
  })
  
  // Sort by year (newest first), then by release title
  tracks.sort((a, b) => {
    if (b.year !== a.year) {
      return b.year - a.year
    }
    return a.release.localeCompare(b.release)
  })
  
  return tracks.slice(0, limit)
}

