import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTypewriter } from '../hooks/useTypewriter'
import Icosahedron from './Icosahedron'
gsap.registerPlugin(ScrollTrigger)

const roles = ['AI Engineer', 'Data Scientist', 'ML Specialist', 'Problem Solver']

export default function Hero() {
  const typewriterText = useTypewriter(roles, 100, 50, 2000)
  const heroRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const content = contentRef.current
    if (!hero || !content) return

    const ctx = gsap.context(() => {
      // Blur and fade the hero content as user scrolls away
      gsap.to(content, {
        filter: 'blur(8px)',
        scale: 1.03,
        opacity: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-container" ref={contentRef}>
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-greeting">Hello, I'm</p>
              <h1 className="hero-title">Aaryan Kandiah</h1>
              <p className="hero-subtitle">
                <span className="typewriter">{typewriterText}</span>
                <span className="cursor">|</span>
              </p>
              <p className="hero-description">
                Passionate about leveraging Machine learning, Agentic AI, and Computer vision to solve real-world problems.
                Currently pursuing Electrical and Electronic Engineering at NTU, specializing in Data Analysis and Machine Learning.
              </p>
              <div className="hero-buttons">
                <a href="/Aaryan_Kandiah_Resume.docx" download className="btn btn-primary">
                  <i className="fas fa-download"></i>
                  Download Resume
                </a>
                <a href="#projects" className="btn btn-secondary" onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}>
                  <i className="fas fa-eye"></i>
                  View Projects
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <Icosahedron />
            </div>
          </div>
        </div>
      </section>
      {/* Spacer to account for the fixed hero not being in document flow */}
      <div className="hero-spacer" />
    </>
  )
}
