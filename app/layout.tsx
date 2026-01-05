import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], variable: '--font-body' })

export const metadata: Metadata = {
  title: 'Karmant (BD) — Thrash Metal',
  description: 'Karmant is a thrash metal band from Dhaka, Bangladesh, formed in 2016. Debut EP "Riot in Uniform" released 2021.',
  keywords: ['Karmant', 'thrash metal', 'Bangladesh', 'Dhaka', 'metal band', 'Riot in Uniform', 'Bangladesh metal'],
  authors: [{ name: 'Karmant' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://karmant.com',
    siteName: 'Karmant (BD)',
    title: 'Karmant (BD) — Thrash Metal',
    description: 'Underground thrash metal band from Dhaka, Bangladesh. Formed 2016. Debut EP "Riot in Uniform" (2021).',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Karmant (BD)',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Karmant (BD) — Thrash Metal',
    description: 'Underground thrash metal band from Dhaka, Bangladesh. Formed 2016.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navbar />
        <main className="min-h-screen pt-8">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

