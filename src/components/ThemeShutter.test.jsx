// @vitest-environment jsdom
import { act, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from '../App'

let root
let container

const slider = () => document.querySelector('[role="slider"]')
const source = (selector) => document.querySelector(`.theme-source ${selector}`)
const tick = () => new Promise((resolve) => setTimeout(resolve, 70))
const key = async (value) => {
  await act(async () => {
    slider().dispatchEvent(new KeyboardEvent('keydown', { key: value, bubbles: true }))
    await tick()
  })
}
const pointer = async (type, x, pointerType = 'mouse') => {
  await act(async () => {
    const event = new Event(type, { bubbles: true })
    Object.assign(event, { pointerId: 1, pointerType, isPrimary: true, button: 0, clientX: x })
    slider().dispatchEvent(event)
    await tick()
  })
}
const mount = async () => {
  container = document.createElement('div')
  document.body.append(container)
  root = createRoot(container)
  await act(async () => { root.render(<StrictMode><App /></StrictMode>); await tick() })
}

beforeEach(() => {
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  localStorage.clear()
  window.location.hash = '#/'
  vi.stubGlobal('matchMedia', vi.fn((query) => ({
    matches: query.includes('prefers-reduced-motion'),
    addListener: vi.fn(), removeListener: vi.fn(),
    addEventListener: vi.fn(), removeEventListener: vi.fn(),
  })))
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  Object.defineProperty(document.documentElement, 'clientWidth', { configurable: true, value: 1200 })
  Element.prototype.setPointerCapture = function () { this.captured = true }
  Element.prototype.hasPointerCapture = function () { return !!this.captured }
  Element.prototype.releasePointerCapture = function () { this.captured = false }
})

afterEach(async () => {
  await act(async () => root?.unmount())
  container?.remove()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
})

describe('theme shutter', () => {
  it('opens halfway, preserves arbitrary splits, and commits each edge across reloads', async () => {
    await mount()
    expect(document.documentElement.dataset.theme).toBe('light')
    await act(async () => { source('.pf-icon-button').click(); await tick() })
    expect(slider().getAttribute('aria-valuenow')).toBe('50')
    expect(document.querySelector('.theme-preview').getAttribute('data-theme')).toBe('dark')
    expect(document.querySelector('.theme-preview').hasAttribute('inert')).toBe(true)
    expect(document.querySelectorAll('#hero-title')).toHaveLength(1)

    await pointer('pointerdown', 600)
    await pointer('pointermove', 420)
    await pointer('pointerup', 420)
    expect(slider().getAttribute('aria-valuenow')).toBe('35')
    expect(localStorage.getItem('theme')).toBe('light')

    await pointer('pointerdown', 420)
    await pointer('pointermove', 8)
    await pointer('pointerup', 8)
    expect(document.documentElement.dataset.theme).toBe('dark')
    expect(localStorage.getItem('theme')).toBe('dark')
    expect(document.querySelector('.theme-preview')).toBeNull()

    await act(async () => root.unmount())
    container.remove()
    await mount()
    expect(slider().getAttribute('aria-valuetext')).toBe('Dark mode')
    await pointer('pointerdown', 26)
    await pointer('pointermove', 1190)
    await pointer('pointerup', 1190)
    expect(document.documentElement.dataset.theme).toBe('light')
    expect(localStorage.getItem('theme')).toBe('light')
  })

  it('supports keyboard midpoint, adjustments, both endpoints, and cancellation', async () => {
    await mount()
    await key('Enter')
    expect(slider().getAttribute('aria-valuenow')).toBe('50')
    await key('ArrowLeft')
    expect(slider().getAttribute('aria-valuenow')).toBe('48')
    await key('Escape')
    expect(slider().getAttribute('aria-valuetext')).toBe('Light mode')
    await key('Home')
    expect(document.documentElement.dataset.theme).toBe('dark')
    await key('ArrowRight')
    expect(slider().getAttribute('aria-valuenow')).toBe('2')
    expect(document.querySelector('.theme-preview').dataset.theme).toBe('light')
    await key('End')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it('handles touch, snaps near center, and restores the starting split on pointer cancellation', async () => {
    await mount()
    await pointer('pointerdown', 1174, 'touch')
    await pointer('pointermove', 606, 'touch')
    await pointer('pointerup', 606, 'touch')
    expect(slider().getAttribute('aria-valuenow')).toBe('50')
    await pointer('pointerdown', 600, 'touch')
    await pointer('pointermove', 300, 'touch')
    await pointer('pointercancel', 300, 'touch')
    expect(slider().getAttribute('aria-valuenow')).toBe('50')
    expect(document.documentElement.classList.contains('is-dragging-theme')).toBe(false)
  })

  it('keeps the saved theme on case study navigation and syncs the preview content', async () => {
    await mount()
    await key('Home')
    await key('Enter')
    await act(async () => {
      source('a[href="#/work/boldr-signaldesk"]').click()
      await tick()
    })
    expect(source('.pf-case')).not.toBeNull()
    expect(document.querySelector('.theme-preview .pf-case')).not.toBeNull()
    expect(document.documentElement.dataset.theme).toBe('dark')
    await key('Escape')
    expect(document.querySelector('.theme-preview')).toBeNull()
    expect(localStorage.getItem('theme')).toBe('dark')
  })

  it('works when theme storage is blocked', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('Blocked') })
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('Blocked') })
    await mount()
    await key('Home')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })
})
