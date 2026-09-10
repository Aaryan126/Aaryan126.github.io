import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { animate, motion as Motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useTheme } from '../context/useTheme'
import LiquidGlassLens from './LiquidGlassLens'
import './theme-shutter.css'

const clamp = (value) => Math.min(100, Math.max(0, value))

export default function ThemeShutter({ children, enabled = true }) {
  const { isDark, setTheme, shutterOpen, setShutterOpen, introPending, cancelIntro } = useTheme()
  const sourceRef = useRef(null)
  const previewRef = useRef(null)
  const dragRef = useRef(null)
  const animationRef = useRef(null)
  const handleRef = useRef(null)
  const skipOpenAnimationRef = useRef(false)
  const reducedMotion = useReducedMotion()
  const position = useMotionValue(isDark ? 0 : 100)
  const velocity = useVelocity(position)
  const glassTarget = useTransform(velocity, (value) => reducedMotion ? 0 : Math.max(-1, Math.min(1, value / 180)))
  const glassFlow = useSpring(glassTarget, { stiffness: 240, damping: 22, mass: 0.6 })
  const glassHighlight = useTransform(glassFlow, (value) => `${50 + value * 32}%`)
  const glassReflection = useTransform(glassFlow, (value) => `${-24 + value * 14}deg`)
  const [readout, setReadout] = useState(isDark ? 0 : 100)
  const [dragging, setDragging] = useState(false)
  const previewActive = enabled && (introPending || shutterOpen || (readout > 0 && readout < 100))
  const linePosition = useTransform(position, (value) => `${value}%`)
  const handlePosition = useTransform(position, (value) => `clamp(26px, ${value}%, calc(100% - 26px))`)
  const clip = useTransform(position, (value) => isDark
    ? `inset(0 ${100 - value}% 0 0)`
    : `inset(0 0 0 ${value}%)`)

  useMotionValueEvent(position, 'change', setReadout)

  // The inert visual copy shares the document's scrolling and layout. Only the
  // original is interactive; there is no second React tree or duplicate effects.
  useLayoutEffect(() => {
    if (!previewActive) return
    const source = sourceRef.current
    const preview = previewRef.current
    const sync = () => {
      const copy = source.cloneNode(true)
      copy.removeAttribute('class')
      copy.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'))
      copy.querySelectorAll('img').forEach((node) => { node.loading = 'eager' })
      preview.replaceChildren(copy)
    }
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(source, { subtree: true, childList: true, attributes: true, characterData: true })
    return () => {
      observer.disconnect()
      preview.replaceChildren()
    }
  }, [previewActive])

  useEffect(() => {
    if (!introPending) return
    if (!enabled || reducedMotion) {
      cancelIntro()
      return
    }
    let introAnimation
    let cancelled = false
    const start = () => {
      if (cancelled || introAnimation) return
      introAnimation = animate(position, 0, {
        delay: 0.45,
        duration: 1.8,
        ease: [0.45, 0, 0.2, 1],
        onComplete: () => setTheme(true),
      })
      animationRef.current = introAnimation
    }
    // Start only once the loader is gone, without moving keyboard focus.
    window.addEventListener('portfolio-ready', start)
    if (!document.getElementById('loader')) start()
    return () => {
      cancelled = true
      window.removeEventListener('portfolio-ready', start)
      introAnimation?.stop()
    }
  }, [introPending, enabled, reducedMotion, position, setTheme, cancelIntro])

  useEffect(() => {
    if (introPending) return
    if (dragRef.current || skipOpenAnimationRef.current) {
      skipOpenAnimationRef.current = false
      return
    }
    animationRef.current?.stop()
    if (shutterOpen) handleRef.current?.focus({ preventScroll: true })
    const animation = animate(position, shutterOpen ? 50 : (isDark ? 0 : 100), {
      duration: reducedMotion ? 0 : 0.48,
      ease: [0.22, 1, 0.36, 1],
    })
    animationRef.current = animation
    return () => animation.stop()
  }, [shutterOpen, isDark, position, reducedMotion, introPending])

  useEffect(() => () => animationRef.current?.stop(), [])

  useEffect(() => {
    if (!dragging) return
    document.documentElement.classList.add('is-dragging-theme')
    return () => document.documentElement.classList.remove('is-dragging-theme')
  }, [dragging])

  const settle = (target) => {
    animationRef.current?.stop()
    animationRef.current = animate(position, target, {
      duration: reducedMotion ? 0 : 0.36,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        if (target === 0 || target === 100) setTheme(target === 0)
      },
    })
  }

  const startDrag = (event) => {
    if (!event.isPrimary || event.button !== 0) return
    animationRef.current?.stop()
    dragRef.current = { id: event.pointerId, x: event.clientX, value: position.get(), moved: false }
    event.currentTarget.setPointerCapture(event.pointerId)
    setDragging(true)
    setShutterOpen(true)
  }

  const moveDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    if (Math.abs(event.clientX - drag.x) > 3) drag.moved = true
    if (drag.moved) position.set(clamp(event.clientX / document.documentElement.clientWidth * 100))
  }

  const finishDrag = (event, cancelled = false) => {
    const drag = dragRef.current
    if (!drag || drag.id !== event.pointerId) return
    dragRef.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (cancelled) {
      settle(drag.value)
      return
    }
    if (!drag.moved) {
      settle(50)
      return
    }
    const value = position.get()
    const edge = Math.min(4, 24 / document.documentElement.clientWidth * 100)
    settle(value <= edge ? 0 : value >= 100 - edge ? 100 : Math.abs(value - 50) <= 1.5 ? 50 : value)
  }

  const onKeyDown = (event) => {
    const current = position.get()
    const step = event.shiftKey ? 10 : 2
    const targets = {
      ArrowLeft: clamp(current - step), ArrowDown: clamp(current - step),
      ArrowRight: clamp(current + step), ArrowUp: clamp(current + step),
      Home: 0, End: 100, Enter: 50, ' ': 50,
      Escape: isDark ? 0 : 100,
    }
    if (!(event.key in targets)) return
    event.preventDefault()
    // Keep opening the preview from scheduling a competing center animation.
    skipOpenAnimationRef.current = !shutterOpen
    setShutterOpen(true)
    settle(targets[event.key])
  }

  const valueText = readout === 0 ? 'Dark mode' : readout === 100 ? 'Light mode'
    : `${Math.round(readout)}% light, ${Math.round(100 - readout)}% dark`

  return (
    <div className="theme-stage">
      <div ref={sourceRef} className="theme-source">{children}</div>
      {previewActive && (
        <Motion.div
          ref={previewRef}
          className="theme-preview"
          data-theme={isDark ? 'light' : 'dark'}
          style={{ clipPath: clip }}
          aria-hidden="true"
          inert
        />
      )}
      {enabled && (
        <div id="theme-shutter" className={`theme-shutter ${previewActive ? 'is-open' : ''} ${dragging ? 'is-dragging' : ''}`}>
          <Motion.div className="theme-shutter__line" style={{ left: linePosition }} aria-hidden="true" />
          <Motion.div className="theme-shutter__control" style={{ left: handlePosition }}>
            <button
              ref={handleRef}
              type="button"
              className="theme-shutter__handle"
              role="slider"
              aria-label="Light and dark theme shutter"
              aria-describedby="theme-shutter-help"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(readout)}
              aria-valuetext={valueText}
              aria-orientation="horizontal"
              title="Drag left for dark, right for light. Click for half and half."
              onPointerDown={startDrag}
              onPointerMove={moveDrag}
              onPointerUp={finishDrag}
              onPointerCancel={(event) => finishDrag(event, true)}
              onLostPointerCapture={(event) => finishDrag(event, true)}
              onKeyDown={onKeyDown}
              onClick={(event) => {
                // Assistive technology may activate a control without pointer events.
                if (event.detail === 0) setShutterOpen(true)
              }}
            >
              <Motion.span
                className="theme-shutter__glass"
                aria-hidden="true"
                style={{ '--glass-highlight': glassHighlight, '--glass-reflection': glassReflection }}
              >
                <LiquidGlassLens sourceRef={sourceRef} position={position} flow={glassFlow} />
                <span className="theme-shutter__frost" />
              </Motion.span>
              <svg width="18" height="18" viewBox="0 0 26 24" fill="none" aria-hidden="true">
                <path d="m7 8-4 4 4 4M19 8l4 4-4 4M12 6v12M15 6v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {!previewActive && <span className="theme-shutter__caption" aria-hidden="true">Drag me</span>}
          </Motion.div>
          <p id="theme-shutter-help" className="theme-shutter__sr-only">Drag left for dark or right for light. Leave in the middle for both. Use arrow keys to adjust, Home for dark, End for light, Enter for half and half, or Escape to restore your saved theme.</p>
        </div>
      )}
    </div>
  )
}
