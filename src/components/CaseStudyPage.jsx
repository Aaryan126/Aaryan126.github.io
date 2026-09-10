import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { projects } from '../data/portfolio'
import { SiteHeader } from './PortfolioSite'

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

export default function CaseStudyPage() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug && item.featured)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!project) return <Navigate to="/" replace />

  const featured = projects.filter((item) => item.featured)
  const projectIndex = featured.findIndex((item) => item.slug === project.slug)
  const nextProject = featured[(projectIndex + 1) % featured.length]

  return (
    <div className="pf-site pf-case">
      <SiteHeader compact />
      <main>
        <section className="pf-case-hero">
          <div className="pf-shell">
            <Link to="/?section=work" className="pf-back-link">← Selected work</Link>
            <div className="pf-case-hero__title">
              <p className="pf-kicker">{project.kicker} · {project.year}</p>
              <h1>{project.subtitle}</h1>
            </div>
            <div className="pf-case-meta">
              <div><span>Project</span><strong>{project.title}</strong></div>
              <div><span>Role</span><strong>{project.role}</strong></div>
              <div><span>Context</span><strong>{project.timeline}</strong></div>
              <div><span>Outcome</span><strong>{project.outcome}</strong></div>
            </div>
          </div>
        </section>

        <div className="pf-shell pf-case-media">
          <img
            src={project.image}
            alt={`${project.title} product interface`}
            style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          />
          <p className="pf-mono">01 / Product interface</p>
        </div>

        <section className="pf-case-section">
          <div className="pf-shell pf-case-section__grid">
            <p className="pf-section-index">01 / Framing</p>
            <div>
              <h2>The challenge</h2>
              <p className="pf-case-lede">{project.challenge}</p>
            </div>
            <div className="pf-case-constraints">
              <p className="pf-kicker">Working constraints</p>
              <ol>
                {project.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}
              </ol>
            </div>
          </div>
        </section>

        <section className="pf-case-section pf-case-decisions">
          <div className="pf-shell">
            <div className="pf-case-section__intro">
              <p className="pf-section-index">02 / Engineering decisions</p>
              <h2>The decisions behind the system.</h2>
            </div>
            <div className="pf-decision-list">
              {project.decisions.map((decision) => (
                <article key={decision.number}>
                  <span className="pf-mono">{decision.number}</span>
                  <h3>{decision.title}</h3>
                  <p>{decision.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="pf-case-section pf-case-system">
          <div className="pf-shell pf-case-system__layout">
            <div>
              <p className="pf-section-index">03 / Delivery</p>
              <h2>Built as an end-to-end system.</h2>
            </div>
            <div>
              <p className="pf-case-lede">{project.summary}</p>
              <div className="pf-tools">
                {project.tech.map((item) => <span key={item}>{item}</span>)}
              </div>
              <a className="pf-primary-link" href={project.link} target="_blank" rel="noreferrer">
                {project.linkLabel} <Arrow diagonal />
              </a>
            </div>
          </div>
        </section>

        <section className="pf-case-section pf-case-outcome">
          <div className="pf-shell pf-case-outcome__layout">
            <p className="pf-section-index">04 / Outcome</p>
            <blockquote>{project.outcome}</blockquote>
            <div>
              <p className="pf-kicker">Reflection</p>
              <p>{project.reflection}</p>
            </div>
          </div>
        </section>

        <section className="pf-next-project">
          <div className="pf-shell">
            <p className="pf-section-index">Next case study</p>
            <Link to={`/work/${nextProject.slug}`}>
              <span>{nextProject.title}</span>
              <strong>{nextProject.subtitle}</strong>
              <Arrow />
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
