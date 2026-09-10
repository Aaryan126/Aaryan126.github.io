import { useState, useLayoutEffect, useCallback } from 'react'
import { ThemeContext } from './theme-context'

export function ThemeProvider({ children }) {
  const [introPending, setIntroPending] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [isDark, setIsDark] = useState(() => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark' || saved === 'light') return saved === 'dark'
    } catch { /* Private browsing can make storage unavailable. */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [shutterOpen, updateShutterOpen] = useState(false)

  useLayoutEffect(() => {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch { /* The theme still works without persistence. */ }
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  }, [isDark])

  const cancelIntro = useCallback(() => setIntroPending(false), [])

  const setShutterOpen = useCallback((open) => {
    setIntroPending(false)
    updateShutterOpen(open)
  }, [])

  const setTheme = useCallback((dark) => {
    setIntroPending(false)
    setIsDark(dark)
    updateShutterOpen(false)
  }, [])

  return (
    <ThemeContext.Provider value={{ isDark, setTheme, shutterOpen, setShutterOpen, introPending, cancelIntro }}>
      {children}
    </ThemeContext.Provider>
  )
}
