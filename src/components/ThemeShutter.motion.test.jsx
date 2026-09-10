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

it('waits for the loader, sweeps from light to dark once, and leaves manual control available', async () => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addListener() {}, removeListener() {},
    addEventListener() {}, removeEventListener() {},
  }))
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  window.location.hash = '#/'
  localStorage.setItem('theme', 'dark')
  const loader = document.createElement('div')
  loader.id = 'loader'
  const container = document.createElement('div')
  document.body.append(loader, container)
  const root = createRoot(container)
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  const slider = () => container.querySelector('[role="slider"]')
  try {
    await act(async () => root.render(<StrictMode><App /></StrictMode>))
    expect(document.documentElement.dataset.theme).toBe('light')
    await act(async () => { await wait(650) })
    expect(slider().getAttribute('aria-valuenow')).toBe('100')
    await act(async () => {
      loader.remove()
      window.dispatchEvent(new Event('portfolio-ready'))
    })
    await act(async () => { await wait(1100) })
    const intermediate = Number(slider().getAttribute('aria-valuenow'))
    expect(intermediate).toBeGreaterThan(0)
    expect(intermediate).toBeLessThan(100)
    expect(container.querySelector('.theme-preview')).not.toBeNull()
    expect(document.activeElement).not.toBe(slider())
    await act(async () => { await wait(1350) })
    expect(slider().getAttribute('aria-valuenow')).toBe('0')
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(container.querySelector('.theme-preview')).toBeNull()
    await act(async () => {
      container.querySelector('.theme-source a[href="#/work/boldr-signaldesk"]').click()
      await wait(100)
    })
    expect(container.querySelector('.theme-source .pf-case')).not.toBeNull()
    expect(slider().getAttribute('aria-valuenow')).toBe('0')
    await act(async () => {
      slider().dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
    })
    await act(async () => { await wait(550) })
    expect(slider().getAttribute('aria-valuenow')).toBe('100')
    expect(document.documentElement.dataset.theme).toBe('light')
  } finally {
    await act(async () => root.unmount())
    loader.remove()
    container.remove()
    window.location.hash = '#/'
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  }
}, 7000)

it('cancels the automatic sweep as soon as the user takes control', async () => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addListener() {}, removeListener() {},
    addEventListener() {}, removeEventListener() {},
  }))
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
  try {
    await act(async () => root.render(<StrictMode><App /></StrictMode>))
    await act(async () => { await wait(850) })
    const slider = container.querySelector('[role="slider"]')
    expect(Number(slider.getAttribute('aria-valuenow'))).toBeLessThan(100)
    await act(async () => {
      slider.dispatchEvent(new KeyboardEvent('keydown', { key: 'End', bubbles: true }))
    })
    // Wait beyond the original intro completion time to catch competing callbacks.
    await act(async () => { await wait(1900) })
    expect(slider.getAttribute('aria-valuenow')).toBe('100')
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(container.querySelector('.theme-preview')).toBeNull()
  } finally {
    await act(async () => root.unmount())
    container.remove()
    vi.unstubAllGlobals()
  }
})
