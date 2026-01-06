'use client'

import { useState } from 'react'
import Image from 'next/image'
import { type MerchItem } from '@/content/merch-items'

type Props = {
  items: MerchItem[]
}

export default function MerchGridClient({ items }: Props) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative overflow-hidden bg-metal-darker border-2 border-metal-gray hover:border-metal-red transition-all duration-300"
          >
            {/* Product Image */}
            <button
              type="button"
              onClick={() => setSelectedImage(item.image)}
              className="relative aspect-square w-full overflow-hidden bg-metal-gray cursor-pointer"
            >
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

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

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-5xl aspect-square sm:aspect-video lg:aspect-[16/9]">
            <Image
              src={selectedImage}
              alt="Merch preview"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </div>
        </div>
      )}
    </>
  )
}
