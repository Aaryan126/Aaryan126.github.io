import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import DesktopView from './components/desktop/DesktopView'
import './index.css'

function App() {
  const [desktopMode, setDesktopMode] = useState(false)

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {desktopMode ? (
          <DesktopView key="desktop" onExit={() => setDesktopMode(false)} />
        ) : (
          <div key="site">
            <Navbar onDesktopMode={() => setDesktopMode(true)} />
            <Hero />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Contact />
          </div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
