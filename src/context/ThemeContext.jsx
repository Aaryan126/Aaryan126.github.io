import { useState, useLayoutEffect } from 'react'
import { ThemeContext } from './theme-context'

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const saved = localStorage.getItem('theme')
      if (saved === 'dark' || saved === 'light') return saved === 'dark'
    } catch { /* Private browsing can make storage unavailable. */ }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })
  const [shutterOpen, setShutterOpen] = useState(false)

  useLayoutEffect(() => {
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch { /* The theme still works without persistence. */ }
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
  }, [isDark])

  const setTheme = (dark) => {
    setIsDark(dark)
    setShutterOpen(false)
  }

  return (
    <ThemeContext.Provider value={{ isDark, setTheme, shutterOpen, setShutterOpen }}>
      {children}
    </ThemeContext.Provider>
  )
}
