import { Metadata } from 'next'
import showsData from '@/content/shows.json'
import { useState } from 'react'
import TourTabs from '@/components/TourTabs'

export const metadata: Metadata = {
  title: 'Tour Dates | Karmant',
  description: 'Upcoming and past tour dates for Karmant',
}

export default function TourPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="section-heading text-metal-red">Tour Dates</h1>
        <TourTabs shows={showsData} />
      </div>
    </div>
  )
}

