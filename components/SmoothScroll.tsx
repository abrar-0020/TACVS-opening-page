'use client'

import { useEffect, ReactNode } from 'react'
import Lenis from '@studio-freight/lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: ReactNode
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    })

    // Sync Lenis scroll events with GSAP ScrollTrigger
    lenis.on('scroll', () => ScrollTrigger.update())

    // Use GSAP's ticker to drive Lenis – eliminates duplicate RAF loops
    const rafHandler = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(rafHandler)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafHandler)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
