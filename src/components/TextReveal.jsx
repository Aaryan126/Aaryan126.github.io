import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TextReveal({ children, as: Tag = 'div', className = '', stagger = 0.04 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const words = el.querySelectorAll('.reveal-unit')
    if (!words.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        }
      )
    }, el)

    return () => ctx.revert()
  }, [children, stagger])

  const text = typeof children === 'string' ? children : ''
  const words = text.split(/\s+/).filter(Boolean)

  return (
    <Tag ref={containerRef} className={`text-reveal ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="reveal-unit">
          {word}{i < words.length - 1 ? '\u00A0' : ''}
        </span>
      ))}
    </Tag>
  )
}
