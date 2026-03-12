'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ── Canvas particle / blockchain network ──────────────────────
interface Particle {
  x: number; y: number
  vx: number; vy: number
  radius: number
  alpha: number
  pulse: number
  pulseSpeed: number
}

function initCanvas(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d')!
  let W = 0, H = 0
  let particles: Particle[] = []
  let rafId: number
  const PARTICLE_COUNT = 90
  const LINK_DIST = 130

  function resize() {
    W = canvas.width  = canvas.offsetWidth
    H = canvas.height = canvas.offsetHeight
  }

  function spawn(): Particle {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.3,
      pulse: 0,
      pulseSpeed: Math.random() * 0.02 + 0.005,
    }
  }

  function init() {
    resize()
    particles = Array.from({ length: PARTICLE_COUNT }, spawn)
  }

  function draw() {
    ctx.clearRect(0, 0, W, H)

    // Update & draw particles
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy
      if (p.x < 0) p.x = W
      if (p.x > W) p.x = 0
      if (p.y < 0) p.y = H
      if (p.y > H) p.y = 0

      p.pulse += p.pulseSpeed
      const a = p.alpha + Math.sin(p.pulse) * 0.15

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(0,212,255,${a})`
      ctx.fill()
    }

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < LINK_DIST) {
          const a = (1 - dist / LINK_DIST) * 0.35
          // Every ~20th connection gets a purple tint
          const isPurple = (i * j) % 17 === 0
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = isPurple
            ? `rgba(168,85,247,${a})`
            : `rgba(0,212,255,${a})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }
      }
    }

    rafId = requestAnimationFrame(draw)
  }

  window.addEventListener('resize', resize)
  init()
  draw()

  return () => {
    cancelAnimationFrame(rafId)
    window.removeEventListener('resize', resize)
  }
}

// ── Animation variants ────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
}
const wordVariants = {
  hidden:  { y: '110%', opacity: 0 },
  visible: { y: '0%',   opacity: 1, transition: { duration: 0.75, ease: [0.33, 1, 0.68, 1] } },
}
const fadeUp = {
  hidden:  { y: 30, opacity: 0 },
  visible: { y: 0,  opacity: 1, transition: { duration: 0.7, ease: 'easeOut' } },
}

// ── Component ─────────────────────────────────────────────────
export default function Hero() {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const badgeRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return
    return initCanvas(canvasRef.current)
  }, [])

  // Subtle parallax on the canvas
  useEffect(() => {
    if (!canvasRef.current || !sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(canvasRef.current, {
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

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.65 }}
      />

      {/* Grid overlay */}
      <div className="grid-overlay" />

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
          ref={badgeRef}
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
          <a
            href="https://your-app.vercel.app" /* TODO: replace with your Vercel URL */
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
            </svg>
            Launch App
          </a>
          <a
            href="https://github.com/your-username/your-repo" /* TODO: replace with your GitHub URL */
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
