'use client'

import { useEffect, useRef, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BlockchainNetwork from './BlockchainNetwork'
import Particles from './Particles'

gsap.registerPlugin(ScrollTrigger)

// ── Animation variants ────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
}
const wordVariants = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: '0%',   opacity: 1, transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] as const } },
}
const fadeUp = {
  hidden:  { y: 30, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.7, ease: 'easeOut' as const } },
}

// ── Component ─────────────────────────────────────────────────
export default function Hero() {
  const bgRef      = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLDivElement>(null)

  // Magnetic button
  const magnetX = useMotionValue(0)
  const magnetY = useMotionValue(0)
  const springX = useSpring(magnetX, { stiffness: 150, damping: 15 })
  const springY = useSpring(magnetY, { stiffness: 150, damping: 15 })

  const handleMagnet = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    magnetX.set((e.clientX - rect.left - rect.width / 2) * 0.3)
    magnetY.set((e.clientY - rect.top - rect.height / 2) * 0.3)
  }, [magnetX, magnetY])

  const handleMagnetLeave = useCallback(() => {
    magnetX.set(0)
    magnetY.set(0)
  }, [magnetX, magnetY])

  // Subtle parallax on the canvas wrapper
  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Grid parallax via mouse movement
  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return
    function onMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 12
      const y = (e.clientY / window.innerHeight - 0.5) * 12
      grid!.style.transform = `translate(${x}px, ${y}px)`
    }
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Blockchain network canvas */}
      <div ref={bgRef} className="absolute inset-0 w-full h-full">
        <BlockchainNetwork
          className="absolute inset-0 w-full h-full"
          style={{ opacity: 0.65 }}
        />
      </div>

      {/* Floating particles */}
      <Particles
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.45, zIndex: 1 }}
        count={45}
      />

      {/* Grid overlay with parallax */}
      <div ref={gridRef} className="grid-overlay" />

      {/* Radial gradient – bottom centre bloom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at bottom, rgba(0,212,255,0.07) 0%, transparent 70%)' }}
      />

      {/* Top-right secondary bloom */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top right, rgba(168,85,247,0.06) 0%, transparent 65%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="section-label">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] inline-block animate-pulse" />
            Blockchain · NFT Credentials · Zero-Knowledge Proofs
          </span>
        </motion.div>

        {/* Headline */}
        <motion.div
          className="font-display"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            { text: 'Verify Academic',    className: 'block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight' },
            { text: 'Credentials',         className: 'block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-gradient-primary leading-[1.05] tracking-tight glow-text-primary' },
            { text: 'On-Chain.',           className: 'block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white leading-[1.05] tracking-tight' },
          ].map(({ text, className }) => (
            <div key={text} className="word-wrap">
              <motion.span variants={wordVariants} className={className}>
                {text}
              </motion.span>
            </div>
          ))}
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.9 }}
          className="max-w-2xl text-lg md:text-xl text-white/55 leading-relaxed"
        >
          A tamper-proof, decentralized system that lets universities issue
          blockchain credentials and lets employers verify them in seconds —
          no third party needed.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.1 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            href="https://tokcred.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base"
            style={{ x: springX, y: springY }}
            onMouseMove={handleMagnet}
            onMouseLeave={handleMagnetLeave}
            whileHover={{ scale: 1.06, boxShadow: '0 0 40px rgba(0,212,255,0.5)' }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            Launch App
          </motion.a>
          <a
            href="https://github.com/abrar-0020/Tokenized-Academic-Credential-Verification-System"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-base"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
            </svg>
            View GitHub
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1.3 }}
          className="flex flex-wrap items-center justify-center gap-8 pt-4"
        >
          {[
            { value: '100%', label: 'Tamper-Proof' },
            { value: '<2s',  label: 'Verification Time' },
            { value: '0',    label: 'Third Parties' },
            { value: 'NFT',  label: 'Backed Credentials' },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="text-2xl font-bold font-display text-white">{value}</div>
              <div className="text-xs text-white/40 mt-0.5">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span className="text-white/30 text-xs tracking-widest uppercase font-mono">Scroll</span>
        <motion.div
          className="w-px h-10 bg-gradient-to-b from-[#00d4ff55] to-transparent"
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
