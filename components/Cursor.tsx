'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [visible, setVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const rawX = useMotionValue(-200)
  const rawY = useMotionValue(-200)

  // Main cursor – tight spring for responsiveness
  const x = useSpring(rawX, { stiffness: 600, damping: 40, mass: 0.5 })
  const y = useSpring(rawY, { stiffness: 600, damping: 40, mass: 0.5 })

  // Trailing dot – looser spring for lag effect
  const trailX = useSpring(rawX, { stiffness: 150, damping: 30, mass: 0.8 })
  const trailY = useSpring(rawY, { stiffness: 150, damping: 30, mass: 0.8 })

  useEffect(() => {
    // Only show custom cursor on devices with a fine pointer (mouse/trackpad)
    if (!window.matchMedia('(pointer: fine)').matches) return
    setVisible(true)

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX - 16)
      rawY.set(e.clientY - 16)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isLink = !!target.closest('a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]')
      setIsPointer(isLink)
    }

    const onDown = () => setIsClicking(true)
    const onUp   = () => setIsClicking(false)

    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseover', onOver)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [rawX, rawY])

  if (!visible) return null

  return (
    <>
      {/* Trailing outer ring */}
      <motion.div
        style={{ x: trailX, y: trailY }}
        animate={{
          width:   isPointer ? 48 : 32,
          height:  isPointer ? 48 : 32,
          opacity: isPointer ? 0.6 : 0.3,
          scale:   isClicking ? 0.85 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 rounded-full border border-[#00d4ff] pointer-events-none z-[9998]"
      />

      {/* Inner filled dot */}
      <motion.div
        style={{
          x,
          y,
          translateX: isPointer ? 5 : 13,
          translateY: isPointer ? 5 : 13,
        }}
        animate={{
          width:           isPointer ? 10 : 6,
          height:          isPointer ? 10 : 6,
          backgroundColor: isPointer ? '#a855f7' : '#00d4ff',
          scale:           isClicking ? 0.6 : 1,
          opacity:         1,
        }}
        transition={{ duration: 0.1 }}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      />
    </>
  )
}
