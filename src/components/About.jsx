import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

function StatTile({ end, suffix = '', label, delay = 0 }) {
  const { count, ref } = useCountUp(end, 2000)

  return (
    <div className="bento-tile bento-stat" ref={ref} style={{ animationDelay: `${delay}s` }}>
      <span className="stat-value">{count}{suffix}</span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export default function About() {
  const { ref: sectionRef, hasBeenInView } = useInView()

  return (
    <section id="about" className="about" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2>About Me</h2>
          <p>Get to know me better</p>
        </div>

        <div className={`bento-grid ${hasBeenInView ? 'animate-in' : ''}`}>
          {/* Row 1 */}
          <div className="bento-tile bento-intro" style={{ animationDelay: '0s' }}>
            <h3>AI Engineer & Data Scientist</h3>
            <p>
              Building AI solutions that solve real-world problems. Passionate about machine learning, computer vision, and agentic systems.
            </p>
          </div>

          <StatTile end={8} suffix="+" label="Projects" delay={0.1} />
          <StatTile end={15} suffix="+" label="Tools" delay={0.15} />

          {/* Row 2 */}
          <StatTile end={5} suffix="+" label="Certifications" delay={0.2} />

          <div className="bento-tile bento-education" style={{ animationDelay: '0.25s' }}>
            <h4>Education</h4>
            <div className="education-content">
              <span className="degree">B.Eng Electrical & Electronic Engineering</span>
              <span className="school">Nanyang Technological University</span>
              <span className="details">Data Analysis & ML • Honours (Distinction) • Dec 2025</span>
            </div>
          </div>

          <div className="bento-tile bento-experience" style={{ animationDelay: '0.28s' }}>
            <span className="experience-value">1+</span>
            <span className="experience-label">Years Experience</span>
            <span className="experience-sub">Internships</span>
          </div>

          {/* Row 3 */}
          <div className="bento-tile bento-technical" style={{ animationDelay: '0.3s' }}>
            <h4>Technical Stack</h4>
            <div className="tech-list">
              <span className="tech-item">Python</span>
              <span className="tech-item">React</span>
              <span className="tech-item">PyTorch</span>
              <span className="tech-item">LangChain</span>
              <span className="tech-item">FastAPI</span>
              <span className="tech-item">REST API</span>
              <span className="tech-item">Scikit-Learn</span>
              <span className="tech-item">MySQL</span>
              <span className="tech-item">Docker</span>
            </div>
          </div>

          <div className="bento-tile bento-goals" style={{ animationDelay: '0.35s' }}>
            <h4>Focus Areas</h4>
            <p>
              Designing <strong>intelligent systems</strong> that learn, reason, and act <strong>autonomously</strong> across complex environments. Special emphasis on <strong>fairness</strong>, <strong>interpretability</strong>, and <strong>robustness</strong> in machine learning models, alongside the development of <strong>multi-agent</strong> and <strong>decision-making pipelines</strong> that balance performance with transparency.
            </p>
          </div>

          {/* Row 4 */}
          <div className="bento-tile bento-facts" style={{ animationDelay: '0.4s' }}>
            <div className="fact-item">
              <span className="fact-label">Location</span>
              <span className="fact-value">Singapore</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">University</span>
              <span className="fact-value">NTU</span>
            </div>
            <div className="fact-item">
              <span className="fact-label">Graduated</span>
              <span className="fact-value">Dec 2025</span>
            </div>
          </div>

          <div className="bento-tile bento-current" style={{ animationDelay: '0.45s' }}>
            <h4>Current Role</h4>
            <span className="current-role">AI Innovation Engineer Intern</span>
            <p>
              Developing multi-model AI chatbot for HVAC industry and secure survey tools with automated reporting.
            </p>
          </div>

          <div className="bento-tile bento-interests" style={{ animationDelay: '0.5s' }}>
            <h4>Interests</h4>
            <div className="interest-tags">
              {['ML', 'Agentic AI', 'CV', 'Data Science', 'Basketball', 'Travel'].map((interest) => (
                <span key={interest} className="interest-tag">{interest}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
