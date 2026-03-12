'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const headingVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } },
}

const subtitleVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.15, ease: 'easeOut' as const } },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const cardVariants = {
  hidden:  { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const problems = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
      </svg>
    ),
    stat: '$12B+',
    statLabel: 'Lost per year',
    title: 'Credential Fraud Is Rampant',
    description:
      'Fake degrees and forged transcripts cost employers billions. Traditional paper certificates are trivially forged using consumer printers and design apps.',
    color: '#ef4444',
    gradient: 'from-red-500/10 to-transparent',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    stat: '6–8 wks',
    statLabel: 'Average verification',
    title: 'Verification Takes Weeks',
    description:
      'Background-check agencies, registrar offices, and manual records create slow, expensive pipelines that delay hiring and block international mobility.',
    color: '#f97316',
    gradient: 'from-orange-500/10 to-transparent',
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ),
    stat: '74%',
    statLabel: 'Of HR teams lack digital tools',
    title: 'No Interoperable Standard',
    description:
      'Each institution uses proprietary systems. Employers cannot trust digital copies, and graduates must rely on paper documents that degrade and get lost.',
    color: '#a855f7',
    gradient: 'from-purple-500/10 to-transparent',
  },
]

export default function Problem() {
  const headingRef    = useRef<HTMLDivElement>(null)
  const cardsRef      = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const cardsInView   = useInView(cardsRef,   { once: true, margin: '-60px' })

  return (
    <section
      id="problem"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-[#050505] overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 grid-overlay opacity-50" />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top, rgba(239,68,68,0.05) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6">
        {/* Label */}
        <div className="flex justify-center mb-6">
          <span className="section-label" style={{ borderColor: 'rgba(239,68,68,0.3)', color: '#ef4444', background: 'rgba(239,68,68,0.05)' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            The Problem
          </span>
        </div>

        {/* Heading */}
        <motion.div
          ref={headingRef}
          variants={headingVariants}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          className="text-center mb-10"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Academic fraud is a{' '}
            <span className="text-gradient-warm">global crisis</span>
          </h2>
        </motion.div>
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate={headingInView ? 'visible' : 'hidden'}
          className="text-center text-white/50 max-w-2xl mx-auto text-lg leading-relaxed"
        >
          Millions of fake credentials circulate worldwide. Existing verification
          systems are slow, expensive, and centralised — making them easy to exploit.
        </motion.p>

        {/* Cards */}
        <motion.div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-48"
          variants={containerVariants}
          initial="hidden"
          animate={cardsInView ? 'visible' : 'hidden'}
        >
          {problems.map((item) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              className="glass rounded-2xl p-6 min-h-[200px] flex flex-col items-center text-center gap-4 group hover:border-white/15 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: `rgba(${item.color === '#ef4444' ? '239,68,68' : item.color === '#f97316' ? '249,115,22' : '168,85,247'}, 0.12)`,
                  border: `1px solid rgba(${item.color === '#ef4444' ? '239,68,68' : item.color === '#f97316' ? '249,115,22' : '168,85,247'}, 0.3)`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              {/* Stat */}
              <div>
                <div
                  className="text-2xl font-bold font-display"
                  style={{ color: item.color }}
                >
                  {item.stat}
                </div>
                <div className="text-xs text-white/35 mt-0.5">{item.statLabel}</div>
              </div>

              {/* Text */}
              <div>
                <h3 className="text-white font-semibold text-lg mb-2 font-display">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.description}</p>
              </div>

              {/* Hover glow bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-24 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `linear-gradient(to top, ${item.color}18, transparent)` }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
