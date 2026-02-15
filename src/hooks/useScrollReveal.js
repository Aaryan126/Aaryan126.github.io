import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Animation presets
const presets = {
  fadeUp: {
    from: { opacity: 0, y: 40 },
    to: { opacity: 1, y: 0 },
  },
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },
  slideLeft: {
    from: { opacity: 0, x: -60 },
    to: { opacity: 1, x: 0 },
  },
  slideRight: {
    from: { opacity: 0, x: 60 },
    to: { opacity: 1, x: 0 },
  },
  scaleUp: {
    from: { opacity: 0, scale: 0.85, y: 30 },
    to: { opacity: 1, scale: 1, y: 0 },
  },
  clipUp: {
    from: { opacity: 0, clipPath: 'inset(100% 0% 0% 0%)' },
    to: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  },
  clipLeft: {
    from: { opacity: 0, clipPath: 'inset(0% 100% 0% 0%)' },
    to: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
  },
}

/**
 * Scroll-triggered reveal animation hook.
 *
 * @param {string} preset - Animation preset name (fadeUp, slideLeft, scaleUp, clipUp, etc.)
 * @param {object} options
 * @param {string} options.childSelector - If provided, animates matching children with stagger
 * @param {number} options.stagger - Stagger delay between children (default 0.1)
 * @param {number} options.duration - Animation duration (default 0.7)
 * @param {string} options.ease - GSAP easing (default 'power3.out')
 * @param {string} options.start - ScrollTrigger start position (default 'top 85%')
 * @param {number} options.delay - Delay before animation starts (default 0)
 * @returns {React.RefObject}
 */
export function useScrollReveal(preset = 'fadeUp', options = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const {
      childSelector,
      stagger = 0.1,
      duration = 0.7,
      ease = 'power3.out',
      start = 'top 85%',
      delay = 0,
    } = options

    const animation = presets[preset]
    if (!animation) return

    const targets = childSelector ? el.querySelectorAll(childSelector) : el

    // If no children found with selector, bail
    if (childSelector && (!targets || targets.length === 0)) return

    const ctx = gsap.context(() => {
      gsap.fromTo(targets, animation.from, {
        ...animation.to,
        duration,
        ease,
        delay,
        stagger: childSelector ? stagger : 0,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [preset, options.childSelector, options.stagger, options.duration, options.ease, options.start, options.delay])

  return ref
}
