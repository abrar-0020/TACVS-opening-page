'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Demo() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative py-32 px-6 overflow-hidden bg-[#050505]"
    >
      <div className="absolute inset-0 grid-overlay opacity-30" />

      {/* Centre glow behind iframe */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,212,255,0.05) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
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

        {/* Browser frame */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.33, 1, 0.68, 1] }}
          className="relative rounded-2xl overflow-hidden"
          style={{
            border: '1px solid rgba(0,212,255,0.18)',
            boxShadow: '0 0 80px rgba(0,212,255,0.08), 0 40px 100px rgba(0,0,0,0.6)',
          }}
        >
          {/* Fake browser chrome */}
          <div className="flex items-center gap-3 px-5 py-3 bg-[#0d0d0d] border-b border-white/[0.06]">
            {/* Traffic lights */}
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ef4444] opacity-70" />
              <span className="w-3 h-3 rounded-full bg-[#f59e0b] opacity-70" />
              <span className="w-3 h-3 rounded-full bg-[#10b981] opacity-70" />
            </div>
            {/* Address bar */}
            <div className="flex-1 flex items-center gap-2 mx-4 px-4 py-1.5 rounded-md bg-white/[0.04] border border-white/[0.06]">
              <svg className="w-3 h-3 text-[#10b981] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd"
                  d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z" />
              </svg>
              <span className="text-white/35 text-xs font-mono truncate">
                https://credential-verify-app.vercel.app
                {/* TODO: Replace with your actual Vercel URL */}
              </span>
            </div>
            {/* Action icons */}
            <div className="flex gap-2 opacity-40">
              <span className="w-4 h-4 text-white/60">↺</span>
              <span className="w-4 h-4 text-white/60">⋮</span>
            </div>
          </div>

          {/* iframe */}
          <div className="relative w-full" style={{ height: 'min(680px, 70vh)' }}>
            <iframe
              src="https://credential-verify-app.vercel.app"
              /* TODO: Replace with your actual Vercel URL */
              className="w-full h-full"
              title="Tokenized Academic Credential Verification – Live App"
              allow="clipboard-write"
              loading="lazy"
            />
            {/* Fallback overlay (hidden once iframe loads) */}
            <noscript>
              <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d0d]">
                <p className="text-white/40 text-sm">Enable JavaScript to view the live demo.</p>
              </div>
            </noscript>
          </div>
        </motion.div>

        {/* CTA below */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://credential-verify-app.vercel.app"
            /* TODO: Replace with your actual Vercel URL */
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Open in Full Tab
          </a>
          <p className="text-white/30 text-sm">No wallet or account required to explore</p>
        </motion.div>
      </div>
    </section>
  )
}
