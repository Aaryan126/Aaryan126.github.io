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

  // Re-enable transitions only after loader has fully faded out
  loader.addEventListener('transitionend', () => {
    loader.remove()
    document.documentElement.classList.remove('no-transition')
  }, { once: true })

  loader.classList.add('fade-out')
}

// Wait for fonts to finish loading, then dismiss
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(dismissLoader)
} else {
  // Fallback for browsers without document.fonts
  window.addEventListener('load', dismissLoader)
}
