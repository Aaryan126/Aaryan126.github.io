import { useInView } from '../hooks/useInView'

const experiences = [
  {
    title: 'AI Innovation Engineer',
    company: 'Univers',
    duration: 'May 2025 - Present',
    durationText: 'May 2025 - Present · 2 months',
    location: 'Singapore · On-site',
    icon: 'fa-building',
    description: [
      'Developed a context-sensitive, multi-model AI chatbot using GPT-4, FastAPI, and Python that helps employees across departments understand HVAC concepts through tailored, role-specific responses.',
      'Engineered a secure, modern web-based survey tool featuring one-time PIN access using Flask, and automated Excel report generation for streamlined data collection and analysis.',
    ],
    skills: ['Generative AI', 'LangChain', 'FastAPI', 'OpenAI Python SDK', 'Gemini', 'Python'],
  },
  {
    title: 'Technology Audit Services Intern',
    company: 'Manulife Singapore',
    duration: 'May 2023 - Jul 2023',
    durationText: 'May 2023 - Jul 2023 · 3 months',
    location: 'Singapore',
    icon: 'fa-shield-alt',
    description: [
      'Worked on SOX (Sarbanes-Oxley) audit and China market audit, performing testing to evaluate evidence accuracy and reliability.',
      'Prepared comprehensive workpapers to document audit process, fact-findings, and conclusions.',
      'Programmed Python script to traverse through git repositories to uncover potential data privacy issues.',
    ],
    skills: ['Microsoft Office', 'Audit Procedures', 'Python Programming'],
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
              <div className="timeline-date">{exp.duration}</div>
              <div className="timeline-content">
                <div
                  className={`experience-card ${hasBeenInView ? 'animate-in' : ''}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="experience-header">
                    <div className="company-info">
                      <div className="company-logo">
                        <i className={`fas ${exp.icon}`}></i>
                      </div>
                      <div className="company-details">
                        <h3>{exp.title}</h3>
                        <p className="company-name">{exp.company}</p>
                        <p className="duration">{exp.durationText}</p>
                        <p className="location">{exp.location}</p>
                      </div>
                    </div>
                  </div>
                  <div className="experience-description">
                    <ul>
                      {exp.description.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
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
