// @vitest-environment jsdom
import { act } from 'react'
import { createRoot } from 'react-dom/client'
import { motionValue } from 'framer-motion'
import { afterEach, expect, it, vi } from 'vitest'
import { detectGlassCapabilities } from '@aberhamm/liquid-glass-react'
import LiquidGlassLens from './LiquidGlassLens'

vi.mock('@aberhamm/liquid-glass-react', async (importOriginal) => ({
  ...await importOriginal(),
  detectGlassCapabilities: vi.fn(() => ({ canRefract: false })),
}))

afterEach(() => {
  vi.mocked(detectGlassCapabilities).mockReturnValue({ canRefract: false })
})

it('refracts both themes in a small sample that follows the shutter, scroll, and content changes', async () => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  const disconnect = vi.fn()
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    disconnect() { disconnect() }
  })
  const source = document.createElement('div')
  source.innerHTML = '<header class="pf-header">Navigation</header><main id="unique-content"><h1>Original heading</h1></main>'
  const container = document.createElement('div')
  document.body.append(source, container)
  let scroll = 200
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(function () {
    return this === source
      ? { left: 0, top: -scroll, width: 1200, height: 4000 }
      : { left: 566, top: 360, width: 84, height: 96 }
  })
  const position = motionValue(50)
  const flow = motionValue(0)
  const root = createRoot(container)
  const tick = () => new Promise((resolve) => setTimeout(resolve, 40))
  try {
    await act(async () => root.render(<LiquidGlassLens sourceRef={{ current: source }} position={position} flow={flow} />))
    const world = container.querySelector('.theme-glass-lens__world')
    const sample = container.querySelector('.theme-glass-lens__sample')
    expect(sample.style.filter).toContain('url(')
    expect(container.querySelector('feImage').getAttribute('href')).toMatch(/^data:image\/png;base64,/)
    const displacement = container.querySelector('feDisplacementMap')
    expect(displacement.getAttribute('scale')).toBe('-28')
    expect(displacement.getAttribute('yChannelSelector')).toBe('B')
    expect(world.children).toHaveLength(2)
    expect(world.children[0].dataset.theme).toBe('light')
    expect(world.children[1].dataset.theme).toBe('dark')
    expect(world.children[1].style.clipPath).toBe('inset(0 0 0 50%)')
    expect(world.style.transform).toBe('translate3d(-566px, -560px, 0)')
    expect(document.querySelectorAll('#unique-content')).toHaveLength(1)
    expect(container.querySelector('.theme-glass-lens').hasAttribute('inert')).toBe(true)

    await act(async () => {
      position.set(30)
      flow.set(1)
      scroll = 600
      window.dispatchEvent(new Event('scroll'))
      await tick()
    })
    expect(world.children[1].style.clipPath).toBe('inset(0 0 0 30%)')
    expect(displacement.getAttribute('scale')).toBe('-36')
    expect(world.style.transform).toBe('translate3d(-566px, -960px, 0)')
    expect(world.querySelector('.pf-header').style.top).toBe('600px')

    await act(async () => {
      source.querySelector('h1').textContent = 'Updated heading'
      await tick()
    })
    expect([...world.querySelectorAll('h1')].map((heading) => heading.textContent)).toEqual(['Updated heading', 'Updated heading'])
    await act(async () => root.unmount())
    expect(disconnect).toHaveBeenCalledTimes(1)
    expect(world.children).toHaveLength(0)
  } finally {
    await act(async () => root.unmount())
    source.remove()
    container.remove()
    position.destroy()
    flow.destroy()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  }
})

it('uses native backdrop refraction without cloning the page on supported browsers', async () => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  vi.mocked(detectGlassCapabilities).mockReturnValue({ canRefract: true })
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  const position = motionValue(50)
  const flow = motionValue(0)
  // A null source proves this path does not read or clone the page.
  try {
    await act(async () => root.render(<LiquidGlassLens sourceRef={{ current: null }} position={position} flow={flow} />))
    const lens = container.querySelector('.theme-glass-lens')
    const filter = container.querySelector('filter')
    expect(lens.dataset.renderer).toBe('backdrop')
    const surface = lens.querySelector('.theme-glass-lens__surface')
    expect(surface.style.backdropFilter.replaceAll('"', '')).toBe(`url(#${filter.id})`)
    expect(lens.style.backdropFilter).toBe('')
    expect(container.querySelector('.theme-glass-lens__sample')).toBeNull()
    expect(container.querySelector('feImage').getAttribute('x')).toBe('4')
    await act(async () => flow.set(-1))
    expect(container.querySelector('feDisplacementMap').getAttribute('scale')).toBe('-36')
  } finally {
    await act(async () => root.unmount())
    container.remove()
    position.destroy()
    flow.destroy()
  }
})
