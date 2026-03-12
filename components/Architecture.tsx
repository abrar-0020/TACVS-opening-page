'use client'

import { useRef, Fragment } from 'react'
import { motion, useInView } from 'framer-motion'

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
    transition: { delay: i * 0.25, duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
  }),
}

export default function Architecture() {
  const diagramRef   = useRef<HTMLDivElement>(null)
  const headingRef   = useRef<HTMLDivElement>(null)
  const detailsRef   = useRef<HTMLDivElement>(null)
  const inView        = useInView(diagramRef,  { once: true, margin: '-80px' })
  const headingInView = useInView(headingRef,  { once: true, margin: '-80px' })
  const detailsInView = useInView(detailsRef,  { once: true, margin: '-60px' })

  return (
    <section
      id="architecture"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 md:px-12 lg:px-16 bg-[#050505] overflow-hidden"
    >
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(168,85,247,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex justify-center mb-6">
          <span className="section-label" style={{ borderColor: 'rgba(168,85,247,0.3)', color: '#a855f7', background: 'rgba(168,85,247,0.05)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block animate-pulse" />
            System Architecture
          </span>
        </div>

        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight text-center mb-10">
            How the system{' '}
            <span className="text-gradient-primary">flows</span>
          </h2>
          <p className="w-full text-center text-white/50 max-w-xl mx-auto mb-16 text-lg leading-relaxed">
            Three actors, one immutable record. The blockchain is the single source
            of truth that all parties can trust independently.
          </p>
        </motion.div>

        {/* Flow diagram – nodes & arrows as flat flex children for even centering */}
        <div ref={diagramRef} className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-8">
          {nodes.map((node, i) => (
            <Fragment key={node.id}>
              {/* Node */}
              <motion.div
                custom={i}
                variants={nodeVariants}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="relative w-28 h-28 rounded-2xl flex flex-col items-center justify-center gap-2 glass"
                  style={{
                    border: `1px solid ${node.color}35`,
                    boxShadow: `0 0 30px ${node.color}18`,
                  }}
                >
                  <span style={{ color: node.color }}>{node.icon}</span>
                  {i === 1 && (
                    <div
                      className="absolute inset-0 rounded-2xl opacity-20 animate-pulse"
                      style={{ border: `1px solid ${node.color}`, boxShadow: `0 0 20px ${node.color}` }}
                    />
                  )}
                </div>
                <div className="text-center">
                  <div className="font-display font-semibold text-white text-sm">{node.label}</div>
                  <div className="text-white/35 text-xs mt-0.5">{node.sublabel}</div>
                </div>
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

              {/* Arrow */}
              {i < nodes.length - 1 && (
                <motion.div
                  className="flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: (i + 1) * 0.25 + 0.3, duration: 0.5 }}
                >
                  <svg width="80" height="24" viewBox="0 0 80 24" fill="none" className="hidden md:block">
                    <motion.line x1="0" y1="12" x2="68" y2="12" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="4 3" variants={arrowVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} />
                    <path d="M68 6 L80 12 L68 18Z" fill="#00d4ff" opacity="0.6" />
                  </svg>
                  <svg width="24" height="60" viewBox="0 0 24 60" fill="none" className="block md:hidden">
                    <motion.line x1="12" y1="0" x2="12" y2="48" stroke="#00d4ff" strokeWidth="1.5" strokeDasharray="4 3" variants={arrowVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'} />
                    <path d="M6 48 L12 60 L18 48Z" fill="#00d4ff" opacity="0.6" />
                  </svg>
                </motion.div>
              )}
            </Fragment>
          ))}
        </div>

        {/* Detail cards */}
        <motion.div
          ref={detailsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16"
          initial="hidden"
          animate={detailsInView ? 'visible' : 'hidden'}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {[
            { title: 'ERC-721 / ERC-1155 NFT',    body: 'Each credential is minted as a non-fungible token. The metadata hash is stored on-chain; documents are stored on IPFS.',   icon: '⬡' },
            { title: 'Solidity Smart Contract',     body: 'Role-based access control ensures only registered institutions can issue. Revocation and expiry are handled natively.',   icon: '⚙' },
            { title: 'Zero-Knowledge Proofs',       body: 'Selective disclosure — graduates can prove they hold a credential without revealing personal details to every verifier.', icon: '🔒' },
          ].map((card) => (
            <motion.div
              key={card.title}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } }}
              className="glass rounded-2xl p-6 hover:border-white/15 transition-all duration-300 flex flex-col items-center text-center"
            >
              <div className="text-2xl mb-3">{card.icon}</div>
              <h4 className="font-display font-semibold text-white text-sm mb-2">{card.title}</h4>
              <p className="text-white/45 text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
