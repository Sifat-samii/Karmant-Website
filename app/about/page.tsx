import { Metadata } from 'next'
import Image from 'next/image'
import aboutData from '@/content/about.json'

export const metadata: Metadata = {
  title: 'About | Karmant',
  description: aboutData.shortBio,
}

export default function AboutPage() {
  return (
    <div className="pt-20 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="section-heading text-metal-red">About</h1>
        
        <div className="mb-12">
          <p className="text-xl text-metal-light mb-6 text-center">{aboutData.shortBio}</p>
          <div className="prose prose-invert max-w-none">
            {aboutData.longBio.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-metal-light mb-4">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-bold text-metal-red mb-8 text-center">Band Members</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {aboutData.members.map((member, index) => (
              <div key={index} className="card p-6">
                <h3 className="text-2xl font-bold text-metal-light mb-2">{member.name}</h3>
                <p className="text-metal-red font-bold mb-2">{member.role}</p>
                <p className="text-metal-light mb-4">{member.bio}</p>
                {Object.keys(member.socials).length > 0 && (
                  <div className="flex gap-4">
                    {Object.entries(member.socials).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-metal-light hover:text-metal-red transition-colors uppercase text-sm"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {aboutData.gear.enabled && (
          <div>
            <h2 className="text-3xl font-bold text-metal-red mb-8 text-center">Gear</h2>
            <div className="card p-6">
              <p className="text-metal-light">{aboutData.gear.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

