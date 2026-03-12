import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

// Register once – safe to call multiple times
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

// ── Types ──────────────────────────────────────────────────────
export interface ScrollRevealOptions {
  trigger?: string | Element
  start?: string
  end?: string
  toggleActions?: string
  scrub?: boolean | number
  markers?: boolean
}

// ── Helper: build ScrollTrigger config ────────────────────────
function withTrigger(trigger?: string | Element, opts: Partial<ScrollRevealOptions> = {}) {
  if (!trigger) return undefined
  return {
    trigger,
    start: opts.start ?? 'top 82%',
    end: opts.end ?? 'bottom 20%',
    toggleActions: opts.toggleActions ?? 'play none none reverse',
    markers: opts.markers ?? false,
    ...opts,
  }
}

// ── Core animations ────────────────────────────────────────────

/** Fade up from below */
export function fadeInUp(
  targets: gsap.TweenTarget,
  options: { delay?: number; duration?: number; y?: number; stagger?: number; trigger?: string | Element } = {}
) {
  const { delay = 0, duration = 0.8, y = 60, stagger = 0, trigger } = options
  return gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    delay,
    stagger,
    ease: 'power3.out',
    scrollTrigger: withTrigger(trigger),
  })
}

/** Staggered fade in for card grids */
export function staggerReveal(
  targets: gsap.TweenTarget,
  options: { stagger?: number; y?: number; duration?: number; trigger?: string | Element } = {}
) {
  const { stagger = 0.12, y = 40, duration = 0.7, trigger } = options
  return gsap.from(targets, {
    y,
    opacity: 0,
    duration,
    stagger,
    ease: 'power2.out',
    scrollTrigger: withTrigger(trigger),
  })
}

/** Scale & fade in */
export function scaleIn(
  targets: gsap.TweenTarget,
  options: { delay?: number; trigger?: string | Element } = {}
) {
  const { delay = 0, trigger } = options
  return gsap.from(targets, {
    scale: 0.85,
    opacity: 0,
    duration: 0.7,
    delay,
    ease: 'back.out(1.4)',
    scrollTrigger: withTrigger(trigger),
  })
}

/** Horizontal slide in */
export function slideInLeft(targets: gsap.TweenTarget, trigger?: string | Element) {
  return gsap.from(targets, {
    x: -60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: withTrigger(trigger),
  })
}

export function slideInRight(targets: gsap.TweenTarget, trigger?: string | Element) {
  return gsap.from(targets, {
    x: 60,
    opacity: 0,
    duration: 0.8,
    ease: 'power3.out',
    scrollTrigger: withTrigger(trigger),
  })
}

/** Clip-path reveal (left to right) */
export function clipReveal(targets: gsap.TweenTarget, trigger?: string | Element) {
  return gsap.from(targets, {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1,
    ease: 'power3.inOut',
    scrollTrigger: withTrigger(trigger),
  })
}

/** Counter animation – animates a number from 0 to target */
export function countUp(element: HTMLElement, target: number, duration = 1.5) {
  return gsap.to(
    { val: 0 },
    {
      val: target,
      duration,
      ease: 'power2.out',
      onUpdate() {
        element.textContent = Math.round((this as gsap.core.Tween).targets()[0].val).toString()
      },
    }
  )
}

/** Parallax background on scroll (scrub) */
export function parallaxY(
  targets: gsap.TweenTarget,
  yPercent: number,
  trigger?: string | Element
) {
  return gsap.to(targets, {
    yPercent,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger ?? 'body',
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  })
}

/** Pin section with progress-based animation */
export function pinSection(trigger: string, animation: gsap.core.Timeline) {
  return ScrollTrigger.create({
    trigger,
    start: 'top top',
    end: '+=150%',
    pin: true,
    scrub: 1,
    animation,
  })
}

/** Refresh ScrollTrigger (call after dynamic content loads) */
export function refreshScrollTrigger() {
  ScrollTrigger.refresh()
}
