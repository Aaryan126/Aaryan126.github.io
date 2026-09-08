import { useId, useLayoutEffect, useRef, useState } from 'react'
import { detectGlassCapabilities, getDisplacementMap } from '@aberhamm/liquid-glass-react'

// The library's polar map bends actual pixels radially through the lens.
// Four map pixels per CSS pixel keep the curved surface smooth on Retina screens.
const displacementMap = getDisplacementMap('polar', 176, 224)

export default function LiquidGlassLens({ sourceRef, position, flow }) {
  const filterId = `glass-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`
  const [nativeBackdrop] = useState(() => detectGlassCapabilities().canRefract)
  const sampleRef = useRef(null)
  const worldRef = useRef(null)
  const displacementRef = useRef(null)
  // Overscan the native surface so the final blur has pixels beyond the rim.
  const padding = nativeBackdrop ? 4 : 20
  const filter = `url(#${filterId})`

  useLayoutEffect(() => {
    const updateRefraction = () => {
      // A negative scale draws pixels towards the optical centre, magnifying
      // text and grid lines. Keep all colour channels together to avoid fringing.
      displacementRef.current.setAttribute('scale', String(-28 - Math.min(1, Math.abs(flow.get())) * 8))
    }
    updateRefraction()
    return flow.on('change', updateRefraction)
  }, [flow])

  useLayoutEffect(() => {
    // Chromium samples the live composited page, including animation and hover.
    // Other browsers need an element filter on an aligned, inert content sample.
    if (nativeBackdrop || typeof ResizeObserver === 'undefined') return
    const sample = sampleRef.current
    const world = worldRef.current
    const source = sourceRef.current
    let darkScene
    let headers = []
    let frame = 0
    let needsSync = true

    const syncScene = () => {
      // These copies are visual samples, never interactive or exposed to AT.
      const lightScene = source.cloneNode(true)
      lightScene.removeAttribute('class')
      lightScene.querySelectorAll('[id]').forEach((node) => node.removeAttribute('id'))
      lightScene.querySelectorAll('script, iframe').forEach((node) => node.remove())
      lightScene.querySelectorAll('img').forEach((node) => { node.loading = 'eager' })
      darkScene = lightScene.cloneNode(true)
      lightScene.dataset.theme = 'light'
      darkScene.dataset.theme = 'dark'
      darkScene.style.position = 'absolute'
      darkScene.style.inset = '0'
      world.replaceChildren(lightScene, darkScene)
      headers = [...world.querySelectorAll('.pf-header')]
      headers.forEach((header) => { header.style.position = 'absolute' })
      needsSync = false
    }

    const paint = () => {
      frame = 0
      if (needsSync) syncScene()
      const rect = sample.getBoundingClientRect()
      const sourceRect = source.getBoundingClientRect()
      world.style.width = `${sourceRect.width}px`
      world.style.transform = `translate3d(${sourceRect.left - rect.left}px, ${sourceRect.top - rect.top}px, 0)`
      darkScene.style.clipPath = `inset(0 0 0 ${position.get()}%)`
      headers.forEach((header) => { header.style.top = `${-sourceRect.top}px` })
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint)
    }
    const observer = new MutationObserver(() => { needsSync = true; schedule() })
    observer.observe(source, { subtree: true, childList: true, attributes: true, characterData: true })
    const resize = new ResizeObserver(schedule)
    resize.observe(source)
    const stopPosition = position.on('change', schedule)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    source.addEventListener('load', schedule, true)
    world.addEventListener('load', schedule, true)
    paint()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      resize.disconnect()
      stopPosition()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      source.removeEventListener('load', schedule, true)
      world.removeEventListener('load', schedule, true)
      world.replaceChildren()
    }
  }, [sourceRef, position, nativeBackdrop])

  return (
    <span
      className="theme-glass-lens"
      data-renderer={nativeBackdrop ? 'backdrop' : 'sample'}
      aria-hidden="true"
      inert
    >
      <span
        className="theme-glass-lens__surface"
        style={nativeBackdrop ? { backdropFilter: filter, WebkitBackdropFilter: filter } : undefined}
      >
        {!nativeBackdrop && (
          <span ref={sampleRef} className="theme-glass-lens__sample" style={{ filter }}>
            <span ref={worldRef} className="theme-glass-lens__world" />
          </span>
        )}
      </span>
      <svg className="theme-glass-lens__defs" width="0" height="0" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-20" y="-20" width={84 + padding * 2} height={96 + padding * 2}
            filterUnits="userSpaceOnUse" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            {/* Prefilter sharp text before magnification to prevent stepped edges. */}
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" edgeMode="duplicate" result="soft-background" />
            <feFlood floodColor="rgb(128, 0, 128)" result="neutral" />
            <feImage href={displacementMap} x={padding} y={padding} width="44" height="56"
              preserveAspectRatio="none" result="polar-map" />
            <feComposite in="polar-map" in2="neutral" operator="over" result="displacement" />
            {/* Smooth the PNG map's discrete channel values before sampling. */}
            <feGaussianBlur in="displacement" stdDeviation="0.5" edgeMode="duplicate" result="smooth-displacement" />
            <feDisplacementMap ref={displacementRef} in="soft-background" in2="smooth-displacement"
              scale="-28" xChannelSelector="R" yChannelSelector="B" />
          </filter>
        </defs>
      </svg>
    </span>
  )
}
