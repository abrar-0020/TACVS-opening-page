'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    color: '#00d4ff',
    title: 'Tamper-Proof NFT Credentials',
    description:
      'Each academic credential is minted as a unique NFT on the blockchain. The on-chain record is cryptographically immutable — alteration is computationally impossible.',
    tag: 'Core Feature',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 0 1 21.75 8.25Z" />
      </svg>
    ),
    color: '#a855f7',
    title: 'Role-Based Smart Contracts',
    description:
      'Solidity contracts enforce who can issue, revoke, or transfer credentials. Only authorised institutions hold the issuer role, enforced on-chain, not by policy.',
    tag: 'Security',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    color: '#f59e0b',
    title: 'Sub-2-Second Verification',
    description:
      'Verifiers query the blockchain directly via a public RPC endpoint. No waiting on institutions, no email chains — a cryptographic proof in under 2 seconds.',
    tag: 'Performance',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5" />
      </svg>
    ),
    color: '#10b981',
    title: 'Student-Owned Identity',
    description:
      "Credentials are issued directly to the student's wallet. They own their academic identity — no institutional portal needed to share or present it.",
    tag: 'Ownership',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    color: '#06b6d4',
    title: 'IPFS Document Storage',
    description:
      'Full diploma PDFs and transcripts are stored on IPFS — a decentralised, content-addressed network. The on-chain hash ensures the file cannot be swapped.',
    tag: 'Storage',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5Zm0 9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5Zm9.75-9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 13.5h7.5m-7.5 3h7.5m-7.5 3h7.5m-3-9v9" />
      </svg>
    ),
    color: '#ec4899',
    title: 'QR & Shareable Links',
    description:
      'Every credential gets a unique shareable verification URL and QR code. Embed it in a CV, LinkedIn, or email signature — anyone can verify with one click.',
    tag: 'Sharing',
  },
]

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)
  const inView     = useInView(gridRef, { once: true, margin: '-60px' })

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.features-heading', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.features-heading', start: 'top 85%', toggleActions: 'play none none reverse' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Tilt effect handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    card.style.transform = `perspective(600px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = 'perspective(600px) rotateY(0deg) rotateX(0deg) translateY(0px)'
  }

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-32 px-6 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #080b12 50%, #050505 100%)' }}
    >
      <div className="absolute inset-0 grid-overlay opacity-40" />

      {/* Top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(0,212,255,0.06) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="features-heading text-center mb-20">
          <span className="section-label mb-6 inline-flex">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] inline-block animate-pulse" />
            Features
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mt-6">
            Everything You Need for{' '}
            <span className="text-gradient-primary">Trust</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-white/50 text-lg leading-relaxed">
            A complete credential lifecycle — from issuance to verification —
            built natively on the blockchain.
          </p>
        </div>

        {/* Feature grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={cardVariants}
              className="feature-card glass rounded-2xl p-7 flex flex-col gap-5 cursor-none"
              style={{ border: `1px solid ${f.color}40`, transition: 'transform 0.2s ease, box-shadow 0.3s ease' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              {/* Icon + tag row */}
              <div className="flex items-center justify-between">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: `${f.color}20`, border: `1px solid ${f.color}45`, color: f.color }}
                >
                  {f.icon}
                </div>
                <span
                  className="text-[10px] font-bold tracking-[0.15em] uppercase font-mono px-2 py-0.5 rounded-full"
                  style={{ color: f.color, background: `${f.color}12`, border: `1px solid ${f.color}25` }}
                >
                  {f.tag}
                </span>
              </div>

              {/* Text */}
              <div>
                <h3 className="font-display font-semibold text-white text-base mb-2">{f.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{f.description}</p>
              </div>

              {/* Bottom glow line */}
              <div
                className="mt-auto h-px w-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${f.color}60, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
