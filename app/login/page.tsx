import Link from 'next/link'

export const metadata = {
  title: 'Account / Login | Karmant',
  description: 'Access your Karmant account.',
}

export default function LoginPage() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-metal-darker text-metal-light flex items-center justify-center px-6 py-16">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/images/acc bg.png')`,
          backgroundSize: '70%',
          backgroundPosition: 'center 40%',
          opacity: 0.6,
          filter: 'grayscale(10%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none hidden sm:block"
        style={{
          backgroundImage: `url('/images/acc bg.png')`,
          backgroundSize: '60%',
          backgroundPosition: 'center',
          opacity: 0.6,
          filter: 'grayscale(10%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/45 to-black/60 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.18) 18%, rgba(0,0,0,0) 36%, rgba(0,0,0,0) 64%, rgba(0,0,0,0.18) 82%, rgba(0,0,0,0.6) 100%)'
        }}
      />
      <div className="relative text-center space-y-6 sm:space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-[0.2em] sm:tracking-[0.35em] drop-shadow-[0_6px_16px_rgba(0,0,0,0.75)]">
            Under Development
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 text-sm uppercase tracking-wide">
          <Link
            href="/contact"
            className="px-6 py-3 border border-metal-red text-metal-light hover:text-white hover:border-metal-red hover:bg-metal-red transition-colors duration-200 text-sm uppercase tracking-wide"
          >
            Contact
          </Link>
          <Link
            href="/regiment"
            className="px-6 py-3 border border-metal-red text-metal-light hover:text-white hover:border-metal-red hover:bg-metal-red transition-colors duration-200 text-sm uppercase tracking-wide"
          >
            Join Karmant Regiment
          </Link>
        </div>
      </div>
    </section>
  )
}
