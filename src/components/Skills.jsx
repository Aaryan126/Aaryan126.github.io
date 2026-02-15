import { useScrollReveal } from '../hooks/useScrollReveal'

const secondarySkills = [
  'Java',
  'TensorFlow',
  'Scikit-Learn',
  'NumPy',
  'OpenCV',
  'Matplotlib',
  'Pandas',
]

export default function Skills() {
  const headerRef = useScrollReveal('fadeUp', { duration: 0.6 })
  const gridRef = useScrollReveal('clipUp', {
    childSelector: '.bento-skill-card',
    stagger: 0.12,
    duration: 0.8,
    ease: 'power4.out',
    start: 'top 80%',
  })
  const secondaryRef = useScrollReveal('fadeUp', {
    duration: 0.6,
    delay: 0.1,
    start: 'top 85%',
  })

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <h2>Skills & Expertise</h2>
          <p>My core tech stack</p>
        </div>

        <div className="bento-skills-grid" ref={gridRef}>
          {/* Python / FastAPI - Large card */}
          <div className="bento-skill-card bento-large">
            <div className="bento-skill-icons">
              <div className="bento-skill-icon" style={{ '--skill-color': '#3776ab' }}>
                <i className="fab fa-python"></i>
              </div>
              <div className="bento-skill-icon" style={{ '--skill-color': '#009688' }}>
                <i className="fas fa-bolt"></i>
              </div>
            </div>
            <div className="bento-skill-content">
              <h3>Python / FastAPI</h3>
              <span className="bento-skill-label">Backend & APIs</span>
              <p className="bento-skill-desc">Building production backend services, REST APIs, and data pipelines</p>
            </div>
          </div>

          {/* React */}
          <div className="bento-skill-card bento-tall">
            <div className="bento-skill-icons">
              <div className="bento-skill-icon" style={{ '--skill-color': '#61dafb' }}>
                <i className="fab fa-react"></i>
              </div>
            </div>
            <div className="bento-skill-content">
              <h3>React</h3>
              <span className="bento-skill-label">Frontend</span>
              <p className="bento-skill-desc">Modern web apps with Tailwind CSS and responsive design</p>
            </div>
          </div>

          {/* PyTorch */}
          <div className="bento-skill-card">
            <div className="bento-skill-icon" style={{ '--skill-color': '#ee4c2c' }}>
              <i className="fas fa-fire"></i>
            </div>
            <h3>PyTorch</h3>
            <span className="bento-skill-label">Deep Learning</span>
          </div>

          {/* DevOps */}
          <div className="bento-skill-card">
            <div className="bento-skill-icon" style={{ '--skill-color': '#2496ed' }}>
              <i className="fab fa-docker"></i>
            </div>
            <h3>Docker / K8s</h3>
            <span className="bento-skill-label">DevOps</span>
          </div>

          {/* MySQL */}
          <div className="bento-skill-card">
            <div className="bento-skill-icon" style={{ '--skill-color': '#4479a1' }}>
              <i className="fas fa-database"></i>
            </div>
            <h3>MySQL</h3>
            <span className="bento-skill-label">Database</span>
          </div>
        </div>

        <div className="secondary-skills" ref={secondaryRef}>
          <p className="secondary-label">Also experienced with</p>
          <div className="secondary-skills-list">
            {secondarySkills.map((skill) => (
              <span key={skill} className="secondary-skill-badge">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
