'use client'

import { useState } from 'react'

type FilterType = 'All' | 'EP' | 'Single' | 'Album' | 'Live'
type SortOption = 'newest' | 'oldest' | 'a-z'

interface MusicFiltersProps {
  onSearchChange: (query: string) => void
  onFilterChange: (filter: FilterType) => void
  onSortChange: (sort: SortOption) => void
  onViewModeChange: (mode: 'grid' | 'timeline') => void
  viewMode: 'grid' | 'timeline'
}

export default function MusicFilters({
  onSearchChange,
  onFilterChange,
  onSortChange,
  onViewModeChange,
  viewMode,
}: MusicFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')
  const [activeSort, setActiveSort] = useState<SortOption>('newest')

  const filters: FilterType[] = ['All', 'EP', 'Single', 'Album', 'Live']

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearchChange(value)
  }

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter)
    onFilterChange(filter)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortOption
    setActiveSort(value)
    onSortChange(value)
  }

  return (
    <div className="space-y-4 mb-8">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search releases, tracks..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full px-4 py-3 bg-metal-gray border border-metal-red text-metal-light placeholder-metal-light/50 focus:outline-none focus:ring-2 focus:ring-metal-red focus:border-metal-red"
          aria-label="Search releases and tracks"
        />
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-metal-light opacity-50"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
                activeFilter === filter
                  ? 'bg-metal-red text-white'
                  : 'bg-metal-gray text-metal-light border border-metal-gray hover:border-metal-red'
              }`}
              aria-pressed={activeFilter === filter}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Sort and View Toggle */}
        <div className="flex gap-4 items-center">
          <select
            value={activeSort}
            onChange={handleSortChange}
            className="px-4 py-2 bg-metal-gray border border-metal-red text-metal-light focus:outline-none focus:ring-2 focus:ring-metal-red"
            aria-label="Sort releases"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="a-z">A-Z</option>
          </select>

          <div className="flex border border-metal-red">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all ${
                viewMode === 'grid'
                  ? 'bg-metal-red text-white'
                  : 'bg-metal-gray text-metal-light hover:bg-metal-gray/80'
              }`}
              aria-label="Grid view"
            >
              Grid
            </button>
            <button
              onClick={() => onViewModeChange('timeline')}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all border-l border-metal-red ${
                viewMode === 'timeline'
                  ? 'bg-metal-red text-white'
                  : 'bg-metal-gray text-metal-light hover:bg-metal-gray/80'
              }`}
              aria-label="Timeline view"
            >
              Timeline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

