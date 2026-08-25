import { lazy, Suspense, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import PortfolioSite from './components/PortfolioSite'
import CaseStudyPage from './components/CaseStudyPage'
import './index.css'
import './redesign.css'

const DesktopView = lazy(() => import('./components/desktop/DesktopView'))

function App() {
  const [desktopMode, setDesktopMode] = useState(false)
  const [desktopNotice, setDesktopNotice] = useState(false)

  const launchDesktop = () => {
    if (window.innerWidth < 760) {
      setDesktopNotice(true)
      return
    }
    setDesktopMode(true)
  }

  return (
    <ThemeProvider>
      <HashRouter>
        <AnimatePresence mode="wait">
          {desktopMode ? (
            <Suspense key="desktop-fallback" fallback={<div className="pf-loading">Opening AaryanOS…</div>}>
              <DesktopView key="desktop" onExit={() => setDesktopMode(false)} />
            </Suspense>
          ) : (
            <Routes key="site">
              <Route path="/" element={<PortfolioSite onDesktopMode={launchDesktop} />} />
              <Route path="/work/:slug" element={<CaseStudyPage />} />
              <Route path="*" element={<PortfolioSite onDesktopMode={launchDesktop} />} />
            </Routes>
          )}
        </AnimatePresence>
        {desktopNotice && (
          <div className="pf-dialog-backdrop" role="presentation" onMouseDown={() => setDesktopNotice(false)}>
            <div className="pf-dialog" role="dialog" aria-modal="true" aria-labelledby="desktop-dialog-title" onMouseDown={(event) => event.stopPropagation()}>
              <p className="pf-kicker">AaryanOS</p>
              <h2 id="desktop-dialog-title">Best explored on a larger screen.</h2>
              <p>The playground uses draggable windows and a desktop dock. The complete portfolio is available here on mobile; reopen AaryanOS from a tablet or computer for the intended experience.</p>
              <button type="button" className="pf-primary-link" onClick={() => setDesktopNotice(false)}>Continue browsing <span aria-hidden="true">→</span></button>
            </div>
          </div>
        )}
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
