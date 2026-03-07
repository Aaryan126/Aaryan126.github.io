import { useScrollReveal } from '../hooks/useScrollReveal'

const experiences = [
  {
    title: 'AI Innovation Engineer Intern',
    company: 'Univers',
    period: 'May 2025 — Present',
    year: '2025',
    location: 'Singapore',
    description: [
      'Built a full-stack AI Agentic Platform for HVAC optimization serving 7 clients, increasing GTM team productivity by ~25%.',
      'Developed RAG-based AI agent with VectorDB, multi-modal outputs (optimization recommendations, Mermaid diagrams, Google Maps intelligence), and role-based reasoning.',
      'Shipped features across Java backend and React/TypeScript frontend processing ~1M data points daily per client across 300+ sensor streams.',
      'Delivered 2 on-premise AI deployments with local LLM hosting, and built an internal monitoring platform reducing incident response time by 40%.',
    ],
    skills: ['Agentic AI', 'RAG', 'Python', 'FastAPI', 'React', 'TypeScript', 'Java', 'Google Cloud'],
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
  const headerRef = useScrollReveal('fadeUp', { duration: 0.6 })
  const timelineRef = useScrollReveal('slideLeft', {
    childSelector: '.alt-timeline-item',
    stagger: 0.2,
    duration: 0.8,
    ease: 'power3.out',
    start: 'top 80%',
  })

  return (
    <section id="experience" className="experience">
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <h2>Work Experience</h2>
          <p>My professional journey</p>
        </div>

        <div className="alt-timeline" ref={timelineRef}>
          {experiences.map((exp, index) => (
            <div key={index} className={`alt-timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
              <div className="alt-timeline-marker">
                <span className="alt-timeline-year">{exp.year}</span>
              </div>
              <div className="alt-timeline-card">
                <div className="alt-card-header">
                  <h3>{exp.title}</h3>
                  <div className="experience-meta">
                    <span className="experience-company">{exp.company}</span>
                    <span className="experience-divider">·</span>
                    <span className="experience-location">{exp.location}</span>
                  </div>
                </div>
                <div className="alt-card-body">
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
          ))}
        </div>
      </div>
    </section>
  )
}
