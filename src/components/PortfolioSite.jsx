import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useTheme } from '../context/useTheme'
import {
  capabilities,
  credentials,
  experiences,
  profile,
  projects,
  tools,
} from '../data/portfolio'

function Arrow({ diagonal = false }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>
}

function ThemeToggle() {
  const { isDark, shutterOpen, setShutterOpen } = useTheme()

  return (
    <button
      type="button"
      className="pf-icon-button"
      onClick={() => setShutterOpen(!shutterOpen)}
      aria-label={shutterOpen ? 'Close theme shutter' : 'Open light and dark theme shutter'}
      aria-expanded={shutterOpen}
      aria-controls="theme-shutter"
      title="Drag between light and dark"
    >
      <span aria-hidden="true">{isDark ? '☼' : '◐'}</span>
    </button>
  )
}

export function SiteHeader({ onDesktopMode, compact = false }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const goToSection = (id) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    navigate(`/?section=${id}`)
  }

  return (
    <header className={`pf-header ${compact ? 'pf-header--compact' : ''}`}>
      <div className="pf-header__inner">
        <Link to="/" className="pf-mark" aria-label="Aaryan Kandiah home" onClick={() => setMenuOpen(false)}>
          <span>AK</span>
        </Link>

        <button
          type="button"
          className="pf-menu-trigger"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="portfolio-navigation"
        >
          {menuOpen ? 'Close' : 'Menu'}
        </button>

        <nav id="portfolio-navigation" className={`pf-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          <button type="button" onClick={() => goToSection('work')}>Work</button>
          <button type="button" onClick={() => goToSection('experience')}>Experience</button>
          <button type="button" onClick={() => goToSection('about')}>About</button>
          <button type="button" onClick={() => goToSection('playground')}>Playground</button>
          <button type="button" onClick={() => goToSection('contact')}>Contact</button>
        </nav>

        <div className="pf-header__actions">
          <ThemeToggle />
          {onDesktopMode && (
            <button type="button" className="pf-playground-button" onClick={onDesktopMode}>
              AaryanOS
            </button>
          )}
        </div>
      </div>
    </header>
  )
}

function FeaturedProject({ project, index }) {
  return (
    <article className="pf-featured-card">
      <Link to={`/work/${project.slug}`} className="pf-featured-card__media" aria-label={`Read ${project.title} case study`}>
        <div className="pf-featured-card__index">0{index + 1}</div>
        <img
          src={project.image}
          alt={`${project.title} interface preview`}
          style={project.imagePosition ? { objectPosition: project.imagePosition } : undefined}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
        <span className="pf-featured-card__open"><Arrow diagonal /></span>
      </Link>
      <div className="pf-featured-card__body">
        <div>
          <p className="pf-kicker">{project.kicker}</p>
          <h3>{project.title}</h3>
          <p className="pf-featured-card__subtitle">{project.subtitle}</p>
        </div>
        <div className="pf-featured-card__details">
          <p>{project.summary}</p>
          <p className="pf-outcome">{project.outcome}</p>
          <Link to={`/work/${project.slug}`} className="pf-text-link">
            Read case study <Arrow />
          </Link>
        </div>
      </div>
    </article>
  )
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="pf-section-heading">
      <p className="pf-section-index">{eyebrow}</p>
      <div>
        <h2>{title}</h2>
        {copy && <p>{copy}</p>}
      </div>
    </div>
  )
}

export default function PortfolioSite({ onDesktopMode }) {
  const location = useLocation()
  const featured = projects.filter((project) => project.featured)
  const archive = projects.filter((project) => !project.featured)

  useEffect(() => {
    const query = new URLSearchParams(location.search)
    const section = query.get('section')
    if (!section) return
    const frame = requestAnimationFrame(() => {
      document.getElementById(section)?.scrollIntoView({ block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [location.search])

  return (
    <div className="pf-site">
      <SiteHeader onDesktopMode={onDesktopMode} />

      <main>
        <section className="pf-hero" aria-labelledby="hero-title">
          <div className="pf-hero__grid" aria-hidden="true" />
          <div className="pf-shell pf-hero__inner">
            <p className="pf-eyebrow">{profile.eyebrow}</p>
            <h1 id="hero-title">{profile.headline}</h1>
            <div className="pf-hero__footer">
              <p>{profile.introduction}</p>
              <div className="pf-hero__actions">
                <button type="button" className="pf-primary-link" onClick={() => goTo('work')}>
                  View selected work <Arrow />
                </button>
                <button type="button" className="pf-secondary-link" onClick={onDesktopMode}>
                  Explore AaryanOS <Arrow diagonal />
                </button>
                <a className="pf-secondary-link" href={profile.resumePdf} target="_blank" rel="noreferrer">
                  Resume <Arrow diagonal />
                </a>
              </div>
            </div>
          </div>
          <div className="pf-hero__marquee" aria-hidden="true">
            <span>Interaction design</span><i />
            <span>Responsible AI</span><i />
            <span>Prototype through code</span><i />
            <span>Systems thinking</span>
          </div>
        </section>

        <section id="work" className="pf-section pf-work">
          <div className="pf-shell">
            <SectionHeading
              eyebrow="01 / Selected work"
              title="Products shaped around trust, clarity, and real constraints."
              copy="Three projects that show how I frame a problem, structure a workflow, and carry an idea through implementation."
            />
            <div className="pf-featured-list">
              {featured.map((project, index) => (
                <FeaturedProject key={project.slug} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="pf-section pf-principles">
          <div className="pf-shell">
            <SectionHeading eyebrow="02 / Approach" title="How I make design decisions." />
            <div className="pf-principles__grid">
              {capabilities.map((capability) => (
                <article key={capability.number} className="pf-principle">
                  <span>{capability.number}</span>
                  <h3>{capability.title}</h3>
                  <p>{capability.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="pf-section pf-evidence">
          <div className="pf-shell">
            <SectionHeading
              eyebrow="03 / Evidence"
              title="Work that moves beyond the mockup."
              copy="Professional experience, shipped products, and outcomes from building in real constraints."
            />
            <div className="pf-evidence__layout">
              <div className="pf-experience-list">
                {experiences.map((experience) => (
                  <article key={`${experience.company}-${experience.period}`} className="pf-experience-row">
                    <p className="pf-mono">{experience.period}</p>
                    <div>
                      <h3>{experience.title}</h3>
                      <p className="pf-experience-row__company">{experience.company} · {experience.location}</p>
                      <p>{experience.summary}</p>
                      <div className="pf-chip-list">
                        {experience.skills.map((skill) => <span key={skill}>{skill}</span>)}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
              <aside className="pf-recognition" aria-label="Recognition and education">
                <div className="pf-recognition__metric">
                  <strong>2×</strong>
                  <span>first-place competition wins</span>
                </div>
                <div className="pf-recognition__metric">
                  <strong>200+</strong>
                  <span>AlphaDrop users</span>
                </div>
                <div className="pf-recognition__education">
                  <p className="pf-kicker">Education</p>
                  <h3>National University of Singapore</h3>
                  <p>Master of Computing, Artificial Intelligence · commencing August 2026</p>
                  <h3>Nanyang Technological University</h3>
                  <p>B.Eng Electrical & Electronic Engineering · Honours (Distinction)</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="pf-section pf-archive">
          <div className="pf-shell">
            <SectionHeading eyebrow="04 / Archive" title="More systems, studies, and experiments." />
            <div className="pf-archive__head pf-mono" aria-hidden="true">
              <span>Project</span><span>Focus</span><span>Outcome</span><span>Year</span>
            </div>
            <div className="pf-archive__list">
              {archive.map((project) => (
                <a key={project.slug} className="pf-archive-row" href={project.link} target="_blank" rel="noreferrer">
                  <strong>{project.title}</strong>
                  <span>{project.kicker}</span>
                  <span>{project.outcome}</span>
                  <span className="pf-mono">{project.year} <Arrow diagonal /></span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="pf-section pf-about">
          <div className="pf-shell pf-about__layout">
            <div>
              <p className="pf-section-index">05 / About</p>
              <h2>Engineering trained me to make things work. Design makes me ask whether they should work this way.</h2>
            </div>
            <div className="pf-about__copy">
              <p>
                I’m Aaryan, an AI engineer in Singapore and an incoming NUS Master of Computing student. My background spans agentic systems, computer vision, data products, and production software.
              </p>
              <p>
                I’m most interested in the point where a complicated system meets a person: what the interface explains, what it hides, how it earns trust, and how the whole experience behaves outside a perfect demo.
              </p>
              <div className="pf-tools" aria-label="Capabilities and tools">
                {tools.map((tool) => <span key={tool}>{tool}</span>)}
              </div>
              <details className="pf-credentials">
                <summary>View seven certifications <span aria-hidden="true">+</span></summary>
                <ul>{credentials.map((credential) => <li key={credential}>{credential}</li>)}</ul>
              </details>
            </div>
          </div>
        </section>

        <section id="playground" className="pf-section pf-playground">
          <div className="pf-shell pf-playground__card">
            <div className="pf-playground__chrome" aria-hidden="true">
              <span /><span /><span />
            </div>
            <div className="pf-playground__content">
              <p className="pf-kicker">Interactive playground · desktop recommended</p>
              <h2>AaryanOS</h2>
              <p>
                The same portfolio reimagined as a working desktop with Finder, Notes, Terminal, Mail, Safari, Preview, draggable windows, and small details waiting to be discovered.
              </p>
              <button type="button" className="pf-primary-link" onClick={onDesktopMode}>
                Launch the playground <Arrow diagonal />
              </button>
            </div>
            <div className="pf-playground__terminal" aria-hidden="true">
              <p><span>aaryan@portfolio</span> ~ % whoami</p>
              <p>AI engineer · product-minded maker</p>
              <p><span>aaryan@portfolio</span> ~ % open work</p>
              <p className="pf-terminal-cursor">█</p>
            </div>
          </div>
        </section>

        <section id="contact" className="pf-contact">
          <div className="pf-shell">
            <p className="pf-eyebrow">Available for thoughtful collaborations</p>
            <h2>Have a difficult idea worth making clear?</h2>
            <a className="pf-contact__email" href={`mailto:${profile.email}`}>
              {profile.email} <Arrow diagonal />
            </a>
            <div className="pf-contact__footer">
              <p>Based in {profile.location}</p>
              <div>
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub <Arrow diagonal /></a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow diagonal /></a>
                <a href={profile.resumePdf} target="_blank" rel="noreferrer">Resume <Arrow diagonal /></a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function goTo(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
