import Link from 'next/link'
import Image from 'next/image'
import { merchItems } from '@/content/merch-items'
import siteData from '@/content/site.json'

export default function MerchPreview() {
  const featuredMerch = merchItems.filter(item => item.id !== 1)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Solid black background */}
      <div className="absolute inset-0 bg-black" />
      {/* Central glow for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(90% 75% at 50% 50%, rgba(255,0,0,0.16), transparent 70%)'
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-metal-red mb-3 font-display uppercase tracking-tight">
              Merch
            </h2>
            <p className="text-metal-light/75 text-sm uppercase tracking-[0.2em]">
              Fresh drops now // More heat incoming soon
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/merch"
              className="inline-flex items-center justify-center bg-metal-red text-white hover:bg-metal-red/80 transition-colors duration-200 px-6 py-3 text-sm font-bold uppercase tracking-wider"
            >
              Shop All Merch
            </Link>
          </div>
        </div>
        
        {/* Merch Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredMerch.map((item) => (
            <div
              key={item.id}
              className="group bg-black/30 border border-metal-gray/40 hover:border-metal-red transition-all duration-300 overflow-hidden flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300"></div>
              </div>
              <div className="p-5 flex flex-col gap-3 flex-grow bg-black/40">
                <h3 className="font-bold text-metal-light text-sm uppercase tracking-tight group-hover:text-metal-red transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-metal-light/80 line-clamp-2 flex-grow">
                  {item.description}
                </p>
                <div className="flex justify-end">
                  <a
                    href={item.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 px-4 py-2 text-xs font-bold uppercase tracking-wider"
                  >
                    {item.buttonText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
