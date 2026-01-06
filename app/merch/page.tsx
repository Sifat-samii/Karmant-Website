import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import MerchGridClient from '@/components/MerchGridClient'
import { merchItems } from '@/content/merch-items'

export const metadata: Metadata = {
  title: 'Merch | Karmant',
  description: 'Official Karmant merchandise - T-shirts, CDs, and more',
}

export default function MerchPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background Image - centered and slightly transparent */}
      <div 
        className="fixed inset-0 bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url("/images/artwork%20gpt%20generated%20cropped.png")',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          opacity: 0.4,
          zIndex: 0,
        }}
      />
      {/* Vignette Effect */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.9) 85%, rgba(0,0,0,0.95) 100%)',
          zIndex: 2,
        }}
      />
      {/* Horizontal Fadeout */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)',
          zIndex: 3,
        }}
      />
      {/* Vertical Fadeout */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0,0,0,0.3) 45%, rgba(0,0,0,0.6) 60%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.95) 95%, black 100%)',
          zIndex: 4,
        }}
      />

      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Back to Home - Top */}
        <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="relative text-center mb-12 overflow-hidden">
          {/* Content */}
          <div className="relative z-10 pb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-0 font-display uppercase tracking-tight">
              Merch
            </h1>
          </div>
        </div>

        {/* Merch Grid */}
        <MerchGridClient items={merchItems} />

        {/* Back to Home - Bottom */}
        <div className="mt-16 flex items-center justify-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-metal-light hover:text-metal-red transition-colors text-sm font-bold uppercase tracking-wider"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
