'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stepContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
}

const stepVariants = {
  hidden:  { opacity: 0, x: -40, scale: 0.97 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const } },
}

const steps = [
  {
    num: '01',
    title: 'Issue On-Chain',
    description:
      'Universities mint verifiable credential NFTs directly to a student\'s blockchain wallet. Each token is cryptographically signed and timestamped on an immutable ledger.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 3.741-1.342m-7.482 0a50.71 50.71 0 0 0-3.741 1.342m7.482-7.482A50.717 50.717 0 0 1 12 13.489Z" />
      </svg>
    ),
    color: '#00d4ff',
  },
  {
    num: '02',
    title: 'Smart Contract Validation',
    description:
      'A self-executing smart contract governs issuance rules, revocation logic, and permission layers — ensuring only authorised institutions can issue credentials.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M14.25 9.75 16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z" />
      </svg>
    ),
    color: '#a855f7',
  },
  {
    num: '03',
    title: 'NFC / QR Presentation',
    description:
      'Graduates share a QR code or NFC tap. The verifier\'s app checks the on-chain record in real time — no phone call to the registrar, no waiting.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5Zm0 9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5Zm9.75-9.75c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 13.5h7.5m-7.5 3h7.5m-7.5 3h7.5m-3-9v9" />
      </svg>
    ),
    color: '#10b981',
  },
  {
    num: '04',
    title: 'Instant, Trustless Verification',
    description:
      'Employers get a cryptographic proof in under 2 seconds. Because the ledger is public and immutable, no third-party agency is required — ever.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    color: '#f59e0b',
  },
]

export default function Solution() {
  const headingRef   = useRef<HTMLDivElement>(null)
  const stepsRef     = useRef<HTMLDivElement>(null)
  const visualRef    = useRef<HTMLDivElement>(null)
  const headingInView = useInView(headingRef, { once: true, margin: '-80px' })
  const stepsInView  = useInView(stepsRef,  { once: true, margin: '-60px' })
  const visualInView = useInView(visualRef, { once: true, margin: '-60px' })

  return (
    <section
      id="solution"
      className="relative min-h-screen flex flex-col items-center justify-center py-24 px-6 md:px-12 lg:px-16 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050505 0%, #080b12 100%)' }}
    >
      {/* Grid + glow */}
      <div className="absolute inset-0 grid-overlay opacity-40" />
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at right, rgba(0,212,255,0.07) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex justify-center mb-6">
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] inline-block animate-pulse" />
            The Solution
          </span>
        </div>

        {/* Heading */}
        <motion.div
          ref={headingRef}
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="w-full"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight text-center mb-10">
            Blockchain makes credentials{' '}
            <span className="text-gradient-primary">unbreakable</span>
          </h2>
          <p className="w-full text-center text-white/50 max-w-2xl mx-auto mb-16 text-lg leading-relaxed">
            By anchoring academic records to a public blockchain, we eliminate every
            vector that fraudsters exploit — and make honesty the path of least resistance.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Steps */}
          <motion.div
            ref={stepsRef}
            className="flex flex-col gap-8"
            variants={stepContainerVariants}
            initial="hidden"
            animate={stepsInView ? 'visible' : 'hidden'}
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                variants={stepVariants}
                className="flex gap-5 glass rounded-2xl p-6 group hover:border-white/15 transition-all duration-300 items-center"
              >
                {/* Number + line */}
                <div className="flex flex-col items-center gap-2 flex-shrink-0">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center font-mono text-xs font-bold"
                    style={{
                      background: `${step.color}18`,
                      border: `1px solid ${step.color}40`,
                      color: step.color,
                    }}
                  >
                    {step.num}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-px flex-1 min-h-[20px]" style={{ background: `${step.color}25` }} />
                  )}
                </div>

                {/* Content */}
                <div className="pt-1.5">
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ color: step.color }}>{step.icon}</span>
                    <h3 className="font-display font-semibold text-white text-base">{step.title}</h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Visual – animated blockchain graphic */}
          <motion.div
            ref={visualRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={visualInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72">
              {/* Outer spinning ring */}
              <div
                className="absolute inset-0 rounded-full border border-dashed border-[#00d4ff22] animate-spin-slow"
              />
              {/* Middle ring */}
              <div
                className="absolute inset-8 rounded-full border border-[#a855f720]"
                style={{ animation: 'spin-slow 14s linear infinite reverse' }}
              />

              {/* Centre node */}
              <div className="absolute inset-16 rounded-2xl glass-bright flex flex-col items-center justify-center gap-2 glow-primary">
                <svg className="w-10 h-10 text-[#00d4ff]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
                </svg>
                <span className="text-[#00d4ff] text-[10px] font-mono tracking-widest">CHAIN</span>
              </div>

              {/* Orbiting blocks */}
              {['Issued', 'Verified', 'Revoked', 'Stored'].map((label, i) => {
                const angle = (i / 4) * Math.PI * 2
                const r = 108
                const cx = 144 + r * Math.cos(angle)
                const cy = 144 + r * Math.sin(angle)
                return (
                  <div
                    key={label}
                    className="absolute glass rounded-lg px-2.5 py-1.5 text-[10px] font-mono"
                    style={{
                      left: cx - 28,
                      top:  cy - 14,
                      color: '#00d4ff99',
                      border: '1px solid #00d4ff22',
                    }}
                  >
                    {label}
                  </div>
                )
              })}

              {/* Pulse rings */}
              {[1.1, 1.25].map((scale, i) => (
                <div
                  key={i}
                  className="absolute inset-0 rounded-full border border-[#00d4ff15] animate-pulse-ring"
                  style={{ animationDelay: `${i * 0.8}s`, transform: `scale(${scale})` }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
