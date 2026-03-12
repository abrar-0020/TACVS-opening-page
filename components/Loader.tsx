'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'loading' | 'done'>('loading')
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const DURATION = 2200 // ms

    const tick = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const raw = Math.min(elapsed / DURATION, 1)

      // Ease out cubic
      const eased = 1 - Math.pow(1 - raw, 3)
      setProgress(Math.floor(eased * 100))

      if (raw < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        setTimeout(() => setPhase('done'), 300)
        setTimeout(onComplete, 900)
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase === 'loading' && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9990] flex flex-col items-center justify-center bg-[#050505] overflow-hidden"
          exit={{ y: '-100%' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{ background: 'radial-gradient(ellipse, rgba(0,212,255,0.08) 0%, transparent 70%)' }} />
          </div>

          {/* Main content */}
          <div className="relative flex flex-col items-center gap-10">
            {/* Spinning hex icon */}
            <div className="relative w-20 h-20">
              <svg viewBox="0 0 80 80" className="w-full h-full animate-spin-slow">
                <polygon
                  points="40,4 74,22 74,58 40,76 6,58 6,22"
                  fill="none"
                  stroke="#00d4ff"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                  opacity="0.5"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                  <path d="M16 2L28 9V23L16 30L4 23V9L16 2Z" fill="rgba(0,212,255,0.1)" stroke="#00d4ff" strokeWidth="1.5"/>
                  <circle cx="16" cy="16" r="4" fill="#00d4ff" opacity="0.8"/>
                </svg>
              </div>
            </div>

            {/* Project name */}
            <div className="text-center">
              <motion.p
                className="text-[#00d4ff] text-xs tracking-[0.35em] uppercase mb-3 font-mono"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Initializing
              </motion.p>
              <motion.h1
                className="font-display text-2xl md:text-3xl font-bold tracking-tight text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.6 }}
              >
                Tokenized Academic
              </motion.h1>
              <motion.h2
                className="font-display text-2xl md:text-3xl font-bold tracking-tight text-gradient-primary mt-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                Credential Verification
              </motion.h2>
            </div>

            {/* Progress container */}
            <motion.div
              className="w-64 flex flex-col items-center gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {/* Progress bar track */}
              <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full progress-bar"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Counter */}
              <div className="flex items-center justify-between w-full">
                <span className="text-white/30 text-xs font-mono">LOADING</span>
                <span className="text-[#00d4ff] text-xs font-mono tabular-nums">
                  {String(progress).padStart(3, '0')}%
                </span>
              </div>
            </motion.div>

            {/* Status line */}
            <motion.p
              className="text-white/25 text-xs font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {progress < 40
                ? 'Connecting to blockchain...'
                : progress < 75
                ? 'Verifying smart contracts...'
                : progress < 95
                ? 'Fetching credentials...'
                : 'Ready.'}
              <span className="animate-blink">_</span>
            </motion.p>
          </div>

          {/* Bottom line */}
          <div className="absolute bottom-8 left-0 right-0 flex justify-center">
            <p className="text-white/15 text-xs font-mono tracking-widest">
              BLOCKCHAIN · VERIFIED · SECURE
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
