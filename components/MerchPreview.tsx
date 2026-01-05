import Link from 'next/link'
import Image from 'next/image'
import merchData from '@/content/merch.json'
import siteData from '@/content/site.json'

export default function MerchPreview() {
  const featuredMerch = merchData.featured.slice(0, 6)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative min-h-screen flex items-center">
      {/* Background with fadeout effects */}
      <div className="absolute inset-0 bg-black">
        {/* Horizontal Fadeout */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 15%, transparent 85%, rgba(0,0,0,0.8) 100%)'
          }}
        />
        {/* Vertical Fadeout */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.7) 100%)'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-metal-red mb-4 font-display uppercase tracking-tight">
            Merch
          </h2>
          <div className="w-24 h-1 bg-metal-red mx-auto"></div>
        </div>
        
        {/* Merch Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {featuredMerch.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-black/30 border-2 border-metal-gray/50 hover:border-metal-red transition-all duration-300 overflow-hidden"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300"></div>
              </div>
              <div className="p-4 bg-black/40">
                <h3 className="font-bold text-metal-light mb-1 text-sm uppercase tracking-tight group-hover:text-metal-red transition-colors">
                  {item.name}
                </h3>
                <p className="font-bold text-metal-red text-sm">{item.price}</p>
              </div>
              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </a>
          ))}
        </div>
        
        {/* Shop All Button */}
        <div className="text-center">
          <a
            href={siteData.externalLinks.merch}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-metal-red text-white hover:bg-metal-red/80 transition-colors duration-200 px-8 py-3 text-sm font-bold uppercase tracking-wider"
          >
            Shop All Merch
          </a>
        </div>
      </div>
    </section>
  )
}
