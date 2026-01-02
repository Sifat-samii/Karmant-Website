import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Merch | Karmant',
  description: 'Official Karmant merchandise - T-shirts, CDs, and more',
}

const merchItems = [
  {
    id: 1,
    name: 'Karmant Logo T-Shirt',
    image: '/images/merch/tshirt1.jpg',
    description: 'Official Karmant logo t-shirt',
    buyLink: 'https://heavymetaltshirtbd.com/details?id=L8IEHG0C--W4RZD30Z23BH-HVKAU721RK0I',
    buttonText: 'Buy',
  },
  {
    id: 2,
    name: 'Riot In Uniform T-Shirt',
    image: '/images/merch/tshirt2.jpg',
    description: 'Riot In Uniform EP t-shirt',
    buyLink: 'https://www.facebook.com/photo?fbid=2148578651956124&set=a.256618244485517',
    buttonText: 'Buy',
  },
  {
    id: 3,
    name: 'Riot In Uniform EP CD',
    image: '/images/merch/cd.png',
    description: 'Physical CD of the Riot In Uniform EP',
    buyLink: '#',
    buttonText: 'Pre Order',
  },
]

export default function MerchPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative text-center mb-16 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/releases/EPs/riot.png)',
              backgroundPosition: 'center 50%',
              opacity: 0.3,
            }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Gradient - dark to black from top to bottom */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.7) 60%, rgba(0,0,0,0.9) 85%, black 100%)',
            }}
          />
          
          {/* Content */}
          <div className="relative z-10 pt-20 pb-20">
            <h1 className="text-5xl md:text-6xl font-bold text-metal-light mb-4 font-display uppercase tracking-tight">
              Merch
            </h1>
          </div>
        </div>

        {/* Merch Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {merchItems.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative aspect-square w-full overflow-hidden bg-metal-gray">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-metal-light group-hover:text-metal-red transition-colors uppercase tracking-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-sm text-metal-light opacity-75 mb-4">
                  {item.description}
                </p>
                <div className="flex items-center justify-end">
                  <a
                    href={item.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-black/30 border border-metal-red text-metal-light hover:bg-metal-red hover:text-white transition-all duration-200 px-4 py-2 text-sm font-bold uppercase tracking-wider"
                  >
                    {item.buttonText}
                  </a>
                </div>
              </div>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-metal-red transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

