'use client'

import { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  alpha: number
  pulse: number
  pulseSpeed: number
  glowSize: number
}

interface BlockchainNetworkProps {
  className?: string
  style?: React.CSSProperties
}

export default function BlockchainNetwork({ className, style }: BlockchainNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const cvs = canvas
    const ctx = cvs.getContext('2d')!
    let W = 0
    let H = 0
    let nodes: Node[] = []
    let rafId: number
    let mouseX = -9999
    let mouseY = -9999
    const NODE_COUNT = 85
    const LINK_DIST = 140
    const MOUSE_RADIUS = 180

    function resize() {
      W = cvs.width = cvs.offsetWidth
      H = cvs.height = cvs.offsetHeight
    }

    function spawn(): Node {
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.8 + 0.6,
        alpha: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        glowSize: Math.random() * 8 + 4,
      }
    }

    function init() {
      resize()
      nodes = Array.from({ length: NODE_COUNT }, spawn)
    }

    function draw() {
      ctx.clearRect(0, 0, W, H)

      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy

        if (n.x < 0) n.x = W
        if (n.x > W) n.x = 0
        if (n.y < 0) n.y = H
        if (n.y > H) n.y = 0

        // Gentle mouse repulsion
        const mdx = n.x - mouseX
        const mdy = n.y - mouseY
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
        if (mdist < MOUSE_RADIUS && mdist > 0) {
          const force = (1 - mdist / MOUSE_RADIUS) * 0.12
          n.vx += (mdx / mdist) * force
          n.vy += (mdy / mdist) * force
        }

        // Dampen
        n.vx *= 0.997
        n.vy *= 0.997

        n.pulse += n.pulseSpeed
        const a = n.alpha + Math.sin(n.pulse) * 0.18

        // Glow halo
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.glowSize)
        grad.addColorStop(0, `rgba(0,212,255,${a * 0.6})`)
        grad.addColorStop(0.6, `rgba(0,212,255,${a * 0.12})`)
        grad.addColorStop(1, 'rgba(0,212,255,0)')
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.glowSize, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,212,255,${a})`
        ctx.fill()
      }

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < LINK_DIST) {
            const a = (1 - dist / LINK_DIST) * 0.3
            const isPurple = (i * j) % 17 === 0
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
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
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      cvs.removeEventListener('mousemove', onMouseMove)
      cvs.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} style={style} />
}
