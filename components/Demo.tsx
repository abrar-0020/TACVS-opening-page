'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Change this to your live Vercel URL ─────────── */
const DEMO_URL = 'https://tokcred.vercel.app/'

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 md:px-12 lg:px-16 overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 grid-overlay opacity-30" />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <span className="section-label mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block animate-pulse" />
            Live Demo
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-6">
            Try It{' '}
            <span className="text-gradient-primary">Right Now</span>
          </h2>
          <p className="mt-5 max-w-xl mx-auto text-white/50 text-lg leading-relaxed">
            The application is deployed on Vercel. Issue a credential, scan the QR
            code, and verify it on-chain — all in under 30 seconds.
          </p>
        </motion.div>

        {/* Decorative visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex justify-center mb-16"
        >
          <div className="relative w-40 h-40">
            <div className="absolute inset-0 rounded-full border border-dashed border-[#00d4ff22] animate-spin-slow" />
            <div className="absolute inset-4 rounded-full border border-[#a855f720]" style={{ animation: 'spin-slow 14s linear infinite reverse' }} />
            <div className="absolute inset-8 rounded-2xl glass-bright flex flex-col items-center justify-center gap-2 glow-primary">
              <svg className="w-10 h-10 text-[#00d4ff]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
              </svg>
              <span className="text-[#00d4ff] text-[10px] font-mono tracking-widest">DEMO</span>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-5"
        >
          <a
            href={DEMO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Launch App
          </a>
          <p className="text-white/30 text-sm">No wallet or account required to explore</p>
        </motion.div>
      </div>
    </section>
  )
}
