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
          backgroundSize: '60%',
          backgroundPosition: 'center',
          opacity: 0.45,
          filter: 'grayscale(20%)',
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/55 to-black/70 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.18) 18%, rgba(0,0,0,0) 36%, rgba(0,0,0,0) 64%, rgba(0,0,0,0.18) 82%, rgba(0,0,0,0.6) 100%)'
        }}
      />
      <div className="relative max-w-xl w-full border border-metal-gray/60 bg-black/50 backdrop-blur-md p-10 shadow-2xl shadow-black/40 space-y-6">
        <div className="space-y-2 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-metal-gray">Account / Login</p>
          <h1 className="text-3xl font-extrabold uppercase tracking-widest">Under Development</h1>
          <p className="text-sm text-metal-gray">
            This page is a placeholder. Reach out for booking, press, or merch via the links below.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-3 text-sm uppercase tracking-wide">
          <Link
            href="/contact"
            className="px-5 py-3 border border-metal-gray text-metal-light hover:text-white hover:border-metal-red hover:bg-metal-red transition-colors duration-200 text-center"
          >
            Contact
          </Link>
          <Link
            href="/regiment"
            className="px-5 py-3 border border-metal-gray text-metal-light hover:text-white hover:border-metal-red hover:bg-metal-red transition-colors duration-200 text-center"
          >
            Join Karmant Regiment
          </Link>
        </div>
      </div>
    </section>
  )
}
