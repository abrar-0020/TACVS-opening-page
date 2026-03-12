'use client'

import { useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const nodes = [
  {
    id: 'university',
    label: 'University',
    sublabel: 'Credential Issuer',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342m-7.482 0a50.71 50.71 0 0 0-3.741 1.342Z" />
      </svg>
    ),
    color: '#00d4ff',
    action: 'Mints NFT Credential',
  },
  {
    id: 'blockchain',
    label: 'Blockchain',
    sublabel: 'Smart Contract',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
      </svg>
    ),
    color: '#a855f7',
    action: 'Stores & Validates',
  },
  {
    id: 'employer',
    label: 'Employer',
    sublabel: 'Credential Verifier',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Zm0 3h.008v.008h-.008v-.008Z" />
      </svg>
    ),
    color: '#10b981',
    action: 'Verifies in Seconds',
  },
]

const arrowVariants = {
  hidden:  { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity:    1,
    transition: { duration: 1, ease: 'easeInOut' },
  },
}

const nodeVariants = {
  hidden:  { scale: 0, opacity: 0 },
  visible: (i: number) => ({
    scale:   1,
    opacity: 1,
    transition: { delay: i * 0.25, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] },
  }),
}

export default function Architecture() {
  const sectionRef = useRef<HTMLElement>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(diagramRef, { once: true, margin: '-80px' })

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.from('.arch-heading', {
        y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.arch-heading', start: 'top 84%', toggleActions: 'play none none reverse' },
      })
      gsap.from('.arch-detail', {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.arch-details', start: 'top 80%', toggleActions: 'play none none reverse' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="architecture"
      className="relative py-32 px-6 bg-[#050505] overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(168,85,247,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Label */}
        <div className="flex justify-center mb-6">
          <span className="section-label" style={{ borderColor: 'rgba(168,85,247,0.3)', color: '#a855f7', background: 'rgba(168,85,247,0.05)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block animate-pulse" />
            System Architecture
          </span>
        </div>

        <h2 className="arch-heading font-display text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-6">
          How the system{' '}
          <span className="text-gradient-primary">flows</span>
        </h2>
        <p className="arch-heading text-center text-white/50 max-w-xl mx-auto mb-20 text-lg leading-relaxed">
          Three actors, one immutable record. The blockchain is the single source
          of truth that all parties can trust independently.
        </p>

        {/* Flow diagram */}
        <div ref={diagramRef} className="relative flex flex-col md:flex-row items-center justify-center gap-0">
          {nodes.map((node, i) => (
            <div key={node.id} className="flex flex-col md:flex-row items-center">
              {/* Node */}
              <motion.div
                custom={i}
                variants={nodeVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex flex-col items-center gap-3"
              >
                {/* Circle */}
                <div
                  className="relative w-28 h-28 rounded-2xl flex flex-col items-center justify-center gap-2 glass"
                  style={{
                    border: `1px solid ${node.color}35`,
                    boxShadow: `0 0 30px ${node.color}18`,
                  }}
                >
                  <span style={{ color: node.color }}>{node.icon}</span>

                  {/* Pulse ring */}
                  {i === 1 && (
                    <div
                      className="absolute inset-0 rounded-2xl opacity-20 animate-pulse"
                      style={{ border: `1px solid ${node.color}`, boxShadow: `0 0 20px ${node.color}` }}
                    />
                  )}
                </div>

                {/* Labels */}
                <div className="text-center">
                  <div className="font-display font-semibold text-white text-sm">{node.label}</div>
                  <div className="text-white/35 text-xs mt-0.5">{node.sublabel}</div>
                </div>

                {/* Action badge */}
                <div
                  className="px-3 py-1 rounded-full text-xs font-mono"
                  style={{
                    background: `${node.color}12`,
                    border: `1px solid ${node.color}30`,
                    color: node.color,
                  }}
                >
                  {node.action}
                </div>
              </motion.div>

              {/* Arrow between nodes */}
              {i < nodes.length - 1 && (
                <motion.div
                  className="flex flex-col md:flex-row items-center mx-6 my-6 md:my-0"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: (i + 1) * 0.25 + 0.3, duration: 0.5 }}
                >
                  {/* SVG arrow */}
                  <svg
                    width="80" height="24"
                    viewBox="0 0 80 24"
                    fill="none"
                    className="hidden md:block"
                  >
                    <motion.line
                      x1="0" y1="12" x2="68" y2="12"
                      stroke="#00d4ff"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      variants={arrowVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                    />
                    <path d="M68 6 L80 12 L68 18Z" fill="#00d4ff" opacity="0.6" />
                  </svg>
                  {/* Vertical arrow for mobile */}
                  <svg
                    width="24" height="60"
                    viewBox="0 0 24 60"
                    fill="none"
                    className="block md:hidden"
                  >
                    <motion.line
                      x1="12" y1="0" x2="12" y2="48"
                      stroke="#00d4ff"
                      strokeWidth="1.5"
                      strokeDasharray="4 3"
                      variants={arrowVariants}
                      initial="hidden"
                      animate={inView ? 'visible' : 'hidden'}
                    />
                    <path d="M6 48 L12 60 L18 48Z" fill="#00d4ff" opacity="0.6" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        {/* Detail cards */}
        <div className="arch-details grid grid-cols-1 md:grid-cols-3 gap-5 mt-20">
          {[
            { title: 'ERC-721 / ERC-1155 NFT',    body: 'Each credential is minted as a non-fungible token. The metadata hash is stored on-chain; documents are stored on IPFS.',   icon: '⬡' },
            { title: 'Solidity Smart Contract',     body: 'Role-based access control ensures only registered institutions can issue. Revocation and expiry are handled natively.',   icon: '⚙' },
            { title: 'Zero-Knowledge Proofs',       body: 'Selective disclosure — graduates can prove they hold a credential without revealing personal details to every verifier.', icon: '🔒' },
          ].map((card) => (
            <div key={card.title} className="arch-detail glass rounded-2xl p-6 hover:border-white/15 transition-all duration-300">
              <div className="text-2xl mb-3">{card.icon}</div>
              <h4 className="font-display font-semibold text-white text-sm mb-2">{card.title}</h4>
              <p className="text-white/45 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
