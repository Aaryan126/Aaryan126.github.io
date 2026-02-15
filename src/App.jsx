import { ThemeProvider } from './context/ThemeContext'
import { useSmoothScroll } from './hooks/useSmoothScroll'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import './index.css'

function SmoothScrollInit() {
  useSmoothScroll()
  return null
}

function App() {
  return (
    <ThemeProvider>
      <SmoothScrollInit />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Contact />
    </ThemeProvider>
  )
}

export default App
