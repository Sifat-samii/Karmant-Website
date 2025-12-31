'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import siteData from '@/content/site.json'

export default function Hero() {
  return (
    <section className="relative w-full flex items-center justify-center overflow-hidden" style={{ minHeight: '170vh' }}>
      {/* Background image - expands to image height */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/Front image.png"
          alt="Karmant"
          fill
          priority
          className="object-cover"
          quality={90}
          sizes="100vw"
          style={{ opacity: 1, objectPosition: 'center 50%' }}
        />
        {/* Dark overlay to darken background */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'rgba(0, 0, 0, 0.4)'
          }}
        />
        {/* Vignette effect at borders */}
        <div 
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at center, transparent 0%, rgba(0, 0, 0, 0.5) 100%)'
          }}
        />
      </div>
      
      {/* Content - foreground */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto" style={{ paddingTop: '0', paddingBottom: '2rem' }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
          style={{ marginTop: '-25rem' }}
        >
          <div className="mb-3 flex justify-center">
            <Image
              src="/images/logo.bg.png"
              alt="Karmant Logo"
              width={800}
              height={800}
              className="max-w-full h-auto"
              priority
            />
          </div>
          <p 
            className="text-2xl md:text-3xl text-metal-light uppercase tracking-wider"
            style={{ 
              textShadow: '0 4px 8px rgba(0, 0, 0, 0.8), 0 8px 16px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 0, 0, 0.5)'
            }}
          >
            Bangladesh Thrash Metal
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4"
          style={{ marginTop: '1rem' }}
        >
          <a 
            href={siteData.socials.bandcamp || '#'} 
            className="btn-primary" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              backgroundColor: '#39ff14',
              border: '3px solid #ffffff',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(57, 255, 20, 0.5), 0 0 20px rgba(57, 255, 20, 0.3)',
              transform: 'translateY(-4px)',
              fontWeight: '900',
              color: '#000000'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#32e60d';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#39ff14';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(57, 255, 20, 0.5), 0 0 20px rgba(57, 255, 20, 0.3)';
            }}
          >
            Listen (Bandcamp)
          </a>
          <Link 
            href="/music" 
            className="btn-secondary"
            style={{ 
              backgroundColor: 'transparent',
              border: '3px solid #39ff14',
              color: '#39ff14',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(57, 255, 20, 0.3), 0 0 15px rgba(57, 255, 20, 0.2)',
              transform: 'translateY(-4px)',
              fontWeight: '900',
              background: 'rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#39ff14';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#39ff14';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(57, 255, 20, 0.3), 0 0 15px rgba(57, 255, 20, 0.2)';
            }}
          >
            Music
          </Link>
          <Link 
            href="/tour" 
            className="btn-secondary"
            style={{ 
              backgroundColor: 'transparent',
              border: '3px solid #39ff14',
              color: '#39ff14',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(57, 255, 20, 0.3), 0 0 15px rgba(57, 255, 20, 0.2)',
              transform: 'translateY(-4px)',
              fontWeight: '900',
              background: 'rgba(0, 0, 0, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#39ff14';
              e.currentTarget.style.color = '#000000';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(57, 255, 20, 0.5), 0 0 30px rgba(57, 255, 20, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#39ff14';
              e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(57, 255, 20, 0.3), 0 0 15px rgba(57, 255, 20, 0.2)';
            }}
          >
            Tour
          </Link>
          <Link 
            href="/merch" 
            className="btn-ghost hover:!bg-metal-light hover:!text-metal-darker"
            style={{ 
              backgroundColor: 'transparent',
              border: '3px solid #e5e5e5',
              color: '#e5e5e5',
              boxShadow: '0 8px 16px rgba(0, 0, 0, 0.8), 0 0 0 2px rgba(229, 229, 229, 0.3)',
              transform: 'translateY(-4px)',
              fontWeight: '900',
              background: 'rgba(0, 0, 0, 0.3)'
            }}
          >
            Merch
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

