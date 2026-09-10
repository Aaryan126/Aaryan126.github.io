import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Dismiss loader after React render + fonts are ready
function dismissLoader() {
  const loader = document.getElementById('loader')
  if (!loader) return

  let finished = false
  const finish = () => {
    if (finished) return
    finished = true
    window.clearTimeout(fallback)
    loader.remove()
    document.documentElement.classList.remove('no-transition')
    window.dispatchEvent(new Event('portfolio-ready'))
  }
  // Startup styles or browser settings can suppress transitionend entirely.
  const fallback = window.setTimeout(finish, 550)
  loader.addEventListener('transitionend', finish, { once: true })

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    finish()
    return
  }

  loader.classList.add('fade-out')
}

// Wait for fonts to finish loading, then dismiss
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(dismissLoader)
} else {
  // Fallback for browsers without document.fonts
  window.addEventListener('load', dismissLoader)
}
