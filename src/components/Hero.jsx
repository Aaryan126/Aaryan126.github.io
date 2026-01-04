import { useTypewriter } from '../hooks/useTypewriter'

const roles = ['AI Engineer', 'Data Scientist', 'ML Specialist', 'Problem Solver']

export default function Hero() {
  const typewriterText = useTypewriter(roles, 100, 50, 2000)

  return (
    <section id="home" className="hero">
      <div className="hero-container">
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
        </div>
      </div>
    </section>
  )
}
