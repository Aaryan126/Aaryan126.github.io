import { useState, useEffect, useRef, useCallback } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useActiveSection } from '../hooks/useActiveSection'
const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact']

const darkSections = ['home', 'contact']

function getSectionAtY(y) {
  // Check non-fixed sections first (they scroll over the fixed hero)
  // Iterate in reverse so later sections take priority
  const sectionEls = sections
    .map(id => document.getElementById(id))
    .filter(Boolean)

  // First pass: check non-fixed (scrolling) sections
  for (let i = sectionEls.length - 1; i >= 0; i--) {
    const el = sectionEls[i]
    const style = window.getComputedStyle(el)
    if (style.position === 'fixed') continue
    const rect = el.getBoundingClientRect()
    if (rect.top <= y && rect.bottom > y) {
      return el.id
    }
  }

  // Second pass: fall back to fixed sections (hero)
  for (const el of sectionEls) {
    const style = window.getComputedStyle(el)
    if (style.position !== 'fixed') continue
    const rect = el.getBoundingClientRect()
    if (rect.top <= y && rect.bottom > y) {
      return el.id
    }
  }

  return null
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [onDarkBg, setOnDarkBg] = useState(true)
  const { isDark, toggleTheme } = useTheme()
  const activeSection = useActiveSection(sections)
  const navRef = useRef(null)

  const detectColors = useCallback(() => {
    const nav = navRef.current
    if (!nav) return

    const navHeight = nav.offsetHeight
    const checkY = navHeight / 2

    const sectionId = getSectionAtY(checkY)
    const isDarkBg = sectionId ? darkSections.includes(sectionId) : true

    setOnDarkBg(prev => prev === isDarkBg ? prev : isDarkBg)
  }, [])

  useEffect(() => {
    let lastScrollTop = 0

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        setIsHidden(true)
      } else {
        setIsHidden(false)
      }
      lastScrollTop = scrollTop
      detectColors()
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', detectColors)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', detectColors)
    }
  }, [detectColors])

  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (e) => {
      if (!e.target.closest('.nav-menu') && !e.target.closest('.hamburger')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])

  const handleNavClick = (e, id) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setIsMenuOpen(false)
  }

  const bgType = onDarkBg ? 'dark' : 'light'

  return (
    <nav
      ref={navRef}
      className={`navbar ${isHidden ? 'navbar-hidden' : ''}`}
      data-nav-bg={bgType}
    >
      <div className="nav-container">
        <a href="#home" className="nav-logo" onClick={(e) => handleNavClick(e, 'home')}>
          <img
            src={isDark ? "/header-icon.png" : "/header-icon_light.png"}
            alt="AK"
            className="logo-icon"
          />
        </a>

        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          {sections.map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className={activeSection === section ? 'active' : ''}
                onClick={(e) => handleNavClick(e, section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div
            className={`hamburger ${isMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  )
}
