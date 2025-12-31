import ImageWithFallback from '@/components/ImageWithFallback'
import merchData from '@/content/merch.json'
import siteData from '@/content/site.json'

export default function MerchPreview() {
  const featuredMerch = merchData.featured.slice(0, 6)

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-heading" style={{ color: '#39ff14' }}>Merch</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {featuredMerch.map((item) => (
            <a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card group"
            >
              <div className="relative aspect-square">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-metal-light mb-1 text-sm">{item.name}</h3>
                <p className="font-bold" style={{ color: '#39ff14' }}>{item.price}</p>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center">
          <a
            href={siteData.externalLinks.merch}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ 
              backgroundColor: '#39ff14',
              border: '3px solid #39ff14',
              color: '#000000',
              fontWeight: '900'
            }}
          >
            Shop All Merch
          </a>
        </div>
      </div>
    </section>
  )
}

