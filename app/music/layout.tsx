import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Music | Karmant (BD)',
  description: 'Official releases, singles, and live cuts from Karmant. Browse the complete discography.',
}

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

