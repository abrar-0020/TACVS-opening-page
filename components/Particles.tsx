'use client'

import { useEffect, useRef } from 'react'

interface Dot {
  x: number
  y: number
  size: number
  vy: number
  vx: number
  opacity: number
  opacitySpeed: number
  opacityDir: number
}

interface ParticlesProps {
  className?: string
  style?: React.CSSProperties
  count?: number
}

export default function Particles({ className, style, count = 50 }: ParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const cvs = canvas
    const ctx = cvs.getContext('2d')!
    let W = 0
    let H = 0
    let dots: Dot[] = []
    let rafId: number | null = null
    let mouseX = -9999
    let mouseY = -9999

    function resize() {
      W = cvs.width = cvs.offsetWidth
      H = cvs.height = cvs.offsetHeight
    }

    function spawn(randomY: boolean): Dot {
      return {
        x: Math.random() * W,
        y: randomY ? Math.random() * H : H + Math.random() * 20,
        size: Math.random() * 1.5 + 0.4,
        vy: -(Math.random() * 0.25 + 0.08),
        vx: (Math.random() - 0.5) * 0.12,
        opacity: Math.random() * 0.4 + 0.1,
        opacitySpeed: Math.random() * 0.006 + 0.002,
        opacityDir: 1,
      }
    }

    function init() {
      resize()
      dots = Array.from({ length: count }, () => spawn(true))
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      for (const d of dots) {
        // Mouse push
        const dx = d.x - mouseX
        const dy = d.y - mouseY
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 100 && dist > 0) {
          const f = (1 - dist / 100) * 0.25
          d.x += (dx / dist) * f
          d.y += (dy / dist) * f
        }

        d.x += d.vx
        d.y += d.vy

        // Breathing opacity
        d.opacity += d.opacitySpeed * d.opacityDir
        if (d.opacity >= 0.55) d.opacityDir = -1
        if (d.opacity <= 0.04) d.opacityDir = 1

        // Recycle off-screen
        if (d.y < -10) Object.assign(d, spawn(false))
        if (d.x < -10) d.x = W + 5
        if (d.x > W + 10) d.x = 5

        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${d.opacity})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    function onMouseMove(e: MouseEvent) {
      const rect = cvs.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    function onMouseLeave() {
      mouseX = -9999
      mouseY = -9999
    }

    window.addEventListener('resize', resize)
    cvs.addEventListener('mousemove', onMouseMove)
    cvs.addEventListener('mouseleave', onMouseLeave)
    init()
    draw()

    return () => {
      if (rafId !== null) {
  cancelAnimationFrame(rafId)
}
      window.removeEventListener('resize', resize)
      cvs.removeEventListener('mousemove', onMouseMove)
      cvs.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [count])

  return <canvas ref={canvasRef} className={className} style={style} />
}
