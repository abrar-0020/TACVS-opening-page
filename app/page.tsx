'use client'

import { useState, useCallback } from 'react'

import Cursor       from '@/components/Cursor'
import Loader       from '@/components/Loader'
import SmoothScroll from '@/components/SmoothScroll'
import Hero         from '@/components/Hero'
import Problem      from '@/components/Problem'
import Solution     from '@/components/Solution'
import Architecture from '@/components/Architecture'
import Demo         from '@/components/Demo'
import Features     from '@/components/Features'
import Footer       from '@/components/Footer'

// ── Sticky nav ────────────────────────────────────────────────
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-6 py-4 pointer-events-none">
      {/* Logo */}
      <a
        href="#hero"
        className="pointer-events-auto flex items-center gap-2.5 group"
        aria-label="TACVS home"
      >
        <div className="w-8 h-8 rounded-lg glass-bright flex items-center justify-center glow-primary transition-all group-hover:scale-110">
          <svg className="w-4 h-4 text-[#00d4ff]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
          </svg>
        </div>
        <span className="font-display font-bold text-white text-sm tracking-wide">TACVS</span>
      </a>

      {/* Links */}
      <div className="pointer-events-auto hidden md:flex items-center gap-1 glass rounded-full px-4 py-2">
        {[
          { label: 'Problem',      href: '#problem'      },
          { label: 'Solution',     href: '#solution'     },
          { label: 'Architecture', href: '#architecture' },
          { label: 'Demo',         href: '#demo'         },
          { label: 'Features',     href: '#features'     },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="px-3 py-1.5 text-xs text-white/80 hover:text-white rounded-full hover:bg-white/8 transition-all duration-200 font-medium"
          >
            {label}
          </a>
        ))}
      </div>

      {/* CTA */}
      <a
        href="https://tokcred.vercel.app/" /* TODO: replace with your Vercel URL */
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto btn-primary text-sm py-2 px-5"
      >
        Launch App ↗
      </a>
    </nav>
  )
}

// ── Page ──────────────────────────────────────────────────────
export default function Page() {
  const [loaded, setLoaded] = useState(false)

  const handleLoaderDone = useCallback(() => setLoaded(true), [])

  return (
    <>
      {/* Custom cursor – always on top */}
      <Cursor />

      {/* Animated loader – hides once done */}
      <Loader onComplete={handleLoaderDone} />

      {/* Main content – rendered underneath loader, revealed on exit */}
      <SmoothScroll>
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transition: 'opacity 0.4s ease 0.1s',
          }}
        >
          <Nav />
          <main>
            <Hero />
            <Problem />
            <Solution />
            <Architecture />
            <Demo />
            <Features />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </>
  )
}
