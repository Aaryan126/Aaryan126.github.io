import { useInView } from '../hooks/useInView'

const experiences = [
  {
    title: 'AI Innovation Engineer Intern',
    company: 'Univers',
    period: 'May 2025 — Present',
    year: '2025',
    location: 'Singapore',
    description: [
      'Developed a context-sensitive, multi-model AI chatbot using GPT-4, FastAPI, and Python that helps employees across departments understand HVAC concepts through tailored, role-specific responses.',
      'Engineered a secure, modern web-based survey tool featuring one-time PIN access using Flask, and automated Excel report generation for streamlined data collection and analysis.',
    ],
    skills: ['Agent Orchestration', 'Python', 'FastAPI', 'React', 'Google Cloud'],
  },
  {
    title: 'Technology Audit Services Intern',
    company: 'Manulife Singapore',
    period: 'May — Jul 2023',
    year: '2023',
    location: 'Singapore',
    description: [
      'Worked on SOX (Sarbanes-Oxley) audit and China market audit, performing testing to evaluate evidence accuracy and reliability.',
      'Prepared comprehensive workpapers to document audit process, fact-findings, and conclusions.',
      'Programmed Python script to traverse through git repositories to uncover potential data privacy issues.',
    ],
    skills: ['Python', 'Audit Procedures', 'Data Analysis'],
  },
]

export default function Experience() {
  const { ref, hasBeenInView } = useInView()

  return (
    <section id="experience" className="experience" ref={ref}>
      <div className="container">
        <div className="section-header">
          <h2>Work Experience</h2>
          <p>My professional journey</p>
        </div>

        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <div
                  className={`experience-card ${hasBeenInView ? 'animate-in' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="experience-header">
                    <div className="experience-title-row">
                      <h3>{exp.title}</h3>
                      <span className="experience-period">{exp.period}</span>
                    </div>
                    <div className="experience-meta">
                      <span className="experience-company">{exp.company}</span>
                      <span className="experience-divider">·</span>
                      <span className="experience-location">{exp.location}</span>
                    </div>
                  </div>
                  <div className="experience-description">
                    {exp.description.map((item, i) => (
                      <p key={i}>{item}</p>
                    ))}
                  </div>
                  <div className="experience-skills">
                    {exp.skills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
