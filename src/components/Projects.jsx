import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Research Orchestration System',
    subtitle: 'Multi-Agent Research Platform',
    image: '/projects/research-orchestration.png',
    description: 'Multi-agent system that automates literature reviews and claim verification across academic papers. Three specialized agents search, synthesize, review, and cross-verify findings using Elasticsearch and ES|QL.',
    tech: ['Elastic Agent Builder', 'Elasticsearch', 'ES|QL', 'FastAPI', 'React', 'MCP'],
    link: 'https://github.com/Aaryan126/Research_Agent',
    linkLabel: 'View Project',
    videoLink: 'https://www.youtube.com/watch?v=KatuxMUNVjU',
    gradient: 'linear-gradient(135deg, #00bfb3 0%, #1b6b6b 100%)',
  },
  {
    title: 'AlphaDrop',
    subtitle: 'Chrome Extension',
    image: '/projects/alphadrop.png',
    description: 'AI-powered background removal that runs entirely in your browser. Fast, private, and free.',
    tech: ['JavaScript', 'ONNX', 'Canvas API'],
    link: 'https://chromewebstore.google.com/detail/alphadrop/hbmfofpedlbllenmpnebikhadgkplobj',
    linkLabel: 'Chrome Web Store',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    badge: '150+ Users',
  },
  {
    title: 'Spotify Streaming History Visualizer',
    image: '/projects/spotify_viz.png',
    description: 'An interactive dashboard that transforms Spotify streaming history into insightful visualizations. Explore top tracks, artists, listening patterns, and yearly recaps through bubble charts, time-series graphs, and radar charts.',
    tech: ['React', 'Recharts', 'Tailwind CSS'],
    link: 'https://startling-marshmallow-c649ed.netlify.app/',
    linkLabel: 'Live Demo',
    gradient: 'linear-gradient(135deg, #1db954 0%, #191414 100%)',
  },
  {
    title: 'Chest X-Ray Classification',
    image: '/projects/CXR_Classification.png',
    description: 'Multi-label deep learning model to detect multiple thoracic abnormalities in chest X-rays, with Explainable AI (Grad-CAM) for clinical interpretability, achieved AUC Score of 0.845.',
    tech: ['Deep Learning', 'PyTorch', 'DenseNet', 'Explainable AI', 'Grad-CAM'],
    link: 'https://github.com/Aaryan126/FYP_Website',
    linkLabel: 'View Project',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
  },
  {
    title: 'Ship Navigation System',
    image: '/projects/ship-navigation.png',
    description: 'Global and local path planning with obstacle avoidance using PyQt5 interface.',
    tech: ['Python', 'PyQt5', 'A*', 'Dynamic Window Approach', 'Path Planning'],
    link: 'https://github.com/Aaryan126/Ship-Navigation-System',
    linkLabel: 'View Project',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
  },
  {
    title: 'Brain Tumor Detection',
    image: '/projects/brain-tumor.png',
    description: 'Enhanced classification using dimensionality reduction and computer vision. Passive Aggressive Classifier + PCA achieved highest accuracy at 94.35%.',
    tech: ['Scikit-learn', 'Matplotlib', 'Pandas', 'TensorFlow'],
    link: 'https://github.com/Aaryan126/DimensionalityReduction-for-BrainTumorClassification',
    linkLabel: 'View Project',
    gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
  },
]

function ProjectCard({ project }) {
  const [imageError, setImageError] = useState(false)

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card"
      data-title={project.subtitle ? `${project.title} · ${project.subtitle}` : project.title}
    >
      <div className="project-image">
        {!imageError ? (
          <img
            src={project.image}
            alt={project.title}
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className="project-image-fallback"
            style={{ background: project.gradient }}
          >
            <i className="fa-solid fa-code"></i>
          </div>
        )}
        {project.badge && (
          <span className="project-badge">
            <i className="fa-solid fa-users"></i>
            {project.badge}
          </span>
        )}
      </div>

      <div className="project-overlay">
        <div className="project-overlay-content">
          {project.subtitle && <span className="project-subtitle">{project.subtitle}</span>}
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-tech">
            {project.tech.map((tech) => (
              <span key={tech}>{tech}</span>
            ))}
          </div>
          <div className="project-cta-row">
            <div className="project-cta">
              {project.linkLabel}
              <i className="fa-solid fa-arrow-right"></i>
            </div>
            {project.videoLink && (
              <span
                className="project-video-link"
                role="link"
                tabIndex={0}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(project.videoLink, '_blank', 'noopener,noreferrer')
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    e.stopPropagation()
                    window.open(project.videoLink, '_blank', 'noopener,noreferrer')
                  }
                }}
              >
                <i className="fa-brands fa-youtube"></i>
                Demo
              </span>
            )}
          </div>
        </div>
      </div>
    </a>
  )
}

export default function Projects() {
  const headerRef = useScrollReveal('fadeUp', { duration: 0.6 })

  const galleryRef = useRef(null)

  useEffect(() => {
    const el = galleryRef.current
    if (!el) return

    const cards = el.querySelectorAll('.project-card')
    if (!cards.length) return

    const ctx = gsap.context(() => {
      gsap.fromTo(cards,
        { opacity: 0, y: 50, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            once: true,
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header" ref={headerRef}>
          <h2>Projects</h2>
          <p>A selection of my work</p>
        </div>

        <div className="projects-gallery" ref={galleryRef}>
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
