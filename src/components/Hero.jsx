import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTypewriter } from '../hooks/useTypewriter'
import AnimatedGradientBackground from './ui/AnimatedGradientBackground'
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
        <AnimatedGradientBackground
          Breathing={true}
          animationSpeed={0.03}
          breathingRange={4}
          startingGap={120}
          topOffset={0}
          gradientColors={[
            "#0A0A0A",
            "#1a1a2e",
            "#16213e",
            "#0f3460",
            "#533483",
            "#2979FF",
            "#1a1a2e"
          ]}
          gradientStops={[10, 22, 35, 45, 55, 70, 100]}
        />
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
                Currently building agentic AI systems at Univers. Recent NTU graduate specializing in Data Analysis & Machine Learning. Interested in multi-agent pipelines, computer vision, and deep learning.
              </p>
              <div className="hero-buttons">
                <a href="/Aaryan_Kandiah_Resume.docx" download="Aaryan_Kandiah_Resume.docx" className="btn btn-primary">
                  <i className="fas fa-download"></i>
                  Download Resume
                </a>
                <a href="#projects" className="btn btn-secondary" onClick={(e) => {
                  e.preventDefault()
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }}>
                  View Projects
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="hero-spacer" />
    </>
  )
}
