import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import bandData from '@/content/band.json'

export const metadata: Metadata = {
  title: 'Band | Karmant',
  description: 'Karmant band lineup - Current members and past members',
}

export default function BandPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen relative">
      {/* Background Image - Fixed and Aligned to Top */}
      <div 
        className="fixed inset-0 bg-top bg-no-repeat bg-fixed"
        style={{
          backgroundImage: 'url(/images/dsd.png)',
          backgroundPosition: 'center top',
          backgroundSize: 'cover',
          opacity: 0.35,
          zIndex: 0,
        }}
      />
      {/* Dark Overlay - lighter overall for more background visibility */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.42) 20%, rgba(0,0,0,0.52) 45%, rgba(0,0,0,0.65) 70%, rgba(0,0,0,0.78) 90%, rgba(0,0,0,0.85) 100%)',
          zIndex: 1,
        }}
      />
      {/* Vignette Effect - Radial fadeout from edges */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.2) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.65) 85%, rgba(0,0,0,0.75) 100%)',
          zIndex: 2,
        }}
      />
      {/* Horizontal Fadeout - Dissolve sides into black */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.55) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.55) 100%)',
          zIndex: 3,
        }}
      />
      {/* Vertical Fadeout - Dissolve from middle to bottom into black */}
      <div 
        className="fixed inset-0"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, transparent 30%, rgba(0,0,0,0.06) 40%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.38) 60%, rgba(0,0,0,0.55) 70%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0.85) 90%, rgba(0,0,0,0.92) 100%)',
          zIndex: 4,
        }}
      />
      
      <div className="max-w-7xl mx-auto relative" style={{ zIndex: 10 }}>
        {/* Back to Home */}
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
        <div className="relative text-center mb-2 overflow-hidden">
          {/* Content */}
          <div className="relative z-10 pb-6 pt-0">
            <div className="flex justify-center mb-1 -mt-[15px]">
              <Image
                src="/images/Whitelogo.png"
                alt="Karmant"
                width={600}
                height={300}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Current Lineup */}
        <section className="mb-20 mt-8">
          <div className="flex justify-center mb-12">
            <h2 className="text-base md:text-lg font-bold text-metal-red uppercase tracking-wider inline-block px-6 py-2 border border-metal-red">
              Current Lineup
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bandData.currentLineup.map((member, index) => (
              <div
                key={index}
                className="group relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300"
              >
                {/* Member Image */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                  {member.image ? (
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-metal-gray flex items-center justify-center">
                      <span className="text-4xl font-bold text-metal-red opacity-50">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>

                {/* Member Info */}
                <div className="p-6 relative z-20">
                  <div className="mb-2">
                    <h3 className="text-xl font-bold text-metal-light group-hover:text-metal-red transition-colors uppercase tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-sm text-metal-red font-bold uppercase tracking-wider mt-1">
                      {member.role}
                    </p>
                    <p className="text-xs text-metal-light opacity-75 mt-1">
                      {member.years}
                    </p>
                  </div>
                  <p className="text-sm text-metal-light opacity-90 leading-relaxed">
                    {member.bio}
                  </p>
                  
                  {/* Social Links */}
                  {member.socials && Object.keys(member.socials).length > 0 && (
                    <div className="flex gap-3 mt-4">
                      {Object.entries(member.socials).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url as string}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-metal-light hover:text-metal-red transition-colors text-xs uppercase tracking-wider"
                        >
                          {platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                {/* Hover accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </div>
            ))}
          </div>
        </section>

        {/* Past Members */}
        {bandData.pastMembers && bandData.pastMembers.length > 0 && (
          <section className="mb-20">
            <div className="flex justify-center mb-12">
              <h2 className="text-base md:text-lg font-bold text-metal-red uppercase tracking-wider inline-block px-6 py-2 border border-metal-red">
                Past Members
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {bandData.pastMembers.map((member, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300 opacity-80 hover:opacity-100"
                >
                  {/* Member Image */}
                  <div className="relative aspect-square w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 grayscale group-hover:grayscale-0"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-metal-gray flex items-center justify-center">
                        <span className="text-4xl font-bold text-metal-red opacity-50">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="p-6 relative z-20">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-metal-light group-hover:text-metal-red transition-colors uppercase tracking-tight">
                        {member.name}
                      </h3>
                      <p className="text-sm text-metal-red font-bold uppercase tracking-wider mt-1">
                        {member.role}
                      </p>
                      <p className="text-xs text-metal-light opacity-75 mt-1">
                        {member.years}
                      </p>
                    </div>
                    
                    {/* Social Links */}
                    {member.socials && Object.keys(member.socials).length > 0 && (
                      <div className="flex gap-3 mt-4">
                        {Object.entries(member.socials).map(([platform, url]) => (
                          <a
                            key={platform}
                            href={url as string}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-metal-light hover:text-metal-red transition-colors text-xs uppercase tracking-wider"
                          >
                            {platform}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Hover accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </div>
              ))}
            </div>
          </section>
        )}

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

