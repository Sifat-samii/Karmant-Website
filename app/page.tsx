import Hero from '@/components/Hero'
import LatestRelease from '@/components/LatestRelease'
import UpcomingShows from '@/components/UpcomingShows'
import FeaturedVideo from '@/components/FeaturedVideo'
import MerchPreview from '@/components/MerchPreview'
import NewsPreview from '@/components/NewsPreview'

export default function Home() {
  return (
    <>
      <Hero />
      <LatestRelease />
      <MerchPreview />
      <FeaturedVideo />
      <UpcomingShows />
      <NewsPreview />
    </>
  )
}

