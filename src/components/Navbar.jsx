import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useActiveSection } from '../hooks/useActiveSection'

const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact']

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const { isDark, toggleTheme } = useTheme()
  const activeSection = useActiveSection(sections)

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
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  return (
    <nav className={`navbar ${isHidden ? 'navbar-hidden' : ''}`}>
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
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
          >
            {isDark ? (
              <i className="fas fa-sun"></i>
            ) : (
              <i className="fas fa-moon"></i>
            )}
          </button>

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
