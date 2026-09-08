// @vitest-environment jsdom
import { act, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import App from '../App'

it('animates opening and closing, then commits a keyboard endpoint without a competing animation', async () => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addListener() {}, removeListener() {},
    addEventListener() {}, removeEventListener() {},
  }))
  localStorage.setItem('theme', 'light')
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const slider = () => container.querySelector('[role="slider"]')
  try {
    await act(async () => { root.render(<StrictMode><App /></StrictMode>) })
    await act(async () => { container.querySelector('.theme-source .pf-icon-button').click() })
    await act(async () => { await wait(100) })
    const intermediate = Number(slider().getAttribute('aria-valuenow'))
    expect(intermediate).toBeGreaterThan(50)
    expect(intermediate).toBeLessThan(100)
    expect(document.activeElement).toBe(slider())
    await act(async () => { await wait(500) })
    expect(slider().getAttribute('aria-valuenow')).toBe('50')

    await act(async () => { container.querySelector('.theme-source .pf-icon-button').click() })
    await act(async () => { await wait(100) })
    expect(container.querySelector('.theme-preview')).not.toBeNull()
    await act(async () => { await wait(500) })
    expect(container.querySelector('.theme-preview')).toBeNull()

    await act(async () => {
      slider().dispatchEvent(new KeyboardEvent('keydown', { key: 'Home', bubbles: true }))
    })
    await act(async () => { await wait(550) })
    expect(slider().getAttribute('aria-valuenow')).toBe('0')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(container.querySelector('.theme-preview')).toBeNull()
  } finally {
    await act(async () => root.unmount())
    container.remove()
    vi.unstubAllGlobals()
  }
})
